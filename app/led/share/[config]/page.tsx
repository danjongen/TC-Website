import type { Metadata } from "next"
import { ShareView } from "../../components/ShareView"
import { resolvePublishedCabinet } from "../../lib/cabinetDb"
import { getCabinet } from "../../data/cabinets"
import { decodeConfig } from "../../lib/encode"
import { buildShareMetadata } from "../../lib/shareCard"

export const dynamic = "force-dynamic"

export async function generateMetadata({
  params,
}: {
  params: Promise<{ config: string }>
}): Promise<Metadata> {
  const { config } = await params
  const cfg = decodeConfig(config)
  const cab = cfg
    ? (await resolvePublishedCabinet(cfg.cabinet_id)) ?? getCabinet(cfg.cabinet_id) ?? null
    : null
  return buildShareMetadata(cfg, cab)
}

export default async function SharePage({
  params,
}: {
  params: Promise<{ config: string }>
}) {
  const { config } = await params
  const cfg = decodeConfig(config)
  const resolvedCabinet = cfg ? await resolvePublishedCabinet(cfg.cabinet_id) : null
  return <ShareView token={config} resolvedCabinet={resolvedCabinet} />
}
