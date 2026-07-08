// @ts-check
import { defineConfig } from 'astro/config'
import tailwindcss from '@tailwindcss/vite'

// This subproject builds the single static marketing page served at
// tc.agency/sslshelf. The root repo's `build` script runs this build first,
// emitting into the Next.js app's public/ dir (gitignored artifact), and a
// rewrite in next.config.mjs maps /sslshelf -> /sslshelf/index.html.
export default defineConfig({
  site: 'https://tc.agency',
  base: '/sslshelf',
  outDir: '../public/sslshelf',
  trailingSlash: 'never',
  build: {
    // Emit index.html at the outDir root so /sslshelf/index.html exists.
    format: 'file',
    assets: '_astro',
  },
  vite: {
    plugins: [tailwindcss()],
  },
})
