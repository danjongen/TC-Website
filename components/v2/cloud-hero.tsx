"use client"

import { useEffect, useRef, useState, useCallback } from "react"
import dynamic from "next/dynamic"
import Image from "next/image"
import { m, AnimatePresence, useScroll, useTransform, useMotionValueEvent, useReducedMotion } from "framer-motion"
import Link from "next/link"
import { DUR, EASE_EXPO } from "@/lib/motion"
import type { PointCloudHandles } from "./point-cloud"
import { canRunCloud, heroSlide } from "./hero-signal"

const GREEN = "#00D26A"

// The WebGL cloud loads after first paint, never on the server
const PointCloud = dynamic(() => import("./point-cloud").then((mod) => mod.PointCloud), { ssr: false })

const SLIDES = [
  { src: "/images/bsb-live-06-cloud.jpg", caption: "BACKSTREET BOYS / SPHERE, LAS VEGAS" },
  { src: "/images/bsb-live-02-cloud.jpg", caption: "INTO THE MILLENNIUM / AUTOMATION & POWER" },
  { src: "/images/bsb-live-04-cloud.jpg", caption: "SPHERE RESIDENCY / VIDEO SYSTEMS" },
]

const IMAGES = SLIDES.map((s) => s.src)

const pad2 = (n: number) => String(n).padStart(2, "0")

/** Scroll progress at which the cloud is fully dispersed: 140svh of 200svh, when the curtain's 40vh gradient edge (app/page.tsx) has passed. */
const DISPERSE_END = 0.7
const disperse = (v: number) => Math.min(1, v / DISPERSE_END)

/**
 * Homepage hero. The section is two viewports tall with a pinned stage; the
 * page content after it (app/page.tsx) is pulled up by one viewport and
 * rises over the stage like a curtain while the cloud disperses underneath.
 * The cloud is fully dispersed (and stops rendering) exactly when the
 * curtain covers the viewport.
 */
export function CloudHero() {
  const sectionRef = useRef<HTMLElement>(null)
  const cloudRef = useRef<PointCloudHandles | null>(null)
  const [slide, setSlide] = useState(0)
  const [cloudOn, setCloudOn] = useState(false)
  const [cloudReady, setCloudReady] = useState(false)
  // once the overlay has faded and the curtain covers the CTAs, take them out of the tab order
  const [covered, setCovered] = useState(false)
  const reduceMotion = useReducedMotion()

  // enable the WebGL cloud only on capable, motion-friendly clients, after idle
  useEffect(() => {
    if (!canRunCloud()) return
    const w = window as unknown as {
      requestIdleCallback?: (cb: () => void) => number
      cancelIdleCallback?: (id: number) => void
    }
    if (w.requestIdleCallback) {
      const id = w.requestIdleCallback(() => setCloudOn(true))
      return () => w.cancelIdleCallback?.(id)
    }
    const id = window.setTimeout(() => setCloudOn(true), 200)
    return () => clearTimeout(id)
  }, [])

  // 0 when the section top meets the viewport top, 1 when its end does (200svh of scroll)
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end start"] })
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0])
  const titleY = useTransform(scrollYProgress, [0, 0.3], ["0%", "-8%"])
  const chromeOpacity = useTransform(scrollYProgress, [0, 0.12], [1, 0])

  // The curtain covers the viewport at progress 0.5 (100svh of scroll), but its
  // gradient edge still shows the stage until 0.7, so the particles keep
  // streaming toward the camera through that edge and finish dispersing (and
  // stop rendering) just as it passes.
  useMotionValueEvent(scrollYProgress, "change", (v) => {
    cloudRef.current?.setScroll(disperse(v))
    const isCovered = v >= 0.3
    setCovered((prev) => (prev === isCovered ? prev : isCovered))
  })

  const onReady = useCallback(() => {
    setCloudReady(true)
    // sync with the current scroll position (e.g. a reload mid-page)
    cloudRef.current?.setScroll(disperse(scrollYProgress.get()))
  }, [scrollYProgress])
  const onSlide = useCallback((i: number) => setSlide(i), [])

  // the embers on the curtain (embers.tsx) take their colours from this photo
  useEffect(() => heroSlide.set(IMAGES[slide]), [slide])

  return (
    <section ref={sectionRef} className="relative h-[200svh] bg-black">
      <div className="sticky top-0 h-svh overflow-hidden">
        {/* poster renders immediately; the point cloud fades in over it when ready */}
        <Image
          src="/images/bsb-live-06.jpg"
          alt="Backstreet Boys at Sphere, Las Vegas. Production by Technically Creative."
          fill
          priority
          sizes="100vw"
          className={`object-cover transition-opacity duration-600 ease-expo ${cloudReady ? "opacity-0" : "opacity-40"}`}
        />
        {cloudOn && (
          <div
            className={`absolute inset-0 transition-opacity duration-600 ease-expo ${cloudReady ? "opacity-100" : "opacity-0"}`}
          >
            <PointCloud images={IMAGES} onReady={onReady} onSlide={onSlide} handlesRef={cloudRef} />
          </div>
        )}

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

        <m.div
          style={{ opacity: overlayOpacity, y: reduceMotion ? 0 : titleY }}
          className="pointer-events-none absolute inset-0 flex flex-col justify-end px-6 pb-16 md:px-12 md:pb-24"
        >
          <div className="mx-auto w-full max-w-[1600px]">
            <h1
              data-vt="title"
              className="select-none text-[11.5vw] font-black leading-[0.86] tracking-[-0.04em] text-white md:text-[8.5vw]"
            >
              <span className="block overflow-hidden">
                <span className="tc-load-rise block" style={{ animationDelay: "150ms" }}>
                  WE MAKE IMPOSSIBLE
                </span>
              </span>
              <span className="block overflow-hidden">
                <span className="tc-load-rise block" style={{ animationDelay: "300ms" }}>
                  SHOWS <span style={{ color: GREEN }}>RUN</span>
                </span>
              </span>
            </h1>

            <div
              inert={covered}
              className="tc-load-fade-up pointer-events-auto mt-10 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between"
              style={{ animationDelay: "700ms" }}
            >
              <p className="max-w-md text-base leading-relaxed text-zinc-400 md:text-lg">
                Production engineering for live events where failure is not an option.
                200+ productions. 30+ countries. 99.97% uptime.
              </p>
              <div className="flex items-center gap-6">
                <Link
                  href="/contact"
                  data-cursor="hover"
                  className="inline-block whitespace-nowrap px-6 py-4 font-mono text-xs tracking-[0.2em] text-black transition-[filter,box-shadow] duration-300 ease-expo hover:brightness-110 hover:shadow-[0_0_30px_rgba(0,210,106,0.35)] sm:px-8 sm:text-sm"
                  style={{ background: GREEN }}
                >
                  START A PROJECT
                </Link>
                <Link
                  href="/portfolio"
                  data-cursor="hover"
                  className="whitespace-nowrap px-2 py-4 font-mono text-xs tracking-[0.2em] text-zinc-400 transition-colors duration-300 ease-expo hover:text-white sm:text-sm"
                >
                  THE WORK
                </Link>
              </div>
            </div>
          </div>
        </m.div>

        {/* slide caption */}
        <m.div
          style={{ opacity: chromeOpacity }}
          className="absolute right-6 top-24 hidden md:right-12 md:block"
          aria-hidden="true"
        >
          <div className="tc-load-fade" style={{ animationDelay: "1200ms" }}>
            <AnimatePresence mode="wait" initial={false}>
              <m.p
                key={slide}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: DUR.reveal, ease: EASE_EXPO }}
                className="text-right font-mono text-[10px] tracking-[0.3em] text-zinc-400"
              >
                {SLIDES[slide].caption}
                <span className="mt-2 block text-zinc-400">
                  {pad2(slide + 1)} / {pad2(SLIDES.length)}
                </span>
              </m.p>
            </AnimatePresence>
          </div>
        </m.div>

        {/* scroll hint */}
        <m.div
          style={{ opacity: chromeOpacity }}
          className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 md:block"
          aria-hidden="true"
        >
          <div
            className="tc-load-fade flex flex-col items-center gap-3 font-mono text-[10px] tracking-[0.4em] text-zinc-400"
            style={{ animationDelay: "1200ms" }}
          >
            {/* tracking adds trailing space; nudge so the label centres over the track */}
            <span className="pl-[0.4em]">SCROLL</span>
            <span className="tc-hint h-8 w-px" />
          </div>
        </m.div>
      </div>
    </section>
  )
}
