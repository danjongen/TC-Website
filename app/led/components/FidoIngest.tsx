"use client"
import { useRef, useState } from "react"
import { CABINETS } from "../data/cabinets"
import { fuzzyMatchCabinet, parseFidoPdf } from "../lib/fidoParse"
import type { PowerService } from "../lib/types"

type IngestResult = {
  cabinet_id: string | null
  cabinetName: string
  tiles_wide: number
  tiles_high: number
  power_service: PowerService
}

export function FidoIngest({
  onIngest,
}: {
  onIngest: (r: IngestResult) => void
}) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [hover, setHover] = useState(false)
  const [busy, setBusy] = useState(false)
  const [status, setStatus] = useState<
    | { kind: "idle" }
    | { kind: "ok"; msg: string }
    | { kind: "warn"; msg: string }
    | { kind: "err"; msg: string }
  >({ kind: "idle" })

  async function handleFile(file: File) {
    if (!file.name.toLowerCase().endsWith(".pdf")) {
      setStatus({ kind: "err", msg: "FILE MUST BE A PDF" })
      return
    }
    setBusy(true)
    setStatus({ kind: "idle" })
    const r = await parseFidoPdf(file)
    setBusy(false)
    if (!r.ok) {
      setStatus({ kind: "err", msg: r.error.toUpperCase() })
      return
    }
    const matchId = fuzzyMatchCabinet(r.cabinetName, CABINETS)
    onIngest({
      cabinet_id: matchId,
      cabinetName: r.cabinetName,
      tiles_wide: r.tilesWide,
      tiles_high: r.tilesHigh,
      power_service: r.powerService,
    })
    if (matchId) {
      setStatus({
        kind: "ok",
        msg: `INGESTED / ${r.cabinetName.toUpperCase()} / ${r.tilesWide}×${r.tilesHigh}`,
      })
    } else {
      setStatus({
        kind: "warn",
        msg: `CABINET "${r.cabinetName.toUpperCase()}" NOT IN LIBRARY — PICK CLOSEST BELOW`,
      })
    }
  }

  function onDrop(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault()
    setHover(false)
    const f = e.dataTransfer.files?.[0]
    if (f) void handleFile(f)
  }

  return (
    <div className="panel p-5">
      <div className="flex items-center justify-between mb-4">
        <h2 className="mono text-[12px] tracking-[0.08em] uppercase">00 / INGEST</h2>
        <span className="mono text-[10px] uppercase text-[var(--led-ink-faint)]">
          FIDOLED iOS PDF / OPTIONAL
        </span>
      </div>

      <div
        onDragOver={(e) => {
          e.preventDefault()
          setHover(true)
        }}
        onDragLeave={() => setHover(false)}
        onDrop={onDrop}
        onClick={() => inputRef.current?.click()}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") inputRef.current?.click()
        }}
        className="cursor-pointer text-center px-4 py-8 border transition-colors"
        style={{
          borderColor: hover ? "var(--led-accent)" : "var(--led-line)",
          borderStyle: "dashed",
          background: hover ? "rgba(0,210,106,0.04)" : "var(--led-bg-2)",
        }}
      >
        <div
          className="mono text-[12px] tracking-[0.08em] uppercase"
          style={{ color: hover ? "var(--led-accent)" : "var(--led-ink)" }}
        >
          {busy ? "PARSING /" : "DROP FIDOLED PDF / OR BROWSE"}
        </div>
        <div className="mono text-[10px] uppercase text-[var(--led-ink-faint)] mt-2">
          AUTO-FILLS CABINET / TILE COUNTS / POWER SERVICE
        </div>
      </div>

      <input
        ref={inputRef}
        type="file"
        accept="application/pdf,.pdf"
        className="hidden"
        style={{ display: "none" }}
        onChange={(e) => {
          const f = e.target.files?.[0]
          if (f) void handleFile(f)
          e.target.value = ""
        }}
      />

      {status.kind !== "idle" ? (
        <div
          className="mono text-[10px] tracking-[0.08em] uppercase mt-3 px-3 py-2 border"
          style={{
            borderColor:
              status.kind === "ok"
                ? "var(--led-accent)"
                : status.kind === "warn"
                ? "var(--led-ink-dim)"
                : "var(--led-ink-faint)",
            color:
              status.kind === "ok"
                ? "var(--led-accent)"
                : status.kind === "warn"
                ? "var(--led-ink)"
                : "var(--led-ink-dim)",
          }}
        >
          {status.msg}
        </div>
      ) : null}
    </div>
  )
}
