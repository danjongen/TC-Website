"use client"

import Script from "next/script"
import { FormEvent, useRef, useState } from "react"

import { field, fieldLabel } from "./ui"

const turnstileSiteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY

type Status = { state: "idle" } | { state: "sending" } | { state: "done" } | { state: "error"; message: string }

export function ReleaseListForm() {
  const startedAt = useRef(Date.now())
  const [status, setStatus] = useState<Status>({ state: "idle" })

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = event.currentTarget
    const data = new FormData(form)
    setStatus({ state: "sending" })
    try {
      const response = await fetch("/api/layout-points/release-list", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: data.get("email"),
          name: data.get("name"),
          vectorworksVersion: data.get("vectorworksVersion"),
          consent: data.get("consent") === "yes",
          companyWebsite: data.get("companyWebsite"),
          elapsedMs: Date.now() - startedAt.current,
          turnstileToken: data.get("cf-turnstile-response"),
        }),
      })
      const result = (await response.json().catch(() => ({}))) as { ok?: boolean; error?: string }
      if (!response.ok || !result.ok) throw new Error(result.error || "That did not go through. Try again.")
      setStatus({ state: "done" })
      form.reset()
    } catch (error) {
      setStatus({
        state: "error",
        message: error instanceof Error ? error.message : "That did not go through. Try again.",
      })
    }
  }

  if (status.state === "done") {
    return (
      <div role="status" className="border border-[#00D26A] bg-black p-7 md:p-9">
        <p className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-[#00D26A]">On the list</p>
        <p className="mt-4 text-2xl font-semibold tracking-[-0.03em]">We will email you when the paid beta opens.</p>
        <p className="mt-3 max-w-xl leading-relaxed text-zinc-300">
          One message when signed, notarised builds go on sale. Nothing else.
        </p>
      </div>
    )
  }

  return (
    <form
      onSubmit={submit}
      data-clarity-mask="true"
      className="grid grid-cols-1 min-w-0 gap-5 sm:grid-cols-2"
      noValidate={false}
    >
      <div>
        <label htmlFor="lp-list-email" className={fieldLabel}>
          Email
        </label>
        <input
          id="lp-list-email"
          name="email"
          type="email"
          autoComplete="email"
          required
          maxLength={254}
          className={field}
        />
      </div>
      <div>
        <label htmlFor="lp-list-name" className={fieldLabel}>
          Name <span className="normal-case tracking-normal text-zinc-400">(optional)</span>
        </label>
        <input id="lp-list-name" name="name" type="text" autoComplete="name" maxLength={80} className={field} />
      </div>
      <div className="sm:col-span-2">
        <label htmlFor="lp-list-vw" className={fieldLabel}>
          Vectorworks version you use <span className="normal-case tracking-normal text-zinc-400">(optional)</span>
        </label>
        <select id="lp-list-vw" name="vectorworksVersion" defaultValue="" className={field}>
          <option value="">Prefer not to say</option>
          <option value="2026">2026</option>
          <option value="2025">2025</option>
          <option value="2024">2024</option>
          <option value="2023">2023</option>
          <option value="other">Another version</option>
          <option value="none">Datum Label Studio only</option>
        </select>
      </div>
      <label className="flex cursor-pointer items-start gap-3 border border-zinc-800 bg-zinc-950 p-4 text-sm leading-relaxed text-zinc-300 sm:col-span-2">
        <input name="consent" value="yes" type="checkbox" required className="mt-1 size-4 shrink-0 accent-[#00D26A]" />
        <span>
          Email me when the Layout Points and Datum Label Studio paid beta opens. Unsubscribe at any time. See the{" "}
          <a href="/privacy-policy" className="text-white underline underline-offset-4 hover:text-[#00D26A]">
            privacy policy
          </a>
          .
        </span>
      </label>

      <div className="hidden" aria-hidden="true">
        <label htmlFor="lp-list-company-website">Company website</label>
        <input id="lp-list-company-website" name="companyWebsite" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      {turnstileSiteKey && (
        <div className="sm:col-span-2">
          <Script src="https://challenges.cloudflare.com/turnstile/v0/api.js" strategy="lazyOnload" />
          <div className="cf-turnstile" data-sitekey={turnstileSiteKey} data-theme="dark" />
        </div>
      )}

      {status.state === "error" && (
        <p role="alert" className="border-l-2 border-red-500 pl-4 text-sm text-red-300 sm:col-span-2">
          {status.message}
        </p>
      )}

      <button
        type="submit"
        disabled={status.state === "sending"}
        className="flex items-center justify-between bg-[#00D26A] px-6 py-5 font-mono text-xs font-bold uppercase tracking-[0.18em] text-black transition-colors duration-300 ease-expo hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black disabled:cursor-wait disabled:bg-zinc-700 disabled:text-zinc-300 sm:col-span-2"
      >
        {status.state === "sending" ? "Adding you" : "Join the release list"}
      </button>
    </form>
  )
}
