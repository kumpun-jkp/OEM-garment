# Core Manufacturing Lines image update

Completed 5 October 2026. Local production preview: `http://127.0.0.1:3001/#manufacturing`.

## Change

Replaced six reused reference photographs across fifteen production cards with fifteen distinct generated PNG images. The photographs show representative process or garment details, with consistent soft lighting, textile texture and navy, blue, ivory and restrained gold materials. These are AI-generated illustrations, not factory, equipment or order photographs. All fifteen card captions explicitly say `AI-generated reference`.

The shared `finishingCards` array in `src/content/site.ts` maps every title to a unique `/media/techniques/*-reference.png` file and a descriptive alt string. Home and About consume the same array through `Manufacturing`. Existing titles, descriptions, sequence, card geometry and icons are preserved. `CapabilityCard` now supplies image sizes matching the existing four-column, two-column and single-column breakpoints. Next.js continues to optimise and lazily load the images.

| Technique            | Image file                           |
| -------------------- | ------------------------------------ |
| Embroidery           | `embroidery-reference.png`           |
| Rubber screen print  | `rubber-screen-print-reference.png`  |
| Water-based print    | `water-based-print-reference.png`    |
| DTF printing         | `dtf-printing-reference.png`         |
| Sublimation          | `sublimation-reference.png`          |
| Garment washing      | `garment-washing-reference.png`      |
| Pleating             | `pleating-reference.png`             |
| Decorative stitching | `decorative-stitching-reference.png` |
| Decorative trims     | `decorative-trims-reference.png`     |
| Elastic application  | `elastic-application-reference.png`  |
| Smocking             | `smocking-reference.png`             |
| Bar tacking          | `bar-tacking-reference.png`          |
| Pockets & zips       | `pockets-zips-reference.png`         |
| Buttons & holes      | `buttons-holes-reference.png`        |
| Garment labels       | `garment-labels-reference.png`       |

## Verification

- All fifteen original PNGs were inspected individually. They depict the intended card subjects without text, watermarks or company branding.
- Asset inspection confirmed fifteen unique SHA-256 hashes, PNG format, 1,448 × 1,086 landscape dimensions, and byte-identical copies of the generated originals. Combined source size: 39,178,096 bytes. Website image delivery remains responsive and optimised; this is the original source size, not a measured page-transfer size.
- All fifteen shared card mappings, image paths, alt strings and AI captions passed the coverage check.
- Build, lint, TypeScript and all eleven existing tests passed.
- Site verification passed: eight routes, 57 internal links, 78 rendered assets, 404 handling, validation, origin checks and explicit unavailable-delivery behaviour.
- Product navigation verification passed: fifteen category destinations, selected filters, reference membership and Children empty state.
- Edge layout checks covered Home, About and Journey at 360, 768 and 1,440 px. Home and About each rendered fifteen cards and fifteen distinct image URLs; all captions stayed inside their image containers, all image alt strings were present and no document-level horizontal overflow was observed. Journey was also checked because it shares the image-size change through `CapabilityCard`.
- Visual inspection of the desktop production section confirmed the individual crops across all four rows. Mobile inspection confirmed the close-up embroidery crop, title and reference caption at 360 px.

The generated details are visual explanations rather than manufacturing instructions or validation of machine setup, material properties or factory capability. The DTF film/heat-press visual was informed by [Epson's DTF film guide](https://files.support.epson.com/docid/other/cmp0437-00_en.pdf); the sublimation polyester/transfer-paper visual was informed by [Epson's sublimation overview](https://epson.com/sublimation-printers-for-makers). No product performance claims were added.

## Deliverables

- Original assets: `public/media/techniques/`.
- Browsable contact sheet: `artifacts/TECHNIQUE_IMAGE_LIBRARY.html`.
- Exact prompts, source paths and destinations: `artifacts/TECHNIQUE_IMAGE_PROMPTS.json`.
- Dimensions, sizes, hashes and source-copy verification: `artifacts/TECHNIQUE_IMAGE_ASSET_CHECK.json`.

Earlier image files are retained. Existing unrelated work in the checkout is preserved.
