"use client"

import { useEffect, useRef, useState, type FocusEvent } from "react"
import Image from "next/image"
import Link from "next/link"
import { m, useMotionValue, useMotionValueEvent, useScroll, useTransform } from "framer-motion"
import { CueLabel } from "@/components/motion/cue-label"

const GREEN = "#00D26A"

const CASE_STUDY = "/insights/ufo-pod-touring-control-infrastructure"

const PROJECTS = [
  {
    title: "Into The Millennium",
    client: "Backstreet Boys",
    role: "Automation, Power & Data Systems",
    image: "/images/bsb-live-02.jpg",
    href: CASE_STUDY,
    index: "001",
  },
  {
    title: "Sphere, Las Vegas",
    client: "Backstreet Boys",
    role: "Video Systems Integration",
    image: "/images/bsb-live-04.jpg",
    href: CASE_STUDY,
    index: "002",
  },
  {
    title: "Flying Stage Element",
    client: "Backstreet Boys",
    role: "Wireless Power & Control",
    image: "/images/bsb-live-01.jpg",
    href: CASE_STUDY,
    index: "003",
  },
  {
    title: "Show Control",
    client: "Backstreet Boys",
    role: "Three-Layer Timecode Redundancy",
    image: "/images/bsb-live-03.jpg",
    href: CASE_STUDY,
    index: "004",
  },
]

const pad3 = (n: number) => String(n).padStart(3, "0")
const TOTAL = pad3(PROJECTS.length)

type LenisLike = { scrollTo: (target: number, options?: { immediate?: boolean }) => void }

const clamp01 = (n: number) => Math.min(1, Math.max(0, n))

/** Px from the row's content start (inside its left padding) to a card's left edge. Both rects carry the same translateX, so the result is independent of the current travel. */
function cardOffset(card: Element, row: HTMLElement) {
  const pad = parseFloat(getComputedStyle(row).paddingLeft) || 0
  return card.getBoundingClientRect().left - row.getBoundingClientRect().left - pad
}

/** 1-based index of the project card whose stop is nearest the given progress. */
function nearestCard(v: number, stops: number[]) {
  let best = 0
  for (let i = 1; i < stops.length; i++) {
    if (Math.abs(v - stops[i]) < Math.abs(v - stops[best])) best = i
  }
  return best + 1
}

/** Keyboard focus only: a mouse click also focuses the link, and must not scroll the page. */
function isKeyboardFocus(e: FocusEvent<HTMLElement>) {
  try {
    return e.currentTarget.matches(":focus-visible")
  } catch {
    return true
  }
}

type CardFocusHandler = (card: HTMLElement) => void

function ProjectCard({ project, onCardFocus }: { project: (typeof PROJECTS)[number]; onCardFocus?: CardFocusHandler }) {
  const ref = useRef<HTMLDivElement>(null)
  // per-card parallax: image drifts inside its frame as the card crosses the viewport.
  // Reduced motion is handled in CSS (motion-reduce:transform-none! beats framer's inline
  // transform), so server and client markup match on first render.
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] })
  const imageY = useTransform(scrollYProgress, [0, 1], ["-12%", "12%"])

  return (
    <Link
      href={project.href}
      data-cursor="hover"
      data-cursor-label="VIEW"
      onFocus={onCardFocus ? (e) => isKeyboardFocus(e) && onCardFocus(e.currentTarget) : undefined}
      className="group block shrink-0 snap-start focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#00D26A]"
    >
      <div ref={ref} className="relative h-[70vh] w-[85vw] overflow-hidden md:h-[75vh] md:w-[60vw]">
        {/* morph source for the page transition: flies into the case study hero */}
        <div data-vt-source="media" className="absolute inset-0 overflow-hidden">
          <m.div style={{ y: imageY }} className="absolute inset-[-14%] motion-reduce:transform-none!">
            <Image
              src={project.image}
              alt={`${project.title}, ${project.client}`}
              fill
              sizes="(max-width: 768px) 85vw, 60vw"
              className="object-cover transition-[scale,filter] duration-600 ease-expo group-hover:scale-[1.04] group-hover:brightness-110 group-focus-visible:scale-[1.04] group-focus-visible:brightness-110"
            />
          </m.div>
        </div>
        <div className="absolute inset-x-0 bottom-0 h-[30%] bg-gradient-to-t from-black/80 to-transparent" />
        <div className="absolute bottom-0 left-0 p-8 md:p-12">
          <p className="mb-3 flex flex-wrap gap-x-4 gap-y-1 font-mono text-[11px] tracking-[0.2em] text-zinc-400">
            <span className="tabular-nums">
              {project.index} / {TOTAL}
            </span>
            <span>{project.role.toUpperCase()}</span>
          </p>
          <h3 data-vt-source="title" className="text-3xl font-bold tracking-[-0.03em] text-white md:text-5xl">
            {project.title}
          </h3>
          <p className="mt-2 text-zinc-400">{project.client}</p>
        </div>
      </div>
    </Link>
  )
}

function GalleryHeader() {
  return (
    <div className="mx-auto w-full max-w-[1600px] px-6 pt-[20vh] md:px-12">
      <CueLabel index="02" cue className="mb-6 font-mono text-[11px] tracking-[0.2em] text-zinc-400">
        SELECTED WORK
      </CueLabel>
      <h2 data-reveal="rise" className="max-w-4xl text-5xl font-semibold tracking-[-0.03em] text-white md:text-7xl">
        Built for the biggest stages on Earth
      </h2>
    </div>
  )
}

function PortfolioCard({ onCardFocus }: { onCardFocus?: CardFocusHandler }) {
  return (
    <Link
      href="/portfolio"
      data-cursor="hover"
      onFocus={onCardFocus ? (e) => isKeyboardFocus(e) && onCardFocus(e.currentTarget) : undefined}
      className="group flex h-[70vh] w-[60vw] shrink-0 snap-start items-center justify-center focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#00D26A] md:h-[75vh] md:w-[35vw]"
    >
      <span className="font-mono text-base tracking-[0.25em] text-zinc-400 transition-colors duration-300 ease-expo group-hover:text-white group-focus-visible:text-white">
        FULL PORTFOLIO →
      </span>
    </Link>
  )
}

export function ProjectsGallery() {
  const trackRef = useRef<HTMLDivElement>(null)
  const frameRef = useRef<HTMLDivElement>(null)
  const rowRef = useRef<HTMLDivElement>(null)
  const [coarse, setCoarse] = useState(false)
  const [card, setCard] = useState(1)
  // Horizontal travel in px: row width minus frame width, so the last card lands on the
  // right padding at every viewport width. 0 until measured (server and first client render).
  const travel = useMotionValue(0)
  // Scroll progress (0..1) at which each project card's left edge sits on the row's left padding.
  const stopsRef = useRef<number[]>(PROJECTS.map((_, i) => i / PROJECTS.length))

  useEffect(() => {
    setCoarse(window.matchMedia("(pointer: coarse)").matches || window.matchMedia("(prefers-reduced-motion: reduce)").matches)
  }, [])

  const { scrollYProgress } = useScroll({ target: trackRef, offset: ["start start", "end end"] })
  const x = useTransform([scrollYProgress, travel], ([p = 0, t = 0]: number[]) => 0 - p * t)
  useMotionValueEvent(scrollYProgress, "change", (v) => setCard(nearestCard(v, stopsRef.current)))

  useEffect(() => {
    if (coarse) return
    const row = rowRef.current
    const frame = frameRef.current
    if (!row || !frame) return
    const measure = () => {
      const t = Math.max(0, row.scrollWidth - frame.clientWidth)
      travel.set(t)
      stopsRef.current = Array.from(row.children)
        .slice(0, PROJECTS.length)
        .map((c) => (t > 0 ? clamp01(cardOffset(c, row) / t) : 0))
      setCard(nearestCard(scrollYProgress.get(), stopsRef.current))
    }
    measure()
    const ro = new ResizeObserver(measure)
    ro.observe(row)
    ro.observe(frame)
    return () => ro.disconnect()
  }, [coarse, travel, scrollYProgress])

  // Keyboard path: focusing a card scrolls the page to the point in the pinned
  // track where that card's left edge sits on the row padding (the portfolio card
  // clamps to the end of the track).
  const scrollToCard = (cardEl: HTMLElement) => {
    const el = trackRef.current
    const row = rowRef.current
    if (!el || !row) return
    const t = travel.get()
    const p = t > 0 ? clamp01(cardOffset(cardEl, row) / t) : 0
    const trackTop = el.getBoundingClientRect().top + window.scrollY
    const top = trackTop + p * (el.offsetHeight - window.innerHeight)
    const lenis = (window as unknown as { lenis?: LenisLike }).lenis
    if (lenis) lenis.scrollTo(top, { immediate: true })
    else window.scrollTo({ top, behavior: "auto" })
  }

  // touch / reduced-motion: native horizontally scrollable row, no scroll-jacking
  if (coarse) {
    return (
      <section
        data-cue="02"
        data-cue-label="SELECTED WORK"
        className="relative bg-black pb-[10vh]"
        aria-label="Featured projects"
      >
        <GalleryHeader />
        <div className="mt-14 flex snap-x snap-mandatory gap-6 overflow-x-auto px-6 pb-6 [-webkit-overflow-scrolling:touch]">
          {PROJECTS.map((p) => (
            <div key={p.index} className="snap-start">
              <ProjectCard project={p} />
            </div>
          ))}
          <PortfolioCard />
        </div>
      </section>
    )
  }

  return (
    <section data-cue="02" data-cue-label="SELECTED WORK" className="relative bg-black" aria-label="Featured projects">
      <GalleryHeader />

      <div ref={trackRef} className="relative h-[260vh]">
        {/* overflow: clip (not hidden) so focusing an off-screen card cannot scroll this frame sideways */}
        <div
          ref={frameRef}
          className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden supports-[overflow:clip]:overflow-clip"
        >
          <m.div ref={rowRef} style={{ x }} className="flex w-max gap-8 px-6 md:px-[8vw]">
            {PROJECTS.map((p) => (
              <ProjectCard key={p.index} project={p} onCardFocus={scrollToCard} />
            ))}
            <PortfolioCard onCardFocus={scrollToCard} />
          </m.div>
          <div className="absolute bottom-8 left-6 right-6 flex items-center gap-6 md:left-[8vw] md:right-[8vw]">
            <span className="font-mono text-[11px] tracking-[0.2em] text-zinc-400 tabular-nums">
              {pad3(card)} / {TOTAL}
            </span>
            <div className="relative h-[3px] flex-1 bg-zinc-800">
              <m.div className="absolute inset-0 origin-left" style={{ scaleX: scrollYProgress, background: GREEN }} />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
