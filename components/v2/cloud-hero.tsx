"use client"

import { useRef, useState, useCallback } from "react"
import { motion, useScroll, useTransform, useMotionValueEvent } from "framer-motion"
import Link from "next/link"
import { PointCloud, type PointCloudHandles } from "./point-cloud"
import { ScrambleText } from "./scramble-text"

const GREEN = "#00D26A"

export function CloudHero() {
  const sectionRef = useRef<HTMLElement>(null)
  const cloudRef = useRef<PointCloudHandles | null>(null)
  const [ready, setReady] = useState(false)

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end start"] })
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.55], [1, 0])
  const titleY = useTransform(scrollYProgress, [0, 1], ["0%", "40%"])

  // feed scroll progress into the shader: the cloud disperses as you leave
  useMotionValueEvent(scrollYProgress, "change", (v) => {
    cloudRef.current?.setScroll(Math.min(1, v * 1.3))
  })

  const onReady = useCallback(() => setReady(true), [])

  return (
    <section ref={sectionRef} className="relative h-[150svh] bg-black">
      <div className="sticky top-0 h-svh overflow-hidden">
        <div className="absolute inset-0">
          <PointCloud src="/images/bsb-live-06.jpg" onReady={onReady} handlesRef={cloudRef} />
        </div>

        <motion.div style={{ opacity: overlayOpacity, y: titleY }} className="pointer-events-none absolute inset-0 flex flex-col justify-end px-6 pb-16 md:px-12 md:pb-24">
          <div className="mx-auto w-full max-w-[1600px]">
            <motion.p
              initial={{ opacity: 0 }}
              animate={ready ? { opacity: 1 } : {}}
              transition={{ delay: 2.6, duration: 1 }}
              className="mb-6 font-mono text-[11px] tracking-[0.4em] text-zinc-400"
            >
              <ScrambleText text="BACKSTREET BOYS @ SPHERE — 580,000 PIXELS OF PROOF" delay={2600} />
            </motion.p>

            <h1 className="select-none text-[11.5vw] font-black leading-[0.86] tracking-[-0.04em] text-white md:text-[8.5vw]">
              <span className="block overflow-hidden">
                <motion.span
                  className="block"
                  initial={{ y: "110%" }}
                  animate={ready ? { y: 0 } : {}}
                  transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1], delay: 1.6 }}
                >
                  WE MAKE IMPOSSIBLE
                </motion.span>
              </span>
              <span className="block overflow-hidden">
                <motion.span
                  className="block"
                  initial={{ y: "110%" }}
                  animate={ready ? { y: 0 } : {}}
                  transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1], delay: 1.75 }}
                >
                  SHOWS <span style={{ color: GREEN }}>RUN</span>
                </motion.span>
              </span>
            </h1>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={ready ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 2.3, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className="pointer-events-auto mt-10 flex flex-col gap-8 md:flex-row md:items-end md:justify-between"
            >
              <p className="max-w-md text-base leading-relaxed text-zinc-400 md:text-lg">
                Production engineering for live events where failure is not an option.
                200+ productions. 30+ countries. 99.97% uptime.
              </p>
              <div className="flex items-center gap-8">
                <Link
                  href="/contact"
                  data-cursor="hover"
                  className="group relative font-mono text-sm tracking-[0.25em] text-white"
                >
                  START A PROJECT
                  <span className="absolute -bottom-2 left-0 h-px w-full origin-left scale-x-100 transition-transform duration-500 group-hover:scale-x-0" style={{ background: GREEN }} />
                  <span className="absolute -bottom-2 left-0 h-px w-full origin-right scale-x-0 bg-white transition-transform delay-100 duration-500 group-hover:scale-x-100" />
                </Link>
                <Link href="/portfolio" data-cursor="hover" className="font-mono text-sm tracking-[0.25em] text-zinc-500 transition-colors duration-300 hover:text-white">
                  THE WORK
                </Link>
              </div>
            </motion.div>
          </div>
        </motion.div>

        <motion.div
          style={{ opacity: overlayOpacity }}
          className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 font-mono text-[10px] tracking-[0.4em] text-zinc-600 md:block"
          aria-hidden="true"
        >
          SCROLL
        </motion.div>
      </div>
    </section>
  )
}
