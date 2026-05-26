"use client"
import type { WallConfig } from "../lib/types"
import { DateInput, Field, TextInput } from "./Field"
import { SectionPanel } from "./SectionPanel"

export function ProjectForm({
  cfg,
  onChange,
}: {
  cfg: WallConfig
  onChange: (next: Partial<WallConfig>) => void
}) {
  return (
    <SectionPanel code="01" title="PROJECT" right="YY-CCC-##-TAG" storageKey="project">
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
        <Field label="SHOW DATE" hint="YYYY-MM-DD">
          <DateInput
            value={cfg.show_date ?? ""}
            onChange={(v) => onChange({ show_date: v })}
          />
        </Field>
        <Field label="LEAD">
          <TextInput
            value={cfg.lead}
            onChange={(e) => onChange({ lead: e.target.value })}
            placeholder="D. Jongen"
          />
        </Field>
        <Field label="ISSUED DATE" hint="YYYY-MM-DD">
          <DateInput
            value={cfg.issued_date}
            onChange={(v) => onChange({ issued_date: v })}
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
    </SectionPanel>
  )
}
