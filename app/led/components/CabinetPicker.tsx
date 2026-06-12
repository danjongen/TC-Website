"use client"
import { useMemo, useState } from "react"
import type { Cabinet } from "../lib/types"
import { SectionPanel } from "./SectionPanel"

export function CabinetPicker({
  cabinets,
  selectedId,
  onChange,
}: {
  cabinets: Cabinet[]
  selectedId: string
  onChange: (id: string) => void
}) {
  const [query, setQuery] = useState("")
  const [pitchFilter, setPitchFilter] = useState<"all" | "fine" | "mid" | "outdoor">("all")

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return cabinets.filter((c) => {
      const hay = `${c.manufacturer} ${c.model} ${c.pixel_pitch_mm}mm`.toLowerCase()
      if (q && !hay.includes(q)) return false
      if (pitchFilter === "fine" && c.pixel_pitch_mm >= 3) return false
      if (pitchFilter === "mid" && (c.pixel_pitch_mm < 3 || c.pixel_pitch_mm >= 6)) return false
      if (pitchFilter === "outdoor" && c.pixel_pitch_mm < 6) return false
      return true
    })
  }, [cabinets, query, pitchFilter])

  return (
    <SectionPanel code="02" title="CABINET" right={`${cabinets.length} IN LIBRARY`} storageKey="cabinet">
      <div className="grid grid-cols-1 sm:grid-cols-[1fr_auto] gap-3 mb-4">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="SEARCH MANUFACTURER / MODEL / PITCH"
        />
        <div>
          <div className="label mb-1.5">FILTER</div>
          <div className="flex flex-wrap gap-2">
            {(["all", "fine", "mid", "outdoor"] as const).map((k) => (
              <button
                key={k}
                type="button"
                aria-pressed={pitchFilter === k}
                className="mono text-[11px] tracking-[0.08em] uppercase px-3 py-1.5 border transition-colors"
                style={{
                  borderRadius: 2,
                  borderColor: pitchFilter === k ? "var(--led-ink)" : "var(--led-line)",
                  color: pitchFilter === k ? "var(--led-ink)" : "var(--led-ink-dim)",
                  background: "transparent",
                  cursor: "pointer",
                }}
                onClick={() => setPitchFilter(k)}
              >
                {k.toUpperCase()}
              </button>
            ))}
          </div>
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
    </SectionPanel>
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
