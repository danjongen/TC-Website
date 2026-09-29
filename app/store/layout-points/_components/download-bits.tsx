"use client"

import { useSearchParams } from "next/navigation"
import { useEffect, useRef, useState } from "react"

import { trackLayoutPoints } from "@/lib/layout-points/analytics"
import type { ComponentId } from "@/lib/layout-points/release"

export function DownloadButton({
  href,
  filename,
  component,
  version,
  label,
  className,
}: {
  href: string
  filename: string
  component: ComponentId
  version: string
  label: string
  className: string
}) {
  return (
    <a
      href={href}
      download={filename}
      className={className}
      onClick={() => trackLayoutPoints("lp_download_start", { component, version })}
    >
      {label}
    </a>
  )
}

/** Full SHA-256 with a copy control. Copying counts as opening the checksum. */
export function ChecksumValue({
  value,
  component,
  version,
}: {
  value: string
  component: ComponentId
  version: string
}) {
  const [copied, setCopied] = useState(false)
  return (
    <div className="flex items-start justify-between gap-3">
      <code className="min-w-0 break-all font-mono text-xs leading-relaxed text-zinc-200">{value}</code>
      <button
        type="button"
        onClick={async () => {
          trackLayoutPoints("lp_open_checksum", { component, version })
          try {
            await navigator.clipboard.writeText(value)
            setCopied(true)
            window.setTimeout(() => setCopied(false), 2000)
          } catch {
            setCopied(false)
          }
        }}
        className="shrink-0 border border-zinc-700 px-3 py-2 font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-white transition-colors duration-300 ease-expo hover:border-[#00D26A] hover:text-[#00D26A] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00D26A]"
      >
        <span aria-live="polite">{copied ? "Copied" : "Copy"}</span>
        <span className="sr-only"> SHA-256</span>
      </button>
    </div>
  )
}

/** Shown when a Latest link could not resolve to a published file. */
export function DownloadErrorNotice() {
  const params = useSearchParams()
  const error = params.get("error")
  const sent = useRef(false)

  useEffect(() => {
    if (error && !sent.current) {
      sent.current = true
      trackLayoutPoints("lp_download_error")
    }
  }, [error])

  if (!error) return null
  return (
    <p role="alert" className="mt-8 border-l-2 border-amber-300 pl-4 leading-relaxed text-amber-100">
      That download is not available. No public file is published for it yet. Join the release list below, or contact
      support if a link sent you here.
    </p>
  )
}
