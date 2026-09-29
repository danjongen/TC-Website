import type { Metadata } from "next"
import Link from "next/link"
import { Suspense, type ReactNode } from "react"

import { CueLabel } from "@/components/motion/cue-label"
import { productFacts } from "@/lib/layout-points/product-facts"
import {
  architectureLabel,
  currentRelease,
  downloadAccess,
  formatBytes,
  isPublicDownloadEnabled,
  manifest,
  notarisationLabel,
  signatureLabel,
  type ComponentId,
  type Release,
} from "@/lib/layout-points/release"

import { ChecksumValue, DownloadButton, DownloadErrorNotice } from "../_components/download-bits"
import { breadcrumbJsonLd, JsonLd } from "../_components/json-ld"
import { subPageMetadata } from "../_components/meta"
import { ReleaseListForm } from "../_components/release-list-form"
import { TrackedLink } from "../_components/track"
import { container, eyebrow, primaryButton, sectionHeading, textLink } from "../_components/ui"

const description =
  "Download Layout Points for Vectorworks and Datum Label Studio for macOS. Versions, release dates, compatibility, file sizes, SHA-256 checksums and signing status from one release manifest."

export const metadata: Metadata = subPageMetadata({
  title: "Download Layout Points + Datum Label Studio",
  description,
  path: "/download",
})

const PENDING = "Published at release"

function Row({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="grid grid-cols-1 gap-1 border-b border-zinc-800 py-4 sm:grid-cols-[11rem_minmax(0,1fr)] sm:gap-6">
      <dt className="font-mono text-[11px] uppercase tracking-[0.16em] text-zinc-400">{label}</dt>
      <dd className="min-w-0 text-zinc-100">{children}</dd>
    </div>
  )
}

function Pending() {
  return <span className="text-zinc-400">{PENDING}</span>
}

function DocLink({ href, children, event }: { href: string; children: ReactNode; event?: "lp_open_install_guide" }) {
  const className =
    "flex min-h-12 items-center justify-between border-b border-zinc-800 py-3 text-sm text-zinc-200 transition-colors duration-300 ease-expo hover:text-[#00D26A] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#00D26A]"
  return event ? (
    <TrackedLink href={href} event={event} className={className}>
      {children}
    </TrackedLink>
  ) : (
    <Link href={href} className={className}>
      {children}
    </Link>
  )
}

function Panel({ id }: { id: ComponentId }) {
  const component = manifest.components[id]
  const release: Release | null = currentRelease(id)
  const access = downloadAccess()
  const isStudio = id === "datum-label-studio"

  return (
    <article className="flex flex-col bg-black p-7 md:p-10" aria-labelledby={`${id}-heading`}>
      <p className="font-mono text-xs uppercase tracking-[0.2em] text-zinc-400">{component.kind}</p>
      <h2 id={`${id}-heading`} className="mt-6 text-3xl font-semibold tracking-[-0.04em] md:text-4xl">
        {component.name}
      </h2>

      <dl className="mt-8 border-t border-zinc-800">
        <Row label="Current version">{release ? release.version : <Pending />}</Row>
        <Row label="Release date">{release ? release.releaseDate : <Pending />}</Row>
        {isStudio ? (
          <>
            <Row label="Minimum macOS">
              macOS {release?.macosRequirement ?? manifest.platform.minimumMacos} or later
            </Row>
            <Row label="Mac architecture">
              {release
                ? release.architecture === "universal"
                  ? "Universal (Apple silicon and Intel)"
                  : "Apple silicon only"
                : `${architectureLabel()} only`}
            </Row>
          </>
        ) : (
          <Row label="Verified Vectorworks">
            {release && release.vectorworksVersions.length > 0 ? (
              release.vectorworksVersions.join(", ")
            ) : (
              <span className="text-zinc-400">Listed only after each version passes the acceptance matrix</span>
            )}
          </Row>
        )}
        <Row label="Download size">{release ? formatBytes(release.sizeBytes) : <Pending />}</Row>
        <Row label={isStudio ? "Signature" : "Installer signature"}>
          {release ? signatureLabel(release.signature) : <Pending />}
        </Row>
        <Row label="Notarisation">{release ? notarisationLabel(release.notarisation) : <Pending />}</Row>
        <Row label="SHA-256">
          {release ? <ChecksumValue value={release.sha256} component={id} version={release.version} /> : <Pending />}
        </Row>
      </dl>

      <div className="mt-8">
        {release && access === "public" ? (
          <DownloadButton
            href={release.url}
            filename={release.filename}
            component={id}
            version={release.version}
            label={isStudio ? "Download for Mac" : "Download installer"}
            className={primaryButton}
          />
        ) : release && access === "purchase" ? (
          <p className="border border-zinc-700 px-6 py-5 text-sm leading-relaxed text-zinc-300">
            Included with the paid beta. Your private download link and licence arrive by email after purchase.
          </p>
        ) : (
          <p className="border border-dashed border-zinc-700 px-6 py-5 font-mono text-xs font-bold uppercase tracking-[0.18em] text-zinc-400">
            Not yet available
          </p>
        )}
        {release?.advancedZip && access === "public" && (
          <p className="mt-4 text-sm text-zinc-400">
            Advanced:{" "}
            <DownloadButton
              href={release.advancedZip.url}
              filename={release.advancedZip.filename}
              component={id}
              version={release.version}
              label={`ZIP (${formatBytes(release.advancedZip.sizeBytes)})`}
              className={textLink}
            />{" "}
            for manual installation. SHA-256 <code className="break-all text-xs">{release.advancedZip.sha256}</code>
          </p>
        )}
      </div>

      <nav aria-label={`${component.shortName} links`} className="mt-8 border-t border-zinc-800">
        <DocLink href="/store/layout-points/changelog">Release notes</DocLink>
        <DocLink href={isStudio ? "#install-studio" : "#install-layout-points"} event="lp_open_install_guide">
          Installation guide
        </DocLink>
        <DocLink href="#previous-releases">Previous releases</DocLink>
        <DocLink href={isStudio ? "/store/layout-points/docs#uninstall" : "/store/layout-points/docs#rollback"}>
          {isStudio ? "Uninstall instructions" : "Rollback instructions"}
        </DocLink>
      </nav>
    </article>
  )
}

const layoutPointsInstall = [
  "Quit Vectorworks.",
  "Note which Vectorworks year or years you have installed.",
  "Download Layout Points and check its SHA-256.",
  `Open ${productFacts.installerName.value} and follow the guided steps, selecting your Vectorworks year.`,
  "Restart Vectorworks.",
  `Add ${productFacts.layoutPointTool.value} and ${productFacts.exportCommand.value} to your working workspace.`,
  "Open the sample job.",
  "Place one point and export it.",
]

const studioInstall = [
  "Download the signed and notarised Mac release.",
  "Open the download.",
  "Move Datum Label Studio to Applications.",
  "Launch it normally from Applications.",
  "Open the supplied sample field package.",
  "Select the printer and label stock.",
  "Complete physical calibration before production printing.",
]

const setupComplete = [
  `${productFacts.layoutPointTool.value} appears in Vectorworks`,
  `${productFacts.exportCommand.value} creates a field package`,
  "The package opens in Datum Label Studio",
  "The correct label stock is selected",
  "Printer calibration has passed physically",
  "One sample label has been measured",
]

function Steps({ items }: { items: string[] }) {
  return (
    <ol className="border-t border-zinc-800">
      {items.map((item, index) => (
        <li key={item} className="grid grid-cols-[3rem_minmax(0,1fr)] gap-4 border-b border-zinc-800 py-4">
          <span className="font-mono text-xs font-bold tracking-[0.2em] text-[#00D26A]">
            {String(index + 1).padStart(2, "0")}
          </span>
          <span className="leading-relaxed text-zinc-200">{item}</span>
        </li>
      ))}
    </ol>
  )
}

export default function DownloadPage() {
  const released = isPublicDownloadEnabled()
  const previous = [
    ...manifest.components["layout-points"].previous,
    ...manifest.components["datum-label-studio"].previous,
  ]

  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: "Download", path: "/store/layout-points/download" }])} />

      <section className={`${container} pb-14 pt-12 md:pb-20 md:pt-16`}>
        <div className="grid grid-cols-1 items-end gap-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
          <div>
            <h1
              data-vt="title"
              data-reveal="rise"
              className="w-fit max-w-[14ch] text-5xl font-semibold leading-[0.92] tracking-[-0.055em] text-balance sm:text-6xl md:text-7xl"
            >
              Download the Mac workflow.
            </h1>
            <p data-reveal="fade" className="mt-8 max-w-2xl text-lg leading-relaxed text-zinc-300">
              You need both components for the complete Vectorworks-to-label workflow. They are installed separately and
              exchange one local field package.
            </p>
            <Suspense fallback={null}>
              <DownloadErrorNotice />
            </Suspense>
          </div>
          <div data-reveal="fade" className="border border-zinc-800 bg-zinc-900/40 p-6 md:p-8">
            <p
              className={`font-mono text-xs uppercase tracking-[0.2em] ${released ? "text-[#00D26A]" : "text-amber-300"}`}
            >
              {released ? (manifest.publication.releaseLabel ?? "Public release") : "Paid beta in preparation"}
            </p>
            <p className="mt-4 leading-relaxed text-zinc-300">
              {released
                ? "Every file below is versioned and never replaced. Check the SHA-256 after downloading."
                : "Nothing is on sale or published yet. Values fill in from the release manifest when signed, notarised builds pass release testing and the paid beta opens."}
            </p>
            {!released && (
              <a href="#release-list" className={`${primaryButton} mt-6`}>
                Join the release list
              </a>
            )}
          </div>
        </div>
      </section>

      <section aria-label="Downloads" className="border-y border-zinc-800 bg-zinc-950">
        <div className={`${container} py-12 md:py-16`}>
          <div className="grid grid-cols-1 gap-px border border-zinc-800 bg-zinc-800 lg:grid-cols-2">
            <Panel id="layout-points" />
            <Panel id="datum-label-studio" />
          </div>
          <p className="mt-6 max-w-4xl text-sm leading-relaxed text-zinc-400">
            There is no combined installer. Each component is signed, verified and versioned on its own, and the page
            shows exactly which versions belong together.
          </p>
        </div>
      </section>

      <section id="verify" className="scroll-mt-24 border-b border-zinc-800">
        <div
          className={`${container} grid grid-cols-1 gap-12 py-16 md:py-24 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)]`}
        >
          <div>
            <CueLabel index="01" className={eyebrow}>
              VERIFY
            </CueLabel>
            <h2 data-reveal="rise" className={`${sectionHeading} max-w-[12ch]`}>
              Check the bytes you downloaded.
            </h2>
          </div>
          <div className="space-y-6 leading-relaxed text-zinc-300">
            <p>
              In Terminal, run the command below on the downloaded file and compare the result with the SHA-256 above.
            </p>
            <pre
              tabIndex={0}
              className="overflow-x-auto focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00D26A] border border-zinc-800 bg-black p-5 font-mono text-sm text-zinc-100"
            >
              <code>shasum -a 256 ~/Downloads/&lt;filename&gt;</code>
            </pre>
            <p>
              A match proves the file is byte-for-byte the one we published. It does not prove who published it. For
              that, macOS checks the Developer ID signature and Apple notarisation when you open the app or installer.
            </p>
            <p className="border-l-2 border-amber-300 pl-4 text-amber-100">
              If macOS says Datum Label Studio or the installer cannot be opened, stop. Do not bypass Gatekeeper, change
              security settings or remove quarantine attributes.{" "}
              <Link href="/store/layout-points/support#contact" className={textLink}>
                Contact support
              </Link>{" "}
              instead.
            </p>
          </div>
        </div>
      </section>

      <section id="install" className="scroll-mt-24 border-b border-zinc-800 bg-zinc-950">
        <div className={`${container} py-16 md:py-24`}>
          <CueLabel index="02" className={eyebrow}>
            INSTALL
          </CueLabel>
          <h2 data-reveal="rise" className={`${sectionHeading} max-w-[16ch]`}>
            Install both, then run one sample job.
          </h2>
          <div className="mt-12 grid grid-cols-1 gap-12 lg:grid-cols-2">
            <div id="install-layout-points" className="scroll-mt-28">
              <h3 className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-white">
                Layout Points for Vectorworks
              </h3>
              <div className="mt-5">
                <Steps items={layoutPointsInstall} />
              </div>
              <p className="mt-5 text-sm leading-relaxed text-zinc-400">
                No Xcode, source checkout or Terminal needed. A manual Terminal installation is documented for
                administrators only.{" "}
                <Link href="/store/layout-points/docs#installation" className={textLink}>
                  Full installation guide
                </Link>
              </p>
            </div>
            <div id="install-studio" className="scroll-mt-28">
              <h3 className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-white">Datum Label Studio</h3>
              <div className="mt-5">
                <Steps items={studioInstall} />
              </div>
              <p className="mt-5 text-sm leading-relaxed text-zinc-400">
                <Link href="/store/layout-points/docs#calibration" className={textLink}>
                  Printer calibration guide
                </Link>
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="setup-complete" className="scroll-mt-24 border-b border-zinc-800">
        <div
          className={`${container} grid grid-cols-1 gap-12 py-16 md:py-24 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)]`}
        >
          <div>
            <CueLabel index="03" className={eyebrow}>
              SETUP COMPLETE
            </CueLabel>
            <h2 data-reveal="rise" className={`${sectionHeading} max-w-[12ch]`}>
              Ready when all six are true.
            </h2>
          </div>
          <fieldset>
            <legend className="sr-only">Setup-complete checklist</legend>
            <ul className="border-t border-zinc-800">
              {setupComplete.map((item, index) => (
                <li key={item} className="border-b border-zinc-800">
                  <label className="flex min-h-14 cursor-pointer items-center gap-4 py-3 text-zinc-200">
                    <input type="checkbox" className="size-5 shrink-0 accent-[#00D26A]" id={`setup-${index}`} />
                    <span>{item}</span>
                  </label>
                </li>
              ))}
            </ul>
          </fieldset>
        </div>
      </section>

      <section id="previous-releases" className="scroll-mt-24 border-b border-zinc-800 bg-zinc-950">
        <div className={`${container} py-16 md:py-24`}>
          <CueLabel index="04" className={eyebrow}>
            PREVIOUS RELEASES
          </CueLabel>
          <h2 data-reveal="rise" className={`${sectionHeading} max-w-[16ch]`}>
            Every version stays available.
          </h2>
          {previous.length === 0 ? (
            <p className="mt-8 max-w-2xl leading-relaxed text-zinc-400">
              No previous public releases yet. Once there are, each one is listed here with its date, checksum and
              notes. Files are never replaced behind a published version.
            </p>
          ) : (
            <div
              role="region"
              aria-label="Previous releases"
              tabIndex={0}
              className="mt-10 overflow-x-auto focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00D26A]"
            >
              <table className="w-full min-w-[40rem] border-t border-zinc-800 text-left text-sm">
                <caption className="sr-only">Previous releases</caption>
                <thead className="font-mono text-[11px] uppercase tracking-[0.16em] text-zinc-400">
                  <tr>
                    <th scope="col" className="py-3 pr-4 font-normal">
                      Component
                    </th>
                    <th scope="col" className="py-3 pr-4 font-normal">
                      Version
                    </th>
                    <th scope="col" className="py-3 pr-4 font-normal">
                      Date
                    </th>
                    <th scope="col" className="py-3 pr-4 font-normal">
                      SHA-256
                    </th>
                    <th scope="col" className="py-3 font-normal">
                      File
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {previous.map((r) => (
                    <tr key={`${r.component}-${r.version}`} className="border-t border-zinc-800 align-top">
                      <td className="py-4 pr-4">{manifest.components[r.component].shortName}</td>
                      <td className="py-4 pr-4 font-mono">{r.version}</td>
                      <td className="py-4 pr-4 font-mono">{r.releaseDate}</td>
                      <td className="max-w-[18rem] break-all py-4 pr-4 font-mono text-xs">{r.sha256}</td>
                      <td className="py-4">
                        <a href={r.url} className={textLink} download={r.filename}>
                          {r.filename}
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </section>

      {!released && (
        <section id="release-list" className="scroll-mt-24">
          <div
            className={`${container} grid grid-cols-1 gap-12 py-16 md:py-24 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)]`}
          >
            <div>
              <CueLabel index="05" className={eyebrow}>
                RELEASE LIST
              </CueLabel>
              <h2 data-reveal="rise" className={`${sectionHeading} max-w-[12ch]`}>
                One email when it ships.
              </h2>
            </div>
            <div className="border border-zinc-800 bg-black p-7 md:p-9">
              <ReleaseListForm />
            </div>
          </div>
        </section>
      )}
    </>
  )
}
