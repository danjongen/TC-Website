/*
 * Shared by the homepage hero (cloud-hero.tsx) and the ember layer
 * (embers.tsx): one device gate so both effects switch on and off together,
 * and a tiny signal carrying the photo the point cloud is showing, so the
 * embers take their colours from the same image as the dots they continue.
 */

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

type Listener = (src: string) => void

let currentSlide: string | null = null
const listeners = new Set<Listener>()

export const heroSlide = {
  get: () => currentSlide,
  set(src: string) {
    if (src === currentSlide) return
    currentSlide = src
    listeners.forEach((l) => l(src))
  },
  subscribe(l: Listener) {
    listeners.add(l)
    return () => {
      listeners.delete(l)
    }
  },
}
