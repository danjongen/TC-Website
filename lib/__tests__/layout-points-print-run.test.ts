// Print Run to Floor Mark: geometry, timeline, CSS literal and label-face checks.
// Run with: npx tsx --test lib/__tests__/layout-points-print-run.test.ts

import assert from "node:assert/strict";
import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import test from "node:test";

import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";

import { datumPoint } from "../../app/store/layout-points/_components/label/datum";
import {
  faceTexts,
  formatImperial,
  formatMetres,
  FRAME,
  MONO_ADVANCE,
  RING,
  textBox,
} from "../../app/store/layout-points/_components/label/face-layout";
import {
  FACE,
  LABEL_DESIGN,
  LABEL_STOCK,
  LabelFace,
  type LabelData,
} from "../../app/store/layout-points/_components/label/label-face";
import {
  alongSize,
  carry,
  DESKTOP,
  GRADE,
  HERO,
  landedDatum,
  LEAN_DUR,
  LIFT,
  MOBILE,
  planPoint,
  REG_DUR,
  restDatum,
  RUN,
  SAMPLE,
  stripTrail,
  T,
  T_SEQUENCE,
  transferLine,
  turnDeg,
  type Geometry,
} from "../../app/store/layout-points/_components/print-run/geometry";
import { Scene } from "../../app/store/layout-points/_components/print-run/scene";

const ROOT = join(__dirname, "..", "..");
const LP = join(ROOT, "app", "store", "layout-points");
const CSS = readFileSync(join(LP, "layout-points.css"), "utf8");
const LAYOUTS: [string, Geometry][] = [
  ["desktop", DESKTOP],
  ["mobile", MOBILE],
];

const along = (geo: Geometry, p: { x: number; y: number }) =>
  geo.axis === "x" ? p.x : p.y;
const across = (geo: Geometry, p: { x: number; y: number }) =>
  geo.axis === "x" ? p.y : p.x;

function keyframe(name: string): string {
  const m = CSS.match(
    new RegExp(`@keyframes ${name}\\s*\\{([\\s\\S]*?)\\n\\}`),
  );
  assert.ok(m, `@keyframes ${name} exists`);
  return m[1];
}

function numbers(block: string, fn: string): number[] {
  const m = block.match(new RegExp(`${fn}\\(([^)]*)\\)`));
  assert.ok(m, `${fn}() in keyframe`);
  return m[1].split(",").map((s) => parseFloat(s));
}

/** Sorted percentage keys of a keyframe block (from = 0, to = 100). */
function keys(block: string): number[] {
  const out = new Set<number>();
  for (const m of block.matchAll(/(^|[\n,])\s*(from|to|[\d.]+%)(?=\s*[,{])/g)) {
    out.add(m[2] === "from" ? 0 : m[2] === "to" ? 100 : parseFloat(m[2]));
  }
  return [...out].sort((a, b) => a - b);
}

/** Vertices of an absolute M, L, H and V path. */
function pathPoints(d: string): { x: number; y: number }[] {
  const pts: { x: number; y: number }[] = [];
  let x = 0;
  let y = 0;
  for (const m of d.matchAll(/([MLHV])\s*([-\d.]+)(?:[ ,]([-\d.]+))?/g)) {
    if (m[1] === "H") x = Number(m[2]);
    else if (m[1] === "V") y = Number(m[2]);
    else {
      x = Number(m[2]);
      y = Number(m[3]);
    }
    pts.push({ x, y });
  }
  return pts;
}

/** Glyph box of one line of Space Mono, as getBBox reports it. */
// Scene annotations are Space Mono: advance, and ascent and descent as getBBox reports them.
const GLYPH_ADVANCE = 0.612;
const GLYPH_ASCENT = 1.109;
const GLYPH_DESCENT = 0.355;

function monoBox(
  x: number,
  y: number,
  text: string,
  size: number,
  track: number,
  anchor: "start" | "end",
) {
  const w = text.length * (GLYPH_ADVANCE + track) * size;
  const x0 = anchor === "end" ? x - w : x;
  return {
    x0,
    x1: x0 + w,
    y0: y - GLYPH_ASCENT * size,
    y1: y + GLYPH_DESCENT * size,
  };
}

function near(actual: number, expected: number, tol: number, msg: string) {
  assert.ok(
    Math.abs(actual - expected) <= tol,
    `${msg}: ${actual} vs ${expected}`,
  );
}

for (const [name, geo] of LAYOUTS) {
  test(`${name}: pitch is label size along the feed plus the gap`, () => {
    assert.equal(geo.label.pitch, alongSize(geo) + geo.label.gap);
    near(geo.label.w / geo.label.h, LABEL_STOCK.aspect, 1e-9, "label aspect");
  });

  test(`${name}: strip slots sit one pitch apart in print order`, () => {
    const order = [...RUN].reverse(); // L042 nearest the tear bar, CP01 farthest
    order.forEach((id, i) => {
      assert.equal(
        along(geo, geo.slots[id]),
        along(geo, geo.slots[order[0]]) + i * geo.label.pitch,
        id,
      );
      assert.equal(
        across(geo, geo.slots[id]),
        across(geo, geo.nextBlank),
        `${id} across`,
      );
    });
  });

  test(`${name}: web, print line and tear bar agree`, () => {
    const hero = along(geo, geo.slots[HERO]);
    // Next blank's leading edge on the print line.
    assert.equal(along(geo, geo.nextBlank) + alongSize(geo), geo.printLine);
    // Before the tear, the hero slot is one gap after the next blank and the tear bar is mid gap.
    assert.equal(hero - geo.tearShift, geo.printLine + geo.label.gap);
    assert.equal(geo.tearBar, geo.printLine + geo.label.gap / 2);
    assert.equal(stripTrail(geo), geo.tearBar + geo.tearShift);
    // Leading torn edge half a gap past CP01, and at t = 0 it rests on the tear bar.
    assert.equal(
      geo.tornEdge,
      along(geo, geo.slots["CP01"]) + alongSize(geo) + geo.label.gap / 2,
    );
    assert.equal(
      geo.tornEdge - geo.tearShift - T.advance.length * geo.label.pitch,
      geo.tearBar,
    );
    assert.equal(along(geo, geo.tearOrigin), geo.tornEdge);
    assert.equal(across(geo, geo.tearOrigin), (geo.web.c0 + geo.web.c1) / 2);
    // Liner wider than the labels, labels inside it.
    assert.ok(geo.web.c0 < across(geo, geo.nextBlank));
    assert.ok(
      geo.web.c1 >
        across(geo, geo.nextBlank) +
          (geo.axis === "x" ? geo.label.h : geo.label.w),
    );
    // The whole strip, CP01 included, is inside the view at rest.
    assert.ok(geo.tornEdge <= (geo.axis === "x" ? geo.view.w : geo.view.h));
  });

  test(`${name}: carry equals mark minus rest datum, and the landed datum is the mark`, () => {
    assert.equal(SAMPLE[HERO].datum, "tc");
    const r = restDatum(geo);
    const c = carry(geo);
    assert.equal(c.x, geo.mark.x - r.x);
    assert.equal(c.y, geo.mark.y - r.y);
    assert.deepEqual(landedDatum(geo), { x: geo.mark.x, y: geo.mark.y });
  });

  test(`${name}: payoff frames the landing, legend and mark; leader ends on the mark`, () => {
    const p = geo.payoff;
    const inside = (x: number, y: number) =>
      x >= p.x && x <= p.x + p.w && y >= p.y && y <= p.y + p.h;
    assert.ok(inside(geo.mark.x, geo.mark.y));
    assert.ok(inside(geo.landed.x, geo.landed.y));
    assert.ok(inside(geo.landed.x + geo.label.w, geo.landed.y + geo.label.h));
    assert.ok(
      inside(geo.legend.statementX, geo.legend.a.eyebrow - geo.type.anno),
    );
    assert.ok(inside(geo.legend.statementX, geo.legend.b.statement));
    assert.ok(p.x + p.w <= geo.view.w && p.y + p.h <= geo.view.h);
    // The leader stops on the reticle radius, like the transfer line, so the mark stays clean.
    const end = geo.legend.merged.match(/L\s*([\d.]+)[ ,]([\d.]+)\s*$/);
    assert.ok(end);
    near(
      Math.hypot(Number(end[1]) - geo.mark.x, Number(end[2]) - geo.mark.y),
      geo.reticle.r,
      0.01,
      "leader ends on the reticle radius",
    );
    // The leader starts on the bracket's spine.
    const spine = geo.legend.bracket.match(/H\s*([\d.]+)V/);
    const start = geo.legend.merged.match(/^M\s*([\d.]+)/);
    assert.ok(spine && start);
    assert.equal(Number(start[1]), Number(spine[1]));
  });

  test(`${name}: leader lands at 45 degrees, across the hatch`, () => {
    const pts = pathPoints(geo.legend.merged);
    const a = pts[pts.length - 2];
    const b = pts[pts.length - 1];
    const dx = b.x - a.x;
    const dy = b.y - a.y;
    assert.ok(
      dx !== 0 && Math.abs(Math.abs(dx) - Math.abs(dy)) < 1e-6,
      `final segment ${dx},${dy} is 45 degrees`,
    );
    // Pointing at the mark: the 45 degree segment extended lands on it.
    const k = (geo.mark.x - b.x) / dx;
    near(b.y + k * dy, geo.mark.y, 0.01, "final segment aims at the mark");
    // Screen space: a backslash hatch runs (1, 1), a slash hatch runs (1, -1).
    const hatch = geo.hatch.dir === "\\" ? { x: 1, y: 1 } : { x: 1, y: -1 };
    near(
      dx * hatch.x + dy * hatch.y,
      0,
      1e-6,
      "leader is perpendicular to the hatch",
    );
  });

  test(`${name}: transfer line lies on the datum's path, trimmed at both ends`, () => {
    const r = restDatum(geo);
    const m = geo.mark;
    const t = transferLine(geo);
    const cross = (x: number, y: number) =>
      (m.x - r.x) * (y - r.y) - (m.y - r.y) * (x - r.x);
    const len = Math.hypot(m.x - r.x, m.y - r.y);
    assert.ok(Math.abs(cross(t.x1, t.y1)) / len < 0.01, "start collinear");
    assert.ok(Math.abs(cross(t.x2, t.y2)) / len < 0.01, "end collinear");
    near(
      Math.hypot(t.x1 - r.x, t.y1 - r.y),
      2.5,
      0.01,
      "trimmed by the origin circle",
    );
    near(
      Math.hypot(m.x - t.x2, m.y - t.y2),
      geo.reticle.r,
      0.01,
      "trimmed by the reticle",
    );
  });

  test(`${name}: the lift stays inside the view and inside the registration corners`, () => {
    assert.ok(
      geo.mark.x + (geo.label.w / 2) * LIFT + 0.75 <= geo.view.w,
      "lifted label and halo inside the view",
    );
    assert.ok(
      geo.regCorners.gap > geo.label.h * (LIFT - 1) + 0.75,
      "corners clear the lifted label and halo",
    );
    near(geo.lean.scale, geo === DESKTOP ? 1.04 : 1.03, 1e-9, "lean scale");
  });

  test(`${name}: plan IDs sit inside the panel and eyebrows inside the view, less 4u`, () => {
    const b = geo.plan.box;
    for (const [id, at] of Object.entries(geo.plan.ids)) {
      const box = monoBox(
        at.x,
        at.y,
        id,
        geo.type.anno,
        geo.type.idTrack,
        at.anchor,
      );
      assert.ok(
        box.x0 >= b.x + 4 &&
          box.x1 <= b.x + b.w - 4 &&
          box.y0 >= b.y + 4 &&
          box.y1 <= b.y + b.h - 4,
        `${id} inside the plan panel: ${JSON.stringify(box)}`,
      );
    }
    const eyebrows: [string, number][] = [
      ["VECTORWORKS DATUM", geo.legend.a.eyebrow],
      ["PHYSICAL DATUM", geo.legend.b.eyebrow],
    ];
    for (const [text, y] of eyebrows) {
      const box = monoBox(
        geo.legend.eyebrowX,
        y,
        text,
        geo.type.anno,
        geo.type.eyebrowTrack,
        "start",
      );
      assert.ok(
        box.x0 >= 4 &&
          box.x1 <= geo.view.w - 4 &&
          box.y0 >= 4 &&
          box.y1 <= geo.view.h - 4,
        text,
      );
    }
  });

  test(`${name}: key plan is to scale and inside its inset`, () => {
    const b = geo.plan.box;
    for (const id of RUN) {
      const p = planPoint(
        geo,
        Number(SAMPLE[id].coords.e),
        Number(SAMPLE[id].coords.n),
      );
      assert.ok(
        p.x > b.x && p.x < b.x + b.w && p.y > b.y && p.y < b.y + b.h,
        `${id} in plan`,
      );
    }
  });

  test(`${name}: CSS literals match geometry.ts`, () => {
    const suffix = geo.axis;
    const adv = numbers(
      keyframe(`lp-adv-${suffix}`),
      suffix === "x" ? "translateX" : "translateY",
    );
    near(adv[0], -geo.label.pitch, 0.1, "lp-adv");
    const turn = numbers(keyframe(`lp-turn-${suffix}`), "rotate");
    near(turn[0], -turnDeg(geo), 0.1, "lp-turn");
    const c = numbers(keyframe(`lp-carry-${suffix}`), "translate");
    near(c[0], -carry(geo).x, 0.1, "lp-carry x");
    near(c[1], -carry(geo).y, 0.1, "lp-carry y");
    const tear = numbers(
      keyframe(`lp-tear-${suffix}`),
      suffix === "x" ? "translateX" : "translateY",
    );
    near(tear[0], -geo.tearShift, 0.1, "lp-tear");
  });
}

test("desktop plan points match the drawing", () => {
  assert.deepEqual(planPoint(DESKTOP, 9.4, -10.7), { x: 63.8, y: 439.9 });
  assert.deepEqual(planPoint(DESKTOP, 20.6, -0.7), { x: 254.2, y: 269.9 });
  assert.deepEqual(planPoint(DESKTOP, 11, -2.2), { x: 91, y: 295.4 });
  assert.deepEqual(planPoint(DESKTOP, 20, -5.2), { x: 244, y: 346.4 });
  assert.deepEqual(planPoint(DESKTOP, 17.6, -8.2), { x: 203.2, y: 397.4 });
});

test("lift and descend compose to identity before the peel; no yaw anywhere", () => {
  const lift = numbers(keyframe("lp-lift"), "scale")[0];
  const descend = numbers(keyframe("lp-descend"), "scale")[0];
  near(lift * descend, 1, 0.001, "lift scale times descend scale");
  near(descend, LIFT, 1e-9, "descend starts from LIFT");
  for (const name of [
    "lp-carry-x",
    "lp-carry-y",
    "lp-lift",
    "lp-descend",
    "lp-tear-x",
    "lp-tear-y",
    "lp-lock",
    "lp-reg",
    "lp-reg-y",
    "lp-lean-x",
    "lp-lean-y",
  ]) {
    assert.ok(!keyframe(name).includes("rotate("), `${name} has no rotate`);
  }
  for (const name of ["lp-peel", "lp-square", "lp-sh-in", "lp-sh-out"]) {
    assert.ok(
      !new RegExp(`@keyframes ${name}\\b`).test(CSS),
      `@keyframes ${name} is gone`,
    );
  }
});

test("keyframes never read custom properties or set their own easing", () => {
  const blocks = [...CSS.matchAll(/@keyframes\s+([\w-]+)\s*\{([\s\S]*?)\n\}/g)];
  assert.ok(blocks.length >= 20, `found ${blocks.length} keyframe blocks`);
  for (const [, name, body] of blocks) {
    assert.ok(!body.includes("var("), `${name} reads a custom property`);
    assert.ok(
      !body.includes("animation-timing-function"),
      `${name} sets a per keyframe easing`,
    );
  }
});

test("CSS durations match the T duration fields", () => {
  const dur = (sel: string) => {
    const m = CSS.match(
      new RegExp(`${sel} \\{\\s*animation: [\\w-]+ (\\d+)ms`),
    );
    assert.ok(m, `${sel} has a literal duration`);
    return Number(m[1]);
  };
  assert.equal(dur("\\.lp-cut"), T.cutDur);
  assert.equal(dur("\\.lp-geo-x \\.lp-tear"), T.tearDur);
  assert.equal(dur("\\.lp-geo-y \\.lp-tear"), T.tearDur);
  assert.equal(dur("\\.lp-geo-x \\.lp-carry"), T.carryDur);
  assert.equal(dur("\\.lp-geo-y \\.lp-carry"), T.carryDur);
  assert.equal(dur("\\.lp-geo-x \\.lp-adv"), T.advanceDur);
  assert.ok(T.tear + T.cutDur <= T.torn, "the cut flash is gone by the tear");
});

test("plan blips hold their peak through advance plus 160", () => {
  const k = keys(keyframe("lp-blip"));
  assert.ok(
    k[1] <= (100 * 160) / 640 - 5 && k[2] >= (100 * 160) / 640 + 5,
    `lp-blip peak keys ${k}`,
  );
});

test("registration and lean keys land on the beats", () => {
  for (const name of ["lp-reg", "lp-reg-y"]) {
    const reg = keys(keyframe(name));
    near(
      reg[reg.length - 2],
      (100 * (T.hit - T.regist)) / REG_DUR,
      0.2,
      `${name} holds until the hit`,
    );
  }
  // Mobile corners start close enough that the close never leaves the 340 view.
  const regY = numbers(keyframe("lp-reg-y"), "scale")[0];
  const cornerX =
    MOBILE.landed.x + MOBILE.label.w + MOBILE.regCorners.gap - MOBILE.mark.x;
  assert.ok(
    MOBILE.mark.x + cornerX * regY + MOBILE.stroke.fine / 2 <= MOBILE.view.w,
    "mobile registration start inside the view",
  );
  assert.ok(
    MOBILE.mark.x + cornerX * MOBILE.lean.scale + MOBILE.stroke.fine / 2 <=
      MOBILE.view.w,
    "mobile registration corners inside the view at the lean peak",
  );
  for (const [name, geo] of [
    ["lp-lean-x", DESKTOP],
    ["lp-lean-y", MOBILE],
  ] as const) {
    const block = keyframe(name);
    const k = keys(block);
    assert.deepEqual(
      [k[0], k[k.length - 1]],
      [0, 100],
      `${name} starts and ends at identity`,
    );
    near(
      k[1],
      (100 * (T.hit - T.regist)) / LEAN_DUR,
      0.2,
      `${name} peaks at the hit`,
    );
    near(
      k[2],
      (100 * (T.merge - T.regist)) / LEAN_DUR,
      0.2,
      `${name} releases on the merge`,
    );
    near(numbers(block, "scale")[0], geo.lean.scale, 1e-9, `${name} scale`);
  }
});

test("timeline locks to the ka chunk grid and ends at T.rest", () => {
  for (let i = 1; i < T_SEQUENCE.length; i++) {
    assert.ok(
      T_SEQUENCE[i] >= T_SEQUENCE[i - 1],
      `beat ${i} at ${T_SEQUENCE[i]} after ${T_SEQUENCE[i - 1]}`,
    );
  }
  for (let k = 1; k < T.advance.length; k++)
    assert.equal(T.advance[k] - T.advance[k - 1], 640);
  T.advance.forEach((t, k) => assert.equal(T.count[k], t + 520));
  assert.equal(T.advanceDur, 520);
  assert.equal(T.printDone, T.count[3]);
  assert.equal(T.tear, T.printDone + 300);
  assert.equal(T.torn, T.tear + 240);
  assert.equal(T.tearDone, T.torn + 500);
  assert.equal(T.peel, T.tearDone + 180);
  assert.equal(
    T.carry + 900 + 340,
    T.descend,
    "carry, then a 340 ms held breath",
  );
  assert.equal(T.hit, T.descend + 300);
  assert.equal(T.rest, T.merge + 500);
  assert.ok(T.rest <= 7400);
  // The sentinel (merged leader) is the last animation to end.
  assert.ok(T.ping + 700 < T.rest);
  assert.ok(T.regist + LEAN_DUR < T.rest);
  assert.ok(T.regist + REG_DUR < T.rest);
  assert.ok(T.calloutB + 80 + 500 < T.rest);
  assert.ok(GRADE.d + GRADE.dur < T.rest);
  assert.equal(GRADE.d + GRADE.dur, T.peel, "the grade lifts on the peel");
  // Nothing in the header or bench changes before the first top change.
  assert.ok(T.verified >= T.firstTopChange && T.printLive > T.firstTopChange);
});

const labels: LabelData[] = [...Object.values(SAMPLE)];

test("unit columns print as the owner's design board prints them", () => {
  assert.equal(formatMetres("12.345"), "+012.345 m");
  assert.equal(formatMetres("-6.789"), "-006.789 m");
  assert.equal(formatMetres("1.2"), "+001.200 m");
  assert.equal(formatImperial("12.345"), `+40' 06"`);
  assert.equal(formatImperial("-6.789"), `-22' 03 1/4"`);
  assert.equal(formatImperial("1.2"), `+03' 11 1/4"`);
  assert.equal(formatImperial("0.3048"), `+01' 00"`, "twelve inches carry to a foot");
  assert.equal(formatImperial("0.000"), `+00' 00"`);
});

// Condensed advance per em, a ceiling over every glyph the faces print.
const COND_ADVANCE = 0.52;

test("face text stays on the card, clear of the ring and of each other", () => {
  for (const label of labels) {
    const d = datumPoint(label.datum, { x: 0, y: 0, width: 1, height: 1 });
    const boxes = faceTexts(label).map((t) => ({
      t,
      b: textBox(t, t.family === "mono" ? MONO_ADVANCE : COND_ADVANCE),
    }));
    for (const { t, b } of boxes) {
      assert.ok(
        b.x0 >= FRAME && b.x1 <= 1 - FRAME && b.y0 >= FRAME && b.y1 <= 1 - FRAME,
        `${label.id} ${t.key} on the card: ${JSON.stringify(b)}`,
      );
      const clear =
        b.y0 >= d.y + RING.outer || b.x1 <= d.x - RING.outer || b.x0 >= d.x + RING.outer;
      assert.ok(clear, `${label.id} ${t.key} clear of the exact point ring`);
    }
    for (let i = 0; i < boxes.length; i++)
      for (let j = i + 1; j < boxes.length; j++) {
        const [p, q] = [boxes[i].b, boxes[j].b];
        const hit = p.x0 < q.x1 && q.x0 < p.x1 && p.y0 < q.y1 && q.y0 < p.y1;
        assert.ok(!hit, `${label.id}: ${boxes[i].t.key} meets ${boxes[j].t.key}`);
      }
  }
});

test("faces use only the loaded weights", () => {
  const loaded = { mono: [500, 700], cond: [600, 800] };
  for (const label of labels)
    for (const t of faceTexts(label))
      assert.ok(loaded[t.family].includes(t.weight), `${label.id} ${t.key} ${t.family} ${t.weight}`);
});

/** textContent of every <text> element, tags stripped. */
function texts(html: string): string[] {
  return Array.from(html.matchAll(/<text\b[^>]*>([\s\S]*?)<\/text>/g), (m) =>
    m[1].replace(/<[^>]+>/g, "").replace(/&#x27;/g, "'").replace(/&quot;/g, '"'),
  );
}

function face(label: LabelData): string {
  return renderToStaticMarkup(
    createElement(LabelFace, { label, width: 112, height: 112, radius: 2 }),
  );
}

const count = (html: string, re: RegExp) => (html.match(re) ?? []).length;

test("label face prints the sample facts in the board's format", () => {
  const html = renderToStaticMarkup(
    createElement(
      "svg",
      null,
      labels.map((label) =>
        createElement(LabelFace, { key: label.id, label, width: 100, height: 100 }),
      ),
    ),
  );
  const all = texts(html);
  for (const fact of [
    "L042",
    "CP01",
    "+017.600 m",
    "-010.700 m",
    `+57' 09"`,
    "LX",
    "LIGHTING",
    "EXACT POINT",
    "PT 04/04",
    "26-DEMO-01",
    "CONTROL POINT: DO NOT DISTURB",
    "DS TRUSS FOOT",
  ]) {
    assert.ok(all.includes(fact), `${fact} printed`);
  }
  assert.ok(!/\bid="/.test(html), "no ids in LabelFace");
  assert.ok(!all.some((t) => t.includes("BSB")), "no client project codes");
});

test("label faces: department colour frame, CONTROL stays hazard yellow and black", () => {
  const lx = face(SAMPLE.L042);
  const ctl = face(SAMPLE.CP01);
  assert.equal(count(lx, /#2D6FED/gi), 2, "frame and LX code");
  assert.equal(count(lx, /#00D26A/gi), 0, "no site green on a printed face");
  assert.equal(count(ctl, /#2D6FED/gi), 0, "CONTROL takes no department colour");
  assert.equal(count(ctl, new RegExp(FACE.hazard, "gi")), 3, "stock, ring sector, alert text");
  assert.equal(count(lx, /data-part="datum-dot"/g), 1, "one exact point");
  assert.equal(LABEL_STOCK.aspect, 1, "square stock");
});

test("caption follows LABEL_DESIGN.source", () => {
  assert.equal(LABEL_DESIGN.source, "datum-label-studio");
  assert.equal(
    LABEL_DESIGN.caption,
    "Label design from Datum Label Studio, shown with sample data.",
  );
  LABEL_DESIGN.source = "placeholder";
  try {
    assert.equal(LABEL_DESIGN.caption, "Label layout is illustrative.");
  } finally {
    LABEL_DESIGN.source = "datum-label-studio";
  }
});

test("scene markup stays within budget and truth rules", () => {
  const desktop = renderToStaticMarkup(
    createElement(Scene, { geo: DESKTOP, idPrefix: "lp-run-d" }),
  );
  const mobile = renderToStaticMarkup(
    createElement(Scene, { geo: MOBILE, idPrefix: "lp-run-m" }),
  );
  const ids: string[] = [];
  for (const html of [desktop, mobile]) {
    const nodes = count(html, /<[a-zA-Z]/g) - 1; // descendants of the root svg
    assert.ok(nodes <= 300, `node budget: ${nodes}`);
    assert.equal(count(html, /<clipPath/g), 2, "two clip paths");
    assert.equal(count(html, /<pattern/g), 1, "one pattern");
    assert.equal(count(html, /class="lp-draw"/g), 7, "seven one shot draws");
    assert.equal(count(html, /class="lp-ping"/g), 1, "exactly one ping");
    assert.equal(count(html, /data-lp-sentinel/g), 1);
    assert.equal(count(html, /data-lp-payoff/g), 1);
    assert.equal(
      count(html, /#00D26A/gi),
      8,
      "green inventory: 8 in the scene, none in the faces",
    );
    assert.equal(
      count(html, /#2D6FED/gi),
      8,
      "Lighting blue: frame and code on four Lighting faces",
    );
    assert.equal(
      count(html, /<text\b[^>]*class="[^"]*\bfont-sans\b/g),
      2,
      "two Inter statements",
    );
    for (const m of html.matchAll(/style="([^"]*)"/g))
      assert.ok(!m[1].includes("rotate("), `inline rotate: ${m[1]}`);
    assert.ok(
      !/filter|blur|mask|Gradient/i.test(html),
      "no filters, masks or gradients",
    );
    assert.ok(!/#fbbf24|#fcd34d|#f59e0b|amber/i.test(html), "no amber");
    assert.ok(!/\bCUE\b/.test(html));
    ids.push(...Array.from(html.matchAll(/\bid="([^"]+)"/g), (m) => m[1]));
  }
  assert.equal(
    new Set(ids).size,
    ids.length,
    "no duplicate ids across both scenes",
  );
});

test("no drawn stroke outside the label faces is heavier than the accent width", () => {
  for (const [name, geo] of LAYOUTS) {
    const html = renderToStaticMarkup(
      createElement(Scene, { geo, idPrefix: `lp-run-${name}` }),
    );
    // Drop the nested LabelFace svgs and the text halos; everything else is a drawn line.
    const scene = html
      .replace(/^<svg\b[^>]*>/, "")
      .replace(/<svg\b[\s\S]*?<\/svg>/g, "");
    for (const m of scene.matchAll(/<(\w+)\b[^>]*\bstroke-width="([\d.]+)"/g)) {
      if (m[1] === "text") continue;
      assert.ok(
        Number(m[2]) <= geo.stroke.accent,
        `${name} ${m[1]} stroke ${m[2]} exceeds accent ${geo.stroke.accent}`,
      );
    }
  }
});

const EM = String.fromCharCode(0x2014);
const EN = String.fromCharCode(0x2013);
const BANNED = [
  new RegExp(EM),
  new RegExp(EN),
  /accurate/i,
  /verified placement/i,
  /thermal/i,
  /inkjet/i,
];

function filesIn(dir: string): string[] {
  return readdirSync(dir).map((f) => join(dir, f));
}

test("print-run, label and CSS files carry no dashes or banned words", () => {
  const files = [
    ...filesIn(join(LP, "_components", "print-run")),
    ...filesIn(join(LP, "_components", "label")),
    join(LP, "layout-points.css"),
  ];
  for (const file of files) {
    const text = readFileSync(file, "utf8");
    for (const re of BANNED)
      assert.ok(!re.test(text), `${file} contains ${re}`);
  }
});

test("legacy hero motion is gone", () => {
  assert.ok(
    !filesIn(join(LP, "_components")).some((f) =>
      f.endsWith("handoff-sequence.tsx"),
    ),
  );
  for (const word of [
    "lp-autoplay",
    "lp-feed",
    "lp-signal",
    "lp-verify",
    "lp-row",
    "lp-sh-in",
    "lp-sh-out",
    "lp-peel",
    "lp-square",
  ]) {
    assert.ok(!CSS.includes(word), `${word} still in layout-points.css`);
  }
});
