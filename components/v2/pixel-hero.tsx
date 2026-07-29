"use client"

import { useEffect, useRef, useState } from "react"
import { motion, useScroll, useTransform, useMotionValueEvent, useSpring, useMotionValue } from "framer-motion"
import Link from "next/link"
import { ScrambleText } from "./scramble-text"

const GREEN = "#00D26A"
const HERO_IMAGE = "/images/bsb-live-06.jpg"

/**
 * Pixel-resolve hero: the opening frame is a handful of giant pixels that
 * progressively resolve into a real project photo, then dissolve back into
 * pixels as the user scrolls away. Raw signal -> finished show.
 */
export function PixelHero() {
  const sectionRef = useRef<HTMLElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const imageRef = useRef<HTMLImageElement | null>(null)
  const [imageReady, setImageReady] = useState(false)

  // 0 = a few giant pixels, 1 = fully resolved photo
  const intro = useMotionValue(0)
  const introSpring = useSpring(intro, { stiffness: 28, damping: 14 })

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end start"] })
  // scrolling away re-pixelates and dims the image
  const scrollDegrade = useTransform(scrollYProgress, [0, 0.85], [0, 1])
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0])
  const titleY = useTransform(scrollYProgress, [0, 1], ["0%", "60%"])

  useEffect(() => {
    const img = new window.Image()
    img.src = HERO_IMAGE
    img.onload = () => {
      imageRef.current = img
      setImageReady(true)
      intro.set(1)
    }
  }, [intro])

  useEffect(() => {
    if (!imageReady) return
    const canvas = canvasRef.current
    const ctx = canvas?.getContext("2d")
    const img = imageRef.current
    if (!canvas || !ctx || !img) return

    const off = document.createElement("canvas")
    const offCtx = off.getContext("2d")!
    let raf = 0

    const draw = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      const w = canvas.clientWidth
      const h = canvas.clientHeight
      if (canvas.width !== w * dpr) {
        canvas.width = w * dpr
        canvas.height = h * dpr
      }

      const resolve = Math.max(0, Math.min(1, introSpring.get() - scrollDegrade.get()))
      // exponential ramp: 6px-wide frame at start, ~full res when resolved
      const cols = Math.max(6, Math.round(6 * Math.pow(w / 6, resolve)))
      const rows = Math.max(4, Math.round(cols * (h / w)))

      off.width = cols
      off.height = rows
      // cover-fit the source image into the low-res buffer
      const scale = Math.max(cols / img.width, rows / img.height)
      const sw = cols / scale
      const sh = rows / scale
      offCtx.imageSmoothingEnabled = true
      offCtx.drawImage(img, (img.width - sw) / 2, (img.height - sh) / 2, sw, sh, 0, 0, cols, rows)

      ctx.imageSmoothingEnabled = resolve > 0.985
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      ctx.drawImage(off, 0, 0, cols, rows, 0, 0, canvas.width, canvas.height)

      // green grid seams between pixels while unresolved
      if (resolve < 0.6) {
        ctx.strokeStyle = `rgba(0, 210, 106, ${0.25 * (1 - resolve / 0.6)})`
        ctx.lineWidth = 1
        const cw = canvas.width / cols
        for (let i = 1; i < cols; i++) {
          ctx.beginPath()
          ctx.moveTo(i * cw, 0)
          ctx.lineTo(i * cw, canvas.height)
          ctx.stroke()
        }
      }
      raf = requestAnimationFrame(draw)
    }

    raf = requestAnimationFrame(draw)
    return () => cancelAnimationFrame(raf)
  }, [imageReady, introSpring, scrollDegrade])

  return (
    <section ref={sectionRef} className="relative h-[130svh] bg-black">
      <div className="sticky top-0 h-svh overflow-hidden">
        <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" aria-hidden="true" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-black/60" />

        <motion.div style={{ opacity: overlayOpacity, y: titleY }} className="absolute inset-0 flex flex-col justify-end px-6 pb-20 md:pb-28">
          <div className="container mx-auto">
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2.2, duration: 0.8 }}
              className="mb-5 font-mono text-[11px] tracking-[0.35em] text-zinc-400 md:text-xs"
            >
              <span className="mr-3 inline-block h-2 w-2 animate-pulse rounded-full align-middle" style={{ background: GREEN }} />
              <ScrambleText text="BACKSTREET BOYS @ SPHERE - INTO THE MILLENNIUM" delay={2200} />
            </motion.p>

            <h1 className="select-none text-[12.5vw] font-black leading-[0.84] tracking-tighter text-white md:text-[9.5vw]">
              <motion.span
                className="block"
                initial={{ opacity: 0, y: 60 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 1.2 }}
              >
                WE MAKE
              </motion.span>
              <motion.span
                className="block"
                initial={{ opacity: 0, y: 60 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 1.4 }}
              >
                IMPOSSIBLE SHOWS{" "}
                <span style={{ color: GREEN, textShadow: `0 0 60px ${GREEN}50` }}>RUN</span>
              </motion.span>
            </h1>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.9, duration: 0.7 }}
              className="mt-10 flex flex-col gap-6 md:flex-row md:items-center md:justify-between"
            >
              <p className="max-w-md text-base leading-relaxed text-zinc-300 md:text-lg">
                Technically Creative engineers the systems behind 200+ productions in 30+ countries.
                When failure is not an option, we are the option.
              </p>
              <div className="flex gap-4">
                <Link
                  href="/contact"
                  data-cursor="hover"
                  className="px-8 py-4 font-mono text-sm tracking-widest text-black transition-transform hover:scale-[1.03]"
                  style={{ background: GREEN }}
                >
                  START A PROJECT
                </Link>
                <Link
                  href="/portfolio"
                  data-cursor="hover"
                  className="border border-white/30 px-8 py-4 font-mono text-sm tracking-widest text-white backdrop-blur transition-colors hover:border-[#00D26A] hover:text-[#00D26A]"
                >
                  THE WORK
                </Link>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
