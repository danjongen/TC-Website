"use client"

import { useScroll, useSpring } from "framer-motion"
import { useRef, useState, useEffect } from "react"
import { X } from "lucide-react"

const MATRIX_GREEN = "#00D26A"

// PERFORMANCE: Animation-only client component
// Loaded via dynamic import with ssr: false
// Starts animation after mount to avoid blocking LCP
export default function HeroAnimation() {
  const containerRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const [videoDuration, setVideoDuration] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const [loadingProgress, setLoadingProgress] = useState(0)
  const [isMounted, setIsMounted] = useState(false)
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)
  const [autoProgressTimer, setAutoProgressTimer] = useState<NodeJS.Timeout | null>(null)
  const [isSkipped, setIsSkipped] = useState(false)
  const [showScrollHint, setShowScrollHint] = useState(true)

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)")
    setPrefersReducedMotion(mediaQuery.matches)

    const handleChange = () => setPrefersReducedMotion(mediaQuery.matches)
    mediaQuery.addEventListener("change", handleChange)
    return () => mediaQuery.removeEventListener("change", handleChange)
  }, [])

  useEffect(() => {
    requestAnimationFrame(() => {
      setIsMounted(true)
    })
  }, [])

  useEffect(() => {
    if (!isLoading && !isSkipped) {
      const timer = setTimeout(() => {
        setShowScrollHint(false)
        if (videoRef.current && videoDuration > 0) {
          // Auto-play video to end
          videoRef.current.currentTime = videoDuration
        }
      }, 4000)
      setAutoProgressTimer(timer)

      return () => {
        if (timer) clearTimeout(timer)
      }
    }
  }, [isLoading, isSkipped, videoDuration])

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  })

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: prefersReducedMotion ? 200 : 80,
    damping: prefersReducedMotion ? 50 : 25,
    restDelta: 0.001,
  })

  useEffect(() => {
    if (prefersReducedMotion || isSkipped) return

    const unsubscribe = smoothProgress.on("change", (latest) => {
      if (autoProgressTimer) {
        clearTimeout(autoProgressTimer)
        setAutoProgressTimer(null)
      }
      setShowScrollHint(false)

      if (videoRef.current && videoDuration > 0 && !isLoading) {
        const targetTime = latest * videoDuration
        if (Math.abs(videoRef.current.currentTime - targetTime) > 0.1) {
          videoRef.current.currentTime = targetTime
        }
      }
    })

    return () => unsubscribe()
  }, [smoothProgress, videoDuration, isLoading, prefersReducedMotion, isSkipped, autoProgressTimer])

  const isMobile = typeof window !== "undefined" && window.innerWidth < 768

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setVideoDuration(videoRef.current.duration)
      videoRef.current.currentTime = 0
    }
  }

  const handleProgress = () => {
    if (videoRef.current) {
      const buffered = videoRef.current.buffered
      if (buffered.length > 0) {
        const loaded = buffered.end(buffered.length - 1)
        const total = videoRef.current.duration
        setLoadingProgress((loaded / total) * 100)
        if (loaded >= total * 0.95) {
          setIsLoading(false)
        }
      }
    }
  }

  const handleSkip = () => {
    setIsSkipped(true)
    setShowScrollHint(false)
    if (autoProgressTimer) {
      clearTimeout(autoProgressTimer)
      setAutoProgressTimer(null)
    }
    if (videoRef.current && videoDuration > 0) {
      videoRef.current.currentTime = videoDuration
    }
  }

  if (isMobile) {
    return null
  }

  return (
    <div
      ref={containerRef}
      className="relative h-[600px] w-full border border-border bg-black overflow-hidden hidden md:block"
      style={{
        minHeight: "600px",
        opacity: isMounted ? 1 : 0,
        transition: "opacity 0.3s ease-in",
      }}
    >
      {/* Loading state - removed percentage display as per recommendation */}
      {isLoading && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black z-20">
          <div className="text-center space-y-4">
            <div className="text-sm font-mono text-gray-400">INITIALIZING SYSTEMS</div>
            <div className="w-64 h-1 bg-zinc-900 overflow-hidden">
              <div
                className="h-full transition-all duration-300"
                style={{
                  width: `${loadingProgress}%`,
                  backgroundColor: MATRIX_GREEN,
                  boxShadow: `0 0 10px ${MATRIX_GREEN}`,
                }}
              />
            </div>
          </div>
        </div>
      )}

      {!isLoading && showScrollHint && !isSkipped && (
        <div className="absolute inset-x-0 bottom-12 flex flex-col items-center justify-center z-30 pointer-events-none">
          <div className="text-xs font-mono text-gray-400 mb-2 animate-pulse">SCROLL TO EXPLORE</div>
          <button
            onClick={handleSkip}
            className="pointer-events-auto flex items-center gap-2 px-3 py-1.5 text-xs font-mono text-gray-400 hover:text-white border border-gray-700 hover:border-gray-500 bg-black/80 backdrop-blur-sm transition-all duration-150"
            aria-label="Skip scroll interaction"
          >
            <X className="w-3 h-3" />
            SKIP
          </button>
        </div>
      )}

      {/* Video element */}
      <video
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover"
        muted
        playsInline
        preload="metadata"
        onLoadedMetadata={handleLoadedMetadata}
        onProgress={handleProgress}
        poster="/images/dsf3815.jpg"
      >
        <source src="/videos/hero-video.mp4" type="video/mp4" />
        <track kind="captions" />
      </video>

      {/* Fallback for reduced motion */}
      {prefersReducedMotion && (
        <img
          src="/images/dsf3815.jpg"
          alt="TC Production Engineering - Technical Direction"
          className="absolute inset-0 w-full h-full object-cover"
        />
      )}

      {/* Overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60" />

      {/* Status indicator */}
      <div className="absolute bottom-6 right-6 flex items-center gap-2 px-3 py-1.5 bg-black/80 border border-gray-700 text-xs font-mono text-gray-300">
        <span className="relative flex h-1.5 w-1.5">
          <span
            className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75"
            style={{ backgroundColor: MATRIX_GREEN }}
          ></span>
          <span
            className="relative inline-flex rounded-full h-1.5 w-1.5"
            style={{ backgroundColor: MATRIX_GREEN }}
          ></span>
        </span>
        LIVE
      </div>
    </div>
  )
}
