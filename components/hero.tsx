import { HeroInteractive } from "./hero-interactive"
import { ArrowRight } from "lucide-react"

const MATRIX_GREEN = "#00D26A"

export function Hero() {
  return (
    <section className="relative border-b border-border h-screen" aria-label="Hero section">
      <div className="sticky top-0 h-screen flex items-start md:items-center overflow-hidden pt-24 md:pt-16">
        <div className="absolute inset-0 bg-data-grid pointer-events-none" aria-hidden="true" />

        <div className="container mx-auto px-6 grid lg:grid-cols-2 gap-8 md:gap-12 items-center relative z-10">
          <div>
            <div
              className="inline-flex items-center gap-2 mb-4 md:mb-6 px-3 py-1.5 border border-gray-400 text-xs font-mono text-gray-200 uppercase tracking-widest glow-matrix"
              aria-hidden="true"
            >
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
              Systems Online
            </div>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight leading-[1.1] mb-4 md:mb-6 text-balance">
              Production Engineering, Done Right.
            </h1>

            <span className="sr-only">Technical Direction and Production Engineering for High-Stakes Events</span>

            <p className="text-base md:text-lg text-gray-300 max-w-lg mb-6 md:mb-8 leading-relaxed">
              Systems. Automation. Reliability.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="/contact"
                className="group inline-flex items-center justify-center gap-2 px-6 py-3 font-bold transition-all duration-150 glow-matrix-hover"
                style={{ backgroundColor: MATRIX_GREEN, color: "#000000" }}
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
          </div>

          {/* Video section - only render if not mobile */}
          <noscript>
            <div className="relative h-[600px] w-full border border-border bg-black overflow-hidden hidden md:block">
              <img
                src="/images/dsf3815.jpg"
                alt="TC Production Engineering - Technical Direction"
                className="w-full h-full object-cover"
              />
            </div>
          </noscript>
          <HeroInteractive />
        </div>
      </div>
    </section>
  )
}
