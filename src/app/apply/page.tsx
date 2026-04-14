import type { Metadata } from 'next'
import ApplicationForm from '@/components/ApplicationForm'

export const metadata: Metadata = {
  title: 'Apply Now – HireReady',
  description: 'Fill in your details and our career expert will contact you within 24 hours.',
}

export default function ApplyPage() {
  return (
    <>
      {/* PAGE HERO */}
      <section className="bg-surface pt-[72px] pb-16 border-b border-frame">
        <div className="max-w-content mx-auto px-6">
          <div className="inline-block font-dm text-[13px] font-medium tracking-[0.1em] uppercase text-primary bg-primary/[0.08] px-3.5 py-1.5 rounded-[30px] mb-4">
            Free Application
          </div>
          <h1 className="font-syne text-[clamp(30px,4vw,50px)] font-bold text-prose mb-4">
            Start Your Career Journey
            <br />
            <span className="text-primary">Today</span>
          </h1>
          <p className="text-muted text-[17px] max-w-[560px]">
            Fill in your details and our career expert will contact you within 24 hours.
          </p>
        </div>
      </section>

      {/* FORM SECTION */}
      <section className="py-20 bg-surface">
        <div className="max-w-content mx-auto px-6 grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-10 items-start">
          {/* Multi-step form */}
          <ApplicationForm />

          {/* Sidebar */}
          <aside className="flex flex-col gap-5 md:grid md:grid-cols-2 lg:flex lg:flex-col">
            {/* Help */}
            <div className="bg-card border border-frame rounded-card p-[22px]">
              <h4 className="font-syne text-[15px] font-bold mb-2.5">📞 Need Help?</h4>
              <p className="text-sm text-muted leading-[1.7]">Our team is available Mon–Sat, 9am–6pm</p>
              <p className="text-sm text-muted">
                <strong>+91 0000000000</strong>
              </p>
              <p className="text-sm text-muted">support@hireready.in</p>
            </div>

            {/* What happens next */}
            <div className="bg-card border border-frame rounded-card p-[22px]">
              <h4 className="font-syne text-[15px] font-bold mb-2.5">⚡ What Happens Next?</h4>
              <ol className="text-sm text-muted leading-[1.7] pl-5 list-decimal space-y-1">
                <li>We review your application</li>
                <li>Career expert contacts you within 24hrs</li>
                <li>Personalized plan is shared</li>
                <li>Work begins immediately</li>
              </ol>
            </div>

            {/* Testimonial */}
            <div className="bg-card border-l-[3px] border-primary border border-frame rounded-card p-[22px]">
              <div className="text-[#f59e0b] text-[15px]">★★★★★</div>
              <p className="text-sm text-muted italic my-2">
                &ldquo;Applied on Monday, got my optimized resume by Wednesday, interview call by Friday!&rdquo;
              </p>
              <strong className="text-[13px] text-prose">— Rahul Sharma, Pune</strong>
            </div>
          </aside>
        </div>
      </section>
    </>
  )
}
