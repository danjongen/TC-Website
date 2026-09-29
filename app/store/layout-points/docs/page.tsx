import type { Metadata } from "next"
import Link from "next/link"
import type { ReactNode } from "react"

import { productFacts } from "@/lib/layout-points/product-facts"
import { compatibilityLine, manifest } from "@/lib/layout-points/release"

import { breadcrumbJsonLd, JsonLd } from "../_components/json-ld"
import { subPageMetadata } from "../_components/meta"
import { container, textLink } from "../_components/ui"

const description =
  "Layout Points + Datum Label Studio documentation: quick start, installation, Vectorworks workspace setup, coordinates, field packages, exact datum selection, printer calibration, updating, rollback, uninstall and troubleshooting."

export const metadata: Metadata = subPageMetadata({
  title: "Layout Points Documentation",
  description,
  path: "/docs",
  type: "article",
})

const tool = productFacts.layoutPointTool.value
const exporter = productFacts.exportCommand.value

function slug(text: string) {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, "-")
}

type Topic = { id: string; title: string; body: ReactNode }
type Group = { title: string; topics: Topic[] }

function P({ children }: { children: ReactNode }) {
  return <p className="leading-relaxed text-zinc-300">{children}</p>
}

function Ol({ items }: { items: ReactNode[] }) {
  return (
    <ol className="border-t border-zinc-800">
      {items.map((item, index) => (
        <li key={index} className="grid grid-cols-[2.5rem_minmax(0,1fr)] gap-3 border-b border-zinc-800 py-3">
          <span className="font-mono text-xs font-bold tracking-[0.18em] text-[#00D26A]">
            {String(index + 1).padStart(2, "0")}
          </span>
          <span className="leading-relaxed text-zinc-200">{item}</span>
        </li>
      ))}
    </ol>
  )
}

function Ul({ items }: { items: ReactNode[] }) {
  return (
    <ul className="divide-y divide-zinc-800 border-y border-zinc-800">
      {items.map((item, index) => (
        <li key={index} className="py-3 leading-relaxed text-zinc-200">
          {item}
        </li>
      ))}
    </ul>
  )
}

function Note({ children, tone = "info" }: { children: ReactNode; tone?: "info" | "warn" }) {
  return (
    <p
      className={`border-l-2 pl-4 leading-relaxed ${tone === "warn" ? "border-amber-300 text-amber-100" : "border-[#00D26A] text-zinc-200"}`}
    >
      {children}
    </p>
  )
}

function Code({ children }: { children: ReactNode }) {
  return <code className="break-words bg-zinc-900 px-1.5 py-0.5 font-mono text-[0.85em] text-zinc-100">{children}</code>
}

function Table({ head, rows, label }: { head: string[]; rows: ReactNode[][]; label: string }) {
  return (
    // Focusable so keyboard users can scroll it sideways on narrow screens.
    <div
      role="region"
      aria-label={label}
      tabIndex={0}
      className="overflow-x-auto focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00D26A]"
    >
      <table className="w-full min-w-[36rem] border-t border-zinc-800 text-left text-sm">
        <thead className="font-mono text-[11px] uppercase tracking-[0.14em] text-zinc-400">
          <tr>
            {head.map((h) => (
              <th key={h} scope="col" className="py-3 pr-4 font-normal">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} className="border-t border-zinc-800 align-top">
              {row.map((cell, j) => (
                <td key={j} className={`py-3 pr-4 leading-relaxed ${j === 0 ? "text-white" : "text-zinc-300"}`}>
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

const groups: Group[] = [
  {
    title: "Get started",
    topics: [
      {
        id: "quick-start",
        title: "Five-minute quick start",
        body: (
          <>
            <P>Do this once with the sample job before touching a production drawing.</P>
            <Ol
              items={[
                <>
                  Install Layout Points and Datum Label Studio from the{" "}
                  <Link href="/store/layout-points/download" className={textLink}>
                    download page
                  </Link>
                  .
                </>,
                <>
                  Restart Vectorworks and add {tool} and {exporter} to your workspace.
                </>,
                "Open the sample job and place one point.",
                <>Run {exporter} and choose a local, non-synced folder.</>,
                "Drop the new field package onto Datum Label Studio and confirm it shows Package verified.",
                "Choose your label stock and the exact datum, then review the PDF.",
                "Print the calibration target, measure it, enter the six values and print the correction.",
                "Print one label, measure it, and only then start the real run.",
              ]}
            />
          </>
        ),
      },
      {
        id: "installation",
        title: "Full installation",
        body: (
          <>
            <P>
              Requirements: {compatibilityLine().join(", ")}. You need an administrator account on the Mac only if macOS
              asks for one during installation.
            </P>
            <h4 className="font-mono text-xs font-bold uppercase tracking-[0.18em] text-white">Layout Points</h4>
            <Ol
              items={[
                "Quit Vectorworks.",
                "Note which Vectorworks year or years are installed.",
                `Open ${productFacts.installerName.value} and follow the guided steps. Select each Vectorworks year you want it in.`,
                "Restart Vectorworks.",
                "Continue with Vectorworks workspace setup below.",
              ]}
            />
            <P>
              The installer places the plug-in files in your Vectorworks user folder (
              <Code>{productFacts.pluginLocation.value}</Code>) and records the previous version so it can be rolled
              back.
            </P>
            <h4 className="font-mono text-xs font-bold uppercase tracking-[0.18em] text-white">Datum Label Studio</h4>
            <Ol
              items={[
                "Open the download.",
                "Drag Datum Label Studio into Applications.",
                "Open Datum Label Studio from Applications the normal way.",
              ]}
            />
            <Note tone="warn">
              If macOS refuses to open either download, do not bypass Gatekeeper, change security settings or remove
              quarantine attributes. Contact support with a screenshot of the message.
            </Note>
            <P>
              Administrators who manage many Macs can use the manual installation described in the advanced notes
              shipped with each release. First-time users never need Terminal, Xcode or a source checkout.
            </P>
          </>
        ),
      },
      {
        id: "workspace",
        title: "Vectorworks workspace setup",
        body: (
          <>
            <P>New plug-ins do not appear in your workspace until you add them. Do this once per Vectorworks year.</P>
            <Ol
              items={[
                "In Vectorworks choose Tools > Workspaces > Edit Current Workspace.",
                `On the Tools tab, find ${tool} and drag it into the tool set you use for layout.`,
                `On the Menus tab, find ${exporter} and drag it into a menu you use, such as File > Export.`,
                "Click OK. Vectorworks saves the workspace.",
              ]}
            />
            <Note>
              If you share a company workspace, ask whoever maintains it to add both items so everyone gets them.
            </Note>
          </>
        ),
      },
      {
        id: "sample-package",
        title: "Sample job and sample field package",
        body: (
          <P>
            Each release includes a sample Vectorworks job and a sanitised sample field package. Neither contains client
            data. Use them to prove the install and printer before you use a production drawing, and send them with a
            support request when you need to show a problem without sharing real coordinates.
          </P>
        ),
      },
      {
        id: "first-job",
        title: "First-job checklist",
        body: (
          <Ul
            items={[
              "Document units are set the way your field crew expects (metres with enough decimals, or millimetres).",
              "The drawing's origin is the datum the field team will set up on. Georeferencing is off unless you intend it.",
              "Control points are placed and numbered before layout points.",
              "The export folder is local and not inside Dropbox, iCloud or another synced folder.",
              "The package shows Package verified in Datum Label Studio.",
              "The label stock matches the roll or sheet in the printer.",
              "Calibration has passed physically for this printer, stock and feed direction.",
              "One sample label has been measured before the full run.",
              "On site, one known distance has been checked after instrument setup.",
            ]}
          />
        ),
      },
    ],
  },
  {
    title: "Layout Points",
    topics: [
      {
        id: "first-point",
        title: "Your first Layout Point",
        body: (
          <Ol
            items={[
              `Select ${tool} in your tool set.`,
              "Choose the point type and check the numbering prefix and starting number.",
              "Click in the drawing to place the point. Keep clicking to place the next ones: numbering continues automatically.",
              "Select a placed point to see its live Easting, Northing and Elevation.",
            ]}
          />
        ),
      },
      {
        id: "point-types",
        title: "Point types and numbering",
        body: (
          <>
            <P>
              Point types separate control points from layout points and group layout points by purpose. Types and
              numbering are set before you place a run, so the IDs read clearly on the floor.
            </P>
            <Ul
              items={[
                "Set the type and numbering once, then place the whole run.",
                "Types and numbering are editable, so you can match the conventions your crew already uses.",
                "Control points export to the CONTROL file. Layout points export to the POINTS file.",
                "Keep IDs unique within a job. Duplicate IDs are the most common cause of confusion on the controller.",
              ]}
            />
          </>
        ),
      },
      {
        id: "coordinates",
        title: "Coordinate conventions",
        body: (
          <>
            <P>
              Layout Points labels every coordinate explicitly as Easting, Northing and Elevation, so no file relies on
              column position alone. Coordinates come live from supported Vectorworks objects, measured from the
              drawing&apos;s origin in document units.
            </P>
            <Table
              label="Coordinate checks"
              head={["Check", "Why it matters"]}
              rows={[
                [
                  "Origin",
                  "Set the user origin to the datum the field team will set up on, such as the centre of the room.",
                ],
                [
                  "Georeferencing",
                  "A georeferenced file can produce very large projected coordinates. Turn it off for local stage and venue work unless you mean it.",
                ],
                [
                  "Units",
                  "A millimetre drawing imported as metres puts points 1000 times too far apart. Match units at both ends.",
                ],
                ["Precision", "In metres, keep at least three decimals or you round away millimetres."],
                [
                  "Axis direction",
                  "If upstage and downstage come out reversed, one axis sign is flipped. Fix the sign; do not swap Easting and Northing.",
                ],
              ]}
            />
            <Note>
              On the controller, import CONTROL as control points and POINTS as stakeout or reference data, and map the
              Easting and Northing columns explicitly. After setup, measure one known distance before trusting the job.
            </Note>
          </>
        ),
      },
      {
        id: "export",
        title: exporter,
        body: (
          <>
            <P>
              {exporter} exports the whole job in one step and writes it atomically: the package appears complete or not
              at all, so a crash or full disk cannot leave a half-written job that looks finished.
            </P>
            <Ol
              items={[
                `Choose ${exporter}.`,
                "Pick a local folder. A new timestamped job folder is created inside it.",
                "Wait for the confirmation, then open the package in Datum Label Studio.",
              ]}
            />
            <Note tone="warn">Do not edit, rename or remove files inside a package. Export again instead.</Note>
          </>
        ),
      },
      {
        id: "package-contents",
        title: "Field-package contents",
        body: (
          <>
            <P>Each export is one timestamped job folder containing {productFacts.fieldPackageContents.value}.</P>
            <Table
              label="Field-package contents"
              head={["Item", "Used by"]}
              rows={[
                ["Label data", "Datum Label Studio"],
                ["CONTROL (Leica format)", "Controller, as control points"],
                ["POINTS (Leica format)", "Controller, as stakeout data"],
                ["Manifest", "Datum Label Studio verification: what should be in the package"],
                ["SHA-256 checksums", "Datum Label Studio verification: that each file is unchanged"],
              ]}
            />
            <P>
              Package verified means the manifest, the checksums and the files agree. It does not prove who created the
              package, it is not tamper-proof, and it cannot tell you whether the drawing was right.
            </P>
          </>
        ),
      },
    ],
  },
  {
    title: "Datum Label Studio",
    topics: [
      {
        id: "first-import",
        title: "First import",
        body: (
          <>
            <Ol
              items={[
                "Open Datum Label Studio.",
                "Drop the job folder or its ZIP onto the window, or open it from the File menu.",
                "Check for Package verified. If it does not appear, see Troubleshooting before printing.",
                "Review the list of IDs and coordinates. They are locked to the source and cannot be edited by accident.",
              ]}
            />
            <P>
              You can also open a CSV or TSV file. A plain file has no manifest, so it cannot be verified. Review it
              line by line before printing.
            </P>
          </>
        ),
      },
      {
        id: "departments",
        title: "Departments and colours",
        body: (
          <>
            <P>
              Map point groups to departments and give each department a name and a colour. The colour prints on the
              label so each crew can find its own marks quickly. Datum Label Studio remembers your departments on that
              Mac.
            </P>
            <Note>
              CONTROL labels always print yellow and black. They are the reference marks every other point is set out
              from, so a department colour can never restyle one.
            </Note>
          </>
        ),
      },
      {
        id: "exact-datum",
        title: "Exact datum selection",
        body: (
          <>
            <P>
              The exact datum is the one point on the label that goes directly over the surveyed position. Choose it to
              suit how the label is physically placed.
            </P>
            <Table
              label="Datum positions"
              head={["Datum", "Use it when"]}
              rows={[
                ["Centre", "The label is stuck centred over a mark."],
                ["Edge", "The label butts against an edge, such as a deck edge or a riser face."],
                ["Corner", "The label sits in a corner, such as the corner of a platform or a floor tile."],
              ]}
            />
            <P>The highlighted target prints on the label so there is no doubt on the floor.</P>
          </>
        ),
      },
      {
        id: "pdf-review",
        title: "PDF review",
        body: (
          <>
            <P>
              Preview and export an exact-size vector PDF, then review the whole print run before printing: count,
              order, departments, control labels and the datum on each label.
            </P>
            <Note tone="warn">
              Print at 100 percent or actual size. Any &quot;scale to fit&quot; option in a print dialog changes every
              dimension. An exact-size PDF does not by itself prove the physical result.
            </Note>
          </>
        ),
      },
      {
        id: "calibration",
        title: "Printer calibration",
        body: (
          <>
            <P>
              Calibrate every printer, stock and feed-direction combination you use. Physical output depends on the
              printer, driver, stock, feed direction, imageable area, calibration and measurement.
            </P>
            <Ol
              items={[
                "Select the printer and label stock in Datum Label Studio.",
                "Print the calibration target.",
                "With a steel rule or calipers, measure the four gaps between the printed frame and each cut edge of the label: top, right, bottom and left.",
                "Measure the two printed ruler lengths, horizontal and vertical.",
                "Enter all six values. Datum Label Studio calculates the correction for that printer, stock and feed direction.",
                "Print the corrected target and measure it again. Repeat until it passes.",
                "Print one real label and measure it before the production run.",
              ]}
            />
            <P>
              Datum Label Studio saves the correction on that Mac and applies it whenever you print with the same
              printer, stock and feed direction.
            </P>
          </>
        ),
      },
    ],
  },
  {
    title: "Maintain",
    topics: [
      {
        id: "updating",
        title: "Updating",
        body: (
          <>
            <P>Updates are manual. There is no automatic updater and neither component checks for updates.</P>
            <Ol
              items={[
                "Read the release notes for anything that changes your workflow.",
                "Download the new version and check its SHA-256.",
                "Quit Vectorworks and Datum Label Studio.",
                "Install exactly as the first time. Your departments and printer corrections are kept.",
                "Run the sample job once before production.",
              ]}
            />
          </>
        ),
      },
      {
        id: "rollback",
        title: "Rollback",
        body: (
          <>
            <P>If an update causes a problem mid-production, go back to the version you trusted.</P>
            <Ol
              items={[
                "Quit Vectorworks.",
                "Run the Layout Points rollback tool included with the installer. It restores the version that was installed before the last update.",
                "Restart Vectorworks and place one test point.",
              ]}
            />
            <P>
              To go back further, install any earlier release from the{" "}
              <Link href="/store/layout-points/download#previous-releases" className={textLink}>
                previous releases
              </Link>{" "}
              list. For Datum Label Studio, replace the app in Applications with the earlier version.
            </P>
          </>
        ),
      },
      {
        id: "uninstall",
        title: "Uninstall",
        body: (
          <>
            <Ol
              items={[
                "Quit Vectorworks and run the Layout Points uninstall tool.",
                "Quit Datum Label Studio and move it from Applications to the Trash.",
                <>
                  Optional: to remove saved label edits, departments and printer corrections, delete{" "}
                  <Code>{productFacts.studioDataLocation.value}</Code> and {productFacts.studioPreferencesDomain.value}.
                  Back them up first if you may need them.
                </>,
              ]}
            />
            <P>Field packages you exported are yours and are never removed by uninstalling.</P>
          </>
        ),
      },
    ],
  },
  {
    title: "Help",
    topics: [
      {
        id: "troubleshooting",
        title: "Troubleshooting",
        body: (
          <Table
            label="Troubleshooting"
            head={["Symptom", "Likely cause", "What to do"]}
            rows={[
              [
                `${tool} is missing`,
                "Not added to the workspace, or Vectorworks was not restarted.",
                "Restart Vectorworks, then follow workspace setup.",
              ],
              [
                "Plug-in does not load",
                "Installed for a different Vectorworks year.",
                "Run the installer again and select the correct year.",
              ],
              ["Coordinates are huge", "The file is georeferenced.", "See coordinate conventions: set a local origin."],
              [
                "Points 1000 times too far apart",
                "Units differ between drawing and controller.",
                "Match units in the drawing and the import profile.",
              ],
              [
                "Upstage and downstage reversed",
                "One axis sign is flipped.",
                "Fix that axis. Do not swap Easting and Northing.",
              ],
              [
                "No Package verified",
                "A file was moved, edited or is still syncing.",
                "Export again to a local folder and open the new package.",
              ],
              [
                "Label prints the wrong size",
                "Scale to fit, or the wrong stock selected.",
                "Print at actual size, select the right stock, recalibrate.",
              ],
              [
                "Labels drift along a run",
                "Feed direction or stock differs from calibration.",
                "Calibrate for that feed direction and stock.",
              ],
              [
                "macOS will not open the app or installer",
                "A security check failed.",
                "Do not bypass it. Contact support with a screenshot.",
              ],
            ]}
          />
        ),
      },
      {
        id: "known-issues",
        title: "Known issues",
        body: (
          <>
            <Ul items={manifest.knownIssues.map((issue) => issue.summary)} />
            <P>
              The current list is kept on the{" "}
              <Link href="/store/layout-points/changelog#known-issues" className={textLink}>
                changelog
              </Link>
              .
            </P>
          </>
        ),
      },
      {
        id: "privacy",
        title: "Privacy and local data",
        body: (
          <>
            <P>
              Layout Points and Datum Label Studio work locally. They do not upload drawings, coordinates or field
              packages, and they contain no product telemetry.
            </P>
            <Table
              label="Local data"
              head={["Data", "Where it lives", "Backup and removal"]}
              rows={[
                ["Field packages", "The folder you chose at export", "Yours to copy, archive or delete."],
                [
                  "Saved label drafts and edits",
                  `On that Mac, in ${productFacts.studioDataLocation.value}`,
                  "Copy the folder to back up. Delete it to remove.",
                ],
                ["Departments and colours", "Same local folder", "As above."],
                [
                  "Printer identity and calibration records",
                  "Same local folder",
                  "As above. Removing them means recalibrating.",
                ],
              ]}
            />
            <P>
              A Dropbox, iCloud or other synced folder is uploaded by that provider, even though the products never
              upload anything themselves.
            </P>
            <P>
              This website is separate from the products. Analytics load only after you accept cookies and never include
              project data. The release list, support form and any attachment you send are handled under the{" "}
              <Link href="/privacy-policy" className={textLink}>
                privacy policy
              </Link>
              .
            </P>
          </>
        ),
      },
      {
        id: "release-notes",
        title: "Release notes",
        body: (
          <P>
            Every public version is listed on the{" "}
            <Link href="/store/layout-points/changelog" className={textLink}>
              changelog
            </Link>{" "}
            with its date, checksums and changes.
          </P>
        ),
      },
      {
        id: "support",
        title: "Support",
        body: (
          <P>
            Use the{" "}
            <Link href="/store/layout-points/support#contact" className={textLink}>
              support form
            </Link>
            . Include the component and version, your macOS and Vectorworks versions, the printer and label size, and
            what you expected to happen. Do not attach production coordinates or client data unless you are authorised
            to share them.
          </P>
        ),
      },
    ],
  },
]

export default function DocsPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: "Docs", path: "/store/layout-points/docs" }])} />

      <section className={`${container} pb-12 pt-12 md:pb-16 md:pt-16`}>
        <h1
          data-vt="title"
          data-reveal="rise"
          className="w-fit max-w-[14ch] text-5xl font-semibold leading-[0.92] tracking-[-0.055em] text-balance sm:text-6xl md:text-7xl"
        >
          Documentation.
        </h1>
        <p data-reveal="fade" className="mt-8 max-w-2xl text-lg leading-relaxed text-zinc-300">
          Everything a production technician needs to install, run, calibrate and maintain the workflow. No developer
          knowledge assumed.
        </p>
      </section>

      <div
        className={`${container} grid grid-cols-1 gap-12 border-t border-zinc-800 pb-24 pt-12 lg:grid-cols-[16rem_minmax(0,1fr)] lg:gap-16`}
      >
        <nav
          aria-label="Documentation contents"
          className="lg:sticky lg:top-28 lg:max-h-[calc(100vh-8rem)] lg:self-start lg:overflow-y-auto"
        >
          {groups.map((group) => (
            <div key={group.title} className="mb-6">
              <p className="font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-white">{group.title}</p>
              <ul className="mt-2">
                {group.topics.map((topic) => (
                  <li key={topic.id}>
                    <a
                      href={`#${topic.id}`}
                      className="block py-1.5 text-sm text-zinc-400 transition-colors duration-300 ease-expo hover:text-[#00D26A] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00D26A]"
                    >
                      {topic.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>

        <div className="min-w-0 max-w-3xl">
          {groups.map((group) => (
            <section key={group.title} aria-labelledby={`group-${slug(group.title)}`} className="mb-16">
              <h2
                id={`group-${slug(group.title)}`}
                className="font-mono text-xs font-bold uppercase tracking-[0.25em] text-[#00D26A]"
              >
                [ {group.title} ]
              </h2>
              {group.topics.map((topic) => (
                <article key={topic.id} id={topic.id} className="scroll-mt-28 border-b border-zinc-800 py-10">
                  <h3 className="text-2xl font-semibold tracking-[-0.03em] md:text-3xl">{topic.title}</h3>
                  <div className="mt-6 space-y-5">{topic.body}</div>
                </article>
              ))}
            </section>
          ))}
        </div>
      </div>
    </>
  )
}
