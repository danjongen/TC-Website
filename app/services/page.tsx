import Link from "next/link"
import Image from "next/image"
import { ServiceSchema, BreadcrumbSchema } from "@/components/structured-data"

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
    specs: { experience: "15+ yrs", productions: "200+", markets: "30+ countries" },
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
    specs: { productions: "200+", venues: "Arenas to Sphere", crews: "500+ managed" },
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
    specs: { deliverables: "CAD / BIM / Previz", formats: "15+", scale: "Venue-accurate" },
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
    specs: { resolution: "Up to 16K", engine: "Unreal", scope: "Previz to show" },
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
    specs: { pipelines: "Show-critical", cueing: "Automated", documentation: "Versioned" },
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
    specs: { protocols: "20+", scope: "Video / Audio / Light / Motion", uptime: "99.97%" },
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
    specs: { deliverables: "Scan / CAD / BIM", coverage: "Venue-scale", output: "Survey-grade" },
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

function formatSpecLabel(key: string) {
  return key
    .replace(/([A-Z])/g, " $1")
    .trim()
    .toUpperCase()
}

export default function CapabilitiesPage() {
  const servicesForSchema = services.map((s) => ({
    name: s.title,
    description: s.desc,
    url: s.href || undefined,
  }))

  return (
    <main className="min-h-screen bg-black text-white">
      <ServiceSchema services={servicesForSchema} />
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "https://tc.agency" },
          { name: "Services", url: "https://tc.agency/services" },
        ]}
      />


      {/* Hero */}
      <section className="pt-40 md:pt-48 pb-[14vh]">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl">
            <p className="mb-6 font-mono text-[11px] tracking-[0.2em] text-zinc-400">[ 02 — SERVICES ]</p>
            <h1 className="text-5xl md:text-7xl font-semibold tracking-[-0.03em] text-white mb-8">
              Full-spectrum production engineering
            </h1>
            <p className="text-lg leading-relaxed text-zinc-400 max-w-xl">
              From concept visualization to show execution. Every technical discipline under one roof, working as a
              unified system.
            </p>
          </div>
        </div>
      </section>

      {/* Full-width image */}
      <section aria-label="Live production environment" className="relative">
        <div className="relative aspect-[21/9] w-full">
          <Image
            src="/images/dsf3815.jpg"
            alt="TC Agency production control environment"
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
          <div className="absolute bottom-6 left-6">
            <p className="font-mono text-[11px] tracking-[0.2em] text-zinc-400">LIVE PRODUCTION ENVIRONMENT</p>
          </div>
        </div>
      </section>

      {/* Services index */}
      <section className="py-[14vh]">
        <div className="container mx-auto px-6">
          <p className="mb-6 font-mono text-[11px] tracking-[0.2em] text-zinc-400">[ 03 — CAPABILITIES ]</p>

          <div>
            {services.map((service, i) => (
              <article key={service.num}>
                {i > 0 && <div className="h-px bg-zinc-900" aria-hidden="true" />}
                <div className="py-14 grid lg:grid-cols-12 gap-8">
                  <div className="lg:col-span-1">
                    <span className="font-mono text-xs tracking-[0.2em] text-zinc-400">{service.num}</span>
                  </div>
                  <div className="lg:col-span-6">
                    <h2 className="text-3xl md:text-5xl font-semibold tracking-[-0.03em] text-white mb-4">
                      <Link href={service.href} className="hover:text-[#00D26A] transition-colors duration-300">
                        {service.title}
                      </Link>
                    </h2>
                    <p className="text-lg leading-relaxed text-zinc-400 max-w-xl mb-6">{service.desc}</p>
                    <Link
                      href={service.href}
                      className="font-mono text-xs tracking-[0.2em] text-zinc-400 hover:text-white transition-colors duration-300"
                      aria-label={`Learn more about ${service.title}`}
                    >
                      VIEW SERVICE →
                    </Link>
                  </div>
                  <div className="lg:col-span-5">
                    <ul className="space-y-2 mb-8">
                      {service.details.map((detail) => (
                        <li key={detail} className="text-sm leading-relaxed text-zinc-400">
                          {detail}
                        </li>
                      ))}
                    </ul>
                    <dl className="flex flex-wrap gap-x-10 gap-y-4">
                      {Object.entries(service.specs).map(([key, value]) => (
                        <div key={key}>
                          <dt className="font-mono text-[11px] tracking-[0.2em] text-zinc-400">
                            {formatSpecLabel(key)}
                          </dt>
                          <dd className="text-lg font-semibold text-white mt-1">{value}</dd>
                        </div>
                      ))}
                    </dl>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Technology Partners */}
      <section className="py-[14vh]">
        <div className="container mx-auto px-6">
          <p className="mb-6 font-mono text-[11px] tracking-[0.2em] text-zinc-400">[ 04 — TECHNOLOGY PARTNERS ]</p>
          <div className="flex flex-wrap gap-x-10 gap-y-4 max-w-3xl">
            {partners.map((partner) => (
              <span
                key={partner}
                className="font-mono text-xs tracking-[0.2em] text-zinc-400 hover:text-white transition-colors duration-300"
              >
                {partner}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-[14vh]">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl md:text-5xl font-semibold tracking-[-0.03em] text-white mb-6">
            Need a specific capability?
          </h2>
          <p className="text-lg leading-relaxed text-zinc-400 mb-10 max-w-xl">
            If you don't see what you need, let's talk. We build custom solutions for unique challenges.
          </p>
          <Link
            href="/contact"
            className="font-mono text-xs tracking-[0.2em] text-zinc-400 hover:text-[#00D26A] transition-colors duration-300"
          >
            DISCUSS YOUR PROJECT →
          </Link>
        </div>
      </section>

    </main>
  )
}
