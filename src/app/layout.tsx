import type { Metadata } from 'next'
import { Syne, DM_Sans } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

const syne = Syne({
  subsets: ['latin'],
  weight: ['400', '600', '700', '800'],
  variable: '--font-syne',
})

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  variable: '--font-dm-sans',
})

export const metadata: Metadata = {
  title: 'HireReady – Launch Your Career',
  description:
    'Professional Resume Writing, LinkedIn & Naukri Optimization, and end-to-end Placement Support — tailored for freshers and job seekers.',
  icons: { icon: '/images/favi.svg' },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${syne.variable} ${dmSans.variable}`} suppressHydrationWarning>
      {/* Anti-flash: sets data-theme before React hydrates to prevent white flash in dark mode */}
      <head>
        <link rel="icon" href="/images/favi.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/images/favi.svg" />
        <script dangerouslySetInnerHTML={{ __html: `(function(){var t=localStorage.getItem('theme')||(window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light');document.documentElement.setAttribute('data-theme',t);})();` }} />
      </head>
      <body className="font-dm text-prose bg-page text-base leading-relaxed" suppressHydrationWarning>
        <a href="#main-content" className="skip-link">Skip to main content</a>
        <Navbar />
        <main id="main-content">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
