import { productFacts } from "@/lib/layout-points/product-facts"
import { manifest, verifiedVectorworksVersions, architectureLabel } from "@/lib/layout-points/release"

export type Faq = {
  id: string
  q: string
  a: string
  link?: { href: string; label: string }
}

const DOCS = "/store/layout-points/docs"

/**
 * Customer FAQ. Answers state only what the product brief and release
 * manifest support. Version and platform answers read from the manifest.
 */
export function getFaqs(): Faq[] {
  const vw = verifiedVectorworksVersions()
  const arch = architectureLabel()

  return [
    {
      id: "internet",
      q: "Does it need an internet connection?",
      a: "Day-to-day use is offline: neither product uploads your drawings, coordinates or field packages. You need a connection to buy and download them. The paid beta includes a licence, and if activating it needs a connection, that will be stated here before the beta goes on sale.",
    },
    {
      id: "vectorworks-versions",
      q: "Which Vectorworks versions are supported?",
      a:
        vw.length > 0
          ? `Vectorworks ${vw.join(", ")} on macOS. Only versions that passed the release acceptance matrix are listed. Other versions may work but are not supported.`
          : "The acceptance matrix covers Vectorworks 2023 to 2026 on macOS, and it is not finished yet. Only versions that pass are listed on the download page. Until then, no version is claimed as supported.",
      link: { href: "/store/layout-points/download", label: "Download page" },
    },
    {
      id: "leica",
      q: "Does it work with Leica controller files?",
      a: "Layout Points writes CONTROL and POINTS files in a Leica-format ASCII layout for import into Leica field software such as iCON. Import CONTROL as control points and POINTS as stakeout data, and set the import profile columns explicitly the first time. Layout Points is not certified or endorsed by Leica Geosystems. Always check one known distance after setup.",
      link: { href: `${DOCS}#coordinates`, label: "Coordinate conventions" },
    },
    {
      id: "csv",
      q: "Can I import an ordinary CSV?",
      a: "Yes. Datum Label Studio also opens CSV and TSV files. A plain CSV has no manifest or checksums, so it cannot show Package verified. Review the IDs and coordinates carefully before printing.",
      link: { href: `${DOCS}#first-import`, label: "First import" },
    },
    {
      id: "edge-corner",
      q: "Can the exact datum be on an edge or corner?",
      a: "Yes. Choose the centre, any edge or any corner as the exact datum. The highlighted target on the printed label is the point that goes directly over the surveyed position, so pick the one that suits how the label is installed: centred on a mark, butted to a deck edge or tucked into a corner.",
      link: { href: `${DOCS}#exact-datum`, label: "Exact datum selection" },
    },
    {
      id: "departments",
      q: "Can I add departments and colours?",
      a: "Yes. Name your departments and give each one a colour. Datum Label Studio remembers them on that Mac.",
      link: { href: `${DOCS}#departments`, label: "Departments and colours" },
    },
    {
      id: "control-yellow",
      q: "Why are CONTROL labels fixed yellow and black?",
      a: "Control points are the reference marks every other point is set out from. A fixed, high-contrast style means nobody on the floor mistakes a control mark for a layout point, and a department colour can never restyle one by accident.",
    },
    {
      id: "calibration",
      q: "How does printer calibration work?",
      a: `Print the calibration target for the printer and label stock you will use. Measure ${productFacts.calibrationInputs.value} on the printed target, and enter them. Datum Label Studio calculates a correction for that printer, stock and feed direction. Print the corrected target and measure it again to confirm.`,
      link: { href: `${DOCS}#calibration`, label: "Printer calibration guide" },
    },
    {
      id: "every-printer",
      q: "Will every printer produce the same result?",
      a: "No. Physical output depends on the printer, its driver, the stock, the feed direction, the imageable area, the calibration and how carefully it is measured. Exact-size PDF output does not by itself prove the physical result. Calibrate each printer and stock combination, and measure a sample label before a production run.",
    },
    {
      id: "package-verified",
      q: "What does Package verified mean?",
      a: "It means the field package manifest, its SHA-256 checksums and the files in the package all agree, so nothing is missing, truncated or changed since export. It does not prove who made the package, and it does not make the package tamper-proof. It also says nothing about whether the drawing itself was correct.",
    },
    {
      id: "storage",
      q: "Where are my files stored?",
      a: "Field packages are written to the folder you choose when you export. Datum Label Studio keeps your label edits, departments and printer corrections locally on that Mac, in your user account. Nothing is sent to TC Agency.",
      link: { href: `${DOCS}#privacy`, label: "Privacy and local data" },
    },
    {
      id: "cloud",
      q: "Can I use Dropbox or iCloud?",
      a: "You can, but understand what happens. The products do not upload anything, but a synced folder is uploaded by the storage provider you chose. If your production data must stay local or under a client agreement, export to a folder that does not sync.",
    },
    {
      id: "windows",
      q: "Is there a Windows version?",
      a: `No. Both components are macOS only. Datum Label Studio needs macOS ${manifest.platform.minimumMacos} or later on ${arch === "Apple silicon" ? "an Apple silicon Mac" : "an Apple silicon or Intel Mac"}.`,
    },
    {
      id: "updates",
      q: "How do updates work?",
      a: "Updates are manual. There is no automatic updater. Download the new version from the download page, check its checksum, and install it the same way as the first time. Release notes list what changed.",
      link: { href: "/store/layout-points/changelog", label: "Changelog" },
    },
    {
      id: "rollback",
      q: "How do I roll back Layout Points?",
      a: "Quit Vectorworks, then run the Layout Points rollback tool to restore the version installed before the last update. You can also install any earlier release from the previous releases list on the download page.",
      link: { href: `${DOCS}#rollback`, label: "Rollback" },
    },
    {
      id: "uninstall",
      q: "How do I uninstall both components?",
      a: "Quit Vectorworks and run the Layout Points uninstall tool. Quit Datum Label Studio and move it from Applications to the Trash. If you also want to remove saved label edits, departments and printer corrections, delete its local data folder. Back it up first if you might need it.",
      link: { href: `${DOCS}#uninstall`, label: "Uninstall" },
    },
    {
      id: "previous",
      q: "Where are previous releases?",
      a: "On the download page, each with its date, checksum and release notes. Published files are never replaced: a version number always points to the same bytes.",
      link: { href: "/store/layout-points/download#previous-releases", label: "Previous releases" },
    },
    {
      id: "report",
      q: "How do I report a problem?",
      a: "Use the support form. Include the component and version, your macOS and Vectorworks versions, the printer and label size, and what you expected to happen. Do not attach production coordinates or client data unless you are authorised to share them.",
      link: { href: "/store/layout-points/support#contact", label: "Contact support" },
    },
  ]
}

export function faqJsonLd(faqs: Faq[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  }
}
