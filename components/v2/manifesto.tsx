import { Fragment, type CSSProperties } from "react"
import { CueLabel } from "@/components/motion/cue-label"

/*
 * Homepage manifesto. Words light up as the paragraph crosses the viewport,
 * driven entirely by the CSS scroll-driven scrub in app/globals.css
 * (.tc-scrub / .tc-scrub-word): no JS, no per-frame main-thread work.
 * Unsupported browsers and reduced motion get fully lit, static text.
 *
 * Asterisk words are the accent (hyphens inside them become spaces);
 * punctuation attached to a word stays in the same box as that word.
 */
const TEXT =
  "Sixty thousand people. One cue. No second take. We engineer the systems that make impossible shows *inevitable*: automation, motion, video, power, and data fused into one machine that *does-not-fail*."

/*
 * Scrub window, matching the old framer offsets ["start 0.9", "end 0.6"]:
 * it opens when the paragraph's top reaches 90% of the viewport and closes
 * when its bottom reaches 60%. On the view timeline's cover range (length
 * 100vh + H, where H is the paragraph height) that is 10vh to 40vh + H, a
 * window of 30vh + H split evenly across the words. Percentages in
 * animation-range are of the whole cover range, so (i/N) * H is written as
 * A% - (100 * i/N)vh, which folds into:
 *   edge(i) = cover calc(10vh + A% - Bvh), A = 100 * i/N, B = 70 * i/N
 */
const TOKENS = TEXT.split(" ")
const N = TOKENS.length

const round = (x: number) => Number(x.toFixed(3))
const edge = (i: number) => `cover calc(10vh + ${round((100 * i) / N)}% - ${round((70 * i) / N)}vh)`

const WORDS = TOKENS.map((token, i) => {
  const accent = token.match(/^\*([^*]+)\*(.*)$/)
  return {
    accent: accent ? accent[1].replace(/-/g, " ") : null,
    text: accent ? accent[2] : token,
    style: { "--tc-r0": edge(i), "--tc-r1": edge(i + 1) } as CSSProperties,
  }
})

export function Manifesto() {
  return (
    <section data-cue="01" data-cue-label="THE MANDATE" className="relative bg-black px-6 py-[28vh] md:px-12">
      <div className="mx-auto w-full max-w-4xl">
        <CueLabel index="01" cue className="mb-12 font-mono text-[11px] tracking-[0.2em] text-zinc-400">
          THE MANDATE
        </CueLabel>
        <p className="tc-scrub text-4xl font-semibold leading-[1.12] tracking-[-0.02em] text-white md:text-6xl">
          {WORDS.map((word, i) => (
            <Fragment key={i}>
              {i > 0 ? " " : null}
              <span className="tc-scrub-word inline-block" style={word.style}>
                {word.accent ? <span className="text-[#00D26A]">{word.accent}</span> : null}
                {word.text}
              </span>
            </Fragment>
          ))}
        </p>
      </div>
    </section>
  )
}
