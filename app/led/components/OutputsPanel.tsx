"use client"
import { useState } from "react"
import type { Cabinet, Derived, WallConfig } from "../lib/types"
import { buildSummary } from "../lib/summary"

export function OutputsPanel({
  cab,
  cfg,
  d,
  shareUrl,
}: {
  cab: Cabinet
  cfg: WallConfig
  d: Derived
  shareUrl: string
}) {
  const [copied, setCopied] = useState<"link" | "summary" | null>(null)
  const summary = buildSummary(cab, cfg, d, shareUrl)

  async function copy(text: string, key: "link" | "summary") {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(key)
      setTimeout(() => setCopied(null), 1400)
    } catch {
      // no-op
    }
  }

  return (
    <div className="panel p-5">
      <div className="flex items-center justify-between mb-4">
        <h2 className="mono text-[12px] tracking-[0.08em] uppercase">04 / OUTPUTS</h2>
        <span className="mono text-[10px] uppercase text-[var(--led-ink-faint)]">
          PHASE 1 / PREVIEW
        </span>
      </div>

      <div className="space-y-4">
        <div>
          <div className="label mb-1.5">SHARE LINK</div>
          <div className="flex gap-2">
            <input value={shareUrl} readOnly onFocus={(e) => e.currentTarget.select()} />
            <button type="button" className="cta cta-primary" onClick={() => copy(shareUrl, "link")}>
              {copied === "link" ? "COPIED" : "COPY"}
            </button>
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-1.5">
            <span className="label">SUMMARY TEXT</span>
            <button type="button" className="cta" onClick={() => copy(summary, "summary")}>
              {copied === "summary" ? "COPIED" : "COPY"}
            </button>
          </div>
          <pre
            className="mono text-[11px] leading-relaxed whitespace-pre-wrap p-3 border hairline"
            style={{ background: "var(--led-bg-2)" }}
          >
            {summary}
          </pre>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <button type="button" className="cta" disabled title="Phase 2 / PDF generation">
            DOWNLOAD SPEC / PDF
          </button>
          <button type="button" className="cta" disabled title="Phase 2 / PDF generation">
            DOWNLOAD MAP / PDF
          </button>
        </div>
        <p className="mono text-[10px] uppercase text-[var(--led-ink-faint)]">
          PDF outputs ship in Phase 2 / share link + summary live now.
        </p>
      </div>
    </div>
  )
}
