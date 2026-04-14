# HireReady

A professional career services website for job seekers in India — offering Resume Writing, LinkedIn & Naukri Optimization, and end-to-end Placement Support.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | [Next.js 15](https://nextjs.org/) (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS v3 |
| Fonts | Syne + DM Sans (Google Fonts) |
| Database | [Supabase](https://supabase.com/) (PostgreSQL) |
| File Storage | Supabase Storage |
| Email | [Resend](https://resend.com/) |
| Hosting (recommended) | [Vercel](https://vercel.com/) |

---

## Pages

| Route | Description |
|---|---|
| `/` | Home — hero, services overview, testimonials, company logos, CTA |
| `/services` | Services detail — Resume Writing, Naukri Optimization, LinkedIn Optimization |
| `/placement` | Placement Support — how it works, what's included, terms & conditions |
| `/apply` | Application form — 3-step multi-step form with file uploads |

---

## Project Structure

```
hireReady/
├── src/
│   ├── app/
│   │   ├── layout.tsx          # Root layout (Navbar + Footer)
│   │   ├── page.tsx            # Home page
│   │   ├── globals.css         # Global styles + Tailwind
│   │   ├── actions.ts          # Server Action (form submit, file upload, emails)
│   │   ├── apply/
│   │   │   └── page.tsx        # Apply page
│   │   ├── services/
│   │   │   └── page.tsx        # Services page
│   │   └── placement/
│   │       └── page.tsx        # Placement Support page
│   ├── components/
│   │   ├── Navbar.tsx          # Sticky navbar with mobile menu
│   │   ├── Footer.tsx          # Footer with links and contact
│   │   ├── ApplicationForm.tsx # 3-step application form (client component)
│   │   └── AnimateOnScroll.tsx # Intersection Observer fade-up animation
│   ├── lib/
│   │   └── supabase.ts         # Supabase server-side client
│   └── declarations.d.ts       # CSS module type declaration
├── public/
│   └── images/
│       ├── favi.svg            # Favicon
│       └── hireready-logo.svg  # Logo
├── .env.local                  # Environment variables (never commit this)
├── .env.local.example          # Template for environment variables
├── next.config.ts              # Next.js config (10MB body limit for uploads)
├── tailwind.config.ts          # Tailwind custom theme
├── tsconfig.json               # TypeScript config
└── package.json
```

---

## Features

- **Multi-step application form** — 3 steps: Personal Info → Professional Details → Documents
- **File uploads** — Resume (PDF/Word), Photo, Signature (for placement applicants)
- **Conditional fields** — Extra document uploads appear only when "Placement Support" is selected
- **Form validation** — Client-side validation on each step before proceeding
- **Server Action** — Form data is sent to a Next.js server action (no separate API needed)
- **Supabase Storage** — Files uploaded to a private bucket, accessible via 1-hour signed URLs
- **Database** — Every application saved to a PostgreSQL table in Supabase
- **Email notifications** — Team gets a detailed email with all applicant info + file download links
- **Applicant confirmation** — Applicant receives a confirmation email with next steps
- **Scroll animations** — Cards and sections fade up on scroll using Intersection Observer
- **Responsive design** — Mobile-first layout, hamburger menu on mobile
- **SEO** — Individual metadata on every page

---

## Environment Variables

Create a `.env.local` file in the project root:

```env
# Supabase — Project Settings → API Keys
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
SUPABASE_SERVICE_ROLE_KEY=sb_secret_...

# Resend — resend.com → API Keys
RESEND_API_KEY=re_...

# Email where new application alerts are sent
TEAM_EMAIL=your@email.com
```

> Never commit `.env.local` to Git. It is already in `.gitignore` by default with Next.js.

---

## Supabase Setup

### 1. Database Table

Run this in the Supabase **SQL Editor**:

```sql
create table applications (
  id uuid primary key,
  created_at timestamptz default now(),
  full_name text not null,
  email text not null,
  phone text not null,
  current_location text,
  preferred_location text,
  job_role text,
  current_company text,
  experience text,
  expected_salary text,
  skills text,
  services text[],
  linkedin_url text,
  naukri_url text,
  resume_path text,
  photo_path text,
  signature_path text,
  status text default 'new'
);
```

### 2. Storage Bucket

- Go to **Storage** → **New bucket**
- Name: `applications`
- Public: **OFF** (private)
- Click **Save**

Files are stored in three folders inside this bucket:
- `resumes/` — uploaded resumes (PDF or Word)
- `photos/` — passport-size photos (for placement applicants)
- `signatures/` — scanned signatures (for placement applicants)

---

## Resend Setup

1. Sign up at [resend.com](https://resend.com)
2. Go to **API Keys** → **Create API Key**
3. Copy the key into `RESEND_API_KEY` in `.env.local`

**Emails sent on every form submission:**
- **Team notification** — sent to `TEAM_EMAIL` with all applicant details + 1-hour file download links
- **Applicant confirmation** — sent to the applicant's email with next steps

> Free tier: 3,000 emails/month — sufficient for hundreds of applications.

---

## Local Development

```bash
# Install dependencies
npm install

# Start dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## Deployment (Vercel)

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com) → **New Project** → import your repo
3. Add all environment variables from `.env.local` in the Vercel dashboard under **Settings → Environment Variables**
4. Click **Deploy**

Vercel automatically detects Next.js and configures everything.

---

## Services & Pricing

| Service | Price |
|---|---|
| Resume Writing | ₹999 – ₹1,999 (based on experience) |
| Naukri Optimization | ₹999 (one-time) |
| LinkedIn Optimization | ₹1,499 (complete overhaul) |
| Placement Support | ₹60,000 (post-placement only) |

---

## Color Palette

| Token | Hex | Usage |
|---|---|---|
| `primary` | `#1a56ff` | Buttons, links, accents |
| `primary-dark` | `#0d3fd4` | Button hover state |
| `accent` | `#ff6b35` | Warnings, highlights |
| `dark` | `#0d0f1a` | Hero background, footer |
| `prose` | `#1a1d2e` | Body text |
| `muted` | `#5a6080` | Secondary text |
| `surface` | `#f8f9ff` | Page backgrounds |
| `frame` | `#e2e5f0` | Borders, dividers |
| `success` | `#16a34a` | Success states |

---

## Contact

- Email: support@hireready.in
- Phone: +91 0000000000
- Hours: Mon–Sat, 9am–6pm IST
