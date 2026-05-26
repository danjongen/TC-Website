"use client"
import type { ReactNode } from "react"
import { useCollapsible } from "../lib/useCollapsible"

/**
 * Collapsible builder section. Renders the shared panel chrome with a
 * clickable header (chevron + NN / TITLE + optional right-hand label) and
 * shows/hides its body. Collapse state persists per `storageKey`.
 */
export function SectionPanel({
  code,
  title,
  right,
  storageKey,
  defaultOpen = true,
  dimTitle = false,
  children,
}: {
  code: string
  title: string
  right?: ReactNode
  storageKey: string
  defaultOpen?: boolean
  dimTitle?: boolean
  children: ReactNode
}) {
  const { open, toggle } = useCollapsible(storageKey, defaultOpen)
  return (
    <section className="panel">
      <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-1 px-5 py-4">
        <button
          type="button"
          onClick={toggle}
          aria-expanded={open}
          className="flex items-center gap-2 min-w-0 text-left"
          style={{ background: "transparent", cursor: "pointer" }}
        >
          <svg
            width="11"
            height="11"
            viewBox="0 0 16 16"
            aria-hidden
            style={{
              transform: open ? "rotate(90deg)" : "rotate(0deg)",
              transition: "transform 120ms ease",
              color: "var(--led-ink-dim)",
              flexShrink: 0,
            }}
          >
            <path d="M5 3 L12 8 L5 13 Z" fill="currentColor" />
          </svg>
          <span
            className={`mono text-[12px] tracking-[0.08em] uppercase ${
              dimTitle ? "text-[var(--led-ink-dim)]" : ""
            }`}
          >
            {code} / {title}
          </span>
        </button>
        {right ? (
          <span className="mono text-[10px] uppercase text-[var(--led-ink-faint)] shrink-0">
            {right}
          </span>
        ) : null}
      </div>
      {open ? <div className="px-5 pb-5">{children}</div> : null}
    </section>
  )
}
