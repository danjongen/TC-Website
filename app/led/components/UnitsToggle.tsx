"use client"
import type { Units } from "../lib/types"

/**
 * METRIC / IMPERIAL segmented toggle. Display-only - switches how measured
 * values are shown across the spec, exports, and share link.
 */
export function UnitsToggle({
  units,
  onChange,
}: {
  units: Units
  onChange: (u: Units) => void
}) {
  return (
    <div className="flex items-center gap-2">
      <span className="label">UNITS</span>
      <div className="inline-flex border hairline" role="group" style={{ borderRadius: 2 }}>
        {(
          [
            ["metric", "METRIC"],
            ["imperial", "IMPERIAL"],
          ] as const
        ).map(([key, lbl], i) => {
          const active = units === key
          return (
            <button
              key={key}
              type="button"
              aria-pressed={active}
              onClick={() => onChange(key)}
              className="mono text-[10px] tracking-[0.06em] uppercase px-3 py-1.5 transition-colors"
              style={{
                borderLeft: i === 0 ? undefined : "1px solid var(--led-line)",
                color: active ? "var(--led-ink)" : "var(--led-ink-dim)",
                background: active ? "var(--led-bg-2)" : "transparent",
                cursor: "pointer",
              }}
            >
              {lbl}
            </button>
          )
        })}
      </div>
    </div>
  )
}
