import type { Metadata } from "next"
import Link from "next/link"
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle,
  Network,
  Repeat,
  ShieldCheck,
  Activity,
  Radio,
  SlidersHorizontal,
} from "lucide-react"
import { BreadcrumbSchema, ServicePageSchema } from "@/components/structured-data"

export const metadata: Metadata = {
  title: "System Integration | Production Network Engineering | TC Agency",
  description:
    "TC Agency designs and builds fully integrated production networks for live events. Protocol translation, redundancy planning, real-time monitoring, and multi-vendor system unification across OSC, MIDI, DMX, sACN, Art-Net, NDI, and Dante.",
  keywords: [
    "system integration live events",
    "production network engineering",
    "OSC MIDI DMX integration",
    "live event network design",
    "protocol translation",
    "sACN Art-Net NDI Dante",
    "TC Agency",
    "Technically Creative",
  ],
  openGraph: {
    title: "System Integration | Production Network Engineering | TC Agency",
    description:
      "One system, one interface, zero gaps. TC Agency engineers fully integrated production networks that unify every protocol, vendor, and subsystem in your live environment.",
    url: "https://tc.agency/services/system-integration",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "System Integration | Production Network Engineering | TC Agency",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "System Integration | Production Network Engineering | TC Agency",
    description:
      "One system, one interface, zero gaps. TC Agency engineers fully integrated production networks for high-stakes live events.",
    images: ["/og-image.png"],
  },
  alternates: {
    canonical: "https://tc.agency/services/system-integration",
  },
}

const integrationDomains = [
  {
    icon: Network,
    title: "Network Architecture",
    desc: "Purpose-built network topologies for live production environments. VLAN segmentation, QoS policies, and deterministic switching fabrics that guarantee bandwidth where it matters most.",
    capabilities: ["VLAN design", "QoS configuration", "Spine-leaf topologies", "PTP synchronization"],
  },
  {
    icon: Repeat,
    title: "Protocol Translation",
    desc: "Bridging the gaps between disparate control and media protocols so every system in the production ecosystem communicates natively, without manual intervention or data loss.",
    capabilities: ["OSC to MIDI routing", "DMX/sACN/Art-Net bridging", "NDI to SDI conversion", "Custom API gateways"],
  },
  {
    icon: ShieldCheck,
    title: "Redundancy & Failover",
    desc: "Automated failover architectures that detect faults and switch to backup paths before operators notice. Designed for productions where downtime is measured in lost audience trust.",
    capabilities: ["Primary/backup switching", "Network path redundancy", "Watchdog monitoring", "Graceful degradation"],
  },
  {
    icon: Activity,
    title: "Monitoring & Diagnostics",
    desc: "Real-time dashboards that surface system health, latency metrics, and error states across every node in the production network. Know the state of every signal path at a glance.",
    capabilities: ["Live topology maps", "Latency monitoring", "Error rate tracking", "Alerting and escalation"],
  },
  {
    icon: Radio,
    title: "Media Transport",
    desc: "Low-latency, high-bandwidth media transport networks for audio, video, and lighting data. Engineered for deterministic delivery with zero tolerance for dropped frames or glitched audio.",
    capabilities: ["Dante/AES67 audio", "NDI/SDI video", "sACN/Art-Net lighting", "Genlock and PTP sync"],
  },
  {
    icon: SlidersHorizontal,
    title: "Control Systems",
    desc: "Unified control surfaces that bring every subsystem under a single operator interface. Custom-built controllers, show control middleware, and integration layers that simplify complex rigs.",
    capabilities: ["OSC control surfaces", "MIDI mapping layers", "Companion/StreamDeck builds", "Timecode integration"],
  },
]

const protocols = [
  {
    category: "Control Protocols",
    items: ["OSC (Open Sound Control)", "MIDI / MIDI 2.0", "TCP/UDP sockets", "REST / WebSocket APIs", "Serial (RS-232/RS-485)"],
  },
  {
    category: "Lighting Protocols",
    items: ["DMX512", "sACN (E1.31)", "Art-Net 4", "RDM (E1.20)", "KiNET"],
  },
  {
    category: "Audio Protocols",
    items: ["Dante", "AES67", "AVB/Milan", "MADI", "Soundgrid"],
  },
  {
    category: "Video Protocols",
    items: ["NDI / NDI|HX", "SDI (12G/3G/HD)", "HDMI 2.1", "SRT / RIST", "IPMX / ST 2110"],
  },
  {
    category: "Network & Sync",
    items: ["PTPv2 (IEEE 1588)", "IGMP multicast", "LLDP / CDP", "SNMP monitoring", "802.1Q VLANs"],
  },
  {
    category: "Platforms",
    items: ["Companion / StreamDeck", "QLab / Medialon", "TouchDesigner", "Unreal Engine", "Node.js / Python"],
  },
]

const approachSteps = [
  {
    phase: "Assessment",
    desc: "We begin with a full audit of your existing infrastructure, signal flows, and operational requirements. Every cable, every protocol, every vendor system is cataloged and mapped. We identify bottlenecks, single points of failure, and integration gaps that limit your production capability.",
  },
  {
    phase: "Architecture",
    desc: "With a clear picture of the current state, we design the target network architecture. This includes VLAN structures, protocol bridging strategies, redundancy paths, and monitoring points. Every design decision is documented with rationale and fallback options.",
  },
  {
    phase: "Implementation",
    desc: "We build the integration layer systematically, starting with core network infrastructure and working outward to edge devices. Each subsystem is brought online incrementally, validated against the architecture spec, and documented for operations teams.",
  },
  {
    phase: "Testing",
    desc: "Rigorous end-to-end testing across all signal paths and failure scenarios. We simulate network faults, device failures, and protocol edge cases to verify that the system degrades gracefully and recovers automatically when possible.",
  },
  {
    phase: "Commissioning",
    desc: "Final system validation under show conditions. We run the full production stack through rehearsal cycles, verify latency budgets, confirm failover behavior, and tune monitoring thresholds. The system is not signed off until it performs flawlessly under load.",
  },
  {
    phase: "Support",
    desc: "Ongoing network monitoring, firmware management, and system optimization. We provide 24/7 support during critical show periods and maintain detailed runbooks so your operations team can troubleshoot independently.",
  },
]

export default function SystemIntegrationPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "https://tc.agency" },
          { name: "Services", url: "https://tc.agency/capabilities" },
          { name: "System Integration", url: "https://tc.agency/services/system-integration" },
        ]}
      />
      <ServicePageSchema
        name="System Integration"
        description="Production network engineering and system integration for live events. Protocol translation, redundancy planning, real-time monitoring, and multi-vendor unification across OSC, MIDI, DMX, sACN, Art-Net, NDI, and Dante."
        url="https://tc.agency/services/system-integration"
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
              Service / System Integration
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter mb-6">
              Production Network Engineering
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Making all your production technology talk to each other. One system, one interface, zero gaps. We engineer
              the integration layer that connects every protocol, every vendor, and every subsystem into a unified,
              monitored, and resilient production network.
            </p>
          </div>

          {/* Overview with Performance Indicators */}
          <section className="mb-24">
            <div className="grid lg:grid-cols-2 gap-12">
              <div>
                <h2 className="text-2xl font-bold mb-6">Overview</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Modern live productions run on dozens of interconnected systems from multiple vendors, each speaking
                  its own protocol. Lighting consoles output DMX and sACN. Audio networks run on Dante. Video systems
                  use NDI. Show control speaks OSC and MIDI. Without a deliberate integration strategy, these systems
                  operate as isolated islands, requiring manual coordination and creating fragile dependencies that fail
                  under pressure.
                </p>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  We design and build the connective tissue that turns a collection of standalone systems into a single,
                  cohesive production platform. Our integration work spans protocol translation, network architecture,
                  redundancy engineering, and real-time monitoring. The result is a production environment where every
                  signal path is deterministic, every failover is automated, and every operator has visibility into the
                  full system state.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  Whether you are building a permanent installation, a touring production, or a one-off broadcast, we
                  engineer integration solutions that scale with your requirements and survive the unpredictable
                  conditions of live performance.
                </p>
              </div>
              <div className="bg-accent/5 border border-border p-8">
                <h3 className="font-mono text-sm text-emerald-500 uppercase tracking-widest mb-6">
                  Performance Indicators
                </h3>
                <div className="grid grid-cols-1 gap-6">
                  <div className="border-b border-border pb-4">
                    <p className="text-4xl font-bold text-emerald-500">20+</p>
                    <p className="text-sm text-muted-foreground mt-1">Protocols supported and actively integrated</p>
                  </div>
                  <div className="border-b border-border pb-4">
                    <p className="text-4xl font-bold text-emerald-500">&lt;1ms</p>
                    <p className="text-sm text-muted-foreground mt-1">Inter-system latency across bridged protocols</p>
                  </div>
                  <div>
                    <p className="text-4xl font-bold text-emerald-500">100%</p>
                    <p className="text-sm text-muted-foreground mt-1">Show completion rate with redundancy architecture</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Integration Domains Grid */}
          <section className="mb-24">
            <h2 className="text-2xl font-bold mb-12">Integration Domains</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {integrationDomains.map((domain, i) => (
                <div key={i} className="border border-border p-6 hover:border-emerald-900/50 transition-colors">
                  <domain.icon className="w-8 h-8 text-emerald-500 mb-4" />
                  <h3 className="font-bold mb-2">{domain.title}</h3>
                  <p className="text-sm text-muted-foreground mb-4">{domain.desc}</p>
                  <div className="pt-4 border-t border-border">
                    <div className="text-xs font-mono text-muted-foreground mb-2">Capabilities:</div>
                    <ul className="space-y-1">
                      {domain.capabilities.map((cap, j) => (
                        <li key={j} className="flex items-start gap-2 text-xs text-muted-foreground">
                          <CheckCircle className="w-3 h-3 text-emerald-500 mt-0.5 flex-shrink-0" />
                          {cap}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Technology / Protocols */}
          <section className="mb-24">
            <h2 className="text-2xl font-bold mb-12">Supported Protocols & Platforms</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-border border border-border">
              {protocols.map((group, i) => (
                <div key={i} className="bg-background p-8">
                  <h3 className="font-mono text-xs text-emerald-500 uppercase tracking-widest mb-4">
                    {group.category}
                  </h3>
                  <ul className="space-y-2">
                    {group.items.map((item, j) => (
                      <li key={j} className="text-sm text-muted-foreground">
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          {/* Approach */}
          <section className="mb-24">
            <h2 className="text-2xl font-bold mb-12">Our Approach</h2>
            <div className="max-w-3xl">
              <div className="space-y-8">
                {approachSteps.map((step, i) => (
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

          {/* Cross-links */}
          <section className="mb-24">
            <h2 className="text-2xl font-bold mb-12">Related Services & Work</h2>
            <div className="grid md:grid-cols-3 gap-px bg-border border border-border">
              {[
                {
                  label: "Service",
                  title: "Workflow Automation",
                  desc: "Automate the manual processes that sit on top of your integrated systems. Cue sequencing, data pipelines, and configuration management.",
                  href: "/services/workflow-automation",
                },
                {
                  label: "Service",
                  title: "Technical Direction",
                  desc: "Senior technical leadership for productions that demand coordinated system design from day one through final show.",
                  href: "/services/technical-direction",
                },
                {
                  label: "Portfolio",
                  title: "Sphere Residency",
                  desc: "Large-scale system integration across lighting, video, audio, and show control for one of the most complex venues ever built.",
                  href: "/portfolio",
                },
              ].map((link, i) => (
                <Link
                  key={i}
                  href={link.href}
                  className="bg-background p-8 group hover:bg-accent/5 transition-colors"
                >
                  <div className="font-mono text-xs text-emerald-500 uppercase tracking-widest mb-2">{link.label}</div>
                  <h3 className="font-bold mb-2 group-hover:text-emerald-500 transition-colors">{link.title}</h3>
                  <p className="text-sm text-muted-foreground">{link.desc}</p>
                  <div className="mt-4 flex items-center gap-1 text-sm text-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity">
                    View details <ArrowRight className="w-3 h-3" />
                  </div>
                </Link>
              ))}
            </div>
          </section>

          {/* CTA */}
          <section className="border-t border-border pt-16">
            <div className="max-w-2xl">
              <h2 className="text-2xl font-bold mb-4">Ready to unify your production systems?</h2>
              <p className="text-muted-foreground mb-8">
                Let's map your integration requirements and design a network architecture that connects every system
                in your production environment.
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
