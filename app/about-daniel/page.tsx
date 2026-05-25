import type { Metadata } from "next"
import Link from "next/link"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { ArrowRight } from "lucide-react"

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
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />

      <main id="main-content" className="pt-20">
        {/* Hero Section */}
        <section className="pt-32 pb-24 border-b border-border">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl">
              <p className="text-sm font-mono text-emerald-500 mb-4 uppercase tracking-widest">01 / Bio</p>
              <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">Daniel Jongen</h1>
              <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed">
                Executive Technical Producer
              </p>

              {/* Stats Row */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12 pt-8 border-t border-border">
                {stats.map((item) => (
                  <div key={item.label}>
                    <p className="text-3xl font-bold text-emerald-500">{item.value}</p>
                    <p className="text-xs font-mono text-gray-400 uppercase tracking-wider mt-1">{item.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Professional Bio Section */}
        <section className="py-24 border-b border-border">
          <div className="container mx-auto px-6">
            <div className="max-w-3xl">
              <p className="font-mono text-sm text-gray-400 mb-4 uppercase tracking-wider">Background</p>
              <h2 className="text-3xl font-bold mb-8">Building Systems That Don't Fail</h2>

              <div className="space-y-6 text-gray-300 text-lg leading-relaxed">
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

        {/* Core Expertise Section */}
        <section className="py-24 border-b border-border">
          <div className="container mx-auto px-6">
            <div className="max-w-5xl">
              <p className="font-mono text-sm text-emerald-500 mb-4 uppercase tracking-widest">02 / Expertise</p>
              <h2 className="text-3xl font-bold mb-12">Core Capabilities</h2>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {expertise.map((item, index) => (
                  <div
                    key={item.title}
                    className="p-6 border border-border bg-zinc-950 hover:bg-zinc-900 transition-colors"
                  >
                    <span className="text-sm font-mono text-emerald-500">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <h3 className="text-xl font-bold mt-4 mb-3">{item.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Notable Work Section */}
        <section className="py-24 border-b border-border">
          <div className="container mx-auto px-6">
            <div className="max-w-5xl">
              <p className="font-mono text-sm text-emerald-500 mb-4 uppercase tracking-widest">03 / Work</p>
              <h2 className="text-3xl font-bold mb-12">Notable Productions</h2>

              <div className="grid md:grid-cols-2 gap-8">
                {notableWork.map((item) => (
                  <div key={item.title} className="border-l-2 border-emerald-500 pl-6">
                    <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24">
          <div className="container mx-auto px-6 text-center">
            <h2 className="text-3xl font-bold mb-4">Work with Daniel</h2>
            <p className="text-gray-400 mb-8 max-w-xl mx-auto">
              Whether it's a stadium tour, a global product launch, or an immersive installation — let's talk about
              how engineering-grade production can elevate your next project.
            </p>
            <Link
              href="/contact"
              className="group inline-flex items-center justify-center gap-2 px-8 py-4 bg-emerald-500 text-white font-bold hover:bg-emerald-400 transition-colors duration-150"
            >
              Start a Conversation
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-150" />
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
