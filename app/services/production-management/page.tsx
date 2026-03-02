import type { Metadata } from "next"
import Link from "next/link"
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle,
  DollarSign,
  Clock,
  Users,
  Truck,
  MessageSquare,
  ShieldAlert,
} from "lucide-react"
import { BreadcrumbSchema, ServicePageSchema } from "@/components/structured-data"

export const metadata: Metadata = {
  title: "Production Management | Live Event Production | TC Agency",
  description:
    "End-to-end production management for live events, tours, and installations. TC Agency delivers timeline control, budget tracking, logistics coordination, and stakeholder communication with precision and accountability.",
  keywords: [
    "production manager for hire",
    "live event production management",
    "touring production manager",
    "event logistics management",
    "production coordination",
    "budget tracking",
    "timeline management",
    "TC Agency",
    "Technically Creative",
  ],
  openGraph: {
    title: "Production Management | Live Event Production | TC Agency",
    description:
      "End-to-end production management for live events, tours, and installations. Timeline control, budget tracking, logistics coordination, and stakeholder communication.",
    url: "https://tc.agency/services/production-management",
    type: "website",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Production Management — TC Agency",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Production Management | Live Event Production | TC Agency",
    description:
      "End-to-end production management for live events, tours, and installations. Timeline control, budget tracking, logistics coordination, and stakeholder communication.",
    images: ["/og-image.jpg"],
  },
  alternates: {
    canonical: "https://tc.agency/services/production-management",
  },
}

const deliverables = [
  {
    icon: DollarSign,
    title: "Budget Management",
    items: [
      "Line-item budget development and tracking",
      "Real-time spend monitoring and variance reporting",
      "Forecasting and cost-to-complete analysis",
    ],
  },
  {
    icon: Clock,
    title: "Timeline Control",
    items: [
      "Master schedule creation with dependency mapping",
      "Critical path identification and monitoring",
      "Milestone tracking across all departments",
    ],
  },
  {
    icon: Users,
    title: "Resource Optimization",
    items: [
      "Crew scheduling and labor allocation",
      "Equipment inventory and utilization tracking",
      "Cross-departmental resource balancing",
    ],
  },
  {
    icon: Truck,
    title: "Logistics Coordination",
    items: [
      "Freight and transportation management",
      "Vendor procurement and scheduling",
      "Site access, permitting, and compliance",
    ],
  },
  {
    icon: MessageSquare,
    title: "Stakeholder Communication",
    items: [
      "Regular status reporting to all stakeholders",
      "Change order documentation and approval workflows",
      "Cross-functional alignment and escalation protocols",
    ],
  },
  {
    icon: ShieldAlert,
    title: "Risk Mitigation",
    items: [
      "Proactive risk identification and contingency planning",
      "Safety compliance and incident protocols",
      "Backup systems and redundancy strategies",
    ],
  },
]

const methodology = [
  {
    phase: "Planning",
    desc: "Define scope, assemble the team, build the budget, and establish the master timeline. Every production starts with a clear operational framework that accounts for dependencies, constraints, and contingencies before a single truck rolls.",
  },
  {
    phase: "Pre-Production",
    desc: "Coordinate vendors, finalize technical specifications, and lock logistics. This is where drawings become purchase orders, concepts become contracts, and the entire production is stress-tested on paper before it happens in the real world.",
  },
  {
    phase: "Load-In",
    desc: "Manage site operations from first truck to final focus. Sequence the build, coordinate concurrent workstreams, and maintain safety standards while keeping the schedule on track. Every hour on site is accounted for.",
  },
  {
    phase: "Show Operations",
    desc: "Oversee live show execution with real-time problem solving and communication. Monitor all systems, manage crew rotations, and ensure every department is synchronized for consistent, reliable delivery night after night.",
  },
  {
    phase: "Strike",
    desc: "Reverse the build with the same rigor applied to load-in. Coordinate pack, freight, and site restoration while maintaining equipment accountability and safety protocols through the final walkthrough.",
  },
  {
    phase: "Post-Production Analysis",
    desc: "Close out the budget, document lessons learned, and deliver a comprehensive wrap report. Every project generates data that makes the next one sharper, faster, and more cost-effective.",
  },
]

const useCases = [
  "Arena tours",
  "Festival productions",
  "Corporate events",
  "Broadcast productions",
  "Theatrical installations",
  "Multi-city tours",
  "One-off spectacles",
  "Residency shows",
  "Award ceremonies",
  "Product launches",
]

export default function ProductionManagementPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "https://tc.agency" },
          { name: "Services", url: "https://tc.agency/services" },
          { name: "Production Management", url: "https://tc.agency/services/production-management" },
        ]}
      />
      <ServicePageSchema
        name="Production Management"
        description="End-to-end production management for live events, tours, and installations. Timeline control, budget tracking, logistics coordination, and stakeholder communication."
        url="https://tc.agency/services/production-management"
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
            <div className="text-sm font-mono text-emerald-500 mb-4 uppercase tracking-widest">
              Service / Production Management
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter mb-6">
              Production Management
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Complete production oversight from first concept to final wrap. We manage timelines, budgets, logistics,
              and communication so that every element of your production lands exactly where it should, exactly when it
              should.
            </p>
          </div>

          {/* Overview */}
          <section className="mb-24">
            <div className="grid lg:grid-cols-2 gap-12">
              <div>
                <h2 className="text-2xl font-bold mb-6">Overview</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Production management is the operational backbone of any live event. It is the discipline of
                  coordinating people, equipment, time, and money into a single coherent plan and then executing that
                  plan under pressure. TC Agency brings structured methodology and senior-level oversight to productions
                  that cannot afford ambiguity or misalignment.
                </p>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  We operate across the full production lifecycle. From initial budgeting and vendor selection through
                  load-in sequencing, show operations, strike, and post-production closeout, every phase receives the
                  same level of attention and accountability. Our production managers function as the central point of
                  coordination between creative, technical, and business stakeholders.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  The result is a production that runs on schedule, stays within budget, and delivers the creative
                  intent without compromise. No surprises. No gaps. No excuses.
                </p>
              </div>
              <div className="bg-accent/5 border border-border p-8">
                <h3 className="font-mono text-sm text-emerald-500 uppercase tracking-widest mb-6">
                  Performance Indicators
                </h3>
                <div className="grid grid-cols-1 gap-6">
                  <div className="border-b border-border pb-4">
                    <p className="text-4xl font-bold text-emerald-500">98%</p>
                    <p className="text-sm text-muted-foreground mt-1">On-time delivery rate</p>
                  </div>
                  <div className="border-b border-border pb-4">
                    <p className="text-4xl font-bold text-emerald-500">&lt;3%</p>
                    <p className="text-sm text-muted-foreground mt-1">Average budget variance</p>
                  </div>
                  <div>
                    <p className="text-4xl font-bold text-emerald-500">+40%</p>
                    <p className="text-sm text-muted-foreground mt-1">Operational efficiency gain</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Core Deliverables */}
          <section className="mb-24">
            <h2 className="text-2xl font-bold mb-12">Core Deliverables</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {deliverables.map((category, i) => (
                <div key={i} className="border border-border p-6 hover:border-emerald-900/50 transition-colors">
                  <category.icon className="w-8 h-8 text-emerald-500 mb-4" />
                  <h3 className="font-bold mb-4">{category.title}</h3>
                  <ul className="space-y-2">
                    {category.items.map((item, j) => (
                      <li key={j} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <CheckCircle className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          {/* Methodology */}
          <section className="mb-24">
            <h2 className="text-2xl font-bold mb-12">Methodology</h2>
            <div className="max-w-3xl">
              <div className="space-y-8">
                {methodology.map((step, i) => (
                  <div key={i} className="flex gap-6">
                    <div className="font-mono text-emerald-500 text-sm w-8 flex-shrink-0">
                      {(i + 1).toString().padStart(2, "0")}
                    </div>
                    <div>
                      <h3 className="font-bold mb-2">{step.phase}</h3>
                      <p className="text-sm text-muted-foreground">{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Use Cases */}
          <section className="mb-24">
            <h2 className="text-2xl font-bold mb-12">Use Cases</h2>
            <div className="max-w-3xl">
              <div className="flex flex-wrap gap-3">
                {useCases.map((useCase, i) => (
                  <span
                    key={i}
                    className="px-4 py-2 border border-border text-sm text-muted-foreground hover:border-emerald-900/50 hover:text-white transition-colors"
                  >
                    {useCase}
                  </span>
                ))}
              </div>
            </div>
          </section>

          {/* Related Services */}
          <section className="mb-24">
            <h2 className="text-2xl font-bold mb-12">Related Services</h2>
            <div className="grid md:grid-cols-2 gap-px bg-border border border-border max-w-2xl">
              <Link
                href="/services/executive-consulting"
                className="bg-background p-8 group hover:bg-accent/5 transition-colors"
              >
                <div className="font-mono text-xs text-emerald-500 mb-2">Strategic Leadership</div>
                <h3 className="font-bold mb-2 group-hover:text-emerald-500 transition-colors">
                  Executive Consulting
                </h3>
                <p className="text-sm text-muted-foreground">
                  Senior oversight, risk mitigation, and decision frameworks for complex productions.
                </p>
              </Link>
              <Link
                href="/services/technical-direction"
                className="bg-background p-8 group hover:bg-accent/5 transition-colors"
              >
                <div className="font-mono text-xs text-emerald-500 mb-2">Technical Systems</div>
                <h3 className="font-bold mb-2 group-hover:text-emerald-500 transition-colors">
                  Technical Direction
                </h3>
                <p className="text-sm text-muted-foreground">
                  System architecture, technical specifications, and engineering leadership for live events.
                </p>
              </Link>
            </div>
          </section>

          {/* CTA */}
          <section className="border-t border-border pt-16">
            <div className="max-w-2xl">
              <h2 className="text-2xl font-bold mb-4">Start a Project</h2>
              <p className="text-muted-foreground mb-8">
                Let's talk about your next production. Whether it's a single show or a global tour, we bring the
                structure, accountability, and operational discipline to deliver it on time and on budget.
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-500 text-white font-bold uppercase tracking-wide hover:bg-emerald-600 transition-colors"
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
