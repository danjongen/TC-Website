"use client"

import { useEffect } from "react"

export function HashScroll({ id }: { id: string }) {
  useEffect(() => {
    const scrollToTarget = () => {
      if (window.location.hash !== `#${id}`) {
        return
      }

      window.requestAnimationFrame(() => {
        document.getElementById(id)?.scrollIntoView({ block: "start" })
      })
    }

    scrollToTarget()
    window.addEventListener("hashchange", scrollToTarget)

    return () => {
      window.removeEventListener("hashchange", scrollToTarget)
    }
  }, [id])

  return null
}
