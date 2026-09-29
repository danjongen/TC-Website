// Print Run to Floor Mark: sample data, run order, timeline and both layout geometries.
// Pure TS. Every distance the scenes draw comes from here; the CSS keyframe literals
// in layout-points.css are checked against the derived values by the node test.

import { datumPoint } from "../label/datum"
import type { LabelData } from "../label/label-face"

export type RunId = "STG-003" | "RIG-012" | "STG-001" | "CTL-01"
export type PlanId = RunId | "CTL-02"

// Sample drawing. Sanitised coordinates, preformatted as exported, Z 0.000.
export const SAMPLE: Record<RunId, LabelData> = {
  "CTL-01": { kind: "control", id: "CTL-01", coords: { e: "9.400", n: "-10.700", z: "0.000" }, datum: "c" },
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
}

/** Plan only, never printed. */
export const PLAN_ONLY = {
  "CTL-02": { kind: "control", id: "CTL-02", coords: { e: "20.600", n: "-0.700", z: "0.000" } },
} as const

/** Print order. CTL-01 prints first and rests farthest down the strip. */
export const RUN: readonly RunId[] = ["CTL-01", "STG-001", "RIG-012", "STG-003"]

/** The hero point. */
export const HERO: RunId = "STG-003"

/** Sample drawing extents in drawing units (E and N). */
export const DRAWING = { e0: 8, deck: { e0: 11, e1: 19, n0: -8.2, n1: -2.2 }, centreline: 15 } as const

export const JOB = { stamp: "2026-09-29 14.30" } as const

/** When false, ink is not clipped at the print line: labels arrive printed. */
export const PRINT_REVEAL = true

// Timeline in ms from first paint. Every --d in the scene and header comes from here.
export const T = {
  planDraw: 0,
  controls: 120,
  points: [200, 280, 360] as const, // STG-001, RIG-012, STG-003 in the plan, 80 ms stagger
  ring: 520,
  bubble: 600,
  firstTopChange: 700,
  verified: 700,
  printLive: 800,
  advance: [900, 1560, 2220, 2880] as const,
  advanceDur: 560,
  count: [1460, 2120, 2780, 3440] as const,
  printDone: 3440,
  tear: 3600,
  tearDur: 600,
  torn: 3780,
  tearDone: 4200,
  peel: 4300,
  carry: 4600,
  peelDone: 4600,
  descend: 5500,
  square: 5900,
  hit: 6300,
  ping: 6450,
  bracket: 6560,
  calloutA: 6560,
  calloutB: 6640,
  merge: 6760,
  rest: 7360,
} as const

/** Beats in the order they fire, for the ordering test. */
export const T_SEQUENCE: readonly number[] = [
  T.planDraw,
  T.controls,
  ...T.points,
  T.ring,
  T.bubble,
  T.verified,
  T.printLive,
  ...T.advance,
  T.printDone,
  T.tear,
  T.torn,
  T.tearDone,
  T.peel,
  T.carry,
  T.descend,
  T.square,
  T.hit,
  T.ping,
  T.bracket,
  T.calloutB,
  T.merge,
  T.rest,
]

type XY = { x: number; y: number }
type Box = { x: number; y: number; w: number; h: number }

export type Geometry = {
  axis: "x" | "y"
  view: { w: number; h: number }
  label: { w: number; h: number; r: number; gap: number; pitch: number }
  roll: { cx: number; cy: number; r: number; core: number; hole: number; turns: number }
  web: { c0: number; c1: number } // liner extent across the feed
  printLine: number
  tearBar: number
  offRollMin: number
  slots: Record<RunId, XY> // rest, post-tear
  nextBlank: XY
  tornEdge: number // leading torn edge of the strip at rest
  tearShift: number // the tear moves the strip this far downstream
  tooth: number // torn edge serration depth
  tearOrigin: XY
  mark: XY & { arm: number; stroke: number }
  landed: XY
  lock: number
  shadow: XY
  bench: Box
  floor: Box
  rule: { x1: number; y1: number; x2: number; y2: number }
  printer: Box
  head: Box
  glow: { x1: number; y1: number; x2: number; y2: number }
  tearTeeth: { c0: number; c1: number; amp: number; step: number }
  feed: string
  printerLeader: string | null
  plan: {
    box: Box
    ox: number
    oy: number
    s: number
    cross: number
    tri: number
    ring: number
    clOver: [number, number]
    dash: [number, number, number, number]
    bubble: XY & { r: number }
    ids: Partial<Record<PlanId, XY & { anchor: "start" | "end" }>>
  }
  deck: { x0: number; x1: number; y0: number; y1: number; breaks: number[] } // floor detail deck phantom
  hairlines: { edge: [number, number]; setOut: [number, number]; dash: string }
  callouts: {
    textX: number
    a: [number, number]
    b: [number, number]
    bracket: string
    merged: string
    big: number
    small: number
  }
  payoff: Box
  tags: Record<"plan" | "detail" | "deck" | "printer" | "feed", XY>
  type: { tag: number; planId: number; bubble: number }
}

export const DESKTOP: Geometry = {
  axis: "x",
  view: { w: 1200, h: 480 },
  label: { w: 168, h: 112, r: 4, gap: 14, pitch: 182 },
  roll: { cx: 66, cy: 116, r: 60, core: 18, hole: 12, turns: 5 },
  web: { c0: 54, c1: 178 },
  printLine: 298,
  tearBar: 305,
  offRollMin: 66,
  slots: {
    "STG-003": { x: 320, y: 60 },
    "RIG-012": { x: 502, y: 60 },
    "STG-001": { x: 684, y: 60 },
    "CTL-01": { x: 866, y: 60 },
  },
  nextBlank: { x: 130, y: 60 },
  tornEdge: 1041,
  tearShift: 8,
  tooth: 3,
  tearOrigin: { x: 1041, y: 116 },
  mark: { x: 800, y: 330, arm: 22, stroke: 3 },
  landed: { x: 716, y: 330 },
  lock: 16,
  shadow: { x: 10, y: 14 },
  bench: { x: 0, y: 0, w: 1200, h: 232 },
  floor: { x: 0, y: 238, w: 1200, h: 242 },
  rule: { x1: 0, y1: 238, x2: 1200, y2: 238 },
  printer: { x: 136, y: 22, w: 164, h: 188 },
  head: { x: 292, y: 44, w: 6, h: 144 },
  glow: { x1: 298, y1: 44, x2: 298, y2: 188 },
  tearTeeth: { c0: 50, c1: 182, amp: 2, step: 4 },
  feed: "M320 204H380M374 200L380 204L374 208",
  printerLeader: null,
  plan: {
    box: { x: 16, y: 250, w: 284, h: 218 },
    ox: 30,
    oy: 258,
    s: 18,
    cross: 4,
    tri: 7,
    ring: 11,
    clOver: [14, 8],
    dash: [10, 4, 2, 4],
    bubble: { x: 236, y: 434, r: 9 },
    ids: {
      "CTL-01": { x: 65, y: 454.6, anchor: "start" },
      "CTL-02": { x: 246, y: 274.6, anchor: "end" },
      "STG-001": { x: 76, y: 293.6, anchor: "end" },
      "RIG-012": { x: 238, y: 340, anchor: "start" },
      "STG-003": { x: 190, y: 426, anchor: "end" },
    },
  },
  deck: { x0: 600, x1: 900, y0: 252, y1: 330, breaks: [600, 900] },
  hairlines: { edge: [560, 904], setOut: [250, 470], dash: "14 4 2 4" },
  callouts: {
    textX: 936,
    a: [268, 283],
    b: [312, 327],
    bracket: "M928 264H920V322H928",
    merged: "M920 293L800 330",
    big: 12,
    small: 11,
  },
  payoff: { x: 700, y: 250, w: 490, h: 210 },
  tags: {
    plan: { x: 24, y: 264 },
    detail: { x: 330, y: 262 },
    deck: { x: 612, y: 270 },
    printer: { x: 136, y: 14 },
    feed: { x: 388, y: 208 },
  },
  type: { tag: 11, planId: 11, bubble: 11 },
}

export const MOBILE: Geometry = {
  axis: "y",
  view: { w: 340, h: 516 },
  label: { w: 150, h: 100, r: 4, gap: 10, pitch: 110 },
  roll: { cx: 86, cy: -30, r: 66, core: 18, hole: 12, turns: 5 },
  web: { c0: 6, c1: 166 },
  printLine: 54,
  tearBar: 59,
  offRollMin: -30,
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
  mark: { x: 258, y: 350, arm: 18, stroke: 3 },
  landed: { x: 183, y: 350 },
  lock: 14,
  shadow: { x: 10, y: 14 },
  bench: { x: 0, y: 0, w: 172, h: 516 },
  floor: { x: 178, y: 196, w: 162, h: 320 },
  rule: { x1: 175, y1: 0, x2: 175, y2: 516 },
  printer: { x: 2, y: 30, w: 168, h: 34 },
  head: { x: 6, y: 48, w: 160, h: 6 },
  glow: { x1: 6, y1: 54, x2: 166, y2: 54 },
  tearTeeth: { c0: 2, c1: 170, amp: 2, step: 4 },
  feed: "M182 40V60M178.5 55.5L182 60L185.5 55.5",
  printerLeader: "M170 20.5H179",
  plan: {
    box: { x: 178, y: 72, w: 160, h: 116 },
    ox: 190,
    oy: 80,
    s: 9.6,
    cross: 3,
    tri: 5,
    ring: 8,
    clOver: [8, 5],
    dash: [6, 3, 1.5, 3],
    bubble: { x: 304, y: 176, r: 7 },
    ids: {
      "STG-003": { x: 266, y: 178, anchor: "end" },
    },
  },
  deck: { x0: 178, x1: 340, y0: 278, y1: 350, breaks: [] },
  hairlines: { edge: [178, 340], setOut: [278, 470], dash: "10 3 2 3" },
  callouts: {
    textX: 196,
    a: [220, 234],
    b: [254, 268],
    bracket: "M194 216H188V264H194",
    merged: "M188 240V282L258 350",
    big: 10.5,
    small: 10.5,
  },
  payoff: { x: 178, y: 196, w: 162, h: 274 },
  tags: {
    plan: { x: 184, y: 84 },
    detail: { x: 184, y: 470 },
    deck: { x: 304, y: 292 },
    printer: { x: 182, y: 24 },
    feed: { x: 190, y: 54 },
  },
  type: { tag: 10.5, planId: 10.5, bubble: 10.5 },
}

/** Drawing coordinates to the key-plan inset, to scale. */
export function planPoint(geo: Geometry, e: number, n: number): XY {
  return { x: round(geo.plan.ox + (e - DRAWING.e0) * geo.plan.s), y: round(geo.plan.oy - n * geo.plan.s) }
}

/** The label box of a strip slot at rest. */
export function slotBox(geo: Geometry, id: RunId) {
  return { x: geo.slots[id].x, y: geo.slots[id].y, width: geo.label.w, height: geo.label.h }
}

/** The hero label's datum in its strip slot at rest. */
export function restDatum(geo: Geometry): XY {
  return datumPoint(SAMPLE[HERO].datum, slotBox(geo, HERO))
}

/** The hero label's datum once landed on the floor. Equals the mark. */
export function landedDatum(geo: Geometry): XY {
  return datumPoint(SAMPLE[HERO].datum, { ...geo.landed, width: geo.label.w, height: geo.label.h })
}

/** The carry move: mark minus rest datum. */
export function carry(geo: Geometry): XY {
  const r = restDatum(geo)
  return { x: geo.mark.x - r.x, y: geo.mark.y - r.y }
}

/** Roll rotation per advance, in degrees: pitch over radius. */
export function turnDeg(geo: Geometry): number {
  return (geo.label.pitch / geo.roll.r) * (180 / Math.PI)
}

/** Label size along the feed. */
export function alongSize(geo: Geometry): number {
  return geo.axis === "x" ? geo.label.w : geo.label.h
}

/** A point from along-feed and across-feed coordinates. */
export function pt(geo: Geometry, along: number, across: number): XY {
  return geo.axis === "x" ? { x: along, y: across } : { x: across, y: along }
}

/** A rect from along-feed and across-feed spans. */
export function span(geo: Geometry, a0: number, a1: number, c0: number, c1: number) {
  return geo.axis === "x"
    ? { x: a0, y: c0, width: a1 - a0, height: c1 - c0 }
    : { x: c0, y: a0, width: c1 - c0, height: a1 - a0 }
}

/** The strip's trailing torn edge at rest: half a gap upstream of the hero slot. */
export function stripTrail(geo: Geometry): number {
  const s = geo.slots[HERO]
  return (geo.axis === "x" ? s.x : s.y) - geo.label.gap / 2
}

/** Along-feed start of the roll-side blanks that can be seen between the roll and the tear bar. */
export function rollSideBlanks(geo: Geometry): number[] {
  const first = geo.axis === "x" ? geo.nextBlank.x : geo.nextBlank.y
  const out: number[] = []
  for (let a = first; a + alongSize(geo) > geo.offRollMin; a -= geo.label.pitch) out.push(a)
  return out
}

/** Serrated torn edge, filled with the bench colour, biting into the web on one side. */
export function tornEdgePoints(geo: Geometry, at: number, side: 1 | -1): string {
  const { c0, c1 } = geo.web
  const outside = at - side * 1.5
  const pts: XY[] = [pt(geo, outside, c0 - 1)]
  let i = 0
  for (let c = c0 - 1; c <= c1 + 1; c += geo.tooth, i++) pts.push(pt(geo, at + side * (i % 2 ? geo.tooth : 0), c))
  pts.push(pt(geo, outside, c1 + 1))
  return pts.map((p) => `${round(p.x)},${round(p.y)}`).join(" ")
}

/** The serrated tear bar across the web. */
export function tearBarPoints(geo: Geometry): string {
  const { c0, c1, amp, step } = geo.tearTeeth
  const pts: string[] = []
  let i = 0
  for (let c = c0; c <= c1; c += step, i++) {
    const p = pt(geo, geo.tearBar + (i % 2 ? amp : -amp), c)
    pts.push(`${round(p.x)},${round(p.y)}`)
  }
  return pts.join(" ")
}

/** Archimedean spiral for the roll symbol, from the core ring out to the roll radius. */
export function spiralPath(geo: Geometry): string {
  const { cx, cy, r, core, turns } = geo.roll
  const steps = turns * 24
  const parts: string[] = []
  for (let i = 0; i <= steps; i++) {
    const th = (i / 24) * Math.PI * 2
    const rad = core + ((r - core) * i) / steps
    parts.push(`${i ? "L" : "M"}${round(cx + rad * Math.cos(th))} ${round(cy + rad * Math.sin(th))}`)
  }
  return parts.join("")
}

/** A dash-dot line drawn as separate subpaths, so a one-shot draw can reveal it. */
export function dashDotPath(x: number, y0: number, y1: number, dash: readonly number[]): string {
  const out: string[] = []
  let y = y0
  let i = 0
  while (y < y1) {
    const len = dash[i % dash.length]
    if (i % 2 === 0) out.push(`M${round(x)} ${round(y)}V${round(Math.min(y + len, y1))}`)
    y += len
    i++
  }
  return out.join("")
}

/** The detail leader from the plan ring to bubble A. */
export function bubbleLeader(geo: Geometry): { x1: number; y1: number; x2: number; y2: number } {
  const p = planPoint(geo, Number(SAMPLE[HERO].coords.e), Number(SAMPLE[HERO].coords.n))
  const b = geo.plan.bubble
  const len = Math.hypot(b.x - p.x, b.y - p.y)
  const ux = (b.x - p.x) / len
  const uy = (b.y - p.y) / len
  return {
    x1: round(p.x + ux * geo.plan.ring),
    y1: round(p.y + uy * geo.plan.ring),
    x2: round(b.x - ux * b.r),
    y2: round(b.y - uy * b.r),
  }
}

function round(v: number): number {
  return Math.round(v * 100) / 100
}
