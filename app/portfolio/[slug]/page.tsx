import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, ArrowRight } from "lucide-react"
import { notFound } from "next/navigation"

const projects: Record<
  string,
  {
    title: string
    client: string
    role: string
    year: string
    image: string
    description: string
    challenge: string
    solution: string
    results: string[]
    specs: { label: string; value: string }[]
    services: { title: string; href: string; desc: string }[]
  }
> = {
  "backstreet-boys-into-the-millennium": {
    title: "Into The Millennium",
    client: "Backstreet Boys",
    role: "Automation, Power & Data Systems",
    year: "2024",
    image: "/images/66a0205.jpg",
    description:
      "A 50+ city world tour featuring a self-contained touring control infrastructure (UFO Pod) engineered for RF-hostile arena environments. The system delivered conditioned power, 60 GHz deterministic backhaul, three-layer timecode redundancy, and full remote observability from a single roll-in rack.",
    challenge:
      "18,000 devices in a steel bowl. 2.4 GHz unusable. 5 GHz collapses under audience ingress load. Venue Wi-Fi unpredictable. Shore power unstable. WAN subject to dropouts. The production needed infrastructure that operated independently of every one of those failure domains.",
    solution:
      "We designed a layered resilience model where every critical system had a fallback. Power continuity via inline EcoFlow battery with shore power as primary input, eliminating reboots during generator sag or ISP power resets. Transport via 60 GHz point-to-point backhaul (Wave AP to Wave Nano) providing deterministic, directional throughput immune to crowd RF collapse. Dual ISP WAN with health-checked auto failover through a Dream Machine core. Three-layer timecode redundancy: sACN as primary, wireless distribution as Layer 1 fallback, and a dedicated direct RF timecode path as Layer 2. If sACN failed, the network degraded, or the wireless path dropped, an automatic RF switch engaged and sent timecode directly to the receiving unit, removing all IP stack dependency. Network failure did not equal timing failure. A custom unified GUI integrated Dream Machine API, UISP metrics, Wave link health, EcoFlow battery telemetry, circuit-level draw monitoring, and integrated rack cameras into a single observability layer. Nothing was blind.",
    results: [
      "Stable 60 GHz modulation under full 18,000-person crowd load",
      "Zero timing failures across 50+ shows via RF timecode failover",
      "Full remote observability: link health, battery SOC, circuit loads, rack cameras",
      "Single roll-in deployment: double-wide slam rack with integrated mast",
      "No reboots during generator sag or ISP power resets",
    ],
    specs: [
      { label: "Sustained Draw", value: "~450W" },
      { label: "Backhaul", value: "60 GHz PtP" },
      { label: "Timecode Layers", value: "3" },
      { label: "Automation Axes", value: "48" },
      { label: "Data Points", value: "12,000+" },
      { label: "Power Headroom", value: ">2x" },
    ],
    services: [
      {
        title: "Workflow Automation",
        href: "/services/workflow-automation",
        desc: "Automated show control, timecode distribution, and data pipeline systems",
      },
      {
        title: "System Integration",
        href: "/services/system-integration",
        desc: "Multi-vendor unification: 60 GHz backhaul, sACN, RF timecode, power conditioning",
      },
    ],
  },
  "sphere-residency": {
    title: "Sphere Residency",
    client: "The Sphere",
    role: "Technical Direction",
    year: "2024",
    image: "/images/dsf3010.jpg",
    description:
      "Technical direction for immersive content experiences inside the world's largest spherical structure.",
    challenge:
      "Managing the unprecedented scale of the Sphere's 160,000 square foot LED interior while maintaining frame-perfect synchronization.",
    solution:
      "Developed custom previsualization workflows and real-time content management systems to handle the venue's unique geometry and massive pixel count.",
    results: [
      "16K x 16K content resolution managed",
      "Frame-accurate sync across entire surface",
      "Custom previsualization pipeline",
      "Real-time content switching system",
    ],
    specs: [
      { label: "Resolution", value: "16K x 16K" },
      { label: "LED Panels", value: "164,000" },
      { label: "Pixel Count", value: "1.2B" },
      { label: "Refresh Rate", value: "120Hz" },
    ],
    services: [
      {
        title: "Technical Direction",
        href: "/services/technical-direction",
        desc: "End-to-end technical oversight for the world's most complex venue",
      },
      {
        title: "Design & Visualization",
        href: "/services/design-visualization",
        desc: "Custom previsualization pipeline for dome geometry",
      },
      {
        title: "System Integration",
        href: "/services/system-integration",
        desc: "16K content distribution across 164,000 LED panels",
      },
    ],
  },
}

export async function generateStaticParams() {
  return Object.keys(projects).map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const project = projects[slug]
  if (!project) return { title: "Project Not Found" }
  return {
    title: `${project.title} | TC Agency Portfolio`,
    description: project.description,
  }
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const project = projects[slug]

  if (!project) {
    notFound()
  }

  return (
    <main className="min-h-screen bg-background text-foreground">
      <Navbar />

      <section className="pt-32 pb-12 border-b border-border">
        <div className="container mx-auto px-6">
          <Link
            href="/portfolio"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-white mb-8"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Portfolio
          </Link>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <div>
              <p className="text-sm font-mono text-emerald-500 mb-2">
                {project.client} / {project.year}
              </p>
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight">{project.title}</h1>
            </div>
            <span className="text-xs font-mono text-muted-foreground uppercase border border-border px-3 py-2">
              {project.role}
            </span>
          </div>
        </div>
      </section>

      <section className="py-12 border-b border-border">
        <div className="container mx-auto px-6">
          <div className="relative aspect-[21/9] bg-zinc-900 border border-border overflow-hidden">
            <Image src={project.image || "/placeholder.svg"} alt={project.title} fill className="object-cover" />
          </div>
        </div>
      </section>

      <section className="py-24 border-b border-border">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-3 gap-16">
            <div className="lg:col-span-2 space-y-12">
              <div>
                <h2 className="text-sm font-mono text-emerald-500 uppercase mb-4">Overview</h2>
                <p className="text-xl text-muted-foreground leading-relaxed">{project.description}</p>
              </div>
              <div>
                <h2 className="text-sm font-mono text-emerald-500 uppercase mb-4">Challenge</h2>
                <p className="text-muted-foreground leading-relaxed">{project.challenge}</p>
              </div>
              <div>
                <h2 className="text-sm font-mono text-emerald-500 uppercase mb-4">Solution</h2>
                <p className="text-muted-foreground leading-relaxed">{project.solution}</p>
              </div>
              <div>
                <h2 className="text-sm font-mono text-emerald-500 uppercase mb-4">Results</h2>
                <ul className="space-y-2">
                  {project.results.map((result, i) => (
                    <li key={i} className="flex items-center gap-3 text-muted-foreground">
                      <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full shrink-0" />
                      {result}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="space-y-8">
              <div>
                <h2 className="text-sm font-mono text-emerald-500 uppercase mb-4">Technical Specs</h2>
                <div className="space-y-4">
                  {project.specs.map((spec) => (
                    <div key={spec.label} className="p-4 border border-border bg-zinc-950">
                      <p className="text-2xl font-bold">{spec.value}</p>
                      <p className="text-xs text-muted-foreground uppercase">{spec.label}</p>
                    </div>
                  ))}
                </div>
              </div>
              {project.services.length > 0 && (
                <div>
                  <h2 className="text-sm font-mono text-emerald-500 uppercase mb-4">Services Used</h2>
                  <div className="space-y-3">
                    {project.services.map((service) => (
                      <Link
                        key={service.href}
                        href={service.href}
                        className="block p-4 border border-border bg-zinc-950 hover:border-emerald-900/50 transition-colors group"
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-medium group-hover:text-emerald-500 transition-colors">
                            {service.title}
                          </span>
                          <ArrowRight className="w-3 h-3 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>
                        <p className="text-xs text-muted-foreground">{service.desc}</p>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready for your project?</h2>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-6 py-3 bg-white text-black font-bold hover:bg-gray-200 transition-colors"
          >
            Start a Conversation
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  )
}
