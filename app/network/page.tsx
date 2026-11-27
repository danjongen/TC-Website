import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { BreadcrumbSchema, ServicePageSchema } from "@/components/structured-data"
import { CueLabel } from "@/components/motion/cue-label"
import { Fill, Placeholder } from "@/components/network/placeholder"
import { RenderLabel } from "@/components/v2/render-label"

export const dynamic = "force-static"
export const revalidate = 86400

const TITLE = "Network Installation | UniFi Design, Install and Management"
const DESCRIPTION =
  "UniFi network design, installation and management for offices, schools, studios and venues in Metro Detroit. Show-grade engineering, a full handover pack and one accountable engineer."

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  keywords: [
    "UniFi installer Detroit",
    "Ubiquiti installer Michigan",
    "business Wi-Fi installation Detroit",
    "school network installation Michigan",
    "guest Wi-Fi splash page",
    "managed Wi-Fi small business",
    "event Wi-Fi Detroit",
    "TC Agency",
    "Technically Creative",
  ],
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: "https://www.tc.agency/network",
    siteName: "TC Agency - Technically Creative",
    type: "website",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "TC Agency network installation" }],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: ["/og-image.png"],
  },
  alternates: {
    canonical: "https://www.tc.agency/network",
  },
}

const SURVEY_HREF = "/contact?source=network-survey#contact-form"
const BID_HREF = "/contact?source=network-survey#contact-form"

// Capability statement content. Only facts on record go in `value`; anything
// unconfirmed stays a <Fill> so the page never claims a registration TC lacks.
const competencies = [
  "Network design: gateway, switching, VLANs and firewall rules",
  "Wi-Fi survey, access point placement and tuning",
  "Structured cabling, racks and patching",
  "UniFi Protect cameras, door access and UniFi Talk phones",
  "Remote monitoring and managed support",
]

const differentiators = [
  "One accountable engineer from survey to handover",
  "A drawn design and a fixed quote before work starts",
  "Handover pack with every job: rack elevation, IP plan, AP map, runbook",
  "Engineering standard from show-critical touring networks",
]

const pastPerformance = [
  "Community preschool, Metro Detroit: full UniFi network, Wi-Fi, guest portal and phones",
  "Backstreet Boys at Sphere, Las Vegas: 60 GHz show-control network",
  "Backstreet Boys Homecoming, Düsseldorf: 100Gb production backbone",
]

const companyData: { label: string; value?: string; fill?: string }[] = [
  { label: "LEGAL NAME", value: "Technically Creative L.L.C." },
  { label: "UEI", value: "C7ASAEBBP3N6" },
  { label: "SAM.GOV", fill: "STATUS ONCE ACTIVE" },
  { label: "CAGE CODE", fill: "PENDING DLA ASSIGNMENT" },
  { label: "NAICS", fill: "CODES AS REGISTERED IN SAM" },
  { label: "E-RATE SPIN", fill: "USAC SPIN, IF ISSUED" },
  { label: "INSURANCE", fill: "GL / AUTO / WC LIMITS PER COI" },
  { label: "BUSINESS TYPE", fill: "E.G. SMALL BUSINESS, AS SELF-CERTIFIED" },
]


const audiences = [
  { label: "OFFICES", desc: "Fast, segmented Wi-Fi and wired networks for teams of five to fifty." },
  { label: "SCHOOLS", desc: "Classroom coverage, staff and guest separation, phones on the same system." },
  { label: "STUDIOS", desc: "Low-latency wired backbones for edit bays, audio rooms and render boxes." },
  { label: "VENUES", desc: "Guest Wi-Fi that holds under crowd load, with a branded front door." },
]

const tiers = [
  {
    code: "SITE_SURVEY",
    title: "Site survey",
    desc: "A paid walk-through of the building. RF survey, existing network audit and a written findings report with a recommended design.",
    fits: "Every new site starts here.",
  },
  {
    code: "DESIGN_AND_BUILD",
    title: "Design and build",
    desc: "UniFi gateway, switching, access points, and cameras or phones where scoped. Cabling, terminations and testing. Delivered with the full handover pack.",
    fits: "Offices, schools, studios, venues.",
  },
  {
    code: "GUEST_WI-FI",
    title: "Guest Wi-Fi",
    desc: "An isolated guest network with a splash page built to your brand. Loads fast on a fresh connection and limits each guest's bandwidth.",
    fits: "Cafes, clinics, venues, schools, events.",
  },
  {
    code: "MANAGED",
    title: "Managed network",
    desc: "One flat monthly fee. Remote monitoring through UniFi Site Manager, planned firmware updates and a monthly health note.",
    fits: "Every install after handover.",
  },
]

const handover = [
  { item: "RACK ELEVATION", desc: "What is in the rack, where, and what it connects to." },
  { item: "IP AND VLAN PLAN", desc: "Every network, its purpose and its address range." },
  { item: "AP COVERAGE MAP", desc: "Access point positions against the floor plan." },
  { item: "PATCH SCHEDULE", desc: "Every labelled port mapped to the room it serves." },
  { item: "RUNBOOK", desc: "Logins held by you, restart order, who to call." },
]

const process = [
  { step: "01", title: "SURVEY", desc: "Walk the site, measure, find what is wrong today." },
  { step: "02", title: "DESIGN", desc: "A drawn design and a fixed quote before any hardware is ordered." },
  { step: "03", title: "INSTALL", desc: "Cabling, mounting and configuration, tested before handover." },
  { step: "04", title: "HANDOVER", desc: "The pack, a walkthrough, and admin access in your name." },
  { step: "05", title: "MANAGE", desc: "Monitored remotely, patched on schedule, reported monthly." },
]

const faqs = [
  {
    q: "Why UniFi?",
    a: "One controller for Wi-Fi, switching, cameras and phones, no per-device licence fees, and hardware that holds up. It is the same platform used on touring production racks.",
  },
  {
    q: "Who owns the equipment?",
    a: "You do. Hardware is supplied as part of the install and the admin account is set up in your name at handover.",
  },
  {
    q: "What happens when something breaks?",
    a: "On the managed plan, most faults are seen and fixed remotely, often before you notice. On-site call-outs are booked and billed separately.",
  },
  {
    q: "Do you run the cabling?",
    a: "Yes. Structured cabling, terminations and testing are scoped as part of design and build, and every run is labelled and documented.",
  },
  {
    q: "Do you take public and E-Rate work?",
    a: "Yes. We bid school E-Rate Category 2 work and public RFPs for Wi-Fi, cabling and switching. Vendor details for evaluators are in the capability statement above.",
  },
  {
    q: "Where do you work?",
    a: "Installs across Metro Detroit. Event and touring networks wherever the show goes.",
  },
]

function RenderFigure({
  src,
  width,
  height,
  alt,
  caption,
  sizes,
  priority,
}: {
  src: string
  width: number
  height: number
  alt: string
  caption: string
  sizes: string
  priority?: boolean
}) {
  return (
    <figure data-reveal="fade">
      <Image src={src} width={width} height={height} alt={alt} sizes={sizes} priority={priority} className="block h-auto w-full border border-zinc-800" />
      <figcaption className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 font-mono text-[11px] tracking-[0.2em] text-zinc-400">
        <RenderLabel />
        <span>{caption}</span>
      </figcaption>
    </figure>
  )
}

/**
 * Reference photography for the network section. None of these are shown as TC installs:
 * every caption carries ILLUSTRATIVE until project ownership and rights are confirmed.
 */
function PhotoCaption({ caption, credit }: { caption: string; credit?: { name: string; href: string } }) {
  return (
    <figcaption className="flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-zinc-800 px-4 py-3 font-mono text-[11px] tracking-[0.2em] text-zinc-400">
      <span className="inline-block border border-zinc-700 px-2 py-1 text-[10px] leading-none tracking-[0.25em] text-zinc-300">
        ILLUSTRATIVE
      </span>
      <span>{caption}</span>
      {credit && (
        <a href={credit.href} target="_blank" rel="noopener noreferrer" className="text-zinc-500 hover:text-white">
          PHOTO: {credit.name.toUpperCase()}
        </a>
      )}
    </figcaption>
  )
}

function PhotoFigure({
  src,
  width,
  height,
  alt,
  caption,
  credit,
  context,
}: {
  src: string
  width: number
  height: number
  alt: string
  caption: string
  credit?: { name: string; href: string }
  /** Show the whole frame (no crop) inside a fixed-height cool panel. */
  context?: boolean
}) {
  return (
    <figure data-reveal="fade" className="self-start border border-zinc-800 bg-[#121923]">
      <div className={context ? "flex items-center justify-center bg-[#0b1017]" : ""}>
        <Image
          src={src}
          width={width}
          height={height}
          alt={alt}
          sizes="(min-width: 768px) 50vw, calc(100vw - 48px)"
          className={`block h-auto [filter:brightness(1.1)_contrast(1.035)_saturate(.83)] ${
            context ? "max-h-[460px] w-auto max-w-full object-contain" : "w-full"
          }`}
        />
      </div>
      <PhotoCaption caption={caption} credit={credit} />
    </figure>
  )
}

export default function NetworkPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "https://www.tc.agency" },
          { name: "Network", url: "https://www.tc.agency/network" },
        ]}
      />
      <ServicePageSchema
        name="Network Installation and Management"
        description={DESCRIPTION}
        url="https://www.tc.agency/network"
      />

      <Navbar />

      <main id="main-content" className="pt-40 md:pt-48">
        {/* Hero */}
        <section className="pb-[12vh]">
          <div className="container mx-auto px-6">
            <div className="grid overflow-hidden border border-zinc-800 bg-[#0b1017] lg:grid-cols-2">
              <div className="flex flex-col justify-center p-6 md:p-12 lg:p-16">
                <CueLabel className="mb-6 font-mono text-[11px] tracking-[0.2em] text-zinc-400">NETWORK</CueLabel>
                <h1
                  data-vt="title"
                  data-reveal="rise"
                  className="w-fit mb-8 max-w-3xl text-5xl font-semibold tracking-[-0.03em] text-white md:text-7xl"
                >
                  Networks built to show standard.
                </h1>
                <p data-reveal="fade" className="mb-10 max-w-xl text-lg leading-relaxed text-zinc-400 md:text-xl">
                  UniFi design, install and management for offices, schools, studios and venues across Metro Detroit.
                  From the team that builds show-critical systems for the Backstreet Boys at Sphere and in stadiums.
                </p>
                <Link
                  href={SURVEY_HREF}
                  className="inline-block w-fit bg-white px-6 py-4 font-mono text-xs tracking-[0.2em] text-black transition-opacity duration-300 ease-expo hover:opacity-80"
                >
                  BOOK_A_SITE_SURVEY
                </Link>
              </div>
              <figure className="flex flex-col bg-[#060a10]">
                <div className="flex flex-1 items-center justify-center">
                  <Image
                    src="/images/network/photo-02-full-rack.jpg"
                    width={1508}
                    height={2048}
                    alt="A complete network rack, from the top rails down to the battery backup at the bottom."
                    sizes="(min-width: 1024px) 50vw, calc(100vw - 48px)"
                    priority
                    className="block h-auto max-h-[440px] w-auto max-w-full object-contain lg:max-h-[620px] [filter:brightness(1.13)_contrast(1.04)_saturate(.93)]"
                  />
                </div>
                <PhotoCaption caption="FULL RACK" />
              </figure>
            </div>

            <div className="mt-6 grid gap-6 md:grid-cols-2">
              <PhotoFigure
                src="/images/network/photo-08-wall-rack.jpg"
                width={1075}
                height={1463}
                alt="A small wall-mounted network rack fixed between timber studs, with cabling running in beside it."
                caption="WALL RACK / IN CONTEXT"
                context
              />
              <PhotoFigure
                src="/images/network/photo-01-port-macro.jpg"
                width={2048}
                height={1365}
                alt="Close-up of white Ethernet plugs seated in switch ports, one blue link light lit."
                caption="DETAIL / PORTS"
                context
              />
              <PhotoFigure
                src="/images/network/photo-03-fiber-pexels.jpg"
                width={2048}
                height={1362}
                alt="Aqua fibre patch cables routed into a patch panel."
                caption="DETAIL / FIBRE"
                credit={{ name: "Brett Sayles / Pexels", href: "https://www.pexels.com/photo/plastic-connectors-in-electronic-switch-on-server-4657256/" }}
              />
            </div>
          </div>
        </section>

        {/* Who it's for */}
        <section aria-labelledby="audience-heading" className="pb-[14vh]">
          <div className="container mx-auto px-6">
            <CueLabel index="01" className="mb-6 font-mono text-[11px] tracking-[0.2em] text-zinc-400">
              WHO_IT&apos;S_FOR
            </CueLabel>
            <h2 id="audience-heading" className="mb-10 max-w-2xl text-3xl font-semibold tracking-[-0.03em] md:text-5xl">
              Small sites that can&apos;t go down.
            </h2>
            <div className="grid border-l border-t border-zinc-800 sm:grid-cols-2 lg:grid-cols-4">
              {audiences.map((a) => (
                <article key={a.label} data-reveal="fade" className="border-b border-r border-zinc-800 p-8">
                  <p className="mb-4 font-mono text-[11px] tracking-[0.2em] text-zinc-500">[ {a.label} ]</p>
                  <p className="text-base leading-relaxed text-zinc-300">{a.desc}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Services */}
        <section aria-labelledby="services-heading" className="pb-[14vh]">
          <div className="container mx-auto px-6">
            <CueLabel index="02" className="mb-6 font-mono text-[11px] tracking-[0.2em] text-zinc-400">
              SERVICES
            </CueLabel>
            <h2 id="services-heading" className="mb-4 max-w-2xl text-3xl font-semibold tracking-[-0.03em] md:text-5xl">
              Four ways in.
            </h2>
            <p data-reveal="fade" className="mb-10 max-w-2xl text-lg leading-relaxed text-zinc-400">
              Every job is quoted after the survey, against a drawn design. No surprise line items.
            </p>
            <div className="grid border-l border-t border-zinc-800 md:grid-cols-2">
              {tiers.map((t) => (
                <article key={t.code} data-reveal="fade" className="min-h-64 border-b border-r border-zinc-800 p-8 md:p-10">
                  <p className="mb-6 font-mono text-[11px] tracking-[0.2em] text-zinc-300">{t.code}</p>
                  <h3 className="mb-4 text-2xl font-semibold tracking-[-0.02em] md:text-3xl">{t.title}</h3>
                  <p className="mb-6 max-w-xl text-base leading-relaxed text-zinc-400">{t.desc}</p>
                  <p className="font-mono text-[11px] tracking-[0.16em] text-zinc-500">FITS / {t.fits.toUpperCase()}</p>
                </article>
              ))}
            </div>
            <p data-reveal="fade" className="mt-8 max-w-2xl text-base leading-relaxed text-zinc-500">
              Running an event, not a building?{" "}
              <Link href="/services/system-integration" className="text-zinc-300 underline-offset-4 hover:underline">
                Production networks
              </Link>{" "}
              are covered under system integration.
            </p>
          </div>
        </section>

        {/* Handover pack */}
        <section aria-labelledby="handover-heading" className="pb-[14vh]">
          <div className="container mx-auto px-6">
            <CueLabel index="03" className="mb-6 font-mono text-[11px] tracking-[0.2em] text-zinc-400">
              THE_HANDOVER_PACK
            </CueLabel>
            <div className="grid gap-12 lg:grid-cols-2">
              <div>
                <h2 id="handover-heading" className="mb-6 max-w-xl text-3xl font-semibold tracking-[-0.03em] md:text-5xl">
                  Every install ships with the drawings.
                </h2>
                <p data-reveal="fade" className="mb-10 max-w-xl text-lg leading-relaxed text-zinc-400">
                  The same documentation standard a touring rack gets. If we are unavailable, any competent engineer
                  can pick it up from the pack.
                </p>
                <ul className="border-t border-zinc-800">
                  {handover.map((h) => (
                    <li key={h.item} data-reveal="fade" className="flex flex-col gap-1 border-b border-zinc-800 py-5 md:flex-row md:gap-8">
                      <span className="w-48 shrink-0 font-mono text-[11px] tracking-[0.2em] text-zinc-300">{h.item}</span>
                      <span className="text-base text-zinc-400">{h.desc}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <RenderFigure
                src="/images/network/render-patch-macro.jpg"
                width={1448}
                height={1086}
                alt="Close-up of labelled blue patch cables terminated in a neat row, one switch port's green link light in focus."
                caption="PATCH / EVERY PORT LABELLED"
                sizes="(min-width: 1024px) 50vw, calc(100vw - 48px)"
              />
            </div>
            <div className="mt-12">
              <Placeholder
                label="HANDOVER PACK SAMPLE"
                note="A redacted page from a real handover pack: rack elevation or IP plan, client name and addresses blurred."
              />
            </div>
          </div>
        </section>

        {/* Proof */}
        <section aria-labelledby="proof-heading" className="pb-[14vh]">
          <div className="container mx-auto px-6">
            <CueLabel index="04" className="mb-6 font-mono text-[11px] tracking-[0.2em] text-zinc-400">
              PROOF
            </CueLabel>
            <h2 id="proof-heading" className="mb-10 max-w-2xl text-3xl font-semibold tracking-[-0.03em] md:text-5xl">
              From preschool to Sphere.
            </h2>
            <div className="grid border-l border-t border-zinc-800 md:grid-cols-2">
              <Link
                href="/network/preschool"
                data-reveal="fade"
                className="group block border-b border-r border-zinc-800 p-8 transition-colors duration-300 ease-expo hover:bg-zinc-950 md:p-10"
              >
                <p className="mb-6 font-mono text-[11px] tracking-[0.2em] text-zinc-500">[ CASE 01 / PERMANENT INSTALL ]</p>
                <h3 className="mb-4 text-2xl font-semibold tracking-[-0.02em] md:text-3xl">Community preschool network</h3>
                <p className="mb-8 max-w-xl text-base leading-relaxed text-zinc-400">
                  UniFi network, classroom Wi-Fi, a branded guest network and UniFi Talk phones, donated and installed
                  by TC.
                </p>
                <span className="font-mono text-xs tracking-[0.2em] text-zinc-400 group-hover:text-[#00D26A]">READ THE CASE →</span>
              </Link>
              <Link
                href="/network/touring"
                data-reveal="fade"
                className="group block border-b border-r border-zinc-800 p-8 transition-colors duration-300 ease-expo hover:bg-zinc-950 md:p-10"
              >
                <p className="mb-6 font-mono text-[11px] tracking-[0.2em] text-zinc-500">[ CREDITS / TOURING ]</p>
                <h3 className="mb-4 text-2xl font-semibold tracking-[-0.02em] md:text-3xl">Show-critical networks</h3>
                <p className="mb-8 max-w-xl text-base leading-relaxed text-zinc-400">
                  Backstreet Boys at Sphere, Las Vegas, and the Homecoming stadium shows in Düsseldorf.
                </p>
                <span className="font-mono text-xs tracking-[0.2em] text-zinc-400 group-hover:text-[#00D26A]">SEE THE WORK →</span>
              </Link>
            </div>
            <div className="mt-8">
              <Placeholder
                label="CLIENT QUOTE"
                note="One or two sentences from the preschool director, with their OK to use name and title."
              />
            </div>
          </div>
        </section>

        {/* Capability statement: what public-sector and E-Rate evaluators check */}
        <section id="capability" aria-labelledby="capability-heading" className="scroll-mt-32 pb-[14vh]">
          <div className="container mx-auto px-6">
            <CueLabel index="05" className="mb-6 font-mono text-[11px] tracking-[0.2em] text-zinc-400">
              CAPABILITY_STATEMENT
            </CueLabel>
            <div className="mb-10 grid gap-6 lg:grid-cols-2">
              <h2 id="capability-heading" className="max-w-xl text-3xl font-semibold tracking-[-0.03em] md:text-5xl">
                For public bids and E-Rate.
              </h2>
              <p data-reveal="fade" className="max-w-xl text-lg leading-relaxed text-zinc-400">
                Company data for school, municipal and federal evaluators: what we do, how we differ, where we have done
                it and how to register us as a vendor.
              </p>
            </div>

            <div className="grid border-l border-t border-zinc-800 lg:grid-cols-3">
              <div className="border-b border-r border-zinc-800 p-8">
                <p className="mb-6 font-mono text-[11px] tracking-[0.2em] text-zinc-300">CORE_COMPETENCIES</p>
                <ul className="space-y-3 text-base leading-relaxed text-zinc-400">
                  {competencies.map((c) => (
                    <li key={c}>{c}</li>
                  ))}
                </ul>
              </div>
              <div className="border-b border-r border-zinc-800 p-8">
                <p className="mb-6 font-mono text-[11px] tracking-[0.2em] text-zinc-300">DIFFERENTIATORS</p>
                <ul className="space-y-3 text-base leading-relaxed text-zinc-400">
                  {differentiators.map((d) => (
                    <li key={d}>{d}</li>
                  ))}
                </ul>
              </div>
              <div className="border-b border-r border-zinc-800 p-8">
                <p className="mb-6 font-mono text-[11px] tracking-[0.2em] text-zinc-300">PAST_PERFORMANCE</p>
                <ul className="space-y-3 text-base leading-relaxed text-zinc-400">
                  {pastPerformance.map((p) => (
                    <li key={p}>{p}</li>
                  ))}
                </ul>
                <div className="mt-6">
                  <Placeholder
                    label="REFERENCES"
                    note="Public bids usually ask for three references with name, title, email and phone. Add only people who have agreed to be listed."
                  />
                </div>
              </div>
            </div>

            <dl className="grid border-l border-zinc-800 sm:grid-cols-2 lg:grid-cols-4">
              {companyData.map((d) => (
                <div key={d.label} className="border-b border-r border-zinc-800 p-6">
                  <dt className="mb-3 font-mono text-[11px] tracking-[0.2em] text-zinc-500">{d.label}</dt>
                  <dd className="text-base text-white">{d.value ?? <Fill>{d.fill ?? "TO CONFIRM"}</Fill>}</dd>
                </div>
              ))}
            </dl>

            <div className="mt-8 grid gap-6 md:grid-cols-2">
              <Placeholder
                label="CAPABILITY STATEMENT PDF"
                note="One-page PDF of this section for bid packs and vendor portals. Build it once the codes, insurance and references above are confirmed."
              />
              <div className="flex flex-col justify-center border border-zinc-800 p-6">
                <p className="mb-4 font-mono text-[11px] tracking-[0.2em] text-zinc-500">CONTACT</p>
                <p className="mb-6 text-base leading-relaxed text-zinc-400">
                  Daniel Jongen, Founder. Bid documents, vendor forms and pre-bid walkthroughs.
                </p>
                <Link
                  href={BID_HREF}
                  className="inline-block w-fit bg-white px-6 py-4 font-mono text-xs tracking-[0.2em] text-black transition-opacity duration-300 ease-expo hover:opacity-80"
                >
                  SEND_BID_DOCUMENTS
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Process */}
        <section aria-labelledby="process-heading" className="pb-[14vh]">
          <div className="container mx-auto px-6">
            <CueLabel index="06" className="mb-6 font-mono text-[11px] tracking-[0.2em] text-zinc-400">
              PROCESS
            </CueLabel>
            <h2 id="process-heading" className="sr-only">
              Process
            </h2>
            <ol className="grid border-l border-t border-zinc-800 md:grid-cols-5">
              {process.map((p) => (
                <li key={p.step} data-reveal="fade" className="border-b border-r border-zinc-800 p-6">
                  <p className="mb-6 font-mono text-[11px] tracking-[0.2em] text-zinc-500">[ {p.step} ]</p>
                  <p className="mb-3 font-mono text-sm tracking-[0.16em] text-white">{p.title}</p>
                  <p className="text-sm leading-relaxed text-zinc-400">{p.desc}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* FAQ */}
        <section aria-labelledby="faq-heading" className="pb-[14vh]">
          <div className="container mx-auto px-6">
            <CueLabel index="07" className="mb-6 font-mono text-[11px] tracking-[0.2em] text-zinc-400">
              FAQ
            </CueLabel>
            <h2 id="faq-heading" className="sr-only">
              Frequently asked questions
            </h2>
            <div className="max-w-3xl border-t border-zinc-800">
              {faqs.map((f) => (
                <details key={f.q} className="group border-b border-zinc-800 py-6">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-6 text-lg font-medium text-white">
                    {f.q}
                    <span className="font-mono text-zinc-500 transition-transform duration-300 group-open:rotate-45" aria-hidden="true">
                      +
                    </span>
                  </summary>
                  <p className="mt-4 max-w-2xl text-base leading-relaxed text-zinc-400">{f.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* Start */}
        <section className="pb-[16vh]">
          <div className="container mx-auto px-6">
            <div className="max-w-2xl border-t border-zinc-800 pt-12">
              <CueLabel index="08" className="mb-6 font-mono text-[11px] tracking-[0.2em] text-zinc-400">
                START
              </CueLabel>
              <h2 className="mb-6 text-3xl font-semibold tracking-[-0.03em] text-white md:text-5xl">
                Start with a site survey.
              </h2>
              <p className="mb-10 max-w-xl text-lg leading-relaxed text-zinc-400">
                Tell us the building, the square footage and what is going wrong today. We respond within 24 hours.
              </p>
              <Link
                href={SURVEY_HREF}
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
