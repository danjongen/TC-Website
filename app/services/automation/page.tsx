import type { Metadata } from "next"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { ServiceAccordion } from "@/components/v2/service-accordion"

export const metadata: Metadata = {
  title: "Workflow Automation | Production Systems | TC Agency",
  description:
    "TC Agency builds custom automation systems that eliminate manual tasks, reduce errors, and create repeatable production workflows. Control systems, cue automation, and data pipelines.",
  keywords: [
    "workflow automation",
    "production automation",
    "control systems",
    "cue automation",
    "TC Agency",
    "Technically Creative",
  ],
}

export default function AutomationPage() {
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
          <p className="mb-6 font-mono text-[11px] tracking-[0.2em] text-zinc-400">[ SERVICE — PRODUCTION AUTOMATION ]</p>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold tracking-[-0.03em] mb-6">Production Automation</h1>
          <p className="text-xl text-muted-foreground leading-relaxed">
            Custom automation that eliminates manual tasks, reduces human error, and creates infinitely repeatable
            production workflows.
          </p>
        </div>

        {/* Problem / Solution */}
        <section className="mb-24">
          <div className="grid lg:grid-cols-2 gap-px bg-zinc-900 border border-zinc-800">
            <div className="bg-background p-12">
              <h2 className="text-sm font-mono text-red-500 uppercase tracking-widest mb-6">The Problem</h2>
              <ul className="space-y-4 text-muted-foreground">
                <li className="flex items-start gap-3">
                  <span className="text-red-500">×</span>
                  <span>Manual show file updates across multiple systems</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-red-500">×</span>
                  <span>Inconsistent execution between shows and operators</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-red-500">×</span>
                  <span>Hours lost to repetitive configuration tasks</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-red-500">×</span>
                  <span>No version control or audit trail</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-red-500">×</span>
                  <span>Human error in high-pressure live environments</span>
                </li>
              </ul>
            </div>
            <div className="bg-background p-12">
              <h2 className="text-sm font-mono text-zinc-400 uppercase tracking-widest mb-6">Our Solution</h2>
              <ul className="space-y-4 text-muted-foreground">
                <li className="flex items-start gap-3">
                  <span className="text-zinc-500">✓</span>
                  <span>Centralized show data with automatic propagation</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-zinc-500">✓</span>
                  <span>Deterministic cue execution every single time</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-zinc-500">✓</span>
                  <span>One-click deployment and system configuration</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-zinc-500">✓</span>
                  <span>Git-based versioning with full change history</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-zinc-500">✓</span>
                  <span>Fail-safes and validation at every step</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Automation Types */}
        <section className="mb-24">
          <h2 className="text-2xl font-semibold tracking-[-0.03em] mb-12">Automation Categories</h2>
          <ServiceAccordion
            items={[
              {
                title: "Show Control Systems",
                description:
                  "Unified control interfaces that coordinate lighting, video, audio, automation, and pyro from a single trigger source.",
                points: ["QLab integration", "Medialon builds", "Custom Python/Node controllers"],
              },
              {
                title: "Data Pipeline Automation",
                description:
                  "Automated workflows that transform, validate, and distribute show data across all production systems.",
                points: ["Cue sheet to console sync", "Patch list generation", "Asset distribution"],
              },
              {
                title: "Version Control Systems",
                description:
                  "Git-based show file management with branching, merging, and rollback capabilities for production environments.",
                points: ["Show file versioning", "Multi-venue variants", "Collaborative editing"],
              },
              {
                title: "Timecode Automation",
                description:
                  "Frame-accurate synchronization and automated show execution driven by LTC, MTC, or network timecode.",
                points: ["Multi-system sync", "Backup failover", "Show logging"],
              },
              {
                title: "Validation & Testing",
                description:
                  "Automated pre-show checks that verify system health, data integrity, and communication pathways.",
                points: ["Network diagnostics", "Cue validation", "System health monitoring"],
              },
              {
                title: "Configuration Management",
                description: "Infrastructure-as-code approaches to production system deployment and configuration.",
                points: ["Network configs", "Console templates", "Server provisioning"],
              },
            ]}
          />
        </section>

        {/* Methodology */}
        <section className="mb-24">
          <h2 className="text-2xl font-semibold tracking-[-0.03em] mb-12">Methodology</h2>
          <div className="max-w-3xl">
            <div className="space-y-8">
              {[
                {
                  phase: "Discovery",
                  desc: "We audit your existing workflows, identify bottlenecks, and quantify time lost to manual processes. Every automation project starts with understanding your pain points.",
                },
                {
                  phase: "Architecture",
                  desc: "Design the automation system with scalability, maintainability, and operator usability as primary concerns. We document everything before writing a single line of code.",
                },
                {
                  phase: "Development",
                  desc: "Build in iterative cycles with frequent stakeholder review. We use industry-standard protocols (OSC, MIDI, REST, TCP/UDP) to ensure interoperability.",
                },
                {
                  phase: "Testing",
                  desc: "Rigorous testing in isolated environments before any production deployment. We simulate failure modes and verify graceful degradation.",
                },
                {
                  phase: "Deployment",
                  desc: "Staged rollout with operator training and comprehensive documentation. We don't hand off until your team is confident.",
                },
                {
                  phase: "Support",
                  desc: "Ongoing maintenance, updates, and 24/7 support for critical show periods. Your automation is never abandoned.",
                },
              ].map((step, i) => (
                <div key={i} className="flex gap-6">
                  <div className="font-mono text-zinc-500 text-sm w-8">{(i + 1).toString().padStart(2, "0")}</div>
                  <div>
                    <h3 className="font-semibold mb-2">{step.phase}</h3>
                    <p className="text-sm text-muted-foreground">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="border-t border-zinc-800 pt-16">
          <div className="max-w-2xl">
            <h2 className="text-2xl font-semibold tracking-[-0.03em] mb-4">Ready to automate your production?</h2>
            <p className="text-muted-foreground mb-8">
              Let's identify the manual processes slowing you down and build systems that scale.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 bg-white text-black font-semibold uppercase tracking-wide hover:bg-gray-200 transition-colors"
            >
              Start a Conversation
            </Link>
          </div>
        </section>
      </div>
    </main>
  )
}
