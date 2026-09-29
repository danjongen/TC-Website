/*
 * Shared by the homepage hero (cloud-hero.tsx, point-cloud.tsx) and its
 * embers (embers.tsx, ember-engine.ts): the slides, one device gate so both
 * effects switch on and off together, the cloud's live camera, and which
 * slide the cloud is showing. The embers are the cloud's own dots, so they
 * start from the same photo, grid and camera.
 */

export const HERO_SLIDES = [
  { src: "/images/bsb-live-06-cloud.jpg", caption: "BACKSTREET BOYS / SPHERE, LAS VEGAS" },
  { src: "/images/bsb-live-02-cloud.jpg", caption: "INTO THE MILLENNIUM / AUTOMATION & POWER" },
  { src: "/images/bsb-live-04-cloud.jpg", caption: "SPHERE RESIDENCY / VIDEO SYSTEMS" },
]

/** Hero scroll progress (0..1 over the 200svh hero) at which the cloud is fully dispersed: 140svh, when the curtain's 40vh gradient edge (app/page.tsx) has passed. */
export const DISPERSE_END = 0.7

type NavigatorHints = Navigator & {
  deviceMemory?: number
  connection?: { saveData?: boolean }
}

/** The cloud (and its embers) run on any device that can afford them, phones included. */
export function canRunCloud() {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return false
  const nav = navigator as NavigatorHints
  if (nav.connection?.saveData) return false
  if ((nav.hardwareConcurrency ?? 8) < 4) return false
  if ((nav.deviceMemory ?? 8) < 4) return false
  return true
}

/** The cloud's camera and grid as of its last drawn frame (written by point-cloud.tsx). */
export const cloudFrame = {
  ready: false,
  mv: new Float32Array(16),
  proj: new Float32Array(16),
  pointScale: 1,
  gridW: 0,
  gridH: 0,
}

type Listener = (index: number) => void

let currentSlide = 0
const listeners = new Set<Listener>()

/** Index into HERO_SLIDES of the photo the cloud is showing. */
export const heroSlide = {
  get: () => currentSlide,
  set(index: number) {
    if (index === currentSlide) return
    currentSlide = index
    listeners.forEach((l) => l(index))
  },
  subscribe(l: Listener) {
    listeners.add(l)
    return () => {
      listeners.delete(l)
    }
  },
}
