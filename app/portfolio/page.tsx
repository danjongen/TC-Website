import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { BreadcrumbSchema } from "@/components/structured-data"

export const metadata: Metadata = {
  title: "Portfolio",
  description:
    "Selected work by Technically Creative. Production engineering and technical direction for the Backstreet Boys Into The Millennium residency at Sphere, Las Vegas.",
  keywords: [
    "live event portfolio",
    "concert production",
    "technical direction",
    "LED video wall projects",
    "touring production",
    "Sphere Las Vegas production",
    "Backstreet Boys Sphere",
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

// A visual gallery of real production work. Written case studies live in Insights.
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
            <p className="mb-6 font-mono text-[11px] tracking-[0.2em] text-zinc-400">[ 04 / PORTFOLIO ]</p>
            <h1 className="text-5xl md:text-7xl font-semibold tracking-[-0.03em] text-white mb-8">Selected work</h1>
            <p className="text-lg leading-relaxed text-zinc-400 max-w-xl">
              Production engineering and technical direction for the Backstreet Boys Into The Millennium residency at
              Sphere, Las Vegas. Read the full story in our Insights.
            </p>
            <Link
              href="/insights/ufo-pod-touring-control-infrastructure"
              className="mt-8 inline-block font-mono text-xs tracking-[0.2em] text-zinc-400 hover:text-[#00D26A] transition-colors duration-300"
            >
              READ THE CASE STUDY →
            </Link>
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="pb-[14vh]">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {gallery.map((item, i) => (
              <div
                key={item.image}
                className={`group relative aspect-[16/9] overflow-hidden ${item.span ?? ""}`}
              >
                <Image
                  src={item.image}
                  alt={`Technically Creative production work: ${item.caption}`}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority={i === 0}
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

      {/* CTA */}
      <section className="py-[14vh]">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl md:text-5xl font-semibold tracking-[-0.03em] text-white mb-6">
            Ready for your project?
          </h2>
          <p className="text-lg leading-relaxed text-zinc-400 mb-10 max-w-xl">
            Every production is different. Tell us about yours and we will show you how we can help.
          </p>
          <Link
            href="/contact"
            className="font-mono text-xs tracking-[0.2em] text-zinc-400 hover:text-[#00D26A] transition-colors duration-300"
          >
            START A CONVERSATION →
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  )
}
