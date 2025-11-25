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
  const [videoSrc, setVideoSrc] = useState("https://hebbkx1anhila5yf.public.blob.vercel-storage.com/TC_TL_INTRA-ZKLgdJRVRbUbQYPAfBBunXwcuIseGG.mp4")

  // Track scroll progress through the container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  })

  // Smooth out the scroll progress for smoother playback
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 50,
    damping: 20,
    restDelta: 0.001,
  })

  // Create a fade-to-black opacity value based on scroll progress
  const fadeOpacity = useTransform(scrollYProgress, [0.8, 0.95], [0, 1])
  const blurEffect = useTransform(scrollYProgress, [0.8, 0.95], ["0px", "10px"])
  const scaleEffect = useTransform(scrollYProgress, [0.8, 0.95], [1, 0.95])

  // Map scroll progress to video time
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

    console.log("[v0] Video component mounted")

    const minLoadTime = 1500
    const startTime = Date.now()

    const finishLoading = () => {
      const elapsed = Date.now() - startTime
      const remaining = Math.max(0, minLoadTime - elapsed)

      setTimeout(() => {
        setLoadingProgress(100)
        setTimeout(() => setIsLoading(false), 500)
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
      console.log("[v0] Video metadata loaded", video.duration)
      setVideoDuration(video.duration)
      video.pause()
      finishLoading()
    }

    const handleError = (e: any) => {
      console.warn("[v0] Video error occurred:", e)
      // Even if error occurs, we finish loading to remove the overlay so user might see something or at least not get stuck
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
        {/* Background Grid */}
        <div className="absolute inset-0 bg-tech-grid opacity-20 pointer-events-none" />

        <div className="container mx-auto px-6 grid lg:grid-cols-2 gap-8 md:gap-12 items-center relative z-10">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
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
                className="group inline-flex items-center justify-center gap-2 px-6 py-3 bg-white text-black font-bold uppercase tracking-wide hover:bg-gray-200 transition-colors"
              >
                Talk to our team
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
              <a
                href="#work"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-border text-white font-medium uppercase tracking-wide hover:border-white transition-colors"
              >
                View our work
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
            style={{ scale: scaleEffect }}
            className="relative h-[250px] sm:h-[300px] md:h-[600px] w-full border border-border bg-black/50 backdrop-blur-sm overflow-hidden rounded-sm"
          >
            {/* UI Overlays */}
            <div className="absolute inset-0 bg-tech-grid-sm opacity-10 z-10 pointer-events-none" />

            {/* Fade to black overlay */}
            <motion.div
              className="absolute inset-0 bg-black z-10 pointer-events-none"
              style={{ opacity: fadeOpacity, backdropFilter: blurEffect }}
            />

            <div className="absolute top-0 left-0 w-full h-1 bg-accent shadow-[0_0_10px_#23300e] z-20" />
            <div className="absolute top-4 left-4 font-mono text-xs text-emerald-500 z-20 bg-black/50 px-2 py-1">
              TIMELINE: {isLoading ? `INITIALIZING ${Math.round(loadingProgress)}%` : "SYNCED"}
            </div>
            <div className="absolute bottom-4 right-4 font-mono text-xs text-emerald-500 z-20 bg-black/50 px-2 py-1">
              PLAYBACK: SCRUB_MODE
            </div>

            {isLoading && (
              <div className="absolute inset-0 z-30 flex flex-col items-center justify-center bg-black/90 backdrop-blur-sm">
                <div className="font-mono text-emerald-500 text-xs mb-2 tracking-widest">SYSTEM INITIALIZING...</div>
                <div className="w-48 h-1 bg-zinc-800 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-emerald-500"
                    initial={{ width: 0 }}
                    animate={{ width: `${loadingProgress}%` }}
                    transition={{ duration: 0.2 }}
                  />
                </div>
              </div>
            )}

            {/* Video Element */}
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
