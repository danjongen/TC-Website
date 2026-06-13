import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, Share2, Linkedin, Twitter } from "lucide-react"
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
    title: "Powering a Flying Stage Element in an RF Nightmare",
    excerpt:
      "A 13,000-pound flying stage element, fully wireless, in front of 18,000 people a night. How we built a system that never dropped. Not once.",
    content: [
      "A Backstreet Boys production needed a flying stage element for their show. The element measured 25 feet by 45 feet and weighed just under 13,000 pounds. It had to stay wireless. It had to control lighting, special effects, and deliver audio to performers mid-air. And it had to work flawlessly in front of 18,000 people every night.",
      "The venue made standard wireless solutions impossible. LED walls everywhere. Thousands of phones competing for the same frequencies. Every standard approach failed before doors even opened.",
      "Technically Creative built a system that never dropped. Not once. Zero timing failures across 50+ shows.",
      "## The Challenge",
      "Flying stage elements create a simple problem: you need wireless power and wireless control. Cables don't work when things are moving through the air.",
      "But this venue had a bigger problem. The wireless spectrum was already full before the first audience member walked in. LED walls emit interference. Venue infrastructure occupies frequencies. Then add 18,000 people with phones, and the wireless environment becomes hostile.",
      "The flying stage element needed to do three things without failure:\n\n- Control special effects and lighting cues in sync with the show\n- Deliver audio to performers through in-ear monitors\n- Run for extended periods without visible power issues",
      "A single dropout would be visible. Lighting cues would miss. Effects would fire at the wrong time. Performers would lose audio. In a high-stakes live environment, there's no second take.",
      "## The Solution",
      "**Wireless communication that worked in a saturated environment.** A dedicated wireless link operating on frequencies that weren't competing with venue infrastructure or audience devices carried lighting control, video feeds, and monitoring data. Timecode ran on its own three-layer redundancy architecture with automatic failover.",
      "**Power distribution built for reliability and speed.** Instead of custom fabrication, we adapted consumer battery systems that were already certified for venue use. The batteries ran the pod while airborne, then automatically switched to charging when grounded. The entire power system was built in four days.",
      "**Real-time monitoring that made problems visible before they became failures.** A unified dashboard pulled power status, network health, and visual confirmation into a single operator view. If something started degrading, the system could shed non-critical loads remotely to protect essential functions like performer audio.",
      "## Why This Approach Works",
      "The system eliminated single points of failure. Wireless communication had a backup path — if the primary link dropped, the backup engaged automatically. No one had to touch a button. Power capacity looked like overkill but enabled operational flexibility: the element could stay live for hours or days during programming. Monitoring turned invisible system status into actionable data.",
      "The timeline was tight. Four days from concept to completion. Pre-certified components eliminated approval delays. Modular design meant capacity could expand without starting over.",
      "## 60 GHz Millimeter-Wave: Stop Competing Entirely",
      "We needed a communication path that wouldn't compete with saturated bands. The answer was to stop competing entirely.",
      "60 GHz millimeter-wave operates outside the congested spectrum — a point-to-point link using a Ubiquiti Wave AP to Wave Nano pair. This band offers 9–14 GHz of bandwidth in largely uncongested space. The high attenuation that normally limits range becomes an asset: signals drop to noise level within 2.5 km, preventing interference with other systems.",
      "The link carried all IP traffic to the flying stage element:\n\n- sACN for lighting control\n- Streaming video in and out\n- Network communications via VLANs\n- Monitoring data",
      "## Timecode: Three Layers, Zero Excuses",
      "Timecode ran on three layers: sACN as primary, wireless distribution as the first fallback, and a dedicated direct-RF path as the second. If sACN failed, the network degraded, or the wireless path dropped, an automatic RF switch engaged and sent timecode directly to the receiving unit — removing all IP stack dependency. Network failure did not equal timing failure.",
      "This wasn't redundancy theater. When timecode fails, lighting cues miss their marks. Effects triggers fire at the wrong moment. The element's lighting stays active from doors onwards, even when nested in the stage. A timecode failure means visible degradation in front of thousands of people.",
      "## Power: Consumer Systems Beat Custom",
      "The flying stage element needed power for lighting, lasers, network hardware, video systems, and effects triggers. All wireless. All airborne. Most teams would build custom. We adapted consumer battery systems instead.",
      "Three EcoFlow DELTA Pro Ultra inverters, each paired with dual batteries, all feeding into their Smart Panel. The system was UL listed — venues don't approve non-certified power systems, and the timeline was four days. The Smart Panel handled switching automatically: element in the air, runs on batteries; element touches down, switches to shore power and charges at 50 amps.",
      "Distribution ran multiple True1 circuits via Socapex breakouts, individual 20A breakers across bus bars, and L6-20 outlets for 240V laser loads — all housed in a custom 3/4-inch Baltic birch caddy with a 20U rack section for networking and control hardware.",
      "UL listing delivered immediate venue approval. Modular design allowed capacity expansion without starting over. 50-amp charging meant fast turnaround between shows. When the timeline is measured in days, not weeks, this approach wins.",
      "## Monitoring: Nothing Is Blind",
      "A single dashboard pulled data from three sources: the EcoFlow API for power metrics, the UISP portal for network health, and Ubiquiti cameras for visual confirmation of lighting node status.",
      "The operations layer showed real-time state of charge, watts in and out, remaining runtime, a color-coded circuit heatmap, leg balance, and an alert banner — overload warnings at 80% load, pulsing red at 90%, battery alerts at 20% and 10%. The engineering layer tracked state of health, cycle counts, cell imbalance in millivolts, thermal spread, and relay wear: what breaks, before it breaks.",
      "If power dropped mid-show, the operator could remotely kill non-critical loads. Shed the lighting. Drop the effects. Keep the performers' in-ears alive.",
      "## The Failure Patterns This Avoided",
      "Most teams would have gone custom — and lost the monitoring infrastructure entirely. They would have underestimated power capacity; what looks like overkill enables extended programming time. They would have skipped the timecode redundancy because it feels like unnecessary complexity — until a few seconds of dropout creates visible failure in front of thousands of people.",
      "## Design Principles",
      "Each decision addressed a specific failure mode:\n\n- RF saturation eliminated standard wireless → 60 GHz millimeter-wave bypassed congested spectrum\n- Custom power distribution would miss the deadline → adapted consumer battery systems with UL listing and fast charging\n- Invisible system status creates operational blindness → unified monitoring dashboard with real-time alerts\n- Single-path timecode creates synchronization vulnerability → three-layer architecture with automatic failover",
      "The element flew. The effects fired. The performers heard themselves. The system never dropped.",
    ],
    image: "/images/bsb-live-02.jpg",
    category: "Case Study",
    readTime: "10 min read",
    date: "June 13, 2026",
    author: "Daniel Jongen",
    role: "Executive Technical Producer",
  },
  "operating-standard": {
    title: "Technically Creative Formalizes Its Operating Standard",
    excerpt:
      "I'm not launching a startup. I'm documenting what's been running in production for years. Why the new tc.agency is a boundary, not marketing.",
    content: [
      "I'm not launching a startup. I'm documenting what's been running in production for years.",
      "The new tc.agency is live. Not as marketing — as a boundary. It makes explicit what's been implicit: production engineering treats chaos as preventable system failure, not industry inevitability.",
      "For years, the work stayed relationship-led. That made sense when scale was smaller. Now the stakes have changed. Inadequate planning remains the most common cause of project failure, and rising costs alongside compressed margins mean organizations don't have room to treat risk as something to react to later.",
      "The site sets expectations before anyone picks up the phone — and lets misaligned prospects self-select out before anyone's time is spent.",
      "## How the Site Establishes Boundaries",
      "The site is explicit about the phased approach: discovery and alignment before system design. Simulation before execution. Clear ownership at every phase. Systematic risk management from day one.",
      "If you read the approach section and feel constrained, you've encountered a risk boundary you weren't expecting. If you read it and nod, you already work this way.",
      "The site doesn't convince. It reveals alignment or misalignment before the first conversation.",
      "## Structure as Signal",
      "The website's architecture reflects how Technically Creative operates. It doesn't lead with promises of outcomes. It establishes principles:\n\n- Systems over heroes\n- Automation over manual processes\n- Clarity over complexity",
      "This is the discipline that delivered 50+ Sphere shows with zero timing failures.",
      "The services page functions as a capability inventory, not a sales mechanism. The approach section details how decisions are made, risk is managed, and responsibility is assigned before execution begins.",
      "When someone from the target audience lands on the site, the next conversation skips positioning entirely. It starts at reality: constraints, stakes, failure modes, timing. Fewer conversations become better conversations — and that's what makes the business scalable without depending on personal effort to hold it together.",
      "## Frequently Asked Questions",
      "**What is Technically Creative?** A production engineering and technical direction studio focused on high-stakes live events. The firm applies systematic precision to environments where failure produces disproportionate consequences.",
      "**Who is the target audience for tc.agency?** Agency principals, senior producers, brand-side leaders, and touring artist teams who need certainty in high-stakes execution.",
      "**What makes this different from typical production companies?** Prevention rather than reaction. Systems are designed to anticipate failure modes early, when they're cheapest to solve, rather than relying on heroic recovery under pressure.",
      "**What's the business logic behind designing for fewer inquiries?** Not all revenue has the same cost. High-volume, low-alignment inquiries consume sales time, blur responsibility, and migrate risk downstream. Fewer, better-aligned projects protect margins and leadership bandwidth.",
    ],
    image: "/images/bsb-live-05.jpg",
    category: "Perspective",
    readTime: "5 min read",
    date: "June 13, 2026",
    author: "Daniel Jongen",
    role: "Executive Technical Producer",
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
    <main className="min-h-screen bg-black text-white">
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
      <section className="pt-40 md:pt-48 pb-[10vh]">
        <div className="container mx-auto px-6">
          <div className="max-w-2xl mx-auto">
            <Link
              href="/insights"
              className="inline-flex items-center gap-2 font-mono text-xs tracking-[0.2em] text-zinc-400 transition-colors duration-300 hover:text-white mb-12"
            >
              <ArrowLeft className="w-4 h-4" />
              BACK TO INSIGHTS
            </Link>

            <p className="mb-6 font-mono text-[11px] tracking-[0.2em] text-zinc-400">
              {post.category.toUpperCase()} · {post.date.toUpperCase()} · {post.readTime.toUpperCase()}
            </p>
            <h1 className="text-5xl md:text-7xl font-semibold tracking-[-0.03em] text-white mb-8">{post.title}</h1>
            <p className="text-lg leading-relaxed text-zinc-400 max-w-xl">{post.excerpt}</p>

            <div className="mt-12 flex items-center justify-between gap-6">
              <p className="font-mono text-[11px] tracking-[0.2em] text-zinc-400">
                {post.author.toUpperCase()} — {post.role.toUpperCase()}
              </p>
              <div className="flex items-center gap-4">
                <button
                  aria-label="Share on Twitter"
                  className="text-zinc-400 transition-colors duration-300 hover:text-white"
                >
                  <Twitter className="w-4 h-4" />
                </button>
                <button
                  aria-label="Share on LinkedIn"
                  className="text-zinc-400 transition-colors duration-300 hover:text-white"
                >
                  <Linkedin className="w-4 h-4" />
                </button>
                <button aria-label="Share" className="text-zinc-400 transition-colors duration-300 hover:text-white">
                  <Share2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Image */}
      <section className="pb-[10vh]">
        <div className="container mx-auto px-6">
          <div className="relative aspect-[21/9] max-w-5xl mx-auto overflow-hidden">
            <Image src={post.image || "/placeholder.svg"} alt={post.title} fill className="object-cover" priority />
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="pb-[10vh]">
        <div className="container mx-auto px-6">
          <article className="max-w-2xl mx-auto">
            {post.content.map((paragraph, index) => {
              if (paragraph.startsWith("## ")) {
                return (
                  <h2
                    key={index}
                    className="text-3xl md:text-5xl font-semibold tracking-[-0.03em] text-white mt-16 mb-6"
                  >
                    {paragraph.replace("## ", "")}
                  </h2>
                )
              }
              if (paragraph.startsWith("**")) {
                return (
                  <p key={index} className="text-lg leading-relaxed text-zinc-400 mb-6">
                    <strong className="font-semibold text-white">{paragraph.split("**")[1]}</strong>
                    {paragraph.split("**")[2]}
                  </p>
                )
              }
              if (paragraph.startsWith("- ")) {
                const items = paragraph.split("\n")
                return (
                  <ul key={index} className="list-disc list-inside space-y-2 mb-8">
                    {items.map((item, i) => (
                      <li key={i} className="text-lg leading-relaxed text-zinc-400">
                        {item.replace("- ", "")}
                      </li>
                    ))}
                  </ul>
                )
              }
              return (
                <p key={index} className="text-lg leading-relaxed text-zinc-400 mb-8">
                  {paragraph}
                </p>
              )
            })}
          </article>
        </div>
      </section>

      {/* CTA */}
      <section className="py-[14vh]">
        <div className="container mx-auto px-6">
          <div className="max-w-2xl mx-auto">
            <div className="h-px bg-zinc-900 mb-16" aria-hidden="true" />
            <h2 className="text-3xl md:text-5xl font-semibold tracking-[-0.03em] text-white mb-6">
              Ready to apply these principles?
            </h2>
            <p className="text-lg leading-relaxed text-zinc-400 max-w-xl mb-10">
              Let's discuss how engineering-grade approaches can transform your next production.
            </p>
            <Link
              href="/contact"
              className="font-mono text-xs tracking-[0.2em] text-zinc-400 transition-colors duration-300 hover:text-white"
            >
              START A PROJECT →
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
