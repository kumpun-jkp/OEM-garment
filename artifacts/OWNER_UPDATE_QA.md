# Owner content update verification

Reviewed 4 October 2026 against the owner tables A–H, the later contact details and the Thonburi Master / TM Apparel identity instruction. This review supersedes the business-copy and component counts in the original 2 October [QA report](QA.md).

## Applied scope

- Eight routes and their existing top-level sections are retained. The audit table keeps four document rows plus its header.
- About's four grouped fabric cards are now eight individual categories. All eight fabric images loaded in the rendered production page. The new images are AI-generated illustrations, identified in captions and alternative text.
- Home and About each show fifteen individual sewing/finishing techniques instead of four repeated cards. Their shared component reads centrally maintained content arrays.
- OEM Journey shows six stages instead of eight. Materials, sample making and approval are combined. Supplied sample costs, deposit terms and estimated timelines are included without an invented end-to-end guarantee.
- The address, telephone, fax and hours agree across Contact, project/contact blocks and the footer. The telephone link uses the first number in the supplied range. The map searches the exact Thai address rather than inferred coordinates.
- Thonburi Master remains the main website identity; TM Apparel is described as part of it. Owner figures, workflow, machinery, audit highlights and workforce provisions replace stale source placeholders.

## Verification results

| Check | Result |
| --- | --- |
| Production build | Passed with Next.js 16.3.8; all page routes compiled |
| ESLint | Passed; local `.tools/` and `.design/` tooling excluded |
| TypeScript | Passed |
| Existing enquiry validation tests | 7 passed |
| Running production-site check | 8 routes, 42 internal destinations and 45 unique rendered assets passed; 404, validation, origin checks and explicit unconfigured-delivery response passed |
| Responsive measurements | 40 route/width combinations at 1280, 1000, 768, 390 and 320 px; no page-level horizontal overflow or detected text-width clipping after the final correction |
| Structure comparison | Existing top-level section and table-row counts retained; 8 fabric cards, 15 technique cards and 6 journey cards confirmed |
| Whitespace/diff check | Passed |

The narrow-screen review found one concrete defect: the About facility metric `1,500` required 97 px in a 91 px field at 320 px. Its font size is now 36 px at the narrow breakpoint; the final measurement fits the field. Individual capability cards and journey cards stack in one column below 381 px. Shared capability card footers align within their rows.

Raw evidence: [responsive measurements](owner-update/responsive-results.json), [structure counts](owner-structure-check.json), [rendered-field map](OWNER_CONTENT_MAP.md), [field strings and character counts](owner-copy-fields.json), [image prompts and paths](owner-image-prompts.json).

## Rendered visual evidence

- [Eight fabric categories](owner-update/fabrics-desktop.jpg)
- [Contact address, telephone, fax and hours](owner-update/contact-desktop.jpg)
- [Six customer journey stages](owner-update/journey-desktop.jpg)
- [Four QC checkpoints and planning FAQ](owner-update/quality-desktop.jpg)

Final captures use a fresh browser tab in its normal desktop viewport. Emulated/cropped CDP screenshots timed out, so complete screenshot coverage at every tested width is not claimed. Responsive DOM measurements cover the five listed widths; temporary viewport overrides were reset.

## Verification boundaries

The supplied company statements were integrated as owner information; audit reports, licences, customer cases and real factory photographs were not independently verified. Big C's result is dated 2025, with no supplied 2026 result. Lotus’s audit period and licence identifiers/validity remain unspecified. Material certification references describe conditional sourcing, not factory certification. Ambiguous craftspeople tenure and blank equipment/workstation counts are not converted into numerical claims.

Enquiry delivery remains unconfigured and the production check confirms an explicit unsent response. No external enquiry was submitted. The earlier browser file-selection limitation and publication dependencies remain documented in [README](../README.md). No deployment or publication was performed.
