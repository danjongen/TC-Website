"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion"

const TEXT =
  "Sixty thousand people. One cue. No second take. We engineer the systems that make impossible shows *inevitable* — automation, motion, video, power, and data fused into one machine that *does-not-fail*."

function Word({ children, progress, range, green }: { children: string; progress: MotionValue<number>; range: [number, number]; green?: boolean }) {
  const opacity = useTransform(progress, range, [0.6, 1])
  const color = useTransform(progress, range, ["#a1a1aa", green ? "#00D26A" : "#ffffff"])
  return (
    <motion.span style={{ opacity, color }} className="inline-block">
      {children}&nbsp;
    </motion.span>
  )
}

export function Manifesto() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.9", "end 0.6"] })
  const words = TEXT.split(" ")

  return (
    <section className="relative bg-black px-6 py-[28vh] md:px-12">
      <div className="mx-auto w-full max-w-4xl" ref={ref}>
        <p className="mb-12 font-mono text-[11px] tracking-[0.2em] text-zinc-400">[ 01 — THE MANDATE ]</p>
        <p className="text-4xl font-semibold leading-[1.12] tracking-[-0.02em] md:text-6xl">
          {words.map((word, i) => {
            const green = word.startsWith("*")
            const clean = word.replace(/\*/g, "").replace(/-/g, " ")
            return (
              <Word key={i} progress={scrollYProgress} range={[i / words.length, (i + 1) / words.length]} green={green}>
                {clean}
              </Word>
            )
          })}
        </p>
      </div>
    </section>
  )
}
