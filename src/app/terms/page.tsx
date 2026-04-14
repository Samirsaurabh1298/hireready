import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Terms & Conditions – HireReady',
  description: 'Read the Terms & Conditions governing the use of HireReady services including Resume Writing, LinkedIn Optimization, Naukri Optimization, and Placement Support.',
}

const sections = [
  {
    title: '1. Acceptance of Terms',
    content: `By accessing or using HireReady's website and services, you agree to be bound by these Terms & Conditions. If you do not agree with any part of these terms, please do not use our services. These terms apply to all visitors, users, and clients of HireReady.`,
  },
  {
    title: '2. Services Offered',
    content: `HireReady provides the following career services:

• Resume Writing — ATS-optimized resumes delivered in PDF and editable Word format within 48–72 hours.
• Naukri Profile Optimization — Keyword-rich headline, summary, and skills optimization to boost recruiter visibility on Naukri.com.
• LinkedIn Profile Optimization — Complete rewrite of headline, About section, Experience, and Skills to improve recruiter discovery.
• Placement Support Program — End-to-end job placement assistance including referrals, job alerts, mock interviews, and career coaching.

All services are subject to availability and may be modified, suspended, or discontinued at any time with reasonable notice.`,
  },
  {
    title: '3. Pricing & Payments',
    content: `Service fees are as listed on the website at the time of purchase:

• Resume Writing: ₹999 – ₹1,999 depending on experience level
• Naukri Optimization: ₹999 (one-time)
• LinkedIn Optimization: ₹1,499 (complete overhaul)
• Placement Support: ₹60,000 (payable only after successful placement)

Payments for resume, LinkedIn, and Naukri services are due before work commences. For Placement Support, no upfront fee is charged. The placement fee of ₹60,000 is payable only after you receive and accept a job offer facilitated through HireReady.`,
  },
  {
    title: '4. Refund Policy',
    content: `Resume Writing, Naukri Optimization & LinkedIn Optimization:
Refund requests are considered within 48 hours of purchase, provided no work has been commenced. Once work has started, no refund will be issued. One free revision is included with every resume order.

Placement Support Program:
Since the placement fee is charged only after successful job placement, no refund is applicable once the fee has been paid. There is no upfront fee to request a refund for.

To request a refund, contact us at support@hireready.in within the eligible window.`,
  },
  {
    title: '5. Placement Support Agreement',
    content: `Enrollment in the Placement Support Program requires:

• Submission of a signed Placement Agreement
• A recent passport-size photograph
• A valid resume

By submitting the application form and uploading your signature, you acknowledge and agree to all terms of the Placement Support Agreement. The placement fee of ₹60,000 becomes due and payable within 7 days of accepting a job offer facilitated by HireReady.

Active placement support is provided for up to 6 months from the date of enrollment. After 6 months, the program may be renewed at HireReady's discretion.`,
  },
  {
    title: '6. Client Responsibilities',
    content: `As a client, you agree to:

• Provide accurate, truthful, and complete information in your application and profile
• Respond promptly to communications from our team
• Attend scheduled mock interviews and coaching sessions
• Notify HireReady immediately upon receiving a job offer facilitated through our program
• Pay the applicable placement fee as per the signed agreement`,
  },
  {
    title: '7. Intellectual Property',
    content: `All content on the HireReady website — including text, graphics, logos, and service descriptions — is the property of HireReady and is protected under applicable intellectual property laws. Resumes and profile content created for clients remain the property of the client upon full payment.

You may not reproduce, distribute, or use any part of our website content without prior written consent from HireReady.`,
  },
  {
    title: '8. Limitation of Liability',
    content: `HireReady provides career support services and acts as a facilitator between candidates and potential employers. We do not guarantee employment or specific outcomes. Our liability is limited to the amount paid for the specific service in question.

HireReady is not liable for:
• Job offers that are withdrawn after acceptance
• Salary outcomes or role suitability
• Delays caused by client non-responsiveness
• Inaccurate information provided by the client`,
  },
  {
    title: '9. Privacy',
    content: `Your use of HireReady services is also governed by our Privacy Policy, which is incorporated into these Terms by reference. By using our services, you consent to the collection and use of your information as described in the Privacy Policy.`,
  },
  {
    title: '10. Termination',
    content: `HireReady reserves the right to terminate or suspend access to our services at any time, without prior notice, if we believe you have violated these Terms & Conditions or engaged in fraudulent, abusive, or unethical behaviour.

Clients may discontinue participation in the Placement Support Program at any time by notifying us in writing at support@hireready.in. Any outstanding placement fees remain due and payable.`,
  },
  {
    title: '11. Governing Law',
    content: `These Terms & Conditions are governed by and construed in accordance with the laws of India. Any disputes arising from these terms shall be subject to the exclusive jurisdiction of the courts located in India.`,
  },
  {
    title: '12. Changes to Terms',
    content: `HireReady reserves the right to update or modify these Terms & Conditions at any time. Changes will be posted on this page with an updated effective date. Continued use of our services after changes are posted constitutes your acceptance of the revised terms.`,
  },
  {
    title: '13. Contact Us',
    content: `If you have any questions about these Terms & Conditions, please contact us:

Email: support@hireready.in
Phone: +91 0000000000
Hours: Monday – Saturday, 9:00 AM – 6:00 PM IST`,
  },
]

export default function TermsPage() {
  return (
    <>
      {/* Page Hero */}
      <section className="bg-surface pt-[72px] pb-14 border-b border-frame">
        <div className="max-w-content mx-auto px-6">
          <div className="inline-block font-dm text-[13px] font-medium tracking-[0.1em] uppercase text-primary bg-primary/[0.08] px-3.5 py-1.5 rounded-[30px] mb-4">
            Legal
          </div>
          <h1 className="font-syne text-[clamp(28px,4vw,44px)] font-bold text-prose mb-3">
            Terms &amp; Conditions
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
            Please read these Terms &amp; Conditions carefully before using HireReady&apos;s services. By accessing our website or submitting an application, you agree to be bound by these terms.
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
            <Link href="/privacy" className="text-primary font-medium hover:underline">
              Privacy Policy →
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
