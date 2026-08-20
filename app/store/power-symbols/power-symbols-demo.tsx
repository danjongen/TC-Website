'use client'

import { POWER_SYMBOLS_VERSION } from '@/lib/power-symbols-version'

/**
 * Power Symbols — animated demonstration frame
 * app/store/power-symbols/power-symbols-demo.tsx
 *
 * Redesign notes
 * --------------
 * - One fixed frame. Desktop = 45% symbol stage / 55% operational data, split by a
 *   1px rule. Mobile = stacked. No media queries: the split is a flex-wrap threshold
 *   and all fluid sizing uses container units, so the frame responds to ITS OWN width
 *   (correct inside any page container, not just at viewport breakpoints).
 * - Frame height is stable across all three examples: every symbol has 8 data fields,
 *   cells have a fixed min-height that already fits a 2-line value, and nothing that
 *   animates changes layout — only transform, opacity, pathLength and clip-path.
 * - Base styles ARE the final state. Animation only adds the entrance. That means the
 *   reduced-motion state, the no-JS state and the SSR state are all the finished frame.
 *
 * Swap SYMBOLS[1] / SYMBOLS[2] field values for the repo's canonical data if it differs.
 */

import { useCallback, useEffect, useRef, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'

/* ------------------------------------------------------------------ tokens */

const CREAM = '#F3F0E8'
const CREAM_2 = '#ECE8DE'
const INK = '#0B0B0B'
const META = '#6B675E'
const META_DARK = '#8A857A'
const GREEN = '#00D26A'
const RULE = 'rgba(0,0,0,.2)'
const MONO = "'Geist Mono', ui-monospace, SFMono-Regular, Menlo, monospace"

const OUT = [0.16, 0.84, 0.32, 1] as const
const DRAW = [0.45, 0, 0.15, 1] as const

/* -------------------------------------------------------------------- data */

type Variant = 'double' | 'single' | 'square'

type Symbol = {
  id: string
  title: string
  plate: string
  variant: Variant
  origin: string
  fields: [string, string][]
}

const SYMBOLS: Symbol[] = [
  {
    id: 'P042',
    title: '400A power drop',
    plate: '400A',
    variant: 'double',
    origin: 'X 12.480 · Y 4.220',
    fields: [
      ['Department', 'Production · P'],
      ['Rating', '400A'],
      ['Fed from', 'GENSET 1'],
      ['Destination', 'SL UNDERWORLD'],
      ['Voltage / phase', '208V · 3Ø'],
      ['Circuit', '01'],
      ['Connector', 'Powerlock'],
      ['Cable', '5 × 120 mm²'],
    ],
  },
  {
    id: 'P043',
    title: '16A step-down',
    plate: '16A SD',
    variant: 'single',
    origin: 'X 24.115 · Y 9.860',
    fields: [
      ['Department', 'Audio · A'],
      ['Rating', '16A'],
      ['Fed from', 'P042'],
      ['Destination', 'PLAYBACK'],
      ['Primary', '230V · 1Ø'],
      ['Secondary', '120V · 1Ø'],
      ['Connector', 'CEE 7/7'],
      ['Frequency', '50 Hz'],
    ],
  },
  {
    id: 'GEN01',
    title: 'Generator source',
    plate: 'GEN',
    variant: 'square',
    origin: 'X 02.940 · Y 31.505',
    fields: [
      ['Department', 'Production · P'],
      ['Rating', '500 kVA'],
      ['Source', 'TOURING GENSET'],
      ['Destination', 'MAIN DISTRO'],
      ['Voltage / phase', '400V · 3Ø'],
      ['Frequency', '50 Hz'],
      ['Connector', 'Powerlock'],
      ['Status', 'Reviewed'],
    ],
  },
]

const HOLD_MS = 8600

/* --------------------------------------------------------------- component */

export function PowerSymbolsDemo() {
  const reduce = useReducedMotion()
  // Entrance props hide their element until the animation runs. Where the frame
  // loop is throttled (background tab, some embedded webviews, low-power mode)
  // that would leave the frame blank, so prove the loop is live before relying
  // on it and otherwise render the resting state.
  const [motionOk, setMotionOk] = useState(true)
  useEffect(() => {
    let fired = false
    const id = requestAnimationFrame(() => {
      fired = true
    })
    const t = setTimeout(() => {
      if (!fired) setMotionOk(false)
    }, 300)
    return () => {
      cancelAnimationFrame(id)
      clearTimeout(t)
    }
  }, [])
  const still = reduce || !motionOk

  const [index, setIndex] = useState(0)
  const [run, setRun] = useState(0)
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const sym = SYMBOLS[index]

  const select = useCallback((i: number) => {
    setIndex(i)
    setRun((r) => r + 1)
  }, [])

  useEffect(() => {
    if (timer.current) clearTimeout(timer.current)
    timer.current = setTimeout(() => {
      setIndex((i) => (i + 1) % SYMBOLS.length)
      setRun((r) => r + 1)
    }, HOLD_MS)
    return () => {
      if (timer.current) clearTimeout(timer.current)
    }
  }, [index, run])

  /** Entrance props; returns nothing when the user prefers reduced motion,
   *  so the element simply renders in its resting (final) style. */
  const R = <
    TFrom extends object,
    TTo extends object,
    TTransition extends object,
  >(
    from: TFrom,
    to: TTo,
    transition: TTransition,
  ) => (still ? {} : { initial: from, animate: to, transition })

  const key = `${index}-${run}`
  const titleWords = sym.title.split(' ')
  const plateChars = sym.plate.split('')

  return (
    <section
      aria-labelledby="ps-demo-h"
      style={{
        containerType: 'inline-size',
        maxWidth: 1280,
        margin: '0 auto',
        padding: 'clamp(30px,5cqw,68px) clamp(16px,4cqw,40px) clamp(52px,7cqw,96px)',
      }}
    >
      {/* section head */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'flex-end',
          justifyContent: 'space-between',
          gap: '14px 32px',
          paddingBottom: 16,
          borderBottom: '1px solid rgba(243,240,232,.22)',
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, minWidth: 0 }}>
          <span style={{ fontFamily: MONO, fontSize: 11, fontWeight: 500, letterSpacing: '.2em', color: GREEN }}>
            [ DEMONSTRATION ]
          </span>
          <h2
            id="ps-demo-h"
            style={{
              margin: 0,
              fontSize: 'clamp(23px, calc(2.3cqw + 10px), 36px)',
              fontWeight: 600,
              letterSpacing: '-.022em',
              lineHeight: 1.08,
              color: CREAM,
              textWrap: 'balance',
            }}
          >
            One symbol · all the operational data
          </h2>
        </div>
        <p
          style={{
            margin: 0,
            fontFamily: MONO,
            fontSize: 10.5,
            letterSpacing: '.17em',
            textTransform: 'uppercase',
            color: META_DARK,
          }}
        >
          Vectorworks / editable / scheduled
        </p>
      </div>

      {/* the frame — 1px gaps over a black backing draw every rule */}
      <article
        style={{
          marginTop: 'clamp(18px,2.6cqw,32px)',
          border: '1px solid #000',
          background: '#000',
          display: 'flex',
          flexDirection: 'column',
          gap: 1,
          boxShadow: '0 0 0 1px rgba(243,240,232,.14)',
        }}
      >
        <div
          style={{
            background: CREAM,
            padding: '11px clamp(14px,1.6cqw,20px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '6px 16px',
            fontFamily: MONO,
            fontSize: 10,
            letterSpacing: '.16em',
            textTransform: 'uppercase',
            color: META,
          }}
        >
          <span style={{ display: 'flex', alignItems: 'center', gap: 9, minWidth: 0 }}>
            <span style={{ width: 7, height: 7, background: GREEN, flex: 'none' }} />
            <span style={{ color: INK, fontWeight: 600 }}>Power Symbols · live demonstration</span>
          </span>
          <span style={{ whiteSpace: 'nowrap' }}>
            Obj {String(index + 1).padStart(2, '0')} / {String(SYMBOLS.length).padStart(2, '0')}
          </span>
        </div>

        <div key={key} style={{ display: 'flex', flexWrap: 'wrap', gap: 1, background: '#000' }}>
          {/* ---------------------------------------------------- symbol stage */}
          <div
            style={{
              flex: '45 1 0',
              minWidth: 'min(372px, 100%)',
              background: CREAM_2,
              display: 'flex',
              flexDirection: 'column',
              padding: 'clamp(20px,2.4cqw,32px) clamp(18px,2.2cqw,32px)',
            }}
          >
            <div
              style={{
                flex: '1 1 auto',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: 0,
                padding: 'clamp(4px,2cqw,22px) 0',
              }}
            >
              <div style={{ position: 'relative', width: '100%', maxWidth: 452, containerType: 'inline-size' }}>
                <svg
                  viewBox="0 0 400 380"
                  role="img"
                  aria-label={`${sym.title} symbol, ${sym.id}, rated ${sym.fields[1][1]}, integral reference plate reading ${sym.plate}`}
                  style={{ width: '100%', height: 'auto', display: 'block', overflow: 'visible' }}
                >
                  {/* stage crop marks */}
                  <g stroke={INK} strokeWidth={1.4} fill="none" opacity={0.38}>
                    <path d="M8 28 L8 8 L28 8" />
                    <path d="M372 8 L392 8 L392 28" />
                    <path d="M392 352 L392 372 L372 372" />
                    <path d="M28 372 L8 372 L8 352" />
                  </g>

                  {/* 1 — registration lines shoot in from four directions */}
                  <g stroke={INK} strokeWidth={1.2} strokeLinecap="square">
                    {([
                      ['M20 150 H122', -74, 0],
                      ['M278 150 H380', 74, 0],
                      ['M200 20 V74', 0, -74],
                      ['M200 226 V262', 0, 74],
                    ] as [string, number, number][]).map(([d, dx, dy], i) => (
                      <motion.path
                        key={d}
                        d={d}
                        {...R(
                          { opacity: 0, x: dx, y: dy },
                          { opacity: 1, x: 0, y: 0 },
                          {
                            duration: 0.25,
                            delay: i * 0.042,
                            ease: [0.2, 0.95, 0.3, 1] as const,
                          },
                        )}
                      />
                    ))}
                  </g>

                  {/* registration ticks crossing the target */}
                  <g stroke={INK} strokeWidth={2.4}>
                    {[
                      'M126 150 H144',
                      'M256 150 H274',
                      'M200 76 V94',
                      'M200 206 V224',
                    ].map((d, i) => (
                      <motion.path key={d} d={d} {...R({ opacity: 0 }, { opacity: 1 }, { duration: 0.18, delay: 0.3 + i * 0.04 })} />
                    ))}
                  </g>

                  {/* 2 + 3 — target draws itself, then the inner ring / generator frame */}
                  {sym.variant === 'square' ? (
                    <>
                      <motion.rect
                        x={134} y={84} width={132} height={132} fill="none" stroke={INK} strokeWidth={4}
                        {...R({ pathLength: 0 }, { pathLength: 1 }, { duration: 0.47, delay: 0.19, ease: DRAW as never })}
                      />
                      <motion.rect
                        x={154} y={104} width={92} height={92} fill="none" stroke={INK} strokeWidth={2}
                        {...R({ pathLength: 0, opacity: 0 }, { pathLength: 1, opacity: 1 }, { duration: 0.36, delay: 0.46, ease: DRAW as never })}
                      />
                    </>
                  ) : (
                    <>
                      <motion.circle
                        cx={200} cy={150} r={64} fill="none" stroke={INK} strokeWidth={3.4}
                        {...R({ pathLength: 0 }, { pathLength: 1 }, { duration: 0.47, delay: 0.19, ease: DRAW as never })}
                      />
                      <motion.circle
                        cx={200} cy={150} r={sym.variant === 'double' ? 46 : 24} fill="none" stroke={INK} strokeWidth={1.6}
                        {...R({ pathLength: 0, opacity: 0 }, { pathLength: 1, opacity: 1 }, { duration: 0.36, delay: 0.46, ease: DRAW as never })}
                      />
                    </>
                  )}

                  {/* restrained pulse */}
                  <motion.circle
                    cx={200} cy={150} r={56} fill="none" stroke={GREEN} strokeWidth={2} opacity={0}
                    style={{ transformBox: 'view-box', transformOrigin: '200px 150px' }}
                    {...R(
                      { opacity: 0, scale: 0.78 },
                      { opacity: [0, 0.55, 0], scale: [0.78, 1.02, 1.32] },
                      { duration: 0.64, delay: 1.19, ease: OUT as never },
                    )}
                  />

                  {/* exact centre */}
                  <motion.circle
                    cx={200} cy={150} r={2.6} fill={INK}
                    style={{ transformBox: 'view-box', transformOrigin: '200px 150px' }}
                    {...R({ opacity: 0, scale: 0 }, { opacity: 1, scale: 1 }, { duration: 0.24, delay: 0.56, ease: [0.34, 1.4, 0.44, 1] as const })}
                  />

                  {/* 4 — the bolt lands, overshoots, snaps */}
                  <motion.path
                    d="M208 118 L178 158 L196 158 L192 186 L222 146 L204 146 Z"
                    fill={GREEN} stroke={INK} strokeWidth={1.4} strokeLinejoin="miter"
                    style={{ transformBox: 'view-box', transformOrigin: '200px 152px' }}
                    {...R(
                      { opacity: 0, scale: 0.45, rotate: -8 },
                      { opacity: 1, scale: [0.45, 1.14, 0.97, 1], rotate: [-8, 3, -1, 0] },
                      {
                        duration: 0.56,
                        delay: 0.82,
                        ease: [0.3, 0.9, 0.3, 1] as const,
                      },
                    )}
                  />

                  {/* 5 — connector grows out of the symbol */}
                  <motion.line
                    x1={200} y1={212} x2={200} y2={294} stroke={INK} strokeWidth={3.4}
                    style={{ transformBox: 'view-box', transformOrigin: '200px 212px' }}
                    {...R({ scaleY: 0 }, { scaleY: 1 }, { duration: 0.32, delay: 1.5, ease: OUT as never })}
                  />

                  {/* 6 — the integral plate unfolds off the connector */}
                  <motion.g
                    style={{ transformBox: 'view-box', transformOrigin: '200px 292px' }}
                    {...R({ scaleY: 0, opacity: 0.4 }, { scaleY: 1, opacity: 1 }, { duration: 0.36, delay: 1.79, ease: [0.3, 1.28, 0.42, 1] as const })}
                  >
                    <rect x={193} y={286} width={14} height={10} fill={INK} />
                    <rect x={112} y={292} width={176} height={52} fill={INK} />
                    <rect x={118} y={298} width={164} height={40} fill="none" stroke={CREAM} strokeWidth={1} opacity={0.38} />
                  </motion.g>
                </svg>

                {/* 7 — plate characters, masked, alternating */}
                <div
                  aria-hidden="true"
                  style={{
                    position: 'absolute',
                    left: '28%',
                    top: '76.85%',
                    width: '44%',
                    height: '13.68%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '.8cqw',
                    overflow: 'hidden',
                    pointerEvents: 'none',
                  }}
                >
                  {plateChars.map((c, i) => (
                    <span key={`${c}-${i}`} style={{ display: 'block', overflow: 'hidden' }}>
                      <motion.span
                        style={{
                          display: 'block',
                          fontFamily: MONO,
                          fontSize: '7.2cqw',
                          fontWeight: 600,
                          lineHeight: 1.06,
                          color: CREAM,
                        }}
                        {...R(
                          { opacity: 0, y: i % 2 ? '115%' : '-115%' },
                          { opacity: 1, y: '0%' },
                          { duration: 0.32, delay: 2.07 + i * 0.052, ease: OUT as never },
                        )}
                      >
                        {c}
                      </motion.span>
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                alignItems: 'flex-start',
                justifyContent: 'space-between',
                gap: '6px 18px',
                marginTop: 20,
                paddingTop: 16,
                minHeight: 52,
                borderTop: '1px solid rgba(0,0,0,.22)',
                fontFamily: MONO,
                fontSize: 9.5,
                letterSpacing: '.14em',
                textTransform: 'uppercase',
                color: META,
              }}
            >
              <span>Centre · {sym.origin}</span>
              <span>Vectorworks object</span>
            </div>
          </div>

          {/* ---------------------------------------------- operational data */}
          <div
            aria-live="polite"
            style={{
              flex: '55 1 0',
              minWidth: 'min(398px, 100%)',
              background: CREAM,
              display: 'flex',
              flexDirection: 'column',
              padding: 'clamp(20px,2.4cqw,32px) clamp(18px,2.2cqw,32px)',
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: 16,
                fontFamily: MONO,
                fontSize: 10,
                letterSpacing: '.17em',
                textTransform: 'uppercase',
              }}
            >
              <span style={{ color: META }}>Selected object</span>
              {/* 8 — object ID wipes on */}
              <motion.span
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                  color: INK,
                  fontWeight: 600,
                  fontSize: 12,
                  letterSpacing: '.14em',
                }}
                {...R(
                  { opacity: 0, clipPath: 'inset(0 100% 0 0)' },
                  { opacity: 1, clipPath: 'inset(0 0% 0 0)' },
                  { duration: 0.33, delay: 2.3, ease: OUT as never },
                )}
              >
                <span style={{ width: 7, height: 7, background: GREEN, flex: 'none' }} />
                {sym.id}
              </motion.span>
            </div>

            <h3
              style={{
                margin: '14px 0 0',
                display: 'flex',
                flexWrap: 'wrap',
                gap: '0 .26em',
                fontSize: 'clamp(27px, calc(2.5cqw + 11px), 42px)',
                fontWeight: 600,
                letterSpacing: '-.028em',
                lineHeight: 1.02,
                color: INK,
              }}
            >
              {titleWords.map((w, i) => (
                <span key={`${w}-${i}`} style={{ display: 'inline-block', overflow: 'hidden', paddingBottom: '.08em' }}>
                  <motion.span
                    style={{ display: 'inline-block' }}
                    {...R({ y: '112%' }, { y: '0%' }, { duration: 0.54, delay: 2.4 + i * 0.072, ease: OUT as never })}
                  >
                    {w}
                  </motion.span>
                </span>
              ))}
            </h3>

            <div style={{ height: 1, background: RULE, margin: '18px 0' }} />

            {/* 9 — data rows reveal in an orderly stagger */}
            <dl
              style={{
                margin: 0,
                display: 'flex',
                flexWrap: 'wrap',
                gap: 1,
                background: RULE,
                border: `1px solid ${RULE}`,
              }}
            >
              {sym.fields.map(([label, value], i) => (
                <motion.div
                  key={label}
                  style={{
                    flex: '1 1 max(44%,148px)',
                    minWidth: 0,
                    minHeight: 84,
                    background: CREAM,
                    padding: '12px 14px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 7,
                  }}
                  {...R(
                    { opacity: 0, y: 10 },
                    { opacity: 1, y: 0 },
                    { duration: 0.3, delay: 2.82 + i * 0.056, ease: OUT as never },
                  )}
                >
                  <dt
                    style={{
                      margin: 0,
                      fontFamily: MONO,
                      fontSize: 9.5,
                      fontWeight: 500,
                      letterSpacing: '.15em',
                      textTransform: 'uppercase',
                      color: META,
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                    }}
                  >
                    {label}
                  </dt>
                  <dd
                    style={{
                      margin: 0,
                      fontFamily: MONO,
                      fontSize: 15,
                      fontWeight: 600,
                      lineHeight: 1.25,
                      letterSpacing: '-.005em',
                      color: INK,
                      overflowWrap: 'anywhere',
                      textWrap: 'pretty',
                    }}
                  >
                    {value}
                  </dd>
                </motion.div>
              ))}
            </dl>

            <div style={{ flex: '1 1 auto', minHeight: 16 }} />

            {/* 10 — the closing message */}
            <motion.p
              style={{
                margin: '20px 0 0',
                paddingTop: 16,
                minHeight: 52,
                borderTop: `2px solid ${INK}`,
                display: 'flex',
                alignItems: 'flex-start',
                gap: 11,
                fontFamily: MONO,
                fontSize: 12,
                fontWeight: 500,
                lineHeight: 1.45,
                color: INK,
                textWrap: 'pretty',
              }}
              {...R(
                { opacity: 0, clipPath: 'inset(0 100% 0 0)' },
                { opacity: 1, clipPath: 'inset(0 0% 0 0)' },
                { duration: 0.46, delay: 3.62, ease: OUT as never },
              )}
            >
              <span style={{ width: 9, height: 9, background: GREEN, flex: 'none', marginTop: 5 }} />
              <span>
                Edit once in Object Info <span style={{ color: GREEN }}>→</span> update the drawing + schedule
              </span>
            </motion.p>
          </div>
        </div>

        {/* footer rail */}
        <div role="group" aria-label="Choose an example symbol" style={{ display: 'flex', flexWrap: 'wrap', gap: 1, background: '#000' }}>
          {SYMBOLS.map((s, i) => {
            const active = i === index
            return (
              <button
                key={s.id}
                type="button"
                onClick={() => select(i)}
                aria-pressed={active}
                aria-label={`Show ${s.title} example`}
                style={{
                  flex: '1 1 190px',
                  minWidth: 0,
                  position: 'relative',
                  overflow: 'hidden',
                  border: 0,
                  margin: 0,
                  padding: 0,
                  background: active ? INK : CREAM,
                  cursor: 'pointer',
                  textAlign: 'left',
                  display: 'block',
                  minHeight: 56,
                  font: 'inherit',
                }}
              >
                <span
                  style={{
                    position: 'relative',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 12,
                    padding: '16px 18px',
                    color: active ? CREAM : INK,
                  }}
                >
                  <span style={{ fontFamily: MONO, fontSize: 10, letterSpacing: '.16em', color: active ? GREEN : META, flex: 'none' }}>
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span
                    style={{
                      fontSize: 14,
                      fontWeight: active ? 600 : 500,
                      letterSpacing: '-.01em',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {s.title}
                  </span>
                </span>
                {active && !still && (
                  <motion.span
                    key={key}
                    style={{
                      position: 'absolute',
                      left: 0,
                      bottom: 0,
                      height: 3,
                      width: '100%',
                      background: GREEN,
                      transformOrigin: 'left center',
                    }}
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: HOLD_MS / 1000, ease: 'linear' }}
                  />
                )}
              </button>
            )
          })}
        </div>
      </article>

      <p
        style={{
          margin: '16px 0 0',
          fontFamily: MONO,
          fontSize: 10.5,
          letterSpacing: '.14em',
          textTransform: 'uppercase',
          color: META_DARK,
        }}
      >
        Symbol, rating, route and schedule row stay coordinated · Beta {POWER_SYMBOLS_VERSION}
      </p>
    </section>
  )
}
