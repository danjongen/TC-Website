"use client"
import { useEffect, useState } from "react"
import type { Cabinet, Derived, WallConfig } from "../lib/types"
import { buildSummary } from "../lib/summary"
import { fmt } from "../lib/derive"
import { downloadBlob, renderPixelMapPng, renderSpecPdf } from "../lib/pdf"
import { SaveToAirtable } from "./SaveToAirtable"

export function OutputsPanel({
  cab,
  cfg,
  d,
  shareUrl,
  onProjectCodeChange,
}: {
  cab: Cabinet
  cfg: WallConfig
  d: Derived
  shareUrl: string
  onProjectCodeChange?: (code: string) => void
}) {
  const [copied, setCopied] = useState<"link" | "summary" | null>(null)
  const [busy, setBusy] = useState<"spec" | "pixel" | null>(null)
  const [pixelErr, setPixelErr] = useState<string | null>(null)
  const [shortUrl, setShortUrl] = useState<string | null>(null)

  // Mint a short link for the current config (debounced). The builder's
  // own URL stays long for refresh-safe editing; only the *shared* link
  // is shortened. Falls back to the long URL if Redis is unavailable.
  useEffect(() => {
    const token = shareUrl.split("/led/share/")[1]
    if (!token) {
      setShortUrl(null)
      return
    }
    let cancelled = false
    const t = setTimeout(async () => {
      try {
        const res = await fetch("/led/api/shorten", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ token }),
        })
        const data = (await res.json()) as { id: string | null }
        if (cancelled) return
        if (data.id && typeof window !== "undefined") {
          setShortUrl(`${window.location.origin}/led/s/${data.id}`)
        } else {
          setShortUrl(null)
        }
      } catch {
        if (!cancelled) setShortUrl(null)
      }
    }, 900)
    return () => {
      cancelled = true
      clearTimeout(t)
    }
  }, [shareUrl])

  const displayUrl = shortUrl || shareUrl
  const summary = buildSummary(cab, cfg, d, displayUrl)
  // Share link only meaningful once the project is identified + sized.
  const populated =
    cfg.project_code.trim().length > 0 && cfg.tiles_wide > 0 && cfg.tiles_high > 0

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

  async function downloadPixelMap() {
    setBusy("pixel")
    setPixelErr(null)
    try {
      const blob = await renderPixelMapPng(cab, cfg)
      downloadBlob(blob, fileSafe(`${cfg.project_code || "LED"}_PIXELMAP.png`))
    } catch (err) {
      setPixelErr(err instanceof Error ? err.message : "render failed")
    } finally {
      setBusy(null)
    }
  }

  return (
    <div className="panel p-5">
      <div className="flex items-center justify-between mb-4">
        <h2 className="mono text-[12px] tracking-[0.08em] uppercase">04 / OUTPUTS</h2>
        <span className="mono text-[10px] uppercase text-[var(--led-ink-faint)]">
          PIXEL / SPEC / SUMMARY / LINK
        </span>
      </div>

      <div className="space-y-4">
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <span className="label">SHARE LINK</span>
            {populated ? (
              <span className="mono text-[10px] uppercase text-[var(--led-ink-faint)]">
                {shortUrl ? "SHORT" : "FULL"}
              </span>
            ) : null}
          </div>
          {populated ? (
            <div className="flex gap-2">
              <input value={displayUrl} readOnly onFocus={(e) => e.currentTarget.select()} />
              <button type="button" className="cta" onClick={() => copy(displayUrl, "link")}>
                {copied === "link" ? "COPIED" : "COPY LINK"}
              </button>
            </div>
          ) : (
            <div
              className="mono text-[11px] uppercase text-[var(--led-ink-faint)] px-3 py-2.5 border hairline"
              style={{ background: "var(--led-bg-2)" }}
            >
              ENTER PROJECT CODE TO GENERATE SHARE LINK
            </div>
          )}
        </div>

        <div>
          <button
            type="button"
            className="cta cta-primary w-full"
            onClick={downloadPixelMap}
            disabled={busy !== null}
            title="1:1 content map — canvas is the wall's exact pixel resolution"
          >
            {busy === "pixel" ? "BUILDING /" : "DOWNLOAD PIXEL MAP / PNG / 1:1"}
          </button>
          <div className="mono text-[10px] uppercase text-[var(--led-ink-faint)] mt-1.5">
            {fmt.int(d.pixels_wide)}×{fmt.int(d.pixels_high)} PX / ONE IMAGE PIXEL = ONE LED PIXEL
          </div>
          {pixelErr ? (
            <div className="mono text-[10px] uppercase mt-1.5" style={{ color: "#ff5f5f" }}>
              PIXEL MAP / {pixelErr}
            </div>
          ) : null}
        </div>

        <div>
          <button
            type="button"
            className="cta cta-primary w-full"
            onClick={downloadSpec}
            disabled={busy !== null}
            title="2-page PDF — spec sheet + cabinet layout map"
          >
            {busy === "spec" ? "BUILDING /" : "DOWNLOAD SPEC / PDF"}
          </button>
          <div className="mono text-[10px] uppercase text-[var(--led-ink-faint)] mt-1.5">
            2 PAGES / SPEC SHEET + CABINET LAYOUT
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-1.5">
            <span className="label">SUMMARY TEXT</span>
            <button type="button" className="cta" onClick={() => copy(summary, "summary")}>
              {copied === "summary" ? "COPIED" : "COPY TEXT"}
            </button>
          </div>
          <pre
            className="mono text-[11px] leading-relaxed whitespace-pre-wrap p-3 border hairline"
            style={{ background: "var(--led-bg-2)" }}
          >
            {summary}
          </pre>
        </div>

        {onProjectCodeChange ? (
          <SaveToAirtable
            cab={cab}
            cfg={cfg}
            d={d}
            shareUrl={shareUrl}
            onSelectProjectCode={onProjectCodeChange}
          />
        ) : null}
      </div>
    </div>
  )
}

function fileSafe(s: string): string {
  return s.replace(/[^A-Za-z0-9._-]+/g, "_")
}
