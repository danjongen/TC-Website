import Link from "next/link"
import { CueLabel } from "@/components/motion/cue-label"
import { Clocks, type ClockZone } from "@/components/v2/footer-clock"

const ZONES: ClockZone[] = [
  { label: "DET", tz: "America/Detroit" },
  { label: "LV", tz: "America/Los_Angeles" },
  { label: "UTC", tz: "UTC" },
]

export function FooterCTA() {
  return (
    <section
      data-cue="05"
      data-cue-label="TRANSMISSION"
      className="relative overflow-hidden bg-black px-6 py-[22vh] md:px-12"
      aria-label="Contact"
    >
      <div className="mx-auto w-full max-w-[1600px]">
        <CueLabel index="05" cue className="mb-8 font-mono text-[11px] tracking-[0.2em] text-zinc-400">
          TRANSMISSION
        </CueLabel>
        <Link href="/contact" data-cursor="hover" className="group block">
          <h2 className="text-[13vw] font-bold leading-[0.88] tracking-[-0.04em] text-white md:text-[10vw]">
            <span data-reveal="rise" className="block">
              LET&apos;S BUILD
            </span>{" "}
            <span
              data-reveal="rise"
              className="block transition-colors duration-300 ease-expo group-hover:text-[#00D26A] group-focus-visible:text-[#00D26A]"
            >
              THE IMPOSSIBLE
            </span>
          </h2>
          <span
            data-reveal="fade"
            className="mt-10 inline-block bg-[#00D26A] px-8 py-4 font-mono text-sm tracking-[0.2em] text-black transition-[filter,box-shadow] duration-300 ease-expo group-hover:brightness-110 group-hover:shadow-[0_0_30px_rgba(0,210,106,0.35)] group-focus-visible:brightness-110 group-focus-visible:shadow-[0_0_30px_rgba(0,210,106,0.35)]"
          >
            START A PROJECT →
          </span>
        </Link>

        <div
          data-reveal="fade"
          className="mt-24 flex flex-col gap-5 font-mono text-xs tracking-[0.15em] md:flex-row md:items-center md:gap-12"
        >
          <a
            href="mailto:info@tc.agency"
            data-cursor="hover"
            className="inline-flex min-h-6 items-center text-zinc-400 transition-colors duration-300 ease-expo hover:text-white focus-visible:text-white"
          >
            INFO@TC.AGENCY
          </a>
          <div className="flex flex-wrap gap-8 md:ml-auto">
            <Clocks zones={ZONES} />
            <span className="flex items-center gap-2 text-zinc-400">
              <span
                aria-hidden="true"
                className="inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-[#00D26A] motion-reduce:animate-none"
              />
              SYSTEMS NOMINAL
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}
