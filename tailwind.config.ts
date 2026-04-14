import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        // All colors use CSS variables so they switch automatically in dark mode.
        // The rgb() format enables Tailwind opacity modifiers (e.g. bg-primary/10).
        primary:       'rgb(var(--color-primary)       / <alpha-value>)',
        'primary-dark':'rgb(var(--color-primary-dark)  / <alpha-value>)',
        accent:        'rgb(var(--color-accent)        / <alpha-value>)',
        dark:          'rgb(var(--color-dark)          / <alpha-value>)',
        dark2:         'rgb(var(--color-dark2)         / <alpha-value>)',
        prose:         'rgb(var(--color-prose)         / <alpha-value>)',
        muted:         'rgb(var(--color-muted)         / <alpha-value>)',
        surface:       'rgb(var(--color-surface)       / <alpha-value>)',
        'surface-alt': 'rgb(var(--color-surface-alt)  / <alpha-value>)',
        frame:         'rgb(var(--color-frame)         / <alpha-value>)',
        success:       'rgb(var(--color-success)       / <alpha-value>)',
        // New tokens
        card:          'rgb(var(--color-card)          / <alpha-value>)',
        page:          'rgb(var(--color-page)          / <alpha-value>)',
      },
      fontFamily: {
        syne: ['var(--font-syne)', 'sans-serif'],
        dm:   ['var(--font-dm-sans)', 'sans-serif'],
      },
      maxWidth: {
        content: '1180px',
      },
      boxShadow: {
        card:    '0 4px 24px rgba(var(--color-primary) / 0.10)',
        'card-lg':'0 12px 48px rgba(var(--color-primary) / 0.15)',
      },
      borderRadius: {
        card: '14px',
      },
    },
  },
  plugins: [],
}

export default config
