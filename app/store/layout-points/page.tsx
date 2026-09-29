import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"

import { CueLabel } from "@/components/motion/cue-label"
import { getEvidence } from "@/lib/layout-points/evidence"
import { productFacts } from "@/lib/layout-points/product-facts"
import { compatibilityLine, isPublicDownloadEnabled, manifest } from "@/lib/layout-points/release"

import { CueStack, type CueStep } from "./_components/cue-stack"
import { DatumPicker } from "./_components/datum-picker"
import { CalibrationDiagram, LabelStyles, ProcessStrip } from "./_components/diagrams"
import { EvidenceFigure } from "./_components/evidence-figure"
import { FaqList } from "./_components/faq-list"
import { breadcrumbJsonLd, JsonLd, PRODUCT_URL, productJsonLd, softwareJsonLd } from "./_components/json-ld"
import { PrintRun } from "./_components/print-run/print-run"
import { ReleaseListForm } from "./_components/release-list-form"
import { TrackMount, TrackOnView, TrackedLink } from "./_components/track"
import { container, eyebrow, primaryButton, secondaryButton, sectionHeading, textLink } from "./_components/ui"
import { faqJsonLd, getFaqs } from "./_content/faq"

const title = "Layout Points + Datum Label Studio for Vectorworks"
const description =
  "Place and number layout points in Vectorworks, export one verified field package, then review, calibrate and print datum labels locally on your Mac. No upload. No duplicate coordinate entry."

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: PRODUCT_URL },
  openGraph: {
    type: "website",
    url: PRODUCT_URL,
    title: "Layout Points + Datum Label Studio | Technically Creative",
    description,
  },
  twitter: {
    card: "summary_large_image",
    title: "Layout Points + Datum Label Studio | Technically Creative",
    description,
  },
}

const layoutPointsFeatures = [
  "Continuous palette placement",
  "Editable point types and numbering",
  "Live coordinates from supported Vectorworks objects",
  "Explicit Easting, Northing and Elevation conventions",
  "Leica-format CONTROL and POINTS output",
  "Datum Label Studio data export",
  "Atomic field packages",
  "Manifest and SHA-256 validation",
  "Installation, status, rollback and uninstall tools",
]

const studioFeatures = [
  "Native macOS application",
  "Field-package folder and ZIP import",
  "CSV and TSV import",
  "Locked source IDs and coordinates",
  "Department names and colours",
  "Protected CONTROL-label styling",
  "Centre, edge and corner datum targets",
  "Exact-size vector PDF preview and export",
  "Print-run review",
  "Printer, stock and feed-direction calibration",
  "Cut-edge loss and scale checks",
  "Persistent local label edits and printer corrections",
]

const alsoIncluded = [
  ["Quick-start guide", "/store/layout-points/docs#quick-start"],
  ["Sanitised sample field package", "/store/layout-points/docs#sample-package"],
  ["First-job checklist", "/store/layout-points/docs#first-job"],
  ["Printer-calibration guide", "/store/layout-points/docs#calibration"],
  ["Release notes", "/store/layout-points/changelog"],
  ["Checksums", "/store/layout-points/download#verify"],
  ["Known issues", "/store/layout-points/changelog#known-issues"],
  ["Support route", "/store/layout-points/support"],
  ["Update, rollback and uninstall", "/store/layout-points/docs#updating"],
] as const

const qualifications = [
  [
    "SHA-256 checksum",
    "The bytes you downloaded match the bytes we published.",
    "It does not prove who published them. Code signing and notarisation do that for the Mac app.",
  ],
  [
    "Package verified",
    "The manifest, the checksums and the files in the field package agree.",
    "It does not make the package tamper-proof, and it cannot tell you whether the drawing was right.",
  ],
  [
    "Exact-size PDF",
    "The PDF is drawn at the real label size, in vectors.",
    "It does not prove what the printer does with it. Calibrate and measure.",
  ],
  [
    "Physical print",
    "Depends on printer, driver, stock, feed direction, imageable area, calibration and measurement.",
    "Measure one sample label before every production run.",
  ],
  [
    "Cloud folders",
    "Neither product uploads your files.",
    "A Dropbox or iCloud folder is uploaded by that provider. Export somewhere local if that matters.",
  ],
  ["Updates", "You download and install each update yourself.", "There is no automatic updater."],
] as const

export default function LayoutPointsPage() {
  const released = isPublicDownloadEnabled()
  const faqs = getFaqs()
  const appIcon = getEvidence("appIcon")

  const steps: CueStep[] = [
    {
      id: "step-place",
      title: "Place the points",
      component: "Layout Points · Vectorworks",
      body: (
        <p>
          Activate {productFacts.layoutPointTool.value}, configure the point type and numbering once, then place the run
          directly in Vectorworks. Each point carries its live coordinates, so nothing is typed twice.
        </p>
      ),
    },
    {
      id: "step-export",
      title: "Export one field package",
      component: "Layout Points · Vectorworks",
      body: (
        <p>
          {productFacts.exportCommand.value} creates one timestamped job containing{" "}
          {productFacts.fieldPackageContents.value}.
        </p>
      ),
      aside: (
        <div className="border-l-2 border-[#00D26A] pl-5 text-sm leading-relaxed text-zinc-300">
          <p className="font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-[#00D26A]">Package verified</p>
          <p className="mt-3">
            Means the manifest, the checksums and the files agree. Nothing is missing, truncated or changed since
            export.
          </p>
        </div>
      ),
    },
    {
      id: "step-review",
      title: "Review in Datum Label Studio",
      component: "Datum Label Studio · Mac",
      body: (
        <p>
          Open or drop the complete field package into Datum Label Studio. Review IDs and coordinates, map departments,
          choose the label stock, and select the exact physical placement point.
        </p>
      ),
      aside: <EvidenceFigure id="workspace" />,
    },
    {
      id: "step-calibrate",
      title: "Calibrate and print",
      component: "Datum Label Studio · Printer",
      body: (
        <>
          <p>
            Print the calibration target for the selected printer and stock. Enter the four measured frame gaps and two
            ruler lengths. Print the calculated correction and confirm the physical result.
          </p>
          <p className="mt-4 text-sm text-zinc-400">
            Exact-size PDF output does not by itself prove the physical result. Every printer and stock combination is
            calibrated and measured.
          </p>
        </>
      ),
      aside: (
        <div className="grid gap-4">
          <CalibrationDiagram />
          <EvidenceFigure id="calibration" />
        </div>
      ),
    },
    {
      id: "step-place-label",
      title: "Place the label",
      component: "Field",
      body: (
        <p>
          Put the highlighted exact datum directly over the surveyed position. Choose the centre, an edge or a corner
          according to the physical installation.
        </p>
      ),
      aside: <DatumPicker />,
    },
  ]

  return (
    <>
      <JsonLd
        data={[
          breadcrumbJsonLd([]),
          softwareJsonLd("layout-points"),
          softwareJsonLd("datum-label-studio"),
          productJsonLd(),
          faqJsonLd(faqs),
        ]}
      />
      <TrackMount event="lp_view_product" />

      {/* 1. First viewport */}
      <section className={`${container} pb-12 pt-10 md:pb-16 md:pt-12`} aria-labelledby="lp-title">
        <div className="grid grid-cols-1 items-end gap-12 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)]">
          <div>
            <h1 id="lp-title" data-vt="title" data-reveal="rise" className="w-fit">
              <span className="block font-mono text-xs font-bold uppercase tracking-[0.25em] text-[#00D26A]">
                Layout Points + Datum Label Studio
              </span>
              <span className="mt-6 block max-w-[17ch] text-5xl font-semibold leading-[0.92] tracking-[-0.055em] text-balance sm:text-6xl md:text-7xl 2xl:text-8xl">
                From Vectorworks datum to physical datum.
              </span>
            </h1>
            <p data-reveal="fade" className="mt-7 max-w-2xl text-lg leading-relaxed text-zinc-300 md:text-xl">
              Layout Points keeps drawing coordinates, field files and printed labels connected. Place points in
              Vectorworks, export once, then review, calibrate and print locally on your Mac.
            </p>
          </div>

          <div data-reveal="fade" className="border border-zinc-800 bg-zinc-900/40 p-6 md:p-8">
            <p
              className={`font-mono text-xs uppercase tracking-[0.2em] ${released ? "text-[#00D26A]" : "text-amber-300"}`}
            >
              {released
                ? `Mac workflow · ${manifest.publication.releaseLabel ?? "Available"}`
                : "Paid beta in preparation"}
            </p>
            <p className="mt-5 text-xl font-semibold tracking-[-0.03em]">
              {released
                ? "Two components, one field package."
                : "The paid beta opens when signed, notarised builds pass release testing."}
            </p>
            <p className="mt-3 leading-relaxed text-zinc-400">
              No upload. No duplicate coordinate entry. Built for production teams working offline.
            </p>
            <div className="mt-8 grid gap-4">
              {released ? (
                <TrackedLink
                  href="/store/layout-points/download"
                  event="lp_open_install_guide"
                  className={primaryButton}
                >
                  Get the Mac workflow
                </TrackedLink>
              ) : (
                <a href="#release-list" className={primaryButton}>
                  Join the release list
                </a>
              )}
              <a href="#workflow" className={secondaryButton}>
                See the workflow
              </a>
            </div>
            <p className="mt-6 border-t border-zinc-800 pt-5 font-mono text-[11px] uppercase leading-relaxed tracking-[0.14em] text-zinc-400">
              {compatibilityLine().join(" · ")}
            </p>
          </div>
        </div>

        <div className="mt-10 md:mt-12">
          <PrintRun />
        </div>
        <div className="mt-10">
          <ProcessStrip />
        </div>
      </section>

      {/* 2. Five-step workflow */}
      <section id="workflow" className="scroll-mt-24 border-t border-zinc-800" aria-labelledby="workflow-heading">
        <TrackOnView event="lp_view_workflow" className={`${container} py-16 md:py-24`}>
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-end">
            <div>
              <CueLabel index="01" className={eyebrow}>
                WORKFLOW
              </CueLabel>
              <h2 id="workflow-heading" data-reveal="rise" className={`${sectionHeading} max-w-[13ch]`}>
                Five cues from drawing to floor.
              </h2>
            </div>
            <p data-reveal="fade" className="max-w-2xl leading-relaxed text-zinc-400">
              Two separately installed components, joined by one local field package. The coordinates you placed in
              Vectorworks are the coordinates on the label, with nothing retyped in between.
            </p>
          </div>
          <div className="mt-12 md:mt-16">
            <CueStack steps={steps} />
          </div>
        </TrackOnView>
      </section>

      {/* 3. What is included */}
      <section
        id="included"
        className="scroll-mt-24 border-t border-zinc-800 bg-zinc-950"
        aria-labelledby="included-heading"
      >
        <div className={`${container} py-16 md:py-24`}>
          <CueLabel index="02" className={eyebrow}>
            WHAT IS INCLUDED
          </CueLabel>
          <h2 id="included-heading" data-reveal="rise" className={`${sectionHeading} max-w-[16ch]`}>
            Two components. One field package.
          </h2>
          <p data-reveal="fade" className="mt-6 max-w-2xl leading-relaxed text-zinc-400">
            You need both for the complete Vectorworks-to-label workflow. They install separately and exchange one local
            field package.
          </p>

          <div className="mt-12 grid grid-cols-1 gap-px border border-zinc-800 bg-zinc-800 lg:grid-cols-2">
            <article className="bg-black p-7 md:p-10">
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-zinc-400">
                {manifest.components["layout-points"].kind}
              </p>
              <h3 className="mt-6 text-3xl font-semibold tracking-[-0.04em] md:text-4xl">
                {manifest.components["layout-points"].name}
              </h3>
              <p className="mt-4 text-zinc-400">Creates, numbers, validates, manages and exports layout points.</p>
              <ul className="mt-8 divide-y divide-zinc-800 border-y border-zinc-800 text-sm text-zinc-200">
                {layoutPointsFeatures.map((item) => (
                  <li key={item} data-reveal="fade" className="py-3.5">
                    {item}
                  </li>
                ))}
              </ul>
            </article>
            <article className="bg-black p-7 md:p-10">
              <div className="flex items-start justify-between gap-6">
                <p className="font-mono text-xs uppercase tracking-[0.2em] text-zinc-400">
                  {manifest.components["datum-label-studio"].kind}
                </p>
                {appIcon && <Image src={appIcon.src} alt={appIcon.alt} width={56} height={56} className="size-14" />}
              </div>
              <h3 className="mt-6 text-3xl font-semibold tracking-[-0.04em] md:text-4xl">
                {manifest.components["datum-label-studio"].name}
              </h3>
              <p className="mt-4 text-zinc-400">
                Opens the field package, prepares labels, selects exact placement points, calibrates the printer and
                produces exact-size PDF or printed output.
              </p>
              <ul className="mt-8 divide-y divide-zinc-800 border-y border-zinc-800 text-sm text-zinc-200">
                {studioFeatures.map((item) => (
                  <li key={item} data-reveal="fade" className="py-3.5">
                    {item}
                  </li>
                ))}
              </ul>
            </article>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:items-start">
            <div>
              <h3 className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-white">Also included</h3>
              <ul className="mt-5 grid grid-cols-1 border-t border-zinc-800 sm:grid-cols-2">
                {alsoIncluded.map(([label, href]) => (
                  <li key={label} className="border-b border-zinc-800">
                    <Link
                      href={href}
                      className="flex min-h-12 items-center justify-between gap-4 py-3 pr-4 text-sm text-zinc-200 transition-colors duration-300 ease-expo hover:text-[#00D26A] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#00D26A]"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <LabelStyles />
          </div>
        </div>
      </section>

      {/* 4. What the checks prove */}
      <section id="checks" className="scroll-mt-24 border-t border-zinc-800" aria-labelledby="checks-heading">
        <div
          className={`${container} grid grid-cols-1 gap-12 py-16 md:py-24 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)]`}
        >
          <div>
            <CueLabel index="03" className={eyebrow}>
              WHAT THE CHECKS PROVE
            </CueLabel>
            <h2 id="checks-heading" data-reveal="rise" className={`${sectionHeading} max-w-[12ch]`}>
              Know what each check means.
            </h2>
            <p data-reveal="fade" className="mt-6 max-w-md leading-relaxed text-zinc-400">
              Every check proves something specific. None of them replaces measuring the label in your hand.
            </p>
          </div>
          <dl className="border-t border-zinc-800">
            {qualifications.map(([name, proves, limit]) => (
              <div
                key={name}
                data-reveal="fade"
                className="grid grid-cols-1 gap-2 border-b border-zinc-800 py-6 md:grid-cols-[11rem_minmax(0,1fr)] md:gap-8"
              >
                <dt className="font-mono text-xs font-bold uppercase tracking-[0.18em] text-[#00D26A]">{name}</dt>
                <dd className="leading-relaxed text-zinc-200">
                  {proves} <span className="text-zinc-400">{limit}</span>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* 5. Privacy */}
      <section
        id="privacy"
        className="scroll-mt-24 border-t border-zinc-800 bg-zinc-950"
        aria-labelledby="privacy-heading"
      >
        <div className={`${container} grid grid-cols-1 gap-12 py-16 md:py-24 lg:grid-cols-2`}>
          <div>
            <CueLabel index="04" className={eyebrow}>
              LOCAL BY DESIGN
            </CueLabel>
            <h2 id="privacy-heading" data-reveal="rise" className={`${sectionHeading} max-w-[12ch]`}>
              Your project stays on your Mac.
            </h2>
          </div>
          <div data-reveal="fade" className="space-y-5 leading-relaxed text-zinc-300">
            <p>
              Layout Points and Datum Label Studio work locally. They do not upload drawings, coordinates or field
              packages, and they contain no product telemetry.
            </p>
            <p>
              Datum Label Studio keeps your label edits, departments, printer identity and calibration records on that
              Mac, so you can back them up or remove them yourself.
            </p>
            <p className="text-zinc-400">
              This website is separate: analytics load only if you accept cookies, and anything you send through the
              release list or support form is handled under the{" "}
              <Link href="/privacy-policy" className={textLink}>
                privacy policy
              </Link>
              .
            </p>
            <p>
              <Link href="/store/layout-points/docs#privacy" className={textLink}>
                Privacy and local data in the docs
              </Link>
            </p>
          </div>
        </div>
      </section>

      {/* 6. Availability */}
      <section
        id="release-list"
        className="scroll-mt-24 border-t border-zinc-800"
        aria-labelledby="availability-heading"
      >
        <div
          className={`${container} grid grid-cols-1 gap-12 py-16 md:py-24 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)]`}
        >
          <div>
            <CueLabel index="05" className={eyebrow}>
              {released ? "GET THE WORKFLOW" : "RELEASE LIST"}
            </CueLabel>
            <h2 id="availability-heading" data-reveal="rise" className={`${sectionHeading} max-w-[12ch]`}>
              {released ? "Get the Mac workflow." : "Be first on the floor."}
            </h2>
            <p data-reveal="fade" className="mt-6 max-w-md leading-relaxed text-zinc-400">
              {released
                ? "Download both components, check the checksums, and run your first field package with the sample job."
                : "The paid beta opens when both components are signed, notarised and have passed host and physical print testing. Join the list and we will email you once, when it opens."}
            </p>
            <p className="mt-6 font-mono text-[11px] uppercase leading-relaxed tracking-[0.14em] text-zinc-400">
              {compatibilityLine().join(" · ")}
            </p>
          </div>
          <div data-reveal="fade">
            {released ? (
              <div className="grid gap-4">
                <TrackedLink
                  href="/store/layout-points/download"
                  event="lp_open_install_guide"
                  className={primaryButton}
                >
                  Get the Mac workflow
                </TrackedLink>
                <Link href="/store/layout-points/docs#quick-start" className={secondaryButton}>
                  Five-minute quick start
                </Link>
              </div>
            ) : (
              <div className="border border-zinc-800 bg-black p-7 md:p-9">
                <ReleaseListForm />
              </div>
            )}
          </div>
        </div>
      </section>

      {/* 7. FAQ */}
      <section id="faq" className="scroll-mt-24 border-t border-zinc-800 bg-zinc-950" aria-labelledby="faq-heading">
        <div
          className={`${container} grid grid-cols-1 gap-12 py-16 md:py-24 lg:grid-cols-[minmax(0,0.6fr)_minmax(0,1.4fr)]`}
        >
          <div>
            <CueLabel index="06" className={eyebrow}>
              FAQ
            </CueLabel>
            <h2 id="faq-heading" data-reveal="rise" className={`${sectionHeading} max-w-[10ch]`}>
              Straight answers.
            </h2>
            <p data-reveal="fade" className="mt-6 max-w-sm leading-relaxed text-zinc-400">
              Something missing?{" "}
              <Link href="/store/layout-points/support" className={textLink}>
                Ask support
              </Link>
              .
            </p>
          </div>
          <FaqList faqs={faqs} />
        </div>
      </section>

      <section className="border-t border-zinc-800">
        <div className={`${container} py-12 md:py-16`}>
          <p className="max-w-5xl text-sm leading-relaxed text-zinc-400">
            Layout Points and Datum Label Studio prepare layout data and labels from your drawing. They do not replace
            survey control, a qualified surveyor or checking a known distance on site. Vectorworks is a trademark of
            Vectorworks, Inc. Leica and iCON are trademarks of Leica Geosystems AG. Technically Creative LLC is not
            affiliated with, endorsed or certified by either company.
          </p>
        </div>
      </section>
    </>
  )
}
