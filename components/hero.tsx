"use client"

import Link from "next/link"
import dynamic from "next/dynamic"

const MATRIX_GREEN = "#00D26A"

const HeroAnimation = dynamic(() => import("./hero-animation"), {
  ssr: false,
  loading: () => <div className="absolute inset-0 bg-gradient-to-b from-zinc-900 to-black" />,
})

export function Hero() {
  return (
    <section
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16"
      aria-label="Hero section"
    >
      {/* Background Animation Layer */}
      <HeroAnimation />

      {/* Static Content Layer - LCP Element */}
      <div className="relative z-10 container mx-auto px-6 py-24 md:py-32">
        <div className="max-w-4xl mx-auto text-center">
          {/* Hidden SEO H1 */}
          <h1 className="sr-only">Technical Direction and Production Engineering for High-Stakes Events</h1>

          {/* Visible Headline */}
          <p className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-tight mb-6 text-white text-balance">
            Production Engineering, <span style={{ color: MATRIX_GREEN }}>Done Right.</span>
          </p>

          <p className="text-xl md:text-2xl text-zinc-400 mb-4">Systems. Automation. Reliability.</p>

          <p className="text-lg text-zinc-500 mb-10 max-w-2xl mx-auto">
            Executive Technical Producer Daniel Jongen and TC Agency deliver technical direction for high-stakes live
            events.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-8 py-4 text-black font-medium transition-all hover:scale-105"
              style={{ backgroundColor: MATRIX_GREEN }}
            >
              Start a Project
              <span className="ml-2">→</span>
            </Link>
            <Link
              href="/services"
              className="inline-flex items-center justify-center px-8 py-4 border border-zinc-700 text-white font-medium hover:bg-zinc-900 transition-colors"
            >
              View Services
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
