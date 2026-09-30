import { readFile } from "node:fs/promises";
import path from "node:path";

import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt =
  "Layout Points + Datum Label Studio. From Vectorworks datum to physical datum. A label with a green exact-datum target on a survey grid.";

const GREEN = "#00D26A";

// The label matches LabelFace: cream stock, a Staging chip, the ID in Space Mono 700,
// meta axis letters, and STG-003's exact datum on the top edge (sample datum tc).
const PAPER = "#F3F0E8";
const INK = "#0B0B0B";
const META = "#6B675E";
const CARD = { right: 84, top: 150, w: 360, h: 240 };
const H = CARD.h;
const TX = 0.08 * H;
const DX = CARD.w / 2;
const STROKE = 0.009 * H;
const RING = 0.055 * H + STROKE / 2; // outer edge of the ring stroke

/** One face row placed by its baseline. Space Mono at line height 1 puts the baseline 0.88em below the box top. */
function Row({
  baseline,
  size,
  left = TX,
  color = INK,
  bold = false,
  track = 0.04,
  axis,
  children,
}: {
  baseline: number;
  size: number;
  left?: number;
  color?: string;
  bold?: boolean;
  track?: number;
  axis?: string;
  children: string;
}) {
  return (
    <div
      style={{
        position: "absolute",
        left,
        top: baseline - 0.88 * size,
        fontSize: size,
        lineHeight: 1,
        fontWeight: bold ? 700 : 400,
        letterSpacing: track * size,
        color,
        whiteSpace: "pre",
        display: "flex",
      }}
    >
      {axis ? <span style={{ color: META }}>{`${axis} `}</span> : null}
      <span>{children}</span>
    </div>
  );
}

/**
 * Share card. Survey grid, a printed label with its exact-datum target, and
 * the product line. Drawn, not a screenshot, so it never overstates what
 * the app shows.
 */
export default async function Image() {
  const fontDir = path.join(process.cwd(), "public/fonts");
  const [mono, monoBold] = await Promise.all([
    readFile(path.join(fontDir, "SpaceMono-Regular.ttf")),
    readFile(path.join(fontDir, "SpaceMono-Bold.ttf")),
  ]);
  const grid = Array.from({ length: 20 }, (_, i) => i);
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
          style={{
            position: "absolute",
            top: 0,
            bottom: 0,
            left: i * 64,
            width: 1,
            background: "#1c1c1f",
          }}
        />
      ))}
      {grid.slice(0, 11).map((i) => (
        <div
          key={`h${i}`}
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            top: i * 64,
            height: 1,
            background: "#1c1c1f",
          }}
        />
      ))}
      <div
        style={{
          position: "absolute",
          left: 72,
          top: 140,
          display: "flex",
          flexDirection: "column",
          width: 640,
        }}
      >
        <div
          style={{
            color: GREEN,
            fontSize: 18,
            letterSpacing: 3,
            textTransform: "uppercase",
            display: "flex",
          }}
        >
          [ TC Agency / Store / Field tools ]
        </div>
        <div
          style={{
            color: "#fff",
            fontSize: 26,
            marginTop: 40,
            fontWeight: 700,
            letterSpacing: 1,
            display: "flex",
          }}
        >
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
        <div
          style={{
            color: "#a1a1aa",
            fontSize: 18,
            marginTop: 36,
            letterSpacing: 1,
            display: "flex",
          }}
        >
          VECTORWORKS &gt; FIELD PACKAGE &gt; LABEL &gt; FIELD
        </div>
      </div>
      <div
        style={{
          position: "absolute",
          right: CARD.right,
          top: CARD.top,
          width: CARD.w,
          height: CARD.h,
          background: PAPER,
          borderRadius: 3,
          overflow: "hidden",
          display: "flex",
        }}
      >
        {/* Staging chip: top on the department cap height, bottom on its baseline. */}
        <div
          style={{
            position: "absolute",
            left: TX,
            top: 0.1 * H,
            width: 0.07 * H,
            height: 0.07 * H,
            background: GREEN,
            border: `${0.006 * H}px solid ${INK}`,
            boxSizing: "border-box",
            display: "flex",
          }}
        />
        <Row
          baseline={0.17 * H}
          size={0.1 * H}
          left={TX + 0.1 * H}
          color={META}
        >
          STAGING
        </Row>
        <Row baseline={0.345 * H} size={0.145 * H} bold track={0}>
          STG-003
        </Row>
        <Row baseline={0.64 * H} size={0.1 * H} axis="E">
          17.600
        </Row>
        <Row baseline={0.77 * H} size={0.1 * H} axis="N">
          -8.200
        </Row>
        <Row baseline={0.9 * H} size={0.1 * H} axis="Z">
          0.000
        </Row>
        {/* Exact datum on the top edge: the card clips it to a half target, as the face does. */}
        <div
          style={{
            position: "absolute",
            left: DX - 0.08 * H,
            top: -0.08 * H,
            width: 0.16 * H,
            height: 0.16 * H,
            borderRadius: 0.16 * H,
            background: GREEN,
            display: "flex",
          }}
        />
        <div
          style={{
            position: "absolute",
            left: DX - 0.09 * H,
            top: -STROKE / 2,
            width: 0.18 * H,
            height: STROKE,
            background: INK,
            display: "flex",
          }}
        />
        <div
          style={{
            position: "absolute",
            left: DX - STROKE / 2,
            top: -0.09 * H,
            width: STROKE,
            height: 0.18 * H,
            background: INK,
            display: "flex",
          }}
        />
        <div
          style={{
            position: "absolute",
            left: DX - RING,
            top: -RING,
            width: RING * 2,
            height: RING * 2,
            borderRadius: RING * 2,
            border: `${STROKE}px solid ${INK}`,
            boxSizing: "border-box",
            display: "flex",
          }}
        />
        <div
          style={{
            position: "absolute",
            left: DX - 0.014 * H,
            top: -0.014 * H,
            width: 0.028 * H,
            height: 0.028 * H,
            borderRadius: 0.028 * H,
            background: INK,
            display: "flex",
          }}
        />
      </div>
      <div
        style={{
          position: "absolute",
          right: CARD.right,
          top: CARD.top + CARD.h + 24,
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
  );
}
