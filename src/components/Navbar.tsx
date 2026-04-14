'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import ThemeToggle from './ThemeToggle'

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/services', label: 'Services' },
  { href: '/placement', label: 'Placement Support' },
  { href: '/apply', label: 'Apply Now' },
]

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const pathname = usePathname()
  const menuRef = useRef<HTMLDivElement>(null)
  const btnRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    function onOutsideClick(e: MouseEvent) {
      if (
        menuOpen &&
        menuRef.current &&
        !menuRef.current.contains(e.target as Node) &&
        btnRef.current &&
        !btnRef.current.contains(e.target as Node)
      ) {
        setMenuOpen(false)
      }
    }
    document.addEventListener('click', onOutsideClick)
    return () => document.removeEventListener('click', onOutsideClick)
  }, [menuOpen])

  useEffect(() => { setMenuOpen(false) }, [pathname])

  return (
    <nav
      className="sticky top-0 z-50 bg-page/95 backdrop-blur-md border-b border-frame px-6"
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="max-w-content mx-auto flex items-center justify-between h-[66px] gap-6">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 font-syne text-[22px] font-extrabold text-prose">
          <svg width="30" height="30" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <circle cx="16" cy="16" r="16" fill="#1a56ff" />
            <rect x="6" y="8" width="4" height="16" rx="1.5" fill="white" />
            <rect x="6" y="14" width="10" height="4" rx="1" fill="white" />
            <rect x="12" y="8" width="4" height="16" rx="1.5" fill="white" />
            <line x1="15" y1="13" x2="23" y2="5" stroke="#ff6b35" strokeWidth="2.5" strokeLinecap="round" />
            <polygon points="23,5 17,5 22,10" fill="#ff6b35" />
          </svg>
          <span className="leading-none">{'Hire'}<span className="text-primary">{'Ready'}</span></span>
        </Link>

        {/* Desktop links */}
        <ul className="hidden md:flex list-none gap-8">
          {navLinks.map(({ href, label }) => (
            <li key={href}>
              <Link
                href={href}
                className={`font-dm text-[15px] font-medium transition-colors ${
                  pathname === href ? 'text-primary' : 'text-muted hover:text-primary'
                }`}
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Right side: theme toggle + CTA */}
        <div className="hidden md:flex items-center gap-3">
          <ThemeToggle />
          <Link
            href="/apply"
            className="bg-primary text-white px-[22px] py-[10px] rounded-lg font-syne font-semibold text-sm hover:bg-primary-dark transition-colors whitespace-nowrap"
          >
            Get Started
          </Link>
        </div>

        {/* Mobile: theme toggle + hamburger */}
        <div className="md:hidden flex items-center gap-2">
          <ThemeToggle />
          <button
            ref={btnRef}
            className="text-[22px] cursor-pointer text-prose bg-transparent border-none leading-none"
            onClick={() => setMenuOpen(o => !o)}
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
            aria-controls="mobileMenu"
          >
            ☰
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div
          ref={menuRef}
          id="mobileMenu"
          className="flex flex-col py-3 pb-4 border-t border-frame"
        >
          {navLinks.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className="py-2.5 px-1 text-base font-medium text-prose border-b border-frame last:border-b-0"
              onClick={() => setMenuOpen(false)}
            >
              {label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  )
}
