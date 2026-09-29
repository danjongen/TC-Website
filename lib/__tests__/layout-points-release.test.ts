// Release gate tests for Layout Points + Datum Label Studio.
// Run with: npx tsx --test lib/__tests__/layout-points-release.test.ts

import assert from "node:assert/strict"
import test from "node:test"

import { productFacts } from "../layout-points/product-facts"
import {
  compatibilityLine,
  downloadAccess,
  isPublicDownloadEnabled,
  manifest,
  publicationBlockers,
  validateRelease,
  type Release,
  type ReleaseManifest,
} from "../layout-points/release"

const sha = "a".repeat(64)

function release(component: Release["component"], overrides: Partial<Release> = {}): Release {
  return {
    component,
    version: "1.0.0",
    releaseDate: "2026-10-01",
    channel: "beta",
    architecture: component === "datum-label-studio" ? "arm64" : "not-applicable",
    macosRequirement: "13",
    vectorworksVersions: component === "layout-points" ? ["2026"] : [],
    filename: component === "layout-points" ? "Layout-Points-1.0.0.pkg" : "Datum-Label-Studio-1.0.0.dmg",
    url: `https://downloads.example.com/layout-points/1.0.0/${component === "layout-points" ? "Layout-Points-1.0.0.pkg" : "Datum-Label-Studio-1.0.0.dmg"}`,
    sizeBytes: 1234,
    sha256: sha,
    signature: "developer-id",
    notarisation: "notarised-stapled",
    releaseNotesUrl: "https://www.tc.agency/store/layout-points/changelog",
    installGuideUrl: "https://www.tc.agency/store/layout-points/docs#installation",
    supportStatus: "supported",
    sourceTag: "v1.0.0",
    sourceDirty: false,
    ...overrides,
  }
}

function readyManifest(): ReleaseManifest {
  return {
    ...manifest,
    publication: { ...manifest.publication, approved: true, commercialModel: "free-beta" },
    gates: manifest.gates.map((g) => ({ ...g, status: "passed" })),
    components: {
      "layout-points": { ...manifest.components["layout-points"], current: release("layout-points") },
      "datum-label-studio": { ...manifest.components["datum-label-studio"], current: release("datum-label-studio") },
    },
  }
}

test("the committed manifest keeps downloads closed", () => {
  assert.equal(isPublicDownloadEnabled(), false)
  assert.ok(publicationBlockers().length > 0)
})

test("no Vectorworks version is claimed before release evidence", () => {
  assert.ok(compatibilityLine().includes("Vectorworks versions confirmed at release"))
  assert.ok(!compatibilityLine().some((part) => /Intel/.test(part)))
})

test("a fully valid release validates", () => {
  assert.deepEqual(validateRelease(release("layout-points")), [])
  assert.deepEqual(validateRelease(release("datum-label-studio")), [])
})

test("internal 0.1.21 cannot be published", () => {
  const problems = validateRelease(
    release("datum-label-studio", { version: "0.1.21", url: "https://x.example/0.1.21/Datum-Label-Studio-1.0.0.dmg" }),
  )
  assert.ok(problems.some((p) => p.includes("0.1.21")))
})

test("ad hoc signed or un-notarised Studio builds are rejected", () => {
  assert.ok(validateRelease(release("datum-label-studio", { signature: "ad-hoc" })).length > 0)
  assert.ok(validateRelease(release("datum-label-studio", { notarisation: "not-notarised" })).length > 0)
})

test("dirty source trees are rejected", () => {
  assert.ok(validateRelease(release("layout-points", { sourceDirty: true })).some((p) => p.includes("dirty")))
})

test("mutable or non-HTTPS URLs are rejected", () => {
  assert.ok(
    validateRelease(release("layout-points", { url: "http://x.example/1.0.0/Layout-Points-1.0.0.pkg" })).length > 0,
  )
  assert.ok(
    validateRelease(
      release("layout-points", { url: "https://x.example/latest/Layout-Points.pkg", filename: "Layout-Points.pkg" }),
    ).length > 0,
  )
})

test("Layout Points needs at least one verified Vectorworks version", () => {
  assert.ok(validateRelease(release("layout-points", { vectorworksVersions: [] })).length > 0)
})

test("a ready manifest opens downloads only once product facts are confirmed", () => {
  const unconfirmed = Object.values(productFacts).some((f) => !f.confirmed)
  assert.equal(isPublicDownloadEnabled(readyManifest()), !unconfirmed)
})

test("any blocked gate keeps downloads closed", () => {
  const m = readyManifest()
  m.gates[0] = { ...m.gates[0], status: "blocked" }
  assert.equal(isPublicDownloadEnabled(m), false)
})

test("a paid beta never exposes a public file, and needs a price and checkout to sell", () => {
  const confirmed: string[] = [] // every product fact confirmed
  const paid = readyManifest()
  paid.publication = { ...paid.publication, commercialModel: "paid", price: null, checkoutUrl: null }
  assert.equal(downloadAccess(paid, confirmed), "purchase-pending")
  paid.publication = { ...paid.publication, price: "49.00", checkoutUrl: "https://example.com/checkout" }
  assert.equal(downloadAccess(paid, confirmed), "purchase")
  assert.equal(downloadAccess(readyManifest(), confirmed), "public")
  assert.equal(downloadAccess(readyManifest(), ["installerName: unconfirmed"]), "closed")
})

test("the committed manifest records the owner decisions", () => {
  assert.equal(manifest.publication.commercialModel, "paid")
  assert.equal(manifest.publication.approved, false)
  assert.deepEqual(manifest.platform.architectures, ["arm64"])
  assert.equal(downloadAccess(), "closed")
})
