// Print Run to Floor Mark: geometry, timeline, CSS literal and label-face checks.
// Run with: npx tsx --test lib/__tests__/layout-points-print-run.test.ts

import assert from "node:assert/strict"
import { readdirSync, readFileSync } from "node:fs"
import { join } from "node:path"
import test from "node:test"

import { createElement } from "react"
import { renderToStaticMarkup } from "react-dom/server"

import { DATUM_POSITIONS, datumPoint } from "../../app/store/layout-points/_components/label/datum"
import {
  faceLayout,
  rowBox,
  rowText,
  TARGET_FOOTPRINT,
} from "../../app/store/layout-points/_components/label/face-layout"
import {
  LABEL_DESIGN,
  LABEL_STOCK,
  LabelFace,
  type LabelData,
} from "../../app/store/layout-points/_components/label/label-face"
import {
  alongSize,
  carry,
  DESKTOP,
  HERO,
  landedDatum,
  MOBILE,
  planPoint,
  restDatum,
  RUN,
  SAMPLE,
  stripTrail,
  T,
  T_SEQUENCE,
  turnDeg,
  type Geometry,
} from "../../app/store/layout-points/_components/print-run/geometry"
import { Scene } from "../../app/store/layout-points/_components/print-run/scene"

const ROOT = join(__dirname, "..", "..")
const LP = join(ROOT, "app", "store", "layout-points")
const CSS = readFileSync(join(LP, "layout-points.css"), "utf8")
const LAYOUTS: [string, Geometry][] = [
  ["desktop", DESKTOP],
  ["mobile", MOBILE],
]

const along = (geo: Geometry, p: { x: number; y: number }) => (geo.axis === "x" ? p.x : p.y)
const across = (geo: Geometry, p: { x: number; y: number }) => (geo.axis === "x" ? p.y : p.x)

function keyframe(name: string): string {
  const m = CSS.match(new RegExp(`@keyframes ${name}\\s*\\{([\\s\\S]*?)\\n\\}`))
  assert.ok(m, `@keyframes ${name} exists`)
  return m[1]
}

function numbers(block: string, fn: string): number[] {
  const m = block.match(new RegExp(`${fn}\\(([^)]*)\\)`))
  assert.ok(m, `${fn}() in keyframe`)
  return m[1].split(",").map((s) => parseFloat(s))
}

function near(actual: number, expected: number, tol: number, msg: string) {
  assert.ok(Math.abs(actual - expected) <= tol, `${msg}: ${actual} vs ${expected}`)
}

for (const [name, geo] of LAYOUTS) {
  test(`${name}: pitch is label size along the feed plus the gap`, () => {
    assert.equal(geo.label.pitch, alongSize(geo) + geo.label.gap)
    near(geo.label.w / geo.label.h, LABEL_STOCK.aspect, 1e-9, "label aspect")
  })

  test(`${name}: strip slots sit one pitch apart in print order`, () => {
    const order = [...RUN].reverse() // STG-003 nearest the tear bar, CTL-01 farthest
    order.forEach((id, i) => {
      assert.equal(along(geo, geo.slots[id]), along(geo, geo.slots[order[0]]) + i * geo.label.pitch, id)
      assert.equal(across(geo, geo.slots[id]), across(geo, geo.nextBlank), `${id} across`)
    })
  })

  test(`${name}: web, print line and tear bar agree`, () => {
    const hero = along(geo, geo.slots[HERO])
    // Next blank's leading edge on the print line.
    assert.equal(along(geo, geo.nextBlank) + alongSize(geo), geo.printLine)
    // Before the tear, the hero slot is one gap after the next blank and the tear bar is mid gap.
    assert.equal(hero - geo.tearShift, geo.printLine + geo.label.gap)
    assert.equal(geo.tearBar, geo.printLine + geo.label.gap / 2)
    assert.equal(stripTrail(geo), geo.tearBar + geo.tearShift)
    // Leading torn edge half a gap past CTL-01, and at t = 0 it rests on the tear bar.
    assert.equal(geo.tornEdge, along(geo, geo.slots["CTL-01"]) + alongSize(geo) + geo.label.gap / 2)
    assert.equal(geo.tornEdge - geo.tearShift - T.advance.length * geo.label.pitch, geo.tearBar)
    assert.equal(along(geo, geo.tearOrigin), geo.tornEdge)
    assert.equal(across(geo, geo.tearOrigin), (geo.web.c0 + geo.web.c1) / 2)
    // Liner wider than the labels, labels inside it.
    assert.ok(geo.web.c0 < across(geo, geo.nextBlank))
    assert.ok(geo.web.c1 > across(geo, geo.nextBlank) + (geo.axis === "x" ? geo.label.h : geo.label.w))
    // The whole strip, CTL-01 included, is inside the view at rest.
    assert.ok(geo.tornEdge <= (geo.axis === "x" ? geo.view.w : geo.view.h))
  })

  test(`${name}: carry equals mark minus rest datum, and the landed datum is the mark`, () => {
    assert.equal(SAMPLE[HERO].datum, "tc")
    const r = restDatum(geo)
    const c = carry(geo)
    assert.equal(c.x, geo.mark.x - r.x)
    assert.equal(c.y, geo.mark.y - r.y)
    assert.deepEqual(landedDatum(geo), { x: geo.mark.x, y: geo.mark.y })
  })

  test(`${name}: payoff frames the landing, callouts and mark; leader ends on the mark`, () => {
    const p = geo.payoff
    const inside = (x: number, y: number) => x >= p.x && x <= p.x + p.w && y >= p.y && y <= p.y + p.h
    assert.ok(inside(geo.mark.x, geo.mark.y))
    assert.ok(inside(geo.landed.x, geo.landed.y))
    assert.ok(inside(geo.landed.x + geo.label.w, geo.landed.y + geo.label.h))
    assert.ok(inside(geo.callouts.textX, geo.callouts.a[0] - geo.callouts.big))
    assert.ok(p.x + p.w <= geo.view.w && p.y + p.h <= geo.view.h)
    const end = geo.callouts.merged.match(/L\s*([\d.]+)[ ,]([\d.]+)\s*$/)
    assert.ok(end)
    assert.equal(Number(end[1]), geo.mark.x)
    assert.equal(Number(end[2]), geo.mark.y)
    // The leader starts on the bracket's spine.
    const spine = geo.callouts.bracket.match(/H\s*([\d.]+)V/)
    const start = geo.callouts.merged.match(/^M\s*([\d.]+)/)
    assert.ok(spine && start)
    assert.equal(Number(start[1]), Number(spine[1]))
  })

  test(`${name}: key plan is to scale and inside its inset`, () => {
    const b = geo.plan.box
    for (const id of RUN) {
      const p = planPoint(geo, Number(SAMPLE[id].coords.e), Number(SAMPLE[id].coords.n))
      assert.ok(p.x > b.x && p.x < b.x + b.w && p.y > b.y && p.y < b.y + b.h, `${id} in plan`)
    }
  })

  test(`${name}: CSS literals match geometry.ts`, () => {
    const suffix = geo.axis
    const adv = numbers(keyframe(`lp-adv-${suffix}`), suffix === "x" ? "translateX" : "translateY")
    near(adv[0], -geo.label.pitch, 0.1, "lp-adv")
    const turn = numbers(keyframe(`lp-turn-${suffix}`), "rotate")
    near(turn[0], -turnDeg(geo), 0.1, "lp-turn")
    const c = numbers(keyframe(`lp-carry-${suffix}`), "translate")
    near(c[0], -carry(geo).x, 0.1, "lp-carry x")
    near(c[1], -carry(geo).y, 0.1, "lp-carry y")
    const tear = numbers(keyframe(`lp-tear-${suffix}`), suffix === "x" ? "translateX" : "translateY")
    near(tear[0], -geo.tearShift, 0.1, "lp-tear")
  })
}

test("desktop plan points match the drawing", () => {
  assert.deepEqual(planPoint(DESKTOP, 9.4, -10.7), { x: 55.2, y: 450.6 })
  assert.deepEqual(planPoint(DESKTOP, 20.6, -0.7), { x: 256.8, y: 270.6 })
  assert.deepEqual(planPoint(DESKTOP, 11, -2.2), { x: 84, y: 297.6 })
  assert.deepEqual(planPoint(DESKTOP, 20, -5.2), { x: 246, y: 351.6 })
  assert.deepEqual(planPoint(DESKTOP, 17.6, -8.2), { x: 202.8, y: 405.6 })
})

test("peel, descend and square compose to identity before the peel", () => {
  const peel = keyframe("lp-peel")
  const descend = numbers(keyframe("lp-descend"), "scale")[0]
  const peelScale = numbers(peel, "scale")[0]
  near(peelScale * descend, 1, 0.001, "peel scale times descend scale")
  near(numbers(peel, "rotate")[0], -numbers(keyframe("lp-square"), "rotate")[0], 1e-9, "peel yaw undoes square yaw")
})

test("timeline is ordered and ends at T.rest", () => {
  for (let i = 1; i < T_SEQUENCE.length; i++) {
    assert.ok(T_SEQUENCE[i] >= T_SEQUENCE[i - 1], `beat ${i} at ${T_SEQUENCE[i]} after ${T_SEQUENCE[i - 1]}`)
  }
  for (let k = 1; k < T.advance.length; k++) assert.equal(T.advance[k] - T.advance[k - 1], 660)
  T.advance.forEach((t, k) => assert.equal(T.count[k], t + T.advanceDur))
  assert.equal(T.printDone, T.advance[3] + T.advanceDur)
  assert.equal(T.tearDone, T.tear + T.tearDur)
  assert.equal(T.rest, T.merge + 600)
  assert.ok(T.rest <= 7400)
  // The sentinel (merged leader) is the last animation to end.
  assert.ok(T.ping + 900 < T.rest)
  assert.ok(T.calloutB + 600 < T.rest)
  assert.ok(T.hit + 500 < T.rest)
  // Nothing in the header or bench changes before the first top change.
  assert.ok(T.verified >= T.firstTopChange && T.printLive > T.firstTopChange)
})

const labels: LabelData[] = [...Object.values(SAMPLE)]

test("no text row overlaps the target footprint for all nine datums at aspect 1.5", () => {
  const h = 100
  const w = h * LABEL_STOCK.aspect
  for (const base of labels) {
    for (const pos of DATUM_POSITIONS) {
      const label = { ...base, datum: pos.id } as LabelData
      const f = faceLayout(pos.id, w, h)
      const t = datumPoint(pos.id, { x: 0, y: 0, width: w, height: h })
      assert.deepEqual({ x: f.target.x, y: f.target.y }, t)
      const fp = TARGET_FOOTPRINT * h
      for (const row of f.rows) {
        const b = rowBox(f, row, rowText(label, row.key))
        const hit = b.x0 < t.x + fp && b.x1 > t.x - fp && b.y0 < t.y + fp && b.y1 > t.y - fp
        assert.ok(!hit, `${base.id} row ${row.key} overlaps the ${pos.id} target`)
        assert.ok(b.x0 >= 0 && b.x1 <= w, `${base.id} row ${row.key} inside the stock at ${pos.id}`)
      }
    }
  }
})

test("label face prints only the known facts, verbatim", () => {
  const html = renderToStaticMarkup(
    createElement(
      "svg",
      null,
      labels.map((label) => createElement(LabelFace, { key: label.id, label, width: 150, height: 100 })),
    ),
  )
  assert.ok(html.includes(">N -10.700<"))
  assert.ok(html.includes(">E 17.600<"))
  assert.ok(html.includes(">CONTROL<"))
  assert.ok(html.includes(">RIGGING<"))
  assert.ok(!/\bid="/.test(html), "no ids in LabelFace")
})

test("caption follows LABEL_DESIGN.source", () => {
  assert.equal(LABEL_DESIGN.source, "placeholder")
  assert.equal(LABEL_DESIGN.caption, "Label layout is illustrative.")
  LABEL_DESIGN.source = "datum-label-studio"
  try {
    assert.equal(LABEL_DESIGN.caption, "Label layout from a Datum Label Studio export.")
  } finally {
    LABEL_DESIGN.source = "placeholder"
  }
})

test("scene markup stays within budget and truth rules", () => {
  const desktop = renderToStaticMarkup(
    createElement(Scene, { geo: DESKTOP, idPrefix: "lp-run-d", className: "lp-geo-x hidden lg:block" }),
  )
  const mobile = renderToStaticMarkup(
    createElement(Scene, { geo: MOBILE, idPrefix: "lp-run-m", className: "lp-geo-y lg:hidden" }),
  )
  const ids: string[] = []
  for (const html of [desktop, mobile]) {
    const nodes = (html.match(/<[a-zA-Z]/g) ?? []).length - 1 // descendants of the root svg
    assert.ok(nodes <= 300, `node budget: ${nodes}`)
    assert.equal((html.match(/<clipPath/g) ?? []).length, 2)
    assert.equal((html.match(/class="lp-ping"/g) ?? []).length, 1, "exactly one ping")
    assert.equal((html.match(/class="lp-draw"/g) ?? []).length, 5, "five one-shot draws")
    assert.equal((html.match(/data-lp-sentinel/g) ?? []).length, 1)
    assert.equal((html.match(/data-lp-payoff/g) ?? []).length, 1)
    assert.ok(!/filter|blur|mask|Gradient/i.test(html), "no filters, masks or gradients")
    assert.ok(!/#fbbf24|#fcd34d|#f59e0b|amber/i.test(html), "no amber")
    assert.equal((html.match(/#38BDF8/gi) ?? []).length, 1, "#38BDF8 only in the RIG-012 face")
    assert.ok(!/\bCUE\b/.test(html))
    ids.push(...Array.from(html.matchAll(/\bid="([^"]+)"/g), (m) => m[1]))
  }
  assert.equal(new Set(ids).size, ids.length, "no duplicate ids across both scenes")
})

const EM = String.fromCharCode(0x2014)
const EN = String.fromCharCode(0x2013)
const BANNED = [new RegExp(EM), new RegExp(EN), /accurate/i, /verified placement/i, /thermal/i, /inkjet/i]

function filesIn(dir: string): string[] {
  return readdirSync(dir).map((f) => join(dir, f))
}

test("print-run, label and CSS files carry no dashes or banned words", () => {
  const files = [
    ...filesIn(join(LP, "_components", "print-run")),
    ...filesIn(join(LP, "_components", "label")),
    join(LP, "layout-points.css"),
  ]
  for (const file of files) {
    const text = readFileSync(file, "utf8")
    for (const re of BANNED) assert.ok(!re.test(text), `${file} contains ${re}`)
  }
})

test("legacy hero motion is gone", () => {
  assert.ok(!filesIn(join(LP, "_components")).some((f) => f.endsWith("handoff-sequence.tsx")))
  for (const word of ["lp-autoplay", "lp-feed", "lp-signal", "lp-verify", "lp-row"]) {
    assert.ok(!CSS.includes(word), `${word} still in layout-points.css`)
  }
})
