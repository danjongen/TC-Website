// Shared by the support form and its API route so the allowed values match.

export const SUPPORT_COMPONENTS = ["Layout Points", "Datum Label Studio", "Both", "Not sure"] as const
export const SUPPORT_ARCHITECTURES = ["Apple silicon", "Intel", "Not sure"] as const
export const SUPPORT_VECTORWORKS = ["2026", "2025", "2024", "2023", "Other", "Not applicable"] as const
export const SUPPORT_IMPORT_TYPES = [
  "Field package folder",
  "Field package ZIP",
  "CSV",
  "TSV",
  "Not applicable",
] as const
export const SUPPORT_CATEGORIES = [
  "Installation",
  "Vectorworks workspace",
  "Placing or numbering points",
  "Export or field package",
  "Import into Datum Label Studio",
  "Departments and colours",
  "Exact datum",
  "PDF output",
  "Printer calibration",
  "Physical print result",
  "Update, rollback or uninstall",
  "Other",
] as const

export const ATTACHMENT_MAX_BYTES = 4 * 1024 * 1024
export const ATTACHMENT_EXTENSIONS = [".png", ".jpg", ".jpeg", ".pdf", ".txt", ".log", ".zip"] as const
