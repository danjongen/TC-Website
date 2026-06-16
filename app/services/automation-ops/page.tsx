import type { Metadata } from "next"
import Link from "next/link"
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle,
  Zap,
  BarChart3,
  Bot,
  Package,
  Bell,
  MessageSquare,
  TrendingUp,
  Workflow,
  Shield,
} from "lucide-react"
import { BreadcrumbSchema, ServicePageSchema } from "@/components/structured-data"
import { ServiceAccordion } from "@/components/v2/service-accordion"

export const metadata: Metadata = {
  title: "Automation & AI Operations | Business Process Automation | TC Agency",
  description:
    "TC Agency builds automated workflows, operations systems, and AI-powered business tools. Order notifications, inventory management, supplier tracking, and intelligent operations for e-commerce and service businesses.",
  keywords: [
    "business automation",
    "AI operations",
    "workflow automation",
    "order automation",
    "e-commerce automation",
    "Shopify automation",
    "WooCommerce automation",
    "operations automation",
    "business process automation",
    "AI business tools",
    "automated reporting",
    "inventory automation",
    "TC Agency",
    "Technically Creative",
  ],
  openGraph: {
    title: "Automation & AI Operations | TC Agency",
    description:
      "Automated workflows, operations systems, and AI-powered business tools. The same systems we built to run our own business, now available for yours.",
    url: "https://tc.agency/services/automation-ops",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Automation & AI Operations by TC Agency",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Automation & AI Operations | TC Agency",
    description:
      "Automated workflows, operations systems, and AI-powered tools for businesses that want to stop doing things manually.",
    images: ["/og-image.png"],
  },
  alternates: {
    canonical: "https://tc.agency/services/automation-ops",
  },
}

const tiers = [
  {
    num: "01",
    title: "Automated Workflows",
    subtitle: "Set it up once. It runs forever.",
    description:
      "Customer-facing automations that handle the repetitive communication your team does manually today. Order confirmations, shipping updates, delay notifications, review requests. All triggered automatically from your existing platform.",
    features: [
      "Order status notifications to customers",
      "Shipping and delivery alerts",
      "Delay and exception notifications",
      "Post-purchase review requests",
      "One-time setup on your existing platform",
      "No monthly fees, no ongoing contracts",
    ],
    platforms: "Shopify, WooCommerce, BigCommerce, custom platforms",
    icon: Zap,
  },
  {
    num: "02",
    title: "Operations Automation",
    subtitle: "Your back office, running itself.",
    description:
      "Everything in Automated Workflows, plus the internal systems that keep your operations tight. Inventory alerts before you run out. Reorder triggers that fire automatically. Supplier tracking that tells you where things stand without asking. Reporting that builds itself.",
    features: [
      "Everything in Automated Workflows",
      "Low-stock and reorder alerts",
      "Automated supplier purchase orders",
      "Supplier status tracking and follow-ups",
      "Cross-platform data sync",
      "Automated weekly and monthly reporting",
    ],
    platforms: "Make.com, Airtable, Shopify, WooCommerce, Google Sheets, Slack, email",
    icon: Workflow,
  },
  {
    num: "03",
    title: "AI Operations Engine",
    subtitle: "An operations team that never sleeps.",
    description:
      "A full AI-powered operations layer that sits on top of your business. It handles customer communications, triages your inbox, sends proactive alerts, answers natural language queries about your business, monitors cash flow, and gets smarter over time. This is not a chatbot. It is an operations system.",
    features: [
      "Everything in Operations Automation",
      "AI-powered customer communication handling",
      "Inbox triage and priority routing",
      "Proactive business alerts and anomaly detection",
      "Natural language business queries",
      "Cash flow monitoring and forecasting",
      "Ongoing optimization and learning",
    ],
    platforms: "Custom integrations across your entire stack",
    icon: Bot,
  },
]

const problems = [
  "You manually send order updates to customers",
  "Inventory runs low before anyone notices",
  "Supplier follow-ups fall through the cracks",
  "Your inbox is a mix of urgent and noise",
  "Reporting takes hours of copy-paste from multiple tools",
  "You answer the same customer questions repeatedly",
]

const howItWorks = [
  {
    phase: "Audit",
    desc: "We map your current operations. Every manual task, every repeated action, every bottleneck. We identify what should be automated and what should stay human.",
  },
  {
    phase: "Design",
    desc: "We architect the automation system around your existing tools. No ripping out what works. We build on top of it.",
  },
  {
    phase: "Build",
    desc: "We implement the automations, test them against real scenarios, and verify they handle edge cases correctly.",
  },
  {
    phase: "Deploy",
    desc: "We go live with monitoring in place. You see exactly what the system is doing and when. Nothing runs without your visibility.",
  },
  {
    phase: "Optimize",
    desc: "For AI Operations Engine clients: the system learns from your operations and improves over time. We review performance monthly and tune as your business evolves.",
  },
]

export default function AutomationOpsPage() {
  return (
    <main className="min-h-screen bg-background pt-24 pb-16">
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "https://tc.agency" },
          { name: "Services", url: "https://tc.agency/capabilities" },
          { name: "Automation & AI Operations", url: "https://tc.agency/services/automation-ops" },
        ]}
      />
      <ServicePageSchema
        name="Automation & AI Operations"
        description="Automated workflows, operations systems, and AI-powered business tools for e-commerce and service businesses. One-time setup, ongoing results."
        url="https://tc.agency/services/automation-ops"
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
          <p className="mb-6 font-mono text-[11px] tracking-[0.2em] text-zinc-400">[ SERVICE — AUTOMATION & AI OPERATIONS ]</p>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold tracking-[-0.03em] mb-6">
            Your operations, automated.
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed">
            The same operational systems we built to run our own business, now available for yours. From simple
            notification workflows to full AI-powered operations, we build systems that handle the work your team
            shouldn't be doing manually.
          </p>
        </div>

        {/* Problem Statement */}
        <section className="mb-24">
          <div className="grid lg:grid-cols-2 gap-px bg-zinc-900 border border-zinc-800">
            <div className="bg-background p-8 md:p-12">
              <h2 className="text-sm font-mono text-red-500 uppercase tracking-widest mb-6">The Problem</h2>
              <p className="text-muted-foreground mb-6">
                You are spending hours on manual follow-ups, customer updates, and data entry. Every order confirmation
                sent by hand, every inventory check done from memory, every report assembled from three different
                spreadsheets: that is time your business loses every single day.
              </p>
              <ul className="space-y-3">
                {problems.map((problem, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-muted-foreground">
                    <span className="text-red-500 mt-0.5">x</span>
                    <span>{problem}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-background p-8 md:p-12">
              <h2 className="text-sm font-mono text-zinc-400 uppercase tracking-widest mb-6">The Solution</h2>
              <p className="text-muted-foreground mb-6">
                Automate the repetitive. Keep the human for what matters. We build systems that handle your operational
                overhead so your team can focus on growth, relationships, and the work that actually requires a brain.
              </p>
              <ul className="space-y-3">
                <li className="flex items-start gap-3 text-sm text-muted-foreground">
                  <CheckCircle className="w-4 h-4 text-zinc-500 mt-0.5 flex-shrink-0" />
                  <span>Customers get instant, accurate updates without your team lifting a finger</span>
                </li>
                <li className="flex items-start gap-3 text-sm text-muted-foreground">
                  <CheckCircle className="w-4 h-4 text-zinc-500 mt-0.5 flex-shrink-0" />
                  <span>Inventory and supply chain run on autopilot with alerts when attention is needed</span>
                </li>
                <li className="flex items-start gap-3 text-sm text-muted-foreground">
                  <CheckCircle className="w-4 h-4 text-zinc-500 mt-0.5 flex-shrink-0" />
                  <span>Reports generate themselves from live data across all your tools</span>
                </li>
                <li className="flex items-start gap-3 text-sm text-muted-foreground">
                  <CheckCircle className="w-4 h-4 text-zinc-500 mt-0.5 flex-shrink-0" />
                  <span>AI handles routine communications and surfaces only what requires your judgment</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Service Tiers */}
        <section className="mb-24">
          <div className="mb-12">
            <h2 className="text-2xl font-semibold tracking-[-0.03em] mb-2">Three levels of automation</h2>
            <p className="text-muted-foreground">
              Start where it makes sense. Scale when you are ready.
            </p>
          </div>

          <div className="space-y-6">
            {tiers.map((tier) => (
              <div key={tier.num} className="border border-zinc-800 bg-zinc-950 p-8 md:p-10">
                <div className="grid lg:grid-cols-5 gap-8">
                  <div className="lg:col-span-2">
                    <div className="flex items-center gap-3 mb-4">
                      <span className="text-xs font-mono text-zinc-500">{tier.num}</span>
                      <tier.icon className="w-6 h-6 text-zinc-500" />
                    </div>
                    <h3 className="text-2xl font-semibold tracking-[-0.03em] mb-2">{tier.title}</h3>
                    <p className="text-sm font-mono text-zinc-500 mb-4">{tier.subtitle}</p>
                    <p className="text-muted-foreground leading-relaxed">{tier.description}</p>
                    <div className="mt-6 pt-4 border-t border-zinc-800">
                      <p className="text-xs font-mono text-muted-foreground uppercase mb-1">Platforms</p>
                      <p className="text-sm text-muted-foreground">{tier.platforms}</p>
                    </div>
                  </div>
                  <div className="lg:col-span-3">
                    <h4 className="text-xs font-mono text-zinc-500 uppercase mb-4">What you get</h4>
                    <ul className="space-y-3">
                      {tier.features.map((feature, i) => (
                        <li key={i} className="flex items-start gap-3 text-sm text-muted-foreground">
                          <CheckCircle className="w-4 h-4 text-zinc-500 mt-0.5 flex-shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Use Cases */}
        <section className="mb-24">
          <h2 className="text-2xl font-semibold tracking-[-0.03em] mb-8">Common automations we build</h2>
          <ServiceAccordion
            items={[
              {
                icon: Bell,
                title: "Order Lifecycle Notifications",
                desc: "Confirmation, shipping, delivery, delay alerts. All automatic, all branded, all accurate.",
              },
              {
                icon: Package,
                title: "Inventory Management",
                desc: "Low-stock alerts, automatic reorder triggers, supplier notifications. Never run out unexpectedly.",
              },
              {
                icon: BarChart3,
                title: "Automated Reporting",
                desc: "Daily sales summaries, weekly ops reports, monthly financials. Built from live data, delivered on schedule.",
              },
              {
                icon: MessageSquare,
                title: "Customer Communication",
                desc: "AI-drafted responses, FAQ handling, review requests. Your voice, your tone, without your time.",
              },
              {
                icon: TrendingUp,
                title: "Cash Flow Monitoring",
                desc: "Revenue tracking, expense categorization, anomaly detection. Know where you stand without opening a spreadsheet.",
              },
              {
                icon: Shield,
                title: "Exception Handling",
                desc: "Failed payments, shipping errors, supplier delays. The system catches problems and escalates only when needed.",
              },
            ].map((item) => ({
              title: item.title,
              description: item.desc,
            }))}
          />
        </section>

        {/* How It Works */}
        <section className="mb-24">
          <h2 className="text-2xl font-semibold tracking-[-0.03em] mb-12">How it works</h2>
          <div className="max-w-3xl">
            <div className="space-y-8">
              {howItWorks.map((step, i) => (
                <div key={i} className="flex items-baseline gap-6">
                  <div className="font-mono text-zinc-500 text-sm w-8 shrink-0">{(i + 1).toString().padStart(2, "0")}</div>
                  <div>
                    <h3 className="font-semibold mb-2">{step.phase}</h3>
                    <p className="text-sm text-muted-foreground">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Differentiator */}
        <section className="mb-24">
          <div className="border border-zinc-800 bg-zinc-950 p-8 md:p-12">
            <h2 className="text-2xl font-semibold tracking-[-0.03em] mb-6">Why TC builds this differently</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  We are not an agency selling retainers. We are engineers who built these systems for our own operations
                  first. Every automation we deploy has been tested in a real business before it ever reaches yours.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  Our background is in production engineering for live events: environments where systems must work the
                  first time, every time, with no margin for error. We bring that same rigor to business operations
                  automation.
                </p>
              </div>
              <div>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  We build on your existing platforms. No proprietary lock-in, no monthly tool subscriptions that only we
                  can manage. When we hand off an Automated Workflows system, it is yours. It runs on your infrastructure
                  and you own every piece of it.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  For Operations Automation and AI Operations Engine clients, we provide ongoing optimization because
                  those systems improve with data. But even then, you are never locked in. Everything we build is
                  documented and transferable.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="border-t border-zinc-800 pt-16">
          <div className="max-w-2xl">
            <h2 className="text-2xl font-semibold tracking-[-0.03em] mb-4">Let's talk about what makes sense for your business</h2>
            <p className="text-muted-foreground mb-8">
              Every business runs differently. Tell us what is eating your time and we will tell you what can be
              automated, what should stay manual, and where to start.
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
