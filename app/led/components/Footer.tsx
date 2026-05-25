import { Glyph } from "./Glyph"
import { DISCLAIMER } from "../lib/brand"

export function Footer({
  cabinetLabel,
  processorLabel,
}: {
  cabinetLabel: string
  processorLabel: string
}) {
  const year = new Date().getFullYear()
  return (
    <footer className="border-t hairline">
      <div
        className="px-6 py-2 border-b hairline"
        style={{ background: "var(--led-bg-2)" }}
      >
        <span className="mono text-[10px] tracking-[0.06em] uppercase accent">
          {DISCLAIMER}
        </span>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-2 items-center px-6 py-3">
        <div className="flex items-center gap-2">
          <Glyph size={12} />
          <span className="mono text-[10px] tracking-[0.08em] uppercase text-[var(--led-ink-faint)]">
            © {year} TECHNICALLY CREATIVE / DETROIT
          </span>
        </div>
        <div className="mono text-[10px] tracking-[0.08em] uppercase text-[var(--led-ink-faint)] md:text-center">
          SYSTEM / {cabinetLabel || "—"} / {processorLabel || "—"}
        </div>
        <div className="mono text-[10px] tracking-[0.08em] uppercase text-[var(--led-ink-faint)] md:text-right">
          CALC / 26-TCX-01-LEDTOOL / REV A
        </div>
      </div>
    </footer>
  )
}
