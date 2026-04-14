'use client'

import { useState, useRef, ReactNode, KeyboardEvent, Children, isValidElement, cloneElement, Fragment } from 'react'
import Link from 'next/link'
import { submitApplication } from '@/app/actions'

/* ──────────────────────────── types ──────────────────────────── */
interface FormData {
  fullName: string
  email: string
  phone: string
  currentLocation: string
  preferredLocation: string
  currentRole: string
  currentCompany: string
  experience: string
  expectedSalary: string
  skills: string
  services: string[]
  linkedinUrl: string
  naukriUrl: string
  termsAccepted: boolean
}

interface Files {
  resumeFile: File | null
  photoFile: File | null
  signatureFile: File | null
}

type Errors = Partial<Record<string, string>>

/* ──────────────────────────── helpers ──────────────────────────── */
function inputCls(err?: string) {
  return `w-full px-4 py-3 border rounded-lg font-dm text-[15px] text-prose bg-card transition-all outline-none
    focus:border-primary focus:shadow-[0_0_0_3px_rgba(26,86,255,0.1)]
    ${err ? 'border-red-500' : 'border-frame'}`
}

function Field({
  label,
  required,
  error,
  children,
}: {
  label: string
  required?: boolean
  error?: string
  children: ReactNode
}) {
  const enhancedChildren = required
    ? Children.map(children, child =>
        isValidElement(child)
          ? cloneElement(child as React.ReactElement<Record<string, unknown>>, { 'aria-required': true })
          : child
      )
    : children

  return (
    <div className="mb-5">
      <label className="block text-sm font-medium mb-1.5 text-prose">
        {label}{' '}
        {required && <span className="text-accent" aria-hidden="true">*</span>}
      </label>
      {enhancedChildren}
      {error && (
        <span className="block text-xs text-red-500 mt-1" role="alert">{error}</span>
      )}
    </div>
  )
}

function FileUpload({
  id, accept, file, icon, placeholder, onChange,
}: {
  id: string
  accept: string
  file: File | null
  icon: string
  placeholder: string
  onChange: (f: File | null) => void
}) {
  const inputRef = useRef<HTMLInputElement>(null)

  function handleKey(e: KeyboardEvent<HTMLDivElement>) {
    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); inputRef.current?.click() }
  }

  return (
    <div
      role="button" tabIndex={0}
      aria-label={`${placeholder} — click or press Enter`}
      onClick={() => inputRef.current?.click()}
      onKeyDown={handleKey}
      className={`border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-all select-none
        ${file ? 'border-success bg-success/[0.04]' : 'border-frame bg-surface hover:border-primary hover:bg-primary/[0.03]'}`}
    >
      <input ref={inputRef} type="file" id={id} accept={accept} className="hidden"
        onChange={e => onChange(e.target.files?.[0] ?? null)} />
      <div className="text-[28px] mb-2">{icon}</div>
      <div className={`text-[13px] ${file ? 'text-success font-medium' : 'text-muted'}`}>
        {file ? `✓ ${file.name}` : placeholder}
      </div>
    </div>
  )
}

/* ──────────────────────────── main component ──────────────────────────── */
const SERVICES = ['Resume Writing', 'Naukri Optimization', 'LinkedIn Optimization', 'Placement Support']

const STEPS = [
  { num: 1, label: 'Personal Info' },
  { num: 2, label: 'Professional' },
  { num: 3, label: 'Documents' },
]

export default function ApplicationForm() {
  const formRef = useRef<HTMLDivElement>(null)
  const [step, setStep] = useState(1)
  const [data, setData] = useState<FormData>({
    fullName: '', email: '', phone: '',
    currentLocation: '', preferredLocation: '',
    currentRole: '', currentCompany: '',
    experience: '', expectedSalary: '',
    skills: '', services: [],
    linkedinUrl: '', naukriUrl: '',
    termsAccepted: false,
  })
  const [files, setFiles] = useState<Files>({ resumeFile: null, photoFile: null, signatureFile: null })
  const [errors, setErrors] = useState<Errors>({})
  const [submitting, setSubmitting] = useState(false)
  const [submitMsg, setSubmitMsg] = useState('Uploading your files…')
  const [submitted, setSubmitted] = useState(false)

  const isPlacement = data.services.includes('Placement Support')

  function set(field: keyof FormData, value: string | boolean) {
    setData(d => ({ ...d, [field]: value }))
    setErrors(e => ({ ...e, [field]: '' }))
  }

  function toggleService(svc: string) {
    setData(d => ({
      ...d,
      services: d.services.includes(svc) ? d.services.filter(s => s !== svc) : [...d.services, svc],
    }))
    setErrors(e => ({ ...e, services: '' }))
  }

  function setFile(field: keyof Files, file: File | null) {
    if (file && file.size > 10 * 1024 * 1024) {
      setErrors(e => ({ ...e, [field]: 'File must be under 10 MB. Please compress or trim your file.' }))
      return
    }
    setFiles(f => ({ ...f, [field]: file }))
    setErrors(e => ({ ...e, [field]: '' }))
  }

  function validate(s: number): Errors {
    const errs: Errors = {}
    const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    const phoneRe = /^[+\d\s\-()]{7,15}$/

    if (s === 1) {
      if (!data.fullName.trim()) errs.fullName = 'Full name is required'
      if (!data.email.trim() || !emailRe.test(data.email)) errs.email = 'Valid email is required'
      if (!data.phone.trim() || !phoneRe.test(data.phone)) errs.phone = 'Valid phone number is required'
      if (!data.currentLocation.trim()) errs.currentLocation = 'Current location is required'
      if (!data.preferredLocation.trim()) errs.preferredLocation = 'Preferred job location is required'
    }
    if (s === 2) {
      if (!data.currentRole.trim()) errs.currentRole = 'Current role is required'
      if (!data.experience) errs.experience = 'Please select your experience'
      if (!data.skills.trim()) errs.skills = 'Please enter your skills'
      if (data.services.length === 0) errs.services = 'Please select at least one service'
    }
    if (s === 3) {
      if (!files.resumeFile) errs.resumeFile = 'Please upload your resume'
      if (isPlacement) {
        if (!files.photoFile) errs.photoFile = 'Photo is required for placement support'
        if (!files.signatureFile) errs.signatureFile = 'Signature is required for placement support'
      }
      if (!data.termsAccepted) errs.termsAccepted = 'You must accept the terms to proceed.'
    }
    return errs
  }

  function goNext(current: number) {
    const errs = validate(current)
    if (Object.keys(errs).length) { setErrors(errs); return }
    setErrors({})
    setStep(current + 1)
    formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  function goPrev(current: number) {
    setStep(current - 1)
    formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  async function handleSubmit(e: { preventDefault(): void }) {
    e.preventDefault()
    const errs = validate(3)
    if (Object.keys(errs).length) { setErrors(errs); return }

    setSubmitting(true)
    setSubmitMsg('Uploading your files…')
    const msgTimer = setTimeout(() => setSubmitMsg('Almost there, hang tight…'), 7000)

    const fd = new FormData()
    ;(Object.keys(data) as Array<keyof typeof data>).forEach(key => {
      const val = data[key]
      fd.append(key, Array.isArray(val) ? val.join(',') : String(val))
    })
    if (files.resumeFile)    fd.append('resumeFile',    files.resumeFile)
    if (files.photoFile)     fd.append('photoFile',     files.photoFile)
    if (files.signatureFile) fd.append('signatureFile', files.signatureFile)

    const timeoutPromise = new Promise<{ success: boolean; error?: string }>(resolve =>
      setTimeout(() => resolve({
        success: false,
        error: 'Upload is taking too long. Please try a smaller file or check your connection.',
      }), 90_000)
    )
    const result = await Promise.race([submitApplication(fd), timeoutPromise])
    clearTimeout(msgTimer)
    setSubmitting(false)

    if (result.success) {
      setSubmitted(true)
    } else {
      setErrors(e => ({ ...e, form: result.error ?? 'Something went wrong. Please try again.' }))
    }
  }

  /* ── Success screen ── */
  if (submitted) {
    return (
      <div className="text-center py-16 px-10 bg-card border border-frame rounded-2xl shadow-card">
        <div className="text-[56px] mb-5">🎉</div>
        <h2 className="font-syne text-[28px] font-bold text-prose mb-3">Application Submitted!</h2>
        <p className="text-muted mb-7 text-base">
          Thank you! Our team will reach out to you within 24 hours. Check your email for a confirmation.
        </p>
        <Link href="/"
          className="inline-block bg-primary text-white px-7 py-3 rounded-lg font-syne font-semibold text-[15px] hover:bg-primary-dark transition-colors shadow-[0_4px_16px_rgba(26,86,255,0.25)]">
          Back to Home
        </Link>
      </div>
    )
  }

  const btnPrimary =
    'inline-flex items-center justify-center gap-2 bg-primary text-white px-6 py-3 rounded-lg font-syne font-semibold text-[15px] hover:bg-primary-dark hover:-translate-y-0.5 transition-all shadow-[0_4px_16px_rgba(26,86,255,0.25)]'
  const btnOutline =
    'inline-flex items-center justify-center gap-2 bg-transparent text-primary px-6 py-3 rounded-lg font-syne font-semibold text-[15px] border-2 border-primary hover:bg-primary hover:text-white transition-all'

  return (
    <div ref={formRef} className="relative bg-card border border-frame rounded-2xl p-8 shadow-card max-sm:p-5">

      {/* ── Loading overlay ── */}
      {submitting && (
        <div className="absolute inset-0 bg-card/90 backdrop-blur-[2px] rounded-2xl flex flex-col items-center justify-center z-10 gap-4 px-8 text-center">
          <div className="w-11 h-11 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
          <p className="text-sm font-semibold text-prose">{submitMsg}</p>
          <p className="text-xs text-muted">Please wait — do not close this page</p>
        </div>
      )}

      {/* ── Stepper: mobile ── */}
      <div className="flex items-center justify-between mb-7 pb-5 border-b border-frame sm:hidden" aria-label="Application steps">
        <div className="flex items-center gap-2.5">
          <span className="bg-primary text-white text-[11px] font-bold px-2.5 py-1 rounded-full tabular-nums leading-tight">
            {step} / {STEPS.length}
          </span>
          <span className="text-sm font-semibold text-prose">{STEPS[step - 1].label}</span>
        </div>
        <div className="flex items-center gap-1.5">
          {STEPS.map(({ num }) => (
            <div key={num} className={`h-2 rounded-full transition-all duration-300 ${
              num === step ? 'w-6 bg-primary' : num < step ? 'w-2 bg-success' : 'w-2 bg-frame'
            }`} />
          ))}
        </div>
      </div>

      {/* ── Stepper: desktop ── */}
      <div className="hidden sm:flex items-center mb-9 pb-7 border-b border-frame" role="list" aria-label="Application steps">
        {STEPS.map(({ num, label }, idx) => (
          <Fragment key={num}>
            <div role="listitem" aria-current={step === num ? 'step' : undefined}
              className="flex items-center gap-2 flex-shrink-0">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-[13px] font-bold border-2 transition-all
                ${step === num
                  ? 'bg-primary border-primary text-white'
                  : step > num
                  ? 'bg-success border-success text-white'
                  : 'bg-card border-frame text-muted'}`}>
                {step > num ? '✓' : num}
              </div>
              <span className={`text-[13px] font-medium whitespace-nowrap transition-colors
                ${step === num ? 'text-prose font-semibold' : step > num ? 'text-success' : 'text-muted'}`}>
                {label}
              </span>
            </div>
            {idx < STEPS.length - 1 && (
              <div aria-hidden="true"
                className={`flex-1 h-0.5 mx-3 transition-colors ${step > idx + 1 ? 'bg-success' : 'bg-frame'}`} />
            )}
          </Fragment>
        ))}
      </div>

      <form onSubmit={handleSubmit} noValidate>

        {/* ── STEP 1 ── */}
        {step === 1 && (
          <div role="group" aria-labelledby="s1">
            <h3 id="s1" className="font-syne text-xl font-bold text-prose mb-7">Personal Information</h3>

            <Field label="Full Name" required error={errors.fullName}>
              <input type="text" value={data.fullName} onChange={e => set('fullName', e.target.value)}
                placeholder="Enter your full name" autoComplete="name" className={inputCls(errors.fullName)} />
            </Field>

            <div className="grid grid-cols-2 gap-4 max-sm:grid-cols-1">
              <Field label="Email Address" required error={errors.email}>
                <input type="email" value={data.email} onChange={e => set('email', e.target.value)}
                  placeholder="you@email.com" autoComplete="email" className={inputCls(errors.email)} />
              </Field>
              <Field label="Phone Number" required error={errors.phone}>
                <input type="tel" value={data.phone} onChange={e => set('phone', e.target.value)}
                  placeholder="+91 XXXXX XXXXX" autoComplete="tel" className={inputCls(errors.phone)} />
              </Field>
            </div>

            <div className="grid grid-cols-2 gap-4 max-sm:grid-cols-1">
              <Field label="Current Location" required error={errors.currentLocation}>
                <input type="text" value={data.currentLocation} onChange={e => set('currentLocation', e.target.value)}
                  placeholder="City, State" autoComplete="address-level2" className={inputCls(errors.currentLocation)} />
              </Field>
              <Field label="Preferred Job Location" required error={errors.preferredLocation}>
                <input type="text" value={data.preferredLocation} onChange={e => set('preferredLocation', e.target.value)}
                  placeholder="City or Remote" className={inputCls(errors.preferredLocation)} />
              </Field>
            </div>

            <div className="flex justify-end mt-8 pt-6 border-t border-frame">
              <button type="button" onClick={() => goNext(1)} className={`${btnPrimary} max-sm:w-full`}>
                <span className="hidden sm:inline">Next: Professional Details</span>
                <span className="sm:hidden">Continue</span>
                <span aria-hidden="true">→</span>
              </button>
            </div>
          </div>
        )}

        {/* ── STEP 2 ── */}
        {step === 2 && (
          <div role="group" aria-labelledby="s2">
            <h3 id="s2" className="font-syne text-xl font-bold text-prose mb-7">Professional Details</h3>

            <div className="grid grid-cols-2 gap-4 max-sm:grid-cols-1">
              <Field label="Current Role / Job Title" required error={errors.currentRole}>
                <input type="text" value={data.currentRole} onChange={e => set('currentRole', e.target.value)}
                  placeholder="e.g. Software Engineer" autoComplete="organization-title" className={inputCls(errors.currentRole)} />
              </Field>
              <Field label="Current Company">
                <input type="text" value={data.currentCompany} onChange={e => set('currentCompany', e.target.value)}
                  placeholder="e.g. TCS (or Fresher)" autoComplete="organization" className={inputCls()} />
              </Field>
            </div>

            <div className="grid grid-cols-2 gap-4 max-sm:grid-cols-1">
              <Field label="Years of Experience" required error={errors.experience}>
                <select value={data.experience} onChange={e => set('experience', e.target.value)}
                  className={`${inputCls(errors.experience)} custom-select`}>
                  <option value="">Select experience</option>
                  {['Fresher (0 years)', 'Less than 1 year', '1–2 years', '3–5 years', '5–10 years', '10+ years'].map(o => (
                    <option key={o}>{o}</option>
                  ))}
                </select>
              </Field>
              <Field label="Expected Salary (per annum)">
                <input type="text" value={data.expectedSalary} onChange={e => set('expectedSalary', e.target.value)}
                  placeholder="e.g. ₹6,00,000" className={inputCls()} />
              </Field>
            </div>

            <Field label="Key Skills" required error={errors.skills}>
              <input type="text" value={data.skills} onChange={e => set('skills', e.target.value)}
                placeholder="e.g. React, Node.js, Python, SQL" className={inputCls(errors.skills)} />
            </Field>

            <div className="mb-5">
              <fieldset>
                <legend className="text-sm font-medium text-prose mb-2.5 w-full">
                  Service Interested In{' '}
                  <span className="text-accent" aria-hidden="true">*</span>
                </legend>
                <div className="flex flex-wrap gap-3 mt-1">
                  {SERVICES.map(svc => (
                    <label key={svc} className="flex items-center gap-2 text-sm cursor-pointer text-prose min-h-[44px] px-3 py-2 rounded-lg hover:bg-primary/[0.05] transition-colors">
                      <input type="checkbox" checked={data.services.includes(svc)}
                        onChange={() => toggleService(svc)} className="w-5 h-5 accent-primary flex-shrink-0" />
                      {svc}
                    </label>
                  ))}
                </div>
                {errors.services && (
                  <span className="block text-xs text-red-500 mt-1" role="alert">{errors.services}</span>
                )}
              </fieldset>
            </div>

            <div className="flex items-center justify-between gap-3 mt-8 pt-6 border-t border-frame max-sm:flex-col-reverse">
              <button type="button" onClick={() => goPrev(2)} className={`${btnOutline} max-sm:w-full`}>
                <span aria-hidden="true">←</span> Back
              </button>
              <button type="button" onClick={() => goNext(2)} className={`${btnPrimary} max-sm:w-full`}>
                <span className="hidden sm:inline">Next: Documents</span>
                <span className="sm:hidden">Continue</span>
                <span aria-hidden="true">→</span>
              </button>
            </div>
          </div>
        )}

        {/* ── STEP 3 ── */}
        {step === 3 && (
          <div role="group" aria-labelledby="s3">
            <h3 id="s3" className="font-syne text-xl font-bold text-prose mb-7">Career Links &amp; Documents</h3>

            <Field label="Upload Resume" required error={errors.resumeFile}>
              <FileUpload id="resumeFile" accept=".pdf,.doc,.docx" file={files.resumeFile}
                icon="📎" placeholder="Click to upload PDF or Word (.pdf, .doc, .docx)"
                onChange={f => setFile('resumeFile', f)} />
            </Field>

            <div className="grid grid-cols-2 gap-4 max-sm:grid-cols-1">
              <Field label="LinkedIn Profile URL">
                <input type="url" value={data.linkedinUrl} onChange={e => set('linkedinUrl', e.target.value)}
                  placeholder="https://linkedin.com/in/yourname" autoComplete="url" className={inputCls()} />
              </Field>
              <Field label="Naukri Profile URL">
                <input type="url" value={data.naukriUrl} onChange={e => set('naukriUrl', e.target.value)}
                  placeholder="https://naukri.com/profile/..." autoComplete="url" className={inputCls()} />
              </Field>
            </div>

            {isPlacement && (
              <div className="border border-accent/25 rounded-xl p-6 bg-[rgba(255,107,53,0.03)] mb-5">
                <div className="mb-5 p-3 px-4 bg-[rgba(255,107,53,0.08)] rounded-lg">
                  <strong className="text-sm block mb-1 text-amber-700">⚠️ Placement Support Applicants Only</strong>
                  <p className="text-[13px] text-amber-800 m-0">
                    The following documents are mandatory as per the placement agreement.
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-4 max-sm:grid-cols-1">
                  <Field label="Upload Photo" required error={errors.photoFile}>
                    <FileUpload id="photoFile" accept="image/*" file={files.photoFile}
                      icon="🖼️" placeholder="Upload passport-size photo (JPG/PNG)"
                      onChange={f => setFile('photoFile', f)} />
                  </Field>
                  <Field label="Upload Signature" required error={errors.signatureFile}>
                    <FileUpload id="signatureFile" accept="image/*,.pdf" file={files.signatureFile}
                      icon="✍️" placeholder="Upload scanned signature (JPG/PNG/PDF)"
                      onChange={f => setFile('signatureFile', f)} />
                  </Field>
                </div>
              </div>
            )}

            <div className="mb-5">
              <label className="flex items-start gap-2 text-sm cursor-pointer">
                <input type="checkbox" checked={data.termsAccepted}
                  onChange={e => set('termsAccepted', e.target.checked)}
                  aria-required="true"
                  className="w-5 h-5 accent-primary flex-shrink-0 mt-0.5" />
                <span className="leading-relaxed text-prose">
                  I have read and agree to the{' '}
                  <Link href="/terms" target="_blank" className="text-primary underline">Terms &amp; Conditions</Link>
                  {' '}and{' '}
                  <Link href="/placement" target="_blank" className="text-primary underline">Placement Agreement</Link>.
                  {' '}I understand that if I am placed through HireReady, I will pay ₹60,000 as a placement fee.{' '}
                  <span className="text-accent" aria-hidden="true">*</span>
                </span>
              </label>
              {errors.termsAccepted && (
                <span className="block text-xs text-red-500 mt-1" role="alert">{errors.termsAccepted}</span>
              )}
            </div>

            {errors.form && (
              <div className="mb-5 px-4 py-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-600" role="alert">
                {errors.form}
              </div>
            )}

            <div className="flex items-center justify-between gap-3 mt-8 pt-6 border-t border-frame max-sm:flex-col-reverse">
              <button type="button" onClick={() => goPrev(3)} className={`${btnOutline} max-sm:w-full`}>
                <span aria-hidden="true">←</span> Back
              </button>
              <button
                type="submit"
                disabled={submitting}
                className={`${btnPrimary} max-sm:w-full disabled:opacity-70 disabled:cursor-not-allowed`}
              >
                Submit Application 🚀
              </button>
            </div>
          </div>
        )}
      </form>
    </div>
  )
}
