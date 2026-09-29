import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { BreadcrumbSchema, ProjectSchema } from "@/components/structured-data"
import { redirect } from "next/navigation"
import { CueLabel } from "@/components/motion/cue-label"

export const metadata: Metadata = {
  title: "Portfolio Preview",
  description: "Preview of TC Agency portfolio - not for public distribution.",
  robots: {
    index: false,
    follow: false,
  },
}

const projects = [
  {
    slug: "backstreet-boys-into-the-millennium",
    title: "Into The Millennium",
    client: "Backstreet Boys",
    role: "Automation, Power & Data Systems",
    image: "/images/66a0205.jpg",
    year: "2024",
    metric: "60 GHz backhaul",
  },
]

const impactMetrics = [
  { value: "200+", label: "Productions Delivered" },
  { value: "99.97%", label: "System Uptime" },
  { value: "30+", label: "Countries" },
  { value: "<2hr", label: "Response Time" },
]

export default async function PortfolioPreviewPage({
  searchParams,
}: {
  searchParams: { key?: string }
}) {
  const previewSecret = process.env.PREVIEW_SECRET

  // Redirect to public page if no secret or wrong secret
  if (!previewSecret || searchParams.key !== previewSecret) {
    redirect("/portfolio")
  }

  return (
    <main className="min-h-screen bg-black text-foreground">
      {/* Preview Mode Banner */}
      <div className="fixed top-0 left-0 right-0 z-[60] bg-amber-500 text-black text-center py-2 text-xs font-mono uppercase tracking-widest">
        Preview Mode / Not Public
      </div>

      <BreadcrumbSchema
        items={[
          { name: "Home", url: "https://tc.agency" },
          { name: "Portfolio", url: "https://tc.agency/portfolio" },
        ]}
      />
      {projects.map((project) => (
        <ProjectSchema
          key={project.slug}
          name={project.title}
          description={`${project.role} for ${project.client}`}
          image={`https://tc.agency${project.image}`}
          client={project.client}
          datePublished={`${project.year}-01-01`}
        />
      ))}

      <Navbar />

      <section className="pt-40 pb-24 border-b border-border">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl">
            <CueLabel index="04" className="text-sm font-mono text-emerald-500 mb-4 uppercase tracking-widest">
              PORTFOLIO
            </CueLabel>
            <h1 data-vt="title" data-reveal="rise" className="w-fit text-4xl md:text-6xl font-bold tracking-tight mb-8">
              Engineering at scale.
            </h1>
            <p data-reveal="fade" className="text-xl text-muted-foreground leading-relaxed">
              Stadium tours, immersive installations, and technical innovations for the world's most demanding
              productions.
            </p>
          </div>

          {/* Impact Metrics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16">
            {impactMetrics.map((metric) => (
              <div key={metric.label} data-reveal="fade" className="text-center p-6 bg-zinc-900/30 border border-border">
                <p className="text-3xl md:text-4xl font-bold text-emerald-500 mb-2">{metric.value}</p>
                <p className="text-sm text-muted-foreground uppercase tracking-widest">{metric.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-24 border-b border-border">
        <div className="container mx-auto px-6">
          <h2 data-reveal="rise" className="text-2xl font-bold mb-12">
            Featured Projects
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {projects.map((project) => (
              <Link key={project.slug} href={`/portfolio/${project.slug}`} className="group">
                <div
                  data-reveal="resolve"
                  className="relative aspect-[16/10] bg-zinc-900 border border-border overflow-hidden mb-4"
                >
                  <Image
                    src={project.image || "/placeholder.svg"}
                    alt={`${project.title} - ${project.role} for ${project.client}`}
                    fill
                    className="object-cover grayscale transition-[filter] duration-600 ease-expo group-hover:grayscale-0"
                  />
                  <div className="absolute inset-0 bg-black/40 transition-colors duration-600 ease-expo group-hover:bg-black/20" />
                  <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
                    <span className="text-xs font-mono text-emerald-500 uppercase">{project.year}</span>
                    <span className="text-xs font-mono text-white bg-black/60 px-2 py-1">{project.metric}</span>
                  </div>
                </div>
                <div data-reveal="fade" className="flex justify-between items-start">
                  <div>
                    <h3 className="text-xl font-bold transition-colors duration-300 ease-expo group-hover:text-white">
                      {project.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">{project.client}</p>
                  </div>
                  <span className="text-xs font-mono text-muted-foreground uppercase border border-border px-2 py-1">
                    {project.role}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24">
        <div className="container mx-auto px-6 text-center">
          <h2 data-reveal="rise" className="text-3xl font-bold mb-6">
            Ready to scale your production?
          </h2>
          <p data-reveal="fade" className="text-muted-foreground mb-8 max-w-xl mx-auto">
            Let's discuss how engineering-grade rigor can transform your next project.
          </p>
          <Link
            data-reveal="fade"
            href="/contact"
            className="inline-flex items-center gap-2 px-6 py-3 bg-white text-black font-bold transition-colors duration-300 ease-expo hover:bg-gray-200"
          >
            Start a Project <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  )
}
