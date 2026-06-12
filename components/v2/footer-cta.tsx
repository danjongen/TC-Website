"use client"

import { useEffect, useRef, useState } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import Link from "next/link"

function Clock({ tz, label }: { tz: string; label: string }) {
  const [time, setTime] = useState("--:--:--")
  useEffect(() => {
    const tick = () =>
      setTime(new Date().toLocaleTimeString("en-US", { timeZone: tz, hour12: false }))
    tick()
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [tz])
  return (
    <span className="flex gap-3">
      <span className="text-zinc-600">{label}</span>
      <span className="tabular-nums text-zinc-400">{time}</span>
    </span>
  )
}

export function FooterCTA() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end end"] })
  const y = useTransform(scrollYProgress, [0, 1], ["10%", "0%"])
  const opacity = useTransform(scrollYProgress, [0, 0.3], [0, 1])

  return (
    <section ref={ref} className="relative overflow-hidden bg-black px-6 py-[22vh] md:px-12" aria-label="Contact">
      <motion.div style={{ y, opacity }} className="mx-auto w-full max-w-[1600px]">
        <p className="mb-8 font-mono text-[11px] tracking-[0.2em] text-zinc-400">[ 05 — TRANSMISSION ]</p>
        <Link href="/contact" data-cursor="hover" className="group block">
          <h2 className="text-[13vw] font-bold leading-[0.88] tracking-[-0.04em] text-white md:text-[10vw]">
            LET&apos;S BUILD
            <br />
            <span className="transition-colors duration-500 group-hover:text-[#00D26A]">THE IMPOSSIBLE</span>
          </h2>
          <span className="mt-10 inline-block bg-[#00D26A] px-8 py-4 font-mono text-sm tracking-[0.2em] text-black transition-all duration-300 group-hover:brightness-110 group-hover:shadow-[0_0_30px_rgba(0,210,106,0.35)]">
            START A PROJECT →
          </span>
        </Link>

        <div className="mt-24 flex flex-col gap-5 font-mono text-xs tracking-[0.15em] md:flex-row md:items-center md:gap-12">
          <a href="mailto:info@tc.agency" data-cursor="hover" className="text-zinc-400 transition-colors duration-300 hover:text-white">
            INFO@TC.AGENCY
          </a>
          <a href="tel:+13132615200" data-cursor="hover" className="text-zinc-400 transition-colors duration-300 hover:text-white">
            +1 313 261 5200
          </a>
          <div className="flex flex-wrap gap-8 md:ml-auto">
            <Clock tz="America/Detroit" label="DET" />
            <Clock tz="America/Los_Angeles" label="LA" />
            <Clock tz="America/Los_Angeles" label="LV" />
            <span className="flex items-center gap-2 text-zinc-600">
              <span className="inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-[#00D26A]" />
              SYSTEMS NOMINAL
            </span>
          </div>
        </div>
      </motion.div>
    </section>
  )
}
