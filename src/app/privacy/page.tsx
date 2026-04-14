import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Privacy Policy – HireReady',
  description: 'Learn how HireReady collects, uses, and protects your personal information when you use our career services.',
}

const sections = [
  {
    title: '1. Introduction',
    content: `HireReady ("we", "our", or "us") is committed to protecting your personal information. This Privacy Policy explains what data we collect, how we use it, who we share it with, and your rights regarding your information.

This policy applies to all information collected through our website (hireready.in) and services, including our application form, email communications, and placement support program.`,
  },
  {
    title: '2. Information We Collect',
    content: `We collect the following types of personal information:

Personal Identification
• Full name, email address, phone number
• Current and preferred job location

Professional Information
• Current job title and company
• Years of experience and expected salary
• Key skills and professional background
• LinkedIn and Naukri profile URLs

Documents (for Placement Support applicants)
• Resume / CV (PDF or Word format)
• Passport-size photograph
• Scanned signature (for placement agreement)

Technical Information
• IP address, browser type, and device information (collected automatically via cookies and analytics)
• Pages visited and time spent on our website`,
  },
  {
    title: '3. How We Use Your Information',
    content: `We use the information we collect for the following purposes:

Service Delivery
• To review your application and match you with suitable opportunities
• To create and optimize your resume, LinkedIn, and Naukri profiles
• To provide placement support, referrals, and interview preparation

Communication
• To contact you within 24 hours of application submission
• To send job alerts, interview schedules, and program updates
• To send transactional emails (application confirmation, placement notifications)

Internal Operations
• To improve our services and understand how candidates use our platform
• To maintain records for legal and compliance purposes
• To process placement fee agreements`,
  },
  {
    title: '4. How We Store Your Information',
    content: `Your data is stored securely on Supabase (a cloud database platform) hosted in the Asia-Pacific region. Uploaded files — including resumes, photographs, and signatures — are stored in a private, access-controlled storage bucket.

We retain your personal data for up to 2 years after your last interaction with HireReady, or as required by law. After this period, data is permanently deleted.

We implement appropriate technical and organisational measures to protect your data against unauthorised access, loss, or disclosure.`,
  },
  {
    title: '5. Who We Share Your Information With',
    content: `We do not sell your personal information to third parties.

We may share your information with:

• Hiring partners and employers — only with your consent and as part of the placement process
• Email service providers — we use Resend to send transactional emails; they process your email address on our behalf
• Database providers — Supabase stores your application data; they operate under strict data protection standards
• Legal authorities — if required by law or to protect the rights, property, or safety of HireReady or others

All third-party service providers are contractually bound to handle your data securely and only for the purposes we specify.`,
  },
  {
    title: '6. Cookies & Tracking',
    content: `Our website uses minimal cookies for functionality purposes, including:

• Theme preference (light/dark mode) — stored in localStorage
• Session management for the application form

We do not currently use third-party advertising or tracking cookies. If you disable cookies, certain features of the website may not function correctly.`,
  },
  {
    title: '7. Your Rights',
    content: `You have the following rights regarding your personal information:

• Access — request a copy of the personal data we hold about you
• Correction — request that we correct inaccurate or incomplete information
• Deletion — request that we delete your personal data (subject to legal obligations)
• Portability — request your data in a structured, machine-readable format
• Objection — object to the processing of your data for marketing purposes
• Withdrawal of consent — withdraw consent at any time where processing is based on consent

To exercise any of these rights, contact us at support@hireready.in. We will respond within 30 days.`,
  },
  {
    title: '8. Data Security',
    content: `We take the security of your personal data seriously. Measures we have in place include:

• All data transmission is encrypted using HTTPS/TLS
• Uploaded files are stored in private (non-public) storage buckets
• Database access is restricted to authenticated server-side processes only
• Service role keys and API credentials are never exposed to the browser
• Access to your data is limited to authorised HireReady team members

Despite these measures, no system is 100% secure. If you believe your data has been compromised, contact us immediately at support@hireready.in.`,
  },
  {
    title: '9. Children\'s Privacy',
    content: `Our services are not directed to individuals under the age of 18. We do not knowingly collect personal information from minors. If you believe we have inadvertently collected data from a minor, please contact us and we will delete it promptly.`,
  },
  {
    title: '10. Changes to This Policy',
    content: `We may update this Privacy Policy from time to time. When we make significant changes, we will update the "Last updated" date at the top of this page. We encourage you to review this policy periodically.

Continued use of our services after changes are posted constitutes your acceptance of the updated Privacy Policy.`,
  },
  {
    title: '11. Contact Us',
    content: `If you have any questions, concerns, or requests regarding this Privacy Policy or how we handle your data, please contact us:

Email: support@hireready.in
Phone: +91 0000000000
Hours: Monday – Saturday, 9:00 AM – 6:00 PM IST

We are committed to resolving any privacy concerns promptly and transparently.`,
  },
]

export default function PrivacyPage() {
  return (
    <>
      {/* Page Hero */}
      <section className="bg-surface pt-[72px] pb-14 border-b border-frame">
        <div className="max-w-content mx-auto px-6">
          <div className="inline-block font-dm text-[13px] font-medium tracking-[0.1em] uppercase text-primary bg-primary/[0.08] px-3.5 py-1.5 rounded-[30px] mb-4">
            Legal
          </div>
          <h1 className="font-syne text-[clamp(28px,4vw,44px)] font-bold text-prose mb-3">
            Privacy Policy
          </h1>
          <p className="text-muted text-[15px]">
            Effective date: April 2025 &nbsp;·&nbsp; Last updated: April 2025
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 bg-page">
        <div className="max-w-[780px] mx-auto px-6">
          <p className="text-muted text-[15px] leading-[1.8] mb-10 p-5 bg-surface border border-frame rounded-xl">
            Your privacy matters to us. This policy explains exactly what personal data HireReady collects, why we collect it, and how we keep it safe. We never sell your data to third parties.
          </p>

          <div className="space-y-10">
            {sections.map(({ title, content }) => (
              <div key={title}>
                <h2 className="font-syne text-[18px] font-bold text-prose mb-3">{title}</h2>
                <div className="text-muted text-[15px] leading-[1.85] whitespace-pre-line">{content}</div>
                <div className="mt-8 border-b border-frame" />
              </div>
            ))}
          </div>

          {/* Footer nav */}
          <div className="mt-12 flex flex-wrap gap-4 text-sm">
            <Link href="/terms" className="text-primary font-medium hover:underline">
              Terms &amp; Conditions →
            </Link>
            <Link href="/placement" className="text-primary font-medium hover:underline">
              Placement Agreement →
            </Link>
            <Link href="/apply" className="text-primary font-medium hover:underline">
              Apply Now →
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
