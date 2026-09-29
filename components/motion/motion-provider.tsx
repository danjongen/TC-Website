"use client"

import type { ReactNode } from "react"
import { LazyMotion, MotionConfig, domAnimation } from "framer-motion"

/**
 * LazyMotion keeps framer-motion to its animation core: components use the
 * slim `m.*` elements instead of `motion.*`. MotionConfig reducedMotion="user"
 * turns off transform animations for anyone who asks the OS for less motion.
 */
export function MotionProvider({ children }: { children: ReactNode }) {
  return (
    <LazyMotion features={domAnimation}>
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </LazyMotion>
  )
}
