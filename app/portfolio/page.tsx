import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Quote } from "lucide-react"

export const metadata: Metadata = {
  title: "Portfolio | TC Agency — Technically Creative",
  description:
    "Featured productions by TC Agency: stadium tours, immersive experiences, and technical innovations for world-class clients.",
}

const projects = [
  {
    slug: "backstreet-boys-into-the-millennium",
    title: "Into The Millennium",
    client: "Backstreet Boys",
    role: "Automation, Power & Data Systems",
    image: "/images/66a0205.jpg",
    year: "2024",
    metric: "40% faster setup",
  },
  {
    slug: "sphere-residency",
    title: "Sphere Residency",
    client: "The Sphere",
    role: "Technical Direction",
    image: "/images/dsf3010.jpg",
    year: "2024",
    metric: "16K resolution",
  },
  {
    slug: "immersive-experience",
    title: "Immersive LED Experience",
    client: "Samsung",
    role: "System Integration",
    image: "/images/dscf9211.jpg",
    year: "2023",
    metric: "12M pixels",
  },
  {
    slug: "global-product-launch",
    title: "Global Product Launch",
    client: "Ford",
    role: "Production Engineering",
    image: "/images/dsf3917.jpg",
    year: "2023",
    metric: "5 continents",
  },
]

const testimonials = [
  {
    quote:
      "TC's automation systems reduced our setup time by 40% and eliminated the human error that plagued previous tours. They don't just solve problems—they engineer them out of existence.",
    client: "Production Manager",
    company: "Major Touring Artist",
    metric: "40% faster setup",
  },
  {
    quote:
      "When you're running a $50M production, you need partners who think in systems, not just equipment. TC delivered infrastructure we could trust completely.",
    client: "Technical Director",
    company: "Fortune 100 Brand",
    metric: "99.99% uptime",
  },
  {
    quote:
      "Their pre-visualization saved us weeks of on-site troubleshooting. We solved problems in Unreal Engine that would have cost hundreds of thousands on the arena floor.",
    client: "Show Designer",
    company: "Global Entertainment Company",
    metric: "$200K saved",
  },
]

const impactMetrics = [
  { value: "500+", label: "Shows Delivered" },
  { value: "99.99%", label: "System Uptime" },
  { value: "$2B+", label: "Production Value Supported" },
  { value: "40%", label: "Avg. Efficiency Gain" },
]

export default function PortfolioPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <Navbar />

      <section className="pt-32 pb-24 border-b border-border">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl">
            <p className="text-sm font-mono text-emerald-500 mb-4 uppercase tracking-widest">04 / Portfolio</p>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-8">Engineering at scale.</h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Stadium tours, immersive installations, and technical innovations for the world's most demanding
              productions.
            </p>
          </div>

          {/* Impact Metrics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16">
            {impactMetrics.map((metric) => (
              <div key={metric.label} className="text-center p-6 bg-zinc-900/30 border border-border">
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
          <h2 className="text-2xl font-bold mb-12">Featured Projects</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {projects.map((project) => (
              <Link key={project.slug} href={`/portfolio/${project.slug}`} className="group">
                <div className="relative aspect-[16/10] bg-zinc-900 border border-border overflow-hidden mb-4">
                  <Image
                    src={project.image || "/placeholder.svg"}
                    alt={project.title}
                    fill
                    className="object-cover grayscale group-hover:grayscale-0 transition-all duration-300"
                  />
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors" />
                  <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
                    <span className="text-xs font-mono text-emerald-500 uppercase">{project.year}</span>
                    <span className="text-xs font-mono text-white bg-black/60 px-2 py-1">{project.metric}</span>
                  </div>
                </div>
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-xl font-bold group-hover:text-white transition-colors">{project.title}</h3>
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

      {/* Testimonials */}
      <section className="py-24 border-b border-border bg-zinc-900/20">
        <div className="container mx-auto px-6">
          <h2 className="text-2xl font-bold mb-4">Client Perspectives</h2>
          <p className="text-muted-foreground mb-12 max-w-2xl">
            What production leaders say about working with TC Agency.
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-zinc-900/50 border border-border p-6 flex flex-col">
                <Quote className="w-8 h-8 text-emerald-500/30 mb-4" />
                <p className="text-sm leading-relaxed mb-6 flex-grow">{testimonial.quote}</p>
                <div className="border-t border-border pt-4">
                  <p className="font-medium text-sm">{testimonial.client}</p>
                  <p className="text-xs text-muted-foreground">{testimonial.company}</p>
                  <p className="text-xs font-mono text-emerald-500 mt-2">{testimonial.metric}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to scale your production?</h2>
          <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
            Let's discuss how engineering-grade rigor can transform your next project.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-6 py-3 bg-white text-black font-bold hover:bg-gray-200 transition-colors"
          >
            Start a Project <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  )
}
