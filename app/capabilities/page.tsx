import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

export const metadata: Metadata = {
  title: "Capabilities | TC Agency — Technically Creative",
  description:
    "Technical capabilities at TC Agency: production engineering, automation, 3D scanning, Unreal Engine integration, and custom fabrication.",
}

const services = [
  {
    num: "01",
    title: "Technical Direction",
    desc: "End-to-end technical leadership. One point of control for all production systems.",
    href: null,
  },
  {
    num: "02",
    title: "Production Management",
    desc: "Complete production oversight. Timeline, budget, and logistics executed with precision.",
    href: null,
  },
  {
    num: "03",
    title: "Design & Visualization",
    desc: "From concept to technical blueprint. Accurate visualization before build begins.",
    href: null,
  },
  {
    num: "04",
    title: "Workflow Automation",
    desc: "Custom automation that eliminates manual tasks. Faster setup. Fewer errors. Repeatable results.",
    href: "/services/automation",
  },
  {
    num: "05",
    title: "System Integration",
    desc: "All your tech talking to each other. One system. One interface. Zero gaps.",
    href: null,
  },
  {
    num: "06",
    title: "3D Scanning & Unreal",
    desc: "3D venue scanning and real-time visualization. See your show before you build it.",
    href: "/services/3d-scanning",
  },
  {
    num: "07",
    title: "Unreal Engine Integration",
    desc: "Real-time rendering, virtual production, and LED content workflows.",
    href: "/services/unreal-engine",
  },
  {
    num: "08",
    title: "Aerial Surveying",
    desc: "Aerial data capture for venue and site analysis. Topology, layouts, and conditions documented.",
    href: "/services/3d-scanning",
  },
  {
    num: "09",
    title: "Custom Fabrication",
    desc: "Custom-engineered hardware for productions that require solutions that don't exist yet.",
    href: null,
  },
]

export default function CapabilitiesPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <Navbar />

      <section className="pt-32 pb-24 border-b border-border">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl">
            <p className="text-sm font-mono text-emerald-500 mb-4 uppercase tracking-widest">02 / Capabilities</p>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-8">
              Full-spectrum production engineering.
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              From concept visualization to show execution. Every technical discipline under one roof, working as a
              unified system.
            </p>
          </div>
        </div>
      </section>

      <section className="py-24 border-b border-border">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {services.map((service) => (
              <div
                key={service.num}
                className="group p-6 border border-border bg-zinc-950 hover:bg-zinc-900 hover:border-zinc-700 transition-all duration-150"
              >
                <span className="text-xs font-mono text-emerald-500">{service.num}</span>
                <h3 className="text-lg font-bold mt-3 mb-2">{service.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4">{service.desc}</p>
                {service.href && (
                  <Link
                    href={service.href}
                    className="inline-flex items-center gap-2 text-sm font-mono text-emerald-500 hover:text-emerald-400"
                  >
                    Learn More <ArrowRight className="w-4 h-4" />
                  </Link>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 border-b border-border bg-zinc-950">
        <div className="container mx-auto px-6">
          <h2 className="text-2xl font-bold mb-8">Technology Partners</h2>
          <div className="flex flex-wrap gap-x-8 gap-y-4">
            {[
              "disguise",
              "Holoplot",
              "ROE Visual",
              "Tait Navigator",
              "Leica Geosystems",
              "MA Lighting",
              "BlackTrax",
              "Notch",
              "TouchDesigner",
            ].map((partner) => (
              <span key={partner} className="text-sm text-muted-foreground font-mono">
                {partner}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-6">Need a specific capability?</h2>
          <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
            If you don't see what you need, let's talk. We build custom solutions for unique challenges.
          </p>
          <a
            href="/contact"
            className="inline-flex items-center gap-2 px-6 py-3 bg-white text-black font-bold hover:bg-gray-200 transition-colors"
          >
            Discuss Your Project
          </a>
        </div>
      </section>

      <Footer />
    </main>
  )
}
