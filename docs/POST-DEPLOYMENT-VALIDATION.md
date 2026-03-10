# Post-Deployment Validation Checklist

Complete this checklist to verify spam protection is working correctly.

## ✅ 1. Verify Environment Variables in Vercel

Go to: **Vercel Dashboard → tc-agency → Settings → Environment Variables**

You should see these 4 variables:

- [ ] `NEXT_PUBLIC_TURNSTILE_SITE_KEY` = `0x4AAAAAACNtz4QE4pKc83eh`
- [ ] `TURNSTILE_SECRET_KEY` = `0x4AAAAAACNtz1ckdwGHVmyMRolOBLycAVU`
- [ ] `UPSTASH_REDIS_REST_URL` = `https://us1-xxxxx.upstash.io` (from Upstash)
- [ ] `UPSTASH_REDIS_REST_TOKEN` = `AXh2ZG...` (from Upstash)

**Important:** All 4 should be applied to all 3 environments (Production, Preview, Development)

---

## ✅ 2. Trigger Deployment

Since you just added environment variables, you need to redeploy:

### Option A: Automatic (if connected to GitHub)
- Push any commit to trigger auto-deploy
- OR merge this branch to main

### Option B: Manual Redeploy
1. Go to **Vercel Dashboard → tc-agency → Deployments**
2. Find the latest deployment
3. Click the **three dots (•••)** on the right
4. Click **"Redeploy"**
5. Wait 2-3 minutes

**Check deployment status:**
- [ ] Deployment shows "Ready" with green checkmark
- [ ] Build logs show no errors
- [ ] Environment variables loaded correctly

---

## ✅ 3. Test Contact Form (Legitimate Submission)

Visit: **https://tc.agency/contact**

### Visual Check:
- [ ] Page loads without errors
- [ ] Form displays correctly
- [ ] Turnstile widget appears (small checkbox or invisible - both are normal)

### Submit Test:
1. Fill out form with real information:
   - **Name**: Your Name
   - **Email**: your@email.com
   - **Message**: "Testing spam protection deployment. This is a legitimate test inquiry."
2. Click **Submit**
3. **Expected result**:
   - [ ] Redirects to `/thank-you` page
   - [ ] Email arrives at `info@tc.agency` within 1-2 minutes
   - [ ] Email includes metadata footer with spam score (should be low, like 10/100)

---

## ✅ 4. Test Spam Detection (Should Block)

Visit: **https://tc.agency/contact** again

### Submit Spam Test:
1. Fill out form with spam content:
   - **Name**: Test Spammer
   - **Email**: spam@test.com
   - **Message**: "I want to add tc.agency to googlesearchindex and submit to search engines"
2. Click **Submit**
3. **Expected result**:
   - [ ] Still redirects to `/thank-you` (appears to succeed)
   - [ ] **NO email arrives** at `info@tc.agency` (blocked silently)
   - [ ] Check Vercel logs for: `[Contact Form] ❌ BLOCKED - Spam detected`

---

## ✅ 5. Test Rate Limiting (Should Block)

Visit: **https://tc.agency/contact** again

### Submit Multiple Times:
1. Fill out form legitimately
2. Submit **3 times quickly** (within 2 minutes)
3. **Expected result**:
   - [ ] First submission: ✅ Success
   - [ ] Second submission: ✅ Success
   - [ ] **Third submission**: ❌ Error message: "Too many submissions. Please try again in X minutes."

---

## ✅ 6. Check Vercel Logs

Go to: **Vercel Dashboard → tc-agency → Logs**

### Look for these log entries:

**Successful submission:**
```
[Contact Form] ✅ SUCCESS - Email sent: { name: '...', spamScore: 10, ... }
```

**Spam blocked:**
```
[Contact Form] ❌ BLOCKED - Spam detected: { score: 80, reason: 'spam keywords detected' }
```

**Rate limited:**
```
[Contact Form] ❌ BLOCKED - Rate limit exceeded: { ip: '...', limit: 2 }
```

**Turnstile loaded:**
```
[Contact Form] Turnstile site key found
```

### Verify:
- [ ] Legitimate submissions show ✅ SUCCESS
- [ ] Spam submissions show ❌ BLOCKED
- [ ] Rate limit works after 2 submissions
- [ ] No errors about missing environment variables

---

## ✅ 7. Browser Console Check

Open browser DevTools (F12) on contact page:

### Console tab should show:
- [ ] No errors related to Turnstile
- [ ] No errors related to contact form
- [ ] (Optional) Warning if Turnstile key not found (only in dev mode)

### Network tab should show:
- [ ] Turnstile script loads: `https://challenges.cloudflare.com/turnstile/v0/api.js`
- [ ] Form submission goes to server action
- [ ] No 500 errors

---

## ✅ 8. Verify Spam Protection Layers

All 8 layers should be active:

- [ ] **Layer 1: Honeypot** - Hidden field in form source
- [ ] **Layer 2: Rate Limiting** - Test shows limit after 2 submissions
- [ ] **Layer 3-5: Validation** - Required fields, length checks, email format
- [ ] **Layer 6: Turnstile** - Widget visible or invisible challenge
- [ ] **Layer 7: Spam Detection** - Keywords blocked (tested above)
- [ ] **Layer 8: Sanitization** - Phone numbers cleaned in email

---

## ✅ 9. Email Metadata Check

Check the legitimate test email you received at `info@tc.agency`:

### Should contain metadata footer:
```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
METADATA
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Submitted:    [timestamp] EST
IP Address:   [your IP]
Spam Score:   10/100 ✓ CLEAN
Processing:   [time]ms
```

### Verify:
- [ ] Spam score is present
- [ ] IP address is logged
- [ ] Processing time shows
- [ ] No "[Low Priority]" prefix in subject (score < 30)

---

## ✅ 10. Monitor for 24 Hours

### Day 1 Checks:

**Morning (8-10 hours after deployment):**
- [ ] Check `info@tc.agency` inbox
- [ ] Count spam emails received (should be 0 or very few)
- [ ] Check legitimate inquiries still coming through

**Evening (20-24 hours after deployment):**
- [ ] Review Vercel logs for blocked attempts
- [ ] Note any false positives (legitimate users blocked)
- [ ] Verify rate limiting didn't block real users

### Expected Results:
- **Spam reduction**: >80% decrease in spam emails
- **False positives**: 0 (no legitimate users should be blocked)
- **Rate limit hits**: <1% of total submissions

---

## 🐛 Troubleshooting

### Issue: Turnstile Widget Not Appearing

**Check:**
1. Browser console for errors
2. `NEXT_PUBLIC_TURNSTILE_SITE_KEY` is set in Vercel
3. Variable is checked for "Production" environment
4. Site has been redeployed after adding variable

**Note:** Widget may be invisible in "Managed" mode - this is normal!

---

### Issue: "Verification failed" Error

**Causes:**
- Secret key not set correctly
- Secret key not applied to Production environment
- Turnstile API temporarily down

**Fix:**
1. Verify `TURNSTILE_SECRET_KEY` is set in Vercel
2. Ensure it's applied to Production
3. Redeploy site
4. Test again after 5 minutes

---

### Issue: All Submissions Being Blocked

**Causes:**
- Spam score threshold too low
- Keywords too broad

**Fix:**
1. Check Vercel logs for spam reasons
2. Edit `/lib/spam-detection.ts` to adjust threshold
3. Current threshold: score >= 50
4. Try increasing to 70 if too aggressive

---

### Issue: Rate Limiting Too Aggressive

**Causes:**
- Limits set too low for your traffic

**Current limits:**
- Burst: 2 per 5 minutes
- Hourly: 5 per hour

**Fix:**
1. Edit `/lib/rate-limit.ts`
2. Increase limits:
   ```typescript
   const burstConfig = { limit: 5, window: 5 * 60 }
   const hourlyConfig = { limit: 10, window: 60 * 60 }
   ```
3. Commit and redeploy

---

### Issue: Upstash Redis Not Working

**Symptoms:**
- Logs show: "Using in-memory rate limiting"
- Rate limiting not working properly

**Fix:**
1. Verify `UPSTASH_REDIS_REST_URL` and `UPSTASH_REDIS_REST_TOKEN` in Vercel
2. Test Redis connection:
   ```bash
   curl https://YOUR_REDIS_URL/ping \
     -H "Authorization: Bearer YOUR_TOKEN"
   ```
3. Should return: `{"result":"PONG"}`
4. If fails, regenerate token in Upstash console

---

## ✅ Final Validation

All checks complete:

- [ ] Environment variables set in Vercel (4/4)
- [ ] Site deployed successfully
- [ ] Legitimate submission works (email received)
- [ ] Spam submission blocked (no email)
- [ ] Rate limiting works (3rd submission blocked)
- [ ] Logs show correct behavior
- [ ] No browser console errors
- [ ] No false positives reported
- [ ] Spam reduction visible within 24 hours

---

## 📊 Success Metrics (Week 1)

Track these over the first week:

| Metric | Target | Actual |
|--------|--------|--------|
| Spam emails blocked | >80% | ___% |
| False positives | 0 | ___ |
| Rate limit hits | <1% | ___% |
| Legitimate inquiries | 100% delivered | ___% |

---

## 📞 Support

If any checks fail:

1. **Review logs**: Vercel Dashboard → Logs
2. **Check documentation**: `docs/CONTACT-FORM-SPAM-PROTECTION.md`
3. **Verify setup**: `docs/DEPLOYMENT-CHECKLIST.md`
4. **Test locally**: `npm run dev` and test on localhost:3000

---

**Validation completed by:** ________________

**Date:** ________________

**All checks passed:** ⬜ Yes | ⬜ No (see notes)

**Notes:**
