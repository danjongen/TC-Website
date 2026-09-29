import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import type { Metadata } from "next"
import Link from "next/link"
import { BreadcrumbSchema } from "@/components/structured-data"
import { NewsletterForm } from "@/components/newsletter-form"
import { CueLabel } from "@/components/motion/cue-label"

export const metadata: Metadata = {
  title: "Insights",
  description:
    "Technical insights, case studies, and industry perspectives from TC Agency. Deep dives into production engineering, automation, and live event technology.",
  keywords: [
    "production engineering blog",
    "live event case studies",
    "technical direction insights",
    "event technology articles",
    "production automation guides",
    "touring network infrastructure",
    "RF-resilient show control",
    "3D venue scanning case study",
    "Michigan Central Station event plan",
  ],
  openGraph: {
    title: "Insights",
    description: "Technical insights, case studies, and industry perspectives on production engineering.",
    url: "https://tc.agency/insights",
    siteName: "TC Agency",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Insights | TC Agency",
    description: "Technical insights and case studies from the production engineering experts.",
  },
  alternates: {
    canonical: "https://tc.agency/insights",
  },
}

const articles = [
  {
    slug: "michigan-central-station-scan-to-event-plan",
    title: "Michigan Central Station: From station scan to event plan.",
    excerpt:
      "We used a 3D scan of Michigan Central Station to build a detailed venue model, create renders for an upcoming event and produce accurate CAD plans.",
    category: "Case Study",
    readTime: "3 min read",
    date: "September 2026",
  },
  {
    slug: "operating-standard",
    title: "What Technically Creative Does",
    excerpt:
      "Production engineering and technical direction for live events where failure is not an option. How we work, what we deliver, and who we do it for.",
    category: "Perspective",
    readTime: "4 min read",
    date: "June 2026",
  },
  {
    slug: "ufo-pod-touring-control-infrastructure",
    title: "Powering a Flying Stage Element in an RF Nightmare",
    excerpt:
      "A 13,000-pound flying stage element, fully wireless, in front of 18,000 people a night. How we built a system that never dropped. Not once.",
    category: "Case Study",
    readTime: "10 min read",
    date: "June 2026",
  },
]

export default function InsightsPage() {
  return (
    <main className="min-h-screen bg-black text-white">
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "https://tc.agency" },
          { name: "Insights", url: "https://tc.agency/insights" },
        ]}
      />

      <Navbar />

      {/* Hero */}
      <section className="pt-40 md:pt-48 pb-[10vh]">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl">
            <CueLabel index="06" className="mb-6 font-mono text-[11px] tracking-[0.2em] text-zinc-400">
              INSIGHTS
            </CueLabel>
            <h1
              data-vt="title"
              data-reveal="rise"
              className="w-fit text-5xl md:text-7xl font-semibold tracking-[-0.03em] text-white mb-8"
            >
              Technical perspectives from the field.
            </h1>
            <p data-reveal="fade" className="text-lg leading-relaxed text-zinc-400 max-w-xl">
              Case studies, technical breakdowns, and lessons learned from engineering the world's most demanding
              productions.
            </p>
          </div>
        </div>
      </section>

      {/* Article index */}
      <section className="py-[10vh]">
        <div className="container mx-auto px-6">
          <CueLabel index="07" className="mb-6 font-mono text-[11px] tracking-[0.2em] text-zinc-400">
            ALL ARTICLES
          </CueLabel>
          <div>
            {articles.map((article, index) => (
              <article key={article.slug}>
                {index > 0 && <div data-reveal="line" className="h-px origin-left bg-zinc-900" aria-hidden="true" />}
                <Link href={`/insights/${article.slug}`} className="group block py-12">
                  <div className="grid lg:grid-cols-12 gap-4 lg:gap-6">
                    <div data-reveal="fade" className="lg:col-span-3 flex items-baseline gap-6 lg:block">
                      <span className="font-mono text-xs tracking-[0.2em] text-zinc-400">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <p className="font-mono text-[11px] tracking-[0.2em] text-zinc-400 lg:mt-2">
                        {article.date.toUpperCase()} · {article.category.toUpperCase()} ·{" "}
                        {article.readTime.toUpperCase()}
                      </p>
                    </div>
                    <div className="lg:col-span-9">
                      <h2
                        data-reveal="rise"
                        className="text-3xl md:text-5xl font-semibold tracking-[-0.03em] text-white transition-colors duration-300 ease-expo group-hover:text-[#00D26A] mb-4"
                      >
                        {/* morph source: flies into the article page h1 */}
                        <span data-vt-source="title" className="inline-block">
                          {article.title}
                        </span>
                      </h2>
                      <p data-reveal="fade" className="text-lg leading-relaxed text-zinc-400 max-w-2xl mb-6">
                        {article.excerpt}
                      </p>
                      <span
                        data-reveal="fade"
                        className="inline-block font-mono text-xs tracking-[0.2em] text-zinc-400 transition-colors duration-300 ease-expo group-hover:text-white"
                      >
                        READ ARTICLE →
                      </span>
                    </div>
                  </div>
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-[14vh]">
        <div className="container mx-auto px-6">
          <div className="max-w-xl">
            <CueLabel index="08" className="mb-6 font-mono text-[11px] tracking-[0.2em] text-zinc-400">
              STAY IN THE LOOP
            </CueLabel>
            <p data-reveal="fade" className="text-lg leading-relaxed text-zinc-400 mb-8">
              Monthly insights on production engineering, technical trends, and industry best practices.
            </p>
            <div data-reveal="fade">
              <NewsletterForm />
            </div>
            <p data-reveal="fade" className="mt-4 font-mono text-[11px] tracking-[0.2em] text-zinc-400">
              NO SPAM. UNSUBSCRIBE ANYTIME.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
