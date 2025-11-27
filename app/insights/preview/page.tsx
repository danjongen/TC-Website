import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Clock, Tag, AlertTriangle } from "lucide-react"
import { BreadcrumbSchema } from "@/components/structured-data"

export const metadata: Metadata = {
  title: "Insights Preview | TC Agency",
  robots: {
    index: false,
    follow: false,
  },
}

const featuredPost = {
  slug: "sphere-las-vegas-technical-deep-dive",
  title: "Inside the Sphere: A Technical Deep Dive",
  excerpt:
    "How we approached the world's largest LED display and delivered seamless 16K content at 120fps. A comprehensive breakdown of the systems, challenges, and solutions.",
  image: "/images/dsf3010.jpg",
  category: "Case Study",
  readTime: "12 min read",
  date: "November 2024",
}

const posts = [
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
  {
    slug: "led-volume-virtual-production",
    title: "LED Volumes: Virtual Production for Live Events",
    excerpt: "Applying film-industry virtual production techniques to live corporate events and brand experiences.",
    image: "/images/dscf9211.jpg",
    category: "Industry Trends",
    readTime: "6 min read",
    date: "September 2024",
  },
  {
    slug: "redundancy-high-stakes-shows",
    title: "Engineering Redundancy for High-Stakes Shows",
    excerpt: "The difference between 99.9% and 99.99% uptime, and why it matters when millions are watching.",
    image: "/images/dsf3815.jpg",
    category: "Best Practices",
    readTime: "10 min read",
    date: "August 2024",
  },
  {
    slug: "unreal-engine-live-events",
    title: "Unreal Engine in Live Events: A Practical Guide",
    excerpt:
      "From nDisplay configuration to real-time content rendering—everything you need to know about UE5 for live production.",
    image: "/images/dsf3917.jpg",
    category: "Technical Guide",
    readTime: "15 min read",
    date: "July 2024",
  },
  {
    slug: "3d-scanning-venue-workflow",
    title: "3D Scanning Workflow for Venue Documentation",
    excerpt: "How LiDAR and photogrammetry are transforming pre-production planning and eliminating on-site surprises.",
    image: "/images/dsf3010.jpg",
    category: "Case Study",
    readTime: "7 min read",
    date: "June 2024",
  },
]

const categories = ["All", "Case Study", "Technical Guide", "Industry Trends", "Best Practices"]

export default function InsightsPreviewPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "https://tc.agency" },
          { name: "Insights", url: "https://tc.agency/insights" },
        ]}
      />

      <Navbar />

      {/* Preview Warning Banner */}
      <div className="bg-amber-500 text-black py-3">
        <div className="container mx-auto px-6 flex items-center justify-center gap-2">
          <AlertTriangle className="w-4 h-4" />
          <span className="text-sm font-mono font-bold">PREVIEW MODE — This page is not public</span>
        </div>
      </div>

      {/* Hero */}
      <section className="pt-32 pb-16 border-b border-border">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl">
            <p className="text-sm font-mono text-emerald-500 mb-4 uppercase tracking-widest">06 / Insights</p>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-8">
              Technical perspectives from the field.
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Case studies, technical guides, and industry insights from our work on the world's most demanding
              productions.
            </p>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-8 border-b border-border bg-zinc-950/50">
        <div className="container mx-auto px-6">
          <div className="flex flex-wrap gap-4">
            {categories.map((category) => (
              <button
                key={category}
                className={`px-4 py-2 text-sm font-mono transition-colors ${
                  category === "All"
                    ? "bg-white text-black"
                    : "text-muted-foreground hover:text-white border border-border hover:border-zinc-600"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Post */}
      <section className="py-16 border-b border-border">
        <div className="container mx-auto px-6">
          <Link href={`/insights/${featuredPost.slug}`} className="group block">
            <div className="grid lg:grid-cols-2 gap-8 items-center">
              <div className="relative aspect-[16/10] overflow-hidden border border-border">
                <Image
                  src={featuredPost.image || "/placeholder.svg"}
                  alt={featuredPost.title}
                  fill
                  className="object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                />
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 bg-emerald-500 text-black text-xs font-mono uppercase">Featured</span>
                </div>
              </div>
              <div>
                <div className="flex items-center gap-4 mb-4">
                  <span className="text-xs font-mono text-emerald-500 uppercase">{featuredPost.category}</span>
                  <span className="text-xs text-muted-foreground flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {featuredPost.readTime}
                  </span>
                </div>
                <h2 className="text-3xl md:text-4xl font-bold mb-4 group-hover:text-emerald-500 transition-colors">
                  {featuredPost.title}
                </h2>
                <p className="text-muted-foreground leading-relaxed mb-6">{featuredPost.excerpt}</p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">{featuredPost.date}</span>
                  <span className="inline-flex items-center gap-2 text-sm font-mono text-emerald-500 group-hover:gap-3 transition-all">
                    Read Case Study <ArrowRight className="w-4 h-4" />
                  </span>
                </div>
              </div>
            </div>
          </Link>
        </div>
      </section>

      {/* Posts Grid */}
      <section className="py-16 border-b border-border">
        <div className="container mx-auto px-6">
          <h2 className="text-2xl font-bold mb-12">Latest Articles</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <Link key={post.slug} href={`/insights/${post.slug}`} className="group">
                <article className="h-full flex flex-col">
                  <div className="relative aspect-[16/10] overflow-hidden border border-border mb-4">
                    <Image
                      src={post.image || "/placeholder.svg"}
                      alt={post.title}
                      fill
                      className="object-cover grayscale group-hover:grayscale-0 transition-all duration-300"
                    />
                  </div>
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-xs font-mono text-emerald-500 uppercase flex items-center gap-1">
                      <Tag className="w-3 h-3" />
                      {post.category}
                    </span>
                    <span className="text-xs text-muted-foreground">{post.readTime}</span>
                  </div>
                  <h3 className="text-lg font-bold mb-2 group-hover:text-emerald-500 transition-colors flex-grow">
                    {post.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{post.excerpt}</p>
                  <span className="text-xs text-muted-foreground">{post.date}</span>
                </article>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">Stay in the loop</h2>
            <p className="text-muted-foreground mb-8">
              Get monthly insights on production engineering, technical trends, and industry best practices.
            </p>
            <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="your@email.com"
                aria-label="Email address for newsletter"
                className="flex-grow px-4 py-3 bg-zinc-900 border border-border text-white placeholder:text-muted-foreground focus:outline-none focus:border-emerald-500 transition-colors"
              />
              <button
                type="submit"
                className="px-6 py-3 bg-white text-black font-bold hover:bg-gray-200 transition-colors"
              >
                Subscribe
              </button>
            </form>
            <p className="text-xs text-muted-foreground mt-4">No spam. Unsubscribe anytime.</p>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
