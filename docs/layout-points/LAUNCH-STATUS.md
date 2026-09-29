# Layout Points + Datum Label Studio: launch status

Status as of 2026-09-29: **website approved for publication in release-list mode; paid beta sales and downloads blocked.** The pages show "Join the release list". No file, checkout or production-ready claim is exposed.

## Route map

| Route | Purpose |
|---|---|
| `/store` | Catalog: new "03 / SOFTWARE TOOL" card, ItemList now lists all three products |
| `/store/layout-points` | Product page: hero handoff sequence, five-cue workflow, what is included, what the checks prove, privacy, release list, FAQ |
| `/store/layout-points/download` | Two manifest-driven download panels, verification, install steps, setup-complete checklist, previous releases |
| `/store/layout-points/download/latest/[component]` | Latest link. 302 to the immutable current file, or back to the download page with `?error=` until a release is public |
| `/store/layout-points/docs` | All 20 documentation topics, anchored |
| `/store/layout-points/changelog` | Releases from the manifest, known issues |
| `/store/layout-points/support` | Topic index, support form with attachment, FAQ |
| `/api/layout-points/release-list` | Release-list sign-up (Resend) |
| `/api/layout-points/support` | Support request with optional 4 MB attachment (Resend) |

## Single source of truth

- `lib/layout-points/release-manifest.json`: every version, date, size, checksum, signature, notarisation and compatibility value. Pages never hardcode them.
- `lib/layout-points/release.ts`: validation. Downloads stay hidden unless approved, all gates pass, product facts are confirmed and both releases validate (Developer ID, notarised and stapled, clean tag, immutable HTTPS URL, verified Vectorworks versions, not 0.1.21).
- `lib/layout-points/product-facts.ts`: docs details that must be checked against the release build.

## Owner decisions (2026-09-29)

| Decision | Answer |
|---|---|
| Commercial model | **Paid beta.** Checkout stays closed until real entitlement is built and tested, and a price is set |
| Publisher | **Technically Creative LLC**, bundle identifier **`agency.tc.datumlabelstudio`** |
| Support inbox | **info@tc.agency** (security reports via `/security`) |
| Mac support | **Apple silicon only** |
| Website merge and publish | **Approved.** The site goes live in release-list mode. No files or checkout are exposed |
| Apple Developer credentials | Owner to enrol; see the Apple checklist in the paperwork set |
| Legal text | Drafts produced for the paid beta; owner reads before they go live and before the first sale |

Release approval (`publication.approved` in the manifest) stays **false**. It is a per-release sign-off given once a signed, notarised, tested build exists, not a blanket approval now.

## Gate status (3 of 21 passed)

Passed: commercial model, architecture labelling, support ownership. Still blocked, and who owns them:

| Blocker | Owner |
|---|---|
| Apple Developer Program enrolment, Developer ID Application and Installer certificates | Owner (Account Holder), then release engineering |
| Bundle identifier built into Datum Label Studio | Release engineering |
| Clean tags, new public version, hardened runtime, signing, notarisation, Gatekeeper verification | Release engineering |
| Layout Points rebuilt clean, internal checksums verified, guided installer | Release engineering |
| Vectorworks host matrix, end-to-end physical print, evidence | QA |
| EULA, terms of sale, notices, asset rights | Owner (read and approve drafts) |
| Paid entitlement in both apps, protected delivery, and payment-state tests | Engineering |
| Price | Owner |
| Hosted bytes match approved checksums | Release engineering |

## Paid beta delivery (to build before checkout opens)

Reuse the Power Symbols pattern already in this repo (`app/api/power-symbols/shopify/orders-paid`, `lib/power-symbols-license.ts`): Shopify order webhook, signed licence bound to the order and email, private download link by email. The manifest now models access: a paid beta never shows the file URL publicly (`downloadAccess()` returns `purchase` only with a price and a live checkout URL), and the Latest links never redirect to a file unless the release is a free public one. Still to build: the Layout Points webhook, licence issue and revocation on refund, protected download route with private storage, quick-start email, and tests for paid, refunded, duplicate webhook, failed payment and expired access.

## Product facts to confirm before publication

From `product-facts.ts` (unconfirmed items block publication):

- Installer name ("Layout Points Installer") and that it is guided
- Plug-in location per Vectorworks year
- Studio local data folder and preferences file (depends on bundle identifier)

Docs wording to check against the release build (not gated in code, check by reading):

- Workspace setup path: Tools > Workspaces > Edit Current Workspace, and which Menus category holds LP Export OneClick
- First Layout Point steps and where point type and numbering are set
- That the export is written atomically and uses a timestamped job folder name
- That the rollback tool restores the previously installed version
- That departments, label edits and printer corrections survive an update
- Calibration: "four frame gaps to each cut edge, two ruler lengths" and that corrections are saved per printer, stock and feed direction
- CSV/TSV import behaviour and whether column mapping is needed

## Evidence not yet on the site

This preview was built in a cloud session without access to `/Users/tcmbp/Documents/lp app`, so no real screenshots, checksums, versions or compatibility evidence are shown. The pages use captioned diagrams with sanitised sample data and render real captures automatically once imported:

```sh
scripts/layout-points/import-evidence.sh "/Users/tcmbp/Documents/lp app"
```

Review each image for client data before committing. The rendered calibration target is captioned as a render, not a physical print.

## Environment variables

| Variable | Needed for | Status |
|---|---|---|
| `RESEND_API_KEY` | Release list and support mail | Already set for the existing contact form |
| `LAYOUT_POINTS_SUPPORT_EMAIL` | Optional override of the support inbox | Optional |
| `RESEND_LAYOUT_POINTS_AUDIENCE_ID` | Store release-list contacts in their own audience | Optional. Without it, sign-ups arrive as emails only |
| `TURNSTILE_SECRET_KEY`, `NEXT_PUBLIC_TURNSTILE_SITE_KEY` | Bot protection on both forms | Reuses existing values |
| `UPSTASH_REDIS_REST_URL`, `UPSTASH_REDIS_REST_TOKEN` | Rate limiting across instances | Reuses existing values |

## Production deployment plan

1. Review the preview (desktop and mobile), the copy, and the legal drafts.
2. Merge this branch to the production branch. The site goes live in "release list" mode: pages, docs, support and sign-up only. No files.
3. Run the release runbook (`RELEASE-RUNBOOK.md`) for the first public version.
4. Update the manifest, confirm product facts, pass the gates, record owner approval.
5. Run tests, `verify-release.mjs --download`, and a production build. Deploy.
6. Verify from a logged-out browser: both downloads, checksums, `spctl` on the downloaded files, the Latest links.
