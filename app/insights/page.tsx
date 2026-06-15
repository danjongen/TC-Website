import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import type { Metadata } from "next"
import Link from "next/link"
import { BreadcrumbSchema } from "@/components/structured-data"
import { NewsletterForm } from "@/components/newsletter-form"

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
  {
    slug: "sphere-las-vegas-technical-deep-dive",
    title: "Inside the Sphere: A Technical Deep Dive",
    excerpt: "How we approached the world's largest LED display and delivered seamless 16K content at 120fps.",
    image: "/images/dsf3010.jpg",
    category: "Case Study",
    readTime: "12 min read",
    date: "November 2024",
  },
  {
    slug: "automation-touring-production",
    title: "Automation in Touring Production: Beyond the Basics",
    excerpt:
      "Why most touring productions underutilize automation, and how systematic approaches can cut setup time by 40%.",
    image: "/images/66a0205.jpg",
    category: "Technical Guide",
    readTime: "8 min read",
    date: "October 2024",
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
            <p className="mb-6 font-mono text-[11px] tracking-[0.2em] text-zinc-400">[ 06, INSIGHTS ]</p>
            <h1 className="text-5xl md:text-7xl font-semibold tracking-[-0.03em] text-white mb-8">
              Technical perspectives from the field.
            </h1>
            <p className="text-lg leading-relaxed text-zinc-400 max-w-xl">
              Case studies, technical breakdowns, and lessons learned from engineering the world's most demanding
              productions.
            </p>
          </div>
        </div>
      </section>

      {/* Article index */}
      <section className="py-[10vh]">
        <div className="container mx-auto px-6">
          <p className="mb-6 font-mono text-[11px] tracking-[0.2em] text-zinc-400">[ 07, ALL ARTICLES ]</p>
          <div>
            {articles.map((article, index) => (
              <article key={article.slug}>
                {index > 0 && <div className="h-px bg-zinc-900" aria-hidden="true" />}
                <Link href={`/insights/${article.slug}`} className="group block py-12">
                  <div className="grid lg:grid-cols-12 gap-4 lg:gap-6">
                    <div className="lg:col-span-3 flex items-baseline gap-6 lg:block">
                      <span className="font-mono text-xs tracking-[0.2em] text-zinc-400">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <p className="font-mono text-[11px] tracking-[0.2em] text-zinc-400 lg:mt-2">
                        {article.date.toUpperCase()} · {article.category.toUpperCase()} ·{" "}
                        {article.readTime.toUpperCase()}
                      </p>
                    </div>
                    <div className="lg:col-span-9">
                      <h2 className="text-3xl md:text-5xl font-semibold tracking-[-0.03em] text-white transition-colors duration-300 group-hover:text-[#00D26A] mb-4">
                        {article.title}
                      </h2>
                      <p className="text-lg leading-relaxed text-zinc-400 max-w-2xl mb-6">{article.excerpt}</p>
                      <span className="font-mono text-xs tracking-[0.2em] text-zinc-400 transition-colors duration-300 group-hover:text-white">
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
            <p className="mb-6 font-mono text-[11px] tracking-[0.2em] text-zinc-400">[ 08, STAY IN THE LOOP ]</p>
            <p className="text-lg leading-relaxed text-zinc-400 mb-8">
              Monthly insights on production engineering, technical trends, and industry best practices.
            </p>
            <NewsletterForm />
            <p className="mt-4 font-mono text-[11px] tracking-[0.2em] text-zinc-400">
              NO SPAM. UNSUBSCRIBE ANYTIME.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
