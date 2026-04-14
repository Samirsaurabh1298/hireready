'use server'

import { createServerClient } from '@/lib/supabase'

async function sendBrevoEmail(to: string, toName: string, subject: string, html: string) {
  const res = await fetch('https://api.brevo.com/v3/smtp/email', {
    method: 'POST',
    headers: {
      'accept': 'application/json',
      'api-key': process.env.BREVO_API_KEY!,
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      sender:      { name: 'HireReady', email: 'supporthireready@gmail.com' },
      to:          [{ email: to, name: toName }],
      subject,
      htmlContent: html,
    }),
  })
  const data = await res.json()
  if (!res.ok) console.error('Brevo error:', data)
  else console.log('Brevo email sent to', to, '— messageId:', data.messageId)
}

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

    // Send emails via Brevo (HTTP API — works reliably on Vercel, no domain needed)
    const teamEmail = process.env.TEAM_EMAIL ?? 'supporthireready@gmail.com'
    await Promise.all([
      sendBrevoEmail(
        teamEmail, 'HireReady Team',
        `New Lead: ${fullName} — ${services.join(', ')}`,
        teamEmailHtml({
          fullName, email, phone, currentLocation, preferredLocation,
          currentRole, currentCompany, experience, expectedSalary,
          skills, services, linkedinUrl, naukriUrl,
        }),
      ),
      sendBrevoEmail(
        email, fullName,
        'We received your application — HireReady',
        applicantEmailHtml({ fullName, services }),
      ),
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
  <div style="background:#ffffff;padding:16px 32px;border-bottom:1px solid #e2e5f0">
    <img src="https://hireready-xi-nine.vercel.app/images/hireready-logo.png" alt="HireReady" width="160" style="display:block;max-width:160px" />
  </div>
  <div style="background:#1a56ff;padding:20px 32px">
    <h1 style="margin:0;color:#fff;font-size:18px;font-weight:700;font-family:sans-serif">New Lead Received 🎯</h1>
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
  const firstName = d.fullName.split(' ')[0]
  return `<!DOCTYPE html><html><head><meta charset="utf-8"></head>
<body style="margin:0;padding:0;background:#f4f6fb;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Arial,sans-serif">
<div style="max-width:560px;margin:40px auto;background:#ffffff;border-radius:10px;overflow:hidden;border:1px solid #e2e5f0">

  <!-- Header -->
  <div style="background:#ffffff;padding:20px 32px;text-align:center;border-bottom:1px solid #e2e5f0">
    <img src="https://hireready-xi-nine.vercel.app/images/hireready-logo.png" alt="HireReady" width="160" style="display:block;margin:0 auto;max-width:160px" />
  </div>
  <div style="background:#1a56ff;padding:20px 32px;text-align:center">
    <p style="margin:0;color:#ffffff;font-size:15px;font-weight:600;font-family:sans-serif">Career Services &amp; Placement Support</p>
  </div>

  <!-- Body -->
  <div style="padding:40px 36px">
    <p style="margin:0 0 20px;font-size:16px;color:#1a1d2e;line-height:1.6">Hello ${firstName},</p>

    <p style="margin:0 0 20px;font-size:15px;color:#4a5068;line-height:1.75">
      We've received your application for
      <strong style="color:#1a1d2e">${d.services.join(', ')}</strong>.
    </p>

    <p style="margin:0 0 20px;font-size:15px;color:#4a5068;line-height:1.75">
      We will review your submission and get back to you within <strong style="color:#1a1d2e">24 hours</strong>.
      In the meantime, feel free to explore our services or reach out if you have any questions.
    </p>

    <p style="margin:0 0 32px;font-size:15px;color:#4a5068;line-height:1.75">
      Thanks for choosing HireReady. We're excited to help you take the next step in your career!
    </p>

    <!-- CTA -->
    <div style="text-align:center;margin-bottom:32px">
      <a href="https://hireready-xi-nine.vercel.app" style="display:inline-block;background:#1a56ff;color:#ffffff;text-decoration:none;padding:13px 28px;border-radius:8px;font-size:15px;font-weight:600;letter-spacing:0.2px">
        Visit HireReady →
      </a>
    </div>

    <hr style="border:none;border-top:1px solid #e8eaf0;margin:0 0 24px">

    <p style="margin:0;font-size:13px;color:#8a93b0;line-height:1.7">
      Questions? Reply to this email or contact us at
      <a href="mailto:supporthireready@gmail.com" style="color:#1a56ff;text-decoration:none">supporthireready@gmail.com</a><br>
      We're available Mon – Sat, 9:00 AM – 6:00 PM IST.
    </p>
  </div>

  <!-- Footer -->
  <div style="background:#f8f9ff;border-top:1px solid #e2e5f0;padding:16px 36px;text-align:center">
    <p style="margin:0;font-size:12px;color:#a0a8c0">© ${new Date().getFullYear()} HireReady. All rights reserved.</p>
  </div>

</div>
</body></html>`
}
