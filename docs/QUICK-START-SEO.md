# Quick Start: Google Indexing for tc.agency

**5-minute setup guide** to get your site indexed by Google.

## ✅ What's Already Done

Your site already has everything needed for Google indexing:

- ✅ **Sitemap** - Auto-generated at `https://tc.agency/sitemap.xml`
- ✅ **Robots.txt** - Auto-generated at `https://tc.agency/robots.txt`
- ✅ **Structured Data** - Organization, Person, and FAQ schemas
- ✅ **Meta Tags** - Title, description, Open Graph, Twitter Cards
- ✅ **Mobile-Friendly** - Responsive design
- ✅ **Fast Loading** - Vercel hosting + optimizations
- ✅ **Analytics Ready** - Components in place

## 🚀 3 Steps to Enable Indexing

### Step 1: Add Google Verification (2 minutes)

1. Go to: https://search.google.com/search-console
2. Click "Add Property" → "URL prefix"
3. Enter: `https://tc.agency`
4. Select "HTML tag" verification method
5. Copy the verification code
6. Edit `/app/layout.tsx` line 114:
   ```tsx
   verification: {
     google: "paste-your-code-here", // Replace this
   },
   ```
7. Commit and deploy
8. Return to Search Console and click "Verify"

### Step 2: Submit Sitemap (1 minute)

1. In Search Console, go to "Sitemaps"
2. Enter: `sitemap.xml`
3. Click "Submit"
4. Wait for "Success" status

### Step 3: Request Indexing for Homepage (1 minute)

1. In Search Console, use "URL Inspection"
2. Enter: `https://tc.agency`
3. Click "Request Indexing"
4. Done!

## 📊 Verify It's Working

**After 24-48 hours:**

1. Search Google for: `site:tc.agency`
2. You should see your homepage
3. More pages will appear over 1-2 weeks

**Check status in Search Console:**
- Go to "Index" > "Pages"
- Watch "Indexed pages" count increase

## 📖 Full Documentation

- **Complete Setup**: See `docs/GOOGLE-SEARCH-CONSOLE-SETUP.md`
- **Verify Indexing**: See `docs/ENSURE-GOOGLE-INDEXING.md`
- **Full Checklist**: See `docs/SEO-LAUNCH-CHECKLIST.md`

## 🆘 Common Issues

**Q: Sitemap shows error**
- Verify `https://tc.agency/sitemap.xml` loads
- Should see XML with 25+ URLs

**Q: Pages not indexing**
- Normal for first 1-2 weeks
- Request indexing for priority pages
- Be patient!

**Q: Verification failed**
- Ensure code is in layout.tsx correctly
- Redeploy site
- Wait 5 minutes and try again

## ⏱️ Expected Timeline

- **Day 1**: Sitemap submitted
- **Day 2-3**: First crawl by Google
- **Day 3-7**: Homepage indexed
- **Week 2-4**: Most pages indexed
- **Week 4-8**: Rankings improve

## 🎯 Quick Checklist

- [ ] Verify site ownership in Search Console
- [ ] Submit sitemap
- [ ] Request indexing for homepage
- [ ] Check `site:tc.agency` after 2-3 days
- [ ] Monitor Search Console weekly

**That's it!** Your site will be indexed and ranking within 2-4 weeks.

---

For detailed instructions, see the full documentation in `/docs/`.
