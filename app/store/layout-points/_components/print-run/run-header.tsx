// The HTML header row: job ticket, fixed readout and the step list.
// Animated state spans are aria-hidden stacks in one grid cell; the sr-only
// twin gives the final state in words.

import type { CSSProperties, ReactNode } from "react"

import { HERO, JOB, SAMPLE, T } from "./geometry"

function d(ms: number): CSSProperties {
  return { "--d": `${ms}ms` } as CSSProperties
}

const STACK = "inline-grid [grid-template-areas:'s'] *:[grid-area:s]"
const MARK = "block size-1.5"
const STANDBY = `${MARK} border border-zinc-600`
const LIVE = `${MARK} bg-[#00D26A]`
const DONE = `${MARK} bg-zinc-500`

/** Visible only from `from` to `to`; hidden at rest. */
function Window({
  from,
  to,
  className = "",
  children,
}: {
  from: number
  to: number
  className?: string
  children?: ReactNode
}) {
  return (
    <span className="lp-on" style={d(from)}>
      <span className={`lp-off ${className}`} style={d(to)}>
        {children}
      </span>
    </span>
  )
}

/** Standby outline, then live green, then done zinc (or stays live when `done` is omitted). */
function Marker({ live, done }: { live: number; done?: number }) {
  return (
    <span className={`${STACK} size-1.5 shrink-0`}>
      <span className={`lp-off ${STANDBY}`} style={d(live)} />
      {done === undefined ? (
        <span className={`lp-on ${LIVE}`} style={d(live)} />
      ) : (
        <>
          <Window from={live} to={done} className={LIVE} />
          <span className={`lp-on ${DONE}`} style={d(done)} />
        </>
      )}
    </span>
  )
}

function Step({ marker, children }: { marker: ReactNode; children: ReactNode }) {
  return (
    <li className="flex items-center gap-2 whitespace-nowrap">
      {marker}
      <span>{children}</span>
    </li>
  )
}

export function RunHeader() {
  const hero = SAMPLE[HERO]
  const readout = `${hero.id} / E ${hero.coords.e} N ${hero.coords.n} Z ${hero.coords.z}`

  return (
    <div className="border-b border-zinc-800 font-mono uppercase">
      <p className="sr-only">
        {`Field package ${JOB.stamp}, package verified. Point ${hero.id}, E ${hero.coords.e}, N ${hero.coords.n}, Z ${hero.coords.z}. Print 4 of 4 done, tear done, peel done, place GO.`}
      </p>
      <div
        aria-hidden="true"
        className="divide-y divide-zinc-800 px-4 text-[10px] leading-[1.2] tracking-[0.1em] lg:grid lg:grid-cols-[auto_minmax(max-content,1fr)_auto] lg:items-center lg:gap-x-8 lg:divide-y-0 lg:px-5 lg:py-3 lg:text-[11px] lg:tracking-[0.14em]"
      >
        <p className="py-2 text-zinc-400 lg:py-0">
          <span className="whitespace-nowrap">FIELD PACKAGE /</span>{" "}
          <span className="whitespace-nowrap">{JOB.stamp} /</span>{" "}
          <span className="lp-fade whitespace-nowrap text-[#00D26A]" style={d(T.verified)}>
            PACKAGE VERIFIED
          </span>
        </p>
        <p className="whitespace-nowrap py-2 text-white lg:py-0 lg:text-center">{readout}</p>
        <ol className="flex flex-wrap items-center gap-x-4 gap-y-1 py-2 text-zinc-300 lg:justify-end lg:gap-x-5 lg:py-0">
          <Step marker={<Marker live={T.printLive} done={T.printDone} />}>
            01 PRINT{" "}
            <span className={STACK}>
              <span className="lp-off" style={d(T.count[0])}>
                0
              </span>
              <Window from={T.count[0]} to={T.count[1]}>
                1
              </Window>
              <Window from={T.count[1]} to={T.count[2]}>
                2
              </Window>
              <Window from={T.count[2]} to={T.count[3]}>
                3
              </Window>
              <span className="lp-on" style={d(T.count[3])}>
                4
              </span>
            </span>
            /4
          </Step>
          <Step marker={<Marker live={T.tear} done={T.tearDone} />}>02 TEAR</Step>
          <Step marker={<Marker live={T.peel} done={T.peelDone} />}>03 PEEL</Step>
          <Step marker={<Marker live={T.hit} />}>
            04 PLACE{" "}
            <span className={STACK}>
              <span className="lp-off text-zinc-500" style={d(T.peel)}>
                STBY
              </span>
              <Window from={T.peel} to={T.hit} className="text-white">
                STBY
              </Window>
              <span className="lp-on font-bold text-[#00D26A]" style={d(T.hit)}>
                GO
              </span>
            </span>
          </Step>
        </ol>
      </div>
    </div>
  )
}
