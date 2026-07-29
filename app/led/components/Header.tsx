import { Glyph } from "./Glyph"

export function Header({
  projectCode,
  rev,
  issuedDate,
}: {
  projectCode: string
  rev: string
  issuedDate: string
}) {
  return (
    <header className="border-b hairline">
      <div className="flex items-center justify-between gap-3 px-4 sm:px-6 py-4">
        <div className="flex items-center gap-2.5 min-w-0">
          <Glyph size={18} />
          <span className="mono text-[10px] sm:text-[11px] tracking-[0.08em] uppercase truncate">
            TECHNICALLY CREATIVE / DETROIT
          </span>
        </div>
        <div className="flex items-center gap-3 sm:gap-6 shrink-0">
          <div className="hidden sm:flex items-center gap-2">
            <span className="label">DOC</span>
            <span className="mono text-[12px]">{projectCode || "-"}</span>
          </div>
          <div className="hidden sm:flex items-center gap-2">
            <span className="label">REV</span>
            <span className="mono text-[12px]">{rev || "-"}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="label">ISSUED</span>
            <span className="mono text-[12px]">{issuedDate || "-"}</span>
          </div>
        </div>
      </div>
    </header>
  )
}
