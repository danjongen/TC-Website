"use client"
import { useEffect, useRef, useState } from "react"
import { Glyph } from "../components/Glyph"
import type { ValidationResult } from "../lib/validateCabinet"

type Row = {
  recordId: string
  id: string
  manufacturer: string
  model: string
  confidence: "verified" | "datasheet" | "estimated" | null
  published: boolean
  source_url: string | null
  validation: ValidationResult
}

type Comparison = {
  field: string
  gemini: string | number | null
  claude: string | number | null
  agree: boolean
}

type Draft = {
  id: string
  merged: Record<string, string | number | null>
  comparisons: Comparison[]
  agreementCount: number
  disagreementCount: number
  validation: ValidationResult
  confidence: "datasheet" | "estimated"
  bothRan: boolean
  errors: string[]
}

const BASE_URL = "https://airtable.com/appDjrhujOaKBBULu/tblUCaJotJ8i6NvFJ"

export default function AdminPage() {
  const [rows, setRows] = useState<Row[] | null>(null)
  const [error, setError] = useState<string | null>(null)

  async function loadRows() {
    try {
      const res = await fetch("/led/api/admin/cabinets", { cache: "no-store" })
      const data = (await res.json()) as { rows?: Row[]; error?: string }
      if (!res.ok || data.error) throw new Error(data.error || `HTTP ${res.status}`)
      setRows(data.rows || [])
      setError(null)
    } catch (err) {
      setError(err instanceof Error ? err.message : "load failed")
    }
  }

  useEffect(() => {
    void loadRows()
  }, [])

  const total = rows?.length ?? 0
  const published = rows?.filter((r) => r.published).length ?? 0
  const failing = rows?.filter((r) => !r.validation.ok).length ?? 0

  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b hairline">
        <div className="flex items-center justify-between gap-3 px-4 sm:px-6 py-4">
          <div className="flex items-center gap-2.5 min-w-0">
            <Glyph size={18} />
            <span className="mono text-[10px] sm:text-[11px] tracking-[0.08em] uppercase truncate">
              TECHNICALLY CREATIVE / DETROIT
            </span>
          </div>
          <span className="mono text-[10px] uppercase text-[var(--led-ink-faint)] shrink-0">
            LED CABINET DB / ADMIN
          </span>
        </div>
      </header>

      <main className="flex-1 px-4 sm:px-6 py-6">
        <div className="max-w-[1200px] mx-auto space-y-6">
          <div className="border-b hairline pb-4">
            <div className="label mb-1">26-TCX-01-LEDTOOL / ADMIN</div>
            <h1 className="mono text-[20px] md:text-[24px] font-bold tracking-tight uppercase">
              CABINET LIBRARY / INGEST + VALIDATION
            </h1>
            <div className="mono text-[10px] uppercase text-[var(--led-ink-faint)] mt-2">
              {total} ENTRIES / {published} PUBLISHED / {failing} FAILING PHYSICS
            </div>
          </div>

          <IngestPanel onSaved={loadRows} />

          <div>
            <div className="label mb-3">REVIEW QUEUE</div>
            {error ? (
              <div
                className="mono text-[11px] uppercase px-4 py-3 border"
                style={{ borderColor: "var(--led-error)", color: "var(--led-error)" }}
              >
                COULD NOT LOAD / {error}
                <div className="text-[var(--led-ink-faint)] mt-2 normal-case tracking-normal">
                  The deployed app needs a PAT with read access to LED Cabinet DB
                  (AIRTABLE_CABINETS_PAT, or AIRTABLE_PAT scoped to include it).
                </div>
              </div>
            ) : !rows ? (
              <div className="mono text-[12px] uppercase text-[var(--led-ink-dim)]">LOADING /</div>
            ) : (
              <div className="space-y-2">
                {rows.map((r) => (
                  <RowCard key={r.recordId} row={r} />
                ))}
              </div>
            )}
          </div>

          <p className="mono text-[10px] leading-relaxed text-[var(--led-ink-faint)] pt-2">
            TRIPLE VALIDATION / 1 GEMINI EXTRACT · 2 CLAUDE CROSS-CHECK · 3 PHYSICS.
            DRAFTS SAVE UNPUBLISHED. HUMAN FLIPS VERIFIED + PUBLISHED IN AIRTABLE.
          </p>
        </div>
      </main>
    </div>
  )
}

function IngestPanel({ onSaved }: { onSaved: () => void }) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [hover, setHover] = useState(false)
  const [busy, setBusy] = useState(false)
  const [draft, setDraft] = useState<Draft | null>(null)
  const [err, setErr] = useState<string | null>(null)
  const [sourceUrl, setSourceUrl] = useState("")
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState<string | null>(null)

  async function handleFile(file: File) {
    const okType = file.type === "application/pdf" || file.type.startsWith("image/")
    if (!okType) {
      setErr("FILE MUST BE A PDF OR IMAGE")
      return
    }
    setBusy(true)
    setErr(null)
    setDraft(null)
    setSaved(null)
    try {
      const base64 = await fileToBase64(file)
      const res = await fetch("/led/api/admin/ingest", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fileBase64: base64, mimeType: file.type }),
      })
      const data = (await res.json()) as Draft & { error?: string }
      if (!res.ok || (data as { error?: string }).error) {
        throw new Error((data as { error?: string }).error || `HTTP ${res.status}`)
      }
      setDraft(data)
    } catch (e) {
      setErr(e instanceof Error ? e.message : "ingest failed")
    } finally {
      setBusy(false)
    }
  }

  async function saveDraft() {
    if (!draft) return
    setSaving(true)
    setErr(null)
    try {
      const date = new Date().toISOString().slice(0, 10)
      const notes = `Ingested ${date} via vision pipeline (Gemini + Claude). ${draft.agreementCount} agree / ${draft.disagreementCount} disagree. NEEDS HUMAN VERIFICATION against datasheet.`
      const res = await fetch("/led/api/admin/cabinets", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fields: { ...draft.merged, id: draft.id },
          confidence: draft.confidence,
          source_url: sourceUrl || null,
          notes,
        }),
      })
      const data = (await res.json()) as { recordUrl?: string; error?: string }
      if (!res.ok || data.error) throw new Error(data.error || `HTTP ${res.status}`)
      setSaved(data.recordUrl || "")
      setDraft(null)
      setSourceUrl("")
      onSaved()
    } catch (e) {
      setErr(e instanceof Error ? e.message : "save failed")
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="panel p-5">
      <div className="flex items-center justify-between mb-4">
        <h2 className="mono text-[12px] tracking-[0.08em] uppercase">INGEST / DATASHEET</h2>
        <span className="mono text-[10px] uppercase text-[var(--led-ink-faint)]">
          GEMINI + CLAUDE CROSS-CHECK
        </span>
      </div>

      <div
        onDragOver={(e) => {
          e.preventDefault()
          setHover(true)
        }}
        onDragLeave={() => setHover(false)}
        onDrop={(e) => {
          e.preventDefault()
          setHover(false)
          const f = e.dataTransfer.files?.[0]
          if (f) void handleFile(f)
        }}
        onClick={() => inputRef.current?.click()}
        role="button"
        tabIndex={0}
        className="cursor-pointer text-center px-4 py-8 border transition-colors"
        style={{
          borderColor: err ? "var(--led-error)" : hover ? "var(--led-ink)" : "var(--led-line)",
          background: "var(--led-bg-2)",
          borderRadius: 2,
        }}
      >
        <div
          className="mono text-[12px] tracking-[0.08em] uppercase"
          style={{ color: hover ? "var(--led-ink)" : "var(--led-ink-dim)" }}
        >
          {busy ? "EXTRACTING / GEMINI + CLAUDE" : "DROP DATASHEET PDF OR IMAGE / OR BROWSE"}
        </div>
        <div className="mono text-[10px] uppercase text-[var(--led-ink-faint)] mt-2">
          EXTRACTS SPECS / CROSS-CHECKS / VALIDATES PHYSICS / DRAFTS UNPUBLISHED
        </div>
      </div>
      <input
        ref={inputRef}
        type="file"
        accept="application/pdf,image/*"
        style={{ display: "none" }}
        onChange={(e) => {
          const f = e.target.files?.[0]
          if (f) void handleFile(f)
          e.target.value = ""
        }}
      />

      {err ? (
        <div
          className="mono text-[10px] uppercase mt-3 px-3 py-2 border"
          style={{ borderColor: "var(--led-error)", color: "var(--led-error)" }}
        >
          {err}
        </div>
      ) : null}

      {saved !== null ? (
        <div
          className="mono text-[10px] uppercase mt-3 px-3 py-2 border flex items-center justify-between gap-3"
          style={{ borderColor: "var(--led-ink)", color: "var(--led-ink)" }}
        >
          <span>DRAFT SAVED / UNPUBLISHED — VERIFY IN AIRTABLE</span>
          {saved ? (
            <a href={saved} target="_blank" rel="noreferrer" className="underline">
              OPEN →
            </a>
          ) : null}
        </div>
      ) : null}

      {draft ? (
        <DraftReview
          draft={draft}
          sourceUrl={sourceUrl}
          onSourceUrl={setSourceUrl}
          saving={saving}
          onSave={saveDraft}
        />
      ) : null}
    </div>
  )
}

function DraftReview({
  draft,
  sourceUrl,
  onSourceUrl,
  saving,
  onSave,
}: {
  draft: Draft
  sourceUrl: string
  onSourceUrl: (v: string) => void
  saving: boolean
  onSave: () => void
}) {
  return (
    <div className="mt-4 border-t hairline pt-4 space-y-3">
      <div className="flex flex-wrap items-center gap-3">
        <span className="mono text-[13px] font-bold">{draft.id || "—"}</span>
        <span
          className="mono text-[10px] uppercase"
          style={{
            color: draft.confidence === "datasheet" ? "var(--led-ink)" : "var(--led-ink-dim)",
          }}
        >
          CONFIDENCE / {draft.confidence}
        </span>
        <span className="mono text-[10px] uppercase text-[var(--led-ink-dim)]">
          {draft.agreementCount} AGREE / {draft.disagreementCount} DISAGREE
        </span>
        <span
          className="mono text-[10px] uppercase"
          style={{ color: draft.validation.ok ? "var(--led-accent)" : "var(--led-error)" }}
        >
          PHYSICS / {draft.validation.ok ? (draft.validation.warnings.length ? "REVIEW" : "PASS") : "FAIL"}
        </span>
      </div>

      {draft.errors.length > 0 ? (
        <div className="mono text-[10px] uppercase text-[var(--led-error)]">
          {draft.errors.map((e, i) => (
            <div key={i}>EXTRACTOR / {e}</div>
          ))}
        </div>
      ) : null}

      {/* Field comparison table */}
      <div className="border hairline overflow-x-auto scroll-fade">
        <table className="w-full mono text-[10px]" style={{ borderCollapse: "collapse" }}>
          <thead>
            <tr className="text-[var(--led-ink-dim)] uppercase">
              <th className="text-left px-2 py-1.5 border-b hairline">FIELD</th>
              <th className="text-left px-2 py-1.5 border-b hairline">GEMINI</th>
              <th className="text-left px-2 py-1.5 border-b hairline">CLAUDE</th>
              <th className="text-left px-2 py-1.5 border-b hairline"> </th>
            </tr>
          </thead>
          <tbody>
            {draft.comparisons.map((c) => (
              <tr key={c.field}>
                <td className="px-2 py-1 text-[var(--led-ink-dim)]">{c.field}</td>
                <td className="px-2 py-1">{fmtVal(c.gemini)}</td>
                <td className="px-2 py-1">{fmtVal(c.claude)}</td>
                <td className="px-2 py-1" style={{ color: c.agree ? "var(--led-accent)" : "var(--led-error)" }}>
                  {c.gemini === null && c.claude === null ? "—" : c.agree ? "OK" : "≠"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {draft.validation.errors.length > 0 || draft.validation.warnings.length > 0 ? (
        <div className="space-y-0.5">
          {draft.validation.errors.map((i, idx) => (
            <div key={`e${idx}`} className="mono text-[10px]" style={{ color: "var(--led-error)" }}>
              ERROR / {i.field} / {i.message}
            </div>
          ))}
          {draft.validation.warnings.map((i, idx) => (
            <div key={`w${idx}`} className="mono text-[10px] text-[var(--led-ink-dim)]">
              WARN / {i.field} / {i.message}
            </div>
          ))}
        </div>
      ) : null}

      <div>
        <div className="label mb-1.5">SOURCE URL / DATASHEET</div>
        <input
          value={sourceUrl}
          onChange={(e) => onSourceUrl(e.target.value)}
          placeholder="https://manufacturer.com/datasheet.pdf"
        />
      </div>

      <button type="button" className="cta cta-primary w-full" onClick={onSave} disabled={saving || !draft.id}>
        {saving ? "SAVING /" : `SAVE DRAFT TO LED CABINET DB (${draft.confidence.toUpperCase()}, UNPUBLISHED)`}
      </button>
    </div>
  )
}

function RowCard({ row }: { row: Row }) {
  const v = row.validation
  const statusColor = !v.ok
    ? "var(--led-error)"
    : v.warnings.length > 0
    ? "var(--led-ink-dim)"
    : "var(--led-accent)"
  const statusText = !v.ok ? "FAIL" : v.warnings.length > 0 ? "REVIEW" : "PASS"

  return (
    <div className="panel p-4">
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-3 flex-wrap">
            <span className="mono text-[13px] font-bold">
              {row.manufacturer} {row.model}
            </span>
            <span className="mono text-[10px] uppercase text-[var(--led-ink-faint)]">{row.id}</span>
          </div>
          <div className="flex items-center gap-3 mt-1.5 flex-wrap">
            <span className="mono text-[10px] uppercase" style={{ color: statusColor }}>
              PHYSICS / {statusText}
            </span>
            <span className="mono text-[10px] uppercase text-[var(--led-ink-faint)]">
              {row.confidence ? row.confidence.toUpperCase() : "—"}
            </span>
            <span
              className="mono text-[10px] uppercase"
              style={{ color: row.published ? "var(--led-ink)" : "var(--led-ink-faint)" }}
            >
              {row.published ? "PUBLISHED" : "UNPUBLISHED"}
            </span>
          </div>
        </div>
        <a className="cta" href={`${BASE_URL}/${row.recordId}`} target="_blank" rel="noreferrer">
          EDIT
        </a>
      </div>

      {v.errors.length > 0 || v.warnings.length > 0 ? (
        <div className="mt-3 border-t hairline pt-3 space-y-1">
          {v.errors.map((i, idx) => (
            <div key={`e${idx}`} className="mono text-[10px]" style={{ color: "var(--led-error)" }}>
              ERROR / {i.field} / {i.message}
            </div>
          ))}
          {v.warnings.map((i, idx) => (
            <div key={`w${idx}`} className="mono text-[10px] text-[var(--led-ink-dim)]">
              WARN / {i.field} / {i.message}
            </div>
          ))}
        </div>
      ) : null}
    </div>
  )
}

function fmtVal(v: string | number | null): string {
  if (v === null || v === undefined) return "—"
  return String(v)
}

function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => {
      const s = String(reader.result || "")
      const i = s.indexOf(",")
      resolve(i >= 0 ? s.slice(i + 1) : s)
    }
    reader.onerror = () => reject(reader.error || new Error("read failed"))
    reader.readAsDataURL(file)
  })
}
