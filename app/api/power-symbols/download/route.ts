import { readFile } from "node:fs/promises"
import path from "node:path"
import { NextResponse } from "next/server"
import { verifyPowerSymbolsSerial } from "@/lib/power-symbols-license"

export const runtime = "nodejs"

const filename = "Power-Symbols-0.2.5-VW2023-2026-Paid-Beta.zip"

export async function GET(request: Request) {
  const serial = new URL(request.url).searchParams.get("serial") || ""
  try {
    if (!verifyPowerSymbolsSerial(serial)) {
      return NextResponse.json(
        { error: "This private beta link is not valid." },
        { status: 403 },
      )
    }
    const archive = await readFile(
      path.join(process.cwd(), "private", "power-symbols", filename),
    )
    return new NextResponse(archive, {
      headers: {
        "Cache-Control": "private, no-store, max-age=0",
        "Content-Disposition": `attachment; filename="${filename}"`,
        "Content-Type": "application/zip",
        "X-Content-Type-Options": "nosniff",
      },
    })
  } catch {
    return NextResponse.json(
      { error: "The beta download is temporarily unavailable." },
      { status: 503 },
    )
  }
}
