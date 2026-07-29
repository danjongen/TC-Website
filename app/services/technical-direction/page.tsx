import type { Metadata } from "next"
import Link from "next/link"
import {
  ArrowLeft,
  ArrowRight,
  Network,
  Shield,
  Users,
  Boxes,
  Radio,
  ClipboardCheck,
} from "lucide-react"
import { BreadcrumbSchema, ServicePageSchema } from "@/components/structured-data"
import { ServiceAccordion } from "@/components/v2/service-accordion"

export const metadata: Metadata = {
  title: "Technical Direction | Live Event TD Services | TC Agency",
  description:
    "Single point of technical accountability for complex live events, tours, and installations. TC Agency provides end-to-end technical direction with engineering rigor: cross-department coordination, system architecture, risk management, and real-time operations leadership.",
  keywords: [
    "technical director for hire",
    "live event technical director",
    "hire technical director",
    "production technical direction",
    "touring technical director",
    "technical direction services",
    "live event TD",
    "production technical leadership",
    "TC Agency",
    "Technically Creative",
  ],
  openGraph: {
    title: "Technical Direction - TC Agency",
    description:
      "Single point of technical accountability for complex live events, tours, and installations. Engineering rigor applied to every production system.",
    url: "https://tc.agency/services/technical-direction",
    type: "website",
    images: [
      {
        url: "/og/technical-direction.jpg",
        width: 1200,
        height: 630,
        alt: "Technical Direction - TC Production Engineering",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Technical Direction - TC Agency",
    description:
      "Single point of technical accountability for complex live events, tours, and installations. Engineering rigor applied to every production system.",
    images: ["/og/technical-direction.jpg"],
  },
  alternates: {
    canonical: "https://tc.agency/services/technical-direction",
  },
}

const responsibilities = [
  {
    icon: Boxes,
    title: "Technical Architecture",
    description:
      "Designing the complete technical infrastructure for a production, from signal flow and network topology to power distribution and redundancy planning.",
    items: [
      "System block diagrams and signal flow",
      "Network architecture and IP schemes",
      "Power distribution and load planning",
      "Redundancy and failover design",
    ],
  },
  {
    icon: Users,
    title: "Cross-Department Coordination",
    description:
      "Serving as the connective tissue between lighting, video, audio, automation, rigging, and networking teams to ensure every system works as one.",
    items: [
      "Interdepartmental technical alignment",
      "Shared resource scheduling",
      "Communication protocol standardization",
      "Unified timeline and milestone tracking",
    ],
  },
  {
    icon: Shield,
    title: "Risk Management",
    description:
      "Identifying failure modes before they become problems. Every production receives a structured risk assessment with documented mitigation strategies.",
    items: [
      "Pre-production risk assessments",
      "Failure mode analysis (FMEA)",
      "Contingency and fallback planning",
      "Safety compliance verification",
    ],
  },
  {
    icon: ClipboardCheck,
    title: "Vendor Oversight",
    description:
      "Managing vendor relationships from specification through delivery. Technical requirements are documented precisely so nothing is left to interpretation.",
    items: [
      "Technical specification development",
      "Vendor evaluation and selection",
      "Scope verification and acceptance testing",
      "Cross-vendor integration oversight",
    ],
  },
  {
    icon: Network,
    title: "System Integration",
    description:
      "Ensuring all production subsystems communicate reliably. Protocol bridging, data routing, and end-to-end signal validation across every department.",
    items: [
      "Protocol bridging and translation",
      "End-to-end signal path validation",
      "Control system interoperability",
      "Commissioning and system tuning",
    ],
  },
  {
    icon: Radio,
    title: "Real-Time Operations",
    description:
      "On-site technical leadership during load-in, rehearsals, and live performance. Problems are diagnosed and resolved in real time, without disrupting the show.",
    items: [
      "Live troubleshooting and diagnosis",
      "Show-critical decision making",
      "Operator coordination during performance",
      "Post-show reporting and issue tracking",
    ],
  },
]

const useCases = [
  "Arena and stadium tours",
  "Residency productions",
  "Corporate keynotes and product launches",
  "Broadcast and live-to-air events",
  "Festival main stages",
  "Immersive installations",
  "Award shows and galas",
  "Multi-venue simultaneous events",
]

export default function TechnicalDirectionPage() {
  return (
    <main className="min-h-screen bg-background pt-24 pb-16">
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "https://tc.agency" },
          { name: "Services", url: "https://tc.agency/capabilities" },
          { name: "Technical Direction", url: "https://tc.agency/services/technical-direction" },
        ]}
      />
      <ServicePageSchema
        name="Technical Direction"
        description="Single point of technical accountability for complex live events, tours, and installations. End-to-end technical leadership with engineering rigor applied to every production system."
        url="https://tc.agency/services/technical-direction"
      />

      <div className="container mx-auto px-6">
        {/* Breadcrumb */}
        <Link
          href="/capabilities"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-white transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Services
        </Link>

        {/* Header */}
        <div className="mb-16 max-w-4xl">
          <p className="mb-6 font-mono text-[11px] tracking-[0.2em] text-zinc-400">[ SERVICE / TECHNICAL DIRECTION ]</p>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold tracking-[-0.03em] mb-6">
            Technical Direction
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed">
            One person accountable for every technical system on your production. From architecture through
            execution, TC provides the leadership that keeps complex shows running with precision.
          </p>
        </div>

        {/* Overview */}
        <section className="mb-24">
          <div className="max-w-3xl">
            <h2 className="text-2xl font-semibold tracking-[-0.03em] mb-6">Overview</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Technical direction is the single thread that connects every production department into a coherent,
              reliable system. It is not a title. It is an operating model: one point of accountability that owns
              the technical outcome of the entire show, from first concept meeting through final strike.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-4">
              TC approaches technical direction with the rigor of systems engineering. Every production receives
              documented architecture, structured risk analysis, and clear communication protocols before a single
              cable is run. During execution, the TD serves as the central nervous system of the production,
              routing information, resolving conflicts between departments, and making real-time decisions that
              protect both the creative vision and the technical integrity of the show.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              This service is built for productions where the technical complexity exceeds what any single
              department can manage alone. Tours with dozens of trucks. Residencies with hundreds of cues.
              Installations where uptime is measured in months, not hours.
            </p>
          </div>
        </section>

        {/* Core Responsibilities */}
        <section className="mb-24">
          <h2 className="text-2xl font-semibold tracking-[-0.03em] mb-12">Core Responsibilities</h2>
          <ServiceAccordion
            items={responsibilities.map((r) => ({
              title: r.title,
              description: r.description,
              points: r.items,
            }))}
          />
        </section>

        {/* How TC Does It Differently */}
        <section className="mb-24">
          <div className="max-w-3xl">
            <h2 className="text-2xl font-semibold tracking-[-0.03em] mb-6">How TC Does It Differently</h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                Traditional technical direction in live events is often reactive. The TD shows up on site, inherits
                a set of problems created during pre-production, and spends the entire load-in putting out fires.
                Departments operate in silos. Vendors deliver equipment that was never tested together. Risk is
                managed through experience and instinct rather than process.
              </p>
              <p>
                TC takes a fundamentally different approach. We treat every production as an engineered system. That
                means formal architecture documentation before procurement begins. It means structured risk
                assessments that identify failure modes weeks before load-in, not hours. It means communication
                protocols that ensure information flows between departments in a predictable, auditable way.
              </p>
              <p>
                This is not bureaucracy for its own sake. It is precision applied where it matters most. When a
                lighting console needs to talk to a media server that triggers automation cues synced to timecode
                while feeding confidence monitors and recording ISO feeds, there is no room for ambiguity. Every
                signal path is documented. Every protocol handoff is tested. Every fallback is defined.
              </p>
              <p>
                The result is productions that run cleaner, load in faster, and recover from the unexpected without
                the audience ever noticing. Our{" "}
                <Link href="/services/system-integration" className="text-white underline underline-offset-4 transition-colors hover:text-[#00D26A]">
                  system integration
                </Link>{" "}
                methodology and{" "}
                <Link href="/services/unreal-engine" className="text-white underline underline-offset-4 transition-colors hover:text-[#00D26A]">
                  Unreal Engine pre-visualization
                </Link>{" "}
                capabilities extend this engineering mindset across every phase of the production lifecycle.
              </p>
            </div>
          </div>
        </section>

        {/* Use Cases */}
        <section className="mb-24">
          <h2 className="text-2xl font-semibold tracking-[-0.03em] mb-12">Use Cases</h2>
          <div className="max-w-3xl">
            <div className="flex flex-wrap gap-3">
              {useCases.map((useCase, i) => (
                <span
                  key={i}
                  className="px-4 py-2 border border-zinc-800 text-sm text-muted-foreground hover:border-[#00D26A]/30 hover:text-white transition-colors"
                >
                  {useCase}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* Related Work */}
        <section className="mb-24">
          <h2 className="text-2xl font-semibold tracking-[-0.03em] mb-12">Related Work</h2>
          <div className="grid md:grid-cols-3 gap-px bg-zinc-900 border border-zinc-800">
            {[
              {
                label: "Case Study",
                title: "Sphere Residency",
                desc: "End-to-end technical direction for one of the most complex production environments ever built.",
                href: "/portfolio",
              },
              {
                label: "Service",
                title: "System Integration",
                desc: "The engineering discipline that ensures every subsystem communicates reliably and fails gracefully.",
                href: "/services/system-integration",
              },
              {
                label: "Service",
                title: "Unreal Engine",
                desc: "Pre-visualization and real-time rendering that de-risks creative and technical decisions before load-in.",
                href: "/services/unreal-engine",
              },
            ].map((item, i) => (
              <Link
                key={i}
                href={item.href}
                className="bg-background p-8 group hover:bg-zinc-900/40 transition-colors"
              >
                <div className="font-mono text-xs text-zinc-500 mb-2">{item.label}</div>
                <h3 className="font-semibold mb-2 group-hover:text-[#00D26A] transition-colors">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </Link>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="border-t border-zinc-800 pt-16">
          <div className="max-w-2xl">
            <h2 className="text-2xl font-semibold tracking-[-0.03em] mb-4">Bring TC on as your Technical Director</h2>
            <p className="text-muted-foreground mb-8">
              Whether you need a TD for a single show or an entire touring cycle, let us show you what
              engineering-grade technical direction looks like in practice.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#00D26A] text-black font-medium hover:bg-[#00b85c] transition-colors"
            >
              Start a Conversation
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>
      </div>
    </main>
  )
}
