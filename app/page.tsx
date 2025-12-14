import { Navbar } from "@/components/navbar"
import { Hero } from "@/components/hero"
import { Footer } from "@/components/footer"
import { Services } from "@/components/services"
import { Work } from "@/components/work"
import { Clients } from "@/components/clients"
import { CTA } from "@/components/cta"
import { SchemaOrgGraph } from "@/components/schema-org"
import Link from "next/link"

export const dynamic = "force-static"
export const revalidate = 3600

const MATRIX_GREEN = "#00D26A"

const navigationCards = [
  {
    title: "About",
    description: "Meet the team behind TC Agency",
    href: "/about",
    cta: "Meet the Team →",
  },
  {
    title: "Services",
    description: "Technical direction, automation, and engineering",
    href: "/services",
    cta: "View Services →",
  },
  {
    title: "Approach",
    description: "How we deliver complex productions",
    href: "/approach",
    cta: "Learn More →",
  },
  {
    title: "Portfolio",
    description: "Featured projects and case studies",
    href: "/portfolio",
    cta: "See Our Work →",
  },
  {
    title: "Insights",
    description: "Technical articles and industry perspectives",
    href: "/insights",
    cta: "Read Insights →",
  },
]

export default function Home() {
  return (
    <>
      <SchemaOrgGraph />
      <div className="min-h-screen bg-black text-white">
        <Navbar />

        <main>
          <Hero />

          {/* Services Grid */}
          <Services />

          {/* Navigation Cards */}
          <section className="py-24 border-t border-zinc-800">
            <div className="container mx-auto px-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
                {navigationCards.map((card) => (
                  <Link
                    key={card.title}
                    href={card.href}
                    className="group p-6 border border-zinc-800 hover:border-zinc-700 transition-all bg-zinc-900/50 hover:bg-zinc-900"
                  >
                    <h3 className="text-lg font-bold mb-2 text-white">{card.title}</h3>
                    <p className="text-sm text-zinc-400 mb-4">{card.description}</p>
                    <span className="text-sm font-medium transition-colors" style={{ color: MATRIX_GREEN }}>
                      {card.cta}
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </section>

          {/* Featured Work */}
          <Work />

          {/* Clients */}
          <Clients />

          {/* CTA */}
          <CTA />
        </main>

        <Footer />
      </div>
    </>
  )
}
