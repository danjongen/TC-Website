# TC Agency Performance Guidelines

This document establishes performance rules and best practices for the TC Agency website to maintain optimal Core Web Vitals and Vercel deployment efficiency.

---

## 1. Static Generation & ISR Rules

### Static Pages (Must Always Be Static)
These pages should **never** use `export const dynamic = 'force-dynamic'`:

- `/` (Homepage)
- `/about`
- `/about-daniel`
- `/mission`
- `/approach`
- `/capabilities`
- `/services/*` (All service pages: consulting, automation, unreal-engine, 3d-scanning)
- `/accessibility`
- `/privacy-policy`
- `/terms-of-service`
- `/cookie-policy`
- `/security`
- `/do-not-sell`

**Why:** These pages have stable content and benefit from static generation for instant load times and optimal SEO.

### Dynamic Pages (Allowed)
Only these pages may use dynamic rendering:

- `/contact` (form submission handling)
- `/thank-you` (post-form confirmation)
- `/unsubscribe` (email management)
- `/portfolio/[slug]` (if fetching real-time data)
- `/insights/[slug]` (if fetching real-time data)

**Preview pages** (`/portfolio/preview`, `/insights/preview`) should remain static with client-side key validation.

---

## 2. Data Fetching & Caching

### Default Fetch Behavior
\`\`\`typescript
// ✅ GOOD: Static pages with long cache
fetch('https://api.example.com/data', {
  next: { revalidate: 3600 } // 1 hour ISR
})

// ✅ GOOD: Stable data that rarely changes
fetch('https://api.example.com/services', {
  next: { revalidate: 86400 } // 24 hours ISR
})
\`\`\`

### When to Use `no-store`
Only use `cache: 'no-store'` for:
- User-specific data (e.g., form submissions, authentication)
- Real-time data that changes frequently (e.g., live event status)
- Preview/draft content

\`\`\`typescript
// ⚠️ USE SPARINGLY: Dynamic contact form
fetch('https://api.example.com/contact', {
  method: 'POST',
  cache: 'no-store'
})
\`\`\`

### Prohibited Patterns
\`\`\`typescript
// ❌ BAD: Unnecessary force-dynamic
export const dynamic = 'force-dynamic'

// ❌ BAD: Default no-store on static pages
fetch('https://api.example.com/data', { cache: 'no-store' })
\`\`\`

---

## 3. Image Optimization Rules

### Hero Video/Image
The hero component uses a large video file. Follow these rules:

\`\`\`tsx
// ✅ GOOD: Lazy-load video on mobile
{!isMobile && (
  <video
    ref={videoRef}
    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/TC_TL_INTRA-ZKLgdJRVRbUbQYPAfBBunXwcuIseGG.mp4"
    muted
    playsInline
    preload="auto"
    crossOrigin="anonymous"
  />
)}
\`\`\`

### Next.js Image Component
Always use `next/image` for static images:

\`\`\`tsx
// ✅ GOOD: Optimized with priority for LCP
<Image
  src="/images/hero-bg.jpg"
  alt="TC Production Engineering Setup"
  width={1920}
  height={1080}
  priority // For above-the-fold images
  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
/>

// ✅ GOOD: Lazy-load below-the-fold images
<Image
  src="/images/project-1.jpg"
  alt="Project thumbnail"
  width={800}
  height={600}
  loading="lazy"
  sizes="(max-width: 768px) 100vw, 50vw"
/>
\`\`\`

### Image Rules Checklist
- [ ] Above-the-fold images have `priority` prop
- [ ] All images have explicit `width` and `height`
- [ ] All images have descriptive `alt` text
- [ ] Use `sizes` prop for responsive images
- [ ] Below-the-fold images use `loading="lazy"`
- [ ] Hero video is hidden on mobile (`isMobile` check)

---

## 4. Script Loading Rules

### Analytics & Third-Party Scripts
Load non-critical scripts with `defer` or use Next.js `<Script>` component:

\`\`\`tsx
// ✅ GOOD: Deferred analytics (already implemented in layout.tsx)
import { Analytics } from "@vercel/analytics/react"
import { SpeedInsights } from "@vercel/speed-insights/next"

// ✅ GOOD: Third-party scripts with strategy
<Script
  src="https://www.googletagmanager.com/gtag/js"
  strategy="afterInteractive"
/>
\`\`\`

### Script Loading Priorities
1. **Critical (Blocking):** None – avoid at all costs
2. **High Priority (`beforeInteractive`):** Font preloads only
3. **Medium Priority (`afterInteractive`):** Analytics, Clarity
4. **Low Priority (`lazyOnload`):** Chat widgets, social embeds

### Prohibited Patterns
\`\`\`tsx
// ❌ BAD: Blocking script in <head>
<script src="https://cdn.example.com/widget.js"></script>

// ❌ BAD: Inline scripts that block rendering
<script dangerouslySetInnerHTML={{ __html: `...` }} />
\`\`\`

---

## 5. Bundle Size & Code Splitting

### Client Components
Minimize client-side JavaScript by keeping components Server Components by default:

\`\`\`tsx
// ✅ GOOD: Server Component (default)
export default function AboutPage() {
  return <div>Static content</div>
}

// ⚠️ USE ONLY WHEN NEEDED: Client Component
'use client'
export function InteractiveForm() {
  const [state, setState] = useState()
  // ... interactive logic
}
\`\`\`

### Dynamic Imports
Use dynamic imports for heavy client components:

\`\`\`tsx
// ✅ GOOD: Lazy-load non-critical components
const HeavyChart = dynamic(() => import('@/components/heavy-chart'), {
  loading: () => <div>Loading chart...</div>,
  ssr: false // Disable SSR if not needed
})
\`\`\`

---

## 6. Core Web Vitals Targets

Monitor these metrics in Vercel Analytics:

| Metric | Target | Current |
|--------|--------|---------|
| **LCP** (Largest Contentful Paint) | < 2.5s | Monitor |
| **FID** (First Input Delay) | < 100ms | Monitor |
| **CLS** (Cumulative Layout Shift) | < 0.1 | Monitor |
| **FCP** (First Contentful Paint) | < 1.8s | Monitor |
| **TTFB** (Time to First Byte) | < 600ms | Monitor |

### How to Maintain Good Scores
- Keep homepage static (no `force-dynamic`)
- Prioritize hero image/video loading
- Avoid layout shifts (explicit dimensions on images/videos)
- Minimize client-side JavaScript
- Use font `display: swap` (already configured)

---

## 7. Pre-Deployment Checklist

Before deploying changes, verify:

- [ ] No `export const dynamic = 'force-dynamic'` on static pages
- [ ] No `cache: 'no-store'` on static data fetches
- [ ] Hero video hidden on mobile
- [ ] Above-the-fold images have `priority` prop
- [ ] All images have `width`, `height`, and `alt`
- [ ] Third-party scripts use `strategy` prop
- [ ] Client components are minimized
- [ ] Bundle size increase is justified

---

## 8. Performance Monitoring

### Tools
- **Vercel Analytics:** Real-user Core Web Vitals
- **Vercel Speed Insights:** Detailed performance metrics
- **Google PageSpeed Insights:** Lab and field data
- **Lighthouse:** Local performance audits

### Alerts
Set up alerts in Vercel Dashboard for:
- LCP > 2.5s on any page
- CLS > 0.1 on any page
- Build time > 2 minutes

---

## Questions?

For questions about these guidelines, contact the development team or reference:
- [Next.js Performance Docs](https://nextjs.org/docs/app/building-your-application/optimizing)
- [Vercel Best Practices](https://vercel.com/docs/concepts/edge-network/caching)
