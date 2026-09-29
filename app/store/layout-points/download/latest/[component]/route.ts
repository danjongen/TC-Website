import { NextResponse } from "next/server"

import { COMPONENT_IDS, currentRelease, downloadAccess, type ComponentId } from "@/lib/layout-points/release"

/**
 * Latest links. Redirect (302, never cached as permanent) to the immutable,
 * versioned file for the current public release. Until a release is public
 * this sends people back to the download page with an error flag, so no
 * file is ever exposed early.
 */
export async function GET(request: Request, { params }: { params: Promise<{ component: string }> }) {
  const { component } = await params
  const base = new URL("/store/layout-points/download", request.url)

  if (!COMPONENT_IDS.includes(component as ComponentId)) {
    base.searchParams.set("error", "unknown")
    return NextResponse.redirect(base, { status: 302, headers: { "Cache-Control": "no-store" } })
  }

  // Only a free public release has a public file. A paid beta is delivered
  // through the purchase, so its Latest link never reveals the file URL.
  const release = downloadAccess() === "public" ? currentRelease(component as ComponentId) : null
  if (!release) {
    base.searchParams.set("error", "unavailable")
    return NextResponse.redirect(base, { status: 302, headers: { "Cache-Control": "no-store" } })
  }

  return NextResponse.redirect(release.url, { status: 302, headers: { "Cache-Control": "no-store" } })
}
