#!/bin/bash
# Environment Variable Validation Script for tc.agency

echo "🔍 Validating tc.agency Spam Protection Setup..."
echo ""

# Color codes
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Function to check if variable is set
check_var() {
    local var_name=$1
    local var_value=$2

    if [ -z "$var_value" ]; then
        echo -e "${RED}❌ $var_name is NOT set${NC}"
        return 1
    else
        echo -e "${GREEN}✅ $var_name is set${NC}"
        return 0
    fi
}

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "ENVIRONMENT VARIABLES CHECK"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

# Check each environment variable
check_var "NEXT_PUBLIC_TURNSTILE_SITE_KEY" "$NEXT_PUBLIC_TURNSTILE_SITE_KEY"
SITE_KEY_OK=$?

check_var "TURNSTILE_SECRET_KEY" "$TURNSTILE_SECRET_KEY"
SECRET_KEY_OK=$?

check_var "UPSTASH_REDIS_REST_URL" "$UPSTASH_REDIS_REST_URL"
REDIS_URL_OK=$?

check_var "UPSTASH_REDIS_REST_TOKEN" "$UPSTASH_REDIS_REST_TOKEN"
REDIS_TOKEN_OK=$?

check_var "RESEND_API_KEY" "$RESEND_API_KEY"
RESEND_OK=$?

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "VALIDATION TESTS"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

# Test Turnstile Site Key format
if [ $SITE_KEY_OK -eq 0 ]; then
    if [[ $NEXT_PUBLIC_TURNSTILE_SITE_KEY =~ ^0x4 ]] || [[ $NEXT_PUBLIC_TURNSTILE_SITE_KEY =~ ^1x0 ]]; then
        echo -e "${GREEN}✅ Turnstile Site Key format looks correct${NC}"
    else
        echo -e "${YELLOW}⚠️  Turnstile Site Key format unexpected (should start with 0x4 or 1x0)${NC}"
    fi
fi

# Test Turnstile Secret Key format
if [ $SECRET_KEY_OK -eq 0 ]; then
    if [[ $TURNSTILE_SECRET_KEY =~ ^0x4 ]] || [[ $TURNSTILE_SECRET_KEY =~ ^1x0 ]]; then
        echo -e "${GREEN}✅ Turnstile Secret Key format looks correct${NC}"
    else
        echo -e "${YELLOW}⚠️  Turnstile Secret Key format unexpected (should start with 0x4 or 1x0)${NC}"
    fi
fi

# Test Upstash URL format
if [ $REDIS_URL_OK -eq 0 ]; then
    if [[ $UPSTASH_REDIS_REST_URL =~ ^https:// ]]; then
        echo -e "${GREEN}✅ Upstash URL format looks correct${NC}"
    else
        echo -e "${RED}❌ Upstash URL should start with https://${NC}"
    fi
fi

# Test Resend API Key format
if [ $RESEND_OK -eq 0 ]; then
    if [[ $RESEND_API_KEY =~ ^re_ ]]; then
        echo -e "${GREEN}✅ Resend API Key format looks correct${NC}"
    else
        echo -e "${YELLOW}⚠️  Resend API Key format unexpected (should start with re_)${NC}"
    fi
fi

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "SUMMARY"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

TOTAL_CHECKS=5
PASSED=0

[ $SITE_KEY_OK -eq 0 ] && ((PASSED++))
[ $SECRET_KEY_OK -eq 0 ] && ((PASSED++))
[ $REDIS_URL_OK -eq 0 ] && ((PASSED++))
[ $REDIS_TOKEN_OK -eq 0 ] && ((PASSED++))
[ $RESEND_OK -eq 0 ] && ((PASSED++))

if [ $PASSED -eq $TOTAL_CHECKS ]; then
    echo -e "${GREEN}✅ All environment variables are set! ($PASSED/$TOTAL_CHECKS)${NC}"
    echo ""
    echo -e "${GREEN}🚀 You're ready to deploy!${NC}"
    echo ""
    echo "Next steps:"
    echo "  1. Push to main branch or manually deploy in Vercel"
    echo "  2. Wait 2-3 minutes for deployment"
    echo "  3. Visit https://tc.agency/contact to test"
    echo ""
else
    echo -e "${RED}❌ Missing variables: $((TOTAL_CHECKS - PASSED))/$TOTAL_CHECKS${NC}"
    echo ""
    echo "Please add the missing variables in Vercel:"
    echo "  https://vercel.com/dashboard → tc-agency → Settings → Environment Variables"
    echo ""
fi

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "For detailed setup instructions, see:"
echo "  docs/DEPLOYMENT-CHECKLIST.md"
echo ""
