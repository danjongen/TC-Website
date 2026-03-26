import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, Clock, Share2, Linkedin, Twitter } from "lucide-react"
import { BreadcrumbSchema, ArticleSchema } from "@/components/structured-data"
import { notFound } from "next/navigation"

// Static post data (in production, this would come from a CMS)
const posts: Record<
  string,
  {
    title: string
    excerpt: string
    content: string[]
    image: string
    category: string
    readTime: string
    date: string
    author: string
    role: string
  }
> = {
  "sphere-las-vegas-technical-deep-dive": {
    title: "Inside the Sphere: A Technical Deep Dive",
    excerpt: "How we approached the world's largest LED display and delivered seamless 16K content at 120fps.",
    content: [
      "The Sphere in Las Vegas represents the pinnacle of immersive entertainment technology. With 160,000 square feet of programmable LED covering the interior dome, it's the world's largest and highest-resolution LED screen. Our role: ensuring content plays flawlessly across 16K resolution at 120 frames per second.",
      "## The Challenge",
      "Traditional LED processing systems weren't designed for this scale. We needed to process and distribute content across thousands of LED panels while maintaining perfect synchronization and zero visible latency. The margin for error was zero—any frame drop or sync issue would be immediately visible to 18,000 audience members.",
      "## Our Approach",
      "We designed a distributed processing architecture that breaks the dome into manageable zones, each handled by dedicated processing nodes. A master synchronization layer ensures every pixel updates in perfect lockstep. Redundant pathways mean any single point of failure switches over in under 8 milliseconds—imperceptible to the human eye.",
      "## Key Technical Decisions",
      "**Custom Protocol Development**: Standard video protocols couldn't handle the bandwidth. We developed a proprietary distribution method that reduces latency while maintaining color accuracy across the entire 16K canvas.",
      "**Thermal Management**: Processing 16K at 120fps generates significant heat. Our thermal modeling prevented any equipment failures during the 90+ show run.",
      "**Content Pipeline Optimization**: We created tools that let artists preview content on accurate dome geometry before it ever touches the physical LEDs, saving weeks of on-site iteration.",
      "## Results",
      "- 99.997% uptime across all performances\n- Zero visible sync issues reported\n- 8ms failover time on redundant systems\n- 40% reduction in content iteration time",
      "## Looking Forward",
      "The Sphere project has informed our approach to all large-scale LED installations. The principles of distributed processing, aggressive redundancy, and thermal-aware design now apply to touring productions at a fraction of the scale—but with the same commitment to reliability.",
    ],
    image: "/images/dsf3010.jpg",
    category: "Case Study",
    readTime: "12 min read",
    date: "November 15, 2024",
    author: "TC Engineering Team",
    role: "Technical Direction",
  },
  "automation-touring-production": {
    title: "Automation in Touring Production: Beyond the Basics",
    excerpt:
      "Why most touring productions underutilize automation, and how systematic approaches can cut setup time by 40%.",
    content: [
      "Touring productions face a unique challenge: they must replicate perfection night after night, often in venues with vastly different infrastructure. Yet most tours still rely heavily on manual processes that introduce variability and risk.",
      "## The Problem with Manual",
      "When setup depends on tribal knowledge and individual expertise, you're one sick crew member away from a compromised show. Documentation exists in people's heads. Calibration happens by feel. Integration is achieved through heroic effort rather than systematic design.",
      "## Automation Opportunities",
      "**Fixture Positioning**: Modern automation can position lights, video elements, and scenic pieces to millimeter accuracy. What once took hours of manual focusing now happens in minutes.",
      "**Network Configuration**: Automated network provisioning ensures every device gets the right address, the right permissions, and the right routing—every single time.",
      "**Show File Distribution**: Centralized show file management means one source of truth. Changes propagate automatically. Version conflicts become impossible.",
      "## Implementation Strategy",
      "Start small. Automate the most error-prone process first. Measure the impact. Expand systematically. Don't try to automate everything at once—that's a recipe for creating new problems while solving old ones.",
      "## Real Results",
      "On a recent stadium tour, we implemented automated fixture calibration, network provisioning, and show file distribution. The results:\n\n- 40% reduction in setup time\n- 95% reduction in network-related issues\n- Zero show file version conflicts\n- Crew freed up for creative tasks instead of troubleshooting",
    ],
    image: "/images/66a0205.jpg",
    category: "Technical Guide",
    readTime: "8 min read",
    date: "October 22, 2024",
    author: "TC Engineering Team",
    role: "Workflow Automation",
  },
  "ufo-pod-touring-control-infrastructure": {
    title: "UFO Pod: RF-Resilient Touring Control Infrastructure",
    excerpt:
      "How we built a self-contained, redundant control node for 18,000-person arenas where 2.4 GHz is unusable and 5 GHz collapses under crowd load.",
    content: [
      "The UFO Pod was a self-contained, touring-grade control infrastructure node designed to operate independently of every failure domain in a live arena environment. It was deployed on the Backstreet Boys Into The Millennium world tour.",
      "## Environment Reality",
      "18,000 devices in a steel bowl. 2.4 GHz unusable. 5 GHz collapses under audience ingress load. Venue Wi-Fi unpredictable. Shore power unstable. WAN subject to dropouts. The system had to operate independently of all of those failure domains.",
      "## System Architecture",
      "This was a layered resilience model with five domains: power continuity, WAN redundancy, RF-isolated backhaul, timecode redundancy, and full observability. Every layer had a fallback.",
      "## Power Architecture",
      "**EcoFlow battery system inline** with shore power as primary input. The battery served as a ride-through and continuity layer, not a backup. Segmented internal circuits with circuit-level telemetry and SOC logging. Sustained draw sat around 450W with headroom exceeding 2x. The battery ensured no reboots during generator sag, no drops during ISP power resets, and controlled shutdown if required. All metrics were exposed via API.",
      "## Transport Layer: 60 GHz Backhaul",
      "This was not Wi-Fi distribution. It was deterministic point-to-point transport using Ubiquiti Wave AP to Wave Nano at 60 GHz. Why 60 GHz: highly directional beamforming, minimal side-lobe bleed, oxygen absorption limits propagation, virtually no consumer interference, and clean spectrum inside an arena bowl. In a room where 2.4 and 5 GHz are noise floors, 60 GHz becomes surgical. The result: stable modulation rates, predictable throughput, and zero crowd-based RF collapse.",
      "## WAN Redundancy",
      "**Dual ISP uplinks** through a Dream Machine core with health-checked auto failover. WAN1 primary, WAN2 secondary. Failover was automatic and session-stable. Production users did not perceive transition events.",
      "## Timecode Redundancy Architecture",
      "This is where the system gets serious. Primary communication ran on sACN, providing network-distributed timing and control within the pod. Two additional redundancy layers were engineered on top.",
      "**Layer 1: Wireless Redundancy.** Wireless distribution of timecode inside the pod environment, allowing mobility, reduced physical patch dependency, and rapid reconfiguration.",
      "**Layer 2: Direct RF Timecode Auto-Failover.** A dedicated RF timecode transmission path existed independent of IP. If sACN failed, network transport degraded, or the wireless path dropped, an automatic RF switch engaged and sent timecode directly to the receiving unit. This removed IP stack dependency, VLAN misconfiguration risk, and switch failure dependency. Timecode continuity was preserved outside of Ethernet entirely. Network failure did not equal timing failure. In a show environment, that distinction matters.",
      "## Observability Layer",
      "The real differentiator was not redundancy. It was visibility. A custom unified GUI integrated Dream Machine API, UISP metrics, Wave link health, RSSI and modulation rates, WAN health and failover logs, EcoFlow battery telemetry, circuit-level draw monitoring, and integrated rack cameras. Operators could remotely see 60 GHz alignment health, packet loss trends, battery discharge curves, circuit loads, failover events, and physical rack state. Every subsystem had telemetry. Nothing was blind.",
      "## Deployment Logic",
      "Double-wide slam rack with integrated mast for Wave, EtherCON front termination, fiber-ready SFP+, touring strain relief, and single roll-in deployment. This was deployable infrastructure, not scattered components.",
      "## Engineering Philosophy",
      "Every failure domain was isolated. Power instability handled by the battery layer. WAN instability handled by dual ISP. RF congestion avoided via 60 GHz. IP dependency mitigated by RF timecode fallback. Human troubleshooting reduced via telemetry. The system was built assuming something would fail. Nothing critical depended on a single layer.",
    ],
    image: "/images/66a0205.jpg",
    category: "Case Study",
    readTime: "10 min read",
    date: "March 2, 2026",
    author: "TC Engineering Team",
    role: "System Integration",
  },
}

type Params = Promise<{ slug: string }>

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params
  const post = posts[slug]

  if (!post) {
    return { title: "Post Not Found" }
  }

  return {
    title: `${post.title} | TC Agency Insights`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url: `https://tc.agency/insights/${slug}`,
      type: "article",
      publishedTime: post.date,
      authors: [post.author],
      images: [{ url: post.image, width: 1200, height: 630, alt: post.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      images: [post.image],
    },
  }
}

export async function generateStaticParams() {
  return Object.keys(posts).map((slug) => ({ slug }))
}

export default async function InsightPost({ params }: { params: Params }) {
  const { slug } = await params
  const post = posts[slug]

  if (!post) {
    notFound()
  }

  return (
    <main className="min-h-screen bg-background text-foreground">
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "https://tc.agency" },
          { name: "Insights", url: "https://tc.agency/insights" },
          { name: post.title, url: `https://tc.agency/insights/${slug}` },
        ]}
      />
      <ArticleSchema
        headline={post.title}
        description={post.excerpt}
        image={post.image}
        datePublished={post.date}
        url={`https://tc.agency/insights/${slug}`}
      />

      <Navbar />

      {/* Hero */}
      <section className="pt-32 pb-8 border-b border-border">
        <div className="container mx-auto px-6">
          <Link
            href="/insights"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-white transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Insights
          </Link>

          <div className="max-w-3xl">
            <div className="flex items-center gap-4 mb-6">
              <span className="text-xs font-mono text-emerald-500 uppercase">{post.category}</span>
              <span className="text-xs text-muted-foreground flex items-center gap-1">
                <Clock className="w-3 h-3" />
                {post.readTime}
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">{post.title}</h1>
            <p className="text-xl text-muted-foreground leading-relaxed">{post.excerpt}</p>

            <div className="flex items-center justify-between mt-8 pt-8 border-t border-border">
              <div>
                <p className="font-medium">{post.author}</p>
                <p className="text-sm text-muted-foreground">{post.role}</p>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-sm text-muted-foreground">{post.date}</span>
                <div className="flex items-center gap-2">
                  <button className="p-2 border border-border hover:border-zinc-600 transition-colors">
                    <Twitter className="w-4 h-4" />
                  </button>
                  <button className="p-2 border border-border hover:border-zinc-600 transition-colors">
                    <Linkedin className="w-4 h-4" />
                  </button>
                  <button className="p-2 border border-border hover:border-zinc-600 transition-colors">
                    <Share2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Image */}
      <section className="py-12">
        <div className="container mx-auto px-6">
          <div className="relative aspect-[21/9] max-w-5xl mx-auto overflow-hidden border border-border">
            <Image src={post.image || "/placeholder.svg"} alt={post.title} fill className="object-cover" priority />
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-12 border-b border-border">
        <div className="container mx-auto px-6">
          <article className="max-w-3xl mx-auto prose prose-invert prose-emerald">
            {post.content.map((paragraph, index) => {
              if (paragraph.startsWith("## ")) {
                return (
                  <h2 key={index} className="text-2xl font-bold mt-12 mb-4">
                    {paragraph.replace("## ", "")}
                  </h2>
                )
              }
              if (paragraph.startsWith("**")) {
                return (
                  <p key={index} className="text-muted-foreground leading-relaxed mb-4">
                    <strong className="text-white">{paragraph.split("**")[1]}</strong>
                    {paragraph.split("**")[2]}
                  </p>
                )
              }
              if (paragraph.startsWith("- ")) {
                const items = paragraph.split("\n")
                return (
                  <ul key={index} className="list-disc list-inside space-y-2 mb-6">
                    {items.map((item, i) => (
                      <li key={i} className="text-muted-foreground">
                        {item.replace("- ", "")}
                      </li>
                    ))}
                  </ul>
                )
              }
              return (
                <p key={index} className="text-muted-foreground leading-relaxed mb-6">
                  {paragraph}
                </p>
              )
            })}
          </article>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to apply these principles?</h2>
          <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
            Let's discuss how engineering-grade approaches can transform your next production.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-6 py-3 bg-white text-black font-bold hover:bg-gray-200 transition-colors"
          >
            Start a Project
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  )
}
