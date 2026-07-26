"use client"

import Script from "next/script"
import { FormEvent, useRef, useState } from "react"

const turnstileSiteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY

type FormStatus =
  | { state: "idle" }
  | { state: "sending" }
  | { state: "success" }
  | { state: "error"; message: string }

export function FreeBetaForm() {
  const startedAt = useRef(Date.now())
  const [status, setStatus] = useState<FormStatus>({ state: "idle" })

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = event.currentTarget
    const data = new FormData(form)
    setStatus({ state: "sending" })

    try {
      const response = await fetch("/api/power-symbols/free-beta", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.get("name"),
          email: data.get("email"),
          vectorworksVersion: data.get("vectorworksVersion"),
          macosVersion: data.get("macosVersion"),
          feedbackPromise: data.get("feedbackPromise") === "yes",
          companyWebsite: data.get("companyWebsite"),
          elapsedMs: Date.now() - startedAt.current,
          turnstileToken: data.get("cf-turnstile-response"),
        }),
      })
      const result = (await response.json()) as {
        delivered?: boolean
        error?: string
      }
      if (!response.ok || !result.delivered) {
        throw new Error(result.error || "The serial could not be delivered.")
      }
      setStatus({ state: "success" })
      form.reset()
    } catch (error) {
      setStatus({
        state: "error",
        message:
          error instanceof Error
            ? error.message
            : "The serial could not be delivered.",
      })
    }
  }

  if (status.state === "success") {
    return (
      <div
        id="free-beta"
        className="scroll-mt-24 border border-[#00D26A] bg-black p-7 md:p-9"
        role="status"
      >
        <p className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-[#00D26A]">
          Sympathy approved
        </p>
        <h3 className="mt-5 text-3xl font-semibold tracking-[-0.035em]">
          Check your inbox.
        </h3>
        <p className="mt-4 max-w-2xl leading-relaxed text-zinc-300">
          Your private download and email-bound activation serial are on their
          way. Repeating the request with the same email will not mint another
          licence.
        </p>
      </div>
    )
  }

  return (
    <div
      id="free-beta"
      className="scroll-mt-24 border border-zinc-800 bg-black p-7 md:p-9"
    >
      <div className="grid gap-8 lg:grid-cols-[0.72fr_1.28fr]">
        <div>
          <p className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-[#00D26A]">
            $0 · Sympathy serial
          </p>
          <h3 className="mt-5 text-3xl font-semibold tracking-[-0.035em]">
            No cash. One small promise.
          </h3>
          <p className="mt-4 max-w-md leading-relaxed text-zinc-400">
            Tell us what you are testing and the system emails your private
            download and activation serial immediately. The same email always
            receives the same serial.
          </p>
        </div>

        <form
          onSubmit={submit}
          className="grid min-w-0 gap-5 sm:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]"
        >
          <div>
            <label
              htmlFor="free-beta-name"
              className="font-mono text-[11px] uppercase tracking-[0.16em] text-zinc-400"
            >
              Name
            </label>
            <input
              id="free-beta-name"
              name="name"
              type="text"
              minLength={2}
              maxLength={80}
              autoComplete="name"
              required
              className="mt-2 min-w-0 w-full border border-zinc-700 bg-zinc-950 px-4 py-3 text-white outline-none transition-colors focus:border-[#00D26A]"
            />
          </div>
          <div>
            <label
              htmlFor="free-beta-email"
              className="font-mono text-[11px] uppercase tracking-[0.16em] text-zinc-400"
            >
              Email
            </label>
            <input
              id="free-beta-email"
              name="email"
              type="email"
              autoComplete="email"
              required
              className="mt-2 min-w-0 w-full border border-zinc-700 bg-zinc-950 px-4 py-3 text-white outline-none transition-colors focus:border-[#00D26A]"
            />
          </div>
          <div>
            <label
              htmlFor="free-beta-vectorworks"
              className="font-mono text-[11px] uppercase tracking-[0.16em] text-zinc-400"
            >
              Vectorworks
            </label>
            <select
              id="free-beta-vectorworks"
              name="vectorworksVersion"
              defaultValue=""
              required
              className="mt-2 min-w-0 w-full border border-zinc-700 bg-zinc-950 px-4 py-3 text-white outline-none transition-colors focus:border-[#00D26A]"
            >
              <option value="" disabled>
                Choose version
              </option>
              <option value="2026">2026</option>
              <option value="2025">2025</option>
              <option value="2024">2024</option>
              <option value="2023">2023</option>
            </select>
          </div>
          <div>
            <label
              htmlFor="free-beta-macos"
              className="font-mono text-[11px] uppercase tracking-[0.16em] text-zinc-400"
            >
              macOS version <span className="text-zinc-600">(optional)</span>
            </label>
            <input
              id="free-beta-macos"
              name="macosVersion"
              type="text"
              maxLength={80}
              placeholder="e.g. Sequoia 15.5"
              className="mt-2 min-w-0 w-full border border-zinc-700 bg-zinc-950 px-4 py-3 text-white outline-none transition-colors placeholder:text-zinc-700 focus:border-[#00D26A]"
            />
          </div>

          <label className="flex cursor-pointer items-start gap-3 border border-zinc-800 bg-zinc-950 p-4 text-sm leading-relaxed text-zinc-300 sm:col-span-2">
            <input
              name="feedbackPromise"
              value="yes"
              type="checkbox"
              required
              className="mt-1 size-4 accent-[#00D26A]"
            />
            <span className="min-w-0">
              I will send useful field notes, screenshots or reproducible bugs
              instead of quietly disappearing into the night.
            </span>
          </label>

          <div className="hidden" aria-hidden="true">
            <label htmlFor="free-beta-company-website">Company website</label>
            <input
              id="free-beta-company-website"
              name="companyWebsite"
              type="text"
              tabIndex={-1}
              autoComplete="off"
            />
          </div>

          {turnstileSiteKey && (
            <div className="sm:col-span-2">
              <Script
                src="https://challenges.cloudflare.com/turnstile/v0/api.js"
                strategy="lazyOnload"
              />
              <div
                className="cf-turnstile"
                data-sitekey={turnstileSiteKey}
                data-theme="dark"
              />
            </div>
          )}

          {status.state === "error" && (
            <p
              className="border-l-2 border-red-500 pl-4 text-sm text-red-300 sm:col-span-2"
              role="alert"
            >
              {status.message}
            </p>
          )}

          <button
            type="submit"
            disabled={status.state === "sending"}
            className="flex items-center justify-between bg-[#00D26A] px-5 py-4 font-mono text-xs font-bold uppercase tracking-[0.16em] text-black transition-colors hover:bg-white disabled:cursor-wait disabled:bg-zinc-700 disabled:text-zinc-400 sm:col-span-2"
          >
            {status.state === "sending"
              ? "Issuing one tiny serial…"
              : "Email my sympathy serial"}
            <span aria-hidden="true">→</span>
          </button>
        </form>
      </div>
    </div>
  )
}
