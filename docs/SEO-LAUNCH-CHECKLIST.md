# SEO Launch Checklist for tc.agency

Print this checklist and complete each item before and after launch.

## ⚙️ Pre-Launch Technical SEO (Complete Before Going Live)

### Sitemap & Robots

- [ ] Verify sitemap generates correctly
  - Visit (locally): `http://localhost:3000/sitemap.xml`
  - Should show 25+ URLs in XML format
  - File location: `/app/sitemap.ts`

- [ ] Verify robots.txt generates correctly
  - Visit (locally): `http://localhost:3000/robots.txt`
  - Should allow crawling: `Allow: /`
  - Should reference sitemap: `Sitemap: https://tc.agency/sitemap.xml`
  - File location: `/app/robots.ts`

- [ ] Check robots.txt disallow rules
  - Confirm `/api/` is blocked (correct)
  - Confirm preview pages blocked (correct)
  - No accidentally blocked important pages

### Meta Tags & Metadata

- [ ] Verify meta title and description on all key pages
  - Homepage: Contains primary keywords
  - About pages: Unique descriptions
  - Portfolio: Showcases work
  - Services: Service-specific keywords
  - Contact: Includes location/CTA

- [ ] Check meta tags in `/app/layout.tsx`
  - Title template set correctly (line 35-37)
  - Description is compelling (line 39-40)
  - Keywords included (line 41-62)
  - Authors listed (line 63)

- [ ] Verify Open Graph tags
  - og:title, og:description present (lines 76-78)
  - og:image set and exists: `/public/og-image.png` (1200x630px)
  - og:url uses correct domain: `https://tc.agency`
  - og:type is "website" (line 72)

- [ ] Verify Twitter Card tags
  - twitter:card is "summary_large_image" (line 89)
  - twitter:site and twitter:creator set (lines 90-91)
  - twitter:image exists (line 95)

- [ ] Check canonical URLs
  - Point to production domain: `https://tc.agency`
  - No hardcoded localhost or staging URLs
  - Line 69 in layout.tsx

### Structured Data (JSON-LD)

- [ ] Verify Organization schema exists
  - File: `/components/schema-org.tsx`
  - Check lines 8-64
  - Update company info if needed

- [ ] Verify Person schema (Daniel Jongen)
  - Check lines 65-89 in schema-org.tsx
  - Update bio/description if needed
  - Verify social links are correct

- [ ] Verify FAQ schema
  - Check lines 90-134 in schema-org.tsx
  - Update Q&A if needed

- [ ] Test structured data validity
  - Use Rich Results Test: https://search.google.com/test/rich-results
  - Test locally or staging first
  - Fix any validation errors

### Performance & Technical

- [ ] Verify all pages return 200 status codes
  - Test homepage, about, portfolio, services, contact
  - No 404 or 500 errors

- [ ] Check mobile responsiveness
  - Test on iPhone, Android
  - Use Chrome DevTools mobile emulator
  - Verify mobile-friendly test: https://search.google.com/test/mobile-friendly

- [ ] Verify page load speed
  - Target: < 3 seconds on 4G
  - Use Lighthouse in Chrome DevTools
  - Aim for 90+ score

- [ ] Check HTTPS is enforced
  - All pages redirect HTTP → HTTPS
  - No mixed content warnings

- [ ] Verify font loading optimization
  - Fonts use `display: swap` (lines 21, 29 in layout.tsx)
  - Fonts preloaded (lines 22, 30)

### Content & Links

- [ ] All internal links use correct domain
  - No hardcoded `localhost` or staging URLs
  - Relative URLs preferred: `/about` vs `https://tc.agency/about`

- [ ] All images have alt text
  - Descriptive, keyword-rich where appropriate
  - Helps accessibility and SEO

- [ ] Check for duplicate content
  - Each page has unique title and description
  - No copy-pasted content across pages

- [ ] Verify heading hierarchy
  - Each page has one H1
  - Proper H2, H3, H4 structure
  - No skipped heading levels

## 🚀 Launch Day (Deploy to Production)

### Deployment

- [ ] Deploy to production (Vercel)
  - Push to main branch or deploy via Vercel dashboard
  - Verify deployment succeeds
  - No build errors

- [ ] Verify DNS is pointing to production
  - `tc.agency` resolves to Vercel
  - `www.tc.agency` redirects to `tc.agency` (if applicable)

- [ ] Test production URLs
  - Homepage loads: `https://tc.agency`
  - Sitemap loads: `https://tc.agency/sitemap.xml`
  - Robots.txt loads: `https://tc.agency/robots.txt`

### Immediate Post-Launch

- [ ] Test all critical pages live
  - Homepage, About, Portfolio, Services, Contact
  - Check for any broken links or images

- [ ] Verify Analytics tracking
  - Google Analytics installed (check `/components/analytics.tsx`)
  - Vercel Analytics active (line 159 in layout.tsx)
  - Vercel Speed Insights active (line 160)

- [ ] Check for any console errors
  - Open browser DevTools
  - Look for JavaScript errors
  - Fix any critical issues

## 📊 Google Search Console Setup (Within 24 Hours)

### Verification

- [ ] Go to Google Search Console
  - URL: https://search.google.com/search-console
  - Sign in with Google account

- [ ] Add property for tc.agency
  - Use "URL prefix" method
  - Enter: `https://tc.agency`

- [ ] Verify ownership
  - **Recommended:** HTML meta tag method
  - Copy verification code from Search Console
  - Add to `/app/layout.tsx` line 114:
    ```tsx
    google: "paste-your-code-here",
    ```
  - Redeploy site
  - Click "Verify" in Search Console

- [ ] Alternative: DNS verification
  - Add TXT record to domain DNS
  - Wait 5-10 minutes
  - Click "Verify"

### Sitemap Submission

- [ ] Submit sitemap in Search Console
  - Go to: Sitemaps section
  - Enter: `sitemap.xml`
  - Click "Submit"

- [ ] Verify sitemap status
  - Should show "Success" within minutes
  - "Discovered URLs" count should match your pages (25+)

- [ ] Check for sitemap errors
  - If errors appear, investigate and fix
  - Common: unreachable URLs, formatting issues

### Request Indexing (Priority Pages)

- [ ] Use URL Inspection tool for top 10 pages
  - Homepage: `https://tc.agency/`
  - About: `https://tc.agency/about`
  - About Daniel: `https://tc.agency/about-daniel`
  - Mission: `https://tc.agency/mission`
  - Capabilities: `https://tc.agency/capabilities`
  - Portfolio: `https://tc.agency/portfolio`
  - Insights: `https://tc.agency/insights`
  - Services (main): `https://tc.agency/services`
  - Contact: `https://tc.agency/contact`
  - Any top service or portfolio page

- [ ] Click "Request Indexing" for each
  - Limit: ~10-20 per day
  - Prioritizes pages for crawling

## 📈 Week 1 Post-Launch

### Monitoring

- [ ] Check Search Console daily
  - Look for coverage errors
  - Monitor index status

- [ ] Verify Googlebot is crawling
  - Check "Settings" > "Crawl stats"
  - Should see activity within 2-3 days

- [ ] Test site: search on Google
  - Search: `site:tc.agency`
  - Should start showing results by day 3-7

- [ ] Monitor Core Web Vitals
  - Check "Experience" > "Core Web Vitals"
  - Ensure no critical issues

- [ ] Check for manual actions
  - "Security & Manual Actions" section
  - Should show: "No issues detected"

### SEO Health

- [ ] Run PageSpeed Insights test
  - URL: https://pagespeed.web.dev/
  - Test: `https://tc.agency`
  - Aim for 90+ on mobile and desktop

- [ ] Verify mobile-friendliness
  - URL: https://search.google.com/test/mobile-friendly
  - Should pass with no issues

- [ ] Test rich results
  - URL: https://search.google.com/test/rich-results
  - Should validate Organization, Person, FAQ schemas

- [ ] Check HTTPS/SSL certificate
  - Should show padlock in browser
  - Valid SSL certificate from Vercel

### Content & Social

- [ ] Share site on social media
  - LinkedIn, Twitter, Instagram
  - Helps discovery and indexing

- [ ] Create initial backlinks
  - LinkedIn company page → website
  - Social profiles → website
  - Any press mentions or directories

- [ ] Submit to industry directories (optional)
  - Relevant technical/production directories
  - Local business directories

## 📅 Week 2-4 Post-Launch

### Indexing Progress

- [ ] Check index coverage weekly
  - Search Console > Index > Pages
  - Count should increase toward 25+ pages

- [ ] Monitor for indexing errors
  - Fix any "Error" status pages
  - Investigate "Excluded" pages

- [ ] Verify all priority pages indexed
  - Use `site:tc.agency inurl:page-name` searches
  - Request re-indexing if needed

### Performance Monitoring

- [ ] Review Search Console Performance data
  - Check impressions and clicks (appears after ~1 week)
  - Note top performing queries
  - Identify opportunities

- [ ] Monitor organic traffic in Analytics
  - Check Google Analytics for organic sessions
  - Track goal completions (contact form, etc.)

- [ ] Check Vercel Analytics
  - Monitor page views
  - Check top pages and referrers

### Optimization

- [ ] Review search queries in Search Console
  - See what people search to find you
  - Optimize content for those keywords

- [ ] Update content based on insights
  - Improve underperforming pages
  - Expand high-performing content

- [ ] Build more internal links
  - Link from high-authority pages to others
  - Helps distribute page authority

## ✅ Ongoing Monthly Tasks

- [ ] Check Search Console for new errors (weekly)
- [ ] Review Performance report for trends (weekly)
- [ ] Monitor Core Web Vitals (monthly)
- [ ] Update sitemap if adding new pages (automatic with Next.js!)
- [ ] Audit content for freshness (monthly)
- [ ] Check for broken links (monthly)
- [ ] Review and update meta descriptions (quarterly)
- [ ] Test rich results validation (quarterly)
- [ ] Competitive analysis (quarterly)

## 🎯 Success Metrics (4-12 Weeks)

Track these metrics to measure SEO success:

- [ ] All 25+ pages indexed in Google
- [ ] `site:tc.agency` shows full site
- [ ] Homepage ranks #1 for "TC Agency"
- [ ] Homepage ranks #1 for "Technically Creative"
- [ ] Top 10 for "Daniel Jongen Technical Director"
- [ ] Organic traffic > 100 sessions/month
- [ ] Core Web Vitals all "Good" (green)
- [ ] Rich results appearing in search (Organization, FAQ)
- [ ] Zero errors in Search Console
- [ ] PageSpeed score 90+ on mobile and desktop

## 🆘 Troubleshooting Resources

If issues arise:

- [ ] **Search Console Help Center**
  - https://support.google.com/webmasters

- [ ] **Google Search Central Community**
  - https://support.google.com/webmasters/community

- [ ] **SEO Starter Guide**
  - https://developers.google.com/search/docs/fundamentals/seo-starter-guide

- [ ] **Next.js SEO Docs**
  - https://nextjs.org/learn/seo/introduction-to-seo

- [ ] **Schema.org Documentation**
  - https://schema.org/docs/documents.html

## 📝 Notes

**Site Information:**
- Domain: `tc.agency`
- Sitemap: `https://tc.agency/sitemap.xml`
- Robots: `https://tc.agency/robots.txt`
- Expected indexed pages: 25+
- Primary keywords: Technical Direction, Production Engineering, Daniel Jongen

**Files to Update:**
- Google verification: `/app/layout.tsx` (line 114)
- Analytics setup: `/components/analytics.tsx`
- Schema data: `/components/schema-org.tsx`

---

**Prepared by:** Claude
**Date:** 2025-01-16
**Site:** tc.agency
**Framework:** Next.js 14+ with App Router
