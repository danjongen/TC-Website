const STATS = [
  ["200+", "PRODUCTIONS"],
  ["99.97%", "UPTIME"],
  ["30+", "COUNTRIES"],
  ["<2HR", "RESPONSE"],
]

/** First thing on the homepage curtain, right under its gradient edge. */
export function StatsLine() {
  return (
    <section aria-label="Key statistics" className="bg-black px-6 pt-[4vh] md:px-12">
      <div className="mx-auto flex w-full max-w-[1600px] flex-wrap gap-x-16 gap-y-6">
        {STATS.map(([value, label]) => (
          <div key={label} data-reveal="fade" className="flex items-baseline gap-3 font-mono">
            <span className="text-xl text-white md:text-2xl">{value}</span>
            <span className="text-[11px] tracking-[0.2em] text-zinc-400">{label}</span>
          </div>
        ))}
      </div>
    </section>
  )
}
