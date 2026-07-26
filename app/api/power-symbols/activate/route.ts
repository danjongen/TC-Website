import { NextResponse } from "next/server"
import {
  createActivationCertificate,
  verifyPowerSymbolsSerial,
} from "@/lib/power-symbols-license"

export const runtime = "nodejs"

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
