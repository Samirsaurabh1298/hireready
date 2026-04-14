import Link from 'next/link'
import AnimateOnScroll from '@/components/AnimateOnScroll'

const stats = [
  { value: '500+', label: 'Candidates Assisted' },
  { value: '120+', label: 'Successful Placements' },
  { value: '50+', label: 'Partner Companies' },
  { value: '98%', label: 'Satisfaction Rate' },
]

const services = [
  {
    icon: '📄',
    title: 'Resume Writing',
    desc: "ATS-friendly resumes crafted by experts to get you past automated filters and into recruiters' hands.",
    price: 'Starting ₹999',
    href: '/services#resume',
    accent: false,
  },
  {
    icon: '🔍',
    title: 'Naukri Optimization',
    desc: 'Boost your Naukri.com profile visibility with keyword-rich headlines and skill optimization.',
    price: '₹999',
    href: '/services#naukri',
    accent: false,
  },
  {
    icon: '💼',
    title: 'LinkedIn Optimization',
    desc: 'Transform your LinkedIn into a recruiter magnet with a powerful headline, About section, and SEO.',
    price: '₹1,499',
    href: '/services#linkedin',
    accent: true,
  },
  {
    icon: '🎯',
    title: 'Placement Support',
    desc: 'End-to-end job placement assistance with referrals, job alerts, and interview preparation.',
    price: 'Post-placement fee',
    href: '/placement',
    accent: false,
  },
]

const whyList = [
  'Industry experts with 10+ years of hiring experience',
  'ATS-optimized resumes that beat filters',
  'Direct recruiter connections at top companies',
  'Personalized support — not generic templates',
  'Pay for placement only after you get hired',
  'Interview preparation included',
]

const companies = ['TCS', 'Infosys', 'Wipro', 'HCL', 'Accenture', 'Cognizant', 'Tech Mahindra', 'Capgemini']

export default function HomePage() {
  return (
    <>
      {/* ===== HERO ===== */}
      <section className="relative bg-dark pt-[100px] pb-20 overflow-hidden">
        <div className="hero-bg-gradient" aria-hidden="true" />
        <div className="relative z-10 max-w-content mx-auto px-6 max-w-[760px]">
          <div className="inline-block bg-[rgba(26,86,255,0.2)] text-[#7fa7ff] border border-[rgba(26,86,255,0.35)] px-4 py-[7px] rounded-[30px] text-[13px] font-medium tracking-[0.05em] mb-6">
            🚀 500+ Candidates Placed
          </div>

          <h1 className="font-syne text-[clamp(38px,5vw,62px)] font-extrabold text-white mb-[22px] leading-tight">
            Get <span className="text-primary">Hired Faster</span>
            <br />With Expert Career Support
          </h1>

          <p className="text-white/80 text-lg max-w-[580px] mb-9 leading-[1.7]">
            Professional Resume Writing, LinkedIn &amp; Naukri Optimization, and end-to-end Placement
            Support — tailored for freshers and job seekers.
          </p>

          <div className="flex gap-4 mb-14 flex-wrap">
            <Link
              href="/apply"
              className="inline-block bg-primary text-white px-7 py-[13px] rounded-lg font-syne font-semibold text-[15px] hover:bg-primary-dark hover:-translate-y-0.5 transition-all shadow-[0_4px_16px_rgba(26,86,255,0.25)] hover:shadow-[0_8px_24px_rgba(26,86,255,0.35)]"
            >
              Apply Now — It&apos;s Free
            </Link>
            <Link
              href="/services"
              className="inline-block bg-transparent text-primary px-7 py-[13px] rounded-lg font-syne font-semibold text-[15px] border-2 border-primary hover:bg-primary hover:text-white transition-all"
            >
              Explore Services
            </Link>
          </div>

          <div className="flex gap-10 flex-wrap">
            {stats.map(({ value, label }) => (
              <div key={label}>
                <span className="block font-syne text-[32px] font-extrabold text-white">{value}</span>
                <p className="text-[13px] text-white/70 mt-0.5">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== SERVICES OVERVIEW ===== */}
      <section className="py-20 bg-surface">
        <div className="max-w-content mx-auto px-6">
          <div className="inline-block font-dm text-[13px] font-medium tracking-[0.1em] uppercase text-primary bg-primary/[0.08] px-3.5 py-1.5 rounded-[30px] mb-4">
            What We Offer
          </div>
          <h2 className="font-syne text-[clamp(28px,3.5vw,42px)] font-bold text-prose mb-12">
            Career Services Built
            <br />
            <span className="text-primary">For Your Success</span>
          </h2>
          <div className="grid grid-cols-[repeat(auto-fit,minmax(240px,1fr))] gap-6">
            {services.map(({ icon, title, desc, price, href, accent }) => (
              <AnimateOnScroll
                key={title}
                className={`rounded-card p-8 border transition-all hover:-translate-y-1 hover:shadow-card-lg ${
                  accent
                    ? 'bg-primary border-primary text-white'
                    : 'bg-card border-frame'
                }`}
              >
                <div className="text-[36px] mb-[18px]">{icon}</div>
                <h3 className="font-syne text-xl font-bold mb-2.5">{title}</h3>
                <p className={`text-sm leading-relaxed mb-4 ${accent ? 'text-white/80' : 'text-muted'}`}>
                  {desc}
                </p>
                <div className={`font-syne font-bold text-base mb-3 ${accent ? 'text-white/90' : 'text-primary'}`}>
                  {price}
                </div>
                <Link
                  href={href}
                  className={`text-sm font-semibold ${accent ? 'text-white/90' : 'text-primary'}`}
                >
                  Learn More →
                </Link>
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* ===== WHY US ===== */}
      <section className="py-20 bg-page">
        <div className="max-w-content mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left: text */}
            <div>
              <div className="inline-block font-dm text-[13px] font-medium tracking-[0.1em] uppercase text-primary bg-primary/[0.08] px-3.5 py-1.5 rounded-[30px] mb-4">
                Why HireReady
              </div>
              <h2 className="font-syne text-[clamp(26px,3vw,38px)] font-bold text-prose mb-7">
                We Don&apos;t Just Advise —
                <br />
                <span className="text-primary">We Get You Hired</span>
              </h2>
              <ul className="list-none mb-9">
                {whyList.map(item => (
                  <li key={item} className="flex items-start gap-3 py-2.5 text-[15px] border-b border-frame">
                    <span className="text-primary font-bold text-base flex-shrink-0">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
              <Link
                href="/apply"
                className="inline-block bg-primary text-white px-7 py-[13px] rounded-lg font-syne font-semibold text-[15px] hover:bg-primary-dark hover:-translate-y-0.5 transition-all shadow-[0_4px_16px_rgba(26,86,255,0.25)]"
              >
                Start Your Journey
              </Link>
            </div>

            {/* Right: testimonial cards */}
            <div className="flex flex-col gap-5">
              <AnimateOnScroll className="bg-card border border-frame rounded-card p-6 shadow-card">
                <div className="flex items-center gap-3.5 mb-3">
                  <div className="w-[42px] h-[42px] rounded-full bg-primary text-white flex items-center justify-center font-bold text-sm flex-shrink-0">
                    AK
                  </div>
                  <div>
                    <strong className="text-[15px] block font-syne">Amit Kumar</strong>
                    <small className="text-[13px] text-muted">Software Engineer @ TCS</small>
                  </div>
                </div>
                <p className="text-sm text-muted italic">
                  &ldquo;HireReady completely revamped my resume and LinkedIn. Got interview calls within a week!&rdquo;
                </p>
                <div className="text-[#f59e0b] mt-2.5 text-[15px]">★★★★★</div>
              </AnimateOnScroll>

              <AnimateOnScroll className="bg-card border border-frame rounded-card p-6 shadow-card ml-8">
                <div className="flex items-center gap-3.5 mb-3">
                  <div className="w-[42px] h-[42px] rounded-full bg-[#f97316] text-white flex items-center justify-center font-bold text-sm flex-shrink-0">
                    PR
                  </div>
                  <div>
                    <strong className="text-[15px] block font-syne">Priya Rao</strong>
                    <small className="text-[13px] text-muted">HR Executive @ Infosys</small>
                  </div>
                </div>
                <p className="text-sm text-muted italic">
                  &ldquo;The placement support program is amazing. Landed my first job in 3 weeks!&rdquo;
                </p>
                <div className="text-[#f59e0b] mt-2.5 text-[15px]">★★★★★</div>
              </AnimateOnScroll>
            </div>
          </div>
        </div>
      </section>

      {/* ===== COMPANIES ===== */}
      <section className="py-12 bg-surface-alt text-center">
        <div className="max-w-content mx-auto px-6">
          <p className="text-muted text-sm mb-6">Our candidates work at top companies</p>
          <div className="flex flex-wrap justify-center gap-3">
            {companies.map(c => (
              <span
                key={c}
                className="bg-card border border-frame px-6 py-2.5 rounded-lg font-semibold text-sm text-muted"
              >
                {c}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CTA BANNER ===== */}
      <section className="bg-primary py-[72px] text-center">
        <div className="max-w-content mx-auto px-6">
          <h2 className="font-syne text-[clamp(26px,3vw,38px)] font-bold text-white mb-3.5">
            Ready to Land Your Dream Job?
          </h2>
          <p className="text-white/80 text-[17px] mb-8">
            Fill out our free application form and our team will reach out within 24 hours.
          </p>
          <Link
            href="/apply"
            className="inline-block bg-white text-primary px-[38px] py-4 rounded-lg font-syne font-semibold text-[17px] hover:bg-surface hover:-translate-y-0.5 transition-all shadow-[0_4px_24px_rgba(0,0,0,0.15)]"
          >
            Apply Now — Free Consultation
          </Link>
        </div>
      </section>
    </>
  )
}
