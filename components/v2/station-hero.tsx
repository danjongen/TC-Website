import Image from "next/image"
import Link from "next/link"
import { RenderLabel } from "./render-label"
import { STATION_CASE_STUDY, STATION_IMAGES } from "@/lib/work"

const GREEN = "#00D26A"

const lead = STATION_IMAGES.grandHallWide

/**
 * Homepage hero. The company line leads, then the station render as the lead
 * visual. The render always shows its complete 16:9 frame (phones included),
 * with every word of project copy set outside the image so nothing covers the
 * station. Server rendered; load-in uses the CSS utilities only.
 */
export function StationHero() {
  return (
    <section className="bg-black pt-32 md:pt-40" aria-labelledby="home-title">
      <div className="mx-auto w-full max-w-[1600px] px-6 md:px-12">
        <h1
          id="home-title"
          data-vt="title"
          className="select-none text-[11.5vw] font-black leading-[0.86] tracking-[-0.04em] text-white md:text-[7vw] 2xl:text-[112px]"
        >
          <span className="block overflow-hidden">
            <span className="tc-load-rise block" style={{ animationDelay: "150ms" }}>
              WE MAKE IMPOSSIBLE
            </span>
          </span>
          <span className="block overflow-hidden">
            <span className="tc-load-rise block" style={{ animationDelay: "300ms" }}>
              SHOWS <span style={{ color: GREEN }}>RUN</span>
            </span>
          </span>
        </h1>

        <div
          className="tc-load-fade-up mt-10 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between"
          style={{ animationDelay: "600ms" }}
        >
          <p className="max-w-md text-base leading-relaxed text-zinc-400 md:text-lg">
            Production engineering for live events where failure is not an option.
            200+ productions. 30+ countries. 99.97% uptime.
          </p>
          <div className="flex items-center gap-6">
            <Link
              href="/contact"
              data-cursor="hover"
              className="inline-block whitespace-nowrap px-6 py-4 font-mono text-xs tracking-[0.2em] text-black transition-[filter,box-shadow] duration-300 ease-expo hover:brightness-110 hover:shadow-[0_0_30px_rgba(0,210,106,0.35)] sm:px-8 sm:text-sm"
              style={{ background: GREEN }}
            >
              START A PROJECT
            </Link>
            <Link
              href="/portfolio"
              data-cursor="hover"
              className="whitespace-nowrap px-2 py-4 font-mono text-xs tracking-[0.2em] text-zinc-400 transition-colors duration-300 ease-expo hover:text-white sm:text-sm"
            >
              THE WORK
            </Link>
          </div>
        </div>
      </div>

      <figure className="mx-auto mt-16 w-full max-w-[1600px] md:mt-20 md:px-12">
        {/* full frame, never cropped: the box takes the image's own 16:9 ratio */}
        <Image
          src={lead.src}
          width={lead.width}
          height={lead.height}
          alt={lead.alt}
          priority
          sizes="(min-width: 1600px) 1504px, (min-width: 768px) calc(100vw - 96px), 100vw"
          className="block h-auto w-full"
        />

        <figcaption className="mt-6 grid gap-6 px-6 md:mt-8 md:grid-cols-12 md:gap-8 md:px-0">
          <div className="md:col-span-6">
            <p className="mb-5 flex flex-wrap items-center gap-x-4 gap-y-2 font-mono text-[11px] tracking-[0.2em] text-zinc-400">
              <RenderLabel />
              <span>{lead.caption}</span>
            </p>
            <h2
              data-reveal="rise"
              className="max-w-2xl text-3xl font-semibold tracking-[-0.03em] text-white md:text-5xl"
            >
              Michigan Central Station: From station scan to event plan.
            </h2>
          </div>
          <div className="md:col-span-5 md:col-start-8 md:self-end">
            <p data-reveal="fade" className="text-lg leading-relaxed text-zinc-400">
              We used a 3D scan of Michigan Central Station to build a detailed venue model, create renders for an
              upcoming event and produce accurate CAD plans.
            </p>
            <Link
              data-reveal="fade"
              href={STATION_CASE_STUDY}
              data-cursor="hover"
              className="-my-1 mt-6 inline-block py-1 font-mono text-xs tracking-[0.2em] text-zinc-300 transition-colors duration-300 ease-expo hover:text-[#00D26A]"
            >
              EXPLORE THE PROJECT →
            </Link>
          </div>
        </figcaption>
      </figure>
    </section>
  )
}
