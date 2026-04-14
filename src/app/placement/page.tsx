import type { Metadata } from 'next'
import Link from 'next/link'
import AnimateOnScroll from '@/components/AnimateOnScroll'

export const metadata: Metadata = {
  title: 'Placement Support – HireReady',
  description: 'End-to-end placement support. No upfront fee — pay ₹60,000 only after you get placed.',
}

const steps = [
  {
    num: '01',
    title: 'Apply & Submit Your Details',
    desc: 'Fill our application form with your resume, photo, and signed placement agreement.',
    fee: false,
  },
  {
    num: '02',
    title: 'Profile Review & Optimization',
    desc: 'Our team reviews your profile and optimizes your resume and LinkedIn for maximum impact.',
    fee: false,
  },
  {
    num: '03',
    title: 'Job Matching & Referrals',
    desc: 'We match you with relevant openings and provide direct referrals to our hiring partners.',
    fee: false,
  },
  {
    num: '04',
    title: 'Interview Preparation',
    desc: 'Mock interviews, common questions, and coaching to maximize your chances of success.',
    fee: false,
  },
  {
    num: '05',
    title: 'Job Offer & Placement',
    desc: 'You receive a job offer and join your new company. Congratulations!',
    fee: false,
  },
  {
    num: '06',
    title: 'Pay Placement Fee',
    desc: 'Only after successful placement, pay the ₹60,000 placement support fee as per your agreement.',
    fee: true,
  },
]

const includes = [
  'Resume writing & optimization',
  'LinkedIn profile overhaul',
  'Naukri profile optimization',
  'Direct job referrals',
  'Daily/weekly job alerts',
  'Interview preparation sessions',
  'Mock interview practice',
  'Dedicated career advisor',
  'WhatsApp job group access',
  'Salary negotiation guidance',
]

const terms = [
  {
    icon: '💰',
    title: 'Placement Fee',
    body: 'A placement support fee of ₹60,000 is payable only after you receive and accept a job offer through our program. No upfront fee is charged for placement support.',
  },
  {
    icon: '📋',
    title: 'Agreement Requirements',
    body: 'To enroll in the Placement Support program, candidates must submit a signed placement agreement along with a recent photograph. Both are mandatory.',
  },
  {
    icon: '✅',
    title: 'Eligibility',
    body: 'The program is open to freshers and experienced professionals. A valid resume and basic qualifications are required. Our team will assess eligibility after application.',
  },
  {
    icon: '⏱️',
    title: 'Program Duration',
    body: 'Active placement support is provided for up to 6 months. Job alerts and referrals are sent regularly throughout this period.',
  },
  {
    icon: '🔒',
    title: 'Data Privacy',
    body: 'Your personal information, resume, photo, and signature are stored securely and used solely for placement purposes. We never share your data without consent.',
  },
  {
    icon: '❌',
    title: 'Refund Policy',
    body: 'Since placement fee is post-placement, no refunds are applicable. For other services (resume, LinkedIn), refunds are considered within 48 hours of purchase if no work has started.',
  },
]

export default function PlacementPage() {
  return (
    <>
      {/* PAGE HERO — dark variant */}
      <section className="bg-dark pt-[72px] pb-16 border-b border-white/10">
        <div className="max-w-content mx-auto px-6">
          <div className="inline-block font-dm text-[13px] font-medium tracking-[0.1em] uppercase text-primary bg-primary/[0.2] px-3.5 py-1.5 rounded-[30px] mb-4">
            Placement Support Program
          </div>
          <h1 className="font-syne text-[clamp(30px,4vw,50px)] font-bold text-white mb-4">
            We Help You Get Hired.
            <br />
            <span className="text-primary">You Pay Only After.</span>
          </h1>
          <p className="text-white/80 text-[17px] max-w-[560px] mb-8">
            No upfront placement fee. Join our program, get placed, then pay ₹60,000 — only if we
            successfully place you.
          </p>
          <Link
            href="/apply"
            className="inline-block bg-primary text-white px-[38px] py-4 rounded-lg font-syne font-semibold text-[17px] hover:bg-primary-dark hover:-translate-y-0.5 transition-all shadow-[0_4px_16px_rgba(26,86,255,0.25)]"
          >
            Apply to the Program
          </Link>
        </div>
      </section>

      {/* ===== HOW IT WORKS ===== */}
      <section className="py-20">
        <div className="max-w-content mx-auto px-6">
          <div className="inline-block font-dm text-[13px] font-medium tracking-[0.1em] uppercase text-primary bg-primary/[0.08] px-3.5 py-1.5 rounded-[30px] mb-4">
            How It Works
          </div>
          <h2 className="font-syne text-[clamp(26px,3vw,38px)] font-bold text-prose">
            Your Journey to <span className="text-primary">Getting Hired</span>
          </h2>
          <div className="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-6 mt-10">
            {steps.map(({ num, title, desc, fee }) => (
              <AnimateOnScroll
                key={num}
                className={`bg-card border rounded-card p-7 relative ${
                  fee ? 'border-accent' : 'border-frame'
                }`}
              >
                <div className="font-syne text-[36px] font-extrabold text-primary/[0.12] mb-2.5">
                  {num}
                </div>
                <h3 className="font-syne text-[17px] font-bold mb-2 text-prose">{title}</h3>
                <p className="text-sm text-muted leading-relaxed">{desc}</p>
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* ===== WHAT'S INCLUDED ===== */}
      <section className="py-20 bg-surface-alt">
        <div className="max-w-content mx-auto px-6">
          <div className="inline-block font-dm text-[13px] font-medium tracking-[0.1em] uppercase text-primary bg-primary/[0.08] px-3.5 py-1.5 rounded-[30px] mb-4">
            Program Includes
          </div>
          <h2 className="font-syne text-[clamp(26px,3vw,38px)] font-bold text-prose">
            Everything You Need to
            <br />
            <span className="text-primary">Land Your Next Role</span>
          </h2>
          <div className="grid grid-cols-[repeat(auto-fill,minmax(260px,1fr))] gap-4 mt-10">
            {includes.map(item => (
              <AnimateOnScroll
                key={item}
                className="flex items-center gap-3 bg-card border border-frame px-5 py-4 rounded-[10px] text-[15px] font-medium text-prose"
              >
                <span className="text-primary font-bold text-lg">✓</span>
                {item}
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* ===== TERMS & CONDITIONS ===== */}
      <section className="py-20">
        <div className="max-w-content mx-auto px-6">
          <div className="inline-block font-dm text-[13px] font-medium tracking-[0.1em] uppercase text-primary bg-primary/[0.08] px-3.5 py-1.5 rounded-[30px] mb-4">
            Important Terms
          </div>
          <h2 className="font-syne text-[clamp(26px,3vw,38px)] font-bold text-prose">
            Placement Agreement &amp;
            <br />
            <span className="text-primary">Terms &amp; Conditions</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
            {terms.map(({ icon, title, body }) => (
              <AnimateOnScroll
                key={title}
                className="bg-card border border-frame rounded-card p-6"
              >
                <h4 className="font-syne text-base font-bold mb-2.5">
                  {icon} {title}
                </h4>
                <p className="text-sm text-muted leading-[1.7]"
                   dangerouslySetInnerHTML={{ __html: body.replace('₹60,000', '<strong>₹60,000</strong>') }}
                />
              </AnimateOnScroll>
            ))}
          </div>
          <div className="mt-6 bg-accent/[0.07] border border-accent/25 rounded-[10px] px-[22px] py-[18px] text-sm text-accent leading-relaxed">
            ⚠️ By submitting the application form and uploading your signature, you agree to the
            HireReady Placement Support Agreement. Please read all terms carefully before applying.
          </div>
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section className="bg-primary py-[72px] text-center">
        <div className="max-w-content mx-auto px-6">
          <h2 className="font-syne text-[clamp(26px,3vw,38px)] font-bold text-white mb-3.5">
            Ready to Join the Program?
          </h2>
          <p className="text-white/80 text-[17px] mb-8">
            Apply now — no payment required upfront. We get paid when you get placed.
          </p>
          <Link
            href="/apply"
            className="inline-block bg-white text-primary px-[38px] py-4 rounded-lg font-syne font-semibold text-[17px] hover:bg-surface hover:-translate-y-0.5 transition-all shadow-[0_4px_24px_rgba(0,0,0,0.15)]"
          >
            Apply for Placement Support
          </Link>
        </div>
      </section>
    </>
  )
}
