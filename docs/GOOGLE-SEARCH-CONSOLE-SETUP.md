# Google Search Console Setup Guide

Complete guide to verify your site, submit sitemaps, and ensure Google indexing for tc.agency.

## Step 1: Verify Site Ownership

### Option A: HTML Meta Tag Verification (Recommended)

1. **Go to Google Search Console**
   - Visit: https://search.google.com/search-console
   - Sign in with your Google account

2. **Add Property**
   - Click "Add Property"
   - Select "URL prefix"
   - Enter: `https://tc.agency`
   - Click "Continue"

3. **Choose Verification Method**
   - Select "HTML tag" method
   - Copy the verification code (looks like: `google-site-verification=ABC123xyz...`)

4. **Add to Your Site**
   - Open `/app/layout.tsx`
   - Find line 114:
   ```tsx
   verification: {
     google: "ADD_YOUR_GOOGLE_VERIFICATION_CODE_HERE",
   },
   ```
   - Replace with your code:
   ```tsx
   verification: {
     google: "YOUR_VERIFICATION_CODE_HERE", // Paste the code (without the meta tag wrapper)
   },
   ```

5. **Deploy and Verify**
   - Commit and push changes
   - Wait for deployment to complete
   - Return to Search Console
   - Click "Verify"
   - You should see "Ownership verified" ✓

### Option B: DNS Verification (Alternative)

1. In Search Console, select "Domain" property type
2. Enter: `tc.agency`
3. Copy the TXT record provided
4. Add to your DNS settings (via your domain registrar or Vercel DNS)
5. Wait 5-10 minutes for DNS propagation
6. Click "Verify"

### Option C: Google Analytics Verification

1. If Google Analytics is already installed (it is on your site)
2. Search Console may auto-verify using your GA account
3. Check "Settings" > "Users and permissions" for auto-verification

## Step 2: Submit Sitemap

1. **Navigate to Sitemaps**
   - In Search Console, click "Sitemaps" in the left sidebar

2. **Submit Your Sitemap**
   - Enter: `sitemap.xml`
   - Click "Submit"

3. **Verify Sitemap Status**
   - Status should show "Success" within a few minutes
   - "Discovered URLs" should show your page count (currently 25+ pages)

Your sitemap is automatically generated at:
- **URL**: `https://tc.agency/sitemap.xml`
- **Source**: `/app/sitemap.ts`
- **Format**: Next.js MetadataRoute.Sitemap (XML)

## Step 3: Request Indexing

### For Priority Pages

1. **Navigate to URL Inspection**
   - Click "URL Inspection" in Search Console

2. **Inspect Critical URLs**
   Priority pages to request indexing:
   - `https://tc.agency/` (Homepage)
   - `https://tc.agency/about` (About page)
   - `https://tc.agency/portfolio` (Portfolio)
   - `https://tc.agency/capabilities` (Capabilities)
   - `https://tc.agency/contact` (Contact)

3. **Request Indexing**
   - Paste URL in inspection bar
   - Click "Request Indexing"
   - Wait for crawl (can take 1-7 days)

### Bulk Indexing via Sitemap

Google will automatically crawl all URLs in your sitemap. No manual action needed for all 25+ pages.

## Step 4: Monitor Indexing Status

### Check Index Coverage

1. **Go to "Index" > "Pages"**
   - View indexed vs. non-indexed pages
   - Check for errors or warnings

2. **Expected Results**
   - All 25+ pages should be indexed within 1-2 weeks
   - Legal pages (privacy, terms) may index slower (lower priority)

3. **Troubleshoot Issues**
   - If pages show "Discovered - currently not indexed":
     - Normal for new sites (be patient)
     - Improve page content and internal linking
   - If pages show "Excluded" or errors:
     - Check robots.txt: `https://tc.agency/robots.txt`
     - Verify no `noindex` meta tags
     - Check for crawl errors

### Monitor Performance

1. **Performance Report**
   - Click "Performance" in Search Console
   - View clicks, impressions, CTR, and position
   - Data appears after 2-3 days of indexing

2. **Search Queries**
   - Monitor which keywords drive traffic
   - Optimize content based on queries

## Step 5: Fix Any Issues

### Common Issues and Solutions

#### Issue: "Page is not indexed"
**Solution:**
- Request indexing via URL Inspection
- Ensure page has quality content (300+ words)
- Add internal links to the page from high-authority pages

#### Issue: "Crawled - currently not indexed"
**Solution:**
- Improve page quality and uniqueness
- Add more content and multimedia
- Build internal links to the page
- Be patient (can take weeks for low-priority pages)

#### Issue: "Blocked by robots.txt"
**Solution:**
- Check `/app/robots.ts` (line 9)
- Ensure page URL isn't in `disallow` array
- Currently blocked: `/api/`, `/thank-you`, `/portfolio/preview`, `/insights/preview`, `/unsubscribe`

#### Issue: "Soft 404"
**Solution:**
- Ensure page returns proper content
- Add more substantial content to the page
- Verify page returns 200 status code (not 404)

## Step 6: Enhance SEO

### Optimize for Rich Results

Your site already has:
- ✅ Organization schema (schema-org.tsx)
- ✅ Person schema (Daniel Jongen)
- ✅ FAQPage schema
- ✅ ProfessionalService schema
- ✅ Open Graph tags
- ✅ Twitter Card tags

**Test Rich Results:**
1. Visit: https://search.google.com/test/rich-results
2. Enter: `https://tc.agency`
3. Verify schema passes validation

### Improve Core Web Vitals

1. **In Search Console**
   - Go to "Experience" > "Core Web Vitals"
   - Check mobile and desktop performance

2. **Your Site Already Has:**
   - Vercel Speed Insights enabled
   - Vercel Analytics enabled
   - Optimized fonts (preload, swap)
   - Optimized images (assuming next/image is used)

3. **Monitor PageSpeed**
   - Visit: https://pagespeed.web.dev/
   - Test: `https://tc.agency`
   - Aim for 90+ score on both mobile and desktop

## Step 7: Set Up Enhanced Tracking

### Google Analytics 4 Integration

Your site has Analytics components. To complete setup:

1. **Get GA4 Measurement ID**
   - Go to: https://analytics.google.com
   - Create property for "tc.agency"
   - Copy Measurement ID (format: G-XXXXXXXXXX)

2. **Add to Environment Variables**
   - In Vercel dashboard: Settings > Environment Variables
   - Add:
     ```
     NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
     ```

3. **Update Analytics Component**
   - Check `/components/analytics.tsx`
   - Ensure it uses the environment variable

### Microsoft Clarity (Optional)

Already configured (DNS prefetch in layout.tsx, line 144). To enable:

1. Go to: https://clarity.microsoft.com
2. Create project for tc.agency
3. Add tracking code to site

### Search Console API Access (Advanced)

For automated reporting:

1. Go to Google Cloud Console
2. Enable Search Console API
3. Create service account
4. Grant access in Search Console settings

## Step 8: Ongoing Monitoring

### Weekly Tasks

- [ ] Check Search Console for new errors
- [ ] Review "Coverage" report for indexing issues
- [ ] Monitor "Performance" for traffic trends

### Monthly Tasks

- [ ] Review top-performing pages
- [ ] Check Core Web Vitals
- [ ] Analyze search queries and optimize content
- [ ] Review and fix any crawl errors
- [ ] Update sitemap if you add new pages (automatic with Next.js)

### Quarterly Tasks

- [ ] Audit entire site for SEO issues
- [ ] Update meta descriptions and titles
- [ ] Check for broken links
- [ ] Review and update schema.org data
- [ ] Analyze competitor rankings

## Checklist: Post-Launch SEO

After going live, complete this checklist:

- [ ] Verify site ownership in Google Search Console
- [ ] Submit sitemap.xml
- [ ] Request indexing for top 10 priority pages
- [ ] Verify robots.txt is accessible
- [ ] Test structured data with Rich Results Tool
- [ ] Set up Google Analytics 4
- [ ] Check mobile-friendliness: https://search.google.com/test/mobile-friendly
- [ ] Run PageSpeed Insights test
- [ ] Set up monitoring alerts in Search Console
- [ ] Configure Vercel Analytics (already done)
- [ ] Add site to Bing Webmaster Tools (optional)
- [ ] Create Google Business Profile (if applicable)

## Expected Timeline

| Milestone | Timeline |
|-----------|----------|
| Site verification | Immediate |
| Sitemap submission | Immediate |
| First crawl | 1-3 days |
| First pages indexed | 3-7 days |
| Full site indexed | 1-4 weeks |
| Ranking improvements | 4-12 weeks |
| Rich results appearing | 2-6 weeks |

## Support Resources

- **Search Console Help**: https://support.google.com/webmasters
- **SEO Starter Guide**: https://developers.google.com/search/docs/fundamentals/seo-starter-guide
- **Schema.org Docs**: https://schema.org/docs/documents.html
- **Next.js SEO**: https://nextjs.org/learn/seo/introduction-to-seo

## Troubleshooting Contact

If you encounter issues:

1. Check Search Console "Coverage" report
2. Use URL Inspection tool for specific pages
3. Review Vercel deployment logs
4. Check DNS settings in domain registrar
5. Verify all environment variables are set

---

**Note**: Update the Google verification code in `/app/layout.tsx` (line 114) before deploying to production.
