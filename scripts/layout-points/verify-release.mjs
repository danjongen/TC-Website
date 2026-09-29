#!/usr/bin/env node
// Verify every published Layout Points file against the release manifest.
//
//   node scripts/layout-points/verify-release.mjs            check the manifest only
//   node scripts/layout-points/verify-release.mjs --download download every file, check size and SHA-256
//
// Run with --download from a logged-out network location before approving
// publication and after every deploy. Exits non-zero on any mismatch.

import { createHash } from "node:crypto"
import { readFileSync } from "node:fs"
import { fileURLToPath } from "node:url"
import path from "node:path"

const here = path.dirname(fileURLToPath(import.meta.url))
const manifest = JSON.parse(readFileSync(path.join(here, "../../lib/layout-points/release-manifest.json"), "utf8"))
const download = process.argv.includes("--download")

const SHA = /^[a-f0-9]{64}$/
let failures = 0
const fail = (msg) => {
  failures += 1
  console.error(`FAIL  ${msg}`)
}
const ok = (msg) => console.log(`ok    ${msg}`)

const releases = []
for (const [id, c] of Object.entries(manifest.components)) {
  if (c.current) releases.push({ ...c.current, _slot: `${id} current` })
  for (const p of c.previous ?? []) releases.push({ ...p, _slot: `${id} previous` })
}

const blocked = manifest.gates.filter((g) => g.status !== "passed")
console.log(`Publication approved: ${manifest.publication.approved}`)
console.log(`Gates passed: ${manifest.gates.length - blocked.length}/${manifest.gates.length}`)
if (releases.length === 0) console.log("No releases recorded. Nothing to download.")

const seenUrls = new Map()
for (const r of releases) {
  const label = `${r._slot} ${r.version}`
  if (!SHA.test(r.sha256 ?? "")) fail(`${label}: bad SHA-256`)
  if (!(r.sizeBytes > 0)) fail(`${label}: missing size`)
  if (!String(r.url).startsWith("https://")) fail(`${label}: URL is not HTTPS`)
  if (!String(r.url).includes(r.version)) fail(`${label}: URL does not contain the version (not immutable)`)
  if (r.sourceDirty !== false) fail(`${label}: built from a dirty tree`)
  const prior = seenUrls.get(r.url)
  if (prior && prior !== r.sha256) fail(`${label}: same URL recorded with a different checksum`)
  seenUrls.set(r.url, r.sha256)

  if (!download) continue
  try {
    const res = await fetch(r.url, { redirect: "follow", headers: { "Cache-Control": "no-cache" } })
    if (!res.ok) {
      fail(`${label}: HTTP ${res.status} for ${r.url}`)
      continue
    }
    const bytes = Buffer.from(await res.arrayBuffer())
    const sha = createHash("sha256").update(bytes).digest("hex")
    if (bytes.length !== r.sizeBytes) fail(`${label}: size ${bytes.length} != manifest ${r.sizeBytes}`)
    if (sha !== r.sha256) fail(`${label}: SHA-256 ${sha} != manifest ${r.sha256}`)
    else ok(`${label}: ${bytes.length} bytes, SHA-256 matches`)
  } catch (err) {
    fail(`${label}: ${err instanceof Error ? err.message : err}`)
  }
}

if (failures > 0) {
  console.error(`\n${failures} problem(s).`)
  process.exit(1)
}
console.log("\nManifest checks passed.")
