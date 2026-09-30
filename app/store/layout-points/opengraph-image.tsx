import { readFile } from "node:fs/promises";
import path from "node:path";

import { ImageResponse } from "next/og";

import { faceTexts, type FaceText } from "./_components/label/face-layout";
import { FACE, FAMILY_NAME, LabelFace } from "./_components/label/label-face";
import { HERO, SAMPLE } from "./_components/print-run/geometry";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt =
  "Layout Points + Datum Label Studio. From Vectorworks datum to physical datum. A square Lighting layout label, L042, with its exact point at the top centre, on a survey grid.";

const GREEN = "#00D26A";

// The label is LabelFace itself (graphics only) with the type set here from faceTexts,
// so the share card cannot drift from the page. Sample data: the hero point.
const LABEL = SAMPLE[HERO];
const S = 380;
const CARD = { right: 84, top: 110 };
/** Baseline below the line box top at line height 1: half leading plus ascent, per family. */
const BASELINE = { cond: 0.9, mono: 0.875 } as const;

function tone(t: FaceText["tone"]): string {
  if (t === "meta") return FACE.meta;
  if (t === "alert") return FACE.hazard;
  if (t === "dept" && LABEL.kind === "layout") return LABEL.department.colour;
  return FACE.ink;
}

function FaceType({ t }: { t: FaceText }) {
  const size = t.size * S;
  const top = t.y * S - BASELINE[t.family] * size;
  const place =
    t.anchor === "start"
      ? { left: t.x * S }
      : t.anchor === "end"
        ? { right: S - t.x * S }
        : { left: 0, width: S, justifyContent: "center" };
  return (
    <div
      style={{
        position: "absolute",
        top,
        ...place,
        display: "flex",
        fontFamily: FAMILY_NAME[t.family],
        fontSize: size,
        fontWeight: t.weight,
        lineHeight: 1,
        letterSpacing: t.track * size,
        color: tone(t.tone),
        whiteSpace: "pre",
      }}
    >
      {t.text}
    </div>
  );
}

/**
 * Share card. Survey grid, the Datum Label Studio label face with sample data,
 * and the product line. Drawn, not a screenshot, so it never overstates what
 * the app shows.
 */
export default async function Image() {
  const fontDir = path.join(process.cwd(), "public/fonts");
  const [mono, monoBold, condSemi, condExtra, plexMedium, plexBold] = await Promise.all(
    [
      "SpaceMono-Regular.ttf",
      "SpaceMono-Bold.ttf",
      "BarlowCondensed-SemiBold.ttf",
      "BarlowCondensed-ExtraBold.ttf",
      "IBMPlexMono-Medium.ttf",
      "IBMPlexMono-Bold.ttf",
    ].map((f) => readFile(path.join(fontDir, f))),
  );
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
          width: S,
          height: S,
          display: "flex",
        }}
      >
        <LabelFace label={LABEL} width={S} height={S} bare />
        {faceTexts(LABEL).map((t) => (
          <FaceType key={t.key} t={t} />
        ))}
      </div>
      <div
        style={{
          position: "absolute",
          right: CARD.right,
          top: CARD.top + S + 22,
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
        { name: FAMILY_NAME.cond, data: condSemi, weight: 600, style: "normal" },
        { name: FAMILY_NAME.cond, data: condExtra, weight: 800, style: "normal" },
        { name: FAMILY_NAME.mono, data: plexMedium, weight: 500, style: "normal" },
        { name: FAMILY_NAME.mono, data: plexBold, weight: 700, style: "normal" },
      ],
    },
  );
}
