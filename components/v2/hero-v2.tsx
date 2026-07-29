"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform, useSpring, type MotionValue } from "framer-motion"
import Link from "next/link"

const GREEN = "#00D26A"

function GridBackground({ progress }: { progress: MotionValue<string> }) {
  return (
    <motion.div
      aria-hidden="true"
      className="absolute inset-0"
      style={{
        backgroundImage: `linear-gradient(rgba(0,210,106,0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(0,210,106,0.07) 1px, transparent 1px)`,
        backgroundSize: "64px 64px",
        maskImage: "radial-gradient(ellipse 80% 60% at 50% 40%, black 30%, transparent 100%)",
        WebkitMaskImage: "radial-gradient(ellipse 80% 60% at 50% 40%, black 30%, transparent 100%)",
        y: progress,
      }}
    />
  )
}

export function HeroV2() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] })

  const titleY = useTransform(scrollYProgress, [0, 1], ["0%", "45%"])
  const titleScale = useTransform(scrollYProgress, [0, 1], [1, 0.92])
  const titleOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0])
  const gridY = useTransform(scrollYProgress, [0, 1], ["0%", "25%"])
  const subOpacity = useTransform(scrollYProgress, [0, 0.35], [1, 0])
  const smoothTitleY = useSpring(titleY, { stiffness: 120, damping: 25 })

  return (
    <section ref={ref} className="relative flex min-h-[110svh] flex-col justify-center overflow-hidden bg-black px-6">
      <GridBackground progress={gridY} />

      {/* scanline sweep */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        <div className="hero-scanline absolute left-0 h-px w-full" style={{ background: `linear-gradient(90deg, transparent, ${GREEN}66, transparent)` }} />
      </div>

      <div className="container relative z-10 mx-auto">
        <motion.p
          style={{ opacity: subOpacity }}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="mb-6 font-mono text-xs tracking-[0.35em] text-zinc-400 md:text-sm"
        >
          <span className="mr-3 inline-block h-2 w-2 animate-pulse rounded-full align-middle" style={{ background: GREEN }} />
          SYSTEMS ONLINE - DETROIT / LOS ANGELES / LAS VEGAS
        </motion.p>

        <motion.h1
          style={{ y: smoothTitleY, scale: titleScale, opacity: titleOpacity }}
          className="select-none text-[13vw] font-black leading-[0.85] tracking-tighter text-white md:text-[10vw]"
        >
          <motion.span
            className="block"
            initial={{ opacity: 0, y: 80 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
          >
            TECHNICALLY
          </motion.span>
          <motion.span
            className="block"
            style={{ color: GREEN, textShadow: `0 0 80px ${GREEN}40` }}
            initial={{ opacity: 0, y: 80 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.45 }}
          >
            CREATIVE
          </motion.span>
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.7 }}
          style={{ opacity: subOpacity }}
          className="mt-10 flex max-w-2xl flex-col gap-8 md:flex-row md:items-end md:justify-between md:max-w-none"
        >
          <p className="max-w-xl text-lg leading-relaxed text-zinc-400 md:text-xl">
            Production engineering for failure-intolerant environments. Systems, automation, and
            technical direction behind <span className="text-white">200+ productions</span> across{" "}
            <span className="text-white">30+ countries</span>.
          </p>
          <div className="flex gap-4">
            <Link
              href="/contact"
              className="group relative overflow-hidden border px-8 py-4 font-mono text-sm tracking-widest text-black transition-colors"
              style={{ background: GREEN, borderColor: GREEN }}
            >
              START A PROJECT
            </Link>
            <Link
              href="/portfolio"
              className="border border-zinc-700 px-8 py-4 font-mono text-sm tracking-widest text-white transition-colors hover:border-[#00D26A] hover:text-[#00D26A]"
            >
              SEE THE WORK
            </Link>
          </div>
        </motion.div>
      </div>

      <motion.div
        style={{ opacity: subOpacity }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 font-mono text-[10px] tracking-[0.4em] text-zinc-400"
        aria-hidden="true"
      >
        SCROLL TO INITIALIZE
        <div className="mx-auto mt-3 h-10 w-px bg-gradient-to-b from-zinc-600 to-transparent" />
      </motion.div>
    </section>
  )
}
