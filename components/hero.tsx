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
    const unsubscribe = smoothProgress.on("change", (latest) => {
      if (videoRef.current && videoDuration > 0 && !isLoading) {
        const time = latest * videoDuration
        if (Number.isFinite(time)) {
          videoRef.current.currentTime = time
        }
      }
    })
    return () => unsubscribe()
  }, [smoothProgress, videoDuration, isLoading])

  useEffect(() => {
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
  }, [])

  return (
    <section ref={containerRef} className="relative h-[300vh] border-b border-border">
      <div className="sticky top-0 h-screen flex items-start md:items-center overflow-hidden pt-24 md:pt-16">
        <div className="absolute inset-0 bg-tech-grid opacity-20 pointer-events-none" />

        <div className="container mx-auto px-6 grid lg:grid-cols-2 gap-8 md:gap-12 items-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
            <div className="inline-flex items-center gap-2 mb-4 md:mb-6 px-2 py-1 border border-accent text-xs font-mono text-emerald-500 uppercase tracking-widest">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              System Status: Online
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold tracking-tighter leading-[1.1] mb-4 md:mb-6">
              Complex productions. <br />
              <span className="text-muted-foreground">Made manageable.</span>
            </h1>
            <p className="text-base md:text-xl text-muted-foreground max-w-md mb-6 md:mb-8 leading-relaxed">
              High-stakes shows delivered through automation, scalable systems, and systematic execution.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="#contact"
                className="group inline-flex items-center justify-center gap-2 px-6 py-3 bg-white text-black font-bold hover:bg-gray-200 transition-colors duration-150"
              >
                Start a Project
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-150" />
              </a>
              <a
                href="#services"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-border text-white font-medium hover:border-white transition-colors duration-150"
              >
                Explore Services
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            className="relative h-[250px] sm:h-[300px] md:h-[600px] w-full border border-border bg-black/50 overflow-hidden"
          >
            <div className="absolute inset-0 bg-tech-grid-sm opacity-10 z-10 pointer-events-none" />

            <motion.div
              className="absolute inset-0 bg-black z-10 pointer-events-none"
              style={{ opacity: fadeOpacity }}
            />

            <div className="absolute top-0 left-0 w-full h-1 bg-accent z-20" />
            <div className="absolute top-4 left-4 font-mono text-xs text-emerald-500 z-20 bg-black/50 px-2 py-1">
              TIMELINE: {isLoading ? `${Math.round(loadingProgress)}%` : "SYNCED"}
            </div>
            <div className="absolute bottom-4 right-4 font-mono text-xs text-emerald-500 z-20 bg-black/50 px-2 py-1">
              SCRUB MODE
            </div>

            {isLoading && (
              <div className="absolute inset-0 z-30 flex flex-col items-center justify-center bg-black/90">
                <div className="font-mono text-emerald-500 text-xs mb-2 tracking-widest">LOADING</div>
                <div className="w-48 h-1 bg-zinc-800 overflow-hidden">
                  <motion.div
                    className="h-full bg-emerald-500"
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
            />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
