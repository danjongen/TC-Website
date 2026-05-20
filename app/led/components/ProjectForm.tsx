"use client"
import type { WallConfig } from "../lib/types"
import { Field, TextInput } from "./Field"

export function ProjectForm({
  cfg,
  onChange,
}: {
  cfg: WallConfig
  onChange: (next: Partial<WallConfig>) => void
}) {
  return (
    <div className="panel p-5">
      <div className="flex items-center justify-between mb-4">
        <h2 className="mono text-[12px] tracking-[0.08em] uppercase">01 / PROJECT</h2>
        <span className="mono text-[10px] uppercase text-[var(--led-ink-faint)]">
          YY-CCC-##-TAG
        </span>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Field label="PROJECT CODE" hint="26-BSB-01-LEDWALL">
          <TextInput
            value={cfg.project_code}
            onChange={(e) => onChange({ project_code: e.target.value.toUpperCase() })}
            placeholder="26-BSB-01-LEDWALL"
          />
        </Field>
        <Field label="PROJECT NAME">
          <TextInput
            value={cfg.project_name}
            onChange={(e) => onChange({ project_name: e.target.value })}
            placeholder="BSB Germany 2026 / Main Stage"
          />
        </Field>
        <Field label="CLIENT">
          <TextInput
            value={cfg.client}
            onChange={(e) => onChange({ client: e.target.value })}
            placeholder="Client name"
          />
        </Field>
        <Field label="TOUR">
          <TextInput
            value={cfg.tour ?? ""}
            onChange={(e) => onChange({ tour: e.target.value })}
            placeholder="Optional"
          />
        </Field>
        <Field label="SHOW DATE">
          <TextInput
            type="date"
            value={cfg.show_date ?? ""}
            onChange={(e) => onChange({ show_date: e.target.value })}
          />
        </Field>
        <Field label="LEAD">
          <TextInput
            value={cfg.lead}
            onChange={(e) => onChange({ lead: e.target.value })}
            placeholder="D. Jongen"
          />
        </Field>
        <Field label="ISSUED DATE">
          <TextInput
            type="date"
            value={cfg.issued_date}
            onChange={(e) => onChange({ issued_date: e.target.value })}
          />
        </Field>
        <Field label="REV">
          <TextInput
            value={cfg.rev}
            onChange={(e) => onChange({ rev: e.target.value.toUpperCase() })}
            placeholder="A"
            maxLength={3}
          />
        </Field>
      </div>
    </div>
  )
}
