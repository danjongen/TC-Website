import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import type { Metadata } from "next"
import Image from "next/image"
import { BreadcrumbSchema } from "@/components/structured-data"

export const metadata: Metadata = {
  title: "Approach | TC Agency — Technically Creative",
  description:
    "How TC Agency delivers complex productions: our systematic methodology from discovery to execution. Systematic. Documented. Repeatable.",
  keywords: [
    "production methodology",
    "technical direction process",
    "live event workflow",
    "production engineering approach",
    "event production phases",
  ],
  openGraph: {
    title: "Our Approach | TC Agency — Technically Creative",
    description:
      "Every project follows the same rigorous methodology. No surprises, no guesswork—just predictable, excellent results.",
    url: "https://tc.agency/approach",
    siteName: "TC Agency",
    images: [
      {
        url: "/images/dsf3917.jpg",
        width: 1200,
        height: 630,
        alt: "TC Agency production methodology",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Our Approach | TC Agency",
    description: "Systematic. Documented. Repeatable. See how we deliver complex productions.",
    images: ["/images/dsf3917.jpg"],
  },
  alternates: {
    canonical: "https://tc.agency/approach",
  },
}

const phases = [
  {
    num: "01",
    title: "Discovery",
    duration: "Weeks 1-2",
    desc: "We audit your current systems, identify friction points, and map your production requirements. No assumptions—just data.",
    outputs: ["Technical Requirements Doc", "System Architecture Map", "Risk Assessment"],
  },
  {
    num: "02",
    title: "Design",
    duration: "Weeks 3-4",
    desc: "We architect your solution: workflows, integrations, automation logic. Everything visualized before we build.",
    outputs: ["Workflow Diagrams", "Integration Specifications", "3D Previsualization"],
  },
  {
    num: "03",
    title: "Build",
    duration: "Weeks 5-8",
    desc: "We construct and configure all systems. Every component tested in isolation and integration.",
    outputs: ["Configured Systems", "Automation Scripts", "Integration Layer"],
  },
  {
    num: "04",
    title: "Deploy",
    duration: "Weeks 9-10",
    desc: "On-site installation, team training, and live rehearsal support. We stay until it works.",
    outputs: ["Installed Systems", "Trained Team", "Documentation Package"],
  },
  {
    num: "05",
    title: "Support",
    duration: "Ongoing",
    desc: "Post-show analysis, system updates, and continuous optimization. Your production gets better every cycle.",
    outputs: ["Performance Reports", "System Updates", "Process Refinements"],
  },
]

export default function ApproachPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "https://tc.agency" },
          { name: "Approach", url: "https://tc.agency/approach" },
        ]}
      />

      <Navbar />

      <section className="pt-32 pb-24 border-b border-border">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl">
            <p className="text-sm font-mono text-emerald-500 mb-4 uppercase tracking-widest">03 / Approach</p>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-8">Systematic. Documented. Repeatable.</h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Every project follows the same rigorous methodology. No surprises, no guesswork—just predictable,
              excellent results.
            </p>
          </div>
        </div>
      </section>

      <section className="py-24 border-b border-border">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <div className="sticky top-32">
              <div className="relative aspect-[4/3] bg-zinc-900 border border-border overflow-hidden">
                <Image src="/images/dsf3917.jpg" alt="Large-scale production setup" fill className="object-cover" />
              </div>
            </div>
            <div className="space-y-0">
              {phases.map((phase, index) => (
                <div
                  key={phase.num}
                  className={`p-6 border-l-2 border-border ${index === 0 ? "border-t border-r" : "border-r"} ${index === phases.length - 1 ? "border-b" : ""} hover:border-l-emerald-500 transition-colors`}
                >
                  <div className="flex items-center gap-4 mb-3">
                    <span className="text-sm font-mono text-emerald-500">{phase.num}</span>
                    <span className="text-xs font-mono text-muted-foreground uppercase">{phase.duration}</span>
                  </div>
                  <h3 className="text-xl font-bold mb-2">{phase.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-4">{phase.desc}</p>
                  <div className="flex flex-wrap gap-2">
                    {phase.outputs.map((output) => (
                      <span
                        key={output}
                        className="text-xs font-mono px-2 py-1 bg-zinc-900 border border-border text-muted-foreground"
                      >
                        {output}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-zinc-950 border-b border-border">
        <div className="container mx-auto px-6">
          <h2 className="text-2xl font-bold mb-8">What Makes Us Different</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { stat: "100%", label: "Documentation Rate", desc: "Every system fully documented" },
              { stat: "<2hr", label: "Response Time", desc: "During active productions" },
              { stat: "Zero", label: "Single Points of Failure", desc: "Redundancy built in" },
              { stat: "5+", label: "Years Average Tenure", desc: "Experienced, stable team" },
            ].map((item) => (
              <div key={item.label} className="p-6 border border-border">
                <p className="text-3xl font-bold text-emerald-500 mb-1">{item.stat}</p>
                <p className="text-sm font-bold mb-1">{item.label}</p>
                <p className="text-xs text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-6">See the approach in action</h2>
          <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
            Review our portfolio to see how this methodology delivers results on real productions.
          </p>
          <a
            href="/portfolio"
            className="inline-flex items-center gap-2 px-6 py-3 bg-white text-black font-bold hover:bg-gray-200 transition-colors"
          >
            View Portfolio
          </a>
        </div>
      </section>

      <Footer />
    </main>
  )
}
