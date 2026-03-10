import type { Metadata } from "next"
import Link from "next/link"
import { ArrowLeft, Settings, Repeat, Clock, Shield, Terminal, GitBranch } from "lucide-react"

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
          <div className="text-sm font-mono text-emerald-500 mb-4 uppercase tracking-widest">
            Service / Workflow Automation
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter mb-6">Production Automation</h1>
          <p className="text-xl text-muted-foreground leading-relaxed">
            Custom automation that eliminates manual tasks, reduces human error, and creates infinitely repeatable
            production workflows.
          </p>
        </div>

        {/* Problem / Solution */}
        <section className="mb-24">
          <div className="grid lg:grid-cols-2 gap-px bg-border border border-border">
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
              <h2 className="text-sm font-mono text-emerald-500 uppercase tracking-widest mb-6">Our Solution</h2>
              <ul className="space-y-4 text-muted-foreground">
                <li className="flex items-start gap-3">
                  <span className="text-emerald-500">✓</span>
                  <span>Centralized show data with automatic propagation</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-emerald-500">✓</span>
                  <span>Deterministic cue execution every single time</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-emerald-500">✓</span>
                  <span>One-click deployment and system configuration</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-emerald-500">✓</span>
                  <span>Git-based versioning with full change history</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-emerald-500">✓</span>
                  <span>Fail-safes and validation at every step</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Automation Types */}
        <section className="mb-24">
          <h2 className="text-2xl font-bold mb-12">Automation Categories</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Terminal,
                title: "Show Control Systems",
                desc: "Unified control interfaces that coordinate lighting, video, audio, automation, and pyro from a single trigger source.",
                examples: ["QLab integration", "Medialon builds", "Custom Python/Node controllers"],
              },
              {
                icon: Repeat,
                title: "Data Pipeline Automation",
                desc: "Automated workflows that transform, validate, and distribute show data across all production systems.",
                examples: ["Cue sheet to console sync", "Patch list generation", "Asset distribution"],
              },
              {
                icon: GitBranch,
                title: "Version Control Systems",
                desc: "Git-based show file management with branching, merging, and rollback capabilities for production environments.",
                examples: ["Show file versioning", "Multi-venue variants", "Collaborative editing"],
              },
              {
                icon: Clock,
                title: "Timecode Automation",
                desc: "Frame-accurate synchronization and automated show execution driven by LTC, MTC, or network timecode.",
                examples: ["Multi-system sync", "Backup failover", "Show logging"],
              },
              {
                icon: Shield,
                title: "Validation & Testing",
                desc: "Automated pre-show checks that verify system health, data integrity, and communication pathways.",
                examples: ["Network diagnostics", "Cue validation", "System health monitoring"],
              },
              {
                icon: Settings,
                title: "Configuration Management",
                desc: "Infrastructure-as-code approaches to production system deployment and configuration.",
                examples: ["Network configs", "Console templates", "Server provisioning"],
              },
            ].map((item, i) => (
              <div key={i} className="border border-border p-6 hover:border-emerald-900/50 transition-colors">
                <item.icon className="w-8 h-8 text-emerald-500 mb-4" />
                <h3 className="font-bold mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground mb-4">{item.desc}</p>
                <div className="pt-4 border-t border-border">
                  <div className="text-xs font-mono text-muted-foreground mb-2">Examples:</div>
                  <ul className="space-y-1">
                    {item.examples.map((ex, j) => (
                      <li key={j} className="text-xs text-muted-foreground">
                        • {ex}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Methodology */}
        <section className="mb-24">
          <h2 className="text-2xl font-bold mb-12">Methodology</h2>
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
                  <div className="font-mono text-emerald-500 text-sm w-8">{(i + 1).toString().padStart(2, "0")}</div>
                  <div>
                    <h3 className="font-bold mb-2">{step.phase}</h3>
                    <p className="text-sm text-muted-foreground">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="border-t border-border pt-16">
          <div className="max-w-2xl">
            <h2 className="text-2xl font-bold mb-4">Ready to automate your production?</h2>
            <p className="text-muted-foreground mb-8">
              Let's identify the manual processes slowing you down and build systems that scale.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 bg-white text-black font-bold uppercase tracking-wide hover:bg-gray-200 transition-colors"
            >
              Start a Conversation
            </Link>
          </div>
        </section>
      </div>
    </main>
  )
}
