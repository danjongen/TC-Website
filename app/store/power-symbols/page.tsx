import type { Metadata } from "next"
import Link from "next/link"

import { Footer } from "@/components/footer"
import { Navbar } from "@/components/navbar"
import { PowerSymbolsDemo } from "./power-symbols-demo"

const supportOptions = [
  {
    amount: "$10",
    title: "Beta access",
    description: "Get the current private build, serial activation and beta updates.",
    href: "https://tc-agency-store.myshopify.com/cart/53609848635755:1",
  },
  {
    amount: "$25",
    title: "Beta + development support",
    description: "The same access, with extra support for testing and documentation.",
    href: "https://tc-agency-store.myshopify.com/cart/53609848668523:1",
  },
  {
    amount: "$50",
    title: "Beta + release support",
    description: "The same access, with a larger contribution toward QA and signing.",
    href: "https://tc-agency-store.myshopify.com/cart/53609848701291:1",
  },
] as const

const description =
  "Get the paid Power Symbols beta for Vectorworks 2026 on macOS. Place editable production power symbols and create a coordinated Power Distribution Schedule."

export const metadata: Metadata = {
  title: "Power Symbols Beta for Vectorworks",
  description,
  alternates: { canonical: "https://www.tc.agency/store/power-symbols" },
  openGraph: {
    type: "website",
    url: "https://www.tc.agency/store/power-symbols",
    title: "Power Symbols Beta for Vectorworks | Technically Creative",
    description,
  },
  twitter: {
    card: "summary",
    title: "Power Symbols Beta for Vectorworks | Technically Creative",
    description,
  },
}

const softwareJsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Power Symbols",
  applicationCategory: "DesignApplication",
  operatingSystem: "macOS",
  softwareVersion: "0.2.3 paid beta",
  description,
  offers: {
    "@type": "AggregateOffer",
    lowPrice: "10",
    highPrice: "50",
    offerCount: "3",
    priceCurrency: "USD",
  },
}

export default function PowerSymbolsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareJsonLd) }}
      />
      <Navbar />
      <main id="main-content" className="min-h-screen bg-black text-white">
        <section className="mx-auto w-full max-w-[1600px] px-6 pb-14 pt-36 md:px-12 md:pb-20 md:pt-44">
          <nav
            aria-label="Breadcrumb"
            className="font-mono text-xs uppercase tracking-[0.2em] text-zinc-500"
          >
            <Link
              href="/store"
              className="transition-colors hover:text-[#00D26A] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00D26A]"
            >
              Store
            </Link>
            <span aria-hidden="true"> / </span>
            <span className="text-zinc-300">Power Symbols</span>
          </nav>

          <div className="mt-12 grid items-end gap-10 lg:grid-cols-[1.05fr_0.95fr]">
            <div>
              <div className="flex flex-wrap gap-3 font-mono text-[11px] uppercase tracking-[0.17em]">
                <span className="bg-[#00D26A] px-3 py-2 text-black">Paid beta</span>
                <span className="border border-zinc-700 px-3 py-2 text-zinc-300">
                  Vectorworks 2026
                </span>
                <span className="border border-zinc-700 px-3 py-2 text-zinc-300">
                  macOS
                </span>
              </div>
              <h1 className="mt-8 max-w-[10ch] text-6xl font-semibold leading-[0.86] tracking-[-0.06em] text-balance sm:text-7xl md:text-8xl lg:text-9xl">
                Power
                <br />
                Symbols
              </h1>
              <p className="mt-8 max-w-2xl text-lg leading-relaxed text-zinc-300 md:text-xl">
                Drop editable production-power symbols into Vectorworks and
                keep the drawing and Power Distribution Schedule coordinated.
              </p>
            </div>

            <div className="border border-zinc-800 bg-zinc-900/40 p-6 md:p-8">
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-[#00D26A]">
                Beta 0.2.3
              </p>
              <p className="mt-5 text-2xl font-semibold tracking-[-0.03em]">
                Choose your support level. Get the build.
              </p>
              <p className="mt-4 leading-relaxed text-zinc-400">
                Every tier unlocks the same private beta. After checkout,
                you’ll receive the download and your activation serial by email.
              </p>
              <a
                href="#beta-access"
                className="mt-8 flex items-center justify-between bg-[#00D26A] px-6 py-5 font-mono text-xs font-bold uppercase tracking-[0.18em] text-black transition-colors hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black"
              >
                Choose beta access
                <span aria-hidden="true">→</span>
              </a>
              <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.12em] text-zinc-500">
                Secure checkout · Private delivery · One-time Mac activation
              </p>
            </div>
          </div>
        </section>

        <section className="border-y border-zinc-800 bg-zinc-950">
          <div className="mx-auto w-full max-w-[1600px] px-6 py-10 md:px-12 md:py-16">
            <PowerSymbolsDemo />
          </div>
        </section>

        <section className="mx-auto grid w-full max-w-[1600px] gap-12 px-6 py-16 md:px-12 md:py-24 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.25em] text-zinc-500">
              [ What it does ]
            </p>
            <h2 className="mt-6 max-w-[12ch] text-4xl font-semibold tracking-[-0.045em] md:text-6xl">
              Less redrawing. Better power plans.
            </h2>
          </div>
          <div className="grid gap-px border border-zinc-800 bg-zinc-800 sm:grid-cols-2">
            {[
              ["07", "Production-ready symbol types"],
              ["01", "Coordinated power schedule"],
              ["∞", "Editable ratings, routes and departments"],
              ["B/W", "Legible colour and grayscale output"],
            ].map(([value, label]) => (
              <div key={label} className="bg-black p-7 md:p-9">
                <p className="font-mono text-3xl font-bold text-[#00D26A]">
                  {value}
                </p>
                <p className="mt-5 max-w-[23ch] leading-relaxed text-zinc-300">
                  {label}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="border-t border-zinc-800 bg-zinc-950">
          <div className="mx-auto grid w-full max-w-[1600px] gap-10 px-6 py-16 md:px-12 md:py-24 lg:grid-cols-[0.78fr_1.22fr]">
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.25em] text-[#00D26A]">
                [ In development ]
              </p>
              <h2 className="mt-6 max-w-[11ch] text-4xl font-semibold tracking-[-0.045em] md:text-6xl">
                Route cable in 3D. Know the run.
              </h2>
              <p className="mt-6 max-w-xl leading-relaxed text-zinc-400">
                The next major workflow under investigation links power symbols
                with connector-aware 3D cable paths, measured run lengths and
                cable takeoffs.
              </p>
            </div>
            <div className="relative min-h-80 overflow-hidden border border-zinc-800 bg-black p-7 md:p-10">
              <div className="absolute left-0 right-0 top-1/2 h-px bg-zinc-800" />
              <div className="absolute bottom-0 top-0 left-1/2 w-px bg-zinc-800" />
              <svg
                viewBox="0 0 800 320"
                role="img"
                aria-label="Roadmap concept showing a connector-aware three-dimensional cable route"
                className="relative h-full min-h-64 w-full"
              >
                <path
                  d="M70 230 C170 230 170 90 300 90 S430 260 560 210 S650 80 740 85"
                  fill="none"
                  stroke="#27272a"
                  strokeWidth="22"
                  strokeLinecap="round"
                />
                <path
                  d="M70 230 C170 230 170 90 300 90 S430 260 560 210 S650 80 740 85"
                  fill="none"
                  stroke="#00D26A"
                  strokeWidth="4"
                  strokeDasharray="10 12"
                  strokeLinecap="round"
                >
                  <animate
                    attributeName="stroke-dashoffset"
                    from="0"
                    to="-44"
                    dur="2s"
                    repeatCount="indefinite"
                  />
                </path>
                <g fill="#000" stroke="#fff" strokeWidth="4">
                  <circle cx="70" cy="230" r="24" />
                  <circle cx="740" cy="85" r="24" />
                </g>
                <g fill="#00D26A" fontFamily="monospace" fontSize="18" fontWeight="700">
                  <text x="42" y="280">P042 · POWERLOCK</text>
                  <text x="596" y="45">DISTRO · P043</text>
                  <text x="350" y="292">RUN 46.8 m + SLACK</text>
                </g>
              </svg>
              <div className="relative mt-5 grid gap-px bg-zinc-800 sm:grid-cols-3">
                {[
                  ["3D", "Cable path"],
                  ["m", "Measured length"],
                  ["↔", "Connector mapping"],
                ].map(([value, label]) => (
                  <div key={label} className="bg-zinc-950 p-4">
                    <span className="font-mono text-lg font-bold text-[#00D26A]">
                      {value}
                    </span>
                    <span className="ml-3 text-sm text-zinc-400">{label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="install" className="border-t border-zinc-800">
          <div className="mx-auto w-full max-w-[1600px] px-6 py-16 md:px-12 md:py-24">
            <p className="font-mono text-xs uppercase tracking-[0.25em] text-zinc-500">
              [ Install — about five minutes ]
            </p>
            <div className="mt-10 grid gap-px border border-zinc-800 bg-zinc-800 md:grid-cols-4">
              {[
                ["01", "Quit Vectorworks 2026."],
                ["02", "Open the private email and unzip the beta kit."],
                ["03", "Follow 01 INSTALL INSTRUCTIONS.txt."],
                ["04", "Enter your email + serial once, then place a test symbol."],
              ].map(([step, copy]) => (
                <div key={step} className="bg-zinc-950 p-7">
                  <p className="font-mono text-xs font-bold tracking-[0.2em] text-[#00D26A]">
                    {step}
                  </p>
                  <p className="mt-5 leading-relaxed text-zinc-300">{copy}</p>
                </div>
              ))}
            </div>
            <p className="mt-6 max-w-4xl text-sm leading-relaxed text-zinc-500">
              The test kit uses one Terminal command because the customer-grade
              double-click installer is not yet Apple-signed or notarised. The
              included installer verifies the plug-in and keeps a rollback
              backup.
            </p>
          </div>
        </section>

        <section id="beta-access" className="scroll-mt-24 border-t border-zinc-800 bg-zinc-950">
          <div className="mx-auto w-full max-w-[1600px] px-6 py-16 md:px-12 md:py-24">
            <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
              <div>
                <p className="font-mono text-xs uppercase tracking-[0.25em] text-zinc-500">
                  [ Get the paid beta ]
                </p>
                <h2 className="mt-6 max-w-[12ch] text-4xl font-semibold tracking-[-0.045em] md:text-6xl">
                  Pick the contribution that works for you.
                </h2>
              </div>
              <p className="max-w-2xl leading-relaxed text-zinc-400">
                Every option includes the same current beta, a private download
                link and signed Mac activation. Higher tiers simply put more
                toward testing, documentation and Apple signing.
              </p>
            </div>

            <div className="mt-12 grid gap-4 md:grid-cols-3">
              {supportOptions.map((option) => (
                <a
                  key={option.amount}
                  href={option.href}
                  className="group flex min-h-64 flex-col justify-between border border-zinc-800 bg-black p-7 transition-colors hover:border-[#00D26A] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00D26A]"
                >
                  <div>
                    <p className="font-mono text-4xl font-bold text-[#00D26A]">
                      {option.amount}
                    </p>
                    <h3 className="mt-7 text-xl font-semibold">
                      {option.title}
                    </h3>
                    <p className="mt-4 text-sm leading-relaxed text-zinc-400">
                      {option.description}
                    </p>
                  </div>
                  <span className="mt-8 flex items-center justify-between font-mono text-xs font-bold uppercase tracking-[0.18em] text-white group-hover:text-[#00D26A]">
                    Get beta access
                    <span aria-hidden="true">↗</span>
                  </span>
                </a>
              ))}
            </div>
            <p className="mt-7 font-mono text-[10px] uppercase tracking-[0.12em] text-zinc-600">
              One-off paid beta access · Same build at every tier · Serial sent
              after payment
            </p>
          </div>
        </section>

        <section className="border-t border-zinc-800">
          <div className="mx-auto w-full max-w-[1600px] px-6 py-14 md:px-12 md:py-20">
            <p className="max-w-5xl text-sm leading-relaxed text-zinc-500">
              Beta software may change and should be tested on copies or
              backups. Power Symbols records and displays power information; it
              does not calculate electrical loads, size conductors or replace
              qualified electrical review. Please do not redistribute the test
              kit.
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
