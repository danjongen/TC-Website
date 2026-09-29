# Layout Points + Datum Label Studio: release runbook

How a build becomes a public download on tc.agency. Every step leaves evidence. Nothing is published until `isPublicDownloadEnabled()` in `lib/layout-points/release.ts` returns true, which needs owner approval, all 21 gates passed, every product fact confirmed and a valid release record for both components.

## 1. Choose the version

- Pick a new public version, for example `0.2.0`. Never reuse internal `0.1.21` (the validator rejects it).
- Tag both repositories from clean, committed trees: `git status --porcelain` must print nothing.
- Record the tag names. They go in `sourceTag`.

## 2. Build Datum Label Studio

Prerequisites (owner): Apple Developer Program membership, a **Developer ID Application** certificate, the publisher-owned bundle identifier `agency.tc.datumlabelstudio` (decided), and an App Store Connect API key or app-specific password for `notarytool`.

```sh
# Hardened runtime + Developer ID signature (replace TEAMID and paths)
codesign --force --timestamp --options runtime \
  --entitlements Entitlements.plist \
  --sign "Developer ID Application: Technically Creative LLC (TEAMID)" \
  "Datum Label Studio.app"

codesign --verify --deep --strict --verbose=2 "Datum Label Studio.app"

# Package, notarise, staple
hdiutil create -volname "Datum Label Studio" -srcfolder "Datum Label Studio.app" -ov -format UDZO "Datum-Label-Studio-0.2.0.dmg"
codesign --timestamp --sign "Developer ID Application: Technically Creative LLC (TEAMID)" "Datum-Label-Studio-0.2.0.dmg"
xcrun notarytool submit "Datum-Label-Studio-0.2.0.dmg" --keychain-profile "tc-notary" --wait
xcrun stapler staple "Datum-Label-Studio-0.2.0.dmg"
```

Architecture: Apple silicon only (owner decision, 2026-09-29). Build arm64 and record `"architecture": "arm64"`.

## 3. Build Layout Points

- Rebuild from the tag. The build record must show `source_dirty: false`.
- Verify every internal manifest and adjacent checksum file.
- Sign from the inside out: the plug-in and every helper tool (status, rollback, uninstall) with **Developer ID Application**, hardened runtime on executables and a secure timestamp.
- Vectorworks 2026 and later disable locked (encrypted) or SDK plug-ins that lack a Vectorworks-issued credentials file. Request it from Vectorworks developer support in the name of Technically Creative LLC, once per supported Vectorworks version, and ship it with the plug-in. It identifies the developer; it is not an endorsement.
- Package the guided installer as a flat `.pkg`, signed with **Developer ID Installer**, notarised and stapled:

```sh
productsign --timestamp --sign "Developer ID Installer: Technically Creative LLC (TEAMID)" \
  Layout-Points-unsigned.pkg Layout-Points-0.2.0.pkg
xcrun notarytool submit Layout-Points-0.2.0.pkg --keychain-profile "tc-notary" --wait
xcrun stapler staple Layout-Points-0.2.0.pkg
pkgutil --check-signature Layout-Points-0.2.0.pkg
```

The installer must: ask which Vectorworks year(s), refuse to run while Vectorworks is open, keep a rollback copy of the previous version, and ship the status, rollback and uninstall tools. A first-time customer never uses Terminal.

## 4. Test before hosting

- Host acceptance matrix: for every Vectorworks year you will claim, install from the signed `.pkg` on a clean user account, place, number and export. Record pass or fail per year. Only passing years go in `vectorworksVersions`.
- End to end: place points, export, open in Studio, calibrate, print the correction, measure a real label. Keep evidence that separates three things: software success, print submitted, physical measurement.

## 5. Host immutably

Use Vercel Blob (already used by this site) or another HTTPS store that never overwrites:

- Path includes the version: `layout-points/0.2.0/Datum-Label-Studio-0.2.0.dmg`.
- Upload with overwrite disabled and no random suffix. Never upload a different file to a published path.
- A "Latest" link is `/store/layout-points/download/latest/<component>`, which 302s to the current immutable URL. It is generated from the manifest; do not create other mutable links.

## 6. Verify the hosted bytes (logged-out machine)

```sh
curl -fL -o /tmp/dls.dmg "<immutable URL>"
shasum -a 256 /tmp/dls.dmg                         # must equal manifest sha256
hdiutil attach /tmp/dls.dmg
codesign --verify --deep --strict --verbose=2 "/Volumes/Datum Label Studio/Datum Label Studio.app"
spctl --assess --type execute --verbose=4 "/Volumes/Datum Label Studio/Datum Label Studio.app"   # "accepted source=Notarized Developer ID"
xcrun stapler validate /tmp/dls.dmg

curl -fL -o /tmp/lp.pkg "<immutable URL>"
shasum -a 256 /tmp/lp.pkg
spctl --assess --type install --verbose=4 /tmp/lp.pkg
xcrun stapler validate /tmp/lp.pkg
```

Save the full output of each command as release evidence.

## 7. Record the release

Edit `lib/layout-points/release-manifest.json`:

- Fill `components.<id>.current` with every field of the `Release` type. Move the old current into `previous`.
- Set each gate's `status` to `passed` only with evidence.
- Confirm each entry in `lib/layout-points/product-facts.ts` against the tagged build and set `confirmed: true`.
- Set `publication.commercialModel` and, only after owner sign-off, `publication.approved: true`, `approvedBy`, `approvedAt`.

Then:

```sh
npx tsx --test lib/__tests__/layout-points-release.test.ts
node scripts/layout-points/verify-release.mjs --download
pnpm build
```

## 8. Deploy

Merge to the production branch only with owner approval. After deploy, run `verify-release.mjs --download` again against production and open both downloads in a logged-out browser.
