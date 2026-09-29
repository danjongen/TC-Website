# Layout Points + Datum Label Studio: launch status

Status as of 2026-09-29: **website complete in preview, public release blocked.** The pages show "Join the release list". No file, checkout or production-ready claim is exposed.

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

## Gate status (0 of 21 passed)

All gates in the manifest are `blocked`. The ones that need you:

| Decision or input | Why it blocks | Default if you say nothing |
|---|---|---|
| Free public beta or paid | Decides checkout, entitlement, terms and schema offers | Free public beta (see below) |
| Publisher legal name and bundle identifier | Signing identity and Studio data paths | Technically Creative LLC, `agency.tc.datumlabelstudio` |
| Apple Developer credentials | Developer ID Application and Installer certificates, notarytool profile | None. Cannot proceed without them |
| Support inbox | Where support and release-list mail goes | `info@tc.agency` (existing contact inbox). Override with `LAYOUT_POINTS_SUPPORT_EMAIL` |
| Apple silicon only or Universal | Page copy and test matrix | Apple silicon only (already true, no extra test cost) |
| Legal text approval | EULA and third-party notices drafts in this folder | Not published until approved |
| Final approval to publish | `publication.approved` | Stays false |

## Commercial recommendation

- **Blind spot:** selling now means building entitlement, refunds and download protection for a product with zero verified Vectorworks versions and no physical print acceptance. Support cost will land before revenue does.
- **Recommendation:** ship a free public beta first, time-boxed (for example 90 days), with the release list as the funnel. Price the 1.0 once the acceptance matrix and real support volume are known. Reuse the Power Symbols Shopify flow for 1.0 rather than a new provider.
- **Why:** the release gates (signing, notarisation, host matrix, physical print) are the same either way; paid adds entitlement engineering, refund and webhook testing, and legal exposure on "fitness for purpose" for a survey-adjacent tool. Free beta gets field evidence faster and lets you quote real compatibility.
- **Risk:** beta users anchor on free. Mitigate by stating the beta end date and 1.0 pricing intent on the download page.
- **Confidence:** medium. I do not know your target volume or whether this is a lead magnet for TC services, which changes the answer.

Legal, tax and insurance flags: a paid tool used for set-out on live sites increases liability exposure; the EULA draft disclaims survey accuracy but have counsel confirm it for Michigan and for customers outside the US. Sales tax on digital goods varies by state and country; Shopify can collect it, a custom checkout cannot without extra work. Check that your professional liability or E&O cover extends to software products.

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
