import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import Link from "next/link"
import Image from "next/image"
import { ArrowRight } from "lucide-react"
import { ServiceSchema, BreadcrumbSchema } from "@/components/structured-data"
import { CapabilitiesAccordion } from "@/components/capabilities-accordion"

export const dynamic = "force-static"
export const revalidate = 3600 // Revalidate every hour

const services: { num: string; title: string; desc: string; href: string; details: string[]; specs: Record<string, string> }[] = [
  {
    num: "01",
    title: "Executive & Strategic Consulting",
    desc: "High-stakes leadership for productions that demand clarity and certainty.",
    href: "/services/executive-consulting",
    details: [
      "Strategic planning and production road-mapping",
      "Early-phase feasibility and scenario modelling",
      "Commercial guidance, budget intelligence, and financial steering",
      "Cross-department alignment and leadership support",
      "Risk forecasting, mitigation, and decision frameworks",
      "Vendor strategy, negotiation positioning, and contract shaping",
      "Systems, workflow, and automation strategy",
      "Executive representation with clients, partners, and stakeholders",
    ],
    specs: { decisionVelocity: "+40%", riskReduction: "60%", alignment: "100%" },
  },
  {
    num: "02",
    title: "Technical Direction",
    desc: "End-to-end technical leadership. One point of control for all production systems.",
    href: "/services/technical-direction",
    details: [
      "Single point of technical accountability",
      "Cross-departmental coordination",
      "Risk assessment and mitigation",
      "Vendor management and selection",
      "Technical specification development",
    ],
    specs: { projects: "200+", uptime: "99.97%", response: "<2hr" },
  },
  {
    num: "03",
    title: "Production Management",
    desc: "Complete production oversight. Timeline, budget, and logistics executed with precision.",
    href: "/services/production-management",
    details: [
      "Budget tracking and forecasting",
      "Timeline management with dependencies",
      "Resource allocation optimization",
      "Logistics coordination",
      "Stakeholder reporting",
    ],
    specs: { onTime: "98%", budgetVariance: "<3%", efficiency: "+40%" },
  },
  {
    num: "04",
    title: "Design & Visualization",
    desc: "From concept to technical blueprint. Accurate visualization before build begins.",
    href: "/services/design-visualization",
    details: [
      "3D CAD modeling and drafting",
      "Photorealistic rendering",
      "Technical drawing packages",
      "Structural engineering support",
      "Revision control systems",
    ],
    specs: { accuracy: "99.5%", revisions: "Unlimited", formats: "15+" },
  },
  {
    num: "05",
    title: "Unreal Engine Integration",
    desc: "Real-time rendering, virtual production, and LED content workflows.",
    href: "/services/unreal-engine",
    details: [
      "nDisplay configuration",
      "Real-time content rendering",
      "Camera tracking integration",
      "LED volume calibration",
      "Performance optimization",
    ],
    specs: { fps: "120+", resolution: "16K+", latency: "<8ms" },
  },
  {
    num: "06",
    title: "Workflow Automation",
    desc: "Custom automation that eliminates manual tasks. Faster setup. Fewer errors. Repeatable results.",
    href: "/services/workflow-automation",
    details: [
      "Custom script development",
      "Show control system programming",
      "Data pipeline automation",
      "Error handling and recovery",
      "Documentation generation",
    ],
    specs: { timeSaved: "60%", errorReduction: "95%", repeatability: "100%" },
  },
  {
    num: "07",
    title: "System Integration",
    desc: "All your tech talking to each other. One system. One interface. Zero gaps.",
    href: "/services/system-integration",
    details: [
      "Protocol translation (OSC, MIDI, DMX, sACN)",
      "Network architecture design",
      "Redundancy planning",
      "Real-time monitoring dashboards",
      "Failover automation",
    ],
    specs: { protocols: "20+", latency: "<1ms", uptime: "100%" },
  },
  {
    num: "08",
    title: "3D Scanning & Surveying",
    desc: "3D venue scanning and real-time visualization. See your show before you build it.",
    href: "/services/3d-scanning",
    details: [
      "LiDAR point cloud capture",
      "Photogrammetry processing",
      "As-built documentation",
      "Clash detection analysis",
      "BIM integration",
    ],
    specs: { accuracy: "±2mm", range: "300m", density: "1M pts/sec" },
  },
  {
    num: "09",
    title: "Aerial Surveying",
    desc: "Aerial data capture for venue and site analysis. Topology, layouts, and conditions documented.",
    href: "/services/aerial-surveying",
    details: [
      "Drone-based photogrammetry",
      "Thermal imaging",
      "Orthomosaic mapping",
      "Volumetric calculations",
      "Progress documentation",
    ],
    specs: { coverage: "100 acres/day", resolution: "1cm/px", altitude: "400ft" },
  },
  {
    num: "10",
    title: "Custom Fabrication",
    desc: "Custom-engineered hardware for productions that require solutions that don't exist yet.",
    href: "/services/custom-fabrication",
    details: [
      "Mechanical design and prototyping",
      "CNC machining and 3D printing",
      "Cable and harness assembly",
      "Structural engineering",
      "Load testing and certification",
    ],
    specs: { leadTime: "2-6 weeks", materials: "50+", tolerance: "±0.1mm" },
  },
  {
    num: "11",
    title: "Automation & AI Operations",
    desc: "Business operations automation and AI-powered tools. The systems we built for ourselves, now available for yours.",
    href: "/services/automation-ops",
    details: [
      "Automated order and shipping notifications",
      "Inventory management and reorder triggers",
      "Supplier tracking and follow-ups",
      "AI-powered inbox triage and customer communication",
      "Automated reporting across platforms",
      "Cash flow monitoring and forecasting",
    ],
    specs: { setup: "One-time", platforms: "10+", uptime: "99.9%" },
  },
]

const partners = [
  "disguise",
  "Holoplot",
  "ROE Visual",
  "Tait Navigator",
  "Leica Geosystems",
  "Brompton Technology",
  "Sennheiser",
  "Shure",
  "d&b audiotechnik",
  "L-Acoustics",
  "Robe Lighting",
  "MA Lighting",
  "BlackTrax",
  "Notch",
  "TouchDesigner",
]

export default function CapabilitiesPage() {
  const servicesForSchema = services.map((s) => ({
    name: s.title,
    description: s.desc,
    url: s.href || undefined,
  }))

  return (
    <main className="min-h-screen bg-background text-foreground">
      <ServiceSchema services={servicesForSchema} />
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "https://tc.agency" },
          { name: "Services", url: "https://tc.agency/services" },
        ]}
      />

      <Navbar />

      {/* Hero Section */}
      <section className="pt-32 pb-16 border-b border-border">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-sm font-mono text-emerald-500 mb-4 uppercase tracking-widest">02 / Services</p>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
                Full-spectrum production engineering.
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed">
                From concept visualization to show execution. Every technical discipline under one roof, working as a
                unified system.
              </p>
            </div>
            <div className="relative aspect-video overflow-hidden border border-border">
              <Image
                src="/images/dsf3815.jpg"
                alt="TC Agency production control environment"
                fill
                className="object-cover"
                priority
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4">
                <p className="text-xs font-mono text-emerald-500 uppercase">Live Production Environment</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Accordion Capabilities Section */}
      <section className="py-16 border-b border-border">
        <div className="container mx-auto px-6">
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-2">Service Capabilities</h2>
            <p className="text-muted-foreground">Click to expand detailed specifications and deliverables.</p>
          </div>

          <CapabilitiesAccordion services={services} />
        </div>
      </section>

      {/* Technology Partners */}
      <section className="py-16 border-b border-border bg-zinc-950">
        <div className="container mx-auto px-6">
          <h2 className="text-xs font-mono text-emerald-500 uppercase tracking-widest mb-6">Technology Partners</h2>
          <div className="flex flex-wrap gap-x-8 gap-y-4">
            {partners.map((partner) => (
              <span
                key={partner}
                className="text-sm text-muted-foreground font-mono hover:text-white transition-colors"
              >
                {partner}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-4">Need a specific capability?</h2>
          <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
            If you don't see what you need, let's talk. We build custom solutions for unique challenges.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-6 py-3 bg-white text-black font-bold hover:bg-gray-200 transition-colors duration-150"
          >
            Discuss Your Project
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  )
}
