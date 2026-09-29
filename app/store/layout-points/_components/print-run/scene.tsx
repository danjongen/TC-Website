// One SVG drawing of the print run from one Geometry. Server-safe markup.
// The base styles are the final frame; every animation is a CSS one-shot in
// layout-points.css, delayed by --d from T. Motion only targets the groups here,
// never LabelFace internals.

import type { CSSProperties, ReactNode } from "react"

import { LabelFace } from "../label/label-face"
import {
  bubbleLeader,
  dashDotPath,
  DRAWING,
  HERO,
  PLAN_ONLY,
  planPoint,
  PRINT_REVEAL,
  pt,
  rollSideBlanks,
  RUN,
  SAMPLE,
  span,
  spiralPath,
  stripTrail,
  T,
  tearBarPoints,
  tornEdgePoints,
  type Geometry,
  type PlanId,
} from "./geometry"

const GREEN = "#00D26A"
const Z200 = "#e4e4e7"
const Z300 = "#d4d4d8"
const Z400 = "#a1a1aa"
const Z500 = "#71717a"
const Z600 = "#52525b"
const Z700 = "#3f3f46"
const Z800 = "#27272a"
const Z900 = "#18181b"
const STOCK = "#fafafa"
const BENCH = "#000"

export const SCENE_TITLE = "Print run to floor mark"
export const SCENE_DESC =
  "Diagram of a label print run. A printer prints four labels from a roll: CTL-01, a yellow and black control label with its datum at the centre; STG-001, Staging, datum at the bottom right corner; RIG-012, Rigging, datum at the left edge; STG-003, Staging, datum at the top edge. The strip is torn off. STG-003 is peeled from the liner, leaving an empty window, and placed on the floor with its exact datum on the surveyed mark at E 17.600 N -8.200, where the drawing's deck edge and setting-out line cross. A key plan shows the same points. The roll is drawn as a schematic symbol."

function d(ms: number, extra?: CSSProperties): CSSProperties {
  return { "--d": `${ms}ms`, ...extra } as CSSProperties
}

function origin(x: number, y: number): CSSProperties {
  return { transformOrigin: `${x}px ${y}px` }
}

/** Four nested advances: the web moves one pitch at each T.advance. */
function Advances({ children }: { children: ReactNode }) {
  return T.advance.reduceRight<ReactNode>(
    (inner, t) => (
      <g className="lp-adv" style={d(t)}>
        {inner}
      </g>
    ),
    children,
  )
}

function Tag({
  x,
  y,
  size,
  children,
  halo,
}: {
  x: number
  y: number
  size: number
  children: ReactNode
  halo?: string
}) {
  return (
    <text
      x={x}
      y={y}
      fontSize={size}
      fill={Z400}
      letterSpacing="0.08em"
      {...(halo ? { stroke: halo, strokeWidth: 4, paintOrder: "stroke", strokeLinejoin: "round" as const } : {})}
    >
      {children}
    </text>
  )
}

export function Scene({ geo, idPrefix, className }: { geo: Geometry; idPrefix: string; className: string }) {
  const { label: L, view } = geo
  const ids = {
    title: `${idPrefix}-title`,
    desc: `${idPrefix}-desc`,
    offroll: `${idPrefix}-offroll`,
    ink: `${idPrefix}-ink`,
    hatch: `${idPrefix}-hatch`,
  }
  const M = geo.mark
  const bench = geo.bench
  const benchEnd = geo.axis === "x" ? bench.x + bench.w : bench.y + bench.h
  const webClip =
    geo.axis === "x"
      ? span(geo, geo.offRollMin, benchEnd, bench.y, bench.y + bench.h)
      : span(geo, geo.offRollMin, benchEnd, bench.x, bench.x + bench.w)
  const inkClip =
    geo.axis === "x"
      ? span(geo, geo.printLine, benchEnd, bench.y, bench.y + bench.h)
      : span(geo, geo.printLine, benchEnd, bench.x, bench.x + bench.w)
  const trail = stripTrail(geo)
  const tearOrigin = origin(geo.tearOrigin.x, geo.tearOrigin.y)
  const markOrigin = origin(M.x, M.y)
  const rollOrigin = origin(geo.roll.cx, geo.roll.cy)
  const heroSlot = geo.slots[HERO]

  // Key plan.
  const plan = geo.plan
  const deckA = planPoint(geo, DRAWING.deck.e0, DRAWING.deck.n1)
  const deckB = planPoint(geo, DRAWING.deck.e1, DRAWING.deck.n0)
  const cl = planPoint(geo, DRAWING.centreline, 0)
  const heroPlan = planPoint(geo, Number(SAMPLE[HERO].coords.e), Number(SAMPLE[HERO].coords.n))
  const leader = bubbleLeader(geo)
  const controls: { id: PlanId; e: string; n: string }[] = [
    { id: "CTL-01", e: SAMPLE["CTL-01"].coords.e, n: SAMPLE["CTL-01"].coords.n },
    { id: "CTL-02", e: PLAN_ONLY["CTL-02"].coords.e, n: PLAN_ONLY["CTL-02"].coords.n },
  ]
  const layoutPoints: RunIdLayout[] = ["STG-001", "RIG-012", "STG-003"]

  const planId = (id: PlanId) => {
    const at = plan.ids[id]
    if (!at) return null
    return (
      <text
        x={at.x}
        y={at.y}
        textAnchor={at.anchor}
        fontSize={geo.type.planId}
        fill={id === HERO ? "#fff" : Z400}
        stroke="#000"
        strokeWidth={3}
        paintOrder="stroke"
        strokeLinejoin="round"
      >
        {id}
      </text>
    )
  }

  const face = (id: (typeof RUN)[number], x: number, y: number) => (
    <LabelFace label={SAMPLE[id]} x={x} y={y} width={L.w} height={L.h} radius={L.r} />
  )

  const inkFaces = RUN.map((id) =>
    id === HERO ? (
      <g key={id} className="lp-off" style={d(T.peel)}>
        {face(id, geo.slots[id].x, geo.slots[id].y)}
      </g>
    ) : (
      <LabelFace
        key={id}
        label={SAMPLE[id]}
        x={geo.slots[id].x}
        y={geo.slots[id].y}
        width={L.w}
        height={L.h}
        radius={L.r}
      />
    ),
  )

  return (
    <svg
      viewBox={`0 0 ${view.w} ${view.h}`}
      role="img"
      aria-labelledby={`${ids.title} ${ids.desc}`}
      className={`${className} h-auto w-full font-mono`}
    >
      <title id={ids.title}>{SCENE_TITLE}</title>
      <desc id={ids.desc}>{SCENE_DESC}</desc>
      <defs>
        <clipPath id={ids.offroll}>
          <rect {...webClip} />
        </clipPath>
        <clipPath id={ids.ink}>
          <rect {...inkClip} />
        </clipPath>
        <pattern id={ids.hatch} width="8" height="8" patternUnits="userSpaceOnUse">
          <path d="M-2 2L2 -2M0 8L8 0M6 10L10 6" stroke={Z700} strokeWidth="1" />
        </pattern>
      </defs>

      {/* 1. Backgrounds and the rule. */}
      <rect x={bench.x} y={bench.y} width={bench.w} height={bench.h} fill={BENCH} />
      <rect x={geo.floor.x} y={geo.floor.y} width={geo.floor.w} height={geo.floor.h} fill={Z900} />
      <line {...geo.rule} stroke={Z800} strokeWidth="1" />

      {/* 2. Key plan inset, to scale. */}
      <rect
        x={plan.box.x + 0.5}
        y={plan.box.y + 0.5}
        width={plan.box.w - 1}
        height={plan.box.h - 1}
        fill="#000"
        stroke={Z800}
      />
      <Tag x={geo.tags.plan.x} y={geo.tags.plan.y} size={geo.type.tag}>
        PLAN
      </Tag>
      <rect
        className="lp-draw"
        pathLength={1}
        x={deckA.x}
        y={deckA.y}
        width={deckB.x - deckA.x}
        height={deckB.y - deckA.y}
        fill="none"
        stroke={Z400}
        strokeWidth="1.5"
        style={d(T.planDraw)}
      />
      <path
        className="lp-draw"
        pathLength={1}
        d={dashDotPath(cl.x, deckA.y - plan.clOver[0], deckB.y + plan.clOver[1], plan.dash)}
        fill="none"
        stroke={Z600}
        strokeWidth="1"
        style={d(T.planDraw)}
      />
      {controls.map((c) => {
        const p = planPoint(geo, Number(c.e), Number(c.n))
        const s = plan.tri
        return (
          <g key={c.id} className="lp-pop" style={d(T.controls)}>
            <path
              d={`M${p.x} ${p.y - s}L${p.x + s} ${p.y + s * 0.8}H${p.x - s}Z`}
              fill="#facc15"
              stroke="#000"
              strokeWidth="1"
            />
            {planId(c.id)}
          </g>
        )
      })}
      {layoutPoints.map((id, i) => {
        const p = planPoint(geo, Number(SAMPLE[id].coords.e), Number(SAMPLE[id].coords.n))
        const r = plan.cross
        return (
          <g key={id} className="lp-pop" style={d(T.points[i])}>
            <circle cx={p.x} cy={p.y} r={r} fill="none" stroke={GREEN} strokeWidth="1.25" />
            <path
              d={`M${p.x - r - 3} ${p.y}H${p.x + r + 3}M${p.x} ${p.y - r - 3}V${p.y + r + 3}`}
              stroke={GREEN}
              strokeWidth="1.25"
            />
            {planId(id)}
          </g>
        )
      })}
      <circle
        className="lp-draw"
        pathLength={1}
        cx={heroPlan.x}
        cy={heroPlan.y}
        r={plan.ring}
        fill="none"
        stroke={Z200}
        strokeWidth="1"
        style={d(T.ring)}
      />
      <g className="lp-fade" style={d(T.bubble)}>
        <line {...leader} stroke={Z200} strokeWidth="1" />
        <circle cx={plan.bubble.x} cy={plan.bubble.y} r={plan.bubble.r} fill="#000" stroke={Z200} strokeWidth="1" />
        <text
          x={plan.bubble.x}
          y={plan.bubble.y + geo.type.bubble * 0.35}
          textAnchor="middle"
          fontSize={geo.type.bubble}
          fontWeight="700"
          fill="#fff"
        >
          A
        </text>
      </g>

      {/* 3. Floor detail: deck phantom, drawing hairlines, painted mark. */}
      <rect
        x={geo.deck.x0}
        y={geo.deck.y0}
        width={geo.deck.x1 - geo.deck.x0}
        height={geo.deck.y1 - geo.deck.y0}
        fill={`url(#${ids.hatch})`}
      />
      {geo.deck.breaks.map((x) => {
        const m = (geo.deck.y0 + geo.deck.y1) / 2
        return (
          <path
            key={x}
            d={`M${x} ${geo.deck.y0}V${m - 6}l-5 3l10 6l-5 3V${geo.deck.y1}`}
            fill="none"
            stroke={Z500}
            strokeWidth="1"
          />
        )
      })}
      <Tag x={geo.tags.deck.x} y={geo.tags.deck.y} size={geo.type.tag} halo={Z900}>
        DECK
      </Tag>
      <Tag x={geo.tags.detail.x} y={geo.tags.detail.y} size={geo.type.tag}>
        DETAIL A
      </Tag>
      <line x1={geo.hairlines.edge[0]} y1={M.y} x2={geo.hairlines.edge[1]} y2={M.y} stroke={GREEN} strokeWidth="1" />
      <line
        x1={M.x}
        y1={geo.hairlines.setOut[0]}
        x2={M.x}
        y2={geo.hairlines.setOut[1]}
        stroke={GREEN}
        strokeWidth="1"
        strokeDasharray={geo.hairlines.dash}
      />
      <path
        data-lp-mark=""
        d={`M${M.x - M.arm} ${M.y}H${M.x + M.arm}M${M.x} ${M.y - M.arm}V${M.y + M.arm}`}
        stroke={Z200}
        strokeWidth={M.stroke}
      />

      {/* 4. Web stack: liner and blank stock, clipped where it comes off the roll. */}
      <g clipPath={`url(#${ids.offroll})`}>
        <Advances>
          <rect {...span(geo, geo.offRollMin, geo.tearBar, geo.web.c0, geo.web.c1)} fill={Z400} />
          {rollSideBlanks(geo).map((a) => {
            const p = pt(geo, a, geo.axis === "x" ? geo.nextBlank.y : geo.nextBlank.x)
            return <rect key={a} x={p.x} y={p.y} width={L.w} height={L.h} rx={L.r} fill={STOCK} />
          })}
          <g className="lp-on" style={d(T.torn)}>
            <polyline points={tornEdgePoints(geo, geo.tearBar, -1)} fill={BENCH} />
          </g>
          <g className="lp-tear" style={{ ...d(T.tear), ...tearOrigin }}>
            <rect {...span(geo, trail, geo.tornEdge, geo.web.c0, geo.web.c1)} fill={Z400} />
            <rect
              x={heroSlot.x + 0.5}
              y={heroSlot.y + 0.5}
              width={L.w - 1}
              height={L.h - 1}
              rx={L.r}
              fill={Z300}
              stroke={Z500}
              strokeWidth="1"
              strokeDasharray="4 3"
            />
            {RUN.map((id) =>
              id === HERO ? (
                <g key={id} className="lp-off" style={d(T.peel)}>
                  <rect x={geo.slots[id].x} y={geo.slots[id].y} width={L.w} height={L.h} rx={L.r} fill={STOCK} />
                </g>
              ) : (
                <rect key={id} x={geo.slots[id].x} y={geo.slots[id].y} width={L.w} height={L.h} rx={L.r} fill={STOCK} />
              ),
            )}
            <polyline points={tornEdgePoints(geo, geo.tornEdge, -1)} fill={BENCH} />
            <g className="lp-on" style={d(T.torn)}>
              <polyline points={tornEdgePoints(geo, trail, 1)} fill={BENCH} />
            </g>
          </g>
        </Advances>
      </g>

      {/* 5. Roll symbol: the spiral turns by pitch over radius at each advance. */}
      <circle cx={geo.roll.cx} cy={geo.roll.cy} r={geo.roll.r} fill={BENCH} />
      {T.advance.reduceRight<ReactNode>(
        (inner, t) => (
          <g className="lp-turn" style={{ ...d(t), ...rollOrigin }}>
            {inner}
          </g>
        ),
        <path d={spiralPath(geo)} fill="none" stroke={Z700} strokeWidth="1.5" />,
      )}
      <circle cx={geo.roll.cx} cy={geo.roll.cy} r={geo.roll.core} fill="none" stroke={Z500} strokeWidth="2" />
      <circle cx={geo.roll.cx} cy={geo.roll.cy} r={geo.roll.hole} fill={BENCH} />

      {/* 6. Ink stack: the same moves, clipped at the print line. */}
      <g clipPath={PRINT_REVEAL ? `url(#${ids.ink})` : undefined}>
        <Advances>
          <g className="lp-tear" style={{ ...d(T.tear), ...tearOrigin }}>
            {inkFaces}
          </g>
        </Advances>
      </g>

      {/* 7. Printer phantom, head, glow, tear bar, tags. */}
      <rect
        x={geo.printer.x + 0.5}
        y={geo.printer.y + 0.5}
        width={geo.printer.w - 1}
        height={geo.printer.h - 1}
        fill="none"
        stroke={Z600}
        strokeWidth="1"
        strokeDasharray="6 4"
      />
      <rect x={geo.head.x} y={geo.head.y} width={geo.head.w} height={geo.head.h} fill={Z200} />
      <g className="lp-glow-in" style={d(T.printLive)}>
        <g className="lp-glow-out" style={d(T.printDone)}>
          <line {...geo.glow} stroke={GREEN} strokeWidth="2" />
        </g>
      </g>
      <polyline points={tearBarPoints(geo)} fill="none" stroke={Z300} strokeWidth="1.5" strokeLinejoin="miter" />
      <Tag x={geo.tags.printer.x} y={geo.tags.printer.y} size={geo.type.tag}>
        PRINTER
      </Tag>
      {geo.printerLeader ? <path d={geo.printerLeader} stroke={Z600} strokeWidth="1" /> : null}
      <path d={geo.feed} fill="none" stroke={Z500} strokeWidth="1.25" />
      <Tag x={geo.tags.feed.x} y={geo.tags.feed.y} size={geo.type.tag}>
        FEED
      </Tag>

      {/* 8. Journey: peel, carry, descend and square about the landed datum. */}
      <g className="lp-on" style={d(T.peel)}>
        <g className="lp-carry" style={d(T.carry)}>
          <g className="lp-peel" style={d(T.peel, markOrigin)}>
            <g className="lp-descend" style={d(T.descend, markOrigin)}>
              <g className="lp-square" style={d(T.square, markOrigin)}>
                <g className="lp-sh-out" style={d(T.descend)}>
                  <g className="lp-sh-in" style={d(T.peel)}>
                    <rect
                      x={geo.landed.x}
                      y={geo.landed.y}
                      width={L.w}
                      height={L.h}
                      rx={L.r}
                      fill="#000"
                      fillOpacity={0.5}
                    />
                  </g>
                </g>
                <LabelFace
                  label={SAMPLE[HERO]}
                  x={geo.landed.x}
                  y={geo.landed.y}
                  width={L.w}
                  height={L.h}
                  radius={L.r}
                />
              </g>
            </g>
          </g>
        </g>
      </g>

      {/* 9. Lock ring and the one ping at the mark. */}
      <circle
        className="lp-lock"
        cx={M.x}
        cy={M.y}
        r={geo.lock}
        fill="none"
        stroke={GREEN}
        strokeWidth="2"
        style={d(T.hit)}
      />
      <circle
        className="lp-ping"
        cx={M.x}
        cy={M.y}
        r={geo.lock}
        fill="none"
        stroke={GREEN}
        strokeWidth="1.5"
        opacity={0}
        style={d(T.ping)}
      />

      {/* 10. Callouts: bracket, the two datums, and the merged leader ending on the mark. */}
      <path
        className="lp-draw"
        pathLength={1}
        d={geo.callouts.bracket}
        fill="none"
        stroke={Z300}
        strokeWidth="1"
        style={d(T.bracket)}
      />
      <g className="lp-fade" style={d(T.calloutA)} stroke={Z900} strokeWidth={4} paintOrder="stroke">
        <text x={geo.callouts.textX} y={geo.callouts.a[0]} fontSize={geo.callouts.big} fontWeight="700" fill={GREEN}>
          VECTORWORKS DATUM
        </text>
        <text x={geo.callouts.textX} y={geo.callouts.a[1]} fontSize={geo.callouts.small} fill={Z300}>
          STG-003 IN THE DRAWING
        </text>
      </g>
      <g className="lp-fade" style={d(T.calloutB)} stroke={Z900} strokeWidth={4} paintOrder="stroke">
        <text x={geo.callouts.textX} y={geo.callouts.b[0]} fontSize={geo.callouts.big} fontWeight="700" fill="#fff">
          PHYSICAL DATUM
        </text>
        <text x={geo.callouts.textX} y={geo.callouts.b[1]} fontSize={geo.callouts.small} fill={Z300}>
          ON THE SURVEYED MARK
        </text>
      </g>
      <path
        className="lp-draw"
        data-lp-sentinel=""
        pathLength={1}
        d={geo.callouts.merged}
        fill="none"
        stroke={Z300}
        strokeWidth="1"
        style={d(T.merge)}
      />

      {/* 11. Autoplay waits until this is fully in view. */}
      <rect
        data-lp-payoff=""
        x={geo.payoff.x}
        y={geo.payoff.y}
        width={geo.payoff.w}
        height={geo.payoff.h}
        fill="none"
        pointerEvents="none"
      />
    </svg>
  )
}

type RunIdLayout = "STG-001" | "RIG-012" | "STG-003"
