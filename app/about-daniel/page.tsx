import type { Metadata } from "next"
import Link from "next/link"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"

export const metadata: Metadata = {
  title: "Daniel Jongen | Executive Technical Producer — TC Agency",
  description:
    "Daniel Jongen is an Executive Technical Producer with 15+ years in live production and technical direction. Specializing in large-format touring, corporate events, broadcast infrastructure, and immersive installations across 30+ countries.",
  openGraph: {
    title: "Daniel Jongen | Executive Technical Producer — TC Agency",
    description:
      "15+ years in live production and technical direction. 200+ productions across 30+ countries for Fortune 500 brands and global touring artists.",
    url: "https://tc.agency/about-daniel",
    siteName: "TC Agency",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Daniel Jongen — Executive Technical Producer at TC Agency",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Daniel Jongen | Executive Technical Producer — TC Agency",
    description:
      "15+ years in live production and technical direction. 200+ productions across 30+ countries.",
  },
  alternates: {
    canonical: "https://tc.agency/about-daniel",
  },
}

export default function AboutDanielPage() {
  const expertise = [
    {
      title: "Technical Direction",
      desc: "End-to-end technical oversight for large-format touring, arena shows, and global broadcasts — ensuring every system performs flawlessly under pressure.",
    },
    {
      title: "Production Engineering",
      desc: "Designing production systems with built-in redundancy, automated failovers, and comprehensive documentation from concept through load-out.",
    },
    {
      title: "Show Control & Automation",
      desc: "Integrating timecode, lighting, video, audio, and automation into unified control environments that execute complex cues with precision.",
    },
    {
      title: "System Integration",
      desc: "Architecting and deploying networked production ecosystems — signal distribution, media servers, intercom, and monitoring across multi-venue deployments.",
    },
    {
      title: "Broadcast Infrastructure",
      desc: "Building broadcast-grade signal chains for live-to-air, streaming, and IMAG workflows with zero-tolerance for signal loss or latency.",
    },
    {
      title: "Workflow Automation",
      desc: "Developing custom tools and automated pipelines that eliminate manual processes, reduce human error, and accelerate production timelines.",
    },
  ]

  const stats = [
    { value: "15+", label: "Years Experience" },
    { value: "200+", label: "Productions" },
    { value: "30+", label: "Countries" },
    { value: "Fortune 500", label: "Client Tier" },
  ]

  const notableWork = [
    {
      title: "Stadium & Arena Tours",
      desc: "Technical direction for multi-leg global touring productions — managing complex rigging, video, lighting, and audio systems across dozens of venues per run.",
    },
    {
      title: "The Sphere, Las Vegas",
      desc: "Production engineering for one of the most technically ambitious venues ever built — pushing the boundaries of immersive LED, spatial audio, and real-time rendering.",
    },
    {
      title: "Global Product Launches",
      desc: "High-profile corporate keynotes and product reveals for Fortune 500 brands, where flawless execution and broadcast-quality delivery are non-negotiable.",
    },
    {
      title: "Immersive LED Installations",
      desc: "Designing and deploying large-scale LED environments for brand activations, museum exhibits, and experiential marketing — blending content, architecture, and technology.",
    },
  ]

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />

      <main id="main-content">
        {/* Hero */}
        <section className="pt-40 md:pt-48 pb-[10vh]">
          <div className="container mx-auto px-6">
            <div className="max-w-3xl">
              <p className="mb-6 font-mono text-[11px] tracking-[0.2em] text-zinc-400">[ 01 — BIO ]</p>
              <h1 className="text-5xl md:text-7xl font-semibold tracking-[-0.03em] text-white mb-6">Daniel Jongen</h1>
              <p className="text-lg leading-relaxed text-zinc-400 max-w-xl">Executive Technical Producer</p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-20">
              {stats.map((item) => (
                <div key={item.label}>
                  <p className="text-3xl md:text-5xl font-semibold tracking-[-0.03em] text-white">{item.value}</p>
                  <p className="mt-2 font-mono text-[11px] tracking-[0.2em] text-zinc-400 uppercase">{item.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Bio */}
        <section className="py-[12vh]">
          <div className="container mx-auto px-6">
            <div className="max-w-2xl">
              <p className="mb-6 font-mono text-[11px] tracking-[0.2em] text-zinc-400">[ 02 — BACKGROUND ]</p>
              <h2 className="text-3xl md:text-5xl font-semibold tracking-[-0.03em] text-white mb-8">
                Building systems that don't fail
              </h2>

              <div className="space-y-6 text-lg leading-relaxed text-zinc-400">
                <p>
                  With over 15 years in live production and technical direction, Daniel Jongen has built a career at the
                  intersection of engineering and entertainment. He specializes in large-format touring, corporate events,
                  broadcast infrastructure, and immersive installations — environments where the margin for error is zero
                  and the stakes are measured in millions.
                </p>
                <p>
                  Daniel has overseen more than 200 productions across 30+ countries, working with Fortune 500 brands and
                  global touring artists who demand flawless execution at scale. His approach treats every production as an
                  engineering problem: systematic, redundant, documented, and repeatable.
                </p>
                <p>
                  Based in Detroit, MI with operations in Los Angeles and Las Vegas, Daniel founded Technically Creative LLC
                  to bring engineering discipline to an industry that has traditionally relied on tribal knowledge and
                  heroics. TC Agency exists because productions deserve better systems — and the people running them
                  deserve better tools.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Expertise — indexed rows */}
        <section className="py-[12vh]">
          <div className="container mx-auto px-6">
            <p className="mb-6 font-mono text-[11px] tracking-[0.2em] text-zinc-400">[ 03 — EXPERTISE ]</p>
            <h2 className="text-3xl md:text-5xl font-semibold tracking-[-0.03em] text-white mb-12">
              Core capabilities
            </h2>

            <div>
              {expertise.map((item, index) => (
                <div key={item.title}>
                  {index > 0 && <div className="h-px bg-zinc-900" aria-hidden="true" />}
                  <div className="py-10 grid md:grid-cols-12 gap-4 md:gap-6 items-baseline">
                    <span className="md:col-span-2 font-mono text-xs tracking-[0.2em] text-zinc-400">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <h3 className="md:col-span-4 text-2xl md:text-3xl font-semibold tracking-[-0.03em] text-white">
                      {item.title}
                    </h3>
                    <p className="md:col-span-6 text-lg leading-relaxed text-zinc-400 max-w-xl">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Notable work — indexed rows */}
        <section className="py-[12vh]">
          <div className="container mx-auto px-6">
            <p className="mb-6 font-mono text-[11px] tracking-[0.2em] text-zinc-400">[ 04 — WORK ]</p>
            <h2 className="text-3xl md:text-5xl font-semibold tracking-[-0.03em] text-white mb-12">
              Notable productions
            </h2>

            <div>
              {notableWork.map((item, index) => (
                <div key={item.title}>
                  {index > 0 && <div className="h-px bg-zinc-900" aria-hidden="true" />}
                  <div className="py-10 grid md:grid-cols-12 gap-4 md:gap-6 items-baseline">
                    <span className="md:col-span-2 font-mono text-xs tracking-[0.2em] text-zinc-400">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <h3 className="md:col-span-4 text-2xl md:text-3xl font-semibold tracking-[-0.03em] text-white">
                      {item.title}
                    </h3>
                    <p className="md:col-span-6 text-lg leading-relaxed text-zinc-400 max-w-xl">{item.desc}</p>
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
              <p className="mb-6 font-mono text-[11px] tracking-[0.2em] text-zinc-400">[ 05 — CONTACT ]</p>
              <h2 className="text-3xl md:text-5xl font-semibold tracking-[-0.03em] text-white mb-8">
                Work with Daniel
              </h2>
              <p className="text-lg leading-relaxed text-zinc-400 max-w-xl mb-10">
                Whether it's a stadium tour, a global product launch, or an immersive installation — let's talk about
                how engineering-grade production can elevate your next project.
              </p>
              <Link
                href="/contact"
                className="font-mono text-xs tracking-[0.2em] text-zinc-400 transition-colors duration-300 hover:text-white"
              >
                START A CONVERSATION →
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
