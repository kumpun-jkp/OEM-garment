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

The supplied hierarchy defines no children’s subcategories. Children remains a top-level collection with an explicit unpublished-reference state. The directory now contains 89 visually identified TM Apparel products, mapped from all 185 owner-supplied PNGs in `TM apparel`. Each source image belongs to exactly one product and one category. No new categories were needed. Skorts and cargo shorts use Shorts; cargo and elephant skirts use Skirts; the general cropped shirt uses the Shirts parent. No supplied products are explicitly identified as children’s wear or sports/team shirts, so these branches retain empty states.

`src/content/tm-products.json` supplies bilingual names, observed garment details and ordered image arrays through the existing `GarmentReference` model. The first image shows the complete garment or set. `ProductGallery` adds thumbnails, previous/next controls, arrow/Home/End keyboard navigation and horizontal touch swiping within the existing cards. Single-image cards use the same square stage and control-row dimensions. Images retain their full source boards without cropping; responsive Next.js Image delivery and lazy loading are retained. WebP assets total approximately 17.1 MB compared with 149.7 MB of source PNGs.

The product identities are inferred from matching construction and prints; the supplied files contain no SKU register. Distinct cuts/prints remain separate. The blue/purple geometric shorts are grouped because their primary source board shows both colourways. Source labels do not verify fabric composition, dimensions, stock or commercial terms. The [product-by-product source map](artifacts/tm-products/PRODUCT_MAP.md) and [hashed manifest](artifacts/tm-products/product-manifest.json) record the decisions. `scripts/import-tm-products.mjs` regenerates the catalogue and web assets from the reviewed map and inventory, and refuses missing, repeated or changed source images. Original PNGs remain unchanged. Fabric and finish filters remain absent because product-specific material and finish metadata were not supplied.

The showcase, menu and filters use the existing `brand-tokens.css` CI palette and Athiti typography. See [product navigation verification](artifacts/PRODUCT_NAVIGATION_QA.md).

Garment categories and production concepts use twelve generated transparent solid PNG pictograms in `public/icons/unified`, shared through `src/components/png-icon.tsx`. Their black source silhouettes supply alpha masks; CSS applies navy on light surfaces, white on dark surfaces and the control's text colour inside buttons. The source PNGs are preserved unchanged. Children is represented by a small T-shirt and shorts, and each adult category depicts its garments. Filled MUI Sharp supplies conventional actions through explicit imports in `src/components/app-icon.tsx`. Inline glyph sizes are standardised at 16 and 20 px; larger category and section roles retain their assigned sizes. Additional labelled cues identify project entry points, manufacturing, fabric selection, quality checking, workflow steps and form sections. Icons are decorative; visible labels and parent control names supply meaning. See the [unified light/dark icon library](artifacts/UNIFIED_ICON_LIBRARY.html), [generation prompts](artifacts/UNIFIED_ICON_PROMPTS.json) and [verification](artifacts/UNIFIED_ICON_QA.md). The earlier `public/icons/context` assets are retained as superseded source history.

## Design evidence

Source: [Thonburi Master Figma Dev Mode](https://www.figma.com/design/IPUKY5wOWwPHlWlabI0PH6/Thonburi-Master?m=dev), approved page designs, inspected 2 October 2026. This session did not expose the Figma design-context MCP tool. Browser Dev Mode properties and fresh PDF exports of all eight frames provided dimensions, text, colours, and original embedded photographs. Logos and icons are original Figma SVG exports. PDF composite UI fragments are not used to implement interface elements.

The original page geometry uses 1,280 px frames, 1,184 px content width, 48 px side margins and an 80 px header. On 4 October 2026, the user's supplied CSS export of the updated [CI concept board](https://www.figma.com/design/IPUKY5wOWwPHlWlabI0PH6/Thonburi-Master?node-id=98-9683) superseded the original colour and typography foundations. The current site uses deep navy, blue, signal gold and white, Athiti editorial typography, system-font technical labels, 2 px action corners and square form controls. The header switches to its menu at 1,240 px; page layouts use content-based breakpoints at 1,170, 1,000 and 700 px. Mobile compositions adapt the supplied desktop reference.

The CI palette, sRGB fallbacks, Display-P3 colours, font roles and spacing tokens live in `src/app/brand-tokens.css`. See the [CI implementation and QA report](artifacts/CI_IMPLEMENTATION.md) for source mappings, deliberate adaptations and rendered evidence.

Core Manufacturing Lines uses fifteen individual AI-generated technique images in `public/media/techniques`, mapped in `finishingCards` in `src/content/site.ts` and shared by Home and About. Each card has a unique image, descriptive alt text and an explicit AI-generated reference caption. The original PNGs are retained unchanged; Next.js serves responsive optimised versions. See the [technique image library](artifacts/TECHNIQUE_IMAGE_LIBRARY.html), [exact prompts and source paths](artifacts/TECHNIQUE_IMAGE_PROMPTS.json) and [verification](artifacts/TECHNIQUE_IMAGE_QA.md).

`src/app/globals.css` contains the tokens and responsive rules. `src/content/site.ts` contains shared copy and asset references. Static pages are server components; navigation, filters, the calculator, and forms use small client components. Photographs use Next.js Image with fixed aspect ratios and appropriate sizes. Fonts are served locally; no runtime Google Fonts request is needed. See the [official Next.js font documentation](https://nextjs.org/docs/app/getting-started/fonts).

## Form delivery

Both Contact and Start Your Project are available for mock-up testing. `ENQUIRY_MODE=mock` is the default, including when this variable is unset. The forms retain their fields, selections, uploads and validation. Valid mock submissions return `mock: true, delivered: false`, keep the entered values for review and clearly state that no enquiry was sent. The server does not call the receiver in mock mode, even if a webhook is configured. Use test details and files.

See [restored mock-form verification](artifacts/mock-forms-2026-10-06/QA.md) for the current checks and browser verification boundary.

For real intake, copy `.env.example` to `.env.local`, set `ENQUIRY_MODE=live`, then configure `ENQUIRY_WEBHOOK_URL` with an HTTPS service that accepts multipart fields and files and returns 2xx after durable receipt. Optional `ENQUIRY_WEBHOOK_TOKEN` is sent server-side as a bearer token. The recipient must be your approved enquiry processor. Set `PRIVACY_POLICY_URL` to the approved, directly readable HTTPS policy. Live intake stays unavailable until both HTTPS destinations are configured; those pages provide the published telephone contact while live intake is unavailable. URL validation establishes syntax and protocol, not processor receipt, policy approval or destination availability.

Forms declare a native multipart POST action and a hidden form kind. Without JavaScript, the API response opens as a new page; contact values are not submitted through a GET query. Mock consent acknowledges the preview, and a policy link appears only when a policy is configured. Live consent links and the footer open the configured privacy policy directly. Product-card enquiry links preserve `productId`; the project page shows the selected reference, and the API validates the ID against the catalogue and adds its canonical product title to the delivered fields. Product IDs are reference identifiers, not manufacturer SKUs.

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
- Existing factory and team assets are illustrative references rather than verified photographs or customer cases. The garment directory uses the supplied TM Apparel product images; manufacturer SKUs, fabric composition, stock, sizes and children’s references remain unspecified.
- The production-planning hub contains nine distinct bilingual guides: two complete articles and seven clearly labelled previews. XLSX/PDF downloads and legal policies remain absent. The calculator uses measured sample lengths and does not predict performance from fabric type or claim AATCC certification.
- Enquiry delivery still requires an approved processor and production configuration. Uploads show only visitor-selected files; NDA selection requests an agreement and does not execute one. Browser file-selection coverage remains limited as recorded in QA.

Search indexing is disabled until these launch dependencies are resolved. Set `SITE_INDEXING_ENABLED=true` only after release approval, with an HTTPS `SITE_URL`. A public origin enables route-specific canonical URLs, Thai/English alternates and Open Graph metadata. Robots and sitemap endpoints are always available; the preview robots file disallows crawling and its sitemap is empty. Set these environment values during both the production build and server start, then rebuild: statically rendered metadata and footer links use build-time configuration. The frontend implementation does not establish legal compliance, certification validity, or operational guarantees.

The 6 October follow-up fixes and verification boundaries are recorded in [production-fixes QA](artifacts/production-fixes-2026-10-06/QA.md). The original audit remains a dated snapshot; deployment is still pending the real receiver, approved policy, public domain and Google Chrome browser sign-off.

## Smooth as silk interactions

The homepage has six anchored chapters with a sticky, horizontally scrollable chapter navigator. Roomy desktop viewports frame the hero and selected story sections around the screen; dense sections and mobile layouts retain natural content height. `src/app/silk-motion.css` supplies subtle CI gradients and button, navigation, card, image and disclosure responses. `src/lib/motion.ts`, mounted by `MotionSurface`, provides one-time staggered reveals, handles newly rendered cards and immediately settles focused content. Content is visible before hydration and when animation APIs are unavailable. Whole-section hiding and nested section/card movement have been removed; individual reveal translation does not override card hover transforms.

At the owner's explicit request, **smooth motion remains active regardless of the Windows Animation effects setting**, and the motion button has been removed from both desktop and mobile navigation. The former saved preference and pre-paint setting script have also been removed; an old stored Reduced choice no longer disables the effects. There is no visitor motion toggle or automatic OS reduced-motion override in this version.

Control feedback takes 180–260 ms, reveals 780 ms with at most 220 ms stagger, and decoded product images fade for 240 ms. Scrolling now adds opposing hero image/text depth, clipped photo parallax, growing section accents and a sticky-header shadow. Hero image travel is bounded by its overscan and capped at 72 px on desktop or 36 px on mobile. Photo movement is capped at 36 px or 18 px respectively. One passive scroll listener drives a time-based easing loop that stops when settled; geometry reads are batched and cached between resize/content changes. Only decorative layers trail scrolling: the document, keyboard, anchors and touch gestures remain native. Background tabs stop their decorative motion. With the extra control removed, the header's 1240 px navigation breakpoint is restored. See [stronger scroll motion verification](artifacts/scroll-motion-2026-10-06/QA.md); the [earlier 6 October motion report](artifacts/silk-motion-2026-10-06/QA.md) records the superseded button and setting policy.

About's fabric and technique rows support native scrolling, desktop dragging, previous/next controls and left/right keyboard navigation. Only these horizontal rows use proximity snapping; vertical page scrolling stays native. The [5 October motion verification](artifacts/silk-motion/QA.md) remains a historical snapshot; its automatic OS-preference behaviour has been superseded by the explicit owner instruction above.

## Verification

The production-planning knowledge hub lives at `/{locale}/technical-insights#guidelines`. Nine distinct topics link to `/{locale}/guides/{slug}` in Thai and English. The production brief and sample approval articles are complete; the other seven pages provide meaningful short previews, checklists and related links for later editorial expansion. Cards open article pages rather than disclosures. Articles retain the shared header, brand surfaces and silk motion, with a reading column, table of contents, contextual product/service links, related guides and a contact action that prefills the guide title.

`src/content/guides.ts` supplies small bilingual card descriptors, search/filter topics and related-guide references. `src/content/guide-articles.ts` supplies article bodies to the server-rendered guide route; long-form content is not imported by the client-side hub. Expand a preview's body and set its descriptor's `complete` flag when the full article is ready. `src/lib/guide-seo.ts` supplies unique metadata, per-guide canonicals and reciprocal language alternates when a public origin is configured. Breadcrumb structured data applies to all guides; Article markup applies only to the two complete articles. The sitemap includes all eighteen guide URLs when the existing release-indexing gate is enabled.

See [knowledge-hub implementation and verification](artifacts/guideline-hub-2026-10-06/QA.md) for the topic map, automated checks, responsive evidence and remaining Chrome/release-configuration boundaries.

```powershell
npm.cmd run lint
npm.cmd run typecheck
npm.cmd run build
npm.cmd test
```

With the site running locally in **mock mode** or with live delivery **unconfigured**, use `npm.cmd run check:site` to check all routes, rendered assets, internal destinations and anchors, one H1 per page, 404s, API validation, cross-origin rejection, and honest mock/unavailable-delivery behaviour. Do not run that local submission check against a live configured enquiry processor.

With the site running, use `npm.cmd run check:products` to verify all rendered taxonomy destinations, selected filters, exact product membership, galleries, empty states and all 185 served product image paths. Set `SITE_URL` when testing another local port. This product check is read-only. The product tests also reconcile the actual source directory against the inventory, catalogue and manifest, verify original/output hashes and dimensions, and check classification exceptions. See [TM product verification](artifacts/tm-products/QA.md).

Use `npm.cmd run check:locales` to verify all thirty-four locale pages, document language, English script policy, internal locale links, preference redirects and invalid route handling. See [locale integration QA](artifacts/LOCALE_QA.md).

Original exported design evidence lives in ignored `.design/`; `scripts/inspect-design.py` extracts reference geometry and original photographs with PyMuPDF. These local tooling dependencies are not required to run the website.

The current content-update review is in [artifacts/OWNER_UPDATE_QA.md](artifacts/OWNER_UPDATE_QA.md); the original 2 October implementation review remains in [artifacts/QA.md](artifacts/QA.md). Browser file selection could not be automated in the original review because Edge's extension file-access permission was disabled; no browser security settings were changed. The supported attachment types, counts and size limits are covered by automated tests.
