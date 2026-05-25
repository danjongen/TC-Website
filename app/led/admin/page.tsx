"use client"
import { useEffect, useState } from "react"
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

export default function AdminPage() {
  const [rows, setRows] = useState<Row[] | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    ;(async () => {
      try {
        const res = await fetch("/led/api/admin/cabinets", { cache: "no-store" })
        const data = (await res.json()) as { rows?: Row[]; error?: string }
        if (!res.ok || data.error) throw new Error(data.error || `HTTP ${res.status}`)
        setRows(data.rows || [])
      } catch (err) {
        setError(err instanceof Error ? err.message : "load failed")
      }
    })()
  }, [])

  const total = rows?.length ?? 0
  const published = rows?.filter((r) => r.published).length ?? 0
  const failing = rows?.filter((r) => !r.validation.ok).length ?? 0
  const baseUrl = "https://airtable.com/appDjrhujOaKBBULu/tblUCaJotJ8i6NvFJ"

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
          <span className="mono text-[10px] uppercase text-[var(--led-ink-faint)]">
            LED CABINET DB / REVIEW QUEUE
          </span>
        </div>
      </header>

      <main className="flex-1 px-4 md:px-6 py-6">
        <div className="max-w-[1200px] mx-auto space-y-5">
          <div className="border-b hairline pb-4">
            <div className="label mb-1">26-TCX-01-LEDTOOL / ADMIN</div>
            <h1 className="mono text-[20px] md:text-[24px] font-bold tracking-tight uppercase">
              CABINET LIBRARY / VALIDATION
            </h1>
            <div className="mono text-[10px] uppercase text-[var(--led-ink-faint)] mt-2">
              {total} ENTRIES / {published} PUBLISHED / {failing} FAILING PHYSICS
            </div>
          </div>

          {error ? (
            <div
              className="mono text-[11px] uppercase px-4 py-3 border"
              style={{ borderColor: "var(--led-error)", color: "var(--led-error)" }}
            >
              COULD NOT LOAD / {error}
              <div className="text-[var(--led-ink-faint)] mt-2 normal-case tracking-normal">
                The deployed app needs a PAT with read access to the LED Cabinet DB base
                (AIRTABLE_CABINETS_PAT, or AIRTABLE_PAT scoped to include it).
              </div>
            </div>
          ) : !rows ? (
            <div className="mono text-[12px] uppercase text-[var(--led-ink-dim)]">LOADING /</div>
          ) : (
            <div className="space-y-2">
              {rows.map((r) => (
                <RowCard key={r.recordId} row={r} baseUrl={baseUrl} />
              ))}
            </div>
          )}

          <p className="mono text-[10px] leading-relaxed text-[var(--led-ink-faint)] pt-2">
            PHYSICS VALIDATION IS GATE 3 OF 3. SOURCE EXTRACTION + CROSS-CHECK PRECEDE IT.
            PUBLISH / VERIFY IS DONE IN AIRTABLE AFTER HUMAN SIGN-OFF.
          </p>
        </div>
      </main>
    </div>
  )
}

function RowCard({ row, baseUrl }: { row: Row; baseUrl: string }) {
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
          <div className="flex items-center gap-3">
            <span className="mono text-[13px] font-bold">
              {row.manufacturer} {row.model}
            </span>
            <span className="mono text-[10px] uppercase text-[var(--led-ink-faint)]">{row.id}</span>
          </div>
          <div className="flex items-center gap-3 mt-1.5">
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
        <a
          className="cta"
          href={`${baseUrl}/${row.recordId}`}
          target="_blank"
          rel="noreferrer"
        >
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
