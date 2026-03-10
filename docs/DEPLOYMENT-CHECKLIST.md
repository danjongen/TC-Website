# Deployment Checklist for Contact Form Spam Protection

Complete this checklist before deploying the spam protection changes to production.

## ✅ Pre-Deployment Checklist

### 1. Get Cloudflare Turnstile Keys (5 minutes)

- [ ] Go to [Cloudflare Dashboard](https://dash.cloudflare.com/)
- [ ] Navigate to **Turnstile** (under "Challenges" section)
- [ ] Click **Add Site**
- [ ] Configure:
  - Site name: `TC Agency Contact Form`
  - Domain: `tc.agency`
  - Widget Mode: **Managed** (invisible when possible)
- [ ] Copy **Site Key** (starts with `1x` or `2x`)
- [ ] Copy **Secret Key** (starts with `1x` or `2x`)

### 2. Get Upstash Redis Credentials (5 minutes)

- [ ] Go to [Upstash Console](https://console.upstash.com/)
- [ ] Click **Create Database**
- [ ] Configure:
  - Name: `tc-agency-rate-limit`
  - Type: **Regional** (cheaper, sufficient for rate limiting)
  - Region: **Choose closest to your Vercel region** (e.g., US-East for Detroit)
- [ ] In database dashboard, find **REST API** section
- [ ] Copy **UPSTASH_REDIS_REST_URL**
- [ ] Copy **UPSTASH_REDIS_REST_TOKEN**

### 3. Add Environment Variables to Vercel (5 minutes)

- [ ] Go to [Vercel Dashboard](https://vercel.com/dashboard)
- [ ] Select **tc-agency** project
- [ ] Go to **Settings** → **Environment Variables**
- [ ] Add the following variables:

| Variable Name | Value | Expose to Browser? | Environments |
|--------------|-------|-------------------|--------------|
| `NEXT_PUBLIC_TURNSTILE_SITE_KEY` | `1x00...` | ✅ Yes | Production, Preview, Development |
| `TURNSTILE_SECRET_KEY` | `1x00...` | ❌ No | Production, Preview, Development |
| `UPSTASH_REDIS_REST_URL` | `https://...` | ❌ No | Production, Preview, Development |
| `UPSTASH_REDIS_REST_TOKEN` | `AXh2...` | ❌ No | Production, Preview, Development |

**Important:**
- `NEXT_PUBLIC_TURNSTILE_SITE_KEY` must have "Expose to browser" checked
- All others should NOT be exposed to browser
- Apply to all three environments (Production, Preview, Development)

### 4. Deploy to Production (2 minutes)

- [ ] Trigger deployment:
  - Option A: Push to main branch (automatic deployment)
  - Option B: Manual deployment via Vercel dashboard

- [ ] Wait for deployment to complete

- [ ] Check deployment logs for errors

### 5. Verify Deployment (5 minutes)

#### Test 1: Legitimate Submission
- [ ] Go to `https://tc.agency/contact`
- [ ] Verify Turnstile widget appears (small checkbox or invisible)
- [ ] Fill out form legitimately:
  - Name: `Your Name`
  - Email: `your@email.com`
  - Message: `Testing the new spam protection system. This is a legitimate inquiry.`
- [ ] Submit form
- [ ] Should redirect to `/thank-you`
- [ ] Check `info@tc.agency` inbox for email

#### Test 2: Spam Detection
- [ ] Go to `https://tc.agency/contact` again
- [ ] Fill out form with spam content:
  - Name: `Spammer`
  - Email: `spam@test.com`
  - Message: `I want to add tc.agency to googlesearchindex`
- [ ] Submit form
- [ ] Should redirect to `/thank-you` (appears to succeed)
- [ ] Check `info@tc.agency` inbox - **should NOT receive email** (blocked silently)
- [ ] Check Vercel logs for: `[Contact Form] ❌ BLOCKED - Spam detected`

#### Test 3: Rate Limiting
- [ ] Go to `https://tc.agency/contact`
- [ ] Submit form 3 times quickly (within 1 minute)
- [ ] Third submission should show rate limit error
- [ ] Error message: `Too many submissions. Please try again in X minutes.`

#### Test 4: Turnstile Widget
- [ ] Open browser DevTools → Console
- [ ] Go to `https://tc.agency/contact`
- [ ] Verify no errors related to Turnstile
- [ ] Widget should be visible or invisible depending on Turnstile's risk assessment

## ✅ Post-Deployment Monitoring (First 24 Hours)

### Check Vercel Logs

- [ ] Go to Vercel Dashboard → **Logs**
- [ ] Filter for `[Contact Form]`
- [ ] Look for patterns:
  - ✅ SUCCESS entries (legitimate)
  - ❌ BLOCKED entries (spam caught)
  - Any errors or warnings

### Monitor Email Volume

- [ ] Check `info@tc.agency` inbox
- [ ] Compare spam volume before/after deployment
- [ ] Should see **significant reduction** in spam
- [ ] Legitimate inquiries should still come through

### Check for False Positives

- [ ] Monitor for any legitimate users complaining about:
  - Form not working
  - "Verification failed" errors
  - Rate limit errors when not spamming
- [ ] If false positives occur, adjust thresholds in:
  - `/lib/spam-detection.ts` (spam score threshold)
  - `/lib/rate-limit.ts` (rate limits)

## 🐛 Troubleshooting

### Issue: Turnstile Widget Not Appearing

**Symptoms:**
- No CAPTCHA widget visible
- Form works but no verification

**Fix:**
1. Check browser console for errors
2. Verify `NEXT_PUBLIC_TURNSTILE_SITE_KEY` is set in Vercel
3. Verify key starts with `1x` or `2x`
4. Ensure "Expose to browser" is checked for site key
5. Redeploy site
6. Clear browser cache

### Issue: All Submissions Being Blocked

**Symptoms:**
- Even legitimate submissions don't send emails
- Logs show high spam scores

**Fix:**
1. Check Vercel logs for spam reasons
2. Lower spam score threshold in `/lib/spam-detection.ts`:
   ```typescript
   // Change from 50 to 70
   const isSpam = score >= 70
   ```
3. Redeploy and test

### Issue: Rate Limiting Too Aggressive

**Symptoms:**
- Users hitting rate limits too quickly
- Complaints about "too many submissions"

**Fix:**
1. Edit `/lib/rate-limit.ts`:
   ```typescript
   // Increase limits
   const burstConfig = { limit: 5, window: 5 * 60 }  // Was 2
   const hourlyConfig = { limit: 10, window: 60 * 60 }  // Was 5
   ```
2. Redeploy

### Issue: Upstash Redis Not Working

**Symptoms:**
- Logs show: `Using in-memory rate limiting`
- Rate limiting not working across multiple requests

**Fix:**
1. Verify Redis credentials in Vercel
2. Test Redis connection:
   ```bash
   curl https://UPSTASH_URL/ping \
     -H "Authorization: Bearer UPSTASH_TOKEN"
   ```
3. Should return: `{"result":"PONG"}`
4. If fails, regenerate Redis token in Upstash console

### Issue: Legitimate Users Getting Blocked

**Symptoms:**
- User reports they can't submit
- Logs show spam detected for legitimate content

**Fix:**
1. Check logs for spam reason
2. If specific keyword triggering:
   - Remove from `SPAM_KEYWORDS` in `/lib/spam-detection.ts`
3. If URL detection too strict:
   - Increase URL threshold from 1 to 2 in `checkForSpam()`
4. If disposable email false positive:
   - Remove pattern from `tempEmailPatterns`

## 📊 Success Metrics

Monitor these metrics to measure effectiveness:

### Week 1
- [ ] Spam emails to `info@tc.agency` reduced by >80%
- [ ] Zero complaints from legitimate users
- [ ] Rate limit hit rate < 1% of total submissions
- [ ] Turnstile verification success rate > 99%

### Week 2-4
- [ ] Fine-tune spam score thresholds based on logs
- [ ] Adjust rate limits if needed
- [ ] Add any new spam patterns to keyword list

## 📞 Support

If issues persist:

1. **Check Documentation:**
   - `/docs/CONTACT-FORM-SPAM-PROTECTION.md` - Full setup guide
   - `/docs/DEPLOYMENT-CHECKLIST.md` - This file

2. **Check Logs:**
   ```bash
   vercel logs --follow
   ```

3. **Test Locally:**
   ```bash
   npm run dev
   # Visit http://localhost:3000/contact
   ```

4. **Contact Developer:**
   - Provide Vercel logs
   - Describe specific error
   - Include steps to reproduce

## ✅ Final Checklist

Before marking deployment complete:

- [ ] All environment variables added to Vercel
- [ ] Site deployed successfully
- [ ] Legitimate submission test passed
- [ ] Spam detection test passed
- [ ] Rate limiting test passed
- [ ] Turnstile widget working
- [ ] Email to `info@tc.agency` received (legitimate test)
- [ ] No spam email received (spam test)
- [ ] Logs showing correct blocking behavior
- [ ] No errors in browser console
- [ ] No errors in Vercel logs

**Deployment Status:** ⬜ Not Started | ⬜ In Progress | ⬜ Complete

**Deployed By:** ________________

**Date:** ________________

**Sign-off:** ________________

---

**Last Updated:** 2026-01-20
**Version:** 1.0
