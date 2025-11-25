"use client"

import Image from "next/image"

const showcaseItems = [
  {
    image: "/images/dsf3917.jpg",
    label: "STRUCTURAL SYSTEMS",
    stat: "180,000 lbs",
    statLabel: "Rigging Load",
  },
  {
    image: "/images/dsf3010.jpg",
    label: "LED INTEGRATION",
    stat: "16K+",
    statLabel: "Pixels/sqm",
  },
  {
    image: "/images/dscf9211.jpg",
    label: "CONTENT DELIVERY",
    stat: "8K",
    statLabel: "Resolution",
  },
]

export function Showcase() {
  return (
    <section className="py-24 border-b border-border bg-background">
      <div className="container mx-auto px-6">
        <div className="mb-12">
          <h2 className="text-sm font-mono text-emerald-700 mb-4 uppercase tracking-widest">
            04 / Engineering at Scale
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl">
            From concept to execution, we deliver productions that push technical boundaries while maintaining
            operational reliability.
          </p>
        </div>

        {/* Large Feature Image */}
        <div className="relative aspect-[21/9] overflow-hidden border border-border mb-8">
          <Image
            src="/images/dsf3815.jpg"
            alt="Front of House control environment during live show"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />

          {/* Technical Overlay */}
          <div className="absolute top-6 left-6 space-y-2">
            <div className="text-xs font-mono text-emerald-500 flex items-center gap-2">
              <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
              LIVE MONITORING
            </div>
            <div className="text-2xl md:text-4xl font-bold text-white">Command & Control</div>
            <div className="text-sm text-zinc-400 max-w-md">
              Centralized show control with real-time system monitoring, automated failover, and instant diagnostics
              across all production systems.
            </div>
          </div>

          {/* Stats Overlay */}
          <div className="absolute bottom-6 right-6 flex gap-8">
            <div className="text-right">
              <div className="text-2xl font-bold text-white">{"<"}50ms</div>
              <div className="text-xs font-mono text-zinc-500">Latency</div>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-white">99.99%</div>
              <div className="text-xs font-mono text-zinc-500">Uptime</div>
            </div>
          </div>
        </div>

        {/* Grid of Technical Capabilities */}
        <div className="grid md:grid-cols-3 gap-4">
          {showcaseItems.map((item, index) => (
            <div key={index} className="relative aspect-[4/3] overflow-hidden border border-border group">
              <Image
                src={item.image || "/placeholder.svg"}
                alt={item.label}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />

              <div className="absolute bottom-0 left-0 right-0 p-6">
                <div className="text-xs font-mono text-emerald-500 mb-2">{item.label}</div>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-bold text-white">{item.stat}</span>
                  <span className="text-sm text-zinc-400">{item.statLabel}</span>
                </div>
              </div>

              {/* Technical Grid Overlay */}
              <div
                className="absolute inset-0 opacity-20 pointer-events-none"
                style={{
                  backgroundImage: `
                    linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
                    linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)
                  `,
                  backgroundSize: "20px 20px",
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
