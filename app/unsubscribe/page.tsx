"use client"

import type React from "react"

import { useState, useEffect, Suspense } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { unsubscribeFromNewsletter } from "@/app/actions/subscribe"

function UnsubscribeContent() {
  const searchParams = useSearchParams()
  const emailParam = searchParams.get("email") || ""

  const [email, setEmail] = useState(emailParam)
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")
  const [message, setMessage] = useState("")

  useEffect(() => {
    if (emailParam) {
      setEmail(emailParam)
    }
  }, [emailParam])

  async function handleUnsubscribe(e: React.FormEvent) {
    e.preventDefault()
    setStatus("loading")

    const result = await unsubscribeFromNewsletter(email)

    if (result.success) {
      setStatus("success")
      setMessage(result.message)
    } else {
      setStatus("error")
      setMessage(result.message)
    }
  }

  return (
    <main className="min-h-screen bg-black text-white flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="border border-border p-8 md:p-12">
          <h1 data-vt="title" data-reveal="rise" className="text-2xl md:text-3xl font-bold tracking-tight mb-4">
            Unsubscribe
          </h1>

          {status === "success" ? (
            <div className="space-y-6">
              <p data-reveal="fade" className="text-muted-foreground">
                {message}
              </p>
              <p data-reveal="fade" className="text-sm text-muted-foreground">
                Changed your mind?{" "}
                <Link
                  href="/insights"
                  className="text-foreground underline underline-offset-4 transition-colors duration-300 ease-expo hover:text-muted-foreground"
                >
                  Subscribe again
                </Link>
              </p>
              <Link
                href="/"
                data-reveal="fade"
                className="inline-block border border-foreground px-6 py-3 text-sm font-medium transition-colors duration-300 ease-expo hover:bg-foreground hover:text-background"
              >
                BACK TO HOME
              </Link>
            </div>
          ) : (
            <form onSubmit={handleUnsubscribe} className="space-y-6">
              <p data-reveal="fade" className="text-muted-foreground">
                Enter your email to unsubscribe from TC Insights updates.
              </p>

              <div>
                <label htmlFor="email" className="sr-only">
                  Email address
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                  className="w-full bg-transparent border border-border px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-foreground"
                />
              </div>

              {status === "error" && (
                <p role="alert" className="text-sm text-red-500">
                  {message}
                </p>
              )}

              <button
                type="submit"
                disabled={status === "loading"}
                className="w-full border border-foreground px-6 py-3 text-sm font-medium transition-colors duration-300 ease-expo hover:bg-foreground hover:text-background disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {status === "loading" ? "PROCESSING..." : "UNSUBSCRIBE"}
              </button>

              <p className="text-xs text-muted-foreground">
                You can also contact us at{" "}
                <a href="mailto:info@tc.agency" className="underline underline-offset-2">
                  info@tc.agency
                </a>
              </p>
            </form>
          )}
        </div>
      </div>
    </main>
  )
}

export default function UnsubscribePage() {
  return (
    <Suspense
      fallback={
        <main className="min-h-screen bg-black text-white flex items-center justify-center px-4">
          <div className="w-full max-w-md">
            <div className="border border-border p-8 md:p-12">
              <p className="text-muted-foreground">Loading...</p>
            </div>
          </div>
        </main>
      }
    >
      <UnsubscribeContent />
    </Suspense>
  )
}
