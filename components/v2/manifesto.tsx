"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion"

const TEXT =
  "Sixty thousand people. One cue. No second take. We engineer the systems that make impossible shows inevitable — automation, motion, video, power, and data fused into one machine that does not fail."

function Word({ children, progress, range }: { children: string; progress: MotionValue<number>; range: [number, number] }) {
  const opacity = useTransform(progress, range, [0.12, 1])
  const color = useTransform(progress, range, ["#3f3f46", "#ffffff"])
  return (
    <motion.span style={{ opacity, color }} className="inline-block">
      {children}&nbsp;
    </motion.span>
  )
}

export function Manifesto() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.85", "end 0.45"] })
  const words = TEXT.split(" ")

  return (
    <section className="relative bg-black px-6 py-32 md:py-48">
      <div className="container mx-auto max-w-5xl" ref={ref}>
        <p className="mb-10 font-mono text-xs tracking-[0.35em] text-[#00D26A]">[ 01 — THE MANDATE ]</p>
        <p className="text-3xl font-bold leading-snug tracking-tight md:text-5xl md:leading-tight">
          {words.map((word, i) => (
            <Word key={i} progress={scrollYProgress} range={[i / words.length, (i + 1) / words.length]}>
              {word}
            </Word>
          ))}
        </p>
      </div>
    </section>
  )
}
