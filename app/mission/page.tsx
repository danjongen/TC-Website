import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import type { Metadata } from "next"
import Image from "next/image"
import { BreadcrumbSchema } from "@/components/structured-data"

// Marketing pages should be static to enable CDN edge caching
export const dynamic = "force-static"
export const revalidate = 86400 // Revalidate every 24 hours

export const metadata: Metadata = {
  title: "Mission | TC Agency — Technically Creative",
  description:
    "Our mission at TC Agency (Technically Creative) — delivering engineering-grade production systems for high-stakes live events worldwide. Systems over heroes. Automation over manual.",
  keywords: [
    "production engineering mission",
    "technical direction philosophy",
    "live event systems",
    "production automation",
    "event technology company",
    "touring production services",
    "concert technical direction",
    "systematic production approach",
  ],
  openGraph: {
    title: "Our Mission | TC Agency — Technically Creative",
    description: "Engineering calm into chaos. We bring systematic precision to high-stakes live production.",
    url: "https://tc.agency/mission",
    siteName: "TC Agency",
    images: [
      {
        url: "/images/dsf3815.jpg",
        width: 1200,
        height: 630,
        alt: "TC Agency mission - engineering-grade production",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Our Mission | TC Agency",
    description: "Engineering calm into chaos. Systematic precision for high-stakes productions.",
    images: ["/images/dsf3815.jpg"],
  },
  alternates: {
    canonical: "https://tc.agency/mission",
  },
}

export default function MissionPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "https://tc.agency" },
          { name: "Mission", url: "https://tc.agency/mission" },
        ]}
      />

      <Navbar />

      <section className="pt-32 pb-24 border-b border-border">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl">
            <p className="text-sm font-mono text-emerald-500 mb-4 uppercase tracking-widest">01 / Mission</p>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-8">Engineering calm into chaos.</h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              We exist to bring systematic precision to high-stakes live production. Where others see complexity, we see
              solvable systems.
            </p>
          </div>
        </div>
      </section>

      <section className="py-24 border-b border-border">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">The Problem We Solve</h2>
              <p className="text-muted-foreground leading-relaxed mb-6">
                Live production is inherently high-stakes. Millions of dollars, global audiences, and artistic vision
                all converge on a single moment in time. The margin for error is zero.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-6">
                Yet most productions still rely on fragmented systems, manual processes, and tribal knowledge.
                Information lives in spreadsheets, communication happens over radio, and critical decisions are made on
                instinct rather than data.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                We believe there's a better way. By applying engineering discipline to production workflows, we
                transform chaos into calm confidence.
              </p>
            </div>
            <div className="relative aspect-[4/3] bg-zinc-900 border border-border overflow-hidden">
              <Image src="/images/dsf3815.jpg" alt="FOH control environment" fill className="object-cover" />
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
                <p className="text-xs font-mono text-emerald-500">CONTROL ENVIRONMENT</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 border-b border-border">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold mb-12">Our Principles</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                num: "01",
                title: "Systems Over Heroes",
                desc: "We build processes that don't depend on any single person. Repeatable, documented, transferable.",
              },
              {
                num: "02",
                title: "Automation Over Manual",
                desc: "If a task can be automated, it should be. Humans should focus on creative decisions, not data entry.",
              },
              {
                num: "03",
                title: "Clarity Over Complexity",
                desc: "Complex problems deserve simple interfaces. We hide complexity behind clean, intuitive systems.",
              },
            ].map((principle) => (
              <div key={principle.num} className="p-6 border border-border bg-zinc-950">
                <span className="text-sm font-mono text-emerald-500">{principle.num}</span>
                <h3 className="text-xl font-bold mt-4 mb-3">{principle.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{principle.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to work with us?</h2>
          <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
            Let's discuss how we can bring engineering-grade precision to your next production.
          </p>
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
