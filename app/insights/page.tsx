import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Clock, Bell } from "lucide-react"
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
    slug: "ufo-pod-touring-control-infrastructure",
    title: "UFO Pod: RF-Resilient Touring Control Infrastructure",
    excerpt:
      "How we built a self-contained, redundant control node for 18,000-person arenas where 2.4 GHz is unusable and 5 GHz collapses under crowd load.",
    image: "/images/66a0205.jpg",
    category: "Case Study",
    readTime: "10 min read",
    date: "March 2026",
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
  const featured = articles[0]
  const rest = articles.slice(1)

  return (
    <main className="min-h-screen bg-background text-foreground">
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "https://tc.agency" },
          { name: "Insights", url: "https://tc.agency/insights" },
        ]}
      />

      <Navbar />

      {/* Hero */}
      <section className="pt-32 pb-16 border-b border-border">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl">
            <p className="text-sm font-mono text-emerald-500 mb-6 uppercase tracking-widest">06 / Insights</p>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">Technical perspectives from the field.</h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Case studies, technical breakdowns, and lessons learned from engineering the world's most demanding
              productions.
            </p>
          </div>
        </div>
      </section>

      {/* Featured Article */}
      <section className="py-16 border-b border-border">
        <div className="container mx-auto px-6">
          <p className="text-xs font-mono text-muted-foreground uppercase tracking-widest mb-8">Featured</p>
          <Link href={`/insights/${featured.slug}`} className="group block">
            <div className="grid lg:grid-cols-2 gap-8">
              <div className="relative aspect-[16/10] overflow-hidden border border-border bg-zinc-950">
                <Image
                  src={featured.image}
                  alt={featured.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  priority
                />
              </div>
              <div className="flex flex-col justify-center">
                <div className="flex items-center gap-4 mb-4">
                  <span className="text-xs font-mono text-emerald-500 uppercase">{featured.category}</span>
                  <span className="text-xs text-muted-foreground flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {featured.readTime}
                  </span>
                </div>
                <h2 className="text-2xl md:text-3xl font-bold mb-4 group-hover:text-emerald-500 transition-colors">
                  {featured.title}
                </h2>
                <p className="text-muted-foreground leading-relaxed mb-4">{featured.excerpt}</p>
                <div className="flex items-center gap-2 text-sm font-mono text-emerald-500">
                  Read article <ArrowRight className="w-3 h-3" />
                </div>
                <p className="text-xs text-muted-foreground mt-4">{featured.date}</p>
              </div>
            </div>
          </Link>
        </div>
      </section>

      {/* Article Grid */}
      {rest.length > 0 && (
        <section className="py-16 border-b border-border">
          <div className="container mx-auto px-6">
            <p className="text-xs font-mono text-muted-foreground uppercase tracking-widest mb-8">All Articles</p>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {rest.map((article) => (
                <Link key={article.slug} href={`/insights/${article.slug}`} className="group block">
                  <div className="border border-border bg-zinc-950 hover:border-emerald-900/50 transition-colors overflow-hidden">
                    <div className="relative aspect-[16/10] overflow-hidden">
                      <Image
                        src={article.image}
                        alt={article.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                    </div>
                    <div className="p-6">
                      <div className="flex items-center gap-4 mb-3">
                        <span className="text-xs font-mono text-emerald-500 uppercase">{article.category}</span>
                        <span className="text-xs text-muted-foreground flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {article.readTime}
                        </span>
                      </div>
                      <h3 className="text-lg font-bold mb-2 group-hover:text-emerald-500 transition-colors">
                        {article.title}
                      </h3>
                      <p className="text-sm text-muted-foreground line-clamp-2">{article.excerpt}</p>
                      <p className="text-xs text-muted-foreground mt-4">{article.date}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Newsletter */}
      <section className="py-24 border-b border-border">
        <div className="container mx-auto px-6">
          <div className="max-w-md mx-auto text-center">
            <div className="flex items-center justify-center gap-2 mb-6">
              <Bell className="w-5 h-5 text-emerald-500" />
              <span className="text-sm font-mono text-muted-foreground">Stay in the loop</span>
            </div>
            <p className="text-muted-foreground mb-6">
              Monthly insights on production engineering, technical trends, and industry best practices.
            </p>
            <NewsletterForm />
            <p className="text-xs text-muted-foreground mt-4">No spam. Unsubscribe anytime.</p>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
