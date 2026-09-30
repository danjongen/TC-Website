// The HTML header: job ticket, fixed readout, the cue list and its progress rule.
// Animated state spans are aria-hidden; the sr-only twin gives the final state in words.
// Counters roll like an odometer in clipped windows; every --d comes from T.

import type { CSSProperties, ReactNode } from "react";

import { HERO, JOB, SAMPLE, T } from "./geometry";

function d(ms: number, dur?: number): CSSProperties {
  return {
    "--d": `${ms}ms`,
    ...(dur === undefined ? {} : { "--dur": `${dur}ms` }),
  } as CSSProperties;
}

const STACK = "grid [grid-template-areas:'s'] *:[grid-area:s]";
const MARK = "block size-[5px]";
const STANDBY = `${MARK} border border-[#71717A]`;
const LIVE = `${MARK} bg-[#00D26A]`;
const DONE = `${MARK} bg-[#A1A1AA]`;

/** Visible only from `from` to `to`; hidden at rest. */
function Window({
  from,
  to,
  className = "",
  children,
}: {
  from: number;
  to: number;
  className?: string;
  children?: ReactNode;
}) {
  return (
    <span className="lp-on" style={d(from)}>
      <span className={`lp-off ${className}`} style={d(to)}>
        {children}
      </span>
    </span>
  );
}

/** Standby outline, then live green, then done zinc (or stays live when `done` is omitted). */
function Marker({ live, done }: { live: number; done?: number }) {
  return (
    <span className={`${STACK} size-[5px] shrink-0`}>
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
  );
}

function Step({
  marker,
  className = "",
  children,
}: {
  marker: ReactNode;
  className?: string;
  children: ReactNode;
}) {
  return (
    <li className={`flex items-center gap-2 whitespace-nowrap ${className}`}>
      {marker}
      <span>{children}</span>
    </li>
  );
}

/** The print count: a 0 to 4 column behind four nested rolls, one per advance. */
function Odometer() {
  return (
    <span className="inline-block h-[1.2em] overflow-clip align-top leading-[1.2]">
      {T.count.reduceRight<ReactNode>(
        (inner, t) => (
          <span className="lp-roll block" style={d(t)}>
            {inner}
          </span>
        ),
        <span className="block -translate-y-[4.8em]">
          {[0, 1, 2, 3, 4].map((n) => (
            <span key={n} className="block">
              {n}
            </span>
          ))}
        </span>,
      )}
    </span>
  );
}

/** STBY brightens on the peel; GO rolls up over it on the hit. */
function Place() {
  return (
    <span className="inline-block h-[1.2em] w-[5ch] overflow-clip align-top leading-[1.2]">
      <span className="lp-roll block" style={d(T.hit)}>
        <span className="block -translate-y-[1.2em]">
          <span className={STACK}>
            <span className="lp-off text-[#A1A1AA]" style={d(T.peel)}>
              STBY
            </span>
            <span className="lp-on text-[#FAFAFA]" style={d(T.peel)}>
              STBY
            </span>
          </span>
          <span className="block font-bold text-[#00D26A]">GO</span>
        </span>
      </span>
    </span>
  );
}

/** One segment of the progress rule: a 1px track that fills left to right. */
function Seg({
  at,
  dur,
  green = false,
}: {
  at: number;
  dur: number;
  green?: boolean;
}) {
  return (
    <span className="relative block h-px bg-[#27272A]">
      <span
        className={`lp-seg absolute inset-0 origin-left ${green ? "bg-[#00D26A]" : "bg-[#71717A]"}`}
        style={d(at, dur)}
      />
    </span>
  );
}

/** Seven columns, matching the cue list above: four prints, tear, peel, place. */
function ProgressRule({ className }: { className: string }) {
  return (
    <div
      aria-hidden="true"
      className={`grid grid-cols-7 gap-[2px] ${className}`}
    >
      <span className="col-span-4 grid grid-cols-4 gap-px">
        {T.advance.map((t) => (
          <Seg key={t} at={t} dur={T.advanceDur} />
        ))}
      </span>
      <Seg at={T.tear} dur={T.tearDone - T.tear} />
      <Seg at={T.peel} dur={T.peelDone - T.peel} />
      <Seg at={T.carry} dur={T.hit - T.carry} green />
    </div>
  );
}

export function RunHeader() {
  const hero = SAMPLE[HERO];
  const readout = `${hero.id} / E ${hero.coords.e} N ${hero.coords.n} Z ${hero.coords.z}`;

  return (
    <div className="font-mono uppercase lg:col-start-2 lg:row-start-1 xl:col-auto xl:row-auto">
      <p className="sr-only">
        {`Field package ${JOB.stamp}, package verified. Point ${hero.id}, E ${hero.coords.e}, N ${hero.coords.n}, Z ${hero.coords.z}. Print 4 of 4 done, tear done, peel done, place GO.`}
      </p>
      <div
        aria-hidden="true"
        className="divide-y divide-zinc-800 px-4 text-[10px] leading-[1.2] tracking-[0.06em] xl:divide-y-0 xl:px-0 xl:tracking-[0.14em]"
      >
        <div className="divide-y divide-zinc-800 xl:flex xl:items-center xl:justify-between xl:gap-6 xl:divide-y-0 xl:border-b xl:border-zinc-800 xl:px-5 xl:py-3">
          <p className="py-2 text-[#A1A1AA] xl:flex xl:items-center xl:gap-x-[0.6em] xl:py-0">
            <span className="block whitespace-nowrap xl:inline">
              FIELD PACKAGE / {JOB.stamp}
              <span className="hidden xl:inline"> /</span>
            </span>
            <span
              className="lp-fade flex items-center gap-2 whitespace-nowrap text-[#E4E4E7]"
              style={d(T.verified)}
            >
              <span className="block size-[5px] shrink-0 bg-[#00D26A]" />
              PACKAGE VERIFIED
            </span>
          </p>
          <p className="whitespace-nowrap py-2 text-[#FAFAFA] xl:py-0 xl:text-[11px] xl:tracking-[0.12em]">
            {readout}
          </p>
        </div>
        <div className="pb-2 pt-2 xl:px-5 xl:pb-0 xl:pt-3">
          <ol className="grid grid-cols-2 gap-x-4 gap-y-1 text-[#D4D4D8] xl:grid-cols-7 xl:gap-x-[2px]">
            <Step
              marker={<Marker live={T.printLive} done={T.printDone} />}
              className="xl:col-span-4"
            >
              01 PRINT&nbsp;
              <Odometer />
              /4
            </Step>
            <Step marker={<Marker live={T.tear} done={T.tearDone} />}>
              02 TEAR
            </Step>
            <Step marker={<Marker live={T.peel} done={T.peelDone} />}>
              03 PEEL
            </Step>
            <Step marker={<Marker live={T.hit} />}>
              04 PLACE&nbsp;
              <Place />
            </Step>
          </ol>
          <ProgressRule className="mt-2 xl:mt-2.5" />
        </div>
      </div>
    </div>
  );
}
