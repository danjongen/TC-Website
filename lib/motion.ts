/**
 * TC motion tokens. One set of physics for the whole site.
 *
 * Mirrors the CSS custom properties in app/globals.css (--ease-*, --dur-*).
 * Change a value in both places. See docs/MOTION.md for when to use which.
 */

/** Expo out. Default for everything that enters, reveals, or responds. */
export const EASE_EXPO = [0.16, 1, 0.3, 1] as const

/** Symmetric in/out. Page transitions and mechanical sweeps only. */
export const EASE_IN_OUT = [0.65, 0, 0.35, 1] as const

/** Durations in seconds (framer-motion units). */
export const DUR = {
  /** hover, focus, press */
  micro: 0.15,
  /** menus, accordions, banners */
  ui: 0.3,
  /** page transition wipe */
  page: 0.4,
  /** scroll-triggered reveals */
  reveal: 0.6,
  /** hero headline only */
  hero: 1,
} as const

/** Delay between siblings that enter together, in seconds. */
export const STAGGER = 0.08
