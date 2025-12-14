const MATRIX_GREEN = "#00D26A"

// PERFORMANCE: Hero is Server Component - renders static HTML immediately
export function Hero() {
  return (
    <section className="py-24 md:py-32 border-b border-gray-200" aria-label="Hero section">
      <div className="container mx-auto px-6">
        <div className="max-w-3xl">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight leading-tight mb-8 text-black text-balance">
            We Handle Live Production Risks So You Don't Have To Regret Them Later.
          </h1>

          <div className="space-y-4 text-lg text-gray-600 leading-relaxed mb-10">
            <p>
              We've built and exited businesses in high-stakes operations. We've seen failures cascade from
              ambiguity—partial specs, shifting requirements, political hurdles, last-minute changes.
            </p>
            <p>
              We deliver reliability by naming risks upfront. No ego. No heroics. Just a system that works when it
              matters.
            </p>
          </div>

          <a
            href="/contact"
            className="inline-flex items-center px-6 py-3 bg-black text-white text-sm font-medium hover:bg-gray-800 transition-colors"
          >
            Start a Conversation
          </a>
        </div>
      </div>
    </section>
  )
}
