"use client"
import type { WallConfig } from "../lib/types"
import { Field, Select, TextArea, TextInput } from "./Field"

export function WallConfigForm({
  cfg,
  onChange,
}: {
  cfg: WallConfig
  onChange: (next: Partial<WallConfig>) => void
}) {
  return (
    <div className="panel p-5">
      <div className="flex items-center justify-between mb-4">
        <h2 className="mono text-[12px] tracking-[0.08em] uppercase">03 / WALL</h2>
        <span className="mono text-[10px] uppercase text-[var(--led-ink-faint)]">
          RECTANGLE / V1
        </span>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Field label="TILES WIDE">
          <TextInput
            type="number"
            min={1}
            max={500}
            value={cfg.tiles_wide}
            onChange={(e) => onChange({ tiles_wide: clampInt(e.target.value, 1, 500) })}
          />
        </Field>
        <Field label="TILES HIGH">
          <TextInput
            type="number"
            min={1}
            max={500}
            value={cfg.tiles_high}
            onChange={(e) => onChange({ tiles_high: clampInt(e.target.value, 1, 500) })}
          />
        </Field>
        <Field label="POWER SERVICE">
          <Select
            value={cfg.power_service}
            onChange={(e) => onChange({ power_service: e.target.value as WallConfig["power_service"] })}
          >
            <option value="208V-3PH">208V / 3PH</option>
            <option value="400V-3PH">400V / 3PH</option>
            <option value="480V-3PH">480V / 3PH</option>
          </Select>
        </Field>
        <Field label="SIGNAL ENTRY">
          <Select
            value={cfg.signal_entry}
            onChange={(e) => onChange({ signal_entry: e.target.value as WallConfig["signal_entry"] })}
          >
            <option value="TL">TOP LEFT</option>
            <option value="TR">TOP RIGHT</option>
            <option value="BL">BOTTOM LEFT</option>
            <option value="BR">BOTTOM RIGHT</option>
          </Select>
        </Field>
        <Field label="AUDIENCE">
          <Select
            value={cfg.audience_position}
            onChange={(e) => onChange({ audience_position: e.target.value as WallConfig["audience_position"] })}
          >
            <option value="bottom">BOTTOM</option>
            <option value="top">TOP</option>
            <option value="left">LEFT</option>
            <option value="right">RIGHT</option>
          </Select>
        </Field>
        <Field label="PROCESSOR OVERRIDE" hint="OPTIONAL">
          <TextInput
            value={cfg.processor_override ?? ""}
            onChange={(e) => onChange({ processor_override: e.target.value })}
            placeholder="Brompton SX40"
          />
        </Field>
        <Field label="NOTES" hint="OPTIONAL">
          <TextArea
            rows={2}
            value={cfg.notes ?? ""}
            onChange={(e) => onChange({ notes: e.target.value })}
            placeholder="Crew notes, rigging method, etc."
          />
        </Field>
      </div>
    </div>
  )
}

function clampInt(v: string, lo: number, hi: number): number {
  const n = parseInt(v, 10)
  if (Number.isNaN(n)) return lo
  return Math.max(lo, Math.min(hi, n))
}
