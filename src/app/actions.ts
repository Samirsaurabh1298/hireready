'use server'

import { createServerClient } from '@/lib/supabase'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

/* ── helpers ── */

async function uploadFile(
  supabase: ReturnType<typeof createServerClient>,
  file: File,
  folder: string,
  id: string,
): Promise<string | null> {
  const ext = file.name.split('.').pop()
  const path = `${folder}/${id}.${ext}`
  const { error } = await supabase.storage
    .from('applications')
    .upload(path, file, { contentType: file.type })
  if (error) { console.error(`Upload error [${folder}]:`, error.message); return null }
  return path
}

async function signedUrl(
  supabase: ReturnType<typeof createServerClient>,
  path: string | null,
): Promise<string | null> {
  if (!path) return null
  const { data } = await supabase.storage
    .from('applications')
    .createSignedUrl(path, 3600) // 1-hour link
  return data?.signedUrl ?? null
}

/* ── main action ── */

export async function submitApplication(
  formData: FormData,
): Promise<{ success: boolean; error?: string }> {
  try {
    const supabase = createServerClient()
    const id = crypto.randomUUID()

    // Text fields
    const fullName         = formData.get('fullName') as string
    const email            = formData.get('email') as string
    const phone            = formData.get('phone') as string
    const currentLocation  = formData.get('currentLocation') as string
    const preferredLocation = formData.get('preferredLocation') as string
    const currentRole      = formData.get('currentRole') as string
    const currentCompany   = formData.get('currentCompany') as string
    const experience       = formData.get('experience') as string
    const expectedSalary   = formData.get('expectedSalary') as string
    const skills           = formData.get('skills') as string
    const servicesRaw      = formData.get('services') as string
    const services         = servicesRaw ? servicesRaw.split(',').filter(Boolean) : []
    const linkedinUrl      = formData.get('linkedinUrl') as string
    const naukriUrl        = formData.get('naukriUrl') as string

    // File uploads (run in parallel)
    const resumeFile    = formData.get('resumeFile') as File | null
    const photoFile     = formData.get('photoFile') as File | null
    const signatureFile = formData.get('signatureFile') as File | null

    const [resumePath, photoPath, signaturePath] = await Promise.all([
      resumeFile?.size    ? uploadFile(supabase, resumeFile, 'resumes', id)     : null,
      photoFile?.size     ? uploadFile(supabase, photoFile, 'photos', id)       : null,
      signatureFile?.size ? uploadFile(supabase, signatureFile, 'signatures', id) : null,
    ])

    // Save to DB + generate signed URLs in parallel (saves one round-trip)
    const [dbResult, resumeUrl, photoUrl, signatureUrl] = await Promise.all([
      supabase.from('applications').insert({
        id,
        full_name:          fullName,
        email,
        phone,
        current_location:   currentLocation,
        preferred_location: preferredLocation,
        job_role:           currentRole,
        current_company:    currentCompany   || null,
        experience,
        expected_salary:    expectedSalary   || null,
        skills,
        services,
        linkedin_url:       linkedinUrl      || null,
        naukri_url:         naukriUrl        || null,
        resume_path:        resumePath,
        photo_path:         photoPath,
        signature_path:     signaturePath,
        status:             'new',
      }),
      signedUrl(supabase, resumePath),
      signedUrl(supabase, photoPath),
      signedUrl(supabase, signaturePath),
    ])
    if (dbResult.error) throw new Error(dbResult.error.message)

    const teamEmail = process.env.TEAM_EMAIL ?? 'support@hireready.in'

    // Send emails with a 15s timeout — a slow/broken email provider must not block the user.
    // Data is already saved; email failure is non-fatal.
    const emailTimeout = new Promise<void>(resolve => setTimeout(resolve, 15_000))
    await Promise.race([
      Promise.all([
        resend.emails.send({
          from:    'HireReady Applications <applications@hireready.in>',
          to:      teamEmail,
          subject: `New Application: ${fullName} — ${services.join(', ')}`,
          html:    teamEmailHtml({
            fullName, email, phone, currentLocation, preferredLocation,
            currentRole, currentCompany, experience, expectedSalary,
            skills, services, linkedinUrl, naukriUrl,
            resumeUrl, photoUrl, signatureUrl,
          }),
        }),
        resend.emails.send({
          from:    'HireReady <hello@hireready.in>',
          to:      email,
          subject: 'We received your application — HireReady',
          html:    applicantEmailHtml({ fullName, services }),
        }),
      ]).catch(err => console.error('Email send error (non-fatal):', err)),
      emailTimeout,
    ])

    return { success: true }
  } catch (err) {
    console.error('submitApplication error:', err)
    return { success: false, error: 'Something went wrong. Please try again or contact support.' }
  }
}

/* ── email templates ── */

function row(label: string, value: string) {
  return `<tr>
    <td style="padding:9px 14px;color:#5a6080;font-size:13px;white-space:nowrap;border-bottom:1px solid #e2e5f0">${label}</td>
    <td style="padding:9px 14px;color:#1a1d2e;font-size:13px;border-bottom:1px solid #e2e5f0">${value}</td>
  </tr>`
}

function fileBtn(label: string, url: string | null) {
  if (!url) return ''
  return `<a href="${url}" style="display:inline-block;margin:0 8px 8px 0;padding:8px 16px;background:#1a56ff;color:#fff;text-decoration:none;border-radius:6px;font-size:13px;font-weight:600">${label}</a>`
}

function teamEmailHtml(d: {
  fullName: string; email: string; phone: string
  currentLocation: string; preferredLocation: string
  currentRole: string; currentCompany: string
  experience: string; expectedSalary: string; skills: string
  services: string[]; linkedinUrl: string; naukriUrl: string
  resumeUrl: string | null; photoUrl: string | null; signatureUrl: string | null
}) {
  const now = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })
  return `<!DOCTYPE html><html><head><meta charset="utf-8"></head>
<body style="margin:0;padding:0;background:#f0f2fc;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif">
<div style="max-width:620px;margin:32px auto;background:#fff;border-radius:12px;overflow:hidden;border:1px solid #e2e5f0">
  <div style="background:#1a56ff;padding:24px 32px">
    <h1 style="margin:0;color:#fff;font-size:20px;font-weight:700">New Application Received</h1>
    <p style="margin:6px 0 0;color:rgba(255,255,255,0.75);font-size:13px">${d.services.join(' · ')}</p>
  </div>
  <div style="padding:28px 32px">
    <table style="width:100%;border-collapse:collapse;border:1px solid #e2e5f0;border-radius:8px;overflow:hidden">
      <tbody>
        ${row('Full Name', d.fullName)}
        ${row('Email', `<a href="mailto:${d.email}" style="color:#1a56ff">${d.email}</a>`)}
        ${row('Phone', `<a href="tel:${d.phone}" style="color:#1a56ff">${d.phone}</a>`)}
        ${row('Current Location', d.currentLocation)}
        ${row('Preferred Location', d.preferredLocation)}
        ${row('Current Role', d.currentRole)}
        ${row('Company', d.currentCompany || 'Fresher / Not specified')}
        ${row('Experience', d.experience)}
        ${row('Expected Salary', d.expectedSalary || 'Not specified')}
        ${row('Skills', d.skills)}
        ${row('Services', d.services.join(', '))}
        ${d.linkedinUrl ? row('LinkedIn', `<a href="${d.linkedinUrl}" style="color:#1a56ff">View Profile</a>`) : ''}
        ${d.naukriUrl   ? row('Naukri',   `<a href="${d.naukriUrl}"   style="color:#1a56ff">View Profile</a>`) : ''}
      </tbody>
    </table>
    ${(d.resumeUrl || d.photoUrl || d.signatureUrl) ? `
    <div style="margin-top:22px">
      <p style="margin:0 0 10px;font-size:13px;font-weight:600;color:#1a1d2e">Uploaded Files <span style="color:#5a6080;font-weight:400">(links expire in 1 hour)</span></p>
      ${fileBtn('📄 Resume', d.resumeUrl)}
      ${fileBtn('🖼️ Photo', d.photoUrl)}
      ${fileBtn('✍️ Signature', d.signatureUrl)}
    </div>` : ''}
  </div>
  <div style="padding:14px 32px;background:#f8f9ff;border-top:1px solid #e2e5f0">
    <p style="margin:0;font-size:12px;color:#5a6080">Submitted ${now} IST</p>
  </div>
</div>
</body></html>`
}

function applicantEmailHtml(d: { fullName: string; services: string[] }) {
  const steps = [
    'Our team reviews your application',
    'A career expert contacts you within 24 hours',
    'We share a personalised career plan',
    'Work begins — resumes, profiles, referrals and more',
  ]
  return `<!DOCTYPE html><html><head><meta charset="utf-8"></head>
<body style="margin:0;padding:0;background:#f0f2fc;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif">
<div style="max-width:580px;margin:32px auto;background:#fff;border-radius:12px;overflow:hidden;border:1px solid #e2e5f0">
  <div style="background:#1a56ff;padding:28px 32px;text-align:center">
    <p style="margin:0;color:#fff;font-size:22px;font-weight:800;font-family:sans-serif">Hire<span style="opacity:0.75">Ready</span></p>
  </div>
  <div style="padding:36px 32px">
    <h2 style="margin:0 0 10px;font-size:22px;color:#1a1d2e">Hi ${d.fullName}! 👋</h2>
    <p style="color:#5a6080;font-size:15px;line-height:1.7;margin:0 0 26px">
      We've received your application for <strong style="color:#1a56ff">${d.services.join(', ')}</strong>. Our team is already on it!
    </p>
    <div style="background:#f8f9ff;border-radius:10px;padding:22px 24px;margin-bottom:28px">
      <p style="margin:0 0 14px;font-size:12px;font-weight:700;color:#1a1d2e;text-transform:uppercase;letter-spacing:0.07em">What happens next</p>
      <table style="width:100%;border-collapse:collapse">
        ${steps.map((step, i) => `
        <tr>
          <td style="width:32px;vertical-align:top;padding-bottom:${i < steps.length - 1 ? '12px' : '0'}">
            <span style="display:inline-block;width:24px;height:24px;background:#1a56ff;color:#fff;border-radius:50%;text-align:center;line-height:24px;font-size:12px;font-weight:700">${i + 1}</span>
          </td>
          <td style="padding:3px 0 ${i < steps.length - 1 ? '12px' : '0'} 10px;font-size:14px;color:#5a6080;line-height:1.6">${step}</td>
        </tr>`).join('')}
      </table>
    </div>
    <p style="color:#5a6080;font-size:14px;line-height:1.8;margin:0 0 26px">
      Questions? Reach us at:<br>
      📧 <a href="mailto:support@hireready.in" style="color:#1a56ff">support@hireready.in</a><br>
      📞 +91 0000000000 (Mon–Sat, 9am–6pm)
    </p>
    <a href="https://hireready.in" style="display:inline-block;background:#1a56ff;color:#fff;text-decoration:none;padding:12px 26px;border-radius:8px;font-size:15px;font-weight:600">Visit HireReady →</a>
  </div>
  <div style="padding:14px 32px;background:#f8f9ff;border-top:1px solid #e2e5f0;text-align:center">
    <p style="margin:0;font-size:12px;color:#5a6080">© ${new Date().getFullYear()} HireReady. All rights reserved.</p>
  </div>
</div>
</body></html>`
}
