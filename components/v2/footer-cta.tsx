"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import Link from "next/link"

const GREEN = "#00D26A"

export function FooterCTA() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end end"] })
  const y = useTransform(scrollYProgress, [0, 1], ["20%", "0%"])
  const opacity = useTransform(scrollYProgress, [0, 0.6], [0, 1])

  return (
    <section ref={ref} className="relative overflow-hidden border-t border-zinc-900 bg-black px-6 py-32 md:py-48" aria-label="Contact">
      <motion.div style={{ y, opacity }} className="container mx-auto">
        <p className="mb-6 font-mono text-xs tracking-[0.35em] text-zinc-500">[ 05 — TRANSMISSION ]</p>
        <Link href="/contact" className="group block">
          <h2 className="text-[14vw] font-black leading-[0.85] tracking-tighter text-white transition-colors md:text-[11vw]">
            LET&apos;S BUILD
            <br />
            <span className="transition-colors group-hover:text-white" style={{ color: GREEN }}>
              THE IMPOSSIBLE
            </span>
          </h2>
        </Link>
        <div className="mt-16 flex flex-col gap-6 font-mono text-sm tracking-widest text-zinc-400 md:flex-row md:gap-16">
          <a href="mailto:info@tc.agency" className="hover:text-[#00D26A]">
            INFO@TC.AGENCY
          </a>
          <a href="tel:+13132615200" className="hover:text-[#00D26A]">
            +1 313 261 5200
          </a>
          <span className="text-zinc-600">DET / LA / LV</span>
        </div>
      </motion.div>
    </section>
  )
}
