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
} from "lucide-react"
import { ServiceAccordion } from "@/components/v2/service-accordion"

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
          <div className="text-sm font-mono text-[#00D26A] mb-4 uppercase tracking-widest">
            Service / Executive Consulting
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold tracking-[-0.03em] mb-6">
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
              <h2 className="text-2xl font-semibold mb-6">Overview</h2>
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
                <div>
                  <p className="text-4xl font-semibold text-[#00D26A]">100%</p>
                  <p className="text-sm text-muted-foreground mt-1">Clarity across teams</p>
                </div>
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
            <h2 className="text-2xl font-semibold mb-4">Start a Project</h2>
            <p className="text-muted-foreground mb-8">
              Let's discuss how executive-level oversight can de-risk your next production and accelerate your decision
              making.
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
