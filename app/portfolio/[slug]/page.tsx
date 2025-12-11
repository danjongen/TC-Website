import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { notFound } from "next/navigation"

const projects: Record<
  string,
  {
    title: string
    client: string
    role: string
    year: string
    image: string
    description: string
    challenge: string
    solution: string
    results: string[]
    specs: { label: string; value: string }[]
  }
> = {
  "backstreet-boys-into-the-millennium": {
    title: "Into The Millennium",
    client: "Backstreet Boys",
    role: "Automation, Power & Data Systems",
    year: "2024",
    image: "/images/66a0205.jpg",
    description:
      "A 50+ city world tour featuring a massive LED stage structure, automated performer platforms, and integrated show control systems.",
    challenge:
      "Coordinating complex automation sequences with live performance timing across multiple touring configurations and venue types.",
    solution:
      "We designed a unified show control system that synchronizes all automation, lighting, video, and audio cues through a single interface. Custom-built performer tracking ensures safety while enabling dynamic staging.",
    results: [
      "Zero automation failures across 50+ shows",
      "30% reduction in setup time vs previous tour",
      "Real-time performer position monitoring",
      "Seamless integration of 5 automation vendors",
    ],
    specs: [
      { label: "LED Surface", value: "2,400 m²" },
      { label: "Automation Axes", value: "48" },
      { label: "Data Points", value: "12,000+" },
      { label: "Setup Time", value: "8 hours" },
    ],
  },
  "sphere-residency": {
    title: "Sphere Residency",
    client: "The Sphere",
    role: "Technical Direction",
    year: "2024",
    image: "/images/dsf3010.jpg",
    description:
      "Technical direction for immersive content experiences inside the world's largest spherical structure.",
    challenge:
      "Managing the unprecedented scale of the Sphere's 160,000 square foot LED interior while maintaining frame-perfect synchronization.",
    solution:
      "Developed custom previsualization workflows and real-time content management systems to handle the venue's unique geometry and massive pixel count.",
    results: [
      "16K x 16K content resolution managed",
      "Frame-accurate sync across entire surface",
      "Custom previsualization pipeline",
      "Real-time content switching system",
    ],
    specs: [
      { label: "Resolution", value: "16K x 16K" },
      { label: "LED Panels", value: "164,000" },
      { label: "Pixel Count", value: "1.2B" },
      { label: "Refresh Rate", value: "120Hz" },
    ],
  },
  "immersive-experience": {
    title: "Immersive LED Experience",
    client: "Samsung",
    role: "System Integration",
    year: "2023",
    image: "/images/dscf9211.jpg",
    description:
      "A permanent immersive installation showcasing next-generation display technology in a 360-degree environment.",
    challenge:
      "Integrating multiple display technologies, spatial audio, and interactive elements into a seamless visitor experience.",
    solution:
      "Built a unified control system that orchestrates all display, audio, and interactive elements through a single management interface with scheduled content rotation.",
    results: [
      "99.9% system uptime",
      "Automated daily content scheduling",
      "Remote monitoring and management",
      "Scalable to additional venues",
    ],
    specs: [
      { label: "Display Area", value: "800 m²" },
      { label: "Audio Channels", value: "64" },
      { label: "Interactive Zones", value: "12" },
      { label: "Daily Visitors", value: "5,000+" },
    ],
  },
  "global-product-launch": {
    title: "Global Product Launch",
    client: "Ford",
    role: "Production Engineering",
    year: "2023",
    image: "/images/dsf3917.jpg",
    description:
      "A synchronized global product reveal broadcast live from multiple continents with real-time audience interaction.",
    challenge:
      "Coordinating live production across 4 time zones with synchronized reveals and audience participation elements.",
    solution:
      "Engineered a distributed production system with redundant communication links, synchronized timecode, and failover protocols for each location.",
    results: [
      "4 continents synchronized to frame",
      "Zero downtime during 3-hour broadcast",
      "Real-time audience polling integration",
      "Redundant satellite and fiber links",
    ],
    specs: [
      { label: "Locations", value: "4" },
      { label: "Live Viewers", value: "2.3M" },
      { label: "Broadcast Duration", value: "3 hours" },
      { label: "Latency", value: "<100ms" },
    ],
  },
}

export async function generateStaticParams() {
  return Object.keys(projects).map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const project = projects[slug]
  if (!project) return { title: "Project Not Found" }
  return {
    title: `${project.title} | TC Agency Portfolio`,
    description: project.description,
  }
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const project = projects[slug]

  if (!project) {
    notFound()
  }

  return (
    <main className="min-h-screen bg-background text-foreground">
      <Navbar />

      <section className="pt-32 pb-12 border-b border-border">
        <div className="container mx-auto px-6">
          <Link
            href="/portfolio"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-white mb-8"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Portfolio
          </Link>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <div>
              <p className="text-sm font-mono text-emerald-500 mb-2">
                {project.client} / {project.year}
              </p>
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight">{project.title}</h1>
            </div>
            <span className="text-xs font-mono text-muted-foreground uppercase border border-border px-3 py-2">
              {project.role}
            </span>
          </div>
        </div>
      </section>

      <section className="py-12 border-b border-border">
        <div className="container mx-auto px-6">
          <div className="relative aspect-[21/9] bg-zinc-900 border border-border overflow-hidden">
            <Image src={project.image || "/placeholder.svg"} alt={project.title} fill className="object-cover" />
          </div>
        </div>
      </section>

      <section className="py-24 border-b border-border">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-3 gap-16">
            <div className="lg:col-span-2 space-y-12">
              <div>
                <h2 className="text-sm font-mono text-emerald-500 uppercase mb-4">Overview</h2>
                <p className="text-xl text-muted-foreground leading-relaxed">{project.description}</p>
              </div>
              <div>
                <h2 className="text-sm font-mono text-emerald-500 uppercase mb-4">Challenge</h2>
                <p className="text-muted-foreground leading-relaxed">{project.challenge}</p>
              </div>
              <div>
                <h2 className="text-sm font-mono text-emerald-500 uppercase mb-4">Solution</h2>
                <p className="text-muted-foreground leading-relaxed">{project.solution}</p>
              </div>
              <div>
                <h2 className="text-sm font-mono text-emerald-500 uppercase mb-4">Results</h2>
                <ul className="space-y-2">
                  {project.results.map((result, i) => (
                    <li key={i} className="flex items-center gap-3 text-muted-foreground">
                      <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full" />
                      {result}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div>
              <h2 className="text-sm font-mono text-emerald-500 uppercase mb-4">Technical Specs</h2>
              <div className="space-y-4">
                {project.specs.map((spec) => (
                  <div key={spec.label} className="p-4 border border-border bg-zinc-950">
                    <p className="text-2xl font-bold">{spec.value}</p>
                    <p className="text-xs text-muted-foreground uppercase">{spec.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready for your project?</h2>
          <a
            href="/contact"
            className="inline-flex items-center gap-2 px-6 py-3 bg-white text-black font-bold hover:bg-gray-200 transition-colors"
          >
            Start a Conversation
          </a>
        </div>
      </section>

      <Footer />
    </main>
  )
}
