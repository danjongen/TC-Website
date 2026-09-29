import { existsSync } from "node:fs"
import path from "node:path"

/**
 * Real product evidence for the Layout Points pages.
 *
 * Images are copied from the product repository with
 * scripts/layout-points/import-evidence.sh. Each one renders only when its
 * file is present in public/, so a missing capture leaves the functional
 * diagram in place instead of an empty frame or an invented screen.
 */

export type EvidenceId = "workspace" | "calibration" | "calibrationTarget" | "appIcon"

export type Evidence = {
  id: EvidenceId
  src: string
  width: number
  height: number
  alt: string
  caption: string
  kind: "screenshot" | "render" | "icon"
}

const EVIDENCE: Record<EvidenceId, Evidence> = {
  workspace: {
    id: "workspace",
    src: "/images/layout-points/workspace-dark.png",
    width: 2400,
    height: 1500,
    alt: "Datum Label Studio workspace with an imported field package: point list with locked IDs and coordinates, label preview and exact datum selection.",
    caption: "Datum Label Studio workspace. Sanitised sample data.",
    kind: "screenshot",
  },
  calibration: {
    id: "calibration",
    src: "/images/layout-points/calibration-dark.png",
    width: 2400,
    height: 1500,
    alt: "Datum Label Studio printer calibration screen with fields for four measured frame gaps and two ruler lengths.",
    caption: "Printer calibration in Datum Label Studio. Sanitised sample data.",
    kind: "screenshot",
  },
  calibrationTarget: {
    id: "calibrationTarget",
    src: "/images/layout-points/tc-printer-calibration.png",
    width: 1600,
    height: 1600,
    alt: "Rendered TC printer calibration target with a frame, gap marks and two rulers.",
    caption: "Rendered calibration target. This is the software output, not a photograph of a physical print.",
    kind: "render",
  },
  appIcon: {
    id: "appIcon",
    src: "/images/layout-points/app-icon.png",
    width: 1024,
    height: 1024,
    alt: "Datum Label Studio app icon.",
    caption: "Datum Label Studio",
    kind: "icon",
  },
}

export function getEvidence(id: EvidenceId): Evidence | null {
  const item = EVIDENCE[id]
  const file = path.join(process.cwd(), "public", item.src)
  return existsSync(file) ? item : null
}
