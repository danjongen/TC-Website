"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import Link from "next/link"

const GREEN = "#00D26A"

const SERVICES = [
  {
    index: "01",
    title: "Technical Direction",
    body: "Technical leadership for arena tours, residencies, and broadcast. One accountable lead. Zero surprises on show day.",
  },
  {
    index: "02",
    title: "Workflow Automation",
    body: "Show-control pipelines and cueing systems that take human error off the critical path.",
  },
  {
    index: "03",
    title: "Systems Integration",
    body: "Video, lighting, motion, power, and networking engineered as one machine — not a pile of vendors.",
  },
  {
    index: "04",
    title: "Unreal Engine & Visualization",
    body: "Real-time previs and pixel-accurate content pipelines for screens of any scale — including the biggest one on the planet.",
  },
  {
    index: "05",
    title: "3D & Aerial Surveying",
    body: "LiDAR, photogrammetry, and drone survey. Millimeter truth before a single truck rolls.",
  },
]

function ServiceCard({ service, i, total }: { service: (typeof SERVICES)[number]; i: number; total: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] })
  // cards scale down slightly as the next one stacks over them
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.94])
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0.5])

  return (
    <div ref={ref} className="sticky top-0 flex h-screen items-center px-6" style={{ zIndex: i + 1 }}>
      <motion.div
        style={{ scale: i < total - 1 ? scale : 1, opacity: i < total - 1 ? opacity : 1 }}
        className="container mx-auto grid min-h-[60vh] grid-cols-1 content-center gap-8 border border-zinc-800 bg-zinc-950 p-10 md:grid-cols-[1fr_2fr] md:p-20"
      >
        <div>
          <span className="font-mono text-6xl font-black text-zinc-800 md:text-8xl">{service.index}</span>
          <div className="mt-4 h-px w-16" style={{ background: GREEN }} />
        </div>
        <div>
          <h3 className="text-4xl font-black tracking-tight text-white md:text-6xl">{service.title}</h3>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-zinc-400 md:text-xl">{service.body}</p>
          <Link href="/services" className="mt-8 inline-block font-mono text-sm tracking-[0.25em] text-[#00D26A] hover:underline">
            EXPLORE →
          </Link>
        </div>
      </motion.div>
    </div>
  )
}

export function ServicesStack() {
  return (
    <section className="relative bg-black" aria-label="Services">
      <div className="container mx-auto px-6 pt-32 pb-8">
        <p className="mb-4 font-mono text-xs tracking-[0.35em] text-[#00D26A]">[ 03 — CAPABILITIES ]</p>
        <h2 className="text-5xl font-black tracking-tighter text-white md:text-7xl">WHAT WE RUN</h2>
      </div>
      <div className="relative">
        {SERVICES.map((s, i) => (
          <ServiceCard key={s.index} service={s} i={i} total={SERVICES.length} />
        ))}
      </div>
    </section>
  )
}
