import { Navbar } from "@/components/navbar"
import { Hero } from "@/components/hero"
import { Clients } from "@/components/clients"
import { Footer } from "@/components/footer"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { OrganizationSchema, WebsiteSchema, LocalBusinessSchema } from "@/components/structured-data"

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://tc.agency/#organization",
      name: "TC Agency",
      alternateName: ["Technically Creative", "TC", "tc.agency"],
      url: "https://tc.agency",
      logo: {
        "@type": "ImageObject",
        url: "https://tc.agency/og-image.jpg",
      },
      description:
        "TC Agency (tc.agency) is Technically Creative — production engineering, technical direction, and live event automation for high-stakes shows worldwide.",
      email: "info@tc.agency",
    },
    {
      "@type": "WebSite",
      "@id": "https://tc.agency/#website",
      url: "https://tc.agency",
      name: "TC Agency — Technically Creative",
      publisher: {
        "@id": "https://tc.agency/#organization",
      },
    },
  ],
}

export default function Home() {
  return (
    <>
      <OrganizationSchema />
      <WebsiteSchema />
      <LocalBusinessSchema />

      <main className="min-h-screen bg-background text-foreground selection:bg-emerald-900 selection:text-white">
        <Navbar />
        <Hero />
        <Clients />

        {/* Quick Navigation Cards */}
        <section className="py-24 border-b border-border">
          <div className="container mx-auto px-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { title: "Our Mission", desc: "Why we exist and what drives us", href: "/mission" },
                { title: "Capabilities", desc: "Technical services and expertise", href: "/capabilities" },
                { title: "Our Approach", desc: "How we deliver complex productions", href: "/approach" },
                { title: "Portfolio", desc: "Featured projects and case studies", href: "/portfolio" },
              ].map((item) => (
                <Link
                  key={item.title}
                  href={item.href}
                  className="group p-6 border border-border bg-zinc-950 hover:bg-zinc-900 hover:border-zinc-700 transition-all duration-150"
                >
                  <h3 className="text-lg font-bold mb-2 group-hover:text-white transition-colors">{item.title}</h3>
                  <p className="text-sm text-muted-foreground mb-4">{item.desc}</p>
                  <span className="inline-flex items-center gap-2 text-sm font-mono text-emerald-500">
                    Explore <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <Footer />
      </main>
    </>
  )
}
