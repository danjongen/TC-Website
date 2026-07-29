import type { Metadata } from "next"
import Link from "next/link"
import {
  ArrowLeft,
  ArrowRight,
  Box,
  Image,
  PenTool,
  HardHat,
  Eye,
  GitBranch,
  Layers,
  ClipboardCheck,
  Send,
  MessageSquare,
} from "lucide-react"
import { BreadcrumbSchema, ServicePageSchema } from "@/components/structured-data"
import { ServiceAccordion } from "@/components/v2/service-accordion"

export const metadata: Metadata = {
  title: "Design & Visualization | Technical Drafting & 3D Rendering | TC Agency",
  description:
    "TC Agency delivers production design visualization, 3D CAD modeling, photorealistic rendering, and technical drafting for live events. From concept to production-ready blueprint with 99.5% dimensional accuracy.",
  keywords: [
    "production design visualization",
    "3D CAD live events",
    "event design rendering",
    "technical drafting production",
    "3D modeling live events",
    "photorealistic rendering",
    "technical drawings",
    "venue visualization",
    "TC Agency",
    "Technically Creative",
  ],
  openGraph: {
    title: "Design & Visualization | Technical Drafting & 3D Rendering | TC Agency",
    description:
      "From concept to production-ready blueprint. 3D CAD modeling, photorealistic rendering, and technical drafting that eliminates guesswork and reduces change orders.",
    url: "https://tc.agency/services/design-visualization",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Design & Visualization - TC Agency Production Engineering",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Design & Visualization | Technical Drafting & 3D Rendering | TC Agency",
    description:
      "From concept to production-ready blueprint. 3D CAD modeling, photorealistic rendering, and technical drafting that eliminates guesswork and reduces change orders.",
    images: ["/og-image.png"],
  },
  alternates: {
    canonical: "https://tc.agency/services/design-visualization",
  },
}

const deliverables = [
  {
    icon: Box,
    title: "3D CAD Modeling",
    items: [
      "Parametric stage and set modeling",
      "Structural and rigging geometry",
      "Accurate load and clearance volumes",
    ],
  },
  {
    icon: Image,
    title: "Photorealistic Rendering",
    items: [
      "Camera-matched venue perspectives",
      "Material and lighting simulation",
      "Client-ready presentation imagery",
    ],
  },
  {
    icon: PenTool,
    title: "Technical Drawings",
    items: [
      "Dimensioned plans, sections, and elevations",
      "Fabrication-ready detail sheets",
      "Annotation and spec callouts",
    ],
  },
  {
    icon: HardHat,
    title: "Structural Engineering",
    items: [
      "Load calculation support",
      "Connection and attachment details",
      "Compliance-ready documentation",
    ],
  },
  {
    icon: Eye,
    title: "Venue Visualization",
    items: [
      "Sightline and obstruction analysis",
      "Audience perspective walkthroughs",
      "LED content placement verification",
    ],
  },
  {
    icon: GitBranch,
    title: "Revision Control",
    items: [
      "Versioned drawing sets across stakeholders",
      "Change tracking and audit trails",
      "Multi-department approval workflows",
    ],
  },
]

const outputFormats = [
  { category: "CAD", formats: ["AutoCAD (.dwg/.dxf)", "Vectorworks (.vwx)", "SketchUp (.skp)"] },
  { category: "3D / Rendering", formats: ["Cinema 4D (.c4d)", "Unreal Engine (.uasset)", "FBX", "OBJ", "glTF"] },
  { category: "Documentation", formats: ["PDF drawing sets", "DWF markup files", "CSV schedules"] },
  { category: "Presentation", formats: ["High-res PNG/TIFF", "MP4 flythroughs", "Interactive web viewers"] },
]

const processSteps = [
  {
    icon: MessageSquare,
    phase: "01",
    title: "Brief",
    desc: "We gather project requirements, reference material, venue data, and stakeholder priorities. Every deliverable is scoped against the production timeline.",
  },
  {
    icon: PenTool,
    phase: "02",
    title: "Concept",
    desc: "Initial design exploration with rough massing models and layout options. Quick iterations establish direction before committing to detail work.",
  },
  {
    icon: Layers,
    phase: "03",
    title: "Development",
    desc: "Full 3D modeling, technical drawing production, and photorealistic rendering. All geometry is built to real-world dimensions with verified accuracy.",
  },
  {
    icon: ClipboardCheck,
    phase: "04",
    title: "Review",
    desc: "Structured review cycles with all stakeholders. Tracked revisions, redline markups, and version-controlled drawing sets keep everyone aligned.",
  },
  {
    icon: Send,
    phase: "05",
    title: "Production Handoff",
    desc: "Final deliverables packaged for fabrication, engineering, and on-site teams. Multi-format exports ensure every vendor gets exactly what they need.",
  },
]

export default function DesignVisualizationPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "https://tc.agency" },
          { name: "Services", url: "https://tc.agency/capabilities" },
          { name: "Design & Visualization", url: "https://tc.agency/services/design-visualization" },
        ]}
      />
      <ServicePageSchema
        name="Design & Visualization"
        description="Production design visualization, 3D CAD modeling, photorealistic rendering, and technical drafting for live events and complex productions."
        url="https://tc.agency/services/design-visualization"
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
            <p className="mb-6 font-mono text-[11px] tracking-[0.2em] text-zinc-400">[ SERVICE / DESIGN & VISUALIZATION ]</p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold tracking-[-0.03em] mb-6">
              Design & Visualization
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              From concept to production-ready blueprint before a single piece of steel is cut. Accurate
              visualization that eliminates guesswork, reduces change orders, and gives every stakeholder
              a clear picture of what gets built.
            </p>
          </div>

          {/* Overview */}
          <section className="mb-24">
            <div className="max-w-3xl">
              <h2 className="text-2xl font-semibold tracking-[-0.03em] mb-6">Overview</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Production design is where creative intent meets engineering reality. We build detailed 3D
                models, generate photorealistic renders, and produce complete technical drawing packages that
                serve as the single source of truth across your entire production team. Every dimension is
                verified. Every sightline is tested. Every detail is documented before fabrication begins.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Our visualization pipeline spans the full range of industry-standard platforms, from AutoCAD
                and Vectorworks through Cinema 4D and Unreal Engine. This means your design data moves
                cleanly between disciplines without translation errors or manual re-entry. Structural
                engineers, scenic fabricators, lighting designers, and video programmers all work from the
                same geometry.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                For complex multi-stakeholder projects, we provide structured revision control with tracked
                changes, version histories, and approval workflows. No more guessing which drawing set is
                current. No more building from outdated information.
              </p>
            </div>
          </section>

          {/* Deliverables Grid */}
          <section className="mb-24">
            <h2 className="text-2xl font-semibold tracking-[-0.03em] mb-12">Deliverables</h2>
            <ServiceAccordion
              items={deliverables.map((category) => ({
                title: category.title,
                points: category.items,
              }))}
            />
          </section>

          {/* Output Formats */}
          <section className="mb-24">
            <h2 className="text-2xl font-semibold tracking-[-0.03em] mb-12">Output Formats</h2>
            <p className="text-muted-foreground mb-8 max-w-3xl">
              Every project ships in the formats your team actually uses. We maintain native files across all
              major platforms so nothing is lost in translation between design, engineering, and fabrication.
            </p>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-px bg-zinc-900 border border-zinc-800">
              {outputFormats.map((group, i) => (
                <div key={i} className="bg-background p-8">
                  <div className="font-mono text-sm text-zinc-400 uppercase tracking-widest mb-4">
                    {group.category}
                  </div>
                  <ul className="space-y-2">
                    {group.formats.map((format, j) => (
                      <li key={j} className="text-sm text-muted-foreground">
                        {format}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          {/* Process */}
          <section className="mb-24">
            <h2 className="text-2xl font-semibold tracking-[-0.03em] mb-12">Process</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-px bg-zinc-900 border border-zinc-800">
              {processSteps.map((step, i) => (
                <div key={i} className="bg-background p-8">
                  <step.icon className="w-8 h-8 text-zinc-500 mb-4" />
                  <div className="font-mono text-xs text-muted-foreground mb-2">{step.phase}</div>
                  <h3 className="font-semibold mb-2">{step.title}</h3>
                  <p className="text-sm text-muted-foreground">{step.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Cross-links */}
          <section className="mb-24">
            <h2 className="text-2xl font-semibold tracking-[-0.03em] mb-8">Related Services</h2>
            <div className="grid md:grid-cols-2 gap-6 max-w-2xl">
              <Link
                href="/services/unreal-engine"
                className="group border border-zinc-800 p-6 hover:border-[#00D26A]/30 transition-colors flex items-center justify-between"
              >
                <div>
                  <div className="font-mono text-xs text-zinc-400 uppercase tracking-widest mb-1">
                    Real-Time
                  </div>
                  <div className="font-semibold group-hover:text-[#00D26A] transition-colors">
                    Unreal Engine Integration
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-[#00D26A] transition-colors" />
              </Link>
              <Link
                href="/services/3d-scanning"
                className="group border border-zinc-800 p-6 hover:border-[#00D26A]/30 transition-colors flex items-center justify-between"
              >
                <div>
                  <div className="font-mono text-xs text-zinc-400 uppercase tracking-widest mb-1">
                    Reality Capture
                  </div>
                  <div className="font-semibold group-hover:text-[#00D26A] transition-colors">
                    3D Scanning & Surveying
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-[#00D26A] transition-colors" />
              </Link>
            </div>
          </section>

          {/* CTA */}
          <section className="border-t border-zinc-800 pt-16">
            <div className="max-w-2xl">
              <h2 className="text-2xl font-semibold tracking-[-0.03em] mb-4">Ready to visualize your production?</h2>
              <p className="text-muted-foreground mb-8">
                Let's turn your concept into a production-ready design package that every stakeholder can
                trust. Accurate geometry, clear documentation, and zero ambiguity.
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
