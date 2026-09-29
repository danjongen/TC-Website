import {
  createHash,
  createHmac,
  createSign,
  timingSafeEqual,
} from "node:crypto"
import {
  POWER_SYMBOLS_ACTIVATION_MAX_VERSION,
  POWER_SYMBOLS_VERSION,
} from "@/lib/power-symbols-version"

export { POWER_SYMBOLS_VERSION }
export const POWER_SYMBOLS_PRODUCT = "power-symbols"
export const POWER_SYMBOLS_BETA_VARIANTS = new Set([
  "53609848635755",
  "53609848668523",
  "53609848701291",
])

const serialPattern =
  /^PSB1-([0-9]{5,24})-([A-F0-9]{8})-([A-F0-9]{4}(?:-[A-F0-9]{4}){3})$/

function requireEnvironment(name: string): string {
  const value = process.env[name]?.trim()
  if (!value) {
    throw new Error(`${name} is not configured`)
  }
  return value
}
function emailHash(email: string): string {
  return createHash("sha256")
    .update(email.trim().toLowerCase())
    .digest("hex")
    .slice(0, 8)
    .toUpperCase()
}

function serialMac(orderId: string, buyerHash: string): string {
  return createHmac(
    "sha256",
    requireEnvironment("POWER_SYMBOLS_SERIAL_SECRET"),
  )
    .update(`PSB1|${orderId}|${buyerHash}`)
    .digest("hex")
    .slice(0, 16)
    .toUpperCase()
}

export function createPowerSymbolsSerial(
  orderId: string | number,
  email: string,
): string {
  const cleanOrder = String(orderId).replace(/\D/g, "")
  if (!/^[0-9]{5,24}$/.test(cleanOrder)) {
    throw new Error("Shopify order identity is invalid")
  }
  const buyerHash = emailHash(email)
  const mac = serialMac(cleanOrder, buyerHash)
  return `PSB1-${cleanOrder}-${buyerHash}-${mac.match(/.{4}/g)!.join("-")}`
}

export function createPowerSymbolsComplimentarySerial(email: string): string {
  const normalizedEmail = email.trim().toLowerCase()
  if (!normalizedEmail) {
    throw new Error("Complimentary beta email is invalid")
  }
  const identityHex = createHmac(
    "sha256",
    requireEnvironment("POWER_SYMBOLS_SERIAL_SECRET"),
  )
    .update(`PSB1|COMPLIMENTARY|${normalizedEmail}`)
    .digest("hex")
    .slice(0, 15)
  const numericIdentity = BigInt(`0x${identityHex}`)
    .toString(10)
    .padStart(18, "0")
    .slice(0, 18)

  // The leading 9 reserves a deterministic, non-Shopify identity namespace.
  // A repeat request from the same email therefore receives the same serial.
  return createPowerSymbolsSerial(`9${numericIdentity}`, normalizedEmail)
}

export function verifyPowerSymbolsSerial(
  serial: string,
  email?: string,
): { orderId: string; buyerHash: string; serial: string } | null {
  const normalized = serial.trim().toUpperCase().replace(/\s/g, "")
  const match = normalized.match(serialPattern)
  if (!match) return null
  const [, orderId, buyerHash, groupedMac] = match
  const expected = Buffer.from(serialMac(orderId, buyerHash), "ascii")
  const actual = Buffer.from(groupedMac.replaceAll("-", ""), "ascii")
  if (
    actual.length !== expected.length ||
    !timingSafeEqual(actual, expected) ||
    (email && emailHash(email) !== buyerHash)
  ) {
    return null
  }
  return { orderId, buyerHash, serial: normalized }
}

function privateKey(): string {
  const encoded = requireEnvironment("POWER_SYMBOLS_LICENSE_PRIVATE_KEY_B64")
  return Buffer.from(encoded, "base64").toString("utf8")
}

function base64Url(value: Buffer | string): string {
  return Buffer.from(value).toString("base64url")
}

export function createActivationCertificate(input: {
  serial: string
  machine: string
}): string {
  const verified = verifyPowerSymbolsSerial(input.serial)
  if (!verified) throw new Error("Power Symbols serial is invalid")
  if (!/^[a-f0-9]{64}$/.test(input.machine)) {
    throw new Error("Machine fingerprint is invalid")
  }
  const claims = {
    schema: 1,
    product: POWER_SYMBOLS_PRODUCT,
    license_id: verified.serial,
    buyer: verified.buyerHash,
    machine: input.machine,
    release_max: POWER_SYMBOLS_ACTIVATION_MAX_VERSION,
    issued_at: new Date().toISOString(),
  }
  const encodedClaims = base64Url(
    JSON.stringify(claims, Object.keys(claims).sort()),
  )
  const signer = createSign("RSA-SHA256")
  signer.update(encodedClaims, "ascii")
  signer.end()
  const signature = signer.sign(privateKey())
  return `PSA1.${encodedClaims}.${base64Url(signature)}`
}
