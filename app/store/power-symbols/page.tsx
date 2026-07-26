import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"

import { Footer } from "@/components/footer"
import { Navbar } from "@/components/navbar"

const downloadHref = "/downloads/Power-Symbols-0.2.2-VW2026-Beta.zip"

const supportOptions = [
  {
    amount: "$10",
    title: "Buy the developer a coffee",
    description: "A quick thank-you for a tool that saved you some drawing time.",
    href: "https://tc-agency-store.myshopify.com/cart/53609848635755:1",
  },
  {
    amount: "$25",
    title: "Back a test build",
    description: "Help cover packaging, documentation and real-world testing.",
    href: "https://tc-agency-store.myshopify.com/cart/53609848668523:1",
  },
  {
    amount: "$50",
    title: "Help fund release QA",
    description: "Support compatibility checks and the eventual signed installer.",
    href: "https://tc-agency-store.myshopify.com/cart/53609848701291:1",
  },
] as const

const description =
  "Download the Power Symbols beta for Vectorworks 2026 on macOS. Place editable production power symbols and create a coordinated Power Distribution Schedule."

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
  softwareVersion: "0.2.2 beta",
  downloadUrl: `https://www.tc.agency${downloadHref}`,
  description,
  offers: {
    "@type": "Offer",
    price: "0",
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
                <span className="bg-[#00D26A] px-3 py-2 text-black">Open beta</span>
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
                Beta 0.2.2
              </p>
              <p className="mt-5 text-2xl font-semibold tracking-[-0.03em]">
                No application. No serial. Get the build.
              </p>
              <p className="mt-4 leading-relaxed text-zinc-400">
                This unlocked beta is for Vectorworks Design Suite 2026 on
                macOS. Use a backed-up or disposable drawing while testing.
              </p>
              <a
                href={downloadHref}
                download
                className="mt-8 flex items-center justify-between bg-[#00D26A] px-6 py-5 font-mono text-xs font-bold uppercase tracking-[0.18em] text-black transition-colors hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black"
              >
                Download the beta
                <span aria-hidden="true">↓</span>
              </a>
              <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.12em] text-zinc-500">
                240 KB ZIP · SHA-256 d103774475fcb605… · Free beta
              </p>
            </div>
          </div>
        </section>

        <section className="border-y border-zinc-800 bg-zinc-950">
          <div className="mx-auto w-full max-w-[1600px] px-6 py-10 md:px-12 md:py-16">
            <div className="border border-zinc-800 bg-[#F3F0E8] p-6 text-black md:p-10">
              <div className="flex items-center justify-between border-b border-black pb-5 font-mono text-[10px] font-bold uppercase tracking-[0.18em] sm:text-xs">
                <span>Power Symbols</span>
                <span className="text-zinc-500">Vectorworks / editable data</span>
              </div>
              <div className="grid gap-px bg-zinc-300 py-px md:grid-cols-3">
                {[
                  {
                    src: "/images/store/power-symbols/power-drop-400a.svg",
                    label: "Power drop / 400A",
                  },
                  {
                    src: "/images/store/power-symbols/step-down-16a.svg",
                    label: "Step-down / 16A",
                  },
                  {
                    src: "/images/store/power-symbols/generator.svg",
                    label: "Generator source",
                  },
                ].map((symbol) => (
                  <div
                    key={symbol.src}
                    className="flex min-h-72 flex-col items-center justify-between bg-[#F3F0E8] p-6 md:min-h-96"
                  >
                    <div className="relative my-auto aspect-square w-full max-w-72">
                      <Image
                        src={symbol.src}
                        alt={symbol.label}
                        fill
                        sizes="(min-width: 768px) 30vw, 80vw"
                        className="object-contain"
                      />
                    </div>
                    <p className="mt-5 w-full border-t border-black pt-4 font-mono text-[10px] font-bold uppercase tracking-[0.16em]">
                      {symbol.label}
                    </p>
                  </div>
                ))}
              </div>
              <div className="flex items-center justify-between border-t border-black pt-5 font-mono text-[10px] font-bold uppercase tracking-[0.16em]">
                <span>Production drawing grammar</span>
                <span>Beta 0.2.2</span>
              </div>
            </div>
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

        <section id="install" className="border-t border-zinc-800">
          <div className="mx-auto w-full max-w-[1600px] px-6 py-16 md:px-12 md:py-24">
            <p className="font-mono text-xs uppercase tracking-[0.25em] text-zinc-500">
              [ Install — about five minutes ]
            </p>
            <div className="mt-10 grid gap-px border border-zinc-800 bg-zinc-800 md:grid-cols-4">
              {[
                ["01", "Quit Vectorworks 2026."],
                ["02", "Download and unzip the beta kit."],
                ["03", "Follow 01 INSTALL INSTRUCTIONS.txt."],
                ["04", "Add Power Symbol to a tool palette and place a test symbol."],
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

        <section className="border-t border-zinc-800 bg-zinc-950">
          <div className="mx-auto w-full max-w-[1600px] px-6 py-16 md:px-12 md:py-24">
            <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
              <div>
                <p className="font-mono text-xs uppercase tracking-[0.25em] text-zinc-500">
                  [ Optional support ]
                </p>
                <h2 className="mt-6 max-w-[12ch] text-4xl font-semibold tracking-[-0.045em] md:text-6xl">
                  Useful? Help make it shippable.
                </h2>
              </div>
              <p className="max-w-2xl leading-relaxed text-zinc-400">
                The beta is free. Support is optional and never changes what
                you can download. Contributions fund testing, documentation,
                Apple signing and release packaging.
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
                    Support the build
                    <span aria-hidden="true">↗</span>
                  </span>
                </a>
              ))}
            </div>
            <p className="mt-7 font-mono text-[10px] uppercase tracking-[0.12em] text-zinc-600">
              One-off contributions · Not tax-deductible · No licence purchase
              required
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
