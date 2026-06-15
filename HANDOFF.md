# TC Website — Handoff & Access Notes

_Last updated: 15 June 2026_

Everything for the tc.agency website lives in the cloud. Nothing important is
stored on any single computer. If you switch machines, you do not need to back
anything up locally.

## Where everything lives

- **Website code:** GitHub repo `danjongen/TC-Website` (all work is committed and pushed).
- **Live site, deployments, env vars, domains:** Vercel, team `tcbuild`, project `v0-tc-web-v2`.
- **Claude Code sessions and history:** tied to your Claude account (daniel@techcreative.com.au), not the device.

## On a new computer

1. Sign in to Claude Code on the web (claude.ai/code) or the app with the same
   account: **daniel@techcreative.com.au**. Your history comes with the account.
2. Be able to log into **GitHub** (danjongen) and **Vercel** (tcbuild team). Both
   are browser based; have passwords / 2FA ready.
3. Connected integrations (Vercel, GitHub, Google Drive, etc.) are linked to your
   Claude account and reconnect automatically.

## Optional: local copy of the code

You do not need this to keep working with Claude, but if you want it:

```
git clone https://github.com/danjongen/TC-Website.git
```

## How the site is structured (current state)

- **Home:** point-cloud hero (Backstreet Boys / Sphere photography), services, clients, contact CTA.
- **Portfolio:** a visual gallery of real Sphere production photography. No fabricated case studies.
- **Insights:** two real articles only.
  - `What Technically Creative Does` (the offering)
  - `Powering a Flying Stage Element in an RF Nightmare` (BSB case study)
- **LED Spec Tool:** at `/led`, gated by the `LED_TOOL_PASSWORD` env var in Vercel.

## Deploys

- Production deploys from the branch `claude/boutique-powerhouse-website-011CUu9P6mxvSk81Bw1JcXrJ`.
- Note: the GitHub to Vercel webhook has intermittently missed merges. If a merge
  does not go live, push an empty commit to the production branch to trigger a build.

## Still open (owner action)

- **Contact form:** submit it once for real to confirm email delivery via Resend.
- **Phone number:** confirm or correct the listed +1 313 261 5200.
- **Portfolio:** send real photos from other gigs to expand the gallery (no invented projects).
- **Optional:** remove the leftover `PREVIEW_SECRET` env var in Vercel; resubmit the
  sitemap in Google Search Console.
