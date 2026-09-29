import Image from "next/image"
import Link from "next/link"
import { RenderLabel } from "./render-label"
import { STATION_CASE_STUDY, STATION_IMAGES } from "@/lib/work"

const image = STATION_IMAGES.grandHallWide

/** Service page cross-link to the Michigan Central Station case study. */
export function StationCaseLink({ className = "" }: { className?: string }) {
  return (
    <section className={className} aria-labelledby="station-case-link">
      <p className="mb-6 font-mono text-[11px] tracking-[0.2em] text-zinc-400">IN PRACTICE</p>
      <Link
        data-reveal="fade"
        href={STATION_CASE_STUDY}
        className="group grid max-w-4xl gap-6 border border-zinc-800 p-4 transition-colors duration-300 ease-expo hover:border-[#00D26A]/30 md:grid-cols-2 md:items-center md:p-6"
      >
        <Image
          src={image.src}
          width={image.width}
          height={image.height}
          alt={image.alt}
          sizes="(min-width: 768px) 420px, calc(100vw - 80px)"
          className="block h-auto w-full"
        />
        <div>
          <p className="mb-3 flex flex-wrap items-center gap-3 font-mono text-[11px] tracking-[0.2em] text-zinc-400">
            <RenderLabel />
            <span>CASE STUDY</span>
          </p>
          <h2
            id="station-case-link"
            className="text-2xl font-semibold tracking-[-0.03em] text-white transition-colors duration-300 ease-expo group-hover:text-[#00D26A]"
          >
            Michigan Central Station: From station scan to event plan.
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-zinc-400">
            A 3D scan of the station became a detailed venue model, renders for an upcoming event and accurate CAD
            plans.
          </p>
          <span className="mt-5 inline-block font-mono text-xs tracking-[0.2em] text-zinc-300 transition-colors duration-300 ease-expo group-hover:text-white">
            EXPLORE THE PROJECT →
          </span>
        </div>
      </Link>
    </section>
  )
}
