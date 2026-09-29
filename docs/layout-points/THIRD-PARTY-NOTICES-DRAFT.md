# DRAFT: third-party notices and rights check

**Must be completed from the release build's actual dependency list.** This is the checklist and the known items, not the final notice.

| Item | Used in | Licence or rights | Action |
|---|---|---|---|
| jsPDF | Datum Label Studio PDF output | MIT (confirm version) | Include copyright line and MIT text in the app bundle and release notes |
| Fonts embedded in labels or UI | Datum Label Studio | Unknown | Confirm each font's licence allows embedding in PDFs and app redistribution |
| Vectorworks sample wrapper or SDK-derived code | Layout Points | Vectorworks developer terms | Confirm redistribution rights for any sample or wrapper code shipped in the plug-in |
| App icon | Datum Label Studio | Unknown author | Confirm TC owns or has licensed it |
| Screenshots on tc.agency | Website | TC-produced from sanitised data | Confirm no client data or third-party marks are visible |
| "Leica-format" and "iCON" references | Website and docs | Nominative use | Keep the non-affiliation statement next to them |
| Any other npm or Swift packages | Both | Per package | Generate with a licence scanner from the tagged build and paste here |

When complete, ship the final notices file inside both release artifacts and link it from the changelog entry.
