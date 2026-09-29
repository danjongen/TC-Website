import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import type { Metadata } from "next"
import type { ReactNode } from "react"
import Image from "next/image"
import Link from "next/link"
import { BreadcrumbSchema } from "@/components/structured-data"
import { CueLabel } from "@/components/motion/cue-label"
import { RenderLabel } from "@/components/v2/render-label"
import { BSB_CASE_STUDY, PROJECTS, STATION_CASE_STUDY, STATION_IMAGES, type WorkImage } from "@/lib/work"

export const metadata: Metadata = {
  title: "Portfolio",
  description:
    "Selected work by Technically Creative: scan-based venue modelling, renders and CAD plans for Michigan Central Station, production engineering for the Backstreet Boys at Sphere, Las Vegas, and the Northline Heritage Project.",
  keywords: [
    "live event portfolio",
    "concert production",
    "technical direction",
    "LED video wall projects",
    "touring production",
    "Sphere Las Vegas production",
    "Backstreet Boys Sphere",
    "Michigan Central Station event plan",
    "3D venue scan to CAD",
    "event renders",
  ],
  openGraph: {
    title: "Portfolio",
    description: "Selected work from the world's most demanding live productions.",
    url: "https://tc.agency/portfolio",
    siteName: "TC Agency",
    images: [{ url: "/images/bsb-live-06.jpg", width: 1200, height: 630, alt: "Technically Creative selected work" }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Portfolio | TC Agency",
    description: "Selected work from the world's most demanding live productions.",
    images: ["/images/bsb-live-06.jpg"],
  },
  alternates: {
    canonical: "https://tc.agency/portfolio",
  },
}

export const dynamic = "force-static"
export const revalidate = 86400

const northline = PROJECTS.find((p) => p.slug === "northline-heritage")!

/** A full-frame 16:9 image with its label set below, never over, the picture. */
function WorkFigure({ image, sizes, priority, className = "" }: { image: WorkImage; sizes: string; priority?: boolean; className?: string }) {
  return (
    <figure className={className}>
      <Image
        src={image.src}
        width={image.width}
        height={image.height}
        alt={image.alt}
        sizes={sizes}
        priority={priority}
        className="block h-auto w-full"
      />
      {(image.label || image.caption) && (
        <figcaption className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 font-mono text-[11px] tracking-[0.2em] text-zinc-400">
          {image.label === "RENDER" && <RenderLabel />}
          {image.caption && <span>{image.caption}</span>}
        </figcaption>
      )}
    </figure>
  )
}

function ProjectHeader({ index, id, title, children }: { index: string; id: string; title: string; children?: ReactNode }) {
  return (
    <div className="mb-10 max-w-3xl">
      <CueLabel index={index} className="mb-6 font-mono text-[11px] tracking-[0.2em] text-zinc-400">
        PROJECT
      </CueLabel>
      <h2 id={id} data-reveal="rise" className="text-3xl font-semibold tracking-[-0.03em] text-white md:text-5xl">
        {title}
      </h2>
      {children}
    </div>
  )
}

// Backstreet Boys / Sphere: a visual gallery of real production work.
const gallery = [
  { image: "/images/bsb-live-06.jpg", caption: "Sphere, Las Vegas", span: "md:col-span-2" },
  { image: "/images/bsb-live-02.jpg", caption: "Into The Millennium" },
  { image: "/images/bsb-live-04.jpg", caption: "Video systems" },
  { image: "/images/bsb-live-01.jpg", caption: "Flying stage element" },
  { image: "/images/bsb-live-05.jpg", caption: "Automation and power" },
  { image: "/images/bsb-live-03.jpg", caption: "Show control", span: "md:col-span-2" },
]

export default function PortfolioPage() {
  return (
    <main className="min-h-screen bg-black text-white">
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "https://tc.agency" },
          { name: "Portfolio", url: "https://tc.agency/portfolio" },
        ]}
      />

      <Navbar />

      {/* Hero */}
      <section className="pt-40 md:pt-48 pb-[10vh]">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl">
            <CueLabel index="04" className="mb-6 font-mono text-[11px] tracking-[0.2em] text-zinc-400">
              PORTFOLIO
            </CueLabel>
            <h1
              data-vt="title"
              data-reveal="rise"
              className="w-fit text-5xl md:text-7xl font-semibold tracking-[-0.03em] text-white mb-8"
            >
              Selected work
            </h1>
            <p data-reveal="fade" className="text-lg leading-relaxed text-zinc-400 max-w-xl">
              Venue modelling, visualization and production engineering. Written case studies live in our Insights.
            </p>
            <nav aria-label="Projects" className="mt-8 flex flex-wrap gap-x-8 gap-y-3">
              {PROJECTS.map((p) => (
                <a
                  key={p.slug}
                  data-reveal="fade"
                  href={`#${p.slug}`}
                  className="-my-1 inline-block py-1 font-mono text-xs tracking-[0.2em] text-zinc-400 transition-colors duration-300 ease-expo hover:text-white"
                >
                  {p.title.toUpperCase()}
                </a>
              ))}
            </nav>
          </div>
        </div>
      </section>

      {/* Michigan Central Station */}
      <section id="michigan-central-station" aria-labelledby="mcs-title" className="scroll-mt-28 pb-[14vh]">
        <div className="container mx-auto px-6">
          <ProjectHeader index="01" id="mcs-title" title="Michigan Central Station: From station scan to event plan.">
            <p data-reveal="fade" className="mt-6 text-lg leading-relaxed text-zinc-400 max-w-xl">
              We used a 3D scan of Michigan Central Station to build a detailed venue model, create renders for an
              upcoming event and produce accurate CAD plans.
            </p>
            <Link
              data-reveal="fade"
              href={STATION_CASE_STUDY}
              className="mt-7 -mb-1 inline-block py-1 font-mono text-xs tracking-[0.2em] text-zinc-400 transition-colors duration-300 ease-expo hover:text-[#00D26A]"
            >
              EXPLORE THE PROJECT →
            </Link>
          </ProjectHeader>
          <WorkFigure image={STATION_IMAGES.grandHallWide} sizes="(min-width: 1536px) 1488px, calc(100vw - 48px)" priority />
          <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-4">
            <WorkFigure image={STATION_IMAGES.southConcourse} sizes="(max-width: 768px) calc(100vw - 48px), 50vw" />
            <WorkFigure image={STATION_IMAGES.grandHallStage} sizes="(max-width: 768px) calc(100vw - 48px), 50vw" />
          </div>
        </div>
      </section>

      {/* Backstreet Boys / Sphere */}
      <section id="backstreet-boys-sphere" aria-labelledby="bsb-title" className="scroll-mt-28 pb-[14vh]">
        <div className="container mx-auto px-6">
          <ProjectHeader index="02" id="bsb-title" title="Backstreet Boys / Sphere">
            <p data-reveal="fade" className="mt-6 text-lg leading-relaxed text-zinc-400 max-w-xl">
              Production engineering and technical direction for the Backstreet Boys Into The Millennium residency at
              Sphere, Las Vegas. Read the full story in our Insights.
            </p>
            <Link
              data-reveal="fade"
              href={BSB_CASE_STUDY}
              className="mt-7 -mb-1 inline-block py-1 font-mono text-xs tracking-[0.2em] text-zinc-400 transition-colors duration-300 ease-expo hover:text-[#00D26A]"
            >
              READ THE CASE STUDY →
            </Link>
          </ProjectHeader>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {gallery.map((item) => (
              <div
                key={item.image}
                data-reveal="resolve"
                className={`group relative aspect-[16/9] overflow-hidden ${item.span ?? ""}`}
              >
                <Image
                  src={item.image}
                  alt={`Technically Creative production work: ${item.caption}`}
                  fill
                  className="object-cover transition-transform duration-600 ease-expo group-hover:scale-[1.03]"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                <div className="absolute bottom-5 left-5">
                  <p className="font-mono text-[11px] tracking-[0.2em] text-zinc-300">{item.caption.toUpperCase()}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Northline Heritage Project */}
      <section id="northline-heritage" aria-labelledby="northline-title" className="scroll-mt-28 pb-[14vh]">
        <div className="container mx-auto px-6">
          <ProjectHeader index="03" id="northline-title" title={northline.title} />
          <WorkFigure image={northline.image} sizes="(min-width: 1536px) 1488px, calc(100vw - 48px)" />
        </div>
      </section>

      {/* CTA */}
      <section className="py-[14vh]">
        <div className="container mx-auto px-6">
          <h2 data-reveal="rise" className="text-3xl md:text-5xl font-semibold tracking-[-0.03em] text-white mb-6">
            Ready for your project?
          </h2>
          <p data-reveal="fade" className="text-lg leading-relaxed text-zinc-400 mb-10 max-w-xl">
            Every production is different. Tell us about yours and we will show you how we can help.
          </p>
          <Link
            data-reveal="fade"
            href="/contact"
            className="-my-1 inline-block py-1 font-mono text-xs tracking-[0.2em] text-zinc-400 transition-colors duration-300 ease-expo hover:text-[#00D26A]"
          >
            START A CONVERSATION →
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  )
}
