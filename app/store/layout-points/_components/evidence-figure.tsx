import Image from "next/image"

import { getEvidence, type EvidenceId } from "@/lib/layout-points/evidence"

/**
 * A real product capture, or nothing. Renders only when the file has been
 * imported into public/images/layout-points, so the page never shows an
 * empty frame or a stand-in screen.
 */
export function EvidenceFigure({
  id,
  priority = false,
  className = "",
}: {
  id: EvidenceId
  priority?: boolean
  className?: string
}) {
  const evidence = getEvidence(id)
  if (!evidence) return null

  return (
    <figure className={`border border-zinc-800 bg-zinc-950 ${className}`}>
      <div className="relative aspect-[16/10] w-full">
        <Image
          src={evidence.src}
          alt={evidence.alt}
          fill
          priority={priority}
          sizes="(min-width: 1024px) 50vw, 100vw"
          className="object-contain"
        />
      </div>
      <figcaption className="border-t border-zinc-800 px-5 py-3 font-mono text-[10px] uppercase tracking-[0.14em] text-zinc-400">
        {evidence.caption}
      </figcaption>
    </figure>
  )
}
