"use client"
import { useMemo, useState } from "react"
import { CABINETS } from "../data/cabinets"
import type { Cabinet } from "../lib/types"

export function CabinetPicker({
  selectedId,
  onChange,
}: {
  selectedId: string
  onChange: (id: string) => void
}) {
  const [query, setQuery] = useState("")
  const [pitchFilter, setPitchFilter] = useState<"all" | "fine" | "mid" | "outdoor">("all")

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return CABINETS.filter((c) => {
      const hay = `${c.manufacturer} ${c.model} ${c.pixel_pitch_mm}mm`.toLowerCase()
      if (q && !hay.includes(q)) return false
      if (pitchFilter === "fine" && c.pixel_pitch_mm >= 3) return false
      if (pitchFilter === "mid" && (c.pixel_pitch_mm < 3 || c.pixel_pitch_mm >= 6)) return false
      if (pitchFilter === "outdoor" && c.pixel_pitch_mm < 6) return false
      return true
    })
  }, [query, pitchFilter])

  return (
    <div className="panel p-5">
      <div className="flex items-center justify-between mb-4">
        <h2 className="mono text-[12px] tracking-[0.08em] uppercase">02 / CABINET</h2>
        <span className="mono text-[10px] uppercase text-[var(--led-ink-faint)]">
          {CABINETS.length} IN LIBRARY
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-[1fr_auto] gap-3 mb-4">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="SEARCH MANUFACTURER / MODEL / PITCH"
        />
        <div className="flex gap-2">
          {(["all", "fine", "mid", "outdoor"] as const).map((k) => (
            <button
              key={k}
              type="button"
              className="cta"
              style={
                pitchFilter === k
                  ? { borderColor: "var(--led-accent)", color: "var(--led-accent)" }
                  : undefined
              }
              onClick={() => setPitchFilter(k)}
            >
              {k.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 max-h-[440px] overflow-y-auto scroll-fade pr-1">
        {filtered.map((c) => (
          <CabinetCard
            key={c.id}
            cab={c}
            selected={c.id === selectedId}
            onSelect={() => onChange(c.id)}
          />
        ))}
        {filtered.length === 0 ? (
          <div className="mono text-[12px] uppercase text-[var(--led-ink-faint)] p-4">
            NO MATCH / TRY ANOTHER FILTER
          </div>
        ) : null}
      </div>
    </div>
  )
}

function CabinetCard({
  cab,
  selected,
  onSelect,
}: {
  cab: Cabinet
  selected: boolean
  onSelect: () => void
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className="text-left p-3 border transition-colors"
      style={{
        borderColor: selected ? "var(--led-accent)" : "var(--led-line)",
        background: selected ? "rgba(0,210,106,0.04)" : "var(--led-bg-2)",
      }}
    >
      <div className="flex items-baseline justify-between">
        <span className="label">{cab.manufacturer}</span>
        <span
          className="mono text-[11px]"
          style={{ color: selected ? "var(--led-accent)" : "var(--led-ink)" }}
        >
          {cab.pixel_pitch_mm.toFixed(2)}mm
        </span>
      </div>
      <div className="mono text-[14px] font-bold mt-0.5">{cab.model}</div>
      <div className="mono text-[10px] uppercase text-[var(--led-ink-faint)] mt-2">
        {cab.tile_width_mm}×{cab.tile_height_mm}mm / {cab.tile_width_px}×{cab.tile_height_px}px
        / {cab.tile_weight_kg}kg
      </div>
      <div className="mono text-[10px] uppercase text-[var(--led-ink-faint)] mt-0.5">
        {cab.brightness_nits} NITS / {cab.ip_rating_front} / {cab.touring_rated ? "TOURING" : "FIXED"}
      </div>
    </button>
  )
}
