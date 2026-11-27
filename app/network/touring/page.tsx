import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { BreadcrumbSchema } from "@/components/structured-data"
import { CueLabel } from "@/components/motion/cue-label"
import { BSB_CASE_STUDY, HOMECOMING_IMAGES } from "@/lib/work"

export const dynamic = "force-static"
export const revalidate = 86400

const TITLE = "Touring Network Credits | Show-Critical Networks | TC Agency"
const DESCRIPTION =
  "Show-critical production networks for the Backstreet Boys at Sphere, Las Vegas, and the Homecoming stadium shows in Düsseldorf. The engineering behind TC's network installs."

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: "https://www.tc.agency/network/touring",
    siteName: "TC Agency - Technically Creative",
    type: "website",
    images: [{ url: "/images/bsb-live-06.jpg", width: 1200, height: 630, alt: "Backstreet Boys at Sphere, Las Vegas" }],
  },
  alternates: {
    canonical: "https://www.tc.agency/network/touring",
  },
}

const credits = [
  {
    index: "01",
    show: "Backstreet Boys / Sphere, Las Vegas",
    role: "PRODUCTION ENGINEERING AND TECHNICAL DIRECTION",
    image: {
      src: "/images/bsb-live-06.jpg",
      alt: "Backstreet Boys at Sphere, Las Vegas.",
    },
    points: [
      "A 60 GHz Ubiquiti point-to-point link to the flying stage element, carrying sACN lighting control, video in and out, VLAN-separated comms and monitoring.",
      "Timecode on three layers: sACN, a wireless fallback and a direct RF path, so a network failure never became a timing failure.",
      "One dashboard pulling power metrics, UISP network health and Ubiquiti camera confirmation into a single operator view.",
      "A custom power and data caddy with a 20U rack section for the element's networking and control hardware.",
    ],
    href: BSB_CASE_STUDY,
    linkLabel: "READ THE CASE STUDY →",
  },
  {
    index: "02",
    show: "Backstreet Boys / Homecoming, Düsseldorf",
    role: "TECHNICAL DIRECTION, SITE COORDINATION AND PRODUCTION INFRASTRUCTURE",
    image: { src: HOMECOMING_IMAGES.fullBowl.src, alt: HOMECOMING_IMAGES.fullBowl.alt },
    points: [
      "A 100Gb backbone and ST 2110 distribution installed to support Show Orchestrator.",
      "Venue connectivity, production Wi-Fi and network services coordinated across build and rehearsal.",
      "RF planning and licensing coordinated ahead of opening, with interference monitored through rehearsals and the first show.",
    ],
    href: "/portfolio#backstreet-boys-homecoming",
    linkLabel: "SEE THE PROJECT →",
  },
]

const carryOver = [
  { from: "VLAN separation for show, crew and guest traffic", to: "Staff, guest and device networks kept apart" },
  { from: "Monitoring before the fault reaches the stage", to: "Remote monitoring before the fault reaches the front desk" },
  { from: "Labelled, documented touring racks", to: "A handover pack with every install" },
  { from: "Fallback paths on every critical signal", to: "Designs that fail gracefully, not completely" },
]

export default function TouringNetworkPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "https://www.tc.agency" },
          { name: "Network", url: "https://www.tc.agency/network" },
          { name: "Touring", url: "https://www.tc.agency/network/touring" },
        ]}
      />

      <Navbar />

      <main id="main-content" className="pt-40 md:pt-48">
        <section className="pb-[12vh]">
          <div className="container mx-auto px-6">
            <Link
              href="/network"
              className="mb-10 inline-block font-mono text-xs tracking-[0.2em] text-zinc-500 transition-colors duration-300 ease-expo hover:text-white"
            >
              ← NETWORK
            </Link>
            <div className="max-w-4xl">
              <CueLabel className="mb-6 font-mono text-[11px] tracking-[0.2em] text-zinc-400">
                CREDITS / TOURING
              </CueLabel>
              <h1
                data-vt="title"
                data-reveal="rise"
                className="w-fit mb-8 max-w-3xl text-5xl font-semibold tracking-[-0.03em] text-white md:text-7xl"
              >
                Where the standard comes from.
              </h1>
              <p data-reveal="fade" className="max-w-2xl text-lg leading-relaxed text-zinc-400 md:text-xl">
                On a show, the network carries lighting, video, timecode and comms, and doors open at a fixed time. The
                same engineering goes into every building we wire.
              </p>
            </div>
          </div>
        </section>

        {credits.map((c) => (
          <section key={c.index} aria-labelledby={`credit-${c.index}`} className="pb-[14vh]">
            <div className="container mx-auto px-6">
              <CueLabel index={c.index} className="mb-6 font-mono text-[11px] tracking-[0.2em] text-zinc-400">
                CREDIT
              </CueLabel>
              <div className="relative mb-10 aspect-[16/9] w-full overflow-hidden border border-zinc-800">
                <Image
                  src={c.image.src}
                  alt={c.image.alt}
                  fill
                  sizes="(min-width: 1536px) 1488px, calc(100vw - 48px)"
                  className="object-cover"
                />
              </div>
              <div className="grid gap-10 lg:grid-cols-2">
                <div>
                  <h2 id={`credit-${c.index}`} className="mb-4 text-3xl font-semibold tracking-[-0.03em] md:text-4xl">
                    {c.show}
                  </h2>
                  <p className="mb-8 font-mono text-[11px] tracking-[0.2em] text-zinc-500">{c.role}</p>
                  <Link
                    href={c.href}
                    className="font-mono text-xs tracking-[0.2em] text-zinc-400 transition-colors duration-300 ease-expo hover:text-[#00D26A]"
                  >
                    {c.linkLabel}
                  </Link>
                </div>
                <ul className="border-t border-zinc-800">
                  {c.points.map((p) => (
                    <li key={p} className="border-b border-zinc-800 py-5 text-base leading-relaxed text-zinc-400">
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>
        ))}

        <section aria-labelledby="carry-heading" className="pb-[14vh]">
          <div className="container mx-auto px-6">
            <CueLabel index="03" className="mb-6 font-mono text-[11px] tracking-[0.2em] text-zinc-400">
              SHOW_TO_BUILDING
            </CueLabel>
            <h2 id="carry-heading" className="mb-10 max-w-2xl text-3xl font-semibold tracking-[-0.03em] md:text-5xl">
              What carries over.
            </h2>
            <div className="border-t border-zinc-800">
              {carryOver.map((r) => (
                <div key={r.from} className="grid gap-2 border-b border-zinc-800 py-6 md:grid-cols-2 md:gap-10">
                  <p className="text-base text-zinc-500">
                    <span className="mr-3 font-mono text-[11px] tracking-[0.2em]">ON TOUR</span>
                    {r.from}
                  </p>
                  <p className="text-base text-white">
                    <span className="mr-3 font-mono text-[11px] tracking-[0.2em] text-zinc-500">IN YOUR BUILDING</span>
                    {r.to}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="pb-[16vh]">
          <div className="container mx-auto px-6">
            <div className="max-w-2xl border-t border-zinc-800 pt-12">
              <CueLabel index="04" className="mb-6 font-mono text-[11px] tracking-[0.2em] text-zinc-400">
                NEXT CUE
              </CueLabel>
              <h2 className="mb-6 text-3xl font-semibold tracking-[-0.03em] text-white md:text-5xl">
                Put it in your building.
              </h2>
              <Link
                href="/contact?source=network-survey#contact-form"
                className="inline-block bg-white px-6 py-4 font-mono text-xs tracking-[0.2em] text-black transition-opacity duration-300 ease-expo hover:opacity-80"
              >
                BOOK_A_SITE_SURVEY
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
