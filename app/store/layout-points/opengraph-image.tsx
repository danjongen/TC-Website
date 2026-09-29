import { readFile } from "node:fs/promises"
import path from "node:path"

import { ImageResponse } from "next/og"

export const size = { width: 1200, height: 630 }
export const contentType = "image/png"
export const alt =
  "Layout Points + Datum Label Studio. From Vectorworks datum to physical datum. A label with a green exact-datum target on a survey grid."

const GREEN = "#00D26A"

/**
 * Share card. Survey grid, a printed label with its exact-datum target, and
 * the product line. Drawn, not a screenshot, so it never overstates what
 * the app shows.
 */
export default async function Image() {
  const fontDir = path.join(process.cwd(), "public/fonts")
  const [mono, monoBold] = await Promise.all([
    readFile(path.join(fontDir, "SpaceMono-Regular.ttf")),
    readFile(path.join(fontDir, "SpaceMono-Bold.ttf")),
  ])
  const grid = Array.from({ length: 20 }, (_, i) => i)
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        background: "#000",
        position: "relative",
        fontFamily: "Space Mono",
      }}
    >
      {grid.map((i) => (
        <div
          key={`v${i}`}
          style={{ position: "absolute", top: 0, bottom: 0, left: i * 64, width: 1, background: "#1c1c1f" }}
        />
      ))}
      {grid.slice(0, 11).map((i) => (
        <div
          key={`h${i}`}
          style={{ position: "absolute", left: 0, right: 0, top: i * 64, height: 1, background: "#1c1c1f" }}
        />
      ))}
      <div style={{ position: "absolute", left: 72, top: 140, display: "flex", flexDirection: "column", width: 640 }}>
        <div style={{ color: GREEN, fontSize: 18, letterSpacing: 3, textTransform: "uppercase", display: "flex" }}>
          [ TC Agency / Store / Field tools ]
        </div>
        <div style={{ color: "#fff", fontSize: 26, marginTop: 40, fontWeight: 700, letterSpacing: 1, display: "flex" }}>
          LAYOUT POINTS + DATUM LABEL STUDIO
        </div>
        <div
          style={{
            color: "#fff",
            fontSize: 52,
            lineHeight: 1,
            marginTop: 28,

            fontWeight: 700,
            letterSpacing: -2,
            display: "flex",
          }}
        >
          From Vectorworks datum to physical datum.
        </div>
        <div style={{ color: "#a1a1aa", fontSize: 18, marginTop: 36, letterSpacing: 1, display: "flex" }}>
          VECTORWORKS &gt; FIELD PACKAGE &gt; LABEL &gt; FIELD
        </div>
      </div>
      <div
        style={{
          position: "absolute",
          right: 84,
          top: 170,
          width: 330,
          height: 220,
          background: "#fafafa",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div style={{ height: 14, background: GREEN, display: "flex" }} />
        <div style={{ color: "#000", fontSize: 38, fontWeight: 700, margin: "20px 0 0 24px", display: "flex" }}>
          STG-003
        </div>
        <div
          style={{
            position: "absolute",
            left: 145,
            top: 120,
            width: 40,
            height: 40,
            borderRadius: 40,
            border: "4px solid #000",
            display: "flex",
          }}
        />
        <div
          style={{
            position: "absolute",
            left: 129,
            top: 138,
            width: 72,
            height: 4,
            background: "#000",
            display: "flex",
          }}
        />
        <div
          style={{
            position: "absolute",
            left: 163,
            top: 104,
            width: 4,
            height: 72,
            background: "#000",
            display: "flex",
          }}
        />
        <div
          style={{
            position: "absolute",
            left: 158,
            top: 133,
            width: 14,
            height: 14,
            borderRadius: 14,
            background: GREEN,
            display: "flex",
          }}
        />
        <div style={{ position: "absolute", left: 24, bottom: 16, color: "#3f3f46", fontSize: 16, display: "flex" }}>
          E 17.600 N -8.200 Z 0.000
        </div>
      </div>
      <div
        style={{
          position: "absolute",
          right: 84,
          top: 410,
          color: "#a1a1aa",
          fontSize: 18,
          letterSpacing: 2,
          display: "flex",
        }}
      >
        EXACT DATUM · CENTRE · EDGE · CORNER
      </div>
    </div>,
    {
      ...size,
      fonts: [
        { name: "Space Mono", data: mono, weight: 400, style: "normal" },
        { name: "Space Mono", data: monoBold, weight: 700, style: "normal" },
      ],
    },
  )
}
