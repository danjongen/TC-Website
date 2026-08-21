import { NextResponse } from "next/server"
import {
  createActivationCertificate,
  verifyPowerSymbolsSerial,
} from "@/lib/power-symbols-license"
import { POWER_SYMBOLS_VERSION } from "@/lib/power-symbols-version"

export const runtime = "nodejs"

function compareVersions(left: string, right: string) {
  const a = left.split(".").map(Number)
  const b = right.split(".").map(Number)
  for (let index = 0; index < 3; index += 1) {
    if (a[index] !== b[index]) return a[index] - b[index]
  }
  return 0
}

export async function POST(request: Request) {
  try {
    const contentLength = Number(request.headers.get("content-length") || 0)
    if (contentLength > 16_384) {
      return NextResponse.json(
        { error: "Activation request is too large." },
        { status: 413 },
      )
    }
    const body = (await request.json()) as Record<string, unknown>
    const serial = String(body.serial || "").trim()
    const email = String(body.email || "").trim().toLowerCase()
    const machine = String(body.machine || "").trim().toLowerCase()
    const version = String(body.version || "").trim()
    if (!verifyPowerSymbolsSerial(serial, email)) {
      return NextResponse.json(
        {
          error:
            "That serial and checkout email do not match. Use the details from your private beta email.",
        },
        { status: 403 },
      )
    }
    if (!/^[a-f0-9]{64}$/.test(machine)) {
      return NextResponse.json(
        { error: "Vectorworks supplied an invalid Mac identity." },
        { status: 400 },
      )
    }
    if (!/^[0-9]+\.[0-9]+\.[0-9]+$/.test(version)) {
      return NextResponse.json(
        { error: "Vectorworks supplied an invalid plug-in version." },
        { status: 400 },
      )
    }
    if (compareVersions(version, POWER_SYMBOLS_VERSION) > 0) {
      return NextResponse.json(
        {
          code: "CLIENT_VERSION_AHEAD",
          error: `Power Symbols ${version} is newer than the active licence service (${POWER_SYMBOLS_VERSION}). Please update the beta service and try again.`,
          release_max: POWER_SYMBOLS_VERSION,
        },
        {
          status: 409,
          headers: {
            "Cache-Control": "no-store, no-cache, must-revalidate",
          },
        },
      )
    }
    const certificate = createActivationCertificate({ serial, machine })
    return NextResponse.json(
      { certificate },
      {
        headers: {
          "Cache-Control": "no-store, no-cache, must-revalidate",
        },
      },
    )
  } catch {
    return NextResponse.json(
      { error: "Activation is temporarily unavailable. Please try again." },
      { status: 503 },
    )
  }
}
