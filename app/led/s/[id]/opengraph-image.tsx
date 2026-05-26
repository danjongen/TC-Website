import { ImageResponse } from "next/og"
import { resolveShortLink } from "../../lib/shortlink"
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
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const token = await resolveShortLink(id)
  const cfg = token ? decodeConfig(token) : null
  const cab = cfg
    ? (await resolvePublishedCabinet(cfg.cabinet_id)) ?? getCabinet(cfg.cabinet_id) ?? null
    : null
  return new ImageResponse(ogCard(cfg, cab), size)
}
