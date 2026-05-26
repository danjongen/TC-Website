import { ImageResponse } from "next/og"
import { decodeConfig } from "../../lib/encode"
import { resolvePublishedCabinet } from "../../lib/cabinetDb"
import { getCabinet } from "../../data/cabinets"
import { ogCard } from "../../lib/shareCard"

export const runtime = "nodejs"
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"
export const alt = "LED Wall Spec"

export default async function Image({
  params,
}: {
  params: Promise<{ config: string }>
}) {
  const { config } = await params
  const cfg = decodeConfig(config)
  const cab = cfg
    ? (await resolvePublishedCabinet(cfg.cabinet_id)) ?? getCabinet(cfg.cabinet_id) ?? null
    : null
  return new ImageResponse(ogCard(cfg, cab), size)
}
