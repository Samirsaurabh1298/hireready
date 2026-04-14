import type { Metadata } from 'next'
import Link from 'next/link'
import AnimateOnScroll from '@/components/AnimateOnScroll'

export const metadata: Metadata = {
  title: 'Services – HireReady',
  description: 'Professional career services: Resume Writing, Naukri Optimization, and LinkedIn Optimization designed to get you hired.',
}

export default function ServicesPage() {
  return (
    <>
      {/* PAGE HERO */}
      <section className="bg-surface pt-[72px] pb-16 border-b border-frame">
        <div className="max-w-content mx-auto px-6">
          <div className="inline-block font-dm text-[13px] font-medium tracking-[0.1em] uppercase text-primary bg-primary/[0.08] px-3.5 py-1.5 rounded-[30px] mb-4">
            Our Services
          </div>
          <h1 className="font-syne text-[clamp(30px,4vw,50px)] font-bold text-prose mb-4">
            Professional Career Services
            <br />
            <span className="text-primary">Designed to Get You Hired</span>
          </h1>
          <p className="text-muted text-[17px] max-w-[560px]">
            Choose from our expert-crafted services built for freshers, job seekers, and professionals
            looking to level up.
          </p>
        </div>
      </section>

      {/* ===== RESUME WRITING ===== */}
      <section className="py-20" id="resume">
        <div className="max-w-content mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Info */}
          <div>
            <div className="inline-block bg-primary/[0.08] text-primary px-4 py-2 rounded-[30px] text-sm font-semibold mb-[18px]">
              📄 Resume Writing
            </div>
            <h2 className="font-syne text-[clamp(24px,3vw,36px)] font-bold text-prose mb-4">
              ATS-Optimized Resume
              <br />
              <span className="text-primary">That Gets Noticed</span>
            </h2>
            <p className="text-muted mb-6 leading-[1.7]">
              Your resume is your first impression. Our experts create powerful, ATS-friendly resumes
              that pass automated filters and make recruiters stop scrolling.
            </p>
            <div className="mb-6">
              <h4 className="text-[15px] font-bold mb-3 font-syne">What You Get:</h4>
              <ul className="list-none">
                {[
                  'ATS-friendly resume format',
                  'PDF + Editable Word format',
                  'Tailored to your industry',
                  'Keyword-optimized content',
                  '1 free revision included',
                  'Delivered in 48–72 hours',
                ].map(item => (
                  <li key={item} className="py-[7px] text-[15px] border-b border-frame text-prose">
                    ✓ {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex items-baseline gap-3 mb-7">
              <span className="font-syne text-[28px] font-extrabold text-primary">₹999 – ₹1,999</span>
              <span className="text-sm text-muted">Based on experience level</span>
            </div>
            <Link
              href="/apply"
              className="inline-block bg-primary text-white px-7 py-[13px] rounded-lg font-syne font-semibold text-[15px] hover:bg-primary-dark hover:-translate-y-0.5 transition-all shadow-[0_4px_16px_rgba(26,86,255,0.25)]"
            >
              Get Your Resume Done
            </Link>
          </div>

          {/* Resume preview visual */}
          <AnimateOnScroll>
            <div className="bg-card border border-frame rounded-xl p-7 shadow-card-lg relative">
              <div className="border-b-2 border-primary pb-4 mb-4">
                <div className="font-syne text-xl font-extrabold">Your Name</div>
                <div className="text-[13px] text-muted mt-0.5">Software Engineer</div>
                <div className="text-xs text-muted">📧 email@email.com &nbsp;|&nbsp; 📞 +91 XXXXXX</div>
              </div>
              {[
                { title: 'EXPERIENCE', lines: ['long', 'medium', 'short'] as const },
                { title: 'EDUCATION', lines: ['long', 'medium'] as const },
              ].map(({ title, lines }) => (
                <div key={title} className="mb-4">
                  <div className="text-[11px] font-bold tracking-[0.12em] text-primary mb-2 uppercase">
                    {title}
                  </div>
                  {lines.map((size, i) => (
                    <div
                      key={i}
                      className={`h-2 bg-frame rounded mb-1.5 ${
                        size === 'long' ? 'w-[90%]' : size === 'medium' ? 'w-[70%]' : 'w-[50%]'
                      }`}
                    />
                  ))}
                </div>
              ))}
              <div className="mb-4">
                <div className="text-[11px] font-bold tracking-[0.12em] text-primary mb-2 uppercase">SKILLS</div>
                <div className="flex flex-wrap gap-2">
                  {['JavaScript', 'React', 'Node.js', 'SQL'].map(s => (
                    <span key={s} className="bg-primary/[0.08] text-primary px-2.5 py-1 rounded-[20px] text-xs font-semibold">
                      {s}
                    </span>
                  ))}
                </div>
              </div>
              <div className="absolute -top-3.5 right-4 bg-success text-white px-3.5 py-1.5 rounded-[20px] text-[13px] font-semibold">
                ✓ ATS Score: 94%
              </div>
            </div>
          </AnimateOnScroll>
        </div>
      </section>

      {/* ===== NAUKRI OPTIMIZATION ===== */}
      <section className="py-20 bg-surface-alt" id="naukri">
        <div className="max-w-content mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Visual (first on desktop via order) */}
          <AnimateOnScroll className="lg:order-first">
            <div className="bg-card border border-frame rounded-[14px] p-7 shadow-card-lg">
              <div className="font-syne text-[22px] font-extrabold mb-5 text-[#2563eb]">naukri</div>
              {[
                { label: '👁️ Profile Views', value: '+340%' },
                { label: '📩 Recruiter Messages', value: '+180%' },
                { label: '🔍 Search Appearances', value: '+250%' },
              ].map(({ label, value }) => (
                <div key={label} className="flex justify-between items-center py-3 border-b border-frame">
                  <span className="text-sm text-muted">{label}</span>
                  <strong className="font-syne text-success text-[18px]">{value}</strong>
                </div>
              ))}
              <div className="text-[13px] text-muted mt-5 mb-3">Before vs After Optimization</div>
              <div className="flex flex-col gap-2.5">
                <div className="flex items-center gap-3 text-[13px] text-muted">
                  <span className="w-14">Before</span>
                  <div className="h-2.5 w-[30%] bg-frame rounded-full" />
                </div>
                <div className="flex items-center gap-3 text-[13px] text-muted">
                  <span className="w-14">After</span>
                  <div className="h-2.5 w-[85%] bg-primary rounded-full" />
                </div>
              </div>
            </div>
          </AnimateOnScroll>

          {/* Info */}
          <div className="lg:order-last">
            <div className="inline-block bg-primary/[0.08] text-primary px-4 py-2 rounded-[30px] text-sm font-semibold mb-[18px]">
              🔍 Naukri Optimization
            </div>
            <h2 className="font-syne text-[clamp(24px,3vw,36px)] font-bold text-prose mb-4">
              Get Found by
              <br />
              <span className="text-primary">Top Recruiters on Naukri</span>
            </h2>
            <p className="text-muted mb-6 leading-[1.7]">
              Most candidates set up a Naukri profile and wonder why no one calls. We optimize every
              section so recruiters find YOU — not the other way around.
            </p>
            <div className="mb-6">
              <h4 className="text-[15px] font-bold mb-3 font-syne">What We Optimize:</h4>
              <ul className="list-none">
                {[
                  'Profile headline & summary',
                  'Keyword optimization for your role',
                  'Skills section enhancement',
                  'Recruiter search visibility boost',
                  'Resume upload & formatting',
                ].map(item => (
                  <li key={item} className="py-[7px] text-[15px] border-b border-frame text-prose">
                    ✓ {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex items-baseline gap-3 mb-7">
              <span className="font-syne text-[28px] font-extrabold text-primary">₹999</span>
              <span className="text-sm text-muted">One-time optimization</span>
            </div>
            <Link
              href="/apply"
              className="inline-block bg-primary text-white px-7 py-[13px] rounded-lg font-syne font-semibold text-[15px] hover:bg-primary-dark hover:-translate-y-0.5 transition-all shadow-[0_4px_16px_rgba(26,86,255,0.25)]"
            >
              Optimize My Naukri Profile
            </Link>
          </div>
        </div>
      </section>

      {/* ===== LINKEDIN OPTIMIZATION ===== */}
      <section className="py-20" id="linkedin">
        <div className="max-w-content mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Info */}
          <div>
            <div className="inline-block bg-primary/[0.08] text-primary px-4 py-2 rounded-[30px] text-sm font-semibold mb-[18px]">
              💼 LinkedIn Optimization
            </div>
            <h2 className="font-syne text-[clamp(24px,3vw,36px)] font-bold text-prose mb-4">
              Turn LinkedIn Into Your
              <br />
              <span className="text-primary">Personal Recruitment Engine</span>
            </h2>
            <p className="text-muted mb-6 leading-[1.7]">
              LinkedIn is where 87% of recruiters search for candidates. A weak profile means missed
              opportunities. We transform yours into a magnet for the right jobs.
            </p>
            <div className="mb-6">
              <h4 className="text-[15px] font-bold mb-3 font-syne">What We Rewrite:</h4>
              <ul className="list-none">
                {[
                  'Compelling headline (most-viewed section)',
                  'About section — your personal story',
                  'Experience section optimization',
                  'Skills & endorsements strategy',
                  'Profile SEO for recruiter searches',
                  'Banner & photo recommendations',
                ].map(item => (
                  <li key={item} className="py-[7px] text-[15px] border-b border-frame text-prose">
                    ✓ {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex items-baseline gap-3 mb-7">
              <span className="font-syne text-[28px] font-extrabold text-primary">₹1,499</span>
              <span className="text-sm text-muted">Complete profile overhaul</span>
            </div>
            <Link
              href="/apply"
              className="inline-block bg-primary text-white px-7 py-[13px] rounded-lg font-syne font-semibold text-[15px] hover:bg-primary-dark hover:-translate-y-0.5 transition-all shadow-[0_4px_16px_rgba(26,86,255,0.25)]"
            >
              Optimize My LinkedIn
            </Link>
          </div>

          {/* LinkedIn card visual */}
          <AnimateOnScroll>
            <div className="bg-card border border-frame rounded-[14px] overflow-hidden shadow-card-lg">
              <div className="h-20 bg-gradient-to-br from-primary to-[#7c3aed]" />
              <div className="w-[60px] h-[60px] rounded-full bg-accent text-white flex items-center justify-center font-extrabold text-lg border-[3px] border-white -mt-[30px] ml-5">
                YN
              </div>
              <div className="font-syne text-[18px] font-bold px-5 pt-2 pb-1">Your Name</div>
              <div className="text-[13px] text-muted px-5 pb-3 leading-relaxed">
                Full Stack Developer | React | Node.js | Open to Opportunities
              </div>
              <div className="flex gap-4 px-5 py-3 border-t border-frame text-[13px] text-muted">
                <span>🔗 500+ connections</span>
                <span>👁️ 1.2K profile views</span>
              </div>
              <div className="px-5 py-2.5 bg-success/[0.08] text-success text-[13px] font-semibold border-t border-success/15">
                🟢 Open to Work
              </div>
            </div>
          </AnimateOnScroll>
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section className="bg-primary py-[72px] text-center">
        <div className="max-w-content mx-auto px-6">
          <h2 className="font-syne text-[clamp(26px,3vw,38px)] font-bold text-white mb-3.5">
            Not Sure Which Service You Need?
          </h2>
          <p className="text-white/85 text-[17px] mb-8">
            Fill our free form and our career expert will guide you to the right service.
          </p>
          <Link
            href="/apply"
            className="inline-block bg-white text-primary px-[38px] py-4 rounded-lg font-syne font-semibold text-[17px] hover:bg-surface hover:-translate-y-0.5 transition-all shadow-[0_4px_24px_rgba(0,0,0,0.15)]"
          >
            Get Free Consultation
          </Link>
        </div>
      </section>
    </>
  )
}
