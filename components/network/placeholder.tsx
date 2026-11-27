/**
 * Draft-only marker for content that still needs real input (photos, facts,
 * client approval). Renders as a dashed box with a mono label so it is
 * impossible to miss in review. Remove every instance before this section
 * ships: `grep -rn "<Placeholder" app/network components/network`.
 */
export function Placeholder({
  label,
  note,
  aspect,
  className = "",
}: {
  label: string
  note?: string
  /** Set for photo slots, e.g. "aspect-[16/9]". Omit for inline text slots. */
  aspect?: string
  className?: string
}) {
  return (
    <div
      role="note"
      aria-label={`Placeholder: ${label}`}
      className={`flex flex-col justify-center gap-2 border border-dashed border-zinc-600 bg-zinc-950 p-6 ${aspect ?? ""} ${className}`}
    >
      <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-zinc-300">[ PLACEHOLDER / {label} ]</p>
      {note && <p className="max-w-xl text-sm leading-relaxed text-zinc-500">{note}</p>}
    </div>
  )
}

/** Inline text placeholder for a single fact inside a sentence or spec cell. */
export function Fill({ children }: { children: string }) {
  return (
    <span className="border-b border-dashed border-zinc-500 font-mono text-[0.85em] uppercase tracking-[0.08em] text-zinc-300">
      [{children}]
    </span>
  )
}
