"use client"
import { useState } from "react"
import type { Cabinet, Derived, WallConfig } from "../lib/types"
import { buildSummary } from "../lib/summary"
import { downloadBlob, renderPanelMapPdf, renderSpecPdf } from "../lib/pdf"

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
  const [busy, setBusy] = useState<"spec" | "map" | null>(null)
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

  async function downloadSpec() {
    setBusy("spec")
    try {
      const blob = await renderSpecPdf(cab, cfg, d)
      downloadBlob(blob, fileSafe(`${cfg.project_code || "LED"}_SPEC.pdf`))
    } finally {
      setBusy(null)
    }
  }

  async function downloadMap() {
    setBusy("map")
    try {
      const blob = await renderPanelMapPdf(cab, cfg)
      downloadBlob(blob, fileSafe(`${cfg.project_code || "LED"}_MAP.pdf`))
    } finally {
      setBusy(null)
    }
  }

  return (
    <div className="panel p-5">
      <div className="flex items-center justify-between mb-4">
        <h2 className="mono text-[12px] tracking-[0.08em] uppercase">04 / OUTPUTS</h2>
        <span className="mono text-[10px] uppercase text-[var(--led-ink-faint)]">
          SPEC / MAP / SUMMARY / LINK
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

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <button
            type="button"
            className="cta cta-primary"
            onClick={downloadSpec}
            disabled={busy !== null}
          >
            {busy === "spec" ? "BUILDING /" : "DOWNLOAD SPEC / PDF"}
          </button>
          <button
            type="button"
            className="cta cta-primary"
            onClick={downloadMap}
            disabled={busy !== null}
          >
            {busy === "map" ? "BUILDING /" : "DOWNLOAD MAP / PDF"}
          </button>
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
      </div>
    </div>
  )
}

function fileSafe(s: string): string {
  return s.replace(/[^A-Za-z0-9._-]+/g, "_")
}
