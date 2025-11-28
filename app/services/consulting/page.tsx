import type { Metadata } from "next"
import Link from "next/link"
import {
  ArrowLeft,
  Target,
  TrendingUp,
  Shield,
  Users,
  Handshake,
  Settings,
  ArrowRight,
  CheckCircle,
} from "lucide-react"

export const metadata: Metadata = {
  title: "Executive & Strategic Consulting | TC Agency — Production Engineering",
  description:
    "Senior technical and production leadership for high-stakes environments. TC Agency provides strategic oversight, risk mitigation, feasibility modelling, vendor strategy, and decision support for complex global productions.",
  keywords: [
    "executive consulting",
    "strategic consulting",
    "production leadership",
    "technical direction",
    "risk mitigation",
    "vendor strategy",
    "TC Agency",
    "Technically Creative",
  ],
  openGraph: {
    title: "Executive & Strategic Consulting — TC Agency",
    description:
      "High-level production and technical strategy for shows and programs that demand clarity, reliability, and senior leadership.",
    url: "https://www.tc.agency/services/consulting",
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
    canonical: "https://www.tc.agency/services/consulting",
  },
}

const deliverables = [
  {
    icon: Target,
    title: "Strategic Oversight",
    items: [
      "End-to-end strategic supervision",
      "Show-level architecture and decision frameworks",
      "Production sequencing and dependency mapping",
    ],
  },
  {
    icon: TrendingUp,
    title: "Feasibility & Planning",
    items: [
      "Multi-scenario feasibility assessments",
      "Technical viability reviews",
      "Early-stage system design guidance",
    ],
  },
  {
    icon: Shield,
    title: "Financial & Commercial Intelligence",
    items: [
      "Budget intelligence across phases",
      "Commercial modelling for technical decisions",
      "Cost-to-benefit evaluations",
    ],
  },
  {
    icon: Shield,
    title: "Risk & Governance",
    items: ["Risk forecasting and structured mitigation", "Operational safety considerations", "Governance frameworks"],
  },
  {
    icon: Users,
    title: "Leadership & Alignment",
    items: ["Cross-department steering", "Stakeholder communication", "Leadership coaching"],
  },
  {
    icon: Handshake,
    title: "Vendor Strategy",
    items: ["Vendor selection and negotiation", "Contract analysis", "Vendor scope oversight"],
  },
  {
    icon: Settings,
    title: "Systems & Workflow Strategy",
    items: ["Automation strategy", "Workflow modernization", "Scalability design", "Operational playbook development"],
  },
]

const useCases = [
  "Large-scale productions",
  "Multi-vendor ecosystems",
  "Creative-technical hybrid shows",
  "Workflow modernization",
  "Zero-failure tolerance programs",
]

const engagementModels = [
  {
    title: "Retainer",
    desc: "Ongoing strategic partnership with dedicated senior oversight and priority access.",
  },
  {
    title: "Embedded Phase Support",
    desc: "Full integration with your team during critical production phases.",
  },
  {
    title: "Special Projects",
    desc: "Targeted consulting engagements for specific challenges or initiatives.",
  },
]

export default function ConsultingPage() {
  return (
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
            Service / Executive Consulting
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter mb-6">
            Executive & Strategic Consulting
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed">
            High-level guidance for projects where decisions carry weight, timelines are tight, and the cost of
            uncertainty is high.
          </p>
        </div>

        {/* Overview */}
        <section className="mb-24">
          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-2xl font-bold mb-6">Overview</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                This service delivers senior oversight across all technical, creative, and production domains. It
                provides the thinking, modelling, risk control, and decision stewardship that complex productions
                require.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Ideal for programs operating at scale, managing concurrent workstreams, or navigating ambiguous
                environments where clarity and certainty are non-negotiable.
              </p>
            </div>
            <div className="bg-accent/5 border border-border p-8">
              <h3 className="font-mono text-sm text-emerald-500 uppercase tracking-widest mb-6">
                Performance Indicators
              </h3>
              <div className="grid grid-cols-1 gap-6">
                <div className="border-b border-border pb-4">
                  <p className="text-4xl font-bold text-emerald-500">+40%</p>
                  <p className="text-sm text-muted-foreground mt-1">Faster decision cycles</p>
                </div>
                <div className="border-b border-border pb-4">
                  <p className="text-4xl font-bold text-emerald-500">60%</p>
                  <p className="text-sm text-muted-foreground mt-1">Reduction in early-phase risk</p>
                </div>
                <div>
                  <p className="text-4xl font-bold text-emerald-500">100%</p>
                  <p className="text-sm text-muted-foreground mt-1">Clarity across teams</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Deliverables */}
        <section className="mb-24">
          <h2 className="text-2xl font-bold mb-12">Deliverables</h2>
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

        {/* Engagement Models */}
        <section className="mb-24">
          <h2 className="text-2xl font-bold mb-12">Engagement Models</h2>
          <div className="grid md:grid-cols-3 gap-px bg-border border border-border">
            {engagementModels.map((model, i) => (
              <div key={i} className="bg-background p-8">
                <div className="font-mono text-xs text-emerald-500 mb-2">{(i + 1).toString().padStart(2, "0")}</div>
                <h3 className="font-bold mb-2">{model.title}</h3>
                <p className="text-sm text-muted-foreground">{model.desc}</p>
              </div>
            ))}
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

        {/* CTA */}
        <section className="border-t border-border pt-16">
          <div className="max-w-2xl">
            <h2 className="text-2xl font-bold mb-4">Start a Project</h2>
            <p className="text-muted-foreground mb-8">
              Let's discuss how executive-level oversight can de-risk your next production and accelerate your decision
              making.
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
  )
}
