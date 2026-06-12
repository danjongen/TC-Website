import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { BreadcrumbSchema } from "@/components/structured-data"

export const metadata: Metadata = {
  title: "Portfolio",
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
    title: "Portfolio",
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
    image: "/images/bsb-live-01.jpg",
    hasDetail: true,
  },
  {
    slug: "sphere-residency",
    client: "The Sphere",
    title: "Sphere Residency",
    role: "Technical Direction",
    tech: "16K content, 1.2B pixels, 164,000 LED panels",
    image: "/images/bsb-live-03.jpg",
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
    <main className="min-h-screen bg-black text-white">
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "https://tc.agency" },
          { name: "Portfolio", url: "https://tc.agency/portfolio" },
        ]}
      />

      <Navbar />

      {/* Hero */}
      <section className="pt-40 md:pt-48 pb-[14vh]">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl">
            <p className="mb-6 font-mono text-[11px] tracking-[0.2em] text-zinc-400">[ 04 — PORTFOLIO ]</p>
            <h1 className="text-5xl md:text-7xl font-semibold tracking-[-0.03em] text-white mb-8">Selected work</h1>
            <p className="text-lg leading-relaxed text-zinc-400 max-w-xl">
              Stadium tours, immersive installations, global broadcasts, and technical innovations for the world's
              most demanding productions.
            </p>
          </div>
        </div>
      </section>

      {/* Project index */}
      <section className="pb-[14vh]">
        <div className="container mx-auto px-6">
          {projects.map((project, i) => {
            const index = String(i + 1).padStart(2, "0")
            const content = (
              <div className="group">
                <div className="relative aspect-[16/9] overflow-hidden">
                  <Image
                    src={project.image}
                    alt={`${project.client}: ${project.title}`}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                    sizes="100vw"
                    priority={i === 0}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                  <div className="absolute bottom-6 left-6">
                    <p className="font-mono text-[11px] tracking-[0.2em] text-zinc-400">
                      {project.client.toUpperCase()}
                    </p>
                  </div>
                </div>
                <div className="pt-8 grid md:grid-cols-12 gap-4 items-baseline">
                  <div className="md:col-span-1">
                    <span className="font-mono text-xs tracking-[0.2em] text-zinc-400">{index}</span>
                  </div>
                  <div className="md:col-span-7">
                    <h2 className="text-3xl md:text-5xl font-semibold tracking-[-0.03em] text-white group-hover:text-[#00D26A] transition-colors duration-300">
                      {project.title}
                    </h2>
                    <p className="text-lg leading-relaxed text-zinc-400 mt-3">{project.role}</p>
                  </div>
                  <div className="md:col-span-4 md:text-right">
                    <p className="font-mono text-[11px] tracking-[0.2em] text-zinc-400 leading-relaxed">
                      {project.tech.toUpperCase()}
                    </p>
                    {project.hasDetail && (
                      <p className="mt-4 font-mono text-xs tracking-[0.2em] text-zinc-400 group-hover:text-white transition-colors duration-300">
                        VIEW PROJECT →
                      </p>
                    )}
                  </div>
                </div>
              </div>
            )

            return (
              <article key={project.slug} className="py-[7vh]">
                {i > 0 && <div className="h-px bg-zinc-900 mb-[7vh]" aria-hidden="true" />}
                {project.hasDetail ? (
                  <Link href={`/portfolio/${project.slug}`} className="block">
                    {content}
                  </Link>
                ) : (
                  content
                )}
              </article>
            )
          })}
        </div>
      </section>

      {/* CTA */}
      <section className="py-[14vh]">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl md:text-5xl font-semibold tracking-[-0.03em] text-white mb-6">
            Ready for your project?
          </h2>
          <p className="text-lg leading-relaxed text-zinc-400 mb-10 max-w-xl">
            Every production is different. Tell us about yours and we will show you how we can help.
          </p>
          <Link
            href="/contact"
            className="font-mono text-xs tracking-[0.2em] text-zinc-400 hover:text-[#00D26A] transition-colors duration-300"
          >
            START A CONVERSATION →
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  )
}
