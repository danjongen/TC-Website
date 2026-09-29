import { unconfirmedFacts } from "./product-facts"
import manifestJson from "./release-manifest.json"

/**
 * Layout Points + Datum Label Studio release data.
 *
 * Every version, date, size, checksum, signing and compatibility value shown
 * on the site comes from release-manifest.json through this module. Nothing
 * about a release is hardcoded in page copy.
 *
 * Downloads stay hidden until the manifest is approved, every gate has
 * passed and each component's current release passes validateRelease().
 */

export type ComponentId = "layout-points" | "datum-label-studio"

export type GateStatus = "blocked" | "passed"

export type ReleaseGate = {
  id: string
  label: string
  status: GateStatus
  owner: string
  note?: string
}

export type SignatureStatus = "developer-id" | "ad-hoc" | "unsigned" | "not-applicable"
export type NotarisationStatus = "notarised-stapled" | "notarised" | "not-notarised" | "not-applicable"
export type SupportStatus = "supported" | "previous" | "unsupported"

export type Release = {
  component: ComponentId
  version: string
  releaseDate: string
  channel: "beta" | "stable"
  architecture: "arm64" | "universal" | "not-applicable"
  macosRequirement: string
  vectorworksVersions: string[]
  filename: string
  url: string
  sizeBytes: number
  sha256: string
  signature: SignatureStatus
  notarisation: NotarisationStatus
  releaseNotesUrl: string
  installGuideUrl: string
  supportStatus: SupportStatus
  sourceTag: string
  sourceDirty: boolean
  advancedZip?: {
    filename: string
    url: string
    sizeBytes: number
    sha256: string
  }
  notes?: string[]
}

export type ComponentReleases = {
  name: string
  shortName: string
  kind: string
  current: Release | null
  previous: Release[]
}

export type KnownIssue = {
  id: string
  component: ComponentId | "both"
  summary: string
  status: string
}

export type ReleaseManifest = {
  schemaVersion: number
  product: string
  publisher: string
  updatedAt: string
  publication: {
    approved: boolean
    approvedBy: string | null
    approvedAt: string | null
    commercialModel: "undecided" | "free-beta" | "paid"
    releaseLabel: string | null
    /** Paid only: the owner-set price and the live checkout. Null until decided. */
    price?: string | null
    currency?: string
    checkoutUrl?: string | null
  }
  platform: {
    minimumMacos: string
    architectures: string[]
    offline: boolean
  }
  gates: ReleaseGate[]
  components: Record<ComponentId, ComponentReleases>
  knownIssues: KnownIssue[]
}

export const manifest = manifestJson as ReleaseManifest

export const COMPONENT_IDS: readonly ComponentId[] = ["layout-points", "datum-label-studio"]

const SHA256 = /^[a-f0-9]{64}$/
const ISO_DATE = /^\d{4}-\d{2}-\d{2}$/
const SEMVER = /^\d+\.\d+\.\d+(?:-[0-9A-Za-z.-]+)?$/

/**
 * Returns the reasons a release cannot be offered for public download.
 * An empty array means the release record itself is publishable.
 */
export function validateRelease(release: Release): string[] {
  const problems: string[] = []
  const label = `${release.component} ${release.version}`

  if (!SEMVER.test(release.version)) problems.push(`${label}: version is not semantic`)
  if (release.version === "0.1.21") problems.push(`${label}: internal build 0.1.21 must not be reused publicly`)
  if (!ISO_DATE.test(release.releaseDate)) problems.push(`${label}: release date must be YYYY-MM-DD`)
  if (!SHA256.test(release.sha256)) problems.push(`${label}: SHA-256 must be 64 lowercase hex characters`)
  if (!(release.sizeBytes > 0)) problems.push(`${label}: file size missing`)
  if (release.sourceDirty !== false) problems.push(`${label}: built from a dirty source tree`)
  if (!release.sourceTag) problems.push(`${label}: missing immutable source tag`)
  if (!isImmutableUrl(release.url, release.version)) {
    problems.push(`${label}: download URL must be HTTPS and contain the version`)
  }
  if (release.filename && !release.url.endsWith(release.filename)) {
    problems.push(`${label}: URL does not end with the filename`)
  }
  if (!release.releaseNotesUrl) problems.push(`${label}: release notes missing`)

  // Both downloads must open without a Gatekeeper bypass: the Studio app
  // needs Developer ID Application, the Layout Points installer package
  // needs Developer ID Installer. Both must be notarised and stapled.
  if (release.signature !== "developer-id") problems.push(`${label}: not Developer ID signed`)
  if (release.notarisation !== "notarised-stapled") problems.push(`${label}: not notarised and stapled`)
  if (release.component === "datum-label-studio" && release.architecture === "not-applicable") {
    problems.push(`${label}: architecture missing`)
  }

  if (release.component === "layout-points" && release.vectorworksVersions.length === 0) {
    problems.push(`${label}: no verified Vectorworks versions`)
  }

  if (release.advancedZip) {
    if (!SHA256.test(release.advancedZip.sha256)) problems.push(`${label}: ZIP SHA-256 invalid`)
    if (!isImmutableUrl(release.advancedZip.url, release.version)) problems.push(`${label}: ZIP URL not immutable`)
  }

  return problems
}

function isImmutableUrl(url: string, version: string) {
  try {
    const parsed = new URL(url)
    return parsed.protocol === "https:" && parsed.pathname.includes(version)
  } catch {
    return false
  }
}

/** Every reason the public download is not yet available. */
export function publicationBlockers(m: ReleaseManifest = manifest, facts: string[] = unconfirmedFacts()): string[] {
  const blockers: string[] = []
  if (!m.publication.approved) blockers.push("Owner approval to publish has not been recorded")
  for (const gate of m.gates) {
    if (gate.status !== "passed") blockers.push(gate.label)
  }
  for (const fact of facts) blockers.push(`Unconfirmed product fact: ${fact}`)
  for (const id of COMPONENT_IDS) {
    const current = m.components[id].current
    if (!current) {
      blockers.push(`${m.components[id].name}: no public release recorded`)
      continue
    }
    blockers.push(...validateRelease(current))
  }
  return blockers
}

export function isPublicDownloadEnabled(m: ReleaseManifest = manifest, facts?: string[]): boolean {
  return publicationBlockers(m, facts).length === 0
}

/**
 * How a released build reaches people. A free beta links the immutable file
 * directly. A paid beta never shows the file URL publicly: buyers get it
 * through their purchase, and checkout needs a price and a live checkout.
 */
export type DownloadAccess = "closed" | "public" | "purchase" | "purchase-pending"

export function downloadAccess(m: ReleaseManifest = manifest, facts?: string[]): DownloadAccess {
  if (!isPublicDownloadEnabled(m, facts)) return "closed"
  if (m.publication.commercialModel === "free-beta") return "public"
  if (m.publication.commercialModel === "paid" && m.publication.price && m.publication.checkoutUrl) return "purchase"
  return "purchase-pending"
}

export function currentRelease(id: ComponentId, m: ReleaseManifest = manifest): Release | null {
  return isPublicDownloadEnabled(m) ? m.components[id].current : null
}

/** Verified Vectorworks versions for the public Layout Points release, if any. */
export function verifiedVectorworksVersions(m: ReleaseManifest = manifest): string[] {
  return currentRelease("layout-points", m)?.vectorworksVersions ?? []
}

export function architectureLabel(m: ReleaseManifest = manifest): string {
  const studio = currentRelease("datum-label-studio", m)
  const arch = studio?.architecture ?? (m.platform.architectures.includes("universal") ? "universal" : "arm64")
  return arch === "universal" ? "Apple silicon and Intel" : "Apple silicon"
}

export function compatibilityLine(m: ReleaseManifest = manifest): string[] {
  const vw = verifiedVectorworksVersions(m)
  return [
    `macOS ${m.platform.minimumMacos}+`,
    architectureLabel(m),
    vw.length > 0 ? `Vectorworks ${vw.join(", ")}` : "Vectorworks versions confirmed at release",
    "Offline workflow",
  ]
}

export function formatBytes(bytes: number): string {
  if (bytes >= 1024 * 1024) return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
  if (bytes >= 1024) return `${Math.round(bytes / 1024)} KB`
  return `${bytes} B`
}

export function signatureLabel(status: SignatureStatus): string {
  switch (status) {
    case "developer-id":
      return "Developer ID signed"
    case "ad-hoc":
      return "Ad hoc signed (not for distribution)"
    case "unsigned":
      return "Unsigned"
    default:
      return "Not applicable"
  }
}

export function notarisationLabel(status: NotarisationStatus): string {
  switch (status) {
    case "notarised-stapled":
      return "Notarised and stapled"
    case "notarised":
      return "Notarised"
    case "not-notarised":
      return "Not notarised"
    default:
      return "Not applicable"
  }
}
