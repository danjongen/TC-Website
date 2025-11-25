"use client"

const steps = [
  { name: "Discovery", desc: "Understand scope & constraints" },
  { name: "System Design", desc: "Architect the solution" },
  { name: "Automation", desc: "Build repeatable workflows" },
  { name: "Show Delivery", desc: "Execute with precision" },
  { name: "Feedback Loop", desc: "Iterate & improve" },
]

export function Approach() {
  return (
    <section id="approach" className="py-24 border-b border-border bg-[#0a0a0a]">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h2 className="text-sm font-mono text-emerald-700 mb-4 uppercase tracking-widest">03 / How We Work</h2>
          <h3 className="text-3xl md:text-5xl font-bold leading-tight mb-8">
            We've systematized the repeatable—so we can focus on what's unique.
          </h3>
        </div>

        <div className="relative mt-20">
          <div className="absolute top-2 left-0 w-full h-[1px] bg-border hidden md:block" />

          <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="relative flex flex-col items-center text-center group">
                <div className="w-4 h-4 bg-background border-2 border-border rounded-full mb-4 z-10 group-hover:border-emerald-700 group-hover:bg-accent transition-colors duration-150" />
                <div className="text-sm font-bold text-white mb-1">{step.name}</div>
                <div className="text-xs text-muted-foreground">{step.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
