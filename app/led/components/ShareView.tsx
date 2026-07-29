"use client"
import { useMemo, useState } from "react"
import { CABINETS, getCabinet } from "../data/cabinets"
import { Footer } from "./Footer"
import { Glyph } from "./Glyph"
import { PanelMap } from "./PanelMap"
import { SpecSheet } from "./SpecSheet"
import { UnitsToggle } from "./UnitsToggle"
import { derive } from "../lib/derive"
import { decodeConfig } from "../lib/encode"
import { buildSummary } from "../lib/summary"
import { downloadBlob, renderPixelMapPng, renderSpecPdf } from "../lib/pdf"
import type { Cabinet, Units } from "../lib/types"

/**
 * View-only spec page body. Used by both /led/share/[config] (long
 * token in the URL) and /led/s/[id] (short link resolved to a token).
 *
 * `resolvedCabinet` is looked up server-side from the published DB so links
 * that reference a DB-only cabinet render correctly; it falls back to the
 * built-in library, then the first built-in cabinet.
 */
export function ShareView({
  token,
  resolvedCabinet = null,
}: {
  token: string
  resolvedCabinet?: Cabinet | null
}) {
  const cfg = useMemo(() => decodeConfig(token), [token])
  const cab = useMemo(
    () =>
      resolvedCabinet ??
      (cfg ? getCabinet(cfg.cabinet_id) ?? CABINETS[0] : CABINETS[0]),
    [cfg, resolvedCabinet]
  )
  const d = useMemo(() => (cfg ? derive(cab, cfg) : null), [cab, cfg])

  const [busy, setBusy] = useState<"spec" | "pixel" | null>(null)
  const [pixelErr, setPixelErr] = useState<string | null>(null)
  const [copied, setCopied] = useState<"link" | "summary" | null>(null)
  const [units, setUnits] = useState<Units>(cfg?.units ?? "metric")

  if (!cfg || !d) {
    return <InvalidShare />
  }

  const cfgU = { ...cfg, units }
  const shareUrl = typeof window !== "undefined" ? window.location.href : ""
  const summary = buildSummary(cab, cfgU, d, shareUrl)

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
    if (!cfg || !d) return
    setBusy("spec")
    try {
      const blob = await renderSpecPdf(cab, { ...cfg, units }, d)
      downloadBlob(blob, fileSafe(`${cfg.project_code || "LED"}_SPEC.pdf`))
    } finally {
      setBusy(null)
    }
  }

  async function downloadPixelMap() {
    if (!cfg) return
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
    <div className="min-h-screen flex flex-col">
      <header className="border-b hairline">
        <div className="flex items-center justify-between gap-4 px-4 md:px-6 py-4">
          <div className="flex items-center gap-2.5">
            <Glyph size={18} />
            <span className="mono text-[11px] tracking-[0.08em] uppercase">
              TECHNICALLY CREATIVE / DETROIT
            </span>
          </div>
          <span className="mono text-[10px] uppercase text-[var(--led-ink-faint)] hidden sm:inline">
            SHARED / VIEW-ONLY
          </span>
        </div>
      </header>

      <main className="flex-1 px-4 md:px-6 py-6">
        <div className="max-w-[1100px] mx-auto space-y-5">
          <div className="border-b hairline pb-4">
            <div className="label mb-1">{cfg.project_code || "-"}</div>
            <h1 className="mono text-[18px] md:text-[22px] font-bold tracking-tight uppercase">
              {cfg.project_name || "Untitled Wall"}
            </h1>
            <div className="mono text-[10px] uppercase text-[var(--led-ink-faint)] mt-2">
              {cab.manufacturer} {cab.model} / {cfg.tiles_wide}×{cfg.tiles_high} /
              REV {cfg.rev || "-"} / ISSUED {cfg.issued_date || "-"}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            <button
              type="button"
              className="cta cta-primary"
              onClick={downloadPixelMap}
              disabled={busy !== null}
              title="1:1 content map - canvas is the wall's exact pixel resolution"
            >
              {busy === "pixel" ? "BUILDING /" : "PIXEL MAP / PNG / 1:1"}
            </button>
            <button
              type="button"
              className="cta cta-primary"
              onClick={downloadSpec}
              disabled={busy !== null}
              title="2-page PDF - spec sheet + cabinet layout map"
            >
              {busy === "spec" ? "BUILDING /" : "DOWNLOAD SPEC / PDF"}
            </button>
            <button type="button" className="cta" onClick={() => copy(summary, "summary")}>
              {copied === "summary" ? "COPIED" : "COPY SUMMARY"}
            </button>
            <button type="button" className="cta" onClick={() => copy(shareUrl, "link")}>
              {copied === "link" ? "COPIED" : "COPY LINK"}
            </button>
          </div>
          {pixelErr ? (
            <div className="mono text-[10px] uppercase" style={{ color: "#ff5f5f" }}>
              PIXEL MAP / {pixelErr}
            </div>
          ) : null}

          <div className="flex justify-end">
            <UnitsToggle units={units} onChange={setUnits} />
          </div>
          <SpecSheet cab={cab} cfg={cfgU} d={d} />
          <PanelMap cab={cab} cfg={cfg} />

          <div className="panel p-5">
            <div className="label mb-2">SUMMARY</div>
            <pre
              className="mono text-[11px] leading-relaxed whitespace-pre-wrap p-3 border hairline"
              style={{ background: "var(--led-bg-2)" }}
            >
              {summary}
            </pre>
          </div>
        </div>
      </main>

      <Footer cabinetLabel={`${cab.manufacturer} ${cab.model}`} processorLabel={d.processor_label} />
    </div>
  )
}

function InvalidShare() {
  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <div className="panel p-8 max-w-md text-center">
        <div className="label mb-3">ERROR</div>
        <h1 className="mono text-[16px] font-bold uppercase mb-2">INVALID SHARE LINK</h1>
        <p className="mono text-[12px] text-[var(--led-ink-dim)]">
          This link could not be decoded or has expired. Ask the sender for a fresh one.
        </p>
        <a className="cta cta-primary inline-block mt-5" href="/led">
          OPEN BUILDER
        </a>
      </div>
    </div>
  )
}

function fileSafe(s: string): string {
  return s.replace(/[^A-Za-z0-9._-]+/g, "_")
}
