"use client"

import { useFormStatus } from "react-dom"
import { submitContactForm } from "@/app/actions/contact"
import { Loader2 } from "lucide-react"

function SubmitButton() {
  const { pending } = useFormStatus()

  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full py-4 bg-white text-black font-bold uppercase tracking-wide hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
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
  return (
    <form action={submitContactForm} className="space-y-6">
      {/* Name & Company */}
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label
            htmlFor="name"
            className="block text-xs font-mono text-muted-foreground uppercase tracking-widest mb-2"
          >
            Name *
          </label>
          <input
            type="text"
            id="name"
            name="name"
            required
            className="w-full px-4 py-3 bg-zinc-900 border border-border text-white placeholder:text-muted-foreground focus:outline-none focus:border-emerald-500 transition-colors"
            placeholder="Your name"
          />
        </div>
        <div>
          <label
            htmlFor="company"
            className="block text-xs font-mono text-muted-foreground uppercase tracking-widest mb-2"
          >
            Company
          </label>
          <input
            type="text"
            id="company"
            name="company"
            className="w-full px-4 py-3 bg-zinc-900 border border-border text-white placeholder:text-muted-foreground focus:outline-none focus:border-emerald-500 transition-colors"
            placeholder="Company name"
          />
        </div>
      </div>

      {/* Email & Phone */}
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label
            htmlFor="email"
            className="block text-xs font-mono text-muted-foreground uppercase tracking-widest mb-2"
          >
            Email *
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            className="w-full px-4 py-3 bg-zinc-900 border border-border text-white placeholder:text-muted-foreground focus:outline-none focus:border-emerald-500 transition-colors"
            placeholder="email@company.com"
          />
        </div>
        <div>
          <label
            htmlFor="phone"
            className="block text-xs font-mono text-muted-foreground uppercase tracking-widest mb-2"
          >
            Phone
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            className="w-full px-4 py-3 bg-zinc-900 border border-border text-white placeholder:text-muted-foreground focus:outline-none focus:border-emerald-500 transition-colors"
            placeholder="+1 (555) 000-0000"
          />
        </div>
      </div>

      {/* Project Type */}
      <div>
        <label
          htmlFor="projectType"
          className="block text-xs font-mono text-muted-foreground uppercase tracking-widest mb-2"
        >
          Project Type
        </label>
        <select
          id="projectType"
          name="projectType"
          className="w-full px-4 py-3 bg-zinc-900 border border-border text-white focus:outline-none focus:border-emerald-500 transition-colors"
        >
          <option value="">Select project type</option>
          <option value="tour">Tour Production</option>
          <option value="corporate">Corporate Event</option>
          <option value="installation">Permanent Installation</option>
          <option value="broadcast">Broadcast / Live Stream</option>
          <option value="consultation">Technical Consultation</option>
          <option value="other">Other</option>
        </select>
      </div>

      {/* Budget & Timeline */}
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label
            htmlFor="budget"
            className="block text-xs font-mono text-muted-foreground uppercase tracking-widest mb-2"
          >
            Budget Range
          </label>
          <select
            id="budget"
            name="budget"
            className="w-full px-4 py-3 bg-zinc-900 border border-border text-white focus:outline-none focus:border-emerald-500 transition-colors"
          >
            <option value="">Select budget</option>
            <option value="under-100k">Under $100K</option>
            <option value="100k-500k">$100K - $500K</option>
            <option value="500k-1m">$500K - $1M</option>
            <option value="1m-5m">$1M - $5M</option>
            <option value="over-5m">$5M+</option>
          </select>
        </div>
        <div>
          <label
            htmlFor="timeline"
            className="block text-xs font-mono text-muted-foreground uppercase tracking-widest mb-2"
          >
            Timeline
          </label>
          <select
            id="timeline"
            name="timeline"
            className="w-full px-4 py-3 bg-zinc-900 border border-border text-white focus:outline-none focus:border-emerald-500 transition-colors"
          >
            <option value="">Select timeline</option>
            <option value="immediate">Immediate (0-30 days)</option>
            <option value="1-3-months">1-3 months</option>
            <option value="3-6-months">3-6 months</option>
            <option value="6-12-months">6-12 months</option>
            <option value="planning">Just planning</option>
          </select>
        </div>
      </div>

      {/* Message */}
      <div>
        <label
          htmlFor="message"
          className="block text-xs font-mono text-muted-foreground uppercase tracking-widest mb-2"
        >
          Project Details *
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          required
          className="w-full px-4 py-3 bg-zinc-900 border border-border text-white placeholder:text-muted-foreground focus:outline-none focus:border-emerald-500 transition-colors resize-none"
          placeholder="Tell us about your project, venue, scale, and any specific technical requirements..."
        />
      </div>

      <SubmitButton />

      <p className="text-xs text-muted-foreground text-center">
        By submitting, you agree to be contacted about your inquiry. We never share your information.
      </p>
    </form>
  )
}
