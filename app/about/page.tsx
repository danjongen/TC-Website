import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { HashScroll } from "@/components/hash-scroll"
import { BreadcrumbSchema } from "@/components/structured-data"

export const metadata: Metadata = {
  title: "About TC Agency | Production Engineering for High-Stakes Events",
  description:
    "Learn about TC Agency (Technically Creative) and Executive Technical Producer Daniel Jongen. We bring engineering-grade systems and technical direction to global events, tours, and productions.",
  openGraph: {
    title: "About TC Agency | Production Engineering for High-Stakes Events",
    description:
      "Learn about TC Agency and Executive Technical Producer Daniel Jongen. Engineering-grade systems for global events, tours, and productions.",
    url: "https://tc.agency/about",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "About TC Agency - Production Engineering",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "About TC Agency | Production Engineering",
    description: "Learn about TC Agency and Executive Technical Producer Daniel Jongen.",
  },
  alternates: {
    canonical: "https://tc.agency/about",
  },
}

export const dynamic = "force-static"
export const revalidate = 86400 // 24 hours

export default function AboutPage() {
  const expertise = [
    { name: "Technical Direction", href: "/services/technical-direction" },
    { name: "Production Engineering", href: "/capabilities" },
    { name: "Production Management", href: "/services/production-management" },
    { name: "Automation Systems", href: "/services/workflow-automation" },
    { name: "LED Systems", href: "/services/system-integration" },
    { name: "Broadcast Infrastructure", href: "/services/system-integration" },
    { name: "Show Control", href: "/services/system-integration" },
    { name: "Risk Mitigation", href: "/services/executive-consulting" },
  ]

  const credentials = [
    { label: "Years Experience", value: "15+" },
    { label: "Global Productions", value: "200+" },
    { label: "Countries", value: "30+" },
    { label: "Global Brands", value: "Ford · Google · Visa" },
  ]

  const principles = [
    {
      num: "01",
      title: "Systems over heroes",
      desc: "Processes that don't depend on any single person. Repeatable, documented, transferable.",
    },
    {
      num: "02",
      title: "Automation over manual",
      desc: "If a task can be automated, it should be. Humans focus on creative decisions, not data entry.",
    },
    {
      num: "03",
      title: "Clarity over complexity",
      desc: "Complex problems deserve simple interfaces. We hide complexity behind clean systems.",
    },
  ]

  return (
    <div className="min-h-screen bg-black text-white">
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "https://tc.agency" },
          { name: "About", url: "https://tc.agency/about" },
        ]}
      />

      <Navbar />
      <HashScroll id="leadership" />

      <main id="main-content" className="pt-40 md:pt-48">
        {/* Hero */}
        <section className="pb-[14vh]">
          <div className="container mx-auto px-6">
            <div className="max-w-3xl">
              <p className="mb-6 font-mono text-[11px] tracking-[0.2em] text-zinc-400">[ 01 / ABOUT ]</p>
              <h1 className="text-5xl md:text-7xl font-semibold tracking-[-0.03em] text-white mb-8">
                Engineering calm into chaos.
              </h1>
              <p className="text-lg leading-relaxed text-zinc-400 max-w-xl">
                We bring systematic precision to high-stakes live production. Where others see complexity, we see
                solvable systems.
              </p>
            </div>
          </div>
        </section>

        {/* Full-width image header */}
        <section aria-label="Live production at scale" className="relative">
          <div className="relative aspect-[21/9] w-full">
            <Image
              src="/images/bsb-live-05.jpg"
              alt="Backstreet Boys live at the Sphere - large-format LED production engineered by TC Agency"
              fill
              className="object-cover"
              sizes="100vw"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
            <div className="absolute bottom-6 left-6">
              <p className="font-mono text-[11px] tracking-[0.2em] text-zinc-400">SPHERE - LAS VEGAS</p>
            </div>
          </div>
        </section>

        {/* Principles - indexed rows */}
        <section className="py-[14vh]">
          <div className="container mx-auto px-6">
            <p className="mb-6 font-mono text-[11px] tracking-[0.2em] text-zinc-400">[ 02 / PRINCIPLES ]</p>
            <div className="max-w-3xl">
              {principles.map((principle, i) => (
                <div key={principle.num}>
                  {i > 0 && <div className="h-px bg-zinc-900" aria-hidden="true" />}
                  <div className="py-10 md:flex md:items-baseline md:gap-12">
                    <span className="font-mono text-xs tracking-[0.2em] text-zinc-400">{principle.num}</span>
                    <div className="mt-3 md:mt-0">
                      <h3 className="text-3xl md:text-5xl font-semibold tracking-[-0.03em] text-white mb-3">
                        {principle.title}
                      </h3>
                      <p className="text-lg leading-relaxed text-zinc-400 max-w-xl">{principle.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-20 max-w-2xl border-t border-zinc-900 pt-14 md:mt-28">
              <p className="mb-6 font-mono text-[11px] tracking-[0.2em] text-zinc-400">PHILOSOPHY</p>
              <h2 className="mb-10 text-3xl font-semibold tracking-[-0.03em] text-white md:text-5xl">
                Systems-first, always
              </h2>

              <div className="space-y-6 text-lg leading-relaxed text-zinc-400">
                <p>
                  In high-stakes live production there are no second chances. Every system is engineered with
                  redundancy. Every workflow is documented. Every team member knows their role.
                </p>
                <p>
                  Stadium tour, corporate keynote, or immersive brand activation. The rigor is the same. We engineer
                  systems that work the first time, every time.
                </p>
                <p>
                  Decades of field experience meet modern engineering practice: network redundancy, automated
                  failovers, comprehensive documentation, continuous risk assessment.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Daniel */}
        <section id="leadership" className="scroll-mt-24 py-[18vh]">
          <div className="container mx-auto px-6">
            <div className="grid lg:grid-cols-2 gap-16 items-start">
              <div className="relative aspect-[4/5] max-w-md overflow-hidden">
                <Image
                  src="/daniel-jongen-headshot.jpg"
                  alt="Executive Technical Producer Daniel Jongen - Technical Direction and Production Engineering leader at TC Agency"
                  fill
                  className="object-cover object-center grayscale contrast-110"
                  priority
                />
                <div className="absolute bottom-0 left-0 right-0 p-5 bg-gradient-to-t from-black/80 to-transparent">
                  <p className="font-mono text-[11px] tracking-[0.2em] text-zinc-400">EXECUTIVE TECHNICAL PRODUCER</p>
                  <p className="text-xl font-semibold text-white">Daniel Jongen</p>
                </div>
              </div>

              <div>
                <p className="mb-6 font-mono text-[11px] tracking-[0.2em] text-zinc-400">[ 03 / LEADERSHIP ]</p>
                <h2
                  id="daniel-jongen"
                  className="text-3xl md:text-5xl font-semibold tracking-[-0.03em] text-white mb-8"
                >
                  Senior leadership. One accountable company.
                </h2>

                <div className="space-y-5 text-lg leading-relaxed text-zinc-400 max-w-xl">
                  <p>
                    Technically Creative is a production engineering company built for complex live work. The company
                    leads technical direction, production engineering, and high-stakes show execution for global
                    brands, artists, tours, and large-format productions.
                  </p>
                  <p>
                    Executive Technical Producer Daniel Jongen leads the work across automation, LED systems,
                    broadcast infrastructure, show control, and risk mitigation, keeping every discipline aligned
                    through one accountable technical structure.
                  </p>
                </div>

                {/* Credentials */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-14">
                  {credentials.map((item) => (
                    <div key={item.label}>
                      <p className="text-3xl font-semibold tracking-[-0.03em] text-white">{item.value}</p>
                      <p className="font-mono text-[11px] tracking-[0.2em] text-zinc-400 mt-2">
                        {item.label.toUpperCase()}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Expertise */}
                <div className="mt-14">
                  <p className="mb-6 font-mono text-[11px] tracking-[0.2em] text-zinc-400">AREAS OF EXPERTISE</p>
                  <ul className="max-w-xl">
                    {expertise.map((item, index) => (
                      <li key={item.name}>
                        {index > 0 && <div className="h-px bg-zinc-900" aria-hidden="true" />}
                        <Link href={item.href} className="group flex items-baseline gap-6 py-3">
                          <span className="font-mono text-xs tracking-[0.2em] text-zinc-400">
                            {String(index + 1).padStart(2, "0")}
                          </span>
                          <span className="text-lg font-semibold text-white transition-colors duration-300 group-hover:text-[#00D26A]">
                            {item.name}
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-[14vh]">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl md:text-5xl font-semibold tracking-[-0.03em] text-white mb-6">
              Ready to work together?
            </h2>
            <p className="text-lg leading-relaxed text-zinc-400 mb-10 max-w-xl">
              Let's discuss how TC Agency can bring technical direction and production engineering to your next
              project.
            </p>
            <Link
              href="/contact"
              className="font-mono text-xs tracking-[0.2em] text-zinc-400 hover:text-[#00D26A] transition-colors duration-300"
            >
              START A CONVERSATION →
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
