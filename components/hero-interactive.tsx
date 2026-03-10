"use client"

import { useScroll, useSpring, useTransform } from "framer-motion"
import { useRef, useState } from "react"

interface HeroInteractiveProps {
  videoSrc: string
  isMobile: boolean
}

const MATRIX_GREEN = "#00D26A"

// PERFORMANCE: This component is client-only for video scroll interactions
// Lazy-loaded via React.lazy() to defer Framer Motion bundle (~80KB)
// DO NOT move back to Server Component - animations require client hooks
export function HeroInteractive({ videoSrc, isMobile }: HeroInteractiveProps) {
  const containerRef = useRef<HTMLElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const [videoDuration, setVideoDuration] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const [loadingProgress, setLoadingProgress] = useState(0)

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

  return (
    <section
      ref={containerRef}
      className={`relative border-b border-border ${isMobile ? "h-screen" : "h-[300vh]"}`}
      aria-label="Hero section showcasing TC Production Engineering and Technical Direction"
    >
      {/* Placeholder for additional code */}
    </section>
  )
}
