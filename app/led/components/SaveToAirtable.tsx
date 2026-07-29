"use client"
import { useEffect, useMemo, useRef, useState } from "react"
import type { Cabinet, Derived, WallConfig } from "../lib/types"
import { buildSummary } from "../lib/summary"
import { renderPanelMapPng, renderSpecPdf } from "../lib/pdf"

type Project = {
  id: string
  code: string
  name: string
  clientName?: string
  status?: string
}

type SaveResult = { recordId: string; recordUrl: string } | null

export function SaveToAirtable({
  cab,
  cfg,
  d,
  shareUrl,
  onSelectProjectCode,
}: {
  cab: Cabinet
  cfg: WallConfig
  d: Derived
  shareUrl: string
  onSelectProjectCode: (code: string) => void
}) {
  const [projects, setProjects] = useState<Project[] | null>(null)
  const [loadErr, setLoadErr] = useState<string | null>(null)
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState("")
  const [busy, setBusy] = useState(false)
  const [result, setResult] = useState<SaveResult>(null)
  const [error, setError] = useState<string | null>(null)
  const wrapRef = useRef<HTMLDivElement>(null)

  // Load projects once, lazily on first open.
  async function loadProjects() {
    if (projects || loadErr) return
    try {
      const res = await fetch("/led/api/projects", { cache: "no-store" })
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      const data = (await res.json()) as { projects: Project[] }
      setProjects(data.projects)
    } catch (err) {
      setLoadErr(err instanceof Error ? err.message : "load failed")
    }
  }

  // Close typeahead on outside click.
  useEffect(() => {
    if (!open) return
    function onClick(e: MouseEvent) {
      if (!wrapRef.current?.contains(e.target as Node)) setOpen(false)
    }
    window.addEventListener("mousedown", onClick)
    return () => window.removeEventListener("mousedown", onClick)
  }, [open])

  const filtered = useMemo(() => {
    if (!projects) return []
    const q = query.trim().toLowerCase()
    if (!q) return projects.slice(0, 12)
    return projects
      .filter((p) =>
        `${p.code} ${p.name} ${p.clientName ?? ""}`.toLowerCase().includes(q)
      )
      .slice(0, 12)
  }, [projects, query])

  const matchedProject = useMemo(
    () => projects?.find((p) => p.code === cfg.project_code),
    [projects, cfg.project_code]
  )

  async function save() {
    setBusy(true)
    setError(null)
    setResult(null)
    try {
      const [specBlob, mapBlob] = await Promise.all([
        renderSpecPdf(cab, cfg, d),
        renderPanelMapPng(cab, cfg),
      ])
      const [specB64, mapB64] = await Promise.all([
        blobToBase64(specBlob),
        blobToBase64(mapBlob),
      ])
      const cabinetLabel = `${cab.manufacturer} ${cab.model}`
      const summary = buildSummary(cab, cfg, d, shareUrl)
      const safe = fileSafe(cfg.project_code || "LED")
      const res = await fetch("/led/api/save", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          projectCode: cfg.project_code,
          projectName: cfg.project_name,
          cabinetLabel,
          summary,
          shareUrl,
          specPdfBase64: specB64,
          mapPngBase64: mapB64,
          specFilename: `${safe}_SPEC.pdf`,
          mapFilename: `${safe}_MAP.png`,
        }),
      })
      const data = (await res.json()) as
        | { recordId: string; recordUrl: string }
        | { error: string }
      if (!res.ok || "error" in data) {
        throw new Error(("error" in data && data.error) || `HTTP ${res.status}`)
      }
      setResult(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : "save failed")
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className="border hairline p-4 space-y-3" style={{ background: "var(--led-bg-2)" }}>
      <div className="flex items-center justify-between">
        <div className="label">SAVE TO AIRTABLE / PROJECT</div>
        {matchedProject ? (
          <span className="mono text-[10px] uppercase text-[var(--led-ink)]">MATCHED</span>
        ) : projects ? (
          <span className="mono text-[10px] uppercase text-[var(--led-ink-faint)]">
            NO MATCH
          </span>
        ) : null}
      </div>

      {/* Typeahead */}
      <div className="relative" ref={wrapRef}>
        <input
          value={query || cfg.project_code}
          onChange={(e) => {
            setQuery(e.target.value)
            setOpen(true)
            loadProjects()
            // Allow manual override: typing here updates the project_code too.
            onSelectProjectCode(e.target.value)
          }}
          onFocus={() => {
            setOpen(true)
            loadProjects()
          }}
          placeholder="TYPE PROJECT CODE OR NAME / 26-BSB-22-BSBGE"
          autoComplete="off"
        />
        {open ? (
          <div
            className="absolute left-0 right-0 top-full mt-1 z-20 border hairline max-h-[260px] overflow-y-auto scroll-fade"
            style={{ background: "var(--led-bg-1)" }}
          >
            {loadErr ? (
              <div className="mono text-[10px] uppercase p-3 text-[var(--led-ink-faint)]">
                COULD NOT LOAD / {loadErr}
              </div>
            ) : !projects ? (
              <div className="mono text-[10px] uppercase p-3 text-[var(--led-ink-faint)]">
                LOADING /
              </div>
            ) : filtered.length === 0 ? (
              <div className="mono text-[10px] uppercase p-3 text-[var(--led-ink-faint)]">
                NO MATCH - TYPED CODE WILL BE USED AS-IS
              </div>
            ) : (
              filtered.map((p) => (
                <button
                  key={p.id}
                  type="button"
                  className="w-full text-left p-2.5 border-b hairline last:border-b-0"
                  onMouseDown={(e) => {
                    e.preventDefault()
                    onSelectProjectCode(p.code)
                    setQuery("")
                    setOpen(false)
                  }}
                  style={{ cursor: "pointer" }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.background = "rgba(0,210,106,0.05)")
                  }
                  onMouseLeave={(e) => (e.currentTarget.style.background = "")}
                >
                  <div className="flex items-baseline justify-between gap-3">
                    <span className="mono text-[11px] font-bold">{p.code || "-"}</span>
                    {p.status ? (
                      <span className="mono text-[10px] uppercase text-[var(--led-ink-faint)]">
                        {p.status}
                      </span>
                    ) : null}
                  </div>
                  <div className="mono text-[12px] mt-0.5">{p.name}</div>
                  {p.clientName ? (
                    <div className="mono text-[10px] uppercase text-[var(--led-ink-faint)] mt-0.5">
                      {p.clientName}
                    </div>
                  ) : null}
                </button>
              ))
            )}
          </div>
        ) : null}
      </div>

      {/* Action */}
      <button
        type="button"
        className="cta cta-primary w-full"
        onClick={save}
        disabled={busy || !cfg.project_code}
      >
        {busy
          ? "SAVING /"
          : matchedProject
          ? `SAVE TO ${matchedProject.code}`
          : "SAVE WITHOUT MATCH"}
      </button>

      {result ? (
        <div
          className="mono text-[10px] uppercase border px-3 py-2 flex items-center justify-between gap-3"
          style={{
            borderColor: "var(--led-ink)",
            color: "var(--led-ink)",
            background: "transparent",
          }}
        >
          <span>SAVED / DOCUMENT CREATED</span>
          <a
            href={result.recordUrl}
            target="_blank"
            rel="noreferrer"
            className="underline"
          >
            OPEN IN AIRTABLE →
          </a>
        </div>
      ) : null}
      {error ? (
        <div
          className="mono text-[10px] uppercase border px-3 py-2"
          style={{
            borderColor: "rgba(255,95,95,0.4)",
            color: "#ff5f5f",
            background: "rgba(255,95,95,0.05)",
          }}
        >
          SAVE FAILED / {error}
        </div>
      ) : null}
    </div>
  )
}

function blobToBase64(blob: Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => {
      const s = String(reader.result || "")
      const i = s.indexOf(",")
      resolve(i >= 0 ? s.slice(i + 1) : s)
    }
    reader.onerror = () => reject(reader.error || new Error("read failed"))
    reader.readAsDataURL(blob)
  })
}

function fileSafe(s: string): string {
  return s.replace(/[^A-Za-z0-9._-]+/g, "_")
}
