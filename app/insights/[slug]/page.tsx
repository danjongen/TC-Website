import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, Share2, Linkedin, Twitter } from "lucide-react"
import { BreadcrumbSchema, ArticleSchema } from "@/components/structured-data"
import { notFound } from "next/navigation"
import { RenderLabel } from "@/components/v2/render-label"
import { STATION_IMAGES, type WorkImage } from "@/lib/work"

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
    /** Full-frame hero: shown at its own ratio instead of the default 21:9 crop. */
    hero?: WorkImage
    /** Images placed in the body with a "[[figure:key]]" line. */
    figures?: Record<string, WorkImage>
    ogImage?: { url: string; width: number; height: number }
  }
> = {
  "michigan-central-station-scan-to-event-plan": {
    title: "Michigan Central Station: From station scan to event plan.",
    excerpt:
      "We used a 3D scan of Michigan Central Station to build a detailed venue model, create renders for an upcoming event and produce accurate CAD plans.",
    content: [
      "Michigan Central Station in Detroit is a historic building with vaulted ceilings, stone columns and detailed architecture throughout. Planning an event inside a space like that starts with knowing exactly what is there.",
      "## Starting From the Scan",
      "The project began with a 3D scan of the station. The scan gave us a measured record of the building as it stands today, so the planning work started from the real architecture rather than from assumptions about it.",
      "## Building the Venue Model",
      "From the scan, we built a detailed 3D model of the venue, covering the Grand Hall and the South Concourse. That model became the base for everything that followed, so the renders and the plans describe the same spaces.",
      "## Output One: Event Renders",
      "With the venue modelled, we created renders of the planned event in both spaces. They show the stage, screens, seating and camera positions inside the station's own architecture, long before anything is installed. That gives everyone involved a shared picture of the event while there is still time to change it.",
      "[[figure:southConcourse]]",
      "[[figure:grandHallStage]]",
      "## Output Two: Accurate CAD Plans",
      "The same model was used to produce accurate CAD plans of the event spaces. Because the plans are drawn from the modelled station rather than estimated, the production team has a reliable basis for layout and coordination inside the building.",
      "## Where the Project Stands",
      "The event is upcoming. Every image on this page is a render from the venue model, not a photograph of the finished event.",
    ],
    image: STATION_IMAGES.grandHallWide.src,
    hero: STATION_IMAGES.grandHallWide,
    figures: {
      southConcourse: STATION_IMAGES.southConcourse,
      grandHallStage: STATION_IMAGES.grandHallStage,
    },
    ogImage: { url: "/og/mcs-grand-hall.jpg", width: 1200, height: 675 },
    category: "Case Study",
    readTime: "3 min read",
    date: "September 29, 2026",
    author: "Daniel Jongen",
    role: "Executive Technical Producer",
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
      "The system eliminated single points of failure. Wireless communication had a backup path, if the primary link dropped, the backup engaged automatically. No one had to touch a button. Power capacity looked like overkill but enabled operational flexibility: the element could stay live for hours or days during programming. Monitoring turned invisible system status into actionable data.",
      "The timeline was tight. Four days from concept to completion. Pre-certified components eliminated approval delays. Modular design meant capacity could expand without starting over.",
      "## 60 GHz Millimeter-Wave: Stop Competing Entirely",
      "We needed a communication path that wouldn't compete with saturated bands. The answer was to stop competing entirely.",
      "60 GHz millimeter-wave operates outside the congested spectrum, a point-to-point link using a Ubiquiti Wave AP to Wave Nano pair. This band offers 9–14 GHz of bandwidth in largely uncongested space. The high attenuation that normally limits range becomes an asset: signals drop to noise level within 2.5 km, preventing interference with other systems.",
      "The link carried all IP traffic to the flying stage element:\n\n- sACN for lighting control\n- Streaming video in and out\n- Network communications via VLANs\n- Monitoring data",
      "## Timecode: Three Layers, Zero Excuses",
      "Timecode ran on three layers: sACN as primary, wireless distribution as the first fallback, and a dedicated direct-RF path as the second. If sACN failed, the network degraded, or the wireless path dropped, an automatic RF switch engaged and sent timecode directly to the receiving unit, removing all IP stack dependency. Network failure did not equal timing failure.",
      "This wasn't redundancy theater. When timecode fails, lighting cues miss their marks. Effects triggers fire at the wrong moment. The element's lighting stays active from doors onwards, even when nested in the stage. A timecode failure means visible degradation in front of thousands of people.",
      "## Power: Consumer Systems Beat Custom",
      "The flying stage element needed power for lighting, lasers, network hardware, video systems, and effects triggers. All wireless. All airborne. Most teams would build custom. We adapted consumer battery systems instead.",
      "Three EcoFlow DELTA Pro Ultra inverters, each paired with dual batteries, all feeding into their Smart Panel. The system was UL listed, venues don't approve non-certified power systems, and the timeline was four days. The Smart Panel handled switching automatically: element in the air, runs on batteries; element touches down, switches to shore power and charges at 50 amps.",
      "Distribution ran multiple True1 circuits via Socapex breakouts, individual 20A breakers across bus bars, and L6-20 outlets for 240V laser loads, all housed in a custom 3/4-inch Baltic birch caddy with a 20U rack section for networking and control hardware.",
      "UL listing delivered immediate venue approval. Modular design allowed capacity expansion without starting over. 50-amp charging meant fast turnaround between shows. When the timeline is measured in days, not weeks, this approach wins.",
      "## Monitoring: Nothing Is Blind",
      "A single dashboard pulled data from three sources: the EcoFlow API for power metrics, the UISP portal for network health, and Ubiquiti cameras for visual confirmation of lighting node status.",
      "The operations layer showed real-time state of charge, watts in and out, remaining runtime, a color-coded circuit heatmap, leg balance, and an alert banner, overload warnings at 80% load, pulsing red at 90%, battery alerts at 20% and 10%. The engineering layer tracked state of health, cycle counts, cell imbalance in millivolts, thermal spread, and relay wear: what breaks, before it breaks.",
      "If power dropped mid-show, the operator could remotely kill non-critical loads. Shed the lighting. Drop the effects. Keep the performers' in-ears alive.",
      "## The Failure Patterns This Avoided",
      "Most teams would have gone custom, and lost the monitoring infrastructure entirely. They would have underestimated power capacity; what looks like overkill enables extended programming time. They would have skipped the timecode redundancy because it feels like unnecessary complexity, until a few seconds of dropout creates visible failure in front of thousands of people.",
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
    title: "What Technically Creative Does",
    excerpt:
      "Production engineering and technical direction for live events where failure is not an option. How we work, what we deliver, and who we do it for.",
    content: [
      "Technically Creative is a production engineering and technical direction studio for high-stakes live events. We build the systems that make demanding shows run, night after night, in front of tens of thousands of people.",
      "Most production problems are not creative problems. They are systems problems. A cue that fires late, a network that buckles under crowd load, a power feed that sags at the wrong moment. We treat these as preventable engineering failures, not industry inevitabilities, and we design them out before a single truck rolls.",
      "## What We Deliver",
      "We take responsibility for the technical backbone of a production end to end. That means one accountable team across automation, video, power, networking, and show control, rather than a pile of vendors hoping their pieces line up on show day.",
      "**Technical direction.** Senior leadership for arena tours, residencies, and broadcast. One point of ownership from design through load-out.",
      "**Systems integration.** Video, lighting, motion, power, and networking engineered as one machine, with redundancy built into every critical path.",
      "**Workflow automation.** Show-control pipelines and cueing systems that take human error off the critical path.",
      "**Power and data infrastructure.** Conditioned power, deterministic networking, and live telemetry for environments where the radio spectrum is saturated and the margin for error is zero.",
      "## How We Work",
      "Our process is phased on purpose: discovery and alignment first, then design, then simulation, then execution, with clear ownership at every stage. We rehearse the full technical chain before show day so the failure modes surface in a shop, not in front of an audience.",
      "The principles underneath the work are simple. Systems over heroes, so delivery never depends on one person being in the room. Automation over manual effort, so the team spends its attention on judgment, not data entry. Redundancy over optimism, so a single fault never becomes a visible failure.",
      "## Who We Work With",
      "We work with world-touring artists and major global brands. Backstreet Boys. No Doubt. The production companies, agency principals, and brand-side leaders behind shows that play to tens of thousands a night, where a single failure is seen by everyone. The common thread is ambition that outpaces the ordinary margin for error, and the expectation that the execution holds regardless.",
      "## Track Record",
      "We have delivered the production engineering behind the Backstreet Boys Into The Millennium residency at Sphere in Las Vegas, including a self-contained touring control system and a fully wireless flying stage element that ran every show without a single timing failure. The full case study is in our Insights.",
      "If your production cannot afford to fail, that is exactly the environment we are built for. Tell us what you are planning and we will show you how we can help.",
    ],
    image: "/images/bsb-live-05.jpg",
    category: "Perspective",
    readTime: "4 min read",
    date: "June 13, 2026",
    author: "Daniel Jongen",
    role: "Executive Technical Producer",
  },
}

type Params = Promise<{ slug: string }>

function FigureCaption({ image }: { image: WorkImage }) {
  if (!image.label && !image.caption) return null
  return (
    <figcaption className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 font-mono text-[11px] tracking-[0.2em] text-zinc-400">
      {image.label === "RENDER" && <RenderLabel />}
      {image.caption && <span>{image.caption}</span>}
    </figcaption>
  )
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params
  const post = posts[slug]

  if (!post) {
    return { title: "Post Not Found" }
  }

  const og = post.ogImage ?? { url: post.image, width: 1200, height: 630 }
  const metaTitle = post.title.replace(/\.$/, "")

  return {
    title: `${metaTitle} | TC Agency Insights`,
    description: post.excerpt,
    openGraph: {
      title: metaTitle,
      description: post.excerpt,
      url: `https://tc.agency/insights/${slug}`,
      type: "article",
      publishedTime: post.date,
      authors: [post.author],
      images: [{ ...og, alt: post.hero?.alt ?? metaTitle }],
    },
    twitter: {
      card: "summary_large_image",
      title: metaTitle,
      description: post.excerpt,
      images: [og.url],
    },
    alternates: {
      canonical: `https://tc.agency/insights/${slug}`,
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
              data-reveal="fade"
              href="/insights"
              className="-mt-1 mb-11 inline-flex items-center gap-2 py-1 font-mono text-xs tracking-[0.2em] text-zinc-400 transition-colors duration-300 ease-expo hover:text-white"
            >
              <ArrowLeft className="w-4 h-4" />
              BACK TO INSIGHTS
            </Link>

            <p data-reveal="fade" className="mb-6 font-mono text-[11px] tracking-[0.2em] text-zinc-400">
              {post.category.toUpperCase()} · {post.date.toUpperCase()} · {post.readTime.toUpperCase()}
            </p>
            {/* morph destination: the homepage gallery and /insights titles land here */}
            <h1
              data-vt="title"
              data-reveal="rise"
              className="w-fit text-5xl md:text-7xl font-semibold tracking-[-0.03em] text-white mb-8"
            >
              {post.title}
            </h1>
            <p data-reveal="fade" className="text-lg leading-relaxed text-zinc-400 max-w-xl">
              {post.excerpt}
            </p>

            <div data-reveal="fade" className="mt-12 flex items-center justify-between gap-6">
              <p className="font-mono text-[11px] tracking-[0.2em] text-zinc-400">
                {post.author.toUpperCase()} / {post.role.toUpperCase()}
              </p>
              <div className="flex items-center gap-4">
                <button
                  aria-label="Share on Twitter"
                  className="-m-1 p-1 text-zinc-400 transition-colors duration-300 ease-expo hover:text-white"
                >
                  <Twitter className="w-4 h-4" />
                </button>
                <button
                  aria-label="Share on LinkedIn"
                  className="-m-1 p-1 text-zinc-400 transition-colors duration-300 ease-expo hover:text-white"
                >
                  <Linkedin className="w-4 h-4" />
                </button>
                <button
                  aria-label="Share"
                  className="-m-1 p-1 text-zinc-400 transition-colors duration-300 ease-expo hover:text-white"
                >
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
          {post.hero ? (
            <figure className="max-w-5xl mx-auto">
              {/* morph destination; full frame at the image's own ratio, never cropped */}
              <div data-vt="media" className="overflow-hidden">
                <Image
                  src={post.hero.src}
                  width={post.hero.width}
                  height={post.hero.height}
                  alt={post.hero.alt}
                  priority
                  sizes="(min-width: 1072px) 1024px, calc(100vw - 48px)"
                  className="block h-auto w-full"
                />
              </div>
              <FigureCaption image={post.hero} />
            </figure>
          ) : (
            /* morph destination: the homepage gallery card image lands here */
            <div data-reveal="resolve" data-vt="media" className="relative aspect-[21/9] max-w-5xl mx-auto overflow-hidden">
              <Image src={post.image || "/placeholder.svg"} alt={post.title} fill className="object-cover" priority />
            </div>
          )}
        </div>
      </section>

      {/* Content */}
      <section className="pb-[10vh]">
        <div className="container mx-auto px-6">
          <article className="max-w-2xl mx-auto">
            {post.content.map((paragraph, index) => {
              const figure = paragraph.match(/^\[\[figure:(\w+)\]\]$/)
              if (figure) {
                const image = post.figures?.[figure[1]]
                if (!image) return null
                return (
                  <figure key={index} className="my-12 lg:-mx-24 xl:-mx-40">
                    <div data-reveal="fade">
                      <Image
                        src={image.src}
                        width={image.width}
                        height={image.height}
                        alt={image.alt}
                        sizes="(min-width: 1280px) 992px, (min-width: 1024px) 864px, (min-width: 768px) 672px, calc(100vw - 48px)"
                        className="block h-auto w-full"
                      />
                    </div>
                    <FigureCaption image={image} />
                  </figure>
                )
              }
              if (paragraph.startsWith("## ")) {
                return (
                  <h2
                    key={index}
                    data-reveal="rise"
                    className="text-3xl md:text-5xl font-semibold tracking-[-0.03em] text-white mt-16 mb-6"
                  >
                    {paragraph.replace("## ", "")}
                  </h2>
                )
              }
              if (paragraph.startsWith("**")) {
                return (
                  <p key={index} data-reveal="fade" className="text-lg leading-relaxed text-zinc-400 mb-6">
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
                      <li key={i} data-reveal="fade" className="text-lg leading-relaxed text-zinc-400">
                        {item.replace("- ", "")}
                      </li>
                    ))}
                  </ul>
                )
              }
              return (
                <p key={index} data-reveal="fade" className="text-lg leading-relaxed text-zinc-400 mb-8">
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
            <div data-reveal="line" className="h-px origin-left bg-zinc-900 mb-16" aria-hidden="true" />
            <h2 data-reveal="rise" className="text-3xl md:text-5xl font-semibold tracking-[-0.03em] text-white mb-6">
              Ready to apply these principles?
            </h2>
            <p data-reveal="fade" className="text-lg leading-relaxed text-zinc-400 max-w-xl mb-10">
              Let's discuss how engineering-grade approaches can transform your next production.
            </p>
            <Link
              data-reveal="fade"
              href="/contact"
              className="-my-1 inline-block py-1 font-mono text-xs tracking-[0.2em] text-zinc-400 transition-colors duration-300 ease-expo hover:text-white"
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
