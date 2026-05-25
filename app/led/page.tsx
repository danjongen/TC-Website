"use client"
import { Suspense, useEffect, useMemo, useState } from "react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { CabinetPicker } from "./components/CabinetPicker"
import { FidoIngest } from "./components/FidoIngest"
import { Footer } from "./components/Footer"
import { Header } from "./components/Header"
import { OutputsPanel } from "./components/OutputsPanel"
import { PanelMap } from "./components/PanelMap"
import { ProjectForm } from "./components/ProjectForm"
import { SpecSheet } from "./components/SpecSheet"
import { WallConfigForm } from "./components/WallConfigForm"
import { CABINETS, getCabinet } from "./data/cabinets"
import { derive } from "./lib/derive"
import { decodeConfig, encodeConfig } from "./lib/encode"
import type { WallConfig } from "./lib/types"

function todayISO(): string {
  const d = new Date()
  const y = d.getFullYear()
  const m = String(d.getMonth() + 1).padStart(2, "0")
  const day = String(d.getDate()).padStart(2, "0")
  return `${y}-${m}-${day}`
}

const DEFAULT_CFG: WallConfig = {
  project_code: "26-TCX-01-LEDWALL",
  project_name: "Untitled Wall",
  client: "",
  tour: "",
  show_date: "",
  lead: "D. Jongen",
  issued_date: todayISO(),
  rev: "A",
  cabinet_id: CABINETS[0].id,
  tiles_wide: 16,
  tiles_high: 6,
  shape: "rectangle",
  power_service: "208V-3PH",
  signal_entry: "TL",
  audience_position: "bottom",
  processor_override: "",
  notes: "",
}

export default function LedToolPage() {
  return (
    <Suspense fallback={<BuilderFallback />}>
      <Builder />
    </Suspense>
  )
}

function BuilderFallback() {
  return (
    <div className="min-h-screen flex items-center justify-center mono text-[12px] uppercase text-[var(--led-ink-dim)]">
      LOADING /
    </div>
  )
}

function Builder() {
  const router = useRouter()
  const pathname = usePathname()
  const params = useSearchParams()
  const [cfg, setCfg] = useState<WallConfig>(DEFAULT_CFG)
  const [shareUrl, setShareUrl] = useState("")

  // Decode initial state from URL ?c=<token> once on mount.
  useEffect(() => {
    const token = params.get("c")
    if (token) {
      const decoded = decodeConfig(token)
      if (decoded) {
        const cab = getCabinet(decoded.cabinet_id) ?? CABINETS[0]
        setCfg({ ...DEFAULT_CFG, ...decoded, cabinet_id: cab.id })
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Push URL token + share URL whenever cfg changes.
  // Builder URL: /led?c=<token> (preserves edit state on refresh).
  // Share URL:   /led/share/<token> (view-only, what gets sent out).
  useEffect(() => {
    const token = encodeConfig(cfg)
    const next = `${pathname}?c=${token}`
    router.replace(next, { scroll: false })
    if (typeof window !== "undefined") {
      setShareUrl(`${window.location.origin}/led/share/${token}`)
    }
  }, [cfg, pathname, router])

  const cab = useMemo(() => getCabinet(cfg.cabinet_id) ?? CABINETS[0], [cfg.cabinet_id])
  const d = useMemo(() => derive(cab, cfg), [cab, cfg])

  function update(next: Partial<WallConfig>) {
    setCfg((cur) => ({ ...cur, ...next }))
  }

  return (
    <div className="min-h-screen flex flex-col">
      <div className="led-print-hide">
        <Header projectCode={cfg.project_code} rev={cfg.rev} issuedDate={cfg.issued_date} />
      </div>

      <main className="flex-1 px-4 md:px-8 py-6 md:py-8">
        <div className="max-w-[1480px] mx-auto">
          <div className="led-print-hide">
            <PageTitle />
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] gap-6">
            {/* LEFT / FORMS — hidden in print */}
            <div className="space-y-5 led-print-hide">
              <FidoIngest
                onIngest={(r) =>
                  update({
                    ...(r.cabinet_id ? { cabinet_id: r.cabinet_id } : {}),
                    tiles_wide: r.tiles_wide,
                    tiles_high: r.tiles_high,
                    power_service: r.power_service,
                  })
                }
              />
              <ProjectForm cfg={cfg} onChange={update} />
              <CabinetPicker
                selectedId={cfg.cabinet_id}
                onChange={(id) => update({ cabinet_id: id })}
              />
              <WallConfigForm cfg={cfg} onChange={update} />
              <OutputsPanel
                cab={cab}
                cfg={cfg}
                d={d}
                shareUrl={shareUrl}
                onProjectCodeChange={(code) => update({ project_code: code })}
              />
            </div>

            {/* RIGHT / PREVIEW — only the spec sheet prints */}
            <div className="space-y-5 xl:sticky xl:top-4 xl:self-start">
              <SpecSheet cab={cab} cfg={cfg} d={d} />
              <div className="led-print-hide">
                <PanelMap cab={cab} cfg={cfg} />
              </div>
            </div>
          </div>
        </div>
      </main>

      <div className="led-print-hide">
        <Footer cabinetLabel={`${cab.manufacturer} ${cab.model}`} processorLabel={d.processor_label} />
      </div>
    </div>
  )
}

function PageTitle() {
  return (
    <div className="mb-6 flex items-end justify-between gap-4 border-b hairline pb-4">
      <div>
        <div className="label mb-1">26-TCX-01-LEDTOOL</div>
        <h1 className="mono text-[20px] md:text-[24px] font-bold tracking-tight uppercase">
          LED WALL / SPEC GENERATOR
        </h1>
      </div>
      <div className="mono text-[10px] uppercase text-[var(--led-ink-faint)] hidden sm:block">
        STATE / URL-ENCODED / REFRESH-SAFE
      </div>
    </div>
  )
}
