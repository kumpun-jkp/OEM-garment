# Thonburi Master

Eight-page garment OEM website built with Next.js App Router, React, TypeScript, shared CSS tokens, and locally served Athiti fonts. The initial repository contained only `.gitattributes`; the fresh implementation follows the user's subsequent instruction to build from scratch.

## Run

Requires Node.js 22.14 or later.

```powershell
npm.cmd ci
npm.cmd run dev
```

Preview: http://127.0.0.1:3000. Production: `npm.cmd run build`, then `npm.cmd start`.

## Routes

| Page                     | Route                 |
| ------------------------ | --------------------- |
| Home                     | `/`                   |
| About Us                 | `/about`              |
| Our Work                 | `/our-work`           |
| Garment Style References | `/oem-products`       |
| OEM Journey              | `/oem-journey`        |
| Technical Insights       | `/technical-insights` |
| Start Your Project       | `/start-your-project` |
| Contact Us               | `/contact`            |

Each page is available under `/th` and `/en` (for example, `/th/about` and `/en/about`). Unprefixed routes redirect to the remembered locale, defaulting to Thai. The navigation toggle changes the entire interface and preserves the current path, query parameters and anchor. Internal navigation retains the selected locale.

Thai copy uses natural Thai with established English technical terms such as OEM, QC, CAD, BOM, GSM and fabric standards. English copy uses English and romanised place names, including Bang Bon, Bobae, Si Thawi Ville and Ekkachai Road. Shared dictionaries live in `src/content/translations.ts`; `src/lib/translations.ts` reads the validated route locale for server components, and `LocaleProvider` supplies it to client controls. Translate display labels while preserving category IDs, query keys and form values. Add translation pairs for new interface copy and run `npm.cmd run check:locales` to check the policy across both locales.

Reviewed brand copy lives in `src/content/copy-refinements.ts`, keyed to the original source strings. It applies consistently to both locales and repeated shared components. See [the bilingual copy review](artifacts/COPY_REVIEW.md) for Original / Recommended Version / Reasoning and the retained-copy inventory. Regenerate the report with `node --experimental-strip-types scripts/generate-copy-review.mjs`; the captured originals in `artifacts/COPY_REVIEW.json` are preserved. Business facts remain in `src/content/site.ts`. The Insights library displays its single available guide once rather than repeating it nine times.

## Product discovery and navigation

`src/content/products.ts` is the shared product taxonomy, transcribed from the supplied adult/children hierarchy. The homepage showcases six adult garment groups and a separate Children entry. OUR WORK opens a desktop mega dropdown and a mobile directory with progressive disclosures. Every category and product-type link opens `/oem-products` with the corresponding `audience`, `category` and `subcategory` query parameters. Catalogue filters are links rendered from the URL, preserving selections across refresh, direct entry and browser history.

The supplied hierarchy defines no children’s subcategories. Children therefore remains a top-level collection with an explicit unpublished-reference state. Ten labelled style illustrations describe the adult product types; three existing photo references are tagged at the Shirts level only. The illustrations are not factory project photos. Fabric and finish filters have been removed because reference-specific material and finish metadata were not supplied.

The showcase, menu and filters use the existing `brand-tokens.css` CI palette and Athiti typography. See [product navigation verification](artifacts/PRODUCT_NAVIGATION_QA.md).

Garment categories and production concepts use twelve generated transparent solid PNG pictograms in `public/icons/unified`, shared through `src/components/png-icon.tsx`. Their black source silhouettes supply alpha masks; CSS applies navy on light surfaces, white on dark surfaces and the control's text colour inside buttons. The source PNGs are preserved unchanged. Children is represented by a small T-shirt and shorts, and each adult category depicts its garments. Filled MUI Sharp supplies conventional actions through explicit imports in `src/components/app-icon.tsx`. Inline glyph sizes are standardised at 16 and 20 px; larger category and section roles retain their assigned sizes. Additional labelled cues identify project entry points, manufacturing, fabric selection, quality checking, workflow steps and form sections. Icons are decorative; visible labels and parent control names supply meaning. See the [unified light/dark icon library](artifacts/UNIFIED_ICON_LIBRARY.html), [generation prompts](artifacts/UNIFIED_ICON_PROMPTS.json) and [verification](artifacts/UNIFIED_ICON_QA.md). The earlier `public/icons/context` assets are retained as superseded source history.

## Design evidence

Source: [Thonburi Master Figma Dev Mode](https://www.figma.com/design/IPUKY5wOWwPHlWlabI0PH6/Thonburi-Master?m=dev), approved page designs, inspected 2 October 2026. This session did not expose the Figma design-context MCP tool. Browser Dev Mode properties and fresh PDF exports of all eight frames provided dimensions, text, colours, and original embedded photographs. Logos and icons are original Figma SVG exports. PDF composite UI fragments are not used to implement interface elements.

The original page geometry uses 1,280 px frames, 1,184 px content width, 48 px side margins and an 80 px header. On 4 October 2026, the user's supplied CSS export of the updated [CI concept board](https://www.figma.com/design/IPUKY5wOWwPHlWlabI0PH6/Thonburi-Master?node-id=98-9683) superseded the original colour and typography foundations. The current site uses deep navy, blue, signal gold and white, Athiti editorial typography, system-font technical labels, 2 px action corners and square form controls. The header switches to its menu at 1,240 px; page layouts use content-based breakpoints at 1,170, 1,000 and 700 px. Mobile compositions adapt the supplied desktop reference.

The CI palette, sRGB fallbacks, Display-P3 colours, font roles and spacing tokens live in `src/app/brand-tokens.css`. See the [CI implementation and QA report](artifacts/CI_IMPLEMENTATION.md) for source mappings, deliberate adaptations and rendered evidence.

Core Manufacturing Lines uses fifteen individual AI-generated technique images in `public/media/techniques`, mapped in `finishingCards` in `src/content/site.ts` and shared by Home and About. Each card has a unique image, descriptive alt text and an explicit AI-generated reference caption. The original PNGs are retained unchanged; Next.js serves responsive optimised versions. See the [technique image library](artifacts/TECHNIQUE_IMAGE_LIBRARY.html), [exact prompts and source paths](artifacts/TECHNIQUE_IMAGE_PROMPTS.json) and [verification](artifacts/TECHNIQUE_IMAGE_QA.md).

`src/app/globals.css` contains the tokens and responsive rules. `src/content/site.ts` contains shared copy and asset references. Static pages are server components; navigation, filters, the calculator, and forms use small client components. Photographs use Next.js Image with fixed aspect ratios and appropriate sizes. Fonts are served locally; no runtime Google Fonts request is needed. See the [official Next.js font documentation](https://nextjs.org/docs/app/getting-started/fonts).

## Form delivery

Copy `.env.example` to `.env.local`, then configure `ENQUIRY_WEBHOOK_URL` with an HTTPS service that accepts multipart fields and files and returns 2xx after durable receipt. Optional `ENQUIRY_WEBHOOK_TOKEN` is sent server-side as a bearer token. The recipient must be your approved enquiry processor. No enquiry data is sent to an external service unless this endpoint is configured.

Set `SITE_URL` to the canonical public origin, such as `https://your-domain.example`, when deploying behind a reverse proxy. This keeps the form's origin check aligned with the visitor-facing domain. Leave it blank for the local preview.

The API validates required fields, email, phone, classification, consent, and file limits; rejects cross-origin submissions and honeypot entries; and returns explicit failure if delivery is unavailable or unconfirmed. File support: PDF, AI, DXF, ZIP, XLSX, PNG; 50 MB each, up to five files and 100 MB combined. Configure hosting request-size limits, rate limiting, attachment scanning, and retention with the receiving service. Some serverless platforms have lower upload limits; use an approved direct-upload storage integration for large files on those hosts.

## Owner content update

Updated 4 October 2026 from the owner tables A–H and the user's later contact and brand instructions. Thonburi Master is the main website identity; TM Apparel is part of it. Shared business content is maintained in `src/content/site.ts`.

- Home shows founding in 1998 / พ.ศ. 2541, approximately 20 million cumulative pieces, average output of 50,000 pieces per month and 60 employees. About shows approximately 1,500 sqm. Ambiguous craftspeople tenure and unspecified workstation counts are not published as numbers.
- Fabrics has eight individual cards with AI-generated fabric illustrations. Home and About show fifteen individual sewing and finishing techniques. The existing visual system and page sections are retained; extra card rows and narrow-screen stacking follow the user's component-change instructions.
- The customer journey uses six steps, combining materials, sample making and approval in Step 3. Sample fees, bulk deposits, estimated timelines and QC checkpoints follow the owner information.
- The supplied Bang Bon address, telephone `02-893-5951–3`, fax `02-893-5954` and Monday–Saturday 08:00–18:00 hours are used consistently. Google Maps searches the exact supplied Thai address. Unconfirmed email, LINE and WhatsApp contacts were replaced.
- Big C's Grade A / 94.61% / Pass result is explicitly dated 2025. No 2026 result is implied. Lotus’s Blue Tier is reported with its supplied assessor and standard; its current audit period remains unspecified. Audits are text-only, without audit logos or PDFs. GOTS / GRS / RCS references describe conditional fabric sourcing, not factory certification.
- Unsupported Figma metrics, fictional executives and batch specifications were removed or replaced with source-based explanations. Agency project visuals were replaced with material and garment references.

The exact rendered-field map, character counts, evidence boundaries and authorised component changes are in [artifacts/OWNER_CONTENT_MAP.md](artifacts/OWNER_CONTENT_MAP.md). Image prompts and paths are in [artifacts/owner-image-prompts.json](artifacts/owner-image-prompts.json).

## Remaining publication dependencies

- Owner statements have not been independently verified against audit reports or licences. Current audit periods, licence identifiers/validity, the formal registered company name and customer-logo publication rights remain unspecified.
- Existing factory, team and gallery assets are illustrative references rather than verified photographs or customer cases. The garment directory combines labelled style illustrations with existing shirt photo references; owner-approved product photography and children’s references remain absent.
- Nine insight cards contain planning excerpts. Complete bulletins, XLSX/PDF downloads and legal policies remain absent. Guide and tool actions route to requests. The calculator uses measured sample lengths and does not predict performance from fabric type or claim AATCC certification.
- Enquiry delivery still requires an approved processor and production configuration. Uploads show only visitor-selected files; NDA selection requests an agreement and does not execute one. Browser file-selection coverage remains limited as recorded in QA.

Search indexing is disabled in layout metadata until these launch dependencies are resolved. Remove that restriction once the approved business copy, complete policies/resources, working delivery service, and production domain are ready. The frontend implementation does not establish legal compliance, certification validity, or operational guarantees.

## Smooth as silk interactions

The homepage has six anchored chapters with a sticky, horizontally scrollable chapter navigator. Roomy desktop viewports frame the hero and selected story sections around the screen; dense sections and mobile layouts retain natural content height. `src/app/silk-motion.css` supplies subtle CI gradients and button, navigation, card, image and disclosure responses. `src/lib/motion.ts`, mounted by `MotionSurface`, provides one-time staggered reveals, handles newly rendered cards and immediately settles focused content. Content is visible before hydration and when animation APIs are unavailable. Reduced-motion preferences disable movement and smooth scrolling, including when the preference changes during a reveal.

About's fabric and technique rows support native scrolling, desktop dragging, previous/next controls and left/right keyboard navigation. Only these horizontal rows use proximity snapping; vertical page scrolling stays native. See [motion and responsive verification](artifacts/silk-motion/QA.md).

## Verification

```powershell
npm.cmd run lint
npm.cmd run typecheck
npm.cmd run build
npm.cmd test
```

With the site running locally and delivery **unconfigured**, use `npm.cmd run check:site` to check all routes, rendered assets, internal destinations and anchors, one H1 per page, 404s, API validation, cross-origin rejection, and honest unavailable-delivery behaviour. Do not run that local submission check against a live configured enquiry processor.

With the site running, use `npm.cmd run check:products` to verify all rendered taxonomy destinations, selected filters, reference membership and the Children empty state. Set `SITE_URL` when testing another local port. This product check is read-only.

Use `npm.cmd run check:locales` to verify all sixteen locale routes, document language, English script policy, internal locale links, preference redirects and invalid route handling. See [locale integration QA](artifacts/LOCALE_QA.md).

Original exported design evidence lives in ignored `.design/`; `scripts/inspect-design.py` extracts reference geometry and original photographs with PyMuPDF. These local tooling dependencies are not required to run the website.

The current content-update review is in [artifacts/OWNER_UPDATE_QA.md](artifacts/OWNER_UPDATE_QA.md); the original 2 October implementation review remains in [artifacts/QA.md](artifacts/QA.md). Browser file selection could not be automated in the original review because Edge's extension file-access permission was disabled; no browser security settings were changed. The supported attachment types, counts and size limits are covered by automated tests.
