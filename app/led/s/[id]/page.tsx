import type { Metadata } from "next"
import { ShareView } from "../../components/ShareView"
import { resolveShortLink } from "../../lib/shortlink"
import { resolvePublishedCabinet } from "../../lib/cabinetDb"
import { getCabinet } from "../../data/cabinets"
import { decodeConfig } from "../../lib/encode"
import { buildShareMetadata } from "../../lib/shareCard"

export const dynamic = "force-dynamic"

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>
}): Promise<Metadata> {
  const { id } = await params
  const token = await resolveShortLink(id)
  const cfg = token ? decodeConfig(token) : null
  const cab = cfg
    ? (await resolvePublishedCabinet(cfg.cabinet_id)) ?? getCabinet(cfg.cabinet_id) ?? null
    : null
  return buildShareMetadata(cfg, cab)
}

export default async function ShortSharePage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const token = await resolveShortLink(id)

  if (!token) {
    return (
      <div className="min-h-screen flex items-center justify-center px-6">
        <div className="panel p-8 max-w-md text-center">
          <div className="label mb-3">ERROR</div>
          <h1 className="mono text-[16px] font-bold uppercase mb-2">LINK NOT FOUND</h1>
          <p className="mono text-[12px] text-[var(--led-ink-dim)]">
            This short link could not be found. Ask the sender for a fresh one.
          </p>
          <a className="cta cta-primary inline-block mt-5" href="/led">
            OPEN BUILDER
          </a>
        </div>
      </div>
    )
  }

  const cfg = decodeConfig(token)
  const resolvedCabinet = cfg ? await resolvePublishedCabinet(cfg.cabinet_id) : null
  return <ShareView token={token} resolvedCabinet={resolvedCabinet} />
}
