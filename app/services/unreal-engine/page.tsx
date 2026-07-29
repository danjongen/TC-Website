import type { Metadata } from "next"
import Link from "next/link"
import { ArrowLeft, Layers, Box, Eye, Zap } from "lucide-react"
import { ServiceAccordion } from "@/components/v2/service-accordion"

export const metadata: Metadata = {
  title: "Unreal Engine Integration | Real-Time Visualization | TC Agency",
  description:
    "TC Agency delivers production-grade Unreal Engine integration for live events, virtual production, and immersive experiences. Real-time visualization, LED volume workflows, and nDisplay configuration.",
  keywords: [
    "Unreal Engine",
    "virtual production",
    "real-time visualization",
    "LED volume",
    "nDisplay",
    "TC Agency",
    "Technically Creative",
  ],
}

export default function UnrealEnginePage() {
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
          <p className="mb-6 font-mono text-[11px] tracking-[0.2em] text-zinc-400">[ SERVICE / UNREAL ENGINE ]</p>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold tracking-[-0.03em] mb-6">
            Unreal Engine Integration
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed">
            Production-grade real-time visualization and virtual production workflows. See your show before a single
            truss is hung.
          </p>
        </div>

        {/* Overview */}
        <section className="mb-24">
          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-2xl font-semibold tracking-[-0.03em] mb-6">Overview</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                We leverage Unreal Engine as the backbone of our visualization pipeline, enabling clients to experience
                their productions in photorealistic detail months before load-in. Our integration spans from initial
                concept visualization through to live show control via disguise and other media server platforms.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Whether you're planning an LED volume shoot, a touring concert, or a one-off spectacle at Sphere, our
                Unreal workflows provide the accuracy and flexibility needed to make confident creative and technical
                decisions.
              </p>
            </div>
            <div className="bg-zinc-900/40 border border-zinc-800 p-8">
              <h3 className="font-mono text-sm text-zinc-400 uppercase tracking-widest mb-6">Key Capabilities</h3>
              <ul className="space-y-4">
                {[
                  "Photorealistic venue pre-visualization",
                  "LED content previz and pixel-mapping",
                  "nDisplay configuration and calibration",
                  "Virtual production stage design",
                  "Real-time lighting simulation",
                  "Camera tracking integration (BlackTrax, Mo-Sys)",
                  "Live show control via OSC/NDI",
                  "Multi-user collaborative sessions",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm">
                    <span className="text-zinc-500 font-mono">{(i + 1).toString().padStart(2, "0")}</span>
                    <span className="text-muted-foreground">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Process */}
        <section className="mb-24">
          <h2 className="text-2xl font-semibold tracking-[-0.03em] mb-12">Our Process</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-px bg-zinc-900 border border-zinc-800">
            {[
              {
                icon: Box,
                phase: "01",
                title: "Asset Acquisition",
                desc: "3D scanning of venues, CAD imports, and asset library integration. Every element dimensionally accurate.",
              },
              {
                icon: Layers,
                phase: "02",
                title: "Scene Assembly",
                desc: "Building the production environment with correct scale, sightlines, and technical infrastructure.",
              },
              {
                icon: Eye,
                phase: "03",
                title: "Creative Iteration",
                desc: "Real-time adjustments to lighting, content, and staging. Stakeholder reviews in-engine.",
              },
              {
                icon: Zap,
                phase: "04",
                title: "Production Handoff",
                desc: "Export to media servers, technical documentation, and operator training for show execution.",
              },
            ].map((step, i) => (
              <div key={i} className="bg-background p-8">
                <step.icon className="w-8 h-8 text-zinc-500 mb-4" />
                <div className="font-mono text-xs text-muted-foreground mb-2">{step.phase}</div>
                <h3 className="font-semibold mb-2">{step.title}</h3>
                <p className="text-sm text-muted-foreground">{step.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Technical Specifications */}
        <section className="mb-24">
          <h2 className="text-2xl font-semibold tracking-[-0.03em] mb-12">Technical Specifications</h2>
          <ServiceAccordion
            items={[
              {
                title: "Output Formats",
                points: [
                  "8K+ real-time rendering",
                  "HDR / Rec.2020 color space",
                  "nDisplay cluster output",
                  "NDI / SDI capture",
                  "EXR sequence export",
                ],
              },
              {
                title: "Integration Protocols",
                points: [
                  "OSC (Open Sound Control)",
                  "Art-Net / sACN",
                  "MIDI / MSC",
                  "REST API endpoints",
                  "Proprietary SDK bridges",
                ],
              },
              {
                title: "Platform Compatibility",
                points: [
                  "disguise (d3/gx/vx)",
                  "Notch",
                  "TouchDesigner",
                  "Pixotope",
                  "Zero Density",
                ],
              },
            ]}
          />
        </section>

        {/* CTA */}
        <section className="border-t border-zinc-800 pt-16">
          <div className="max-w-2xl">
            <h2 className="text-2xl font-semibold tracking-[-0.03em] mb-4">Ready to visualize your production?</h2>
            <p className="text-muted-foreground mb-8">
              Let's discuss how Unreal Engine integration can de-risk your next project and unlock creative
              possibilities.
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
