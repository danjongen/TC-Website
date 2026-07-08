# TC SSL Shelf marketing page

Single static page served at **tc.agency/sslshelf**. Built with Astro 5 and
Tailwind v4 per the TC web stack (Astro for marketing surfaces), with
self-hosted Space Mono and Inter and build-time AVIF/WebP imagery.

## How it deploys

This is a subproject of the main Next.js site. The root `npm run build`
first runs `build:sslshelf`, which builds this page into `public/sslshelf/`
(gitignored build artifact). A rewrite in `next.config.mjs` serves
`/sslshelf` from that static output. Nothing else about the main site
changes.

Local preview of just this page:

```bash
cd sslshelf
npm ci
npm run dev
# or: npm run build && npx serve ../public
```

## Swap in the real inputs

Two clearly-marked placeholders:

1. **Show photo (hero):** replace `src/assets/hero-show.jpg` with the real
   show photo (keep the filename, or update the import in
   `src/pages/index.astro`). AVIF/WebP variants and the OG image are
   regenerated on build.
2. **Buy link:** replace the `SHOPIFY_BUY_URL` constant at the top of
   `src/pages/index.astro` with the real Shopify product URL.

Headline options are listed in a comment next to the `<h1>` in
`src/pages/index.astro`.

## Notes

- Fonts are latin-subset woff2 from Fontsource (OFL, licenses alongside the
  files in `public/fonts/`), preloaded with `font-display: swap`.
- The hero photo loads eagerly with `fetchpriority=high` because it is the
  LCP element.
- `prefers-reduced-motion` disables smooth scroll and the buy-button hover
  transition.
