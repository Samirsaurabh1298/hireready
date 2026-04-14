import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-dark pt-[60px]">
      <div className="max-w-content mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_1fr] gap-10 pb-12">
        {/* Brand */}
        <div>
          <Link href="/" className="flex items-center gap-2.5 font-syne text-[22px] font-extrabold text-white">
            <svg width="28" height="28" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <circle cx="16" cy="16" r="16" fill="#1a56ff" />
              <rect x="6" y="8" width="4" height="16" rx="1.5" fill="white" />
              <rect x="6" y="14" width="10" height="4" rx="1" fill="white" />
              <rect x="12" y="8" width="4" height="16" rx="1.5" fill="white" />
              <line x1="15" y1="13" x2="23" y2="5" stroke="#ff6b35" strokeWidth="2.5" strokeLinecap="round" />
              <polygon points="23,5 17,5 22,10" fill="#ff6b35" />
            </svg>
            <span className="leading-none">{'Hire'}<span className="text-primary">{'Ready'}</span></span>
          </Link>
          <p className="text-white/70 text-sm mt-3 leading-7">
            Empowering job seekers with professional career services and placement support.
          </p>
        </div>

        {/* Pages */}
        <div>
          <h4 className="text-white text-sm font-bold mb-4 uppercase tracking-[0.08em]">Pages</h4>
          {[
            { href: '/', label: 'Home' },
            { href: '/services', label: 'Services' },
            { href: '/placement', label: 'Placement Support' },
            { href: '/apply', label: 'Apply Now' },
          ].map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className="block text-white/70 text-sm py-1 hover:text-white transition-colors"
            >
              {label}
            </Link>
          ))}
        </div>

        {/* Legal */}
        <div>
          <h4 className="text-white text-sm font-bold mb-4 uppercase tracking-[0.08em]">Legal</h4>
          {[
            { label: 'Terms & Conditions', href: '/terms' },
            { label: 'Privacy Policy', href: '/privacy' },
            { label: 'Placement Agreement', href: '/placement#terms' },
          ].map(({ label, href }) => (
            <Link
              key={label}
              href={href}
              className="block text-white/70 text-sm py-1 hover:text-white transition-colors"
            >
              {label}
            </Link>
          ))}
        </div>

        {/* Contact */}
        <div>
          <h4 className="text-white text-sm font-bold mb-4 uppercase tracking-[0.08em]">Contact</h4>
          <p className="text-white/70 text-sm py-1">📧 support@hireready.in</p>
          <p className="text-white/70 text-sm py-1">📞 +91 0000000000</p>
          <p className="text-white/70 text-sm py-1">📍 India</p>
        </div>
      </div>

      <div className="border-t border-white/[0.08] py-5 px-6 text-center">
        <p className="text-white/50 text-[13px]">© {new Date().getFullYear()} HireReady. All rights reserved.</p>
      </div>
    </footer>
  )
}
