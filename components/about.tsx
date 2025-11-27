"use client"

import Image from "next/image"

export function About() {
  return (
    <section id="about" className="py-24 border-b border-border bg-background">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-12 items-start">
          <div>
            <h2 className="text-xs font-mono text-gray-400 mb-4 uppercase tracking-widest">01 / Mission</h2>
            <h3 className="text-3xl md:text-4xl font-bold leading-tight mb-8">
              We engineer the infrastructure behind high-stakes productions.
            </h3>

            <div className="relative aspect-video overflow-hidden border border-border">
              <Image
                src="/images/dsf3815.jpg"
                alt="Front of House control environment with technical displays and mixing consoles"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-4 left-4 text-xs font-mono text-gray-400 bg-black/80 px-2 py-1">
                FOH CONTROL / LIVE ENVIRONMENT
              </div>
            </div>
          </div>

          <div className="space-y-8">
            <p className="text-xl text-gray-300 leading-relaxed">
              Automation that scales. Systems that adapt. Execution you can count on.
            </p>

            <div className="relative aspect-[4/3] overflow-hidden border border-border">
              <Image
                src="/images/dsf2215.jpg"
                alt="Custom-engineered microphone rack system with precision labeling"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-4 left-4 text-xs font-mono text-gray-400 bg-black/80 px-2 py-1">
                CUSTOM FABRICATION / RF SYSTEMS
              </div>
            </div>

            <div className="grid grid-cols-2 gap-8 pt-8 border-t border-border">
              <div>
                <div className="text-3xl font-mono font-bold text-white mb-1">100%</div>
                <div className="text-xs font-mono text-gray-400 uppercase">Uptime Reliability</div>
              </div>
              <div>
                <div className="text-3xl font-mono font-bold text-white mb-1">Global</div>
                <div className="text-xs font-mono text-gray-400 uppercase">Deployment Capable</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
