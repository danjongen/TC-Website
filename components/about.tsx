"use client"

export function About() {
  return (
    <section id="about" className="py-24 border-b border-border bg-background">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-12 items-start">
          <div>
            <h2 className="text-sm font-mono text-emerald-700 mb-4 uppercase tracking-widest">01 / Mission</h2>
            <h3 className="text-3xl md:text-4xl font-bold leading-tight">
              We engineer the infrastructure behind high-stakes productions.
            </h3>
          </div>

          <div className="space-y-8">
            <p className="text-xl text-muted-foreground leading-relaxed">
              Automation that scales. Systems that adapt. Execution you can count on.
            </p>

            <div className="grid grid-cols-2 gap-8 pt-8 border-t border-border">
              <div>
                <div className="text-3xl font-bold text-white mb-1">100%</div>
                <div className="text-xs font-mono text-muted-foreground uppercase">Uptime Reliability</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-white mb-1">Global</div>
                <div className="text-xs font-mono text-muted-foreground uppercase">Deployment Capable</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
