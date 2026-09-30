// Print Run to Floor Mark: sample data, run order, timeline and both layout geometries.
// Pure TS. Every distance the scenes draw comes from here; the CSS keyframe literals
// in layout-points.css are checked against the derived values by the node test.

import { datumPoint } from "../label/datum";
import type { LabelData } from "../label/label-face";

export type RunId = "STG-003" | "RIG-012" | "STG-001" | "CTL-01";
export type PlanId = RunId | "CTL-02";

// Sample drawing. Sanitised coordinates, preformatted as exported, Z 0.000.
export const SAMPLE: Record<RunId, LabelData> = {
  "CTL-01": {
    kind: "control",
    id: "CTL-01",
    coords: { e: "9.400", n: "-10.700", z: "0.000" },
    datum: "c",
  },
  "STG-001": {
    kind: "layout",
    id: "STG-001",
    department: { name: "Staging", colour: "#00D26A" },
    coords: { e: "11.000", n: "-2.200", z: "0.000" },
    datum: "br",
  },
  "RIG-012": {
    kind: "layout",
    id: "RIG-012",
    department: { name: "Rigging", colour: "#38BDF8" },
    coords: { e: "20.000", n: "-5.200", z: "0.000" },
    datum: "ml",
  },
  "STG-003": {
    kind: "layout",
    id: "STG-003",
    department: { name: "Staging", colour: "#00D26A" },
    coords: { e: "17.600", n: "-8.200", z: "0.000" },
    datum: "tc",
  },
};

/** Plan only, never printed. */
export const PLAN_ONLY = {
  "CTL-02": {
    kind: "control",
    id: "CTL-02",
    coords: { e: "20.600", n: "-0.700", z: "0.000" },
  },
} as const;

/** Print order. CTL-01 prints first and rests farthest down the strip. */
export const RUN: readonly RunId[] = [
  "CTL-01",
  "STG-001",
  "RIG-012",
  "STG-003",
];

/** The hero point. */
export const HERO: RunId = "STG-003";

/** Sample drawing extents in drawing units (E and N). */
export const DRAWING = {
  e0: 8,
  deck: { e0: 11, e1: 19, n0: -8.2, n1: -2.2 },
  centreline: 15,
} as const;

export const JOB = { stamp: "2026-09-29 14.30" } as const;

/** When false, ink is not clipped at the print line: labels arrive printed. */
export const PRINT_REVEAL = true;

/**
 * Sheet palette, WCAG contrast on black in brackets. The header uses the same hex as
 * Tailwind arbitrary values.
 */
export const PALETTE = {
  sheet: "#000000", // bench and floor are one black sheet
  panel: "#0A0A0A", // key plan panel only
  rule: "#27272A", // bench and floor rule, plan keyline, hatch, progress track
  decor: "#52525B", // decorative only (2.72:1): liner edges, spiral, plan centreline, underline
  line: "#71717A", // essential non text (4.35:1)
  anno: "#A1A1AA", // tags, plan IDs, eyebrows, leader, bracket (8.19:1)
  head: "#D4D4D8", // print head, non hero plan crosshairs
  strong: "#E4E4E7", // painted mark, key B cross, ring, bubbles, cut flash, registration
  text: "#FAFAFA", // hero plan ID, bubble letters, legend statements, plan blips
  go: "#00D26A", // datum lineage and live state only (10.43:1)
  liner: "#18181B", // web liner fill
  paper: "#F3F0E8", // blank stock, the same cream as the printed faces
} as const;

// Timeline in ms from first paint. Every --d in the scene and header comes from here.
// Print, tear and peel lock to one 640 ms ka chunk grid; the carry ends in a held breath.
export const T = {
  planDraw: 0,
  controls: 120,
  points: [200, 280, 360] as const, // STG-001, RIG-012, STG-003 in the plan, 80 ms stagger
  ring: 520,
  bubble: 600,
  floorBubble: 680,
  firstTopChange: 700,
  verified: 700,
  printLive: 800,
  advance: [900, 1540, 2180, 2820] as const,
  advanceDur: 520,
  count: [1420, 2060, 2700, 3340] as const,
  printDone: 3340,
  tear: 3640, // the cut flash
  cutDur: 240,
  torn: 3880, // the strip slides downstream
  tearDur: 500,
  tearDone: 4380,
  peel: 4560,
  transfer: 4700,
  carry: 4840,
  carryDur: 900,
  peelDone: 4840,
  regist: 5580,
  descend: 6080,
  hit: 6380,
  ping: 6430,
  bracket: 6600,
  calloutA: 6600,
  calloutB: 6680,
  merge: 6780,
  rest: 7280,
} as const;

/** The peel lifts the label to this scale about its datum; the descent returns it to 1. */
export const LIFT = 1.04;
/** Registration corners close and hold until contact. */
export const REG_DUR = 900;
/** The camera lean: push in during the held breath, release before rest. */
export const LEAN_DUR = 1600;
/** The floor detail grade: 0.75 through print and tear, back to 1 on the peel. */
export const GRADE = { d: T.printLive, dur: T.peel - T.printLive } as const;

/** Beats in the order they fire, for the ordering test. */
export const T_SEQUENCE: readonly number[] = [
  T.planDraw,
  T.controls,
  ...T.points,
  T.ring,
  T.bubble,
  T.floorBubble,
  T.verified,
  T.printLive,
  ...T.advance,
  T.printDone,
  T.tear,
  T.torn,
  T.tearDone,
  T.peel,
  T.transfer,
  T.carry,
  T.regist,
  T.descend,
  T.hit,
  T.ping,
  T.bracket,
  T.calloutB,
  T.merge,
  T.rest,
];

type XY = { x: number; y: number };
type Box = { x: number; y: number; w: number; h: number };
type Line = { x1: number; y1: number; x2: number; y2: number };

/** Hatch direction in screen space: backslash runs down right, slash runs up right. */
export type HatchDir = "\\" | "/";

export type Geometry = {
  axis: "x" | "y";
  view: { w: number; h: number };
  label: { w: number; h: number; r: number; gap: number; pitch: number };
  roll: {
    cx: number;
    cy: number;
    r: number;
    core: number;
    outer: number;
    turns: number;
    /** Tape tail: the spiral's free end, and the notch across the outer wrap, sit at this angle (rad). */
    phase: number;
    notch: [number, number];
  };
  web: { c0: number; c1: number }; // liner extent across the feed
  printLine: number;
  tearBar: number;
  offRollMin: number;
  slots: Record<RunId, XY>; // rest, post tear
  nextBlank: XY;
  tornEdge: number; // leading torn edge of the strip at rest
  tearShift: number; // the tear moves the strip this far downstream
  tooth: number; // torn edge serration depth
  tearOrigin: XY;
  mark: XY & { arm: number };
  landed: XY;
  reticle: { r: number; gap: number }; // gap in degrees at each quadrant
  bench: Box; // clip extents only
  rule: Line;
  printer: { box: Box; arm: number }; // crop corners
  head: { at: number; c0: number; c1: number; tick: number };
  flashExt: number;
  tearTeeth: { c0: number; c1: number; amp: number; step: number };
  cut: { c0: number; c1: number; offset: number };
  feed: string;
  printerLeader: string | null;
  plan: {
    box: Box;
    ox: number;
    oy: number;
    s: number;
    cross: number;
    arm: number;
    tri: number;
    ring: number;
    blip: number;
    clOver: [number, number];
    dash: [number, number, number, number];
    bubble: XY & { r: number };
    ids: Partial<Record<PlanId, XY & { anchor: "start" | "end" }>>;
  };
  deck: {
    x0: number;
    x1: number;
    y0: number;
    y1: number;
    breaks: number[];
    zig: number;
  }; // floor detail deck phantom
  /** band: hatch depth above the deck edge (the section cut); the rest of the deck is keyline only. */
  hatch: { pitch: number; dir: HatchDir; band: number };
  hairlines: { edge: [number, number]; setOut: [number, number]; dash: string };
  overspray: [number, number][];
  regCorners: { gap: number; arm: number };
  transfer: { persist: boolean };
  legend: {
    keyX: [number, number];
    eyebrowX: number;
    statementX: number;
    a: { key: number; eyebrow: number; statement: number };
    b: { key: number; eyebrow: number; statement: number };
    keyArm: number;
    bracket: string;
    merged: string;
  };
  titleBlock: {
    bubble: XY & { r: number };
    text: XY;
    underline: [number, number, number];
  };
  payoff: Box;
  tags: Record<"plan" | "deck" | "printer" | "feed", XY>;
  type: {
    anno: number;
    annoTrack: number;
    idTrack: number;
    eyebrowTrack: number;
    statement: number;
  };
  stroke: { accent: number; hair: number; fine: number };
  lean: { scale: number };
};

const OVERSPRAY: [number, number][] = [
  [-17, -9],
  [-12, -18],
  [-6, -21],
  [8, -16],
  [15, -10],
  [19, -3],
  [-20, 3],
  [-9, 6],
  [11, 5],
  [4, -24],
];

export const DESKTOP: Geometry = {
  axis: "x",
  view: { w: 1200, h: 480 },
  label: { w: 168, h: 112, r: 2, gap: 14, pitch: 182 },
  roll: {
    cx: 66,
    cy: 102,
    r: 60,
    core: 16,
    outer: 56,
    turns: 5,
    phase: -Math.PI / 2,
    notch: [52, 60],
  },
  web: { c0: 40, c1: 164 },
  printLine: 298,
  tearBar: 305,
  offRollMin: 66,
  slots: {
    "STG-003": { x: 320, y: 46 },
    "RIG-012": { x: 502, y: 46 },
    "STG-001": { x: 684, y: 46 },
    "CTL-01": { x: 866, y: 46 },
  },
  nextBlank: { x: 130, y: 46 },
  tornEdge: 1041,
  tearShift: 8,
  tooth: 3,
  tearOrigin: { x: 1041, y: 102 },
  mark: { x: 586, y: 336, arm: 22 },
  landed: { x: 502, y: 336 },
  reticle: { r: 15, gap: 24 },
  bench: { x: 0, y: 0, w: 1200, h: 200 },
  rule: { x1: 0, y1: 200, x2: 1200, y2: 200 },
  printer: { box: { x: 136, y: 20, w: 164, h: 164 }, arm: 10 },
  head: { at: 298, c0: 40, c1: 164, tick: 0 },
  flashExt: 10,
  tearTeeth: { c0: 36, c1: 168, amp: 1.5, step: 3 },
  cut: { c0: 36, c1: 168, offset: 2.5 },
  feed: "M320 186H372M367 182.5L372 186L367 189.5",
  printerLeader: null,
  plan: {
    // Starts at x 26, not 16: the 1.04 lean about the mark keeps the panel keyline inside the frame.
    box: { x: 26, y: 216, w: 280, h: 248 },
    ox: 40,
    oy: 258,
    s: 17,
    cross: 3,
    arm: 5,
    tri: 7,
    ring: 11,
    blip: 7,
    clOver: [12, 6],
    dash: [8, 3, 1.5, 3],
    bubble: { x: 242, y: 430, r: 8 },
    ids: {
      "CTL-01": { x: 76, y: 444, anchor: "start" },
      "CTL-02": { x: 242, y: 274, anchor: "end" },
      "STG-001": { x: 82, y: 292, anchor: "end" },
      "RIG-012": { x: 253, y: 350, anchor: "start" },
      "STG-003": { x: 190, y: 416, anchor: "end" },
    },
  },
  deck: { x0: 320, x1: 852, y0: 228, y1: 336, breaks: [320, 852], zig: 250 },
  hatch: { pitch: 6, dir: "\\", band: 28 },
  hairlines: { edge: [304, 868], setOut: [216, 468], dash: "12 3 2 3" },
  overspray: OVERSPRAY,
  regCorners: { gap: 6, arm: 10 },
  transfer: { persist: true },
  legend: {
    keyX: [880, 892],
    eyebrowX: 898,
    statementX: 880,
    a: { key: 260.5, eyebrow: 264, statement: 284 },
    b: { key: 302.5, eyebrow: 306, statement: 326 },
    keyArm: 4.5,
    bracket: "M874 254H868V330H874",
    merged: "M868 292H630L596.61 325.39", // 45 degrees, ending on the reticle radius (15)
  },
  titleBlock: {
    bubble: { x: 328, y: 456, r: 8 },
    text: { x: 344, y: 460 },
    underline: [344, 455, 465],
  },
  payoff: { x: 480, y: 222, w: 710, h: 240 },
  tags: {
    plan: { x: 38, y: 234 },
    deck: { x: 332, y: 246 },
    printer: { x: 144, y: 33 },
    feed: { x: 380, y: 190 },
  },
  type: {
    anno: 10.5,
    annoTrack: 0.14,
    idTrack: 0.04,
    eyebrowTrack: 0.14,
    statement: 15,
  },
  stroke: { accent: 1.35, hair: 0.9, fine: 0.75 },
  lean: { scale: 1.04 },
};

export const MOBILE: Geometry = {
  axis: "y",
  view: { w: 340, h: 516 },
  label: { w: 150, h: 100, r: 2, gap: 10, pitch: 110 },
  roll: {
    cx: 86,
    cy: -52,
    r: 84,
    core: 16,
    outer: 80,
    turns: 5,
    phase: Math.PI / 2,
    notch: [76, 84],
  },
  web: { c0: 6, c1: 166 },
  printLine: 54,
  tearBar: 59,
  offRollMin: -52,
  slots: {
    "STG-003": { x: 11, y: 72 },
    "RIG-012": { x: 11, y: 182 },
    "STG-001": { x: 11, y: 292 },
    "CTL-01": { x: 11, y: 402 },
  },
  nextBlank: { x: 11, y: -46 },
  tornEdge: 507,
  tearShift: 8,
  tooth: 3,
  tearOrigin: { x: 86, y: 507 },
  mark: { x: 256, y: 350, arm: 18 },
  landed: { x: 181, y: 350 },
  reticle: { r: 13, gap: 24 },
  bench: { x: 0, y: 0, w: 172, h: 516 },
  rule: { x1: 174, y1: 68, x2: 174, y2: 516 },
  printer: { box: { x: 2, y: 30, w: 168, h: 34 }, arm: 8 },
  head: { at: 54, c0: 6, c1: 166, tick: 0 },
  flashExt: 6,
  tearTeeth: { c0: 2, c1: 170, amp: 1.5, step: 3 },
  cut: { c0: 6, c1: 170, offset: 2.5 },
  feed: "M188 44V62M184.5 58.5L188 62L191.5 58.5",
  printerLeader: "M173 34.5H180",
  plan: {
    box: { x: 184, y: 72, w: 152, h: 116 },
    ox: 183,
    oy: 77,
    s: 9.6,
    cross: 2.5,
    arm: 4,
    tri: 5,
    ring: 8,
    blip: 5.5,
    clOver: [8, 5],
    dash: [6, 2.5, 1.2, 2.5],
    bubble: { x: 318, y: 172, r: 7 },
    ids: {
      "STG-003": { x: 262, y: 176, anchor: "end" },
    },
  },
  deck: { x0: 184, x1: 336, y0: 282, y1: 350, breaks: [], zig: 316 },
  hatch: { pitch: 6, dir: "/", band: 68 }, // the whole deck: the mobile deck has no break lines to hold a keyline
  hairlines: { edge: [180, 340], setOut: [276, 462], dash: "8 2.5 1.5 2.5" },
  overspray: OVERSPRAY.map(([x, y]) => [
    Math.round(x * 0.82),
    Math.round(y * 0.82),
  ]),
  regCorners: { gap: 5, arm: 8 },
  transfer: { persist: false },
  legend: {
    keyX: [196, 206],
    eyebrowX: 210,
    statementX: 196,
    a: { key: 212.5, eyebrow: 216, statement: 232 },
    b: { key: 248.5, eyebrow: 252, statement: 268 },
    keyArm: 4,
    bracket: "M192 205H186V272H192",
    merged: "M186 272V280L246.81 340.81", // 45 degrees, ending on the reticle radius (13)
  },
  titleBlock: {
    bubble: { x: 192, y: 476, r: 7 },
    text: { x: 204, y: 480 },
    underline: [204, 303, 485],
  },
  payoff: { x: 180, y: 200, w: 160, h: 280 },
  tags: {
    plan: { x: 190, y: 86 },
    deck: { x: 298, y: 298 },
    printer: { x: 184, y: 38 },
    feed: { x: 196, y: 57 },
  },
  type: {
    anno: 10.5,
    annoTrack: 0.06,
    idTrack: 0.04,
    eyebrowTrack: 0.04,
    statement: 12,
  },
  stroke: { accent: 1.5, hair: 1, fine: 0.75 },
  // Mark at x 256, not 258: at 1.03 the right registration corner (x 336) peaks at 338.4 in a 340 view.
  lean: { scale: 1.03 },
};

/** Drawing coordinates to the key-plan inset, to scale. */
export function planPoint(geo: Geometry, e: number, n: number): XY {
  return {
    x: round(geo.plan.ox + (e - DRAWING.e0) * geo.plan.s),
    y: round(geo.plan.oy - n * geo.plan.s),
  };
}

/** The label box of a strip slot at rest. */
export function slotBox(geo: Geometry, id: RunId) {
  return {
    x: geo.slots[id].x,
    y: geo.slots[id].y,
    width: geo.label.w,
    height: geo.label.h,
  };
}

/** The hero label's datum in its strip slot at rest. */
export function restDatum(geo: Geometry): XY {
  return datumPoint(SAMPLE[HERO].datum, slotBox(geo, HERO));
}

/** The hero label's datum once landed on the floor. Equals the mark. */
export function landedDatum(geo: Geometry): XY {
  return datumPoint(SAMPLE[HERO].datum, {
    ...geo.landed,
    width: geo.label.w,
    height: geo.label.h,
  });
}

/** The carry move: mark minus rest datum. */
export function carry(geo: Geometry): XY {
  const r = restDatum(geo);
  return { x: geo.mark.x - r.x, y: geo.mark.y - r.y };
}

/** Roll rotation per advance, in degrees: pitch over radius. */
export function turnDeg(geo: Geometry): number {
  return (geo.label.pitch / geo.roll.r) * (180 / Math.PI);
}

/** Label size along the feed. */
export function alongSize(geo: Geometry): number {
  return geo.axis === "x" ? geo.label.w : geo.label.h;
}

/** A point from along-feed and across-feed coordinates. */
export function pt(geo: Geometry, along: number, across: number): XY {
  return geo.axis === "x" ? { x: along, y: across } : { x: across, y: along };
}

/** A rect from along-feed and across-feed spans. */
export function span(
  geo: Geometry,
  a0: number,
  a1: number,
  c0: number,
  c1: number,
) {
  return geo.axis === "x"
    ? { x: a0, y: c0, width: a1 - a0, height: c1 - c0 }
    : { x: c0, y: a0, width: c1 - c0, height: a1 - a0 };
}

/** The strip's trailing torn edge at rest: half a gap upstream of the hero slot. */
export function stripTrail(geo: Geometry): number {
  const s = geo.slots[HERO];
  return (geo.axis === "x" ? s.x : s.y) - geo.label.gap / 2;
}

/** Along-feed start of the roll-side blanks that can be seen between the roll and the tear bar. */
export function rollSideBlanks(geo: Geometry): number[] {
  const first = geo.axis === "x" ? geo.nextBlank.x : geo.nextBlank.y;
  const out: number[] = [];
  for (let a = first; a + alongSize(geo) > geo.offRollMin; a -= geo.label.pitch)
    out.push(a);
  return out;
}

/** Serrated torn edge, filled with the bench colour, biting into the web on one side. */
export function tornEdgePoints(
  geo: Geometry,
  at: number,
  side: 1 | -1,
): string {
  const { c0, c1 } = geo.web;
  const outside = at - side * 1.5;
  const pts: XY[] = [pt(geo, outside, c0 - 1)];
  let i = 0;
  for (let c = c0 - 1; c <= c1 + 1; c += geo.tooth, i++)
    pts.push(pt(geo, at + side * (i % 2 ? geo.tooth : 0), c));
  pts.push(pt(geo, outside, c1 + 1));
  return pts.map((p) => `${round(p.x)},${round(p.y)}`).join(" ");
}

/** The serrated tear bar across the web. */
export function tearBarPoints(geo: Geometry): string {
  const { c0, c1, amp, step } = geo.tearTeeth;
  const pts: string[] = [];
  let i = 0;
  for (let c = c0; c <= c1; c += step, i++) {
    const p = pt(geo, geo.tearBar + (i % 2 ? amp : -amp), c);
    pts.push(`${round(p.x)},${round(p.y)}`);
  }
  return pts.join(" ");
}

/** Archimedean spiral for the roll symbol, from the core ring out to the outer winding. */
export function spiralPath(geo: Geometry): string {
  const { cx, cy, outer, core, turns, phase } = geo.roll;
  const perTurn = 72; // 5 degree chords stay smooth at r 80 on a 3x screen
  const steps = turns * perTurn;
  const parts: string[] = [];
  for (let i = 0; i <= steps; i++) {
    const th = phase + ((i - steps) / perTurn) * Math.PI * 2;
    const rad = core + ((outer - core) * i) / steps;
    parts.push(
      `${i ? "L" : "M"}${round(cx + rad * Math.cos(th))} ${round(cy + rad * Math.sin(th))}`,
    );
  }
  return parts.join("");
}

/** A dash-dot line drawn as separate subpaths, so a one-shot draw can reveal it. */
export function dashDotPath(
  x: number,
  y0: number,
  y1: number,
  dash: readonly number[],
): string {
  const out: string[] = [];
  let y = y0;
  let i = 0;
  while (y < y1) {
    const len = dash[i % dash.length];
    if (i % 2 === 0)
      out.push(`M${round(x)} ${round(y)}V${round(Math.min(y + len, y1))}`);
    y += len;
    i++;
  }
  return out.join("");
}

/** The detail leader from the plan ring to bubble A. */
export function bubbleLeader(geo: Geometry): {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
} {
  const p = planPoint(
    geo,
    Number(SAMPLE[HERO].coords.e),
    Number(SAMPLE[HERO].coords.n),
  );
  const b = geo.plan.bubble;
  const len = Math.hypot(b.x - p.x, b.y - p.y);
  const ux = (b.x - p.x) / len;
  const uy = (b.y - p.y) / len;
  return {
    x1: round(p.x + ux * geo.plan.ring),
    y1: round(p.y + uy * geo.plan.ring),
    x2: round(b.x - ux * b.r),
    y2: round(b.y - uy * b.r),
  };
}

/** The tape tail notch: one radial tick across the outer wrap at the spiral's free end, so the turn reads as paper feeding. */
export function notchPath(geo: Geometry): string {
  const { cx, cy, notch, phase } = geo.roll;
  const c = Math.cos(phase);
  const s = Math.sin(phase);
  return `M${round(cx + notch[0] * c)} ${round(cy + notch[0] * s)}L${round(cx + notch[1] * c)} ${round(cy + notch[1] * s)}`;
}

/** The lock reticle: four arcs with a gap at each quadrant, so the painted arms pass through. */
export function reticlePath(geo: Geometry): string {
  const { x, y } = geo.mark;
  const r = geo.reticle.r;
  const half = geo.reticle.gap / 2;
  const at = (deg: number) => {
    const a = (deg * Math.PI) / 180;
    return `${round(x + r * Math.cos(a))} ${round(y + r * Math.sin(a))}`;
  };
  return [0, 90, 180, 270]
    .map((q) => `M${at(q + half)}A${r} ${r} 0 0 1 ${at(q + 90 - half)}`)
    .join("");
}

/** Crop or registration corners around a box, grown by gap, in one d string. */
export function cornersPath(box: Box, arm: number, gap: number): string {
  const x0 = round(box.x - gap);
  const y0 = round(box.y - gap);
  const x1 = round(box.x + box.w + gap);
  const y1 = round(box.y + box.h + gap);
  return [
    `M${x0} ${y0 + arm}V${y0}H${x0 + arm}`,
    `M${x1 - arm} ${y0}H${x1}V${y0 + arm}`,
    `M${x1} ${y1 - arm}V${y1}H${x1 - arm}`,
    `M${x0 + arm} ${y1}H${x0}V${y1 - arm}`,
  ].join("");
}

/** Paint overspray around the mark: zero length subpaths drawn as dots by round caps. */
export function oversprayPath(geo: Geometry): string {
  return geo.overspray
    .map(([dx, dy]) => `M${geo.mark.x + dx} ${geo.mark.y + dy}h0`)
    .join("");
}

/** The datum's path from the window to the mark, trimmed by the origin circle and the reticle. */
export function transferLine(geo: Geometry): Line {
  const a = restDatum(geo);
  const b = geo.mark;
  const len = Math.hypot(b.x - a.x, b.y - a.y);
  const ux = (b.x - a.x) / len;
  const uy = (b.y - a.y) / len;
  return {
    x1: round(a.x + ux * 2.5),
    y1: round(a.y + uy * 2.5),
    x2: round(b.x - ux * geo.reticle.r),
    y2: round(b.y - uy * geo.reticle.r),
  };
}

/** The camera lean pivots on the mark: the mark over the view, as CSS percentages. */
export function leanOrigin(geo: Geometry): string {
  const pc = (v: number) => `${Number(v.toFixed(3))}%`;
  return `${pc((geo.mark.x / geo.view.w) * 100)} ${pc((geo.mark.y / geo.view.h) * 100)}`;
}

/** One hatch tile, pitch square, with its corner pieces so the lines join across tiles. */
export function hatchPath(pitch: number, dir: HatchDir): string {
  const p = pitch;
  return dir === "\\"
    ? `M-1 -1L${p + 1} ${p + 1}M-1 ${p - 1}L1 ${p + 1}M${p - 1} -1L${p + 1} 1`
    : `M-1 ${p + 1}L${p + 1} -1M-1 1L1 -1M${p - 1} ${p + 1}L${p + 1} ${p - 1}`;
}

/** The print head: a line across the web, with a short tick at each end when tick is set. */
export function headPath(geo: Geometry): string {
  const { at, c0, c1, tick } = geo.head;
  const p = (a: number, c: number) => {
    const q = pt(geo, a, c);
    return `${round(q.x)} ${round(q.y)}`;
  };
  const line = `M${p(at, c0)}L${p(at, c1)}`;
  return tick
    ? `${line}M${p(at - tick, c0)}L${p(at + tick, c0)}M${p(at - tick, c1)}L${p(at + tick, c1)}`
    : line;
}

/** The print line flash: the head line extended past the web on both sides. */
export function flashLine(geo: Geometry): Line {
  const a = pt(geo, geo.printLine, geo.head.c0 - geo.flashExt);
  const b = pt(geo, geo.printLine, geo.head.c1 + geo.flashExt);
  return { x1: a.x, y1: a.y, x2: b.x, y2: b.y };
}

/** The cut: one hairline just upstream of the tear bar, across the web and past it by flashExt, like the print flash. */
export function cutLine(geo: Geometry): string {
  const at = geo.tearBar - geo.cut.offset;
  const a = pt(geo, at, geo.cut.c0 - geo.flashExt);
  const b = pt(geo, at, geo.cut.c1 + geo.flashExt);
  return `M${a.x} ${a.y}L${b.x} ${b.y}`;
}

function round(v: number): number {
  return Math.round(v * 100) / 100;
}
