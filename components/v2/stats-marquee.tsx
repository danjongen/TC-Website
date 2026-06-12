"use client"

const STATS = [
  "200+ PRODUCTIONS DELIVERED",
  "99.97% SYSTEM UPTIME",
  "30+ COUNTRIES",
  "<2HR RESPONSE TIME",
  "ZERO SHOW-STOPPING FAILURES",
]

export function StatsMarquee() {
  const row = [...STATS, ...STATS]
  return (
    <section className="overflow-hidden border-y border-zinc-900 bg-black py-6" aria-label="Key statistics">
      <div className="marquee-track flex w-max items-center gap-12 whitespace-nowrap">
        {row.map((stat, i) => (
          <span key={i} className="flex items-center gap-12 font-mono text-sm tracking-[0.25em] text-zinc-500">
            {stat}
            <span className="text-[#00D26A]">/</span>
          </span>
        ))}
      </div>
    </section>
  )
}
