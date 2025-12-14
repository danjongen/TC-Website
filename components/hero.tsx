const MATRIX_GREEN = "#00D26A"

// PERFORMANCE: Hero is Server Component - renders static HTML immediately
export function Hero() {
  return (
    <section className="relative border-b border-border py-32 md:py-48" aria-label="Hero section">
      <div className="absolute inset-0 bg-data-grid pointer-events-none opacity-30" aria-hidden="true" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl">
          <div
            className="inline-flex items-center gap-2 mb-8 px-3 py-1.5 border border-gray-700 text-xs font-mono text-gray-400 uppercase tracking-widest"
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
            Live Production Operators
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1] mb-8 text-balance">
            In Live Environments, Ambiguity Kills Reliability.
          </h1>

          <p className="text-xl md:text-2xl text-gray-300 mb-12 leading-relaxed max-w-3xl">
            We Name It, Own It, and Execute Anyway—Only If You Agree to the Stakes.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href="/contact"
              className="group inline-flex items-center justify-center gap-2 px-8 py-4 font-bold transition-all duration-150 text-base"
              style={{ backgroundColor: MATRIX_GREEN, color: "#000000" }}
            >
              Work With Us
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
