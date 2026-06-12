"use client"

const STATS = [
  ["200+", "PRODUCTIONS"],
  ["99.97%", "UPTIME"],
  ["30+", "COUNTRIES"],
  ["<2HR", "RESPONSE"],
]

export function StatsLine() {
  return (
    <section aria-label="Key statistics" className="bg-black px-6 pt-[12vh] md:px-12">
      <div className="mx-auto flex w-full max-w-[1600px] flex-wrap gap-x-16 gap-y-6">
        {STATS.map(([value, label]) => (
          <div key={label} className="flex items-baseline gap-3 font-mono">
            <span className="text-xl text-white md:text-2xl">{value}</span>
            <span className="text-[11px] tracking-[0.2em] text-zinc-600">{label}</span>
          </div>
        ))}
      </div>
    </section>
  )
}
