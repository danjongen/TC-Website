import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

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
  },
  {
    slug: "sphere-residency",
    title: "Sphere Residency",
    client: "The Sphere",
    role: "Technical Direction",
    image: "/images/dsf3010.jpg",
    year: "2024",
  },
  {
    slug: "immersive-experience",
    title: "Immersive LED Experience",
    client: "Samsung",
    role: "System Integration",
    image: "/images/dscf9211.jpg",
    year: "2023",
  },
  {
    slug: "global-product-launch",
    title: "Global Product Launch",
    client: "Ford",
    role: "Production Engineering",
    image: "/images/dsf3917.jpg",
    year: "2023",
  },
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
        </div>
      </section>

      <section className="py-24 border-b border-border">
        <div className="container mx-auto px-6">
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
                  <div className="absolute bottom-4 left-4 right-4">
                    <span className="text-xs font-mono text-emerald-500 uppercase">{project.year}</span>
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

      <section className="py-24">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-6">Want to be next?</h2>
          <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
            Let's discuss how we can bring this level of engineering precision to your production.
          </p>
          <a
            href="/contact"
            className="inline-flex items-center gap-2 px-6 py-3 bg-white text-black font-bold hover:bg-gray-200 transition-colors"
          >
            Start a Project <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </section>

      <Footer />
    </main>
  )
}
