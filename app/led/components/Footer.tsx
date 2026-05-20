import { Glyph } from "./Glyph"

export function Footer({
  cabinetLabel,
  processorLabel,
}: {
  cabinetLabel: string
  processorLabel: string
}) {
  const year = new Date().getFullYear()
  return (
    <footer className="border-t hairline px-6 py-3">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-2 items-center">
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
