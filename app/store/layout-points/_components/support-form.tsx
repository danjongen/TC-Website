"use client"

import Script from "next/script"
import { FormEvent, useRef, useState } from "react"

import {
  ATTACHMENT_EXTENSIONS,
  ATTACHMENT_MAX_BYTES,
  SUPPORT_ARCHITECTURES,
  SUPPORT_CATEGORIES,
  SUPPORT_COMPONENTS,
  SUPPORT_IMPORT_TYPES,
  SUPPORT_VECTORWORKS,
} from "@/lib/layout-points/support-options"

import { field, fieldLabel } from "./ui"

const turnstileSiteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY

type Status = { state: "idle" } | { state: "sending" } | { state: "done" } | { state: "error"; message: string }

function Select({
  id,
  name,
  label,
  options,
  required = false,
}: {
  id: string
  name: string
  label: string
  options: readonly string[]
  required?: boolean
}) {
  return (
    <div>
      <label htmlFor={id} className={fieldLabel}>
        {label}
      </label>
      <select id={id} name={name} defaultValue="" required={required} className={field}>
        <option value="" disabled={required}>
          {required ? "Choose one" : "Not provided"}
        </option>
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
    </div>
  )
}

function Text({
  id,
  name,
  label,
  hint,
  required = false,
  max = 120,
  autoComplete,
}: {
  id: string
  name: string
  label: string
  hint?: string
  required?: boolean
  max?: number
  autoComplete?: string
}) {
  return (
    <div>
      <label htmlFor={id} className={fieldLabel}>
        {label} {!required && <span className="normal-case tracking-normal text-zinc-400">(optional)</span>}
      </label>
      <input
        id={id}
        name={name}
        type={name === "email" ? "email" : "text"}
        required={required}
        maxLength={max}
        autoComplete={autoComplete ?? "off"}
        aria-describedby={hint ? `${id}-hint` : undefined}
        className={field}
      />
      {hint && (
        <p id={`${id}-hint`} className="mt-2 text-xs text-zinc-400">
          {hint}
        </p>
      )}
    </div>
  )
}

export function SupportForm() {
  const startedAt = useRef(Date.now())
  const [status, setStatus] = useState<Status>({ state: "idle" })
  const [fileError, setFileError] = useState<string | null>(null)

  function checkFile(file: File | undefined) {
    if (!file) return null
    const lower = file.name.toLowerCase()
    if (!ATTACHMENT_EXTENSIONS.some((ext) => lower.endsWith(ext)))
      return `Attach one of: ${ATTACHMENT_EXTENSIONS.join(", ")}.`
    if (file.size > ATTACHMENT_MAX_BYTES) return "Keep the attachment under 4 MB."
    return null
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = event.currentTarget
    const data = new FormData(form)
    const file = data.get("attachment")
    const problem = file instanceof File && file.size > 0 ? checkFile(file) : null
    if (problem) {
      setFileError(problem)
      return
    }
    if (file instanceof File && file.size === 0) data.delete("attachment")
    data.set("elapsedMs", String(Date.now() - startedAt.current))
    setStatus({ state: "sending" })
    try {
      const response = await fetch("/api/layout-points/support", { method: "POST", body: data })
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
        <p className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-[#00D26A]">Sent</p>
        <p className="mt-4 text-2xl font-semibold tracking-[-0.03em]">Your support request is with us.</p>
        <p className="mt-3 max-w-xl leading-relaxed text-zinc-300">We reply to the email address you gave.</p>
      </div>
    )
  }

  return (
    <form
      onSubmit={submit}
      data-clarity-mask="true"
      encType="multipart/form-data"
      className="grid grid-cols-1 min-w-0 gap-6 sm:grid-cols-2"
    >
      <Text id="lp-s-name" name="name" label="Name" required max={80} autoComplete="name" />
      <Text id="lp-s-email" name="email" label="Email" required max={254} autoComplete="email" />

      <Select id="lp-s-component" name="component" label="Product component" options={SUPPORT_COMPONENTS} required />
      <Text
        id="lp-s-version"
        name="productVersion"
        label="Product version"
        hint="Shown in About or in the installer."
        max={40}
      />

      <Text id="lp-s-macos" name="macosVersion" label="macOS version" hint="Apple menu > About This Mac." max={40} />
      <Select id="lp-s-arch" name="architecture" label="Mac architecture" options={SUPPORT_ARCHITECTURES} />

      <Select id="lp-s-vw" name="vectorworksVersion" label="Vectorworks version" options={SUPPORT_VECTORWORKS} />
      <Select id="lp-s-import" name="importType" label="Import type" options={SUPPORT_IMPORT_TYPES} />

      <Text id="lp-s-printer" name="printer" label="Printer and driver" max={120} />
      <Text id="lp-s-label" name="labelDimensions" label="Label dimensions" hint="For example 60 x 40 mm." max={60} />

      <div className="sm:col-span-2">
        <Select id="lp-s-category" name="category" label="Problem category" options={SUPPORT_CATEGORIES} required />
      </div>

      <div className="sm:col-span-2">
        <label htmlFor="lp-s-message" className={fieldLabel}>
          What happened, and what did you expect?
        </label>
        <textarea
          id="lp-s-message"
          name="message"
          required
          minLength={20}
          maxLength={4000}
          rows={6}
          className={field}
        />
      </div>

      <div className="grid grid-cols-1 gap-4 border border-zinc-800 bg-zinc-950 p-5 sm:col-span-2 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] md:gap-8">
        <div>
          <label htmlFor="lp-s-file" className={fieldLabel}>
            Screenshot or diagnostic{" "}
            <span className="normal-case tracking-normal text-zinc-400">(optional, 4 MB max)</span>
          </label>
          <input
            id="lp-s-file"
            name="attachment"
            type="file"
            accept={ATTACHMENT_EXTENSIONS.join(",")}
            aria-describedby="lp-s-file-warning"
            onChange={(e) => setFileError(checkFile(e.currentTarget.files?.[0]))}
            className="mt-3 block w-full text-sm text-zinc-300 file:mr-4 file:border file:border-zinc-700 file:bg-black file:px-4 file:py-2 file:font-mono file:text-[11px] file:font-bold file:uppercase file:tracking-[0.14em] file:text-white hover:file:border-[#00D26A] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00D26A]"
          />
          {fileError && (
            <p role="alert" className="mt-2 text-sm text-red-300">
              {fileError}
            </p>
          )}
        </div>
        <p
          id="lp-s-file-warning"
          className="self-center border-l-2 border-amber-300 pl-4 text-sm leading-relaxed text-amber-100"
        >
          Do not upload production coordinates or client data unless you are authorised to share them.
        </p>
      </div>

      <div className="hidden" aria-hidden="true">
        <label htmlFor="lp-s-company-website">Company website</label>
        <input id="lp-s-company-website" name="companyWebsite" type="text" tabIndex={-1} autoComplete="off" />
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
        {status.state === "sending" ? "Sending" : "Send support request"}
      </button>
    </form>
  )
}
