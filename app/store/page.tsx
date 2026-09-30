import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { POWER_SYMBOLS_VERSION } from "@/lib/power-symbols-version"
import { compatibilityLine, isPublicDownloadEnabled } from "@/lib/layout-points/release"

import { Footer } from "@/components/footer"
import { CueLabel } from "@/components/motion/cue-label"
import { Navbar } from "@/components/navbar"

import { storeProducts } from "./products"
import "./layout-points/layout-points.css"

const description =
  "Purpose-built hardware and software for live production, including the TC SSL Shelf for SSL Live consoles, Power Symbols for Vectorworks and Layout Points + Datum Label Studio."

export const metadata: Metadata = {
  title: "Store | Live Production Field Tools",
  description,
  alternates: { canonical: "https://www.tc.agency/store" },
  openGraph: {
    type: "website",
    url: "https://www.tc.agency/store",
    title: "Live Production Field Tools | Technically Creative",
    description,
    images: [
      {
        url: storeProducts[0].image.src,
        width: storeProducts[0].image.width,
        height: storeProducts[0].image.height,
        alt: storeProducts[0].imageAlt,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Live Production Field Tools | Technically Creative",
    description,
    images: [storeProducts[0].image.src],
  },
}

const catalogJsonLd = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Technically Creative Store",
  itemListElement: [
    ...storeProducts.map((product) => ({ name: product.name, href: product.href })),
    { name: "Power Symbols", href: "/store/power-symbols" },
    { name: "Layout Points + Datum Label Studio", href: "/store/layout-points" },
  ].map((product, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: product.name,
    url: `https://www.tc.agency${product.href}`,
  })),
}

export default function StorePage() {
  const product = storeProducts[0]
  const layoutPointsReleased = isPublicDownloadEnabled()

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(catalogJsonLd) }}
      />
      <Navbar />
      <main id="main-content" className="min-h-screen bg-black text-white">
        <section className="mx-auto w-full max-w-[1600px] px-6 pb-16 pt-36 md:px-12 md:pb-24 md:pt-44">
          <CueLabel className="font-mono text-xs uppercase tracking-[0.25em] text-[#00D26A]">
            STORE / FIELD TOOLS
          </CueLabel>
          <h1
            data-vt="title"
            data-reveal="rise"
            className="mt-7 w-fit max-w-[14ch] text-5xl font-semibold leading-[0.95] tracking-[-0.05em] text-balance sm:text-6xl md:text-7xl lg:text-8xl"
          >
            Built for the field.
          </h1>
          <p data-reveal="fade" className="mt-8 max-w-2xl text-lg leading-relaxed text-zinc-400 md:text-xl">
            Purpose-built hardware and software for live production. Small
            tools, real problems solved.
          </p>
        </section>

        <section
          className="mx-auto w-full max-w-[1600px] border-t border-zinc-800 px-6 py-16 md:px-12 md:py-24"
          aria-labelledby="hardware-heading"
        >
          <div className="mb-8 flex flex-wrap items-center justify-between gap-x-6 gap-y-2">
            <CueLabel index="01" className="whitespace-nowrap font-mono text-xs uppercase tracking-[0.25em] text-zinc-400">
              PHYSICAL TOOL
            </CueLabel>
            <p data-reveal="fade" className="whitespace-nowrap font-mono text-xs uppercase tracking-[0.2em] text-[#00D26A]">
              Available now
            </p>
          </div>

          <Link
            href={product.href}
            className="group grid overflow-hidden border border-zinc-800 bg-zinc-900/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00D26A] focus-visible:ring-inset md:grid-cols-[1.15fr_0.85fr]"
          >
            <div
              data-reveal="resolve"
              data-vt="media"
              data-vt-source="media"
              className="relative min-h-[25rem] overflow-hidden bg-zinc-950 md:min-h-[38rem]"
            >
              <Image
                src={product.image}
                alt={product.imageAlt}
                fill
                sizes="(min-width: 768px) 58vw, 100vw"
                placeholder="blur"
                className="object-cover transition-transform duration-600 ease-expo group-hover:scale-[1.02] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
              />
              <div
                className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"
                aria-hidden="true"
              />
            </div>

            <div className="flex flex-col justify-between p-7 md:p-10 lg:p-12">
              <div>
                <div data-reveal="fade" className="flex items-start justify-between gap-5">
                  <p className="font-mono text-xs uppercase tracking-[0.2em] text-zinc-400">
                    {product.category}
                  </p>
                  <p className="text-2xl font-semibold tracking-[-0.04em] text-white">
                    {product.price}
                  </p>
                </div>
                <h2
                  id="hardware-heading"
                  data-reveal="rise"
                  data-vt-source="title"
                  className="mt-16 w-fit text-4xl font-semibold tracking-[-0.045em] md:text-5xl"
                >
                  {product.name}
                </h2>
                <p data-reveal="fade" className="mt-5 font-mono text-xs uppercase tracking-[0.15em] text-[#00D26A]">
                  Somewhere to put it. Finally.
                </p>
                <p data-reveal="fade" className="mt-7 max-w-xl leading-relaxed text-zinc-300">
                  {product.description}
                </p>
              </div>
              <span
                data-reveal="fade"
                className="mt-12 flex items-center justify-between border-t border-zinc-800 pt-6 font-mono text-xs font-bold uppercase tracking-[0.2em] text-white transition-colors duration-300 ease-expo group-hover:text-[#00D26A]"
              >
                View and buy
                <span aria-hidden="true">→</span>
              </span>
            </div>
          </Link>
        </section>

        <section
          id="power-symbols"
          className="border-t border-zinc-800"
          aria-labelledby="power-symbols-heading"
        >
          <div className="mx-auto w-full max-w-[1600px] px-6 py-16 md:px-12 md:py-24">
            <div className="mb-8 flex flex-wrap items-center justify-between gap-x-6 gap-y-2">
              <CueLabel index="02" className="whitespace-nowrap font-mono text-xs uppercase tracking-[0.25em] text-zinc-400">
                SOFTWARE TOOL
              </CueLabel>
              <p data-reveal="fade" className="whitespace-nowrap font-mono text-xs uppercase tracking-[0.2em] text-amber-300">
                Paid beta
              </p>
            </div>

            <article className="grid border border-zinc-800 bg-zinc-900/40 md:grid-cols-[1.1fr_0.9fr]">
              <div className="border-b border-zinc-800 p-7 md:border-b-0 md:border-r md:p-10 lg:p-12">
                <p data-reveal="fade" className="font-mono text-xs uppercase tracking-[0.2em] text-zinc-400">
                  Plug-in for Vectorworks
                </p>
                <h2
                  id="power-symbols-heading"
                  data-reveal="rise"
                  className="mt-16 text-5xl font-semibold leading-[0.88] tracking-[-0.055em] sm:text-6xl lg:text-7xl"
                >
                  Power
                  <br />
                  Symbols
                </h2>
                <p data-reveal="fade" className="mt-7 max-w-xl leading-relaxed text-zinc-300">
                  Editable power-distribution symbols and a coordinated power
                  schedule for production drawings, without maintaining the same
                  information twice.
                </p>
              </div>

              <div className="flex flex-col justify-end p-7 md:p-10 lg:p-12">
                <ul className="divide-y divide-zinc-800 border-y border-zinc-800 text-sm text-zinc-300">
                  <li data-reveal="fade" className="py-4">
                    Seven production-ready symbol types
                  </li>
                  <li data-reveal="fade" className="py-4">
                    Editable ratings, references and departments
                  </li>
                  <li data-reveal="fade" className="py-4">
                    One-click Power Distribution Schedule
                  </li>
                  <li data-reveal="fade" className="py-4">
                    3D cable routing + length takeoff roadmap
                  </li>
                </ul>
                <p data-reveal="fade" className="mt-8 font-mono text-[11px] uppercase tracking-[0.14em] text-zinc-500">
                  Vectorworks 2026 · macOS · Beta {POWER_SYMBOLS_VERSION}
                </p>
                <Link
                  data-reveal="fade"
                  href="/store/power-symbols"
                  className="mt-6 flex items-center justify-between bg-[#00D26A] px-6 py-5 font-mono text-xs font-bold uppercase tracking-[0.18em] text-black transition-colors duration-300 ease-expo hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black"
                >
                  Get the beta
                  <span aria-hidden="true">→</span>
                </Link>
              </div>
            </article>
          </div>
        </section>

        <section
          id="layout-points"
          className="border-t border-zinc-800"
          aria-labelledby="layout-points-heading"
        >
          <div className="mx-auto w-full max-w-[1600px] px-6 py-16 md:px-12 md:py-24">
            <div className="mb-8 flex flex-wrap items-center justify-between gap-x-6 gap-y-2">
              <CueLabel index="03" className="whitespace-nowrap font-mono text-xs uppercase tracking-[0.25em] text-zinc-400">
                SOFTWARE TOOL
              </CueLabel>
              <p
                data-reveal="fade"
                className={`whitespace-nowrap font-mono text-xs uppercase tracking-[0.2em] ${layoutPointsReleased ? "text-[#00D26A]" : "text-amber-300"}`}
              >
                {layoutPointsReleased ? "Paid beta" : "Paid beta in preparation"}
              </p>
            </div>

            <Link
              href="/store/layout-points"
              className="group grid border border-zinc-800 bg-zinc-900/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00D26A] focus-visible:ring-inset md:grid-cols-[1.1fr_0.9fr]"
            >
              <div className="border-b border-zinc-800 p-7 md:border-b-0 md:border-r md:p-10 lg:p-12">
                <p data-reveal="fade" className="font-mono text-xs uppercase tracking-[0.2em] text-zinc-400">
                  Vectorworks plug-in + Mac app
                </p>
                <h2
                  id="layout-points-heading"
                  data-reveal="rise"
                  data-vt-source="title"
                  className="mt-16 text-5xl font-semibold leading-[0.88] tracking-[-0.055em] sm:text-6xl lg:text-7xl"
                >
                  Layout
                  <br />
                  Points
                </h2>
                <p data-reveal="fade" className="mt-5 font-mono text-xs uppercase tracking-[0.15em] text-[#00D26A]">
                  + Datum Label Studio
                </p>
                <p data-reveal="fade" className="mt-7 max-w-xl leading-relaxed text-zinc-300">
                  From Vectorworks datum to physical datum. Place and number layout points, export one verified field
                  package, then calibrate and print exact datum labels locally on your Mac.
                </p>
              </div>

              <div className="flex flex-col justify-between gap-10 p-7 md:p-10 lg:p-12">
                <svg
                  viewBox="0 0 320 170"
                  aria-hidden="true"
                  className="block h-auto w-full max-w-md"
                >
                  <rect x="40" y="20" width="240" height="130" fill="#fafafa" />
                  <rect x="40" y="20" width="240" height="8" fill="#00D26A" />
                  <text x="56" y="56" fontSize="18" fontWeight="700" fill="#000" className="font-mono">
                    L042
                  </text>
                  <g stroke="#000" strokeWidth="2" fill="none">
                    <circle cx="160" cy="95" r="10" />
                    <line x1="142" y1="95" x2="178" y2="95" />
                    <line x1="160" y1="77" x2="160" y2="113" />
                  </g>
                  <circle cx="160" cy="95" r="3" fill="#00D26A" />
                  <circle className="lp-hover-ping" cx="160" cy="95" r="12" fill="none" stroke="#00D26A" strokeWidth="2" opacity="0" />
                </svg>
                <div>
                  <p data-reveal="fade" className="font-mono text-[11px] uppercase leading-relaxed tracking-[0.14em] text-zinc-400">
                    {compatibilityLine().join(" · ")}
                  </p>
                  <span
                    data-reveal="fade"
                    className="mt-6 flex items-center justify-between border-t border-zinc-800 pt-6 font-mono text-xs font-bold uppercase tracking-[0.2em] text-white transition-colors duration-300 ease-expo group-hover:text-[#00D26A]"
                  >
                    {layoutPointsReleased ? "Get the Mac workflow" : "See the workflow"}
                    <span aria-hidden="true">→</span>
                  </span>
                </div>
              </div>
            </Link>
          </div>
        </section>

        <section className="border-t border-zinc-800">
          <div className="mx-auto grid w-full max-w-[1600px] gap-10 px-6 py-20 md:grid-cols-[1fr_auto] md:items-end md:px-12 md:py-28">
            <div>
              <CueLabel index="04" className="font-mono text-xs uppercase tracking-[0.25em] text-zinc-400">
                WHAT SHOULD EXIST?
              </CueLabel>
              <h2 data-reveal="rise" className="mt-5 max-w-[17ch] text-3xl font-semibold tracking-[-0.03em] md:text-5xl">
                If your crew keeps improvising the same fix, tell us.
              </h2>
            </div>
            <Link
              data-reveal="fade"
              href="/contact"
              className="inline-flex w-fit items-center justify-center border-b border-white py-4 font-mono text-xs font-bold uppercase tracking-[0.2em] text-white transition-colors duration-300 ease-expo hover:border-[#00D26A] hover:text-[#00D26A] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00D26A]"
            >
              Send the field note →
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
