// One SVG drawing of the print run from one Geometry. Server-safe markup.
// The base styles are the final frame; every animation is a CSS one shot in
// layout-points.css, delayed by --d from T. Motion only targets the groups here,
// never LabelFace internals. One black sheet, hairline keylines, one green.

import type { CSSProperties, ReactNode } from "react";

import { FACE, LabelFace } from "../label/label-face";
import {
  bubbleLeader,
  cornersPath,
  cutLine,
  dashDotPath,
  DRAWING,
  flashLine,
  GRADE,
  hatchPath,
  headPath,
  HERO,
  notchPath,
  oversprayPath,
  PALETTE as P,
  PLAN_ONLY,
  planPoint,
  PRINT_REVEAL,
  pt,
  restDatum,
  reticlePath,
  rollSideBlanks,
  RUN,
  SAMPLE,
  span,
  spiralPath,
  stripTrail,
  T,
  tearBarPoints,
  tornEdgePoints,
  transferLine,
  type Geometry,
  type PlanId,
  type RunId,
} from "./geometry";

/** The ping: 11 dots on a 24 point circle, 15 to 165 degrees above the deck edge. The offset skips the dot on the edge. */
const PING_DOTS = `${"0 1 ".repeat(10)}0 14`;

/** Fixed control yellow, the same as the printed CONTROL hazard frame. */
const CONTROL = FACE.hazard;

export const SCENE_TITLE = "Print run to floor mark";
export const SCENE_DESC =
  "Diagram of a label print run. A printer prints four square labels from a roll, each with its exact point at the top centre: CP01, a control label in a yellow and black hazard frame marked do not disturb; then L011, L020 and L042, Lighting layout labels in a blue frame. The strip is torn off. L042 is peeled from the liner, leaving an empty window, and placed on the floor with its exact point on the surveyed mark at E 17.600 N -8.200, where the drawing's deck edge and setting-out line cross. A key plan shows the same sample points, and the floor detail is drawn not to scale. The roll is drawn as a schematic symbol.";

type Vars = CSSProperties & { "--dur"?: string };

function d(ms: number, extra?: Vars): CSSProperties {
  return { "--d": `${ms}ms`, ...extra } as CSSProperties;
}

function origin(x: number, y: number): CSSProperties {
  return { transformOrigin: `${x}px ${y}px` };
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
  );
}

/** A tracked mono annotation. The halo knocks out lines behind it without a box. */
function Tag({
  geo,
  x,
  y,
  children,
  halo,
  className,
  style,
  track,
}: {
  geo: Geometry;
  x: number;
  y: number;
  children: ReactNode;
  halo?: string;
  className?: string;
  style?: CSSProperties;
  track?: number;
}) {
  return (
    <text
      x={x}
      y={y}
      className={className}
      style={style}
      fontSize={geo.type.anno}
      fill={P.anno}
      letterSpacing={`${track ?? geo.type.annoTrack}em`}
      {...(halo
        ? {
            stroke: halo,
            strokeWidth: 3,
            paintOrder: "stroke",
            strokeLinejoin: "round" as const,
          }
        : {})}
    >
      {children}
    </text>
  );
}

export function Scene({ geo, idPrefix }: { geo: Geometry; idPrefix: string }) {
  const { label: L, view, stroke: S } = geo;
  const ids = {
    title: `${idPrefix}-title`,
    desc: `${idPrefix}-desc`,
    offroll: `${idPrefix}-offroll`,
    ink: `${idPrefix}-ink`,
    hatch: `${idPrefix}-hatch`,
  };
  const M = geo.mark;
  const R = geo.reticle.r;
  const bench = geo.bench;
  const benchEnd = geo.axis === "x" ? bench.x + bench.w : bench.y + bench.h;
  const webClip =
    geo.axis === "x"
      ? span(geo, geo.offRollMin, benchEnd, bench.y, bench.y + bench.h)
      : span(geo, geo.offRollMin, benchEnd, bench.x, bench.x + bench.w);
  const inkClip =
    geo.axis === "x"
      ? span(geo, geo.printLine, benchEnd, bench.y, bench.y + bench.h)
      : span(geo, geo.printLine, benchEnd, bench.x, bench.x + bench.w);
  const trail = stripTrail(geo);
  const tearOrigin = origin(geo.tearOrigin.x, geo.tearOrigin.y);
  const markOrigin = origin(M.x, M.y);
  const rollOrigin = origin(geo.roll.cx, geo.roll.cy);
  const heroSlot = geo.slots[HERO];
  const across = geo.axis === "x" ? geo.nextBlank.y : geo.nextBlank.x;

  // Liner edge keylines along a span of the web.
  const edges = (a0: number, a1: number) => {
    const p = (a: number, c: number) => {
      const q = pt(geo, a, c);
      return `${q.x} ${q.y}`;
    };
    return `M${p(a0, geo.web.c0)}L${p(a1, geo.web.c0)}M${p(a0, geo.web.c1)}L${p(a1, geo.web.c1)}`;
  };

  // Key plan.
  const plan = geo.plan;
  const deckA = planPoint(geo, DRAWING.deck.e0, DRAWING.deck.n1);
  const deckB = planPoint(geo, DRAWING.deck.e1, DRAWING.deck.n0);
  const cl = planPoint(geo, DRAWING.centreline, 0);
  const at = (id: RunId) =>
    planPoint(geo, Number(SAMPLE[id].coords.e), Number(SAMPLE[id].coords.n));
  const heroPlan = at(HERO);
  const leader = bubbleLeader(geo);
  const controls: { id: PlanId; e: string; n: string }[] = [
    {
      id: "CP01",
      e: SAMPLE["CP01"].coords.e,
      n: SAMPLE["CP01"].coords.n,
    },
    {
      id: "CP02",
      e: PLAN_ONLY["CP02"].coords.e,
      n: PLAN_ONLY["CP02"].coords.n,
    },
  ];
  const layoutPoints: RunId[] = ["L011", "L020", "L042"];

  const planId = (id: PlanId, t: number) => {
    const p = plan.ids[id];
    if (!p) return null;
    return (
      <text
        className="lp-fade"
        x={p.x}
        y={p.y}
        textAnchor={p.anchor}
        fontSize={geo.type.anno}
        letterSpacing={`${geo.type.idTrack}em`}
        fill={id === HERO ? P.text : P.anno}
        stroke={P.panel}
        strokeWidth={3}
        paintOrder="stroke"
        strokeLinejoin="round"
        style={d(t)}
      >
        {id}
      </text>
    );
  };

  const bubbleA = (b: { x: number; y: number }) => (
    <text
      x={b.x}
      y={b.y + geo.type.anno * 0.35}
      textAnchor="middle"
      fontSize={geo.type.anno}
      fill={P.text}
    >
      A
    </text>
  );

  const inkFaces = RUN.map((id) => {
    const face = (
      <LabelFace
        key={id}
        label={SAMPLE[id]}
        x={geo.slots[id].x}
        y={geo.slots[id].y}
        width={L.w}
        height={L.h}
        radius={L.r}
      />
    );
    return id === HERO ? (
      <g key={id} className="lp-off" style={d(T.peel)}>
        {face}
      </g>
    ) : (
      face
    );
  });

  const rest = restDatum(geo);
  const tl = transferLine(geo);
  const transfer = (
    <>
      <circle
        className="lp-fade"
        cx={rest.x}
        cy={rest.y}
        r={2.5}
        fill="none"
        stroke={P.line}
        strokeWidth={S.fine}
        style={d(T.transfer)}
      />
      <path
        className="lp-draw"
        pathLength={1}
        d={`M${tl.x1} ${tl.y1}L${tl.x2} ${tl.y2}`}
        fill="none"
        stroke={P.line}
        strokeWidth={S.fine}
        style={d(T.transfer, { "--dur": "700ms" })}
      />
    </>
  );

  const lg = geo.legend;
  const keyCx = (lg.keyX[0] + lg.keyX[1]) / 2;
  const flash = flashLine(geo);
  const printA = pt(geo, geo.printLine, geo.head.c0);
  const printB = pt(geo, geo.printLine, geo.head.c1);
  const tb = geo.titleBlock;
  const landedBox = { x: geo.landed.x, y: geo.landed.y, w: L.w, h: L.h };

  return (
    <svg
      viewBox={`0 0 ${view.w} ${view.h}`}
      role="img"
      aria-labelledby={`${ids.title} ${ids.desc}`}
      className="block h-auto w-full font-mono"
      // Geometric text keeps SVG glyphs out of per frame relayout while the lean scales the scene.
      textRendering="geometricPrecision"
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
        <pattern
          id={ids.hatch}
          width={geo.hatch.pitch}
          height={geo.hatch.pitch}
          patternUnits="userSpaceOnUse"
        >
          <path
            d={hatchPath(geo.hatch.pitch, geo.hatch.dir)}
            stroke={P.rule}
            strokeWidth={S.fine}
          />
        </pattern>
      </defs>

      {/* 1. The one rule between bench and floor. */}
      <line {...geo.rule} stroke={P.rule} strokeWidth={S.hair} />

      {/* 2. Key plan, to scale. Not graded. */}
      <rect
        x={plan.box.x + S.hair / 2}
        y={plan.box.y + S.hair / 2}
        width={plan.box.w - S.hair}
        height={plan.box.h - S.hair}
        fill={P.panel}
        stroke={P.rule}
        strokeWidth={S.hair}
      />
      <Tag geo={geo} x={geo.tags.plan.x} y={geo.tags.plan.y}>
        PLAN / SAMPLE
      </Tag>
      <rect
        className="lp-draw"
        pathLength={1}
        x={deckA.x}
        y={deckA.y}
        width={deckB.x - deckA.x}
        height={deckB.y - deckA.y}
        fill="none"
        stroke={P.anno}
        strokeWidth={S.hair}
        style={d(T.planDraw)}
      />
      <path
        className="lp-draw"
        pathLength={1}
        d={dashDotPath(
          cl.x,
          deckA.y - plan.clOver[0],
          deckB.y + plan.clOver[1],
          plan.dash,
        )}
        fill="none"
        stroke={P.decor}
        strokeWidth={S.fine}
        style={d(T.planDraw)}
      />
      {controls.map((c) => {
        const p = planPoint(geo, Number(c.e), Number(c.n));
        const s = plan.tri;
        return (
          <g key={c.id}>
            <path
              className="lp-acquire"
              d={`M${p.x} ${p.y - s}L${p.x + s} ${p.y + s * 0.8}H${p.x - s}Z`}
              fill="none"
              stroke={CONTROL}
              strokeWidth={S.fine}
              strokeLinejoin="round"
              style={d(T.controls)}
            />
            {planId(c.id, T.controls)}
          </g>
        );
      })}
      {layoutPoints.map((id, i) => {
        const p = at(id);
        const a = plan.arm;
        return (
          <g key={id}>
            <g
              className="lp-acquire"
              fill="none"
              stroke={id === HERO ? P.go : P.head}
              strokeWidth={S.fine}
              style={d(T.points[i])}
            >
              <circle cx={p.x} cy={p.y} r={plan.cross} />
              <path
                d={`M${p.x - a} ${p.y}H${p.x + a}M${p.x} ${p.y - a}V${p.y + a}`}
              />
            </g>
            {planId(id, T.points[i])}
          </g>
        );
      })}
      {RUN.map((id, k) => {
        const p = at(id);
        return (
          <circle
            key={id}
            className="lp-blip"
            cx={p.x}
            cy={p.y}
            r={plan.blip}
            fill="none"
            stroke={P.text}
            strokeWidth={S.fine}
            style={d(T.advance[k], { "--dur": "640ms" })}
          />
        );
      })}
      <circle
        className="lp-draw"
        pathLength={1}
        cx={heroPlan.x}
        cy={heroPlan.y}
        r={plan.ring}
        fill="none"
        stroke={P.strong}
        strokeWidth={S.fine}
        style={d(T.ring)}
      />
      <g className="lp-fade" style={d(T.bubble)}>
        <line {...leader} stroke={P.strong} strokeWidth={S.fine} />
        <circle
          cx={plan.bubble.x}
          cy={plan.bubble.y}
          r={plan.bubble.r}
          fill={P.panel}
          stroke={P.strong}
          strokeWidth={S.fine}
        />
        {bubbleA(plan.bubble)}
      </g>

      {/* 3. Floor detail: deck phantom, drawing lines, painted mark. Graded down while the bench works. */}
      <g className="lp-grade" style={d(GRADE.d, { "--dur": `${GRADE.dur}ms` })}>
        <rect
          x={geo.deck.x0}
          y={geo.deck.y1 - geo.hatch.band}
          width={geo.deck.x1 - geo.deck.x0}
          height={geo.hatch.band}
          fill={`url(#${ids.hatch})`}
        />
        {geo.deck.breaks.length ? (
          <line
            x1={geo.deck.x0}
            y1={geo.deck.y0}
            x2={geo.deck.x1}
            y2={geo.deck.y0}
            stroke={P.line}
            strokeWidth={S.fine}
          />
        ) : null}
        {geo.deck.breaks.map((x) => (
          <path
            key={x}
            d={`M${x} ${geo.deck.y0}V${geo.deck.zig - 6}l-4 3l8 6l-4 3V${geo.deck.y1}`}
            fill="none"
            stroke={P.line}
            strokeWidth={S.fine}
          />
        ))}
        <Tag geo={geo} x={geo.tags.deck.x} y={geo.tags.deck.y} halo={P.sheet}>
          DECK
        </Tag>
        <line
          x1={geo.hairlines.edge[0]}
          y1={M.y}
          x2={geo.hairlines.edge[1]}
          y2={M.y}
          stroke={P.go}
          strokeWidth={S.hair}
        />
        <line
          x1={M.x}
          y1={geo.hairlines.setOut[0]}
          x2={M.x}
          y2={geo.hairlines.setOut[1]}
          stroke={P.go}
          strokeWidth={S.fine}
          strokeDasharray={geo.hairlines.dash}
        />
        <path
          data-lp-mark=""
          data-lp-accent=""
          d={`M${M.x - M.arm} ${M.y}H${M.x + M.arm}M${M.x} ${M.y - M.arm}V${M.y + M.arm}`}
          stroke={P.strong}
          strokeWidth={S.accent}
          strokeLinecap="square"
        />
        <path
          d={oversprayPath(geo)}
          stroke={P.line}
          strokeWidth={S.hair}
          strokeLinecap="round"
        />
        <g className="lp-fade" style={d(T.floorBubble)}>
          <circle
            cx={tb.bubble.x}
            cy={tb.bubble.y}
            r={tb.bubble.r}
            fill="none"
            stroke={P.strong}
            strokeWidth={S.fine}
          />
          {bubbleA(tb.bubble)}
          <Tag geo={geo} x={tb.text.x} y={tb.text.y}>
            DETAIL A / NTS
          </Tag>
          <line
            x1={tb.underline[0]}
            y1={tb.underline[2]}
            x2={tb.underline[1]}
            y2={tb.underline[2]}
            stroke={P.decor}
            strokeWidth={S.fine}
          />
        </g>
      </g>

      {/* 4. Web stack: liner and blank stock, clipped where it comes off the roll. */}
      <g clipPath={`url(#${ids.offroll})`}>
        <Advances>
          <rect
            {...span(geo, geo.offRollMin, geo.tearBar, geo.web.c0, geo.web.c1)}
            fill={P.liner}
          />
          <path
            d={edges(geo.offRollMin, geo.tearBar)}
            stroke={P.decor}
            strokeWidth={S.fine}
          />
          {rollSideBlanks(geo).map((a) => {
            const p = pt(geo, a, across);
            return (
              <rect
                key={a}
                x={p.x}
                y={p.y}
                width={L.w}
                height={L.h}
                rx={L.r}
                fill={P.paper}
              />
            );
          })}
          <g className="lp-on" style={d(T.torn)}>
            <polyline
              points={tornEdgePoints(geo, geo.tearBar, -1)}
              fill={P.sheet}
            />
          </g>
          <g className="lp-tear" style={{ ...d(T.torn), ...tearOrigin }}>
            <rect
              {...span(geo, trail, geo.tornEdge, geo.web.c0, geo.web.c1)}
              fill={P.liner}
            />
            <path
              d={edges(trail, geo.tornEdge)}
              stroke={P.decor}
              strokeWidth={S.fine}
            />
            <rect
              x={heroSlot.x + 0.375}
              y={heroSlot.y + 0.375}
              width={L.w - 0.75}
              height={L.h - 0.75}
              rx={L.r}
              fill="none"
              stroke={P.line}
              strokeWidth={S.fine}
              strokeDasharray="3 2"
            />
            {RUN.map((id) => {
              const stock = (
                <rect
                  key={id}
                  x={geo.slots[id].x}
                  y={geo.slots[id].y}
                  width={L.w}
                  height={L.h}
                  rx={L.r}
                  fill={P.paper}
                />
              );
              return id === HERO ? (
                <g key={id} className="lp-off" style={d(T.peel)}>
                  {stock}
                </g>
              ) : (
                stock
              );
            })}
            <polyline
              points={tornEdgePoints(geo, geo.tornEdge, -1)}
              fill={P.sheet}
            />
            <g className="lp-on" style={d(T.torn)}>
              <polyline points={tornEdgePoints(geo, trail, 1)} fill={P.sheet} />
            </g>
          </g>
        </Advances>
      </g>

      {/* 5. Roll: wound liner stock, a hairline spiral and one tail notch at the outer wrap, turning pitch over radius at each advance. */}
      <circle
        cx={geo.roll.cx}
        cy={geo.roll.cy}
        r={geo.roll.r}
        fill={P.sheet}
        stroke={P.line}
        strokeWidth={S.fine}
      />
      {T.advance.reduceRight<ReactNode>(
        (inner, t) => (
          <g className="lp-turn" style={{ ...d(t), ...rollOrigin }}>
            {inner}
          </g>
        ),
        <g>
          <path
            d={spiralPath(geo)}
            fill="none"
            stroke={P.decor}
            strokeWidth={S.fine}
          />
          <path d={notchPath(geo)} stroke={P.anno} strokeWidth={S.hair} />
        </g>,
      )}
      <circle
        cx={geo.roll.cx}
        cy={geo.roll.cy}
        r={geo.roll.core}
        fill="none"
        stroke={P.line}
        strokeWidth={S.fine}
      />

      {/* Tear bar, under the ink so a passing printed face covers it. */}
      <polyline
        points={tearBarPoints(geo)}
        fill="none"
        stroke={P.anno}
        strokeWidth={S.fine}
        strokeLinejoin="miter"
      />

      {/* 6. Ink stack: the same moves, clipped at the print line. */}
      <g clipPath={PRINT_REVEAL ? `url(#${ids.ink})` : undefined}>
        <Advances>
          <g className="lp-tear" style={{ ...d(T.torn), ...tearOrigin }}>
            {inkFaces}
          </g>
        </Advances>
      </g>

      {/* 7. Printer crop corners, head, print line, flashes, cut, feed. */}
      <path
        d={cornersPath(geo.printer.box, geo.printer.arm, 0)}
        fill="none"
        stroke={P.line}
        strokeWidth={S.fine}
      />
      <Tag geo={geo} x={geo.tags.printer.x} y={geo.tags.printer.y}>
        PRINTER
      </Tag>
      {geo.printerLeader ? (
        <path d={geo.printerLeader} stroke={P.line} strokeWidth={S.fine} />
      ) : null}
      <path
        d={headPath(geo)}
        fill="none"
        stroke={P.head}
        strokeWidth={S.hair}
      />
      <g className="lp-in" style={d(T.printLive)}>
        <g className="lp-out" style={d(T.printDone)}>
          <line
            x1={printA.x}
            y1={printA.y}
            x2={printB.x}
            y2={printB.y}
            stroke={P.go}
            strokeWidth={S.hair}
          />
        </g>
      </g>
      <g stroke={P.go} strokeWidth={S.hair}>
        {T.advance.map((t) => (
          <line
            key={t}
            className="lp-blip"
            {...flash}
            style={d(t, { "--dur": "520ms" })}
          />
        ))}
      </g>
      <path
        className="lp-cut"
        pathLength={1}
        d={cutLine(geo)}
        fill="none"
        stroke={P.strong}
        strokeWidth={S.hair}
        style={d(T.tear)}
      />
      <path d={geo.feed} fill="none" stroke={P.line} strokeWidth={S.fine} />
      <Tag geo={geo} x={geo.tags.feed.x} y={geo.tags.feed.y}>
        FEED
      </Tag>

      {/* 8. Transfer: the datum's path from the window to the mark. Transient on mobile. */}
      {geo.transfer.persist ? (
        transfer
      ) : (
        <g className="lp-out" style={d(T.hit)}>
          {transfer}
        </g>
      )}

      {/* 9. Journey: lift about the datum, carry, hold, descend. The halo is the cut edge. */}
      <g className="lp-on" style={d(T.peel)}>
        <g className="lp-carry" style={d(T.carry)}>
          <g className="lp-lift" style={d(T.peel, markOrigin)}>
            <g className="lp-descend" style={d(T.descend, markOrigin)}>
              <g className="lp-off" style={d(T.hit)}>
                <rect
                  x={geo.landed.x - S.hair / 2}
                  y={geo.landed.y - S.hair / 2}
                  width={L.w + S.hair}
                  height={L.h + S.hair}
                  rx={L.r + S.hair / 2}
                  fill="none"
                  stroke={P.sheet}
                  strokeWidth={S.hair}
                />
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

      {/* 10. Registration corners close on the landing footprint. */}
      <path
        className="lp-reg"
        d={cornersPath(landedBox, geo.regCorners.arm, geo.regCorners.gap)}
        fill="none"
        stroke={P.strong}
        strokeWidth={S.fine}
        style={d(T.regist, markOrigin)}
      />

      {/* 11. Lock reticle and the one ping: 24 point pitch, drawn on the deck side only so no dot crosses the printed face. */}
      <path
        className="lp-lock"
        d={reticlePath(geo)}
        fill="none"
        stroke={P.go}
        strokeWidth={S.hair}
        style={d(T.hit)}
      />
      <path
        className="lp-ping"
        data-lp-accent=""
        d={`M${M.x + R} ${M.y}A${R} ${R} 0 0 0 ${M.x - R} ${M.y}A${R} ${R} 0 0 0 ${M.x + R} ${M.y}`}
        pathLength={24}
        strokeDasharray={PING_DOTS}
        strokeDashoffset={-1}
        strokeLinecap="round"
        fill="none"
        stroke={P.go}
        strokeWidth={S.accent}
        opacity={0}
        style={d(T.ping)}
      />

      {/* 12. Legend: two keys, eyebrow over statement, and the leader ending on the mark. */}
      <path
        className="lp-draw"
        pathLength={1}
        d={lg.bracket}
        fill="none"
        stroke={P.anno}
        strokeWidth={S.fine}
        style={d(T.bracket, { "--dur": "400ms" })}
      />
      <path
        className="lp-draw"
        pathLength={1}
        d={`M${lg.keyX[0]} ${lg.a.key}H${lg.keyX[1]}`}
        stroke={P.go}
        strokeWidth={S.hair}
        style={d(T.calloutA, { "--dur": "400ms" })}
      />
      <Tag
        geo={geo}
        x={lg.eyebrowX}
        y={lg.a.eyebrow}
        track={geo.type.eyebrowTrack}
        className="lp-fade-up"
        style={d(T.calloutA)}
      >
        VECTORWORKS DATUM
      </Tag>
      <text
        className="lp-fade-up font-sans"
        x={lg.statementX}
        y={lg.a.statement}
        fontSize={geo.type.statement}
        fontWeight={500}
        letterSpacing="-0.01em"
        fill={P.text}
        style={d(T.calloutA + 80)}
      >
        L042 in the drawing
      </text>
      <path
        className="lp-acquire"
        data-lp-accent=""
        d={`M${keyCx - lg.keyArm} ${lg.b.key}H${keyCx + lg.keyArm}M${keyCx} ${lg.b.key - lg.keyArm}V${lg.b.key + lg.keyArm}`}
        stroke={P.strong}
        strokeWidth={S.accent}
        style={d(T.calloutB)}
      />
      <Tag
        geo={geo}
        x={lg.eyebrowX}
        y={lg.b.eyebrow}
        track={geo.type.eyebrowTrack}
        className="lp-fade-up"
        style={d(T.calloutB)}
      >
        PHYSICAL DATUM
      </Tag>
      <text
        className="lp-fade-up font-sans"
        x={lg.statementX}
        y={lg.b.statement}
        fontSize={geo.type.statement}
        fontWeight={500}
        letterSpacing="-0.01em"
        fill={P.text}
        style={d(T.calloutB + 80)}
      >
        On the surveyed mark
      </text>
      <path
        className="lp-draw"
        data-lp-sentinel=""
        pathLength={1}
        d={lg.merged}
        fill="none"
        stroke={P.anno}
        strokeWidth={S.hair}
        style={d(T.merge, { "--dur": "500ms" })}
      />

      {/* 13. Autoplay waits until this is fully in view. */}
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
  );
}
