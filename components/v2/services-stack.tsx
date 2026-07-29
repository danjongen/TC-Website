"use client"

import { useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import Link from "next/link"

const EXPO = [0.16, 1, 0.3, 1] as const

const SERVICES = [
  {
    index: "01",
    title: "Technical Direction",
    body: "Technical leadership for arena tours, residencies, and broadcast. One accountable lead. Zero surprises on show day.",
    href: "/services/technical-direction",
  },
  {
    index: "02",
    title: "Workflow Automation",
    body: "Show-control pipelines and cueing systems that take human error off the critical path.",
    href: "/services/workflow-automation",
  },
  {
    index: "03",
    title: "Systems Integration",
    body: "Video, lighting, motion, power, and networking engineered as one machine. Not a pile of vendors.",
    href: "/services/system-integration",
  },
  {
    index: "04",
    title: "Unreal Engine & Visualization",
    body: "Real-time previs and pixel-accurate content pipelines for screens of any scale, including the biggest one on the planet.",
    href: "/services/unreal-engine",
  },
  {
    index: "05",
    title: "3D & Aerial Surveying",
    body: "LiDAR, photogrammetry, and drone survey. Millimeter truth before a single truck rolls.",
    href: "/services/3d-scanning",
  },
]

export function ServicesStack() {
  const [open, setOpen] = useState<string | null>(null)

  return (
    <section className="bg-black px-6 py-[20vh] md:px-12" aria-label="Services">
      <div className="mx-auto w-full max-w-[1600px]">
        <p className="mb-16 font-mono text-[11px] tracking-[0.2em] text-zinc-400">[ 03 / CAPABILITIES ]</p>

        <ul>
          {SERVICES.map((s) => {
            const isOpen = open === s.index
            return (
              <li key={s.index}>
                <button
                  data-cursor="hover"
                  onClick={() => setOpen(isOpen ? null : s.index)}
                  aria-expanded={isOpen}
                  className="group flex w-full items-baseline gap-6 py-7 text-left md:gap-12 md:py-9"
                >
                  <span className="font-mono text-[11px] tracking-[0.2em] text-zinc-400">{s.index}</span>
                  <span
                    className="text-3xl font-semibold tracking-[-0.03em] text-zinc-400 transition-colors duration-300 group-hover:text-white md:text-6xl"
                    style={isOpen ? { color: "#fff" } : undefined}
                  >
                    {s.title}
                  </span>
                  <span className="ml-auto hidden font-mono text-xs text-zinc-400 transition-transform duration-300 group-hover:translate-x-1 md:block">
                    {isOpen ? "-" : "+"}
                  </span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.55, ease: EXPO }}
                      className="overflow-hidden"
                    >
                      <div className="pb-10 pl-12 md:pl-32">
                        <p className="max-w-xl text-lg leading-relaxed text-zinc-400">{s.body}</p>
                        <Link
                          href={s.href}
                          data-cursor="hover"
                          className="mt-6 inline-block font-mono text-xs tracking-[0.2em] text-zinc-400 transition-colors duration-300 hover:text-[#00D26A]"
                        >
                          EXPLORE →
                        </Link>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
                <div className="h-px w-full bg-zinc-900" />
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
