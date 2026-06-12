"use client"

import { useRef, useState, useCallback } from "react"
import { motion, AnimatePresence, useScroll, useTransform, useMotionValueEvent } from "framer-motion"
import Link from "next/link"
import { PointCloud, type PointCloudHandles } from "./point-cloud"

const GREEN = "#00D26A"

const SLIDES = [
  { src: "/images/bsb-live-06.jpg", caption: "BACKSTREET BOYS — SPHERE, LAS VEGAS" },
  { src: "/images/bsb-live-02.jpg", caption: "INTO THE MILLENNIUM — AUTOMATION & POWER" },
  { src: "/images/bsb-live-04.jpg", caption: "SPHERE RESIDENCY — VIDEO SYSTEMS" },
]

const IMAGES = SLIDES.map((s) => s.src)

export function CloudHero() {
  const sectionRef = useRef<HTMLElement>(null)
  const cloudRef = useRef<PointCloudHandles | null>(null)
  const [ready, setReady] = useState(false)
  const [slide, setSlide] = useState(0)

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end start"] })
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.55], [1, 0])
  const titleY = useTransform(scrollYProgress, [0, 1], ["0%", "40%"])

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    cloudRef.current?.setScroll(Math.min(1, v * 1.3))
  })

  const onReady = useCallback(() => setReady(true), [])
  const onSlide = useCallback((i: number) => setSlide(i), [])

  return (
    <section ref={sectionRef} className="relative h-[150svh] bg-black">
      <div className="sticky top-0 h-svh overflow-hidden">
        <div className="absolute inset-0">
          <PointCloud images={IMAGES} onReady={onReady} onSlide={onSlide} handlesRef={cloudRef} />
        </div>

        {/* filmic finish: grain + corner vignette */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.07] mix-blend-overlay"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2'/%3E%3C/filter%3E%3Crect width='160' height='160' filter='url(%23n)'/%3E%3C/svg%3E\")",
          }}
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute inset-0"
          style={{ background: "radial-gradient(ellipse 120% 90% at 50% 45%, transparent 55%, rgba(0,0,0,0.55) 100%)" }}
          aria-hidden="true"
        />

        <motion.div style={{ opacity: overlayOpacity, y: titleY }} className="pointer-events-none absolute inset-0 flex flex-col justify-end px-6 pb-16 md:px-12 md:pb-24">
          <div className="mx-auto w-full max-w-[1600px]">
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

        {/* slide caption: bottom-right, quiet */}
        <motion.div
          style={{ opacity: overlayOpacity }}
          className="absolute right-6 top-24 hidden md:right-12 md:block"
          aria-hidden="true"
        >
          <AnimatePresence mode="wait">
            <motion.p
              key={slide}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: ready ? 1 : 0, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="text-right font-mono text-[10px] tracking-[0.3em] text-zinc-600"
            >
              {SLIDES[slide].caption}
              <span className="mt-2 block text-zinc-700">
                {String(slide + 1).padStart(2, "0")} / {String(SLIDES.length).padStart(2, "0")}
              </span>
            </motion.p>
          </AnimatePresence>
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
