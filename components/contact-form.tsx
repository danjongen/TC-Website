"use client"

import { useActionState, useEffect, useRef, useState } from "react"
import Script from "next/script"
import { useFormStatus } from "react-dom"
import { submitContactForm } from "@/app/actions/contact"
import { Loader2 } from "lucide-react"

const MATRIX_GREEN = "#00D26A"

function SubmitButton() {
  const { pending } = useFormStatus()

  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full py-4 text-black font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 hover:scale-[1.02]"
      style={{ backgroundColor: MATRIX_GREEN }}
    >
      {pending ? (
        <>
          <Loader2 className="w-4 h-4 animate-spin" />
          Sending...
        </>
      ) : (
        "Send Message"
      )}
    </button>
  )
}

const TURNSTILE_SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY

export function ContactForm() {
  const [state, formAction] = useActionState(submitContactForm, null)
  // time-trap: bots submit instantly; humans take seconds
  const [mountedAt] = useState(() => Date.now())
  const formStartRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (formStartRef.current) formStartRef.current.value = String(mountedAt)
  }, [mountedAt])

  return (
    <form action={formAction} className="space-y-6">
      <input ref={formStartRef} type="hidden" name="form_started_at" defaultValue="" />
      {/* honeypot: hidden from humans; the server action drops submissions that fill it */}
      <div className="absolute -left-[9999px] top-auto h-px w-px overflow-hidden" aria-hidden="true">
        <label htmlFor="company_website">Company website</label>
        <input type="text" id="company_website" name="company_website" tabIndex={-1} autoComplete="off" />
      </div>
      {state?.error && (
        <div className="p-4 bg-red-900/20 border border-red-800 text-red-400 text-sm rounded">{state.error}</div>
      )}

      {/* Name */}
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-zinc-300 mb-2">
          Name *
        </label>
        <input
          type="text"
          id="name"
          name="name"
          required
          className="w-full px-4 py-3 bg-zinc-900 border border-zinc-700 text-white placeholder:text-zinc-400 focus:outline-none focus:border-zinc-500 transition-colors rounded"
          placeholder="Your name"
        />
      </div>

      {/* Email */}
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-zinc-300 mb-2">
          Email *
        </label>
        <input
          type="email"
          id="email"
          name="email"
          required
          className="w-full px-4 py-3 bg-zinc-900 border border-zinc-700 text-white placeholder:text-zinc-400 focus:outline-none focus:border-zinc-500 transition-colors rounded"
          placeholder="email@company.com"
        />
      </div>

      {/* Message */}
      <div>
        <label htmlFor="message" className="block text-sm font-medium text-zinc-300 mb-2">
          Message *
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          required
          className="w-full px-4 py-3 bg-zinc-900 border border-zinc-700 text-white placeholder:text-zinc-400 focus:outline-none focus:border-zinc-500 transition-colors resize-none rounded"
          placeholder="Tell us about your project..."
        />
      </div>

      {TURNSTILE_SITE_KEY && (
        <>
          <Script src="https://challenges.cloudflare.com/turnstile/v0/api.js" strategy="lazyOnload" />
          <div className="cf-turnstile" data-sitekey={TURNSTILE_SITE_KEY} data-theme="dark" />
        </>
      )}

      <SubmitButton />

      <p className="text-xs text-zinc-400 text-center">We respond within 24 hours. Your information is never shared.</p>
    </form>
  )
}
