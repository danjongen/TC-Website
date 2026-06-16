"use client"

import { useState } from "react"
import { ArrowRight, Loader2, Check } from "lucide-react"
import { subscribeToNewsletter } from "@/app/actions/subscribe"

export function NewsletterForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")
  const [message, setMessage] = useState("")

  async function handleSubmit(formData: FormData) {
    setStatus("loading")

    const result = await subscribeToNewsletter(formData)

    if (result.success) {
      setStatus("success")
      setMessage(result.message)
    } else {
      setStatus("error")
      setMessage(result.message)
    }
  }

  if (status === "success") {
    return (
      <div className="flex items-center justify-center gap-3 py-4 px-6 bg-[#00D26A]/10 border border-[#00D26A]/30">
        <Check className="w-5 h-5 text-[#00D26A]" />
        <span className="text-[#00D26A] font-medium">{message}</span>
      </div>
    )
  }

  return (
    <form action={handleSubmit} className="flex flex-col sm:flex-row gap-4">
      <input
        type="email"
        name="email"
        placeholder="your@email.com"
        required
        disabled={status === "loading"}
        className="flex-grow px-4 py-3 bg-zinc-900 border border-border text-white placeholder:text-muted-foreground focus:outline-none focus:border-[#00D26A] focus:ring-1 focus:ring-[#00D26A] transition-colors disabled:opacity-50"
        aria-label="Email address for notifications"
      />
      <button
        type="submit"
        disabled={status === "loading"}
        className="px-6 py-3 bg-white text-black font-bold hover:bg-gray-200 transition-colors inline-flex items-center justify-center gap-2 disabled:opacity-50"
      >
        {status === "loading" ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            Subscribing...
          </>
        ) : (
          <>
            Notify Me <ArrowRight className="w-4 h-4" />
          </>
        )}
      </button>
      {status === "error" && <p className="text-red-500 text-sm sm:absolute sm:mt-16">{message}</p>}
    </form>
  )
}
