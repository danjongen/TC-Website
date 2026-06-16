import type { Metadata } from "next"
import Link from "next/link"
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle,
  Wrench,
  Cog,
  Printer,
  Cable,
  HardHat,
  ShieldCheck,
} from "lucide-react"
import { BreadcrumbSchema, ServicePageSchema } from "@/components/structured-data"
import { ServiceAccordion } from "@/components/v2/service-accordion"

export const metadata: Metadata = {
  title: "Custom Fabrication | Production Hardware Engineering | TC Agency",
  description:
    "TC Agency engineers and fabricates custom production hardware for live events, touring, and installations. CNC machining, 3D printing, cable assembly, structural engineering, and rapid prototyping.",
  keywords: [
    "custom fabrication live events",
    "production hardware engineering",
    "CNC machining entertainment",
    "custom rigging hardware",
    "3D printing production",
    "cable harness assembly",
    "TC Agency",
    "Technically Creative",
  ],
  openGraph: {
    title: "Custom Fabrication | Production Hardware Engineering | TC Agency",
    description:
      "Custom-engineered hardware for productions that require solutions that don't exist yet. From concept through delivery.",
    url: "https://tc.agency/services/custom-fabrication",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Custom Fabrication — TC Production Engineering",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Custom Fabrication | Production Hardware Engineering | TC Agency",
    description:
      "Custom-engineered hardware for productions that require solutions that don't exist yet. From concept through delivery.",
    images: ["/og-image.png"],
  },
  alternates: {
    canonical: "https://tc.agency/services/custom-fabrication",
  },
}

const capabilities = [
  {
    icon: Cog,
    title: "Mechanical Design",
    desc: "Full mechanical engineering from napkin sketch to production-ready CAD. Parametric modelling, FEA simulation, and detailed fabrication drawings for every component.",
    examples: ["SolidWorks / Fusion 360", "Finite element analysis", "GD&T documentation"],
  },
  {
    icon: Wrench,
    title: "CNC Machining",
    desc: "Precision subtractive manufacturing in aluminum, steel, HDPE, Delrin, and specialty alloys. Multi-axis milling and turning for complex geometries.",
    examples: ["3-axis and 5-axis milling", "Turning and threading", "Surface finishing"],
  },
  {
    icon: Printer,
    title: "3D Printing",
    desc: "Additive manufacturing for rapid prototyping and production parts. FDM, SLA, SLS, and MJF processes matched to your functional requirements.",
    examples: ["Functional prototypes", "Low-volume production", "Complex internal geometry"],
  },
  {
    icon: Cable,
    title: "Cable Assembly",
    desc: "Custom cable and harness fabrication built to spec. Multi-pin connectors, hybrid fiber/copper assemblies, and weatherproof builds for touring and outdoor environments.",
    examples: ["Multi-conductor harnesses", "Fiber optic assemblies", "Weatherproof connectors"],
  },
  {
    icon: HardHat,
    title: "Structural Engineering",
    desc: "Load-rated structural components designed and certified for overhead and stage applications. PE-stamped drawings available for permit and inspection requirements.",
    examples: ["Custom truss adapters", "Ground support components", "Structural brackets"],
  },
  {
    icon: ShieldCheck,
    title: "Load Testing & Certification",
    desc: "Destructive and non-destructive testing to validate safety margins. Working load limit verification and certification documentation for every rigging component.",
    examples: ["Proof load testing", "WLL certification", "Material traceability"],
  },
]

const materials = [
  { category: "Metals", items: ["6061 Aluminum", "7075 Aluminum", "304 Stainless Steel", "Mild Steel", "Titanium"] },
  { category: "Polymers", items: ["Delrin / Acetal", "HDPE", "UHMW", "Nylon 6/6", "Polycarbonate"] },
  { category: "Composites", items: ["Carbon Fiber", "G10 / FR4", "Fiberglass", "Kevlar Laminates"] },
  { category: "Additive", items: ["PLA / PETG", "ASA / ABS", "Nylon PA12 (SLS)", "Tough Resin (SLA)", "TPU Flex"] },
]

const processSteps = [
  {
    phase: "Design",
    desc: "We start with your requirements, constraints, and operating environment. Mechanical engineers translate the concept into parametric CAD with full simulation and design review before any material is cut.",
  },
  {
    phase: "Prototype",
    desc: "Rapid prototyping through 3D printing or soft tooling to validate form, fit, and function. Iterate quickly and confirm the design meets real-world conditions before committing to production tooling.",
  },
  {
    phase: "Test",
    desc: "Functional testing under simulated load, vibration, and environmental conditions. For rigging hardware, every part undergoes proof load testing and receives documented certification.",
  },
  {
    phase: "Manufacture",
    desc: "Production runs on CNC mills, lathes, and additive systems with in-process quality checks. Consistent tolerances across every unit, whether you need five parts or five hundred.",
  },
  {
    phase: "Deliver",
    desc: "Final QA, surface treatment, and packaging. Every shipment includes inspection reports, material certifications, and assembly documentation. Expedited delivery available for production-critical timelines.",
  },
]

export default function CustomFabricationPage() {
  return (
    <main className="min-h-screen bg-background pt-24 pb-16">
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "https://tc.agency" },
          { name: "Services", url: "https://tc.agency/capabilities" },
          { name: "Custom Fabrication", url: "https://tc.agency/services/custom-fabrication" },
        ]}
      />
      <ServicePageSchema
        name="Custom Fabrication"
        description="Custom-engineered hardware for productions that require solutions that don't exist yet. CNC machining, 3D printing, cable assembly, structural engineering, and rapid prototyping."
        url="https://tc.agency/services/custom-fabrication"
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
          <p className="mb-6 font-mono text-[11px] tracking-[0.2em] text-zinc-400">[ SERVICE — CUSTOM FABRICATION ]</p>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold tracking-[-0.03em] mb-6">
            Production Hardware Engineering
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed">
            Custom-engineered hardware for productions that require solutions that don't exist yet. From mechanical
            design and rapid prototyping through certified production runs, we build the parts that make the impossible
            possible.
          </p>
        </div>

        {/* Overview */}
        <section className="mb-24">
          <div className="max-w-3xl">
            <h2 className="text-2xl font-semibold tracking-[-0.03em] mb-6">Overview</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Off-the-shelf hardware works for standard productions. But when the creative brief calls for something
              that has never been built before, you need engineering partners who understand both the fabrication
              process and the production environment where the part will live.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-4">
              We design and manufacture custom brackets, mounts, enclosures, rigging hardware, cable assemblies, and
              structural components purpose-built for live events, touring, broadcast, and permanent installations.
              Every part is engineered for the specific loads, tolerances, and environmental conditions of your
              application.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Our fabrication capabilities span the full range from one-off prototypes to repeatable production runs.
              Whether you need a single custom adapter plate by Friday or 200 certified rigging brackets for a world
              tour, the process is the same: rigorous engineering, validated testing, and documented quality at every
              step.
            </p>
          </div>
        </section>

        {/* Capabilities Grid */}
        <section className="mb-24">
          <h2 className="text-2xl font-semibold tracking-[-0.03em] mb-12">Capabilities</h2>
          <ServiceAccordion
            items={capabilities.map((item) => ({
              title: item.title,
              description: item.desc,
              points: item.examples,
            }))}
          />
        </section>

        {/* Materials & Processes */}
        <section className="mb-24">
          <h2 className="text-2xl font-semibold tracking-[-0.03em] mb-12">Materials & Processes</h2>
          <p className="text-muted-foreground max-w-3xl mb-8">
            Material selection is driven by your application requirements: weight constraints, structural loads,
            environmental exposure, and finish specifications. We source certified stock and maintain full material
            traceability from raw billet to finished part.
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-px bg-zinc-900 border border-zinc-800">
            {materials.map((group, i) => (
              <div key={i} className="bg-background p-6">
                <h3 className="font-mono text-sm text-zinc-400 uppercase tracking-widest mb-4">{group.category}</h3>
                <ul className="space-y-2">
                  {group.items.map((item, j) => (
                    <li key={j} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <CheckCircle className="w-3.5 h-3.5 text-zinc-500 mt-0.5 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="mt-8 grid md:grid-cols-3 gap-6">
            <div className="border border-zinc-800 p-6">
              <h3 className="font-semibold mb-4">Surface Treatments</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>Anodizing (Type II & III)</li>
                <li>Powder coating</li>
                <li>Cerakote</li>
                <li>Bead blasting</li>
                <li>Passivation</li>
              </ul>
            </div>
            <div className="border border-zinc-800 p-6">
              <h3 className="font-semibold mb-4">Joining Methods</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>TIG welding (aluminum & steel)</li>
                <li>MIG welding</li>
                <li>Structural bonding</li>
                <li>Threaded inserts</li>
                <li>Riveting</li>
              </ul>
            </div>
            <div className="border border-zinc-800 p-6">
              <h3 className="font-semibold mb-4">Quality Assurance</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>CMM inspection</li>
                <li>First article inspection</li>
                <li>Material certifications</li>
                <li>Weld inspection (visual & NDT)</li>
                <li>Dimensional reporting</li>
              </ul>
            </div>
          </div>
        </section>

        {/* From Concept to Delivery */}
        <section className="mb-24">
          <h2 className="text-2xl font-semibold tracking-[-0.03em] mb-12">From Concept to Delivery</h2>
          <div className="max-w-3xl">
            <div className="relative">
              <div className="absolute left-4 top-0 bottom-0 w-px bg-zinc-900" />
              <div className="space-y-12">
                {processSteps.map((step, i) => (
                  <div key={i} className="relative pl-12">
                    <div className="absolute left-0 w-8 h-8 rounded-full bg-background border-2 border-zinc-700 flex items-center justify-center">
                      <span className="text-xs font-mono text-zinc-500">{(i + 1).toString().padStart(2, "0")}</span>
                    </div>
                    <h3 className="font-semibold mb-2">{step.phase}</h3>
                    <p className="text-sm text-muted-foreground">{step.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Cross-links */}
        <section className="mb-24">
          <h2 className="text-2xl font-semibold tracking-[-0.03em] mb-8">Related Services</h2>
          <div className="grid md:grid-cols-2 gap-px bg-zinc-900 border border-zinc-800">
            <Link
              href="/services/design-visualization"
              className="bg-background p-8 group hover:bg-zinc-900/40 transition-colors"
            >
              <div className="font-mono text-xs text-zinc-400 uppercase tracking-widest mb-2">
                Design & Visualization
              </div>
              <h3 className="font-semibold mb-2 group-hover:text-[#00D26A] transition-colors">
                See it before you build it
              </h3>
              <p className="text-sm text-muted-foreground">
                3D visualization and rendering to validate custom hardware designs in context before committing to
                fabrication.
              </p>
            </Link>
            <Link
              href="/services/system-integration"
              className="bg-background p-8 group hover:bg-zinc-900/40 transition-colors"
            >
              <div className="font-mono text-xs text-zinc-400 uppercase tracking-widest mb-2">
                System Integration
              </div>
              <h3 className="font-semibold mb-2 group-hover:text-[#00D26A] transition-colors">
                Hardware meets infrastructure
              </h3>
              <p className="text-sm text-muted-foreground">
                Custom fabrication paired with full system integration to deliver turnkey hardware solutions ready for
                deployment.
              </p>
            </Link>
          </div>
        </section>

        {/* CTA */}
        <section className="border-t border-zinc-800 pt-16">
          <div className="max-w-2xl">
            <h2 className="text-2xl font-semibold tracking-[-0.03em] mb-4">Need something that doesn't exist yet?</h2>
            <p className="text-muted-foreground mb-8">
              Tell us about the problem. We will engineer the solution, prototype it, test it, and deliver production-ready
              hardware on your timeline.
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
