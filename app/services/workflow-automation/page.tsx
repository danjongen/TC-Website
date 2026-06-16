import type { Metadata } from "next"
import Link from "next/link"
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle,
  Terminal,
  Repeat,
  Clock,
  Shield,
  GitBranch,
  Settings,
} from "lucide-react"
import { BreadcrumbSchema, ServicePageSchema } from "@/components/structured-data"
import { ServiceAccordion } from "@/components/v2/service-accordion"

export const metadata: Metadata = {
  title: "Workflow Automation | Production Systems Engineering | TC Agency",
  description:
    "TC Agency engineers custom workflow automation that eliminates manual tasks, reduces errors, and creates repeatable production systems. Show control, data pipelines, version control, and timecode automation for live events.",
  keywords: [
    "workflow automation live events",
    "production automation systems",
    "show control programming",
    "automation systems live events",
    "workflow automation",
    "production automation",
    "control systems",
    "cue automation",
    "timecode automation",
    "data pipeline automation",
    "TC Agency",
    "Technically Creative",
  ],
  openGraph: {
    title: "Workflow Automation | Production Systems Engineering | TC Agency",
    description:
      "Custom automation systems that eliminate manual tasks, reduce errors, and create repeatable production workflows for live events and broadcast.",
    url: "https://tc.agency/services/workflow-automation",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Workflow Automation — TC Agency Production Systems Engineering",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Workflow Automation | Production Systems Engineering | TC Agency",
    description:
      "Custom automation systems that eliminate manual tasks, reduce errors, and create repeatable production workflows for live events and broadcast.",
    images: ["/og-image.png"],
  },
  alternates: {
    canonical: "https://tc.agency/services/workflow-automation",
  },
}

const automationCategories = [
  {
    icon: Terminal,
    title: "Show Control Systems",
    desc: "Unified control interfaces that coordinate lighting, video, audio, automation, and pyro from a single trigger source. We build systems that give operators deterministic execution without sacrificing creative flexibility.",
    examples: [
      "QLab and Medialon integration",
      "Custom Python/Node.js controllers",
      "OSC/MIDI routing architectures",
      "Multi-console trigger coordination",
    ],
  },
  {
    icon: Repeat,
    title: "Data Pipeline Automation",
    desc: "Automated workflows that transform, validate, and distribute show data across all production systems. One source of truth, propagated everywhere it needs to go, verified at every step.",
    examples: [
      "Cue sheet to console sync",
      "Patch list generation and distribution",
      "Asset ingestion and transcoding",
      "Cross-system data reconciliation",
    ],
  },
  {
    icon: GitBranch,
    title: "Version Control Systems",
    desc: "Git-based show file management with branching, merging, and rollback capabilities purpose-built for production environments. Full audit trails and the ability to recover any previous state in seconds.",
    examples: [
      "Show file versioning and history",
      "Multi-venue variant management",
      "Collaborative editing workflows",
      "Automated backup and archival",
    ],
  },
  {
    icon: Clock,
    title: "Timecode Automation",
    desc: "Frame-accurate synchronization and automated show execution driven by LTC, MTC, or network timecode. Build shows that run with precision regardless of who presses GO.",
    examples: [
      "Multi-system timecode sync",
      "Automated failover and redundancy",
      "Show run logging and reporting",
      "Pre-programmed sequence execution",
    ],
  },
  {
    icon: Shield,
    title: "Validation and Testing",
    desc: "Automated pre-show checks that verify system health, data integrity, and communication pathways before anyone steps on stage. Catch problems before they become failures.",
    examples: [
      "Network diagnostics and monitoring",
      "Cue validation and conflict detection",
      "System health dashboards",
      "Automated regression testing",
    ],
  },
  {
    icon: Settings,
    title: "Configuration Management",
    desc: "Infrastructure-as-code approaches to production system deployment and configuration. Define your system once, deploy it reliably every time, across any venue or tour stop.",
    examples: [
      "Network switch and VLAN configs",
      "Console templates and macros",
      "Server provisioning scripts",
      "Environment-specific deployment profiles",
    ],
  },
]

const methodologySteps = [
  {
    phase: "Discovery",
    desc: "We audit your existing workflows, identify bottlenecks, and quantify time lost to manual processes. Every automation project starts with understanding the specific pain points that cost you the most time, introduce the most risk, or create the most friction between departments.",
  },
  {
    phase: "Architecture",
    desc: "Design the automation system with scalability, maintainability, and operator usability as primary concerns. We document data flows, define interfaces, and map failure modes before writing a single line of code. The architecture phase produces a clear specification that all stakeholders can review.",
  },
  {
    phase: "Development",
    desc: "Build in iterative cycles with frequent stakeholder review. We use industry-standard protocols (OSC, MIDI, sACN, Art-Net, REST, TCP/UDP) to ensure interoperability with your existing equipment. Every component is modular so individual pieces can be updated without disrupting the whole system.",
  },
  {
    phase: "Testing",
    desc: "Rigorous testing in isolated environments before any production deployment. We simulate failure modes, verify graceful degradation, and validate every edge case. Automation that has not been stress-tested does not belong on a live show.",
  },
  {
    phase: "Deployment",
    desc: "Staged rollout with operator training and comprehensive documentation. We deploy alongside your team during real shows, verifying performance under actual conditions. We do not hand off until your operators are confident and self-sufficient.",
  },
  {
    phase: "Support",
    desc: "Ongoing maintenance, updates, and priority support for critical show periods. Your automation systems evolve with your needs. We provide remote monitoring, version updates, and on-call availability when the stakes are highest.",
  },
]

export default function WorkflowAutomationPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "https://tc.agency" },
          { name: "Services", url: "https://tc.agency/capabilities" },
          { name: "Workflow Automation", url: "https://tc.agency/services/workflow-automation" },
        ]}
      />
      <ServicePageSchema
        name="Workflow Automation"
        description="Custom automation systems that eliminate manual tasks, reduce errors, and create repeatable production workflows for live events and broadcast."
        url="https://tc.agency/services/workflow-automation"
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
            <p className="mb-6 font-mono text-[11px] tracking-[0.2em] text-zinc-400">[ SERVICE — WORKFLOW AUTOMATION ]</p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold tracking-[-0.03em] mb-6">
              Production Workflow Automation
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed max-w-3xl">
              Custom automation that eliminates manual tasks, reduces human error, and creates infinitely repeatable
              production workflows. We build the systems that let your team focus on creative decisions instead of
              repetitive operations.
            </p>
          </div>

          {/* Introduction */}
          <section className="mb-24 max-w-4xl">
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                Every production has workflows that consume hours of skilled labor on tasks that should take seconds.
                Manual show file updates propagated across a dozen systems. Configuration changes repeated at every tour
                stop. Data entry that introduces errors precisely when accuracy matters most.
              </p>
              <p>
                TC Agency engineers automation systems purpose-built for live event and broadcast production. We apply
                software engineering discipline to production operations: version control for show files, automated
                testing for system configurations, continuous deployment for production environments. The result is
                workflows that run faster, fail less, and scale without adding headcount.
              </p>
              <p>
                Our automation work spans show control programming, data pipeline development, timecode-driven execution,
                and infrastructure-as-code deployment. Every system we build integrates with the tools your team already
                uses and the protocols your equipment already speaks.
              </p>
            </div>
          </section>

          {/* Problem / Solution */}
          <section className="mb-24">
            <div className="grid lg:grid-cols-2 gap-px bg-zinc-900 border border-zinc-800">
              <div className="bg-background p-12">
                <h2 className="text-sm font-mono text-red-500 uppercase tracking-widest mb-6">The Problem</h2>
                <ul className="space-y-4 text-muted-foreground">
                  <li className="flex items-start gap-3">
                    <span className="text-red-500 flex-shrink-0">×</span>
                    <span>Manual show file updates across multiple systems, repeated at every venue</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-red-500 flex-shrink-0">×</span>
                    <span>Inconsistent execution between shows, operators, and tour stops</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-red-500 flex-shrink-0">×</span>
                    <span>Hours lost to repetitive configuration and data entry tasks</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-red-500 flex-shrink-0">×</span>
                    <span>No version control, audit trail, or rollback capability for show data</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-red-500 flex-shrink-0">×</span>
                    <span>Human error in high-pressure live environments with no safety net</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-red-500 flex-shrink-0">×</span>
                    <span>Tribal knowledge locked in individual operators rather than codified in systems</span>
                  </li>
                </ul>
              </div>
              <div className="bg-background p-12">
                <h2 className="text-sm font-mono text-zinc-400 uppercase tracking-widest mb-6">Our Solution</h2>
                <ul className="space-y-4 text-muted-foreground">
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-4 h-4 text-zinc-500 mt-1 flex-shrink-0" />
                    <span>Centralized show data with automatic propagation to all downstream systems</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-4 h-4 text-zinc-500 mt-1 flex-shrink-0" />
                    <span>Deterministic cue execution with identical results every single time</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-4 h-4 text-zinc-500 mt-1 flex-shrink-0" />
                    <span>One-click deployment and system configuration across any venue</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-4 h-4 text-zinc-500 mt-1 flex-shrink-0" />
                    <span>Git-based versioning with full change history and instant rollback</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-4 h-4 text-zinc-500 mt-1 flex-shrink-0" />
                    <span>Automated validation and fail-safes at every step of the workflow</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-4 h-4 text-zinc-500 mt-1 flex-shrink-0" />
                    <span>Institutional knowledge encoded in repeatable, documented automation</span>
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* Automation Categories */}
          <section className="mb-24">
            <h2 className="text-2xl font-semibold tracking-[-0.03em] mb-12">Automation Categories</h2>
            <ServiceAccordion
              items={automationCategories.map((item) => ({
                title: item.title,
                description: item.desc,
                points: item.examples,
              }))}
            />
          </section>

          {/* Methodology */}
          <section className="mb-24">
            <h2 className="text-2xl font-semibold tracking-[-0.03em] mb-12">Methodology</h2>
            <div className="max-w-3xl">
              <div className="space-y-8">
                {methodologySteps.map((step, i) => (
                  <div key={i} className="flex gap-6">
                    <div className="font-mono text-zinc-500 text-sm w-8 flex-shrink-0">
                      {(i + 1).toString().padStart(2, "0")}
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2">{step.phase}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Cross-links */}
          <section className="mb-24">
            <h2 className="text-2xl font-semibold tracking-[-0.03em] mb-8">Related Services</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <Link
                href="/services/system-integration"
                className="group border border-zinc-800 p-6 hover:border-[#00D26A]/30 transition-colors flex items-center justify-between"
              >
                <div>
                  <div className="text-xs font-mono text-zinc-400 uppercase tracking-widest mb-2">Service</div>
                  <h3 className="font-semibold group-hover:text-[#00D26A] transition-colors">System Integration</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Automation works best on well-integrated infrastructure. See how we connect production systems into
                    unified, controllable networks.
                  </p>
                </div>
                <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-[#00D26A] transition-colors flex-shrink-0 ml-4" />
              </Link>
              <Link
                href="/services/technical-direction"
                className="group border border-zinc-800 p-6 hover:border-[#00D26A]/30 transition-colors flex items-center justify-between"
              >
                <div>
                  <div className="text-xs font-mono text-zinc-400 uppercase tracking-widest mb-2">Service</div>
                  <h3 className="font-semibold group-hover:text-[#00D26A] transition-colors">Technical Direction</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Strategic oversight that determines where automation delivers the highest impact across your
                    production program.
                  </p>
                </div>
                <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-[#00D26A] transition-colors flex-shrink-0 ml-4" />
              </Link>
            </div>
          </section>

          {/* CTA */}
          <section className="border-t border-zinc-800 pt-16">
            <div className="max-w-2xl">
              <h2 className="text-2xl font-semibold tracking-[-0.03em] mb-4">Ready to automate your production workflows?</h2>
              <p className="text-muted-foreground mb-8">
                Let us identify the manual processes slowing your team down and build automation systems that scale
                across venues, tours, and seasons.
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
