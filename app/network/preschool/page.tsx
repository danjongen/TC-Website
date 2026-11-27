import type { Metadata } from "next"
import Link from "next/link"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { BreadcrumbSchema } from "@/components/structured-data"
import { CueLabel } from "@/components/motion/cue-label"
import { Fill, Placeholder } from "@/components/network/placeholder"

export const dynamic = "force-static"
export const revalidate = 86400

const TITLE = "Case Study: Community Preschool Network"
const DESCRIPTION =
  "A UniFi network, classroom Wi-Fi, branded guest Wi-Fi and UniFi Talk phones for a Metro Detroit community preschool, designed, installed and donated by TC."

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: "https://www.tc.agency/network/preschool",
    siteName: "TC Agency - Technically Creative",
    type: "article",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Community preschool network case study" }],
  },
  alternates: {
    canonical: "https://www.tc.agency/network/preschool",
  },
}

const scope = [
  { label: "NETWORK", value: "UniFi gateway and managed switching" },
  { label: "WI-FI", value: "Classroom and office coverage, staff and guest separated" },
  { label: "GUEST", value: "Isolated guest network with a branded splash page" },
  { label: "PHONES", value: "UniFi Talk for the school's main number" },
  { label: "MANAGEMENT", value: "Remote monitoring through UniFi Site Manager" },
]

export default function PreschoolCaseStudyPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "https://www.tc.agency" },
          { name: "Network", url: "https://www.tc.agency/network" },
          { name: "Community preschool", url: "https://www.tc.agency/network/preschool" },
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
                CASE 01 / PERMANENT INSTALL
              </CueLabel>
              <h1
                data-vt="title"
                data-reveal="rise"
                className="w-fit mb-8 max-w-3xl text-5xl font-semibold tracking-[-0.03em] text-white md:text-7xl"
              >
                A preschool network, built like a show rack.
              </h1>
              <p data-reveal="fade" className="max-w-2xl text-lg leading-relaxed text-zinc-400 md:text-xl">
                A Metro Detroit community preschool needed reliable Wi-Fi for staff, a separate network for families
                and visitors, and a working phone line. TC designed, installed and donated the whole system.
              </p>
              <div className="mt-8 max-w-2xl">
                <Placeholder
                  label="CLIENT NAME"
                  note="School name stays out until the director approves it. If approved, add it here and to the title."
                />
              </div>
            </div>
          </div>
        </section>

        <section className="pb-[12vh]">
          <div className="container mx-auto px-6">
            <Placeholder
              label="LEAD PHOTO"
              aspect="aspect-[16/9]"
              note="Finished rack or a ceiling AP in a classroom. No children, faces or school signage."
            />
          </div>
        </section>

        {/* Brief */}
        <section aria-labelledby="brief-heading" className="pb-[12vh]">
          <div className="container mx-auto px-6">
            <div className="grid gap-12 lg:grid-cols-2">
              <div>
                <CueLabel index="01" className="mb-6 font-mono text-[11px] tracking-[0.2em] text-zinc-400">
                  BRIEF
                </CueLabel>
                <h2 id="brief-heading" className="mb-6 text-3xl font-semibold tracking-[-0.03em] md:text-4xl">
                  What had to work.
                </h2>
                <div className="max-w-xl space-y-4 text-lg leading-relaxed text-zinc-400">
                  <p>
                    Staff devices on a private network. Families and visitors kept off it entirely. A phone number that
                    rings where it should. All of it manageable without anyone on site who knows networking.
                  </p>
                  <p>
                    Before: <Fill>WHAT WAS THERE BEFORE, E.G. CONSUMER ROUTER, DEAD SPOTS</Fill>.
                  </p>
                </div>
              </div>
              <div>
                <CueLabel index="02" className="mb-6 font-mono text-[11px] tracking-[0.2em] text-zinc-400">
                  SCOPE
                </CueLabel>
                <ul className="border-t border-zinc-800">
                  {scope.map((s) => (
                    <li key={s.label} className="flex flex-col gap-1 border-b border-zinc-800 py-5 md:flex-row md:gap-8">
                      <span className="w-40 shrink-0 font-mono text-[11px] tracking-[0.2em] text-zinc-300">{s.label}</span>
                      <span className="text-base text-zinc-400">{s.value}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Specs */}
        <section aria-labelledby="specs-heading" className="pb-[12vh]">
          <div className="container mx-auto px-6">
            <CueLabel index="03" className="mb-6 font-mono text-[11px] tracking-[0.2em] text-zinc-400">
              SYSTEM
            </CueLabel>
            <h2 id="specs-heading" className="sr-only">
              System figures
            </h2>
            <dl className="grid border-l border-t border-zinc-800 sm:grid-cols-2 lg:grid-cols-4">
              {[
                ["FLOOR AREA", "SQ FT"],
                ["ACCESS POINTS", "COUNT AND MODEL"],
                ["SWITCHING", "MODEL AND PORTS"],
                ["NETWORKS", "VLAN COUNT"],
                ["GATEWAY", "MODEL"],
                ["CLIENTS DAY ONE", "COUNT"],
                ["PHONES", "HANDSETS"],
                ["INSTALLED", "MONTH YEAR"],
              ].map(([label, fill]) => (
                <div key={label} className="border-b border-r border-zinc-800 p-6">
                  <dt className="mb-3 font-mono text-[11px] tracking-[0.2em] text-zinc-500">{label}</dt>
                  <dd className="text-lg text-white">
                    <Fill>{fill}</Fill>
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        {/* Guest Wi-Fi */}
        <section aria-labelledby="guest-heading" className="pb-[12vh]">
          <div className="container mx-auto px-6">
            <div className="grid gap-12 lg:grid-cols-2">
              <div>
                <CueLabel index="04" className="mb-6 font-mono text-[11px] tracking-[0.2em] text-zinc-400">
                  GUEST_WI-FI
                </CueLabel>
                <h2 id="guest-heading" className="mb-6 text-3xl font-semibold tracking-[-0.03em] md:text-4xl">
                  A front door in the school&apos;s colours.
                </h2>
                <p className="max-w-xl text-lg leading-relaxed text-zinc-400">
                  Guests join an isolated network and land on a splash page built to the school&apos;s brand. Self-hosted
                  fonts and a single static file, so it paints fast on a fresh connection. Access lasts an hour, and guests
                  can reconnect anytime.
                </p>
              </div>
              <Placeholder
                label="SPLASH PAGE ON A PHONE"
                aspect="aspect-[4/5]"
                note="Screenshot of the guest splash page on a phone. Hide the school name if not yet approved."
              />
            </div>
          </div>
        </section>

        {/* Handover */}
        <section aria-labelledby="handover-heading" className="pb-[12vh]">
          <div className="container mx-auto px-6">
            <div className="grid gap-12 lg:grid-cols-2">
              <div>
                <CueLabel index="05" className="mb-6 font-mono text-[11px] tracking-[0.2em] text-zinc-400">
                  HANDOVER
                </CueLabel>
                <h2 id="handover-heading" className="mb-6 text-3xl font-semibold tracking-[-0.03em] md:text-4xl">
                  Documented to touring standard.
                </h2>
                <p className="max-w-xl text-lg leading-relaxed text-zinc-400">
                  The school holds the admin account and the handover pack: rack elevation, IP and VLAN plan, access
                  point map, patch schedule and a runbook. TC monitors it remotely.
                </p>
              </div>
              <Placeholder
                label="BEFORE AND AFTER"
                aspect="aspect-[4/3]"
                note="Photo pair: the old setup next to the finished rack."
              />
            </div>
          </div>
        </section>

        <section className="pb-[12vh]">
          <div className="container mx-auto px-6">
            <Placeholder
              label="DIRECTOR QUOTE"
              note="One or two sentences from the school director, with their name and title only if approved."
            />
          </div>
        </section>

        <section className="pb-[16vh]">
          <div className="container mx-auto px-6">
            <div className="max-w-2xl border-t border-zinc-800 pt-12">
              <CueLabel index="06" className="mb-6 font-mono text-[11px] tracking-[0.2em] text-zinc-400">
                NEXT CUE
              </CueLabel>
              <h2 className="mb-6 text-3xl font-semibold tracking-[-0.03em] text-white md:text-5xl">
                Need the same for your building?
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
