"use client"

import Link from "next/link"
import { useEffect, useRef, type ComponentProps, type ReactNode } from "react"

import { trackLayoutPoints, type LayoutPointsEvent, type LayoutPointsEventParams } from "@/lib/layout-points/analytics"

/** Fires one event the first time the wrapped block is on screen. */
export function TrackOnView({
  event,
  params,
  children,
  className,
}: {
  event: LayoutPointsEvent
  params?: LayoutPointsEventParams
  children?: ReactNode
  className?: string
}) {
  const ref = useRef<HTMLDivElement>(null)
  const sent = useRef(false)

  useEffect(() => {
    const el = ref.current
    if (!el || sent.current) return
    if (!("IntersectionObserver" in window)) {
      sent.current = true
      trackLayoutPoints(event, params)
      return
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting) && !sent.current) {
          sent.current = true
          trackLayoutPoints(event, params)
          io.disconnect()
        }
      },
      { threshold: 0.2 },
    )
    io.observe(el)
    return () => io.disconnect()
    // params is a plain literal from a server component; one event per mount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [event])

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  )
}

/** Fires an event once when the page mounts. */
export function TrackMount({ event, params }: { event: LayoutPointsEvent; params?: LayoutPointsEventParams }) {
  const sent = useRef(false)
  useEffect(() => {
    if (sent.current) return
    sent.current = true
    trackLayoutPoints(event, params)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [event])
  return null
}

type TrackedLinkProps = ComponentProps<typeof Link> & {
  event: LayoutPointsEvent
  params?: LayoutPointsEventParams
}

export function TrackedLink({ event, params, onClick, ...props }: TrackedLinkProps) {
  return (
    <Link
      {...props}
      onClick={(e) => {
        trackLayoutPoints(event, params)
        onClick?.(e)
      }}
    />
  )
}

type TrackedAnchorProps = ComponentProps<"a"> & {
  event: LayoutPointsEvent
  params?: LayoutPointsEventParams
}

export function TrackedAnchor({ event, params, onClick, ...props }: TrackedAnchorProps) {
  return (
    <a
      {...props}
      onClick={(e) => {
        trackLayoutPoints(event, params)
        onClick?.(e)
      }}
    />
  )
}
