/**
 * Product details used in customer documentation that must be confirmed
 * against the public release before publication.
 *
 * Anything marked confirmed: false blocks publication (see
 * unconfirmedFacts() and the release gate in release.ts). Confirm each
 * value against the tagged release build, then flip the flag.
 */

export type ProductFact = {
  value: string
  confirmed: boolean
  note: string
}

export const productFacts = {
  layoutPointTool: {
    value: "Layout Point",
    confirmed: true,
    note: "Tool name in the Vectorworks workspace (from the product brief).",
  },
  exportCommand: {
    value: "LP Export OneClick",
    confirmed: true,
    note: "Menu command name (from the product brief).",
  },
  installerName: {
    value: "Layout Points Installer",
    confirmed: false,
    note: "Name of the guided installer package. Guided installer does not exist yet.",
  },
  pluginLocation: {
    value: "~/Library/Application Support/Vectorworks/<year>/Plug-ins",
    confirmed: false,
    note: "Confirm the installer writes to the Vectorworks user folder for each selected year.",
  },
  studioDataLocation: {
    value: "~/Library/Application Support/Datum Label Studio",
    confirmed: false,
    note: "Where Datum Label Studio keeps label edits, departments and printer corrections. Confirm against the release bundle identifier.",
  },
  studioPreferencesDomain: {
    value: "the Datum Label Studio preferences file in ~/Library/Preferences",
    confirmed: false,
    note: "Depends on the final publisher bundle identifier.",
  },
  calibrationInputs: {
    value: "four measured frame gaps and two ruler lengths",
    confirmed: true,
    note: "From the product brief.",
  },
  fieldPackageContents: {
    value: "label data, Leica-format CONTROL and POINTS files, a manifest and SHA-256 checksums",
    confirmed: true,
    note: "From the product brief.",
  },
} satisfies Record<string, ProductFact>

export function unconfirmedFacts(): string[] {
  return Object.entries(productFacts)
    .filter(([, fact]) => !fact.confirmed)
    .map(([key, fact]) => `${key}: ${fact.note}`)
}
