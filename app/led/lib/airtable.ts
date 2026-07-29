/**
 * Server-side Airtable client for the LED tool.
 *
 * Uses the official REST API directly so we don't pull in the
 * Airtable SDK. Server-only - never import into a "use client" file.
 *
 * Env vars:
 *   AIRTABLE_PAT                 - Personal Access Token, scopes:
 *                                  data.records:read, data.records:write
 *                                  on the CRM Base.
 *   AIRTABLE_CRM_BASE_ID         - default: app5wcWdD13yBPnSd
 *   AIRTABLE_PROJECTS_TABLE_ID   - default: tblfGISaSElAHTPoc
 *   AIRTABLE_DOCUMENTS_TABLE_ID  - default: tblBKgLMIrOijCo2Y
 */

const API_BASE = "https://api.airtable.com/v0"
const CONTENT_BASE = "https://content.airtable.com/v0"

export const AIRTABLE = {
  baseId: process.env.AIRTABLE_CRM_BASE_ID || "app5wcWdD13yBPnSd",
  projectsTable: process.env.AIRTABLE_PROJECTS_TABLE_ID || "tblfGISaSElAHTPoc",
  documentsTable: process.env.AIRTABLE_DOCUMENTS_TABLE_ID || "tblBKgLMIrOijCo2Y",
}

function pat(): string {
  const t = process.env.AIRTABLE_PAT
  if (!t) throw new Error("AIRTABLE_PAT is not set")
  return t
}

function authHeaders(): HeadersInit {
  return {
    Authorization: `Bearer ${pat()}`,
    "Content-Type": "application/json",
  }
}

// ---------- types ----------

export type AirtableProject = {
  id: string
  code: string
  name: string
  clientName?: string
  clientId?: string
  status?: string
}

export type SaveDocumentInput = {
  projectCode: string
  projectName?: string
  cabinetLabel: string
  summary: string
  shareUrl: string
  specPdfBase64: string
  mapPngBase64: string
  specFilename: string
  mapFilename: string
}

export type SaveDocumentResult = {
  recordId: string
  recordUrl: string
}

// ---------- field IDs ----------

const PROJECT_FIELDS = {
  name: "fldJguKGo6dyo1PmR",         // Project Name (primary)
  code: "fldS5lt6FIKx1fMfj",         // Project Code (formula)
  client: "fldUJsmdjEN1ELqc9",       // Client (linked records)
  status: "fldTQTN34REGosbct",       // Status
}

const DOC_FIELDS = {
  docName: "fldQZ4VHHXnMyTOYs",       // Doc Name (primary)
  type: "fldPfkkg29OjXKsFw",          // Type (singleSelect)
  status: "fldT9o58yowgiootr",        // Document Status (singleSelect)
  relatedClient: "fldT5KngBVfBngMI8", // Related Client (links)
  relatedProject: "fldfuAR13HCXEP2q4",// Related Project (links)
  upload: "fldBGQ0HwQibgTN1e",        // Upload (attachments)
  notes: "fldhh3LdJmffPBE9b",         // Notes
  internalNotes: "fldWrkevLxX4vJphJ", // Internal Notes
}

// ---------- public API ----------

/**
 * List projects, returning the lightweight shape the UI typeahead uses.
 * Sorted with most-recent first (by Created desc isn't directly available
 * via field - Airtable's view sort handles it).
 */
export async function listProjects(): Promise<AirtableProject[]> {
  const url = new URL(`${API_BASE}/${AIRTABLE.baseId}/${AIRTABLE.projectsTable}`)
  url.searchParams.set("pageSize", "100")
  url.searchParams.append("fields[]", PROJECT_FIELDS.name)
  url.searchParams.append("fields[]", PROJECT_FIELDS.code)
  url.searchParams.append("fields[]", PROJECT_FIELDS.client)
  url.searchParams.append("fields[]", PROJECT_FIELDS.status)
  url.searchParams.set("returnFieldsByFieldId", "true")

  const all: AirtableProject[] = []
  let offset: string | undefined
  do {
    if (offset) url.searchParams.set("offset", offset)
    const res = await fetch(url, { headers: authHeaders(), cache: "no-store" })
    if (!res.ok) throw new Error(`Airtable list projects ${res.status}: ${await res.text()}`)
    const data = (await res.json()) as {
      records: Array<{ id: string; fields: Record<string, unknown> }>
      offset?: string
    }
    for (const r of data.records) {
      const code = String(r.fields[PROJECT_FIELDS.code] ?? "")
      const name = String(r.fields[PROJECT_FIELDS.name] ?? "")
      if (!code && !name) continue
      const clientLinks = r.fields[PROJECT_FIELDS.client] as
        | Array<string | { id: string; name?: string }>
        | undefined
      const clientFirst = clientLinks?.[0]
      const clientName =
        typeof clientFirst === "object" && clientFirst ? clientFirst.name : undefined
      const clientId =
        typeof clientFirst === "string"
          ? clientFirst
          : (clientFirst as { id?: string } | undefined)?.id
      const status = r.fields[PROJECT_FIELDS.status] as
        | { name?: string }
        | undefined
      all.push({
        id: r.id,
        code,
        name,
        clientName,
        clientId,
        status: status?.name,
      })
    }
    offset = data.offset
  } while (offset)
  return all
}

/**
 * Find a project by its Project Code (formula field).
 * Exact match.
 */
export async function findProjectByCode(
  code: string
): Promise<AirtableProject | null> {
  const url = new URL(`${API_BASE}/${AIRTABLE.baseId}/${AIRTABLE.projectsTable}`)
  url.searchParams.set("pageSize", "1")
  url.searchParams.set(
    "filterByFormula",
    `{${PROJECT_FIELDS.code}} = "${code.replace(/"/g, '\\"')}"`
  )
  url.searchParams.append("fields[]", PROJECT_FIELDS.name)
  url.searchParams.append("fields[]", PROJECT_FIELDS.code)
  url.searchParams.append("fields[]", PROJECT_FIELDS.client)
  url.searchParams.set("returnFieldsByFieldId", "true")

  const res = await fetch(url, { headers: authHeaders(), cache: "no-store" })
  if (!res.ok) throw new Error(`Airtable find project ${res.status}: ${await res.text()}`)
  const data = (await res.json()) as {
    records: Array<{ id: string; fields: Record<string, unknown> }>
  }
  const r = data.records[0]
  if (!r) return null
  const clientLinks = r.fields[PROJECT_FIELDS.client] as
    | Array<string | { id: string; name?: string }>
    | undefined
  const clientFirst = clientLinks?.[0]
  const clientName =
    typeof clientFirst === "object" && clientFirst ? clientFirst.name : undefined
  const clientId =
    typeof clientFirst === "string"
      ? clientFirst
      : (clientFirst as { id?: string } | undefined)?.id
  return {
    id: r.id,
    code: String(r.fields[PROJECT_FIELDS.code] ?? ""),
    name: String(r.fields[PROJECT_FIELDS.name] ?? ""),
    clientName,
    clientId,
  }
}

/**
 * Create a new Documents record for this LED wall and upload the
 * spec PDF + map PNG as attachments.
 *
 * Uses `typecast: true` so the "LED Spec" Type option is auto-created
 * the first time we hit Airtable.
 */
export async function saveDocument(
  input: SaveDocumentInput
): Promise<SaveDocumentResult> {
  // 1) Find the project (may be null if user typed a code that doesn't exist).
  const project = await findProjectByCode(input.projectCode)

  // 2) Build the Documents fields.
  const docName = buildDocName(input, project?.name)
  const today = new Date().toISOString().slice(0, 10)
  const notes = [
    `LED wall spec generated ${today}.`,
    `Cabinet: ${input.cabinetLabel}.`,
    "",
    input.summary,
  ].join("\n")
  const internalNotes = `Share URL\n${input.shareUrl}`

  const fields: Record<string, unknown> = {
    [DOC_FIELDS.docName]: docName,
    [DOC_FIELDS.type]: "LED Spec",
    [DOC_FIELDS.status]: "Complete/Sent",
    [DOC_FIELDS.notes]: notes,
    [DOC_FIELDS.internalNotes]: internalNotes,
  }
  if (project) {
    fields[DOC_FIELDS.relatedProject] = [project.id]
    if (project.clientId) fields[DOC_FIELDS.relatedClient] = [project.clientId]
  }

  // 3) Create the record (typecast on so "LED Spec" gets auto-added).
  const createRes = await fetch(
    `${API_BASE}/${AIRTABLE.baseId}/${AIRTABLE.documentsTable}`,
    {
      method: "POST",
      headers: authHeaders(),
      body: JSON.stringify({
        records: [{ fields }],
        typecast: true,
        returnFieldsByFieldId: true,
      }),
    }
  )
  if (!createRes.ok) {
    throw new Error(`Airtable create document ${createRes.status}: ${await createRes.text()}`)
  }
  const created = (await createRes.json()) as {
    records: Array<{ id: string }>
  }
  const recordId = created.records[0]?.id
  if (!recordId) throw new Error("Airtable create returned no record id")

  // 4) Upload attachments to the Upload field. Sequential - Airtable's
  // attachment endpoint replaces the field contents per call by default,
  // but with `append=true` (added via the upload payload's body shape)
  // we'd append. Their docs only support single-file upload per call,
  // so call once per file and rely on the second call to be additive.
  //
  // Sequence: PDF first → PNG second. The attachment field accumulates.
  await uploadAttachment(recordId, DOC_FIELDS.upload, {
    contentType: "application/pdf",
    filename: input.specFilename,
    base64: input.specPdfBase64,
  })
  await uploadAttachment(recordId, DOC_FIELDS.upload, {
    contentType: "image/png",
    filename: input.mapFilename,
    base64: input.mapPngBase64,
  })

  const recordUrl = `https://airtable.com/${AIRTABLE.baseId}/${AIRTABLE.documentsTable}/${recordId}`
  return { recordId, recordUrl }
}

// ---------- attachment upload ----------

async function uploadAttachment(
  recordId: string,
  fieldIdOrName: string,
  file: { contentType: string; filename: string; base64: string }
): Promise<void> {
  const res = await fetch(
    `${CONTENT_BASE}/${AIRTABLE.baseId}/${recordId}/${fieldIdOrName}/uploadAttachment`,
    {
      method: "POST",
      headers: authHeaders(),
      // Airtable's content API expects the base64 payload under `file`.
      body: JSON.stringify({
        contentType: file.contentType,
        filename: file.filename,
        file: file.base64,
      }),
    }
  )
  if (!res.ok) {
    throw new Error(
      `Airtable upload attachment ${file.filename} ${res.status}: ${await res.text()}`
    )
  }
}

function buildDocName(input: SaveDocumentInput, projectName?: string): string {
  const date = new Date().toISOString().slice(0, 10)
  const project = projectName || input.projectName || input.projectCode || "Project"
  return `${project} / LED Wall / ${input.cabinetLabel} / ${date}`
}
