import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import type { Metadata } from "next"
import Image from "next/image"
import { BreadcrumbSchema } from "@/components/structured-data"

// Marketing pages should be static to enable CDN edge caching
export const dynamic = "force-static"
export const revalidate = 86400 // Revalidate every 24 hours

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
    desc: "We audit your systems, identify friction points, and map your production requirements. No assumptions — just data.",
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

const differentiators = [
  { stat: "100%", label: "Documentation Rate", desc: "Every system fully documented" },
  { stat: "<2hr", label: "Response Time", desc: "During active productions" },
  { stat: "Zero", label: "Single Points of Failure", desc: "Redundancy built in" },
  { stat: "5+", label: "Years Average Tenure", desc: "Experienced, stable team" },
]

export default function ApproachPage() {
  return (
    <main className="min-h-screen bg-black text-white">
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "https://tc.agency" },
          { name: "Approach", url: "https://tc.agency/approach" },
        ]}
      />

      <Navbar />

      {/* Hero */}
      <section className="pt-40 md:pt-48 pb-[14vh]">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl">
            <p className="mb-6 font-mono text-[11px] tracking-[0.2em] text-zinc-500">[ 03 — APPROACH ]</p>
            <h1 className="text-5xl md:text-7xl font-semibold tracking-[-0.03em] text-white mb-8">
              Systematic. Documented. Repeatable.
            </h1>
            <p className="text-lg leading-relaxed text-zinc-400 max-w-xl">
              Every project follows the same rigorous methodology. No surprises, no guesswork — just predictable,
              excellent results.
            </p>
          </div>
        </div>
      </section>

      {/* Full-width image break */}
      <section aria-label="Large-scale production" className="relative">
        <div className="relative aspect-[21/9] w-full">
          <Image
            src="/images/bsb-live-04.jpg"
            alt="Large-scale live production at the Sphere — the methodology in action"
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
          <div className="absolute bottom-6 left-6">
            <p className="font-mono text-[11px] tracking-[0.2em] text-zinc-400">THE METHODOLOGY IN ACTION</p>
          </div>
        </div>
      </section>

      {/* Phases — indexed rows */}
      <section className="py-[18vh]">
        <div className="container mx-auto px-6">
          <p className="mb-6 font-mono text-[11px] tracking-[0.2em] text-zinc-500">[ 04 — THE PROCESS ]</p>
          <div>
            {phases.map((phase, index) => (
              <article key={phase.num}>
                {index > 0 && <div className="h-px bg-zinc-900" aria-hidden="true" />}
                <div className="py-12 grid lg:grid-cols-12 gap-6">
                  <div className="lg:col-span-2 flex items-baseline gap-6 lg:block">
                    <span className="font-mono text-xs tracking-[0.2em] text-zinc-500">{phase.num}</span>
                    <p className="font-mono text-[11px] tracking-[0.2em] text-zinc-500 lg:mt-2">
                      {phase.duration.toUpperCase()}
                    </p>
                  </div>
                  <div className="lg:col-span-6">
                    <h2 className="text-3xl md:text-5xl font-semibold tracking-[-0.03em] text-white mb-4">
                      {phase.title}
                    </h2>
                    <p className="text-lg leading-relaxed text-zinc-400 max-w-xl">{phase.desc}</p>
                  </div>
                  <div className="lg:col-span-4">
                    <p className="font-mono text-[11px] tracking-[0.2em] text-zinc-500 mb-3">OUTPUTS</p>
                    <ul className="space-y-2">
                      {phase.outputs.map((output) => (
                        <li key={output} className="text-sm leading-relaxed text-zinc-400">
                          {output}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Differentiators */}
      <section className="py-[14vh]">
        <div className="container mx-auto px-6">
          <p className="mb-6 font-mono text-[11px] tracking-[0.2em] text-zinc-500">[ 05 — WHAT MAKES US DIFFERENT ]</p>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-12">
            {differentiators.map((item) => (
              <div key={item.label}>
                <p className="text-3xl md:text-5xl font-semibold tracking-[-0.03em] text-white">{item.stat}</p>
                <p className="font-mono text-[11px] tracking-[0.2em] text-zinc-500 mt-3">
                  {item.label.toUpperCase()}
                </p>
                <p className="text-sm leading-relaxed text-zinc-400 mt-2">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-[14vh]">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl md:text-5xl font-semibold tracking-[-0.03em] text-white mb-6">
            See the approach in action
          </h2>
          <p className="text-lg leading-relaxed text-zinc-400 mb-10 max-w-xl">
            Review our portfolio to see how this methodology delivers on real productions.
          </p>
          <a
            href="/portfolio"
            className="font-mono text-xs tracking-[0.2em] text-zinc-500 hover:text-[#00D26A] transition-colors duration-300"
          >
            VIEW PORTFOLIO →
          </a>
        </div>
      </section>

      <Footer />
    </main>
  )
}
