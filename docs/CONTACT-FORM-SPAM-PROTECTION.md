# Contact Form Spam Protection

Complete spam protection implementation for tc.agency contact form with layered defenses.

## 🛡️ Security Layers

The contact form now has 8 layers of spam protection:

### Layer 1: Honeypot Field
- Hidden `company_website` field that humans won't see but bots will fill out
- If filled, silently rejects submission (returns success but doesn't send email)

### Layer 2: Rate Limiting
- **Burst limit**: 2 submissions per 5 minutes
- **Hourly limit**: 5 submissions per hour
- Per-IP tracking using Upstash Redis (or in-memory for development)

### Layer 3: Required Fields Validation
- Name, email, and message must be present

### Layer 4: Field Length Validation
- Name: 2-80 characters
- Message: 20-4000 characters

### Layer 5: Email Format Validation
- Must match valid email regex pattern

### Layer 6: Cloudflare Turnstile Verification
- Invisible CAPTCHA that challenges suspicious requests
- Dark-themed widget matching site design
- Graceful fallback if keys not configured (for development)

### Layer 7: Spam Content Detection
- **Keyword filtering**: Detects SEO spam phrases like "add to search index", "googlesearchindex", etc.
- **URL detection**: Flags messages with multiple URLs or suspicious TLDs (.xyz, .top, .info, etc.)
- **Disposable email detection**: Flags temporary email services
- **Spam score calculation**: 0-100 score, >50 = blocked
- If spam score 30-49: Email sent with `[Low Priority]` prefix for manual review

### Layer 8: Input Sanitization
- Phone numbers sanitized to remove non-numeric characters
- All text fields trimmed

## 📋 Environment Variables Required

### Production (Required)

```bash
# Cloudflare Turnstile
NEXT_PUBLIC_TURNSTILE_SITE_KEY=1x00000000000000000000AA  # Public key (frontend)
TURNSTILE_SECRET_KEY=1x0000000000000000000000000000000AA  # Secret key (backend)

# Upstash Redis (for rate limiting)
UPSTASH_REDIS_REST_URL=https://your-redis.upstash.io
UPSTASH_REDIS_REST_TOKEN=AXh2ZG...your-token...

# Email (already configured)
RESEND_API_KEY=re_...your-key...
```

### Development (Optional)

```bash
# In development, these can be omitted:
# - Form will work without Turnstile (logs warning)
# - Rate limiting will use in-memory store (logs warning)

# Only RESEND_API_KEY is required for testing email sending
```

## 🚀 Setup Instructions

### Step 1: Get Cloudflare Turnstile Keys

1. Go to [Cloudflare Dashboard](https://dash.cloudflare.com/)
2. Navigate to **Turnstile** (under "Challenges")
3. Click **Add Site**
4. Settings:
   - **Site name**: TC Agency Contact Form
   - **Domain**: `tc.agency`
   - **Mode**: Managed (invisible when possible)
5. Copy the **Site Key** and **Secret Key**

### Step 2: Get Upstash Redis

1. Go to [Upstash Console](https://console.upstash.com/)
2. Create a **Redis database**:
   - **Name**: tc-agency-rate-limit
   - **Region**: Choose closest to your Vercel region
   - **Type**: Regional (cheaper, sufficient for rate limiting)
3. In database dashboard, find **REST API** section
4. Copy **UPSTASH_REDIS_REST_URL** and **UPSTASH_REDIS_REST_TOKEN**

### Step 3: Add to Vercel

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Select your **tc-agency** project
3. Go to **Settings** → **Environment Variables**
4. Add each variable:
   - Variable Name: `NEXT_PUBLIC_TURNSTILE_SITE_KEY`
   - Value: `1x00000000000000000000AA`
   - Environments: **Production**, **Preview**, **Development**
   - Click **Save**
5. Repeat for:
   - `TURNSTILE_SECRET_KEY` (❗ NOT public, uncheck "Expose to browser")
   - `UPSTASH_REDIS_REST_URL`
   - `UPSTASH_REDIS_REST_TOKEN`
6. Redeploy the site

### Step 4: Test

1. Visit `https://tc.agency/contact`
2. Fill out form legitimately → Should work
3. Try submitting 3 times quickly → Should be rate limited after 2
4. Try submitting with message "list tc.agency in googlesearchindex" → Should silently block

## 🧪 Testing & Verification

### Manual curl Test (Development Mode)

When Turnstile is disabled (no secret key), test the form:

```bash
# Test legitimate submission
curl -X POST https://tc.agency/api/contact \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d "name=Test User" \
  -d "email=test@example.com" \
  -d "message=This is a test message with sufficient length to pass validation"

# Test honeypot (should block)
curl -X POST https://tc.agency/api/contact \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d "name=Bot" \
  -d "email=bot@spam.com" \
  -d "company_website=http://spam.com" \
  -d "message=Spam message"

# Test spam keywords (should block)
curl -X POST https://tc.agency/api/contact \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d "name=Spammer" \
  -d "email=spam@example.com" \
  -d "message=I want to add tc.agency to googlesearchindex and submit to search engines"
```

### Spam Score Examples

| Message Content | Spam Score | Result |
|----------------|------------|--------|
| "I need a quote for my corporate event" | 0 | ✅ Clean, email sent |
| "Can you help with our tour production?" | 0 | ✅ Clean, email sent |
| "Check out my website at example.com" | 20 | ✅ Sent, flagged as `[Low Priority]` |
| "Add tc.agency to googlesearchindex" | 80 | ❌ Blocked, no email sent |
| "Submit to search engines backlinks" | 140 | ❌ Blocked, no email sent |

### Check Logs

Blocked submissions are logged to console:

```bash
# View Vercel logs
vercel logs --follow

# Look for:
[Contact Form] ❌ BLOCKED - Honeypot triggered
[Contact Form] ❌ BLOCKED - Rate limit exceeded
[Contact Form] ❌ BLOCKED - Spam detected
[Contact Form] ✅ SUCCESS - Email sent
```

## 📊 Monitoring

### Vercel Logs

All spam attempts are logged with details:
- Timestamp
- IP address
- Name/email
- Spam score and reason
- Processing time

### Email Metadata

Legitimate submissions include metadata footer:

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
METADATA
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Submitted:    1/20/2026, 2:30:15 PM EST
IP Address:   192.168.1.1
Spam Score:   10/100 ✓ CLEAN
Processing:   156ms
```

### Low Priority Flagging

Submissions with spam score 30-49 are sent with `[Low Priority]` prefix in subject line for manual review.

## 🔒 Security Best Practices

### ✅ Implemented

- Honeypot field (invisible to humans)
- Rate limiting (prevents flood attacks)
- CAPTCHA verification (Turnstile)
- Content filtering (keyword + URL detection)
- Input validation (length, format)
- IP tracking (for rate limiting and logging)
- Generic error messages (don't leak detection methods)
- Soft blocks (return 200 success to hide detection)

### ⚠️ Not Leaking Detection Methods

- Spam submissions receive 200 OK + redirect to /thank-you
- No error messages reveal why submission was blocked
- Bots think submission succeeded (they stop trying)

### 🔐 Data Privacy

- IP addresses logged for rate limiting only
- No PII stored except in email sent to info@tc.agency
- No tracking cookies (Turnstile uses localStorage only)

## 🐛 Troubleshooting

### Issue: Turnstile Widget Not Appearing

**Cause**: Site key not configured or incorrect

**Fix**:
1. Check `NEXT_PUBLIC_TURNSTILE_SITE_KEY` is set in Vercel
2. Verify key starts with `1x` or `2x`
3. Check browser console for errors
4. Redeploy site after adding env vars

### Issue: "Too many submissions" Error Immediately

**Cause**: Rate limit triggered

**Fix**:
1. Wait 5 minutes
2. Check if Redis is configured correctly
3. If testing, clear Redis: `redis-cli FLUSHALL` or wait for expiry

### Issue: Legitimate Submissions Blocked

**Cause**: Spam score too high

**Fix**:
1. Check Vercel logs for spam score and reason
2. Adjust thresholds in `/lib/spam-detection.ts`
3. Add exception for specific keywords if needed

### Issue: Form Works in Dev but Not Production

**Cause**: Environment variables not set

**Fix**:
1. Verify all env vars are set in Vercel
2. Check they're set for **Production** environment
3. Redeploy site

### Issue: Rate Limiting Not Working

**Cause**: Using in-memory store across multiple Vercel instances

**Fix**:
1. **Must** configure Upstash Redis for production
2. In-memory store only works for single-instance development

## 📁 Files Changed

### New Files

```
lib/spam-detection.ts       # Spam detection utilities and keyword lists
lib/rate-limit.ts           # Rate limiting with Upstash Redis + fallback
lib/turnstile.ts            # Cloudflare Turnstile verification
docs/CONTACT-FORM-SPAM-PROTECTION.md  # This documentation
```

### Modified Files

```
components/contact-form.tsx  # Added honeypot + Turnstile widget
app/actions/contact.ts       # Complete rewrite with 8-layer protection
components/schema-org.tsx    # Added WebSite schema for SEO
```

## 🎯 Success Metrics

Monitor these to measure effectiveness:

- **Spam blocked**: Check logs for blocked submissions
- **False positives**: Legitimate users complaining about blocks (should be 0)
- **Email volume**: Should decrease after deployment
- **Rate limit hits**: How many users hit rate limits (should be < 1%)

## 📚 Additional Resources

- [Cloudflare Turnstile Docs](https://developers.cloudflare.com/turnstile/)
- [Upstash Redis Docs](https://docs.upstash.com/redis)
- [Next.js Server Actions](https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions-and-mutations)

---

**Deployed**: 2026-01-20
**Author**: Claude
**Contact**: info@tc.agency
