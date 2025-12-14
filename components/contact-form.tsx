"use client"

import { useActionState } from "react"
import { useFormStatus } from "react-dom"
import { submitContactForm } from "@/app/actions/contact"
import { Loader2 } from "lucide-react"

function SubmitButton() {
  const { pending } = useFormStatus()

  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full py-4 bg-black text-white font-medium hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
    >
      {pending ? (
        <>
          <Loader2 className="w-4 h-4 animate-spin" />
          Sending...
        </>
      ) : (
        "Submit Inquiry"
      )}
    </button>
  )
}

export function ContactForm() {
  const [state, formAction] = useActionState(submitContactForm, null)

  return (
    <form action={formAction} className="space-y-6">
      {state?.error && <div className="p-4 bg-red-50 border border-red-200 text-red-600 text-sm">{state.error}</div>}

      {/* Name */}
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
          Name *
        </label>
        <input
          type="text"
          id="name"
          name="name"
          required
          className="w-full px-4 py-3 bg-white border border-gray-300 text-black placeholder:text-gray-400 focus:outline-none focus:border-black transition-colors"
          placeholder="Your name"
        />
      </div>

      {/* Email */}
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
          Email *
        </label>
        <input
          type="email"
          id="email"
          name="email"
          required
          className="w-full px-4 py-3 bg-white border border-gray-300 text-black placeholder:text-gray-400 focus:outline-none focus:border-black transition-colors"
          placeholder="email@company.com"
        />
      </div>

      {/* Project Details */}
      <div>
        <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
          Project Details *
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          required
          className="w-full px-4 py-3 bg-white border border-gray-300 text-black placeholder:text-gray-400 focus:outline-none focus:border-black transition-colors resize-none"
          placeholder="Tell us about your project: scope, timeline, venue, scale, and any known constraints or risks..."
        />
      </div>

      <div className="flex items-start gap-3">
        <input
          type="checkbox"
          id="riskAcknowledgment"
          name="riskAcknowledgment"
          required
          className="mt-1 w-4 h-4 border-gray-300 text-black focus:ring-black"
        />
        <label htmlFor="riskAcknowledgment" className="text-sm text-gray-600 leading-relaxed">
          I understand that risks must be explicitly accepted before work begins. TC Agency will document and
          communicate all identified risks, and I agree to acknowledge them before proceeding. *
        </label>
      </div>

      <SubmitButton />

      <p className="text-xs text-gray-500 text-center">We respond within 24 hours. Your information is never shared.</p>
    </form>
  )
}
