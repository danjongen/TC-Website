"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

const BASE = "/store/layout-points"

export const productNav = [
  { href: BASE, label: "Overview" },
  { href: `${BASE}/download`, label: "Download" },
  { href: `${BASE}/docs`, label: "Docs" },
  { href: `${BASE}/changelog`, label: "Changelog" },
  { href: `${BASE}/support`, label: "Support" },
] as const

/**
 * Breadcrumb and product navigation shared by every Layout Points page.
 * The breadcrumb matches the Power Symbols page; the product nav is a ruled
 * mono strip, the same voice as the store's cue labels.
 */
export function ProductChrome() {
  const pathname = usePathname() || BASE
  const current = productNav.find((item) => item.href === pathname)
  const onOverview = pathname === BASE

  return (
    <div className="mx-auto w-full max-w-[1600px] px-6 pt-36 md:px-12 md:pt-40">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between lg:gap-8 lg:border-b lg:border-zinc-800 lg:pb-3">
        <nav aria-label="Breadcrumb" className="font-mono text-xs uppercase tracking-[0.2em] text-zinc-400">
          <ol className="flex flex-wrap items-center gap-x-2 gap-y-1">
            <li>
              <Link
                href="/store"
                className="-my-1 inline-block py-1 transition-colors duration-300 ease-expo hover:text-[#00D26A] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00D26A]"
              >
                Store
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li>
              {onOverview ? (
                <span aria-current="page" className="text-zinc-200">
                  Layout Points
                </span>
              ) : (
                <Link
                  href={BASE}
                  className="-my-1 inline-block py-1 transition-colors duration-300 ease-expo hover:text-[#00D26A] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00D26A]"
                >
                  Layout Points
                </Link>
              )}
            </li>
            {current && !onOverview && (
              <>
                <li aria-hidden="true">/</li>
                <li>
                  <span aria-current="page" className="text-zinc-200">
                    {current.label}
                  </span>
                </li>
              </>
            )}
          </ol>
        </nav>

        <nav aria-label="Layout Points" className="border-y border-zinc-800 lg:border-y-0">
          <ul className="-mx-1 flex flex-wrap gap-x-1 py-1">
            {productNav.map((item) => {
              const active = item.href === pathname
              const className = `inline-flex min-h-11 items-center whitespace-nowrap px-3 font-mono text-[11px] font-bold uppercase tracking-[0.18em] transition-colors duration-300 ease-expo focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#00D26A] ${
                active ? "text-[#00D26A]" : "text-zinc-400 hover:text-white"
              }`
              return (
                <li key={item.href}>
                  <Link href={item.href} aria-current={active ? "page" : undefined} className={className}>
                    {item.label}
                  </Link>
                </li>
              )
            })}
          </ul>
        </nav>
      </div>
    </div>
  )
}
