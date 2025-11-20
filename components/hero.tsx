"use client"

import { motion, useScroll, useSpring } from "framer-motion"
import { ArrowRight } from "lucide-react"
import { useRef, useEffect, useState } from "react"

export function Hero() {
  const containerRef = useRef<HTMLElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const [videoDuration, setVideoDuration] = useState(0)

  // Track scroll progress through the container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  })

  // Smooth out the scroll progress for smoother playback
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  })

  // Map scroll progress to video time
  // We'll update the video time in a useEffect to avoid render loop issues
  useEffect(() => {
    const unsubscribe = smoothProgress.on("change", (latest) => {
      if (videoRef.current && videoDuration > 0) {
        const time = latest * videoDuration
        // Ensure we don't exceed duration
        videoRef.current.currentTime = Math.min(time, videoDuration)
      }
    })
    return () => unsubscribe()
  }, [smoothProgress, videoDuration])

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setVideoDuration(videoRef.current.duration)
    }
  }

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
            <div className="inline-block mb-4 md:mb-6 px-2 py-1 border border-accent text-xs font-mono text-emerald-500 uppercase tracking-widest">
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
            className="relative h-[250px] sm:h-[300px] md:h-[600px] w-full border border-border bg-black/50 backdrop-blur-sm overflow-hidden rounded-sm"
          >
            {/* UI Overlays */}
            <div className="absolute inset-0 bg-tech-grid-sm opacity-10 z-10 pointer-events-none" />
            <div className="absolute top-0 left-0 w-full h-1 bg-accent shadow-[0_0_10px_#23300e] z-20" />
            <div className="absolute top-4 left-4 font-mono text-xs text-emerald-500 z-20 bg-black/50 px-2 py-1">
              TIMELINE: SYNCED
            </div>
            <div className="absolute bottom-4 right-4 font-mono text-xs text-emerald-500 z-20 bg-black/50 px-2 py-1">
              PLAYBACK: SCRUB_MODE
            </div>

            {/* Video Element */}
            <video
              ref={videoRef}
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Technical_timelapse_visualization_202511201%20%281%29-2YLj5WqSFM1jKU4ycO8cYbvM4bMyTB.mp4"
              className="absolute inset-0 w-full h-full object-cover"
              muted
              playsInline
              preload="auto"
              onLoadedMetadata={handleLoadedMetadata}
            />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
