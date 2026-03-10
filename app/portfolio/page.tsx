import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { BreadcrumbSchema } from "@/components/structured-data"

export const metadata: Metadata = {
  title: "Portfolio | TC Agency — Technically Creative",
  description:
    "Featured productions by TC Agency: stadium tours, immersive LED experiences, and technical innovations. Backstreet Boys, The Sphere, Samsung, Ford, and more.",
  keywords: [
    "live event portfolio",
    "concert production case studies",
    "stadium tour technical direction",
    "LED video wall projects",
    "immersive experience production",
    "touring production portfolio",
    "event technology projects",
    "Sphere Las Vegas production",
    "Backstreet Boys tour",
    "Samsung event production",
    "Ford product launch",
  ],
  openGraph: {
    title: "Portfolio | TC Agency — Technically Creative",
    description:
      "Stadium tours, immersive installations, and technical innovations for the world's most demanding productions.",
    url: "https://tc.agency/portfolio",
    siteName: "TC Agency",
    images: [
      {
        url: "/images/dsf3010.jpg",
        width: 1200,
        height: 630,
        alt: "TC Agency portfolio: engineering at scale",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Portfolio | TC Agency",
    description: "Engineering at scale. Stadium tours, immersive installations, and technical innovations.",
    images: ["/images/dsf3010.jpg"],
  },
  alternates: {
    canonical: "https://tc.agency/portfolio",
  },
}

const projects = [
  {
    slug: "backstreet-boys-into-the-millennium",
    client: "Backstreet Boys",
    title: "Into The Millennium World Tour",
    role: "Automation, Power & Data Systems",
    tech: "Show control, 48 automation axes, 12,000+ data points",
    image: "/images/66a0205.jpg",
    hasDetail: true,
  },
  {
    slug: "sphere-residency",
    client: "The Sphere",
    title: "Sphere Residency",
    role: "Technical Direction",
    tech: "16K content, 1.2B pixels, 164,000 LED panels",
    image: "/images/dsf3010.jpg",
    hasDetail: true,
  },
  {
    slug: "immersive-experience",
    client: "Samsung",
    title: "Immersive LED Experience",
    role: "System Integration",
    tech: "360-degree display, spatial audio, interactive zones",
    image: "/images/dscf9211.jpg",
    hasDetail: true,
  },
  {
    slug: "global-product-launch",
    client: "Ford",
    title: "Global Product Launch",
    role: "Production Engineering",
    tech: "4-continent broadcast, synchronized reveals, 2.3M viewers",
    image: "/images/dsf3917.jpg",
    hasDetail: true,
  },
]

export default function PortfolioPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "https://tc.agency" },
          { name: "Portfolio", url: "https://tc.agency/portfolio" },
        ]}
      />

      <Navbar />

      {/* Hero */}
      <section className="pt-32 pb-16 border-b border-border">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl">
            <p className="text-sm font-mono text-emerald-500 mb-6 uppercase tracking-widest">04 / Portfolio</p>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">Selected work.</h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Stadium tours, immersive installations, global broadcasts, and technical innovations for the world's most
              demanding productions.
            </p>
          </div>
        </div>
      </section>

      {/* Project Grid */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => {
              const content = (
                <div className="group relative overflow-hidden border border-border bg-zinc-950 hover:border-emerald-900/50 transition-colors">
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Image
                      src={project.image}
                      alt={`${project.client}: ${project.title}`}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                    <div className="absolute top-4 left-4">
                      <span className="text-xs font-mono text-emerald-500 uppercase tracking-widest">
                        {project.client}
                      </span>
                    </div>
                  </div>
                  <div className="p-6">
                    <h2 className="text-lg font-bold mb-1">{project.title}</h2>
                    <p className="text-sm text-muted-foreground mb-3">{project.role}</p>
                    <p className="text-xs font-mono text-muted-foreground">{project.tech}</p>
                    {project.hasDetail && (
                      <div className="mt-4 flex items-center gap-2 text-sm font-mono text-emerald-500">
                        View project <ArrowRight className="w-3 h-3" />
                      </div>
                    )}
                  </div>
                </div>
              )

              if (project.hasDetail) {
                return (
                  <Link key={project.slug} href={`/portfolio/${project.slug}`} className="block">
                    {content}
                  </Link>
                )
              }

              return <div key={project.slug}>{content}</div>
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 border-t border-border">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready for your project?</h2>
          <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
            Every production is different. Tell us about yours and we will show you how we can help.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-6 py-3 bg-white text-black font-bold hover:bg-gray-200 transition-colors duration-150"
          >
            Start a Conversation
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  )
}
