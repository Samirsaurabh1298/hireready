'use server'

import { createServerClient } from '@/lib/supabase'
import nodemailer from 'nodemailer'

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

function createMailer() {
  return nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_APP_PASSWORD,
    },
  })
}

/* ── main action ── */

export async function submitApplication(
  formData: FormData,
): Promise<{ success: boolean; error?: string }> {
  try {
    const supabase = createServerClient()
    const id = crypto.randomUUID()

    // Text fields
    const fullName          = formData.get('fullName') as string
    const email             = formData.get('email') as string
    const phone             = formData.get('phone') as string
    const currentLocation   = formData.get('currentLocation') as string
    const preferredLocation = formData.get('preferredLocation') as string
    const currentRole       = formData.get('currentRole') as string
    const currentCompany    = formData.get('currentCompany') as string
    const experience        = formData.get('experience') as string
    const expectedSalary    = formData.get('expectedSalary') as string
    const skills            = formData.get('skills') as string
    const servicesRaw       = formData.get('services') as string
    const services          = servicesRaw ? servicesRaw.split(',').filter(Boolean) : []
    const linkedinUrl       = formData.get('linkedinUrl') as string
    const naukriUrl         = formData.get('naukriUrl') as string

    // File uploads (run in parallel)
    const resumeFile    = formData.get('resumeFile') as File | null
    const photoFile     = formData.get('photoFile') as File | null
    const signatureFile = formData.get('signatureFile') as File | null

    const [resumePath, photoPath, signaturePath] = await Promise.all([
      resumeFile?.size    ? uploadFile(supabase, resumeFile,    'resumes',    id) : null,
      photoFile?.size     ? uploadFile(supabase, photoFile,     'photos',     id) : null,
      signatureFile?.size ? uploadFile(supabase, signatureFile, 'signatures', id) : null,
    ])

    // Save to database
    const { error: dbError } = await supabase.from('applications').insert({
      id,
      full_name:          fullName,
      email,
      phone,
      current_location:   currentLocation,
      preferred_location: preferredLocation,
      job_role:           currentRole,
      current_company:    currentCompany  || null,
      experience,
      expected_salary:    expectedSalary  || null,
      skills,
      services,
      linkedin_url:       linkedinUrl     || null,
      naukri_url:         naukriUrl       || null,
      resume_path:        resumePath,
      photo_path:         photoPath,
      signature_path:     signaturePath,
      status:             'new',
    })
    if (dbError) throw new Error(dbError.message)

    // Send Gmail notifications (non-blocking — email failure never blocks the user)
    if (process.env.GMAIL_USER && process.env.GMAIL_APP_PASSWORD) {
      const mailer = createMailer()
      const gmailUser = process.env.GMAIL_USER

      Promise.all([
        // Team notification
        mailer.sendMail({
          from:    `"HireReady Leads" <${gmailUser}>`,
          to:      gmailUser,
          subject: `New Lead: ${fullName} — ${services.join(', ')}`,
          html:    teamEmailHtml({
            fullName, email, phone, currentLocation, preferredLocation,
            currentRole, currentCompany, experience, expectedSalary,
            skills, services, linkedinUrl, naukriUrl,
          }),
        }),
        // Applicant confirmation
        mailer.sendMail({
          from:    `"HireReady" <${gmailUser}>`,
          to:      email,
          subject: 'We received your application — HireReady',
          html:    applicantEmailHtml({ fullName, services }),
        }),
      ]).catch(err => console.error('Gmail send error (non-fatal):', err))
    }

    return { success: true }
  } catch (err) {
    console.error('submitApplication error:', err)
    return { success: false, error: 'Something went wrong. Please try again or contact support.' }
  }
}

/* ── email templates ── */

function row(label: string, value: string) {
  return `<tr>
    <td style="padding:9px 14px;color:#5a6080;font-size:13px;white-space:nowrap;border-bottom:1px solid #e2e5f0;font-family:sans-serif">${label}</td>
    <td style="padding:9px 14px;color:#1a1d2e;font-size:13px;border-bottom:1px solid #e2e5f0;font-family:sans-serif">${value}</td>
  </tr>`
}

function teamEmailHtml(d: {
  fullName: string; email: string; phone: string
  currentLocation: string; preferredLocation: string
  currentRole: string; currentCompany: string
  experience: string; expectedSalary: string; skills: string
  services: string[]; linkedinUrl: string; naukriUrl: string
}) {
  const now = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })
  return `<!DOCTYPE html><html><head><meta charset="utf-8"></head>
<body style="margin:0;padding:0;background:#f0f2fc;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif">
<div style="max-width:620px;margin:32px auto;background:#fff;border-radius:12px;overflow:hidden;border:1px solid #e2e5f0">
  <div style="background:#1a56ff;padding:24px 32px">
    <h1 style="margin:0;color:#fff;font-size:20px;font-weight:700;font-family:sans-serif">New Lead Received 🎯</h1>
    <p style="margin:6px 0 0;color:rgba(255,255,255,0.8);font-size:13px;font-family:sans-serif">${d.services.join(' · ')}</p>
  </div>
  <div style="padding:28px 32px">
    <table style="width:100%;border-collapse:collapse;border:1px solid #e2e5f0;border-radius:8px;overflow:hidden">
      <tbody>
        ${row('Name', d.fullName)}
        ${row('Email', `<a href="mailto:${d.email}" style="color:#1a56ff;text-decoration:none">${d.email}</a>`)}
        ${row('Phone', `<a href="tel:${d.phone}" style="color:#1a56ff;text-decoration:none">${d.phone}</a>`)}
        ${row('Location', d.currentLocation)}
        ${row('Preferred Location', d.preferredLocation)}
        ${row('Current Role', d.currentRole || 'Not specified')}
        ${row('Company', d.currentCompany || 'Fresher / Not specified')}
        ${row('Experience', d.experience)}
        ${row('Expected Salary', d.expectedSalary || 'Not specified')}
        ${row('Skills', d.skills)}
        ${row('Services', `<strong>${d.services.join(', ')}</strong>`)}
        ${d.linkedinUrl ? row('LinkedIn', `<a href="${d.linkedinUrl}" style="color:#1a56ff">View Profile</a>`) : ''}
        ${d.naukriUrl   ? row('Naukri',   `<a href="${d.naukriUrl}"   style="color:#1a56ff">View Profile</a>`) : ''}
      </tbody>
    </table>
    <div style="margin-top:20px;padding:14px 16px;background:#f0f7ff;border-radius:8px;border-left:4px solid #1a56ff">
      <p style="margin:0;font-size:13px;color:#1a1d2e;font-family:sans-serif">
        <strong>Reply directly</strong> to this email or call the number above to reach the lead.
      </p>
    </div>
  </div>
  <div style="padding:14px 32px;background:#f8f9ff;border-top:1px solid #e2e5f0">
    <p style="margin:0;font-size:12px;color:#5a6080;font-family:sans-serif">Submitted ${now} IST · HireReady</p>
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
    <p style="margin:0;color:#fff;font-size:22px;font-weight:800;font-family:sans-serif">HireReady</p>
  </div>
  <div style="padding:36px 32px">
    <h2 style="margin:0 0 10px;font-size:22px;color:#1a1d2e;font-family:sans-serif">Hi ${d.fullName}! 👋</h2>
    <p style="color:#5a6080;font-size:15px;line-height:1.7;margin:0 0 26px;font-family:sans-serif">
      We've received your application for <strong style="color:#1a56ff">${d.services.join(', ')}</strong>. Our team is already on it!
    </p>
    <div style="background:#f8f9ff;border-radius:10px;padding:22px 24px;margin-bottom:28px">
      <p style="margin:0 0 14px;font-size:12px;font-weight:700;color:#1a1d2e;text-transform:uppercase;letter-spacing:0.07em;font-family:sans-serif">What happens next</p>
      ${steps.map((step, i) => `
      <div style="display:flex;align-items:flex-start;gap:10px;${i < steps.length - 1 ? 'margin-bottom:12px' : ''}">
        <span style="display:inline-block;min-width:24px;height:24px;background:#1a56ff;color:#fff;border-radius:50%;text-align:center;line-height:24px;font-size:12px;font-weight:700;font-family:sans-serif">${i + 1}</span>
        <span style="font-size:14px;color:#5a6080;line-height:1.6;padding-top:3px;font-family:sans-serif">${step}</span>
      </div>`).join('')}
    </div>
    <p style="color:#5a6080;font-size:14px;line-height:1.8;margin:0 0 26px;font-family:sans-serif">
      Questions? Reply to this email or reach us at:<br>
      📞 +91 0000000000 (Mon–Sat, 9am–6pm)
    </p>
  </div>
  <div style="padding:14px 32px;background:#f8f9ff;border-top:1px solid #e2e5f0;text-align:center">
    <p style="margin:0;font-size:12px;color:#5a6080;font-family:sans-serif">© ${new Date().getFullYear()} HireReady. All rights reserved.</p>
  </div>
</div>
</body></html>`
}
