import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import type { Metadata } from "next"
import Image from "next/image"
import { BreadcrumbSchema } from "@/components/structured-data"

// Marketing pages should be static to enable CDN edge caching
export const dynamic = "force-static"
export const revalidate = 86400 // Revalidate every 24 hours

export const metadata: Metadata = {
  title: "Mission",
  description:
    "Our mission at TC Agency (Technically Creative): delivering engineering-grade production systems for high-stakes live events worldwide. Systems over heroes. Automation over manual.",
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
    title: "Our Mission",
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
    <main className="min-h-screen bg-black text-white">
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "https://tc.agency" },
          { name: "Mission", url: "https://tc.agency/mission" },
        ]}
      />

      <Navbar />

      {/* Hero */}
      <section className="pt-40 md:pt-48 pb-[14vh]">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl">
            <p className="mb-6 font-mono text-[11px] tracking-[0.2em] text-zinc-400">[ 01 / MISSION ]</p>
            <h1 className="text-5xl md:text-7xl font-semibold tracking-[-0.03em] text-white mb-8">
              Engineering calm into chaos.
            </h1>
            <p className="text-lg leading-relaxed text-zinc-400 max-w-xl">
              We exist to bring systematic precision to high-stakes live production. Where others see complexity, we see
              solvable systems.
            </p>
          </div>
        </div>
      </section>

      {/* The problem */}
      <section className="py-[12vh]">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <p className="mb-6 font-mono text-[11px] tracking-[0.2em] text-zinc-400">[ 02 / THE PROBLEM ]</p>
              <h2 className="text-3xl md:text-5xl font-semibold tracking-[-0.03em] text-white mb-8">
                The problem we solve
              </h2>
              <div className="space-y-6 max-w-xl">
                <p className="text-lg leading-relaxed text-zinc-400">
                  Live production is inherently high-stakes. Millions of dollars, global audiences, and artistic vision
                  all converge on a single moment in time. The margin for error is zero.
                </p>
                <p className="text-lg leading-relaxed text-zinc-400">
                  Yet most productions still rely on fragmented systems, manual processes, and tribal knowledge.
                  Information lives in spreadsheets, communication happens over radio, and critical decisions are made on
                  instinct rather than data.
                </p>
                <p className="text-lg leading-relaxed text-zinc-400">
                  We believe there's a better way. By applying engineering discipline to production workflows, we
                  transform chaos into calm confidence.
                </p>
              </div>
            </div>
            <div className="relative aspect-[4/3] overflow-hidden">
              <Image src="/images/dsf3815.jpg" alt="FOH control environment" fill className="object-cover" />
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
                <p className="font-mono text-[11px] tracking-[0.2em] text-zinc-400">CONTROL ENVIRONMENT</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Principles - indexed rows */}
      <section className="py-[12vh]">
        <div className="container mx-auto px-6">
          <p className="mb-6 font-mono text-[11px] tracking-[0.2em] text-zinc-400">
            [ 03 / ENGINEERING PRINCIPLES ]
          </p>
          <h2 className="text-3xl md:text-5xl font-semibold tracking-[-0.03em] text-white mb-12">
            Engineering principles
          </h2>
          <div>
            {[
              {
                num: "01",
                title: "Systems over heroes",
                desc: "We build processes that don't depend on any single person. Repeatable, documented, transferable.",
              },
              {
                num: "02",
                title: "Automation over manual",
                desc: "If a task can be automated, it should be. Humans should focus on creative decisions, not data entry.",
              },
              {
                num: "03",
                title: "Clarity over complexity",
                desc: "Complex problems deserve simple interfaces. We hide complexity behind clean, intuitive systems.",
              },
            ].map((principle, index) => (
              <div key={principle.num}>
                {index > 0 && <div className="h-px bg-zinc-900" aria-hidden="true" />}
                <div className="py-10 grid md:grid-cols-12 gap-4 md:gap-6 items-baseline">
                  <span className="md:col-span-2 font-mono text-xs tracking-[0.2em] text-zinc-400">
                    {principle.num}
                  </span>
                  <h3 className="md:col-span-4 text-2xl md:text-3xl font-semibold tracking-[-0.03em] text-white">
                    {principle.title}
                  </h3>
                  <p className="md:col-span-6 text-lg leading-relaxed text-zinc-400 max-w-xl">{principle.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-[14vh]">
        <div className="container mx-auto px-6">
          <div className="max-w-2xl">
            <p className="mb-6 font-mono text-[11px] tracking-[0.2em] text-zinc-400">[ 04 / CONTACT ]</p>
            <h2 className="text-3xl md:text-5xl font-semibold tracking-[-0.03em] text-white mb-8">
              Ready to work with us?
            </h2>
            <p className="text-lg leading-relaxed text-zinc-400 max-w-xl mb-10">
              Let's discuss how we can bring engineering-grade precision to your next production.
            </p>
            <a
              href="/contact"
              className="font-mono text-xs tracking-[0.2em] text-zinc-400 transition-colors duration-300 hover:text-white"
            >
              START A CONVERSATION →
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
