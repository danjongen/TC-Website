"use client"

import { motion, useScroll, useSpring, useTransform } from "framer-motion"
import { ArrowRight } from "lucide-react"
import { useRef, useEffect, useState } from "react"

export function Hero() {
  const containerRef = useRef<HTMLElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const [videoDuration, setVideoDuration] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const [loadingProgress, setLoadingProgress] = useState(0)
  const [videoSrc] = useState("https://hebbkx1anhila5yf.public.blob.vercel-storage.com/TC_TL_INTRA-ZKLgdJRVRbUbQYPAfBBunXwcuIseGG.mp4")
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  })

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 25,
    restDelta: 0.001,
  })

  const fadeOpacity = useTransform(scrollYProgress, [0.85, 1], [0, 1])

  useEffect(() => {
    if (isMobile) return

    const unsubscribe = smoothProgress.on("change", (latest) => {
      if (videoRef.current && videoDuration > 0 && !isLoading) {
        const time = latest * videoDuration
        if (Number.isFinite(time)) {
          videoRef.current.currentTime = time
        }
      }
    })
    return () => unsubscribe()
  }, [smoothProgress, videoDuration, isLoading, isMobile])

  useEffect(() => {
    if (isMobile) {
      setIsLoading(false)
      return
    }

    const video = videoRef.current
    if (!video) return

    const minLoadTime = 800
    const startTime = Date.now()

    const finishLoading = () => {
      const elapsed = Date.now() - startTime
      const remaining = Math.max(0, minLoadTime - elapsed)
      setTimeout(() => {
        setLoadingProgress(100)
        setTimeout(() => setIsLoading(false), 200)
      }, remaining)
    }

    const handleProgress = () => {
      if (video.duration > 0) {
        const buffered = video.buffered
        if (buffered.length > 0) {
          const loaded = buffered.end(buffered.length - 1)
          const progress = (loaded / video.duration) * 100
          setLoadingProgress(Math.min(progress, 90))
        }
      }
    }

    const handleLoadedMetadata = () => {
      setVideoDuration(video.duration)
      video.pause()
      finishLoading()
    }

    const handleError = () => {
      finishLoading()
    }

    video.addEventListener("progress", handleProgress)
    video.addEventListener("loadedmetadata", handleLoadedMetadata)
    video.addEventListener("error", handleError)

    if (video.readyState >= 1) {
      handleLoadedMetadata()
    }

    return () => {
      video.removeEventListener("progress", handleProgress)
      video.removeEventListener("loadedmetadata", handleLoadedMetadata)
      video.removeEventListener("error", handleError)
    }
  }, [isMobile])

  return (
    <section
      ref={containerRef}
      className={`relative border-b border-border ${isMobile ? "h-screen" : "h-[300vh]"}`}
      aria-label="Hero section showcasing TC Production Engineering and Technical Direction"
    >
      <div className="sticky top-0 h-screen flex items-start md:items-center overflow-hidden pt-24 md:pt-16">
        <div className="absolute inset-0 bg-data-grid pointer-events-none" aria-hidden="true" />

        <div className="container mx-auto px-6 grid lg:grid-cols-2 gap-8 md:gap-12 items-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
            <div
              className="inline-flex items-center gap-2 mb-4 md:mb-6 px-3 py-1.5 border border-gray-400 text-xs font-mono text-gray-200 uppercase tracking-widest"
              aria-hidden="true"
            >
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-white"></span>
              </span>
              Systems Online
            </div>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight leading-[1.1] mb-4 md:mb-6 text-balance">
              Technical Direction and Production Engineering for High-Stakes Events
            </h1>

            <p className="text-base md:text-lg text-gray-300 max-w-lg mb-6 md:mb-8 leading-relaxed">
              Premium production engineering and technical direction for global brands and artists, led by Executive
              Technical Producer Daniel Jongen.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="/contact"
                className="group inline-flex items-center justify-center gap-2 px-6 py-3 bg-emerald-500 text-white font-bold hover:bg-emerald-400 transition-colors duration-150"
              >
                Start a Project
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-150" />
              </a>
              <a
                href="/capabilities"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-gray-400 text-white font-medium hover:border-white hover:bg-white/5 transition-all duration-150"
              >
                View Services
              </a>
            </div>
          </motion.div>

          {!isMobile && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.1 }}
              className="relative h-[600px] w-full border border-border bg-black overflow-hidden"
              role="img"
              aria-label="Time-lapse visualization of technical direction and production engineering by Executive Technical Producer Daniel Jongen"
            >
              <motion.div
                className="absolute inset-0 bg-black z-10 pointer-events-none"
                style={{ opacity: fadeOpacity }}
                aria-hidden="true"
              />

              <div className="absolute top-0 left-0 w-full h-px bg-gray-400 z-20" aria-hidden="true" />
              <div
                className="absolute top-3 left-3 font-mono text-xs text-gray-300 z-20 bg-black/80 px-2 py-1 border border-gray-500"
                aria-live="polite"
              >
                {isLoading ? `LOADING ${Math.round(loadingProgress)}%` : "TIMELINE SYNCED"}
              </div>
              <div className="absolute bottom-3 right-3 font-mono text-xs text-gray-400 z-20" aria-hidden="true">
                SCROLL TO SCRUB
              </div>

              {isLoading && (
                <div
                  className="absolute inset-0 z-30 flex flex-col items-center justify-center bg-black"
                  role="status"
                  aria-label="Loading video"
                >
                  <div className="font-mono text-gray-400 text-xs mb-3 tracking-widest">LOADING TIMELINE</div>
                  <div className="w-48 h-px bg-gray-500 overflow-hidden">
                    <motion.div
                      className="h-full bg-white"
                      initial={{ width: 0 }}
                      animate={{ width: `${loadingProgress}%` }}
                      transition={{ duration: 0.1 }}
                    />
                  </div>
                </div>
              )}

              <video
                ref={videoRef}
                src={videoSrc}
                className="absolute inset-0 w-full h-full object-cover"
                muted
                playsInline
                preload="auto"
                crossOrigin="anonymous"
                aria-label="Time-lapse video of live event production setup, controlled by page scroll"
              />
            </motion.div>
          )}
        </div>
      </div>
    </section>
  )
}
