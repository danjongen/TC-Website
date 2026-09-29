import type { Metadata } from "next"
import Link from "next/link"

import { CueLabel } from "@/components/motion/cue-label"
import {
  COMPONENT_IDS,
  formatBytes,
  isPublicDownloadEnabled,
  manifest,
  type Release,
} from "@/lib/layout-points/release"

import { breadcrumbJsonLd, JsonLd } from "../_components/json-ld"
import { subPageMetadata } from "../_components/meta"
import { TrackMount } from "../_components/track"
import { container, eyebrow, sectionHeading, textLink } from "../_components/ui"

const description =
  "Release notes, checksums and known issues for Layout Points for Vectorworks and Datum Label Studio."

export const metadata: Metadata = subPageMetadata({
  title: "Layout Points Changelog and Release Notes",
  description,
  path: "/changelog",
})

function releases(): Release[] {
  if (!isPublicDownloadEnabled()) return []
  return COMPONENT_IDS.flatMap((id) => {
    const c = manifest.components[id]
    return [c.current, ...c.previous].filter((r): r is Release => Boolean(r))
  }).sort((a, b) => b.releaseDate.localeCompare(a.releaseDate))
}

export default function ChangelogPage() {
  const list = releases()

  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: "Changelog", path: "/store/layout-points/changelog" }])} />
      <TrackMount event="lp_open_release_notes" />

      <section className={`${container} pb-12 pt-12 md:pb-16 md:pt-16`}>
        <h1
          data-vt="title"
          data-reveal="rise"
          className="w-fit max-w-[14ch] text-5xl font-semibold leading-[0.92] tracking-[-0.055em] text-balance sm:text-6xl md:text-7xl"
        >
          Changelog.
        </h1>
        <p data-reveal="fade" className="mt-8 max-w-2xl text-lg leading-relaxed text-zinc-300">
          Every public version of both components, with its date, checksum and what changed. Published files are never
          replaced.
        </p>
      </section>

      <section aria-labelledby="releases-heading" className="border-t border-zinc-800">
        <div className={`${container} py-16 md:py-20`}>
          <CueLabel index="01" className={eyebrow}>
            RELEASES
          </CueLabel>
          <h2 id="releases-heading" className="sr-only">
            Releases
          </h2>
          {list.length === 0 ? (
            <div className="mt-8 max-w-3xl border-l-2 border-amber-300 pl-5">
              <p className="text-2xl font-semibold tracking-[-0.03em]">No release yet.</p>
              <p className="mt-4 leading-relaxed text-zinc-300">
                Internal development builds are not published. The first public version will be listed here with its
                release date, SHA-256 checksums and notes for both components.{" "}
                <Link href="/store/layout-points#release-list" className={textLink}>
                  Join the release list
                </Link>
                .
              </p>
            </div>
          ) : (
            <ol className="mt-10 border-t border-zinc-800">
              {list.map((r) => (
                <li
                  key={`${r.component}-${r.version}`}
                  id={`${r.component}-${r.version}`}
                  className="grid grid-cols-1 gap-4 border-b border-zinc-800 py-8 md:grid-cols-[14rem_minmax(0,1fr)]"
                >
                  <div className="font-mono text-xs uppercase tracking-[0.16em] text-zinc-400">
                    <p className="text-base font-bold text-white">{r.version}</p>
                    <p className="mt-2">{r.releaseDate}</p>
                    <p className="mt-2">{manifest.components[r.component].shortName}</p>
                  </div>
                  <div>
                    {r.notes && r.notes.length > 0 && (
                      <ul className="list-disc space-y-2 pl-5 leading-relaxed text-zinc-200 marker:text-[#00D26A]">
                        {r.notes.map((n) => (
                          <li key={n}>{n}</li>
                        ))}
                      </ul>
                    )}
                    <p className="mt-4 font-mono text-xs text-zinc-400">
                      {r.filename} · {formatBytes(r.sizeBytes)} · SHA-256 <span className="break-all">{r.sha256}</span>
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          )}
        </div>
      </section>

      <section
        id="known-issues"
        aria-labelledby="known-issues-heading"
        className="scroll-mt-24 border-t border-zinc-800 bg-zinc-950"
      >
        <div className={`${container} py-16 md:py-24`}>
          <CueLabel index="02" className={eyebrow}>
            KNOWN ISSUES
          </CueLabel>
          <h2 id="known-issues-heading" data-reveal="rise" className={`${sectionHeading} max-w-[14ch]`}>
            Known issues.
          </h2>
          <dl className="mt-10 border-t border-zinc-800">
            {manifest.knownIssues.map((issue) => (
              <div
                key={issue.id}
                className="grid grid-cols-1 gap-2 border-b border-zinc-800 py-5 md:grid-cols-[14rem_minmax(0,1fr)_8rem] md:gap-8"
              >
                <dt className="font-mono text-xs uppercase tracking-[0.16em] text-zinc-400">
                  {issue.component === "both" ? "Both components" : manifest.components[issue.component].shortName}
                </dt>
                <dd className="leading-relaxed text-zinc-200">{issue.summary}</dd>
                <dd className="font-mono text-xs uppercase tracking-[0.16em] text-zinc-400">{issue.status}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>
    </>
  )
}
