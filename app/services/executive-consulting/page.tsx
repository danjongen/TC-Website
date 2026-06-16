import type { Metadata } from "next"
import Link from "next/link"
import {
  ArrowLeft,
  ArrowRight,
  Target,
  TrendingUp,
  Shield,
  Users,
  Handshake,
  Settings,
  BarChart3,
  Compass,
  FileCheck,
  Briefcase,
  Workflow,
  Lightbulb,
} from "lucide-react"
import { BreadcrumbSchema, ServicePageSchema } from "@/components/structured-data"
import { ServiceAccordion } from "@/components/v2/service-accordion"

export const metadata: Metadata = {
  title: "Executive & Strategic Consulting | TC Agency — Production Engineering",
  description:
    "Senior production leadership and strategic consulting for high-stakes environments. TC Agency delivers decision frameworks, risk mitigation, vendor strategy, budget intelligence, and cross-department alignment for complex global productions.",
  keywords: [
    "executive consulting",
    "strategic consulting",
    "production leadership",
    "technical direction",
    "risk mitigation",
    "vendor strategy",
    "decision frameworks",
    "budget intelligence",
    "production management",
    "TC Agency",
    "Technically Creative",
  ],
  openGraph: {
    title: "Executive & Strategic Consulting — TC Agency",
    description:
      "High-level production and technical strategy for shows and programs that demand clarity, reliability, and senior leadership. Decision frameworks, risk control, and operational alignment.",
    url: "https://tc.agency/services/executive-consulting",
    type: "website",
    images: [
      {
        url: "/og/consulting.jpg",
        width: 1200,
        height: 630,
        alt: "Executive & Strategic Consulting — TC Production Engineering",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Executive & Strategic Consulting — TC Agency",
    description:
      "High-level production and technical strategy for shows and programs that demand clarity, reliability, and senior leadership.",
    images: ["/og/consulting.jpg"],
  },
  alternates: {
    canonical: "https://tc.agency/services/executive-consulting",
  },
}

const deliverables = [
  {
    icon: Target,
    title: "Strategic Oversight",
    items: [
      "End-to-end strategic supervision across all production phases",
      "Show-level architecture and decision frameworks",
      "Production sequencing and dependency mapping",
      "Milestone definition, tracking, and accountability structures",
    ],
  },
  {
    icon: TrendingUp,
    title: "Feasibility & Planning",
    items: [
      "Multi-scenario feasibility assessments",
      "Technical viability reviews and validation gates",
      "Early-stage system design guidance",
      "Timeline modelling and critical-path analysis",
    ],
  },
  {
    icon: BarChart3,
    title: "Financial & Commercial Intelligence",
    items: [
      "Budget intelligence across all production phases",
      "Commercial modelling for technical decisions",
      "Cost-to-benefit evaluations with clear benchmarks",
      "Spend tracking and variance analysis",
    ],
  },
  {
    icon: Shield,
    title: "Risk & Governance",
    items: [
      "Risk forecasting and structured mitigation plans",
      "Operational safety and compliance considerations",
      "Governance frameworks and escalation protocols",
      "Contingency planning for zero-failure-tolerance programs",
    ],
  },
  {
    icon: Users,
    title: "Leadership & Alignment",
    items: [
      "Cross-department steering and coordination",
      "Stakeholder communication and reporting cadences",
      "Leadership coaching for production principals",
      "Executive representation with clients and partners",
    ],
  },
  {
    icon: Handshake,
    title: "Vendor Strategy",
    items: [
      "Vendor selection, evaluation, and shortlisting",
      "Negotiation positioning and contract shaping",
      "Vendor scope oversight and performance tracking",
      "Multi-vendor ecosystem coordination",
    ],
  },
  {
    icon: Settings,
    title: "Systems & Workflow Strategy",
    items: [
      "Automation strategy and tooling recommendations",
      "Workflow modernization and process design",
      "Scalability architecture for touring and multi-venue programs",
      "Operational playbook development and documentation",
    ],
  },
]

const useCases = [
  "Large-scale touring productions",
  "Multi-vendor technical ecosystems",
  "Creative and technical hybrid shows",
  "Workflow modernization programs",
  "Zero-failure-tolerance environments",
  "Immersive and experiential installations",
  "Global broadcast and live event programs",
  "New venue commissioning and activation",
]

const engagementModels = [
  {
    title: "Retainer",
    desc: "Ongoing strategic partnership with dedicated senior oversight and priority access. Ideal for organizations with continuous production cycles that require a trusted advisor on call throughout the year.",
  },
  {
    title: "Embedded Phase Support",
    desc: "Full integration with your team during critical production phases. We operate as an extension of your leadership, attending all key meetings, reviews, and on-site milestones from pre-production through strike.",
  },
  {
    title: "Special Projects",
    desc: "Targeted consulting engagements scoped to specific challenges or initiatives. Best suited for feasibility studies, vendor audits, risk assessments, or workflow redesign with clearly defined objectives.",
  },
]

export default function ExecutiveConsultingPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "https://tc.agency" },
          { name: "Services", url: "https://tc.agency/capabilities" },
          { name: "Executive & Strategic Consulting", url: "https://tc.agency/services/executive-consulting" },
        ]}
      />
      <ServicePageSchema
        name="Executive & Strategic Consulting"
        description="Senior production leadership and strategic consulting for high-stakes environments. Decision frameworks, risk mitigation, vendor strategy, budget intelligence, and cross-department alignment for complex global productions."
        url="https://tc.agency/services/executive-consulting"
      />
      <main className="min-h-screen bg-background pt-24 pb-16">
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
            <div className="text-sm font-mono text-[#00D26A] mb-4 uppercase tracking-widest">
              Service / Executive Consulting
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold tracking-[-0.03em] mb-6">
              Executive & Strategic Consulting
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              High-level guidance for projects where decisions carry weight, timelines are compressed,
              and the cost of uncertainty is measured in days lost and budgets overrun. We provide the
              senior leadership layer that complex productions demand.
            </p>
          </div>

          {/* Overview */}
          <section className="mb-24">
            <div className="grid lg:grid-cols-2 gap-12">
              <div>
                <h2 className="text-2xl font-semibold mb-6">Overview</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  This service delivers senior oversight across all technical, creative, and production
                  domains. It provides the thinking, modelling, risk control, and decision stewardship
                  that complex productions require. When the stakes are high and the margin for error
                  is narrow, strategic consulting brings structure to ambiguity and clarity to competing
                  priorities.
                </p>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Ideal for programs operating at scale, managing concurrent workstreams, or navigating
                  environments where clarity and certainty are non-negotiable. Our consulting practice
                  draws on direct experience leading productions for global brands and landmark venues,
                  including projects involving automotive launch programs for Ford and immersive
                  entertainment at Sphere-class installations.
                </p>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  We operate at the intersection of creative ambition and technical reality. That means
                  we do not simply advise from the sideline. We embed within your leadership structure,
                  participate in the hard conversations, and take ownership of the frameworks that drive
                  decisions forward. Every engagement is built around one principle: reduce the distance
                  between a question being raised and a confident answer being delivered.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  For teams that already have strong operational talent but need a strategic layer to
                  connect departments, manage vendor ecosystems, or pressure-test plans before
                  committing resources, this is the service that fills that gap. We complement your
                  existing structure rather than replacing it.
                </p>
              </div>
              <div className="bg-accent/5 border border-border p-8">
                <h3 className="font-mono text-sm text-[#00D26A] uppercase tracking-widest mb-6">
                  Performance Indicators
                </h3>
                <div className="grid grid-cols-1 gap-6">
                  <div className="border-b border-border pb-4">
                    <p className="text-4xl font-semibold text-[#00D26A]">+40%</p>
                    <p className="text-sm text-muted-foreground mt-1">Faster decision cycles</p>
                  </div>
                  <div className="border-b border-border pb-4">
                    <p className="text-4xl font-semibold text-[#00D26A]">60%</p>
                    <p className="text-sm text-muted-foreground mt-1">Reduction in early-phase risk</p>
                  </div>
                  <div className="border-b border-border pb-4">
                    <p className="text-4xl font-semibold text-[#00D26A]">100%</p>
                    <p className="text-sm text-muted-foreground mt-1">Team alignment and clarity across departments</p>
                  </div>
                </div>
                <div className="mt-6 pt-6 border-t border-border">
                  <h3 className="font-mono text-sm text-[#00D26A] uppercase tracking-widest mb-4">
                    Related Services
                  </h3>
                  <div className="space-y-3">
                    <Link
                      href="/services/technical-direction"
                      className="flex items-center gap-2 text-sm text-muted-foreground hover:text-white transition-colors"
                    >
                      <Compass className="w-4 h-4 text-[#00D26A]" />
                      Technical Direction
                    </Link>
                    <Link
                      href="/services/production-management"
                      className="flex items-center gap-2 text-sm text-muted-foreground hover:text-white transition-colors"
                    >
                      <Workflow className="w-4 h-4 text-[#00D26A]" />
                      Production Management
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* What Sets This Apart */}
          <section className="mb-24">
            <div className="bg-zinc-950 border border-border p-8 md:p-12">
              <h2 className="text-2xl font-semibold mb-6">What Sets This Apart</h2>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    Most consulting in the production space focuses on logistics or creative direction
                    in isolation. Our approach bridges those domains. We bring financial intelligence,
                    vendor strategy, systems thinking, and operational rigour into a single advisory
                    layer. The result is a leadership function that sees the full picture and acts on it.
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    We have led consulting engagements where the primary value was not a deliverable
                    or a document, but a decision that was made three weeks earlier than it otherwise
                    would have been. In production, time is the most valuable resource. Our job is to
                    compress uncertainty and accelerate alignment so your teams can execute with
                    confidence.
                  </p>
                </div>
                <div>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    Every engagement begins with listening. We map the existing decision landscape,
                    identify bottlenecks, and build frameworks that are specific to your production's
                    context. There are no generic templates. The governance model for a global
                    automotive reveal is fundamentally different from the one needed for an immersive
                    entertainment residency, and our approach reflects that.
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    We also maintain strong working relationships with vendors, fabricators, and
                    technology partners across the industry. This network allows us to provide informed
                    recommendations on capability, capacity, and commercial positioning that go beyond
                    surface-level research.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Deliverables */}
          <section className="mb-24">
            <h2 className="text-2xl font-semibold mb-12">Deliverables</h2>
            <ServiceAccordion
              items={deliverables.map((category) => ({
                title: category.title,
                points: category.items,
              }))}
            />
          </section>

          {/* Engagement Models */}
          <section className="mb-24">
            <h2 className="text-2xl font-semibold mb-12">Engagement Models</h2>
            <div className="grid md:grid-cols-3 gap-px bg-border border border-border">
              {engagementModels.map((model, i) => (
                <div key={i} className="bg-background p-8">
                  <div className="font-mono text-xs text-[#00D26A] mb-2">{(i + 1).toString().padStart(2, "0")}</div>
                  <h3 className="font-semibold mb-2">{model.title}</h3>
                  <p className="text-sm text-muted-foreground">{model.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* How We Work */}
          <section className="mb-24">
            <h2 className="text-2xl font-semibold mb-12">How We Work</h2>
            <div className="max-w-3xl">
              <div className="space-y-8">
                {[
                  {
                    icon: Lightbulb,
                    phase: "Discovery and Landscape Mapping",
                    desc: "We begin by understanding the full scope of your production, its constraints, its stakeholders, and its decision-making patterns. This phase surfaces the real problems, not just the symptoms. We interview key personnel, review existing documentation, and map the organizational structure to identify where friction lives.",
                  },
                  {
                    icon: FileCheck,
                    phase: "Framework Design",
                    desc: "Based on discovery findings, we design decision frameworks, governance structures, and communication protocols tailored to your production. This includes escalation paths, approval gates, risk registers, and reporting cadences. Every framework is built to be practical and immediately usable by your teams.",
                  },
                  {
                    icon: Briefcase,
                    phase: "Embedded Execution",
                    desc: "We integrate directly with your leadership team during active production phases. This means attending production meetings, leading vendor negotiations, steering budget reviews, and providing real-time counsel on technical and creative decisions. We operate as an extension of your team, not an external observer.",
                  },
                  {
                    icon: Compass,
                    phase: "Review and Iteration",
                    desc: "At defined intervals and after major milestones, we conduct structured reviews to assess what is working, what needs adjustment, and where new risks have emerged. Frameworks are living documents. We update them as the production evolves and new information becomes available.",
                  },
                ].map((step, i) => (
                  <div key={i} className="flex gap-6">
                    <div className="flex-shrink-0">
                      <div className="w-10 h-10 border border-[#00D26A] flex items-center justify-center">
                        <step.icon className="w-5 h-5 text-[#00D26A]" />
                      </div>
                    </div>
                    <div>
                      <div className="font-mono text-xs text-[#00D26A] mb-1">{(i + 1).toString().padStart(2, "0")}</div>
                      <h3 className="font-semibold mb-2">{step.phase}</h3>
                      <p className="text-sm text-muted-foreground">{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Use Cases */}
          <section className="mb-24">
            <h2 className="text-2xl font-semibold mb-12">Use Cases</h2>
            <div className="max-w-3xl">
              <div className="flex flex-wrap gap-3">
                {useCases.map((useCase, i) => (
                  <span
                    key={i}
                    className="px-4 py-2 border border-border text-sm text-muted-foreground hover:border-[#00D26A]/30 hover:text-white transition-colors"
                  >
                    {useCase}
                  </span>
                ))}
              </div>
            </div>
          </section>

          {/* CTA */}
          <section className="border-t border-border pt-16">
            <div className="max-w-2xl">
              <h2 className="text-2xl font-semibold mb-4">Start a Conversation</h2>
              <p className="text-muted-foreground mb-8">
                Whether you need ongoing strategic partnership or targeted support for a specific
                production challenge, we are ready to discuss how executive-level oversight can
                de-risk your next program and accelerate your decision-making.
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
    </>
  )
}
