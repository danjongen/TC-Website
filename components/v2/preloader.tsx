"use client"

import { useEffect, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"

const BOOT_LINES = [
  "$ tc --init production-systems",
  "> loading automation modules ........ OK",
  "> calibrating motion control ........ OK",
  "> syncing show network ......... 99.97%",
  "> SYSTEMS ONLINE",
]

export function Preloader() {
  const [visible, setVisible] = useState(false)
  const [lineCount, setLineCount] = useState(0)

  useEffect(() => {
    if (sessionStorage.getItem("tc-booted")) return
    sessionStorage.setItem("tc-booted", "1")
    setVisible(true)

    const interval = setInterval(() => {
      setLineCount((c) => {
        if (c >= BOOT_LINES.length) {
          clearInterval(interval)
          setTimeout(() => setVisible(false), 350)
          return c
        }
        return c + 1
      })
    }, 280)

    return () => clearInterval(interval)
  }, [])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black"
          exit={{ opacity: 0, transition: { duration: 0.5 } }}
          aria-hidden="true"
        >
          <div className="w-[min(90vw,480px)] font-mono text-sm md:text-base">
            {BOOT_LINES.slice(0, lineCount).map((line, i) => (
              <motion.p
                key={line}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className={i === BOOT_LINES.length - 1 ? "mt-2 font-bold text-[#00D26A]" : "text-zinc-400"}
              >
                {line}
              </motion.p>
            ))}
            <span className="inline-block h-4 w-2 animate-pulse bg-[#00D26A]" />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
