"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, useScroll, useTransform, useMotionValueEvent } from "framer-motion"

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

function ProjectCard({ project, onCardFocus }: { project: (typeof PROJECTS)[number]; onCardFocus?: () => void }) {
  const ref = useRef<HTMLDivElement>(null)
  // per-card parallax: image drifts inside its frame as the card crosses the viewport
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] })
  const imageY = useTransform(scrollYProgress, [0, 1], ["-12%", "12%"])

  return (
    <Link
      href={project.href}
      data-cursor="hover"
      onFocus={onCardFocus}
      className="block shrink-0 snap-start focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#00D26A]"
    >
      <div ref={ref} className="group relative h-[70vh] w-[85vw] overflow-hidden md:h-[75vh] md:w-[60vw]">
      <motion.div style={{ y: imageY }} className="absolute inset-[-14%]">
        <Image
          src={project.image}
          alt={`${project.title} — ${project.client}`}
          fill
          sizes="(max-width: 768px) 85vw, 60vw"
          className="object-cover transition-[transform,filter] duration-[600ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04] group-hover:brightness-110"
        />
      </motion.div>
      <div className="absolute inset-x-0 bottom-0 h-[30%] bg-gradient-to-t from-black/80 to-transparent" />
      <div className="absolute bottom-0 left-0 p-8 md:p-12">
        <p className="mb-3 font-mono text-[11px] tracking-[0.2em] text-zinc-400">
          {project.index} / 004 — {project.role.toUpperCase()}
        </p>
        <h3 className="text-3xl font-bold tracking-[-0.03em] text-white md:text-5xl">{project.title}</h3>
        <p className="mt-2 text-zinc-400">{project.client}</p>
      </div>
      </div>
    </Link>
  )
}

function GalleryHeader() {
  return (
    <div className="mx-auto w-full max-w-[1600px] px-6 pt-[20vh] md:px-12">
      <p className="mb-6 font-mono text-[11px] tracking-[0.2em] text-zinc-400">[ 02 — SELECTED WORK ]</p>
      <h2 className="max-w-4xl text-5xl font-semibold tracking-[-0.03em] text-white md:text-7xl">
        Built for the biggest stages on Earth
      </h2>
    </div>
  )
}

function PortfolioCard() {
  return (
    <Link
      href="/portfolio"
      data-cursor="hover"
      className="flex h-[70vh] w-[60vw] shrink-0 snap-start items-center justify-center transition-colors duration-300 md:h-[75vh] md:w-[35vw]"
    >
      <span className="font-mono text-base tracking-[0.25em] text-zinc-400 transition-colors duration-300 hover:text-white">
        FULL PORTFOLIO →
      </span>
    </Link>
  )
}

export function ProjectsGallery() {
  const trackRef = useRef<HTMLDivElement>(null)
  const [coarse, setCoarse] = useState(false)
  const [card, setCard] = useState(1)

  useEffect(() => {
    setCoarse(window.matchMedia("(pointer: coarse)").matches || window.matchMedia("(prefers-reduced-motion: reduce)").matches)
  }, [])

  const { scrollYProgress } = useScroll({ target: trackRef, offset: ["start start", "end end"] })
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-72%"])
  const progressScale = useTransform(scrollYProgress, [0, 1], [0, 1])
  useMotionValueEvent(scrollYProgress, "change", (v) => {
    setCard(Math.min(PROJECTS.length, Math.max(1, Math.ceil(v * PROJECTS.length))))
  })

  // touch / reduced-motion: native horizontally scrollable row, no scroll-jacking
  if (coarse) {
    return (
      <section className="relative bg-black pb-[10vh]" aria-label="Featured projects">
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
    <section className="relative bg-black" aria-label="Featured projects">
      <GalleryHeader />

      <div ref={trackRef} className="relative h-[260vh]">
        <div className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden">
          <motion.div style={{ x }} className="flex gap-8 pl-6 md:pl-[8vw]">
            {PROJECTS.map((p, i) => (
              <ProjectCard
                key={p.index}
                project={p}
                onCardFocus={() => {
                  // keyboard path: focusing a card scrolls the pinned track to reveal it
                  const el = trackRef.current
                  if (!el) return
                  const top = el.offsetTop + (i / PROJECTS.length) * (el.offsetHeight - window.innerHeight)
                  window.scrollTo({ top, behavior: "auto" })
                }}
              />
            ))}
            <PortfolioCard />
          </motion.div>
          <div className="absolute bottom-8 left-6 right-6 flex items-center gap-6 md:left-[8vw] md:right-[8vw]">
            <span className="font-mono text-[11px] tracking-[0.2em] text-zinc-400 tabular-nums">
              00{card} / 00{PROJECTS.length}
            </span>
            <div className="relative h-[3px] flex-1 bg-zinc-800">
              <motion.div className="absolute inset-0 origin-left" style={{ scaleX: progressScale, background: GREEN }} />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
