// Pure layout maths for LabelFace, shared with the node test. The face reproduces the
// Datum Label Studio carrier design (board 7a, AXIS-01 interior inside the datum frame
// carrier): a square stock, a department colour frame (hazard stripes for CONTROL),
// a white card, and the exact point at the top centre of the stock.
// Every length is a fraction of the stock side S, measured from the owner's design board.

import type { LabelData } from "./label-face";

/** Frame depth: the card sits this far in from every cut edge. */
export const FRAME = 0.092;
/** Exact point ring: outer and inner radius about the datum. */
export const RING = { outer: 0.115, inner: 0.062 } as const;
/** Text margin inside the card: rows start and end 0.042 S in from the card. */
export const TEXT_X0 = 0.134;
export const TEXT_X1 = 0.866;

/** IBM Plex Mono advance per em. */
export const MONO_ADVANCE = 0.6;
/** Cap height per em, both families. */
export const CAP = 0.7;

export type FaceText = {
  key: string;
  x: number;
  y: number; // baseline
  size: number;
  anchor: "start" | "middle" | "end";
  family: "cond" | "mono";
  weight: 500 | 600 | 700 | 800; // loaded: mono 500 and 700, condensed 600 and 800 (the test holds this)
  track: number; // em
  tone: "ink" | "meta" | "dept" | "alert";
  text: string;
};

/** Metres, printed as the label prints them: sign, three integer digits, three decimals. */
export function formatMetres(value: string): string {
  const v = Number(value);
  const sign = v < 0 ? "-" : "+";
  const [i, f = ""] = Math.abs(v).toFixed(3).split(".");
  return `${sign}${i.padStart(3, "0")}.${f} m`;
}

const QUARTERS = ["", " 1/4", " 1/2", " 3/4"];

/** Feet and inches to the nearest quarter inch, as the label prints them. */
export function formatImperial(value: string): string {
  const v = Number(value);
  const sign = v < 0 ? "-" : "+";
  let q = Math.round((Math.abs(v) / 0.0254) * 4); // quarter inches
  const feet = Math.floor(q / 48);
  q -= feet * 48;
  const inches = Math.floor(q / 4);
  return `${sign}${String(feet).padStart(2, "0")}' ${String(inches).padStart(2, "0")}${QUARTERS[q % 4]}"`;
}

/** Both rules run TEXT_X0 to TEXT_X1. */
export const RULES = { top: 0.577, bottom: 0.827, width: 0.0022 } as const;

/** The CONTROL alert bar, between the top rule and the note. */
export const ALERT_BAR = { y0: 0.581, y1: 0.652 } as const;

/** Axis marks: white bands across the frame on the stock centrelines, a black line down each. */
export const AXIS = { band: 0.04, line: 0.005 } as const;

/** Hazard stripes: backslash diagonals, period along x, black first at the phase. */
export const HAZARD = { period: 0.0787, phase: -0.013 } as const;

/** Every printed string on the face, placed in S units. */
export function faceTexts(label: LabelData): FaceText[] {
  const control = label.kind === "control";
  const t = (
    key: string,
    x: number,
    y: number,
    size: number,
    text: string,
    o: Partial<Pick<FaceText, "anchor" | "family" | "weight" | "track" | "tone">> = {},
  ): FaceText => ({
    key,
    x,
    y,
    size,
    text,
    anchor: o.anchor ?? "start",
    family: o.family ?? "mono",
    weight: o.weight ?? 700,
    track: o.track ?? 0,
    tone: o.tone ?? "ink",
  });
  const [n, of] = label.seq;
  const pt = `PT ${String(n).padStart(2, "0")}/${String(of).padStart(2, "0")}`;
  const out: FaceText[] = [
    t("project", TEXT_X0, 0.153, 0.022, label.project, { weight: 700 }),
    t("exact", 0.5, 0.144, 0.019, "EXACT POINT", { anchor: "middle", family: "cond", weight: 600, track: 0.38 }),
    t("seq", TEXT_X1, 0.153, 0.022, pt, { anchor: "end", weight: 700 }),
    t("id", 0.5, 0.504, 0.354, label.id, { anchor: "middle", family: "cond", weight: 800, track: -0.025 }),
  ];
  const rows = control ? [0.738, 0.778, 0.819] : [0.714, 0.754, 0.796];
  if (control) {
    out.push(
      t("alert", 0.5, 0.634, 0.04, "CONTROL POINT: DO NOT DISTURB", {
        anchor: "middle",
        family: "cond",
        weight: 800,
        tone: "alert",
        track: 0.02,
      }),
      t("note", TEXT_X0, 0.692, 0.0155, "NOTE: FIXED SURVEY REFERENCE", { weight: 500, track: 0.15, tone: "meta" }),
    );
  } else {
    out.push(
      t("dept-code", TEXT_X0, 0.634, 0.039, label.department.code, { family: "cond", weight: 800, tone: "dept" }),
      t("dept", TEXT_X0 + 0.047, 0.63, 0.0186, label.department.name.toUpperCase(), {
        family: "cond",
        weight: 600,
        track: 0.45,
      }),
      t("note-key", TEXT_X1, 0.619, 0.0155, "NOTE", { anchor: "end", weight: 500, track: 0.15, tone: "meta" }),
      t("note", TEXT_X1, 0.651, 0.0246, label.note, { anchor: "end", weight: 700 }),
    );
  }
  const axes = [
    ["e", label.coords.e],
    ["n", label.coords.n],
    ["z", label.coords.z],
  ] as const;
  axes.forEach(([axis, v], i) => {
    out.push(
      t(`${axis}-axis`, TEXT_X0, rows[i], 0.0277, axis.toUpperCase(), { weight: 500, tone: "meta" }),
      t(`${axis}-m`, 0.195, rows[i], 0.0277, formatMetres(v)),
      t(`${axis}-ft`, 0.43, rows[i], 0.0277, formatImperial(v)),
    );
  });
  out.push(
    t("src", TEXT_X0, 0.863, 0.0175, `SRC ${label.src}`, { weight: 500 }),
    t("rev", TEXT_X1, 0.863, 0.0175, control ? `CTRL / SURVEY CONTROL · REV ${label.rev}` : `REV ${label.rev}`, {
      anchor: "end",
      weight: 500,
    }),
  );
  return out;
}

/** Mono boxes are exact from the advance; condensed boxes use the caller's advance. */
export function textBox(f: FaceText, advance = MONO_ADVANCE) {
  const n = f.text.length;
  const w = (n * advance + Math.max(0, n - 1) * f.track) * f.size;
  const x0 = f.anchor === "start" ? f.x : f.anchor === "end" ? f.x - w : f.x - w / 2;
  return { x0, x1: x0 + w, y0: f.y - CAP * f.size, y1: f.y };
}
