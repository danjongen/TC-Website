"use client"

import Image from "next/image"

const steps = [
  {
    name: "Discovery",
    desc: "Understand scope & constraints",
    detail: "Site surveys, stakeholder interviews, technical requirements gathering",
  },
  {
    name: "System Design",
    desc: "Architect the solution",
    detail: "CAD drawings, signal flow diagrams, equipment specifications",
  },
  {
    name: "Automation",
    desc: "Build repeatable workflows",
    detail: "Custom scripts, show control programming, integration testing",
  },
  {
    name: "Show Delivery",
    desc: "Execute with precision",
    detail: "Load-in, commissioning, operator training, live support",
  },
  {
    name: "Feedback Loop",
    desc: "Iterate & improve",
    detail: "Post-mortem analysis, documentation updates, system refinement",
  },
]

export function Approach() {
  return (
    <section id="approach" className="py-24 border-b border-border bg-[#0a0a0a]">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-start mb-16">
          <div>
            <h2 className="text-sm font-mono text-emerald-700 mb-4 uppercase tracking-widest">03 / How We Work</h2>
            <h3 className="text-3xl md:text-4xl font-bold leading-tight mb-6">
              We've systematized the repeatable—so we can focus on what's unique.
            </h3>
            <p className="text-lg text-muted-foreground">
              Every production follows our proven methodology, ensuring consistent quality while allowing creative
              flexibility where it matters.
            </p>
          </div>

          <div className="relative aspect-video overflow-hidden border border-border">
            <Image
              src="/images/dsf3917.jpg"
              alt="Large-scale stadium production with complex structural rigging and LED systems"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
              <div className="text-xs font-mono text-zinc-400">STADIUM SCALE / 50,000+ CAPACITY</div>
              <div className="text-xs font-mono text-emerald-500">SYSTEMS ONLINE</div>
            </div>
          </div>
        </div>

        <div className="relative mt-12">
          <div className="absolute top-6 left-0 w-full h-[1px] bg-border hidden md:block" />

          <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="relative flex flex-col items-center text-center group">
                <div className="w-12 h-12 bg-zinc-900 border border-border rounded-full mb-4 z-10 flex items-center justify-center group-hover:border-emerald-700 group-hover:bg-accent/20 transition-colors duration-150">
                  <span className="text-sm font-mono text-zinc-400 group-hover:text-emerald-500 transition-colors">
                    {(index + 1).toString().padStart(2, "0")}
                  </span>
                </div>
                <div className="text-sm font-bold text-white mb-1">{step.name}</div>
                <div className="text-xs text-muted-foreground mb-2">{step.desc}</div>
                <div className="text-[10px] text-zinc-400 leading-relaxed max-w-[140px]">{step.detail}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-16">
          <div className="relative aspect-square overflow-hidden border border-border group">
            <Image
              src="/images/dsf3010.jpg"
              alt="LED dome interior with immersive visual display"
              fill
              className="object-cover grayscale group-hover:grayscale-0 transition-all duration-300"
            />
            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors" />
            <div className="absolute bottom-2 left-2 text-[10px] font-mono text-zinc-400">LED SYSTEMS</div>
          </div>
          <div className="relative aspect-square overflow-hidden border border-border group">
            <Image
              src="/images/dscf9211.jpg"
              alt="Massive crowd with immersive LED canyon visual"
              fill
              className="object-cover grayscale group-hover:grayscale-0 transition-all duration-300"
            />
            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors" />
            <div className="absolute bottom-2 left-2 text-[10px] font-mono text-zinc-400">IMMERSIVE CONTENT</div>
          </div>
          <div className="relative aspect-square overflow-hidden border border-border group">
            <Image
              src="/images/66a0205.jpg"
              alt="Performers on floating platform with grid backdrop"
              fill
              className="object-cover grayscale group-hover:grayscale-0 transition-all duration-300"
            />
            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors" />
            <div className="absolute bottom-2 left-2 text-[10px] font-mono text-zinc-400">AUTOMATION</div>
          </div>
          <div className="relative aspect-square overflow-hidden border border-border group">
            <Image
              src="/images/dsf2215.jpg"
              alt="Custom microphone rack system"
              fill
              className="object-cover grayscale group-hover:grayscale-0 transition-all duration-300"
            />
            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors" />
            <div className="absolute bottom-2 left-2 text-[10px] font-mono text-zinc-400">FABRICATION</div>
          </div>
        </div>
      </div>
    </section>
  )
}
