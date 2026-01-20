// Unit tests for spam detection
// Run with: npm test (or manually verify with Node.js)

import {
  containsSpamKeywords,
  countUrls,
  containsSuspiciousTld,
  checkForSpam,
  validateName,
  validateMessage,
  sanitizePhone,
} from "../spam-detection"

// Simple test runner
function test(name: string, fn: () => void) {
  try {
    fn()
    console.log(`✅ ${name}`)
  } catch (error) {
    console.error(`❌ ${name}`)
    console.error(error)
  }
}

function assertEquals(actual: any, expected: any, message?: string) {
  if (JSON.stringify(actual) !== JSON.stringify(expected)) {
    throw new Error(
      `Expected ${JSON.stringify(expected)}, got ${JSON.stringify(actual)}${message ? `: ${message}` : ""}`,
    )
  }
}

// ============================================================================
// Spam Keyword Tests
// ============================================================================

test("containsSpamKeywords - detects googlesearchindex", () => {
  assertEquals(containsSpamKeywords("Please add tc.agency to GoogleSearchIndex"), true)
})

test("containsSpamKeywords - detects search index", () => {
  assertEquals(containsSpamKeywords("Submit your site to our search index"), true)
})

test("containsSpamKeywords - case insensitive", () => {
  assertEquals(containsSpamKeywords("GOOGLESEARCHINDEX"), true)
  assertEquals(containsSpamKeywords("googlesearchindex"), true)
  assertEquals(containsSpamKeywords("GoOgLeSeArChInDeX"), true)
})

test("containsSpamKeywords - legitimate message", () => {
  assertEquals(containsSpamKeywords("I need help with my production event"), false)
})

// ============================================================================
// URL Detection Tests
// ============================================================================

test("countUrls - detects http URLs", () => {
  assertEquals(countUrls("Check out http://example.com"), 1)
})

test("countUrls - detects https URLs", () => {
  assertEquals(countUrls("Visit https://example.com for more"), 1)
})

test("countUrls - detects www URLs", () => {
  assertEquals(countUrls("Go to www.example.com"), 1)
})

test("countUrls - detects domain-only URLs", () => {
  assertEquals(countUrls("Visit example.com and test.org"), 2)
})

test("countUrls - no URLs", () => {
  assertEquals(countUrls("This is a normal message"), 0)
})

test("countUrls - multiple URLs", () => {
  assertEquals(countUrls("Check http://site1.com and https://site2.com also www.site3.com"), 3)
})

// ============================================================================
// Suspicious TLD Tests
// ============================================================================

test("containsSuspiciousTld - detects .xyz", () => {
  assertEquals(containsSuspiciousTld("Visit spamsite.xyz"), true)
})

test("containsSuspiciousTld - detects .top", () => {
  assertEquals(containsSuspiciousTld("Check out deals.top"), true)
})

test("containsSuspiciousTld - legitimate domains", () => {
  assertEquals(containsSuspiciousTld("Visit tc.agency"), false)
  assertEquals(containsSuspiciousTld("Check google.com"), false)
})

// ============================================================================
// Comprehensive Spam Check Tests
// ============================================================================

test("checkForSpam - clean message", () => {
  const result = checkForSpam(
    "I need help with production management for a corporate event in Las Vegas. Budget is flexible.",
    "user@company.com",
    "John Smith",
  )
  assertEquals(result.isSpam, false)
  assertEquals(result.score < 30, true)
})

test("checkForSpam - spam keywords trigger", () => {
  const result = checkForSpam(
    "I want to add tc.agency to googlesearchindex",
    "spam@example.com",
    "Spammer",
  )
  assertEquals(result.isSpam, true)
  assertEquals(result.score >= 80, true)
})

test("checkForSpam - multiple URLs trigger", () => {
  const result = checkForSpam(
    "Check out http://site1.com and http://site2.com and also http://site3.com for more information",
    "user@example.com",
    "User",
  )
  assertEquals(result.isSpam, true)
  assertEquals(result.score >= 60, true)
})

test("checkForSpam - suspicious TLD trigger", () => {
  const result = checkForSpam("Visit my site at spamsite.xyz for great deals", "user@test.com", "User")
  // Should have some spam score but might not hit threshold alone
  assertEquals(result.score >= 20, true)
})

test("checkForSpam - message too short", () => {
  const result = checkForSpam("Hi", "user@example.com", "User")
  assertEquals(result.score >= 30, true)
})

test("checkForSpam - disposable email", () => {
  const result = checkForSpam(
    "This is a legitimate message with enough content to pass length validation",
    "test@mailinator.com",
    "User",
  )
  assertEquals(result.score >= 40, true)
})

test("checkForSpam - generic name", () => {
  const result = checkForSpam(
    "This is a legitimate message with enough content to pass length validation",
    "user@example.com",
    "admin",
  )
  assertEquals(result.score >= 30, true)
})

test("checkForSpam - combined spam signals", () => {
  const result = checkForSpam(
    "Submit to googlesearchindex at http://spam.xyz and http://spam2.xyz",
    "test@mailinator.com",
    "admin",
  )
  assertEquals(result.isSpam, true)
  assertEquals(result.score >= 150, true) // Multiple signals add up
})

// ============================================================================
// Validation Tests
// ============================================================================

test("validateName - valid names", () => {
  assertEquals(validateName("Jo"), true) // 2 chars
  assertEquals(validateName("John Smith"), true)
  assertEquals(validateName("A".repeat(80)), true) // 80 chars
})

test("validateName - invalid names", () => {
  assertEquals(validateName("A"), false) // Too short
  assertEquals(validateName("A".repeat(81)), false) // Too long
  assertEquals(validateName(""), false)
})

test("validateMessage - valid messages", () => {
  assertEquals(validateMessage("A".repeat(20)), true) // Exactly 20
  assertEquals(validateMessage("A".repeat(100)), true)
  assertEquals(validateMessage("A".repeat(4000)), true) // Exactly 4000
})

test("validateMessage - invalid messages", () => {
  assertEquals(validateMessage("A".repeat(19)), false) // Too short
  assertEquals(validateMessage("A".repeat(4001)), false) // Too long
  assertEquals(validateMessage(""), false)
})

// ============================================================================
// Sanitization Tests
// ============================================================================

test("sanitizePhone - removes letters", () => {
  assertEquals(sanitizePhone("123-456-7890 ext 123"), "123-456-7890  123")
})

test("sanitizePhone - keeps numbers and formatting", () => {
  assertEquals(sanitizePhone("+1 (313) 261-5200"), "+1 (313) 261-5200")
})

test("sanitizePhone - removes special characters", () => {
  assertEquals(sanitizePhone("123#456@7890!"), "1234567890")
})

// ============================================================================
// Run all tests
// ============================================================================

console.log("\n🧪 Running spam detection tests...\n")
console.log("If all tests pass, you'll see ✅ for each test.\n")

// Note: This is a simple test file. For production, use Jest or Vitest:
// npm install --save-dev jest @types/jest
// Then run: npm test
