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

| Page               | Route                 |
| ------------------ | --------------------- |
| Home               | `/`                   |
| About Us           | `/about`              |
| Our Work           | `/our-work`           |
| OEM Products       | `/oem-products`       |
| OEM Journey        | `/oem-journey`        |
| Technical Insights | `/technical-insights` |
| Start Your Project | `/start-your-project` |
| Contact Us         | `/contact`            |

The navigation, CTA destinations, enquiry query parameters, and footer anchors connect these routes. The header language control switches navigation labels; complete bilingual page translations are not supplied by the source design.

## Design evidence

Source: [Thonburi Master Figma Dev Mode](https://www.figma.com/design/IPUKY5wOWwPHlWlabI0PH6/Thonburi-Master?m=dev), approved page designs, inspected 2 October 2026. This session did not expose the Figma design-context MCP tool. Browser Dev Mode properties and fresh PDF exports of all eight frames provided dimensions, text, colours, and original embedded photographs. Logos and icons are original Figma SVG exports. PDF composite UI fragments are not used to implement interface elements.

Desktop foundations: 1,280 px frames, 1,184 px content width, 48 px side margins, 80 px header, Athiti, square controls, bronze accents, warm paper surfaces, dark industrial panels. The header switches to its menu at 1,240 px to preserve room for all navigation controls; page layouts use content-based breakpoints at 1,170, 1,000, and 700 px. Mobile compositions are inferred because the approved frames are desktop designs.

`src/app/globals.css` contains the tokens and responsive rules. `src/content/site.ts` contains shared copy and asset references. Static pages are server components; navigation, filters, the calculator, and forms use small client components. Photographs use Next.js Image with fixed aspect ratios and appropriate sizes. Fonts are served locally; no runtime Google Fonts request is needed. See the [official Next.js font documentation](https://nextjs.org/docs/app/getting-started/fonts).

## Form delivery

Copy `.env.example` to `.env.local`, then configure `ENQUIRY_WEBHOOK_URL` with an HTTPS service that accepts multipart fields and files and returns 2xx after durable receipt. Optional `ENQUIRY_WEBHOOK_TOKEN` is sent server-side as a bearer token. The recipient must be your approved enquiry processor. No enquiry data is sent to an external service unless this endpoint is configured.

Set `SITE_URL` to the canonical public origin, such as `https://your-domain.example`, when deploying behind a reverse proxy. This keeps the form's origin check aligned with the visitor-facing domain. Leave it blank for the local preview.

The API validates required fields, email, phone, classification, consent, and file limits; rejects cross-origin submissions and honeypot entries; and returns explicit failure if delivery is unavailable or unconfirmed. File support: PDF, AI, DXF, ZIP, XLSX, PNG; 50 MB each, up to five files and 100 MB combined. Configure hosting request-size limits, rate limiting, attachment scanning, and retention with the receiving service. Some serverless platforms have lower upload limits; use an approved direct-upload storage integration for large files on those hosts.

## Source content that needs approval before publication

These are unresolved facts in the supplied Figma file, not independently verified company claims:

- The file uses Thonburi Master, TM Apparel, and Atelier OEM names; 2024 Thai / 2025 English copyright; conflicting email/phone contacts, operating hours, workforce counts (328 / 350), and capacities (50,000 / 120,000).
- Certification IDs, validity dates, active statuses, ESG figures, personnel, client logos, exports, encryption assertions, and production statistics need business verification. Some certification validity dates shown in Figma precede this implementation date.
- Home includes the Marrow / Arcadia agency projects inside the approved frame. They are preserved pending editorial approval.
- The product catalogue repeats one case title and specification across eighteen tiles. Actual category-specific cases and historical logs are absent. Filters therefore return empty states for unpublished categories. Loading the archive reveals the additional sample tiles present in the product frame; it does not fetch historical evidence.
- Nine insight cards repeat one article excerpt. Full bulletins, XLSX/PDF tool downloads, complete FAQ answers, and legal policies are absent. Guide and tool actions route to a prefilled request; FAQ answers avoid inventing commercial terms. The calculator implements dimensional-change mathematics from measured sample lengths; it does not claim AATCC certification or predict results from textile type.
- The sixth machine card has only “Machine 6” in the design. No machinery description is fabricated.
- The source contact map is a black locator panel with coordinates. The implementation preserves that panel and links the supplied coordinates to Google Maps; the physical address and coordinates still need confirmation.
- The source form's staged sample file and unverified SHA/encryption status were omitted. Uploads list only files selected by the visitor. NDA selection requests an agreement; it does not execute one.
- The fifth process stage is labelled 07 in Figma. It is corrected to 05 to meet the explicit Stage 01–08 requirement. Overflowing cards/content and the stray “Our Work” text below the Home footer are treated as source-frame artifacts.
- Light-surface muted text is slightly darkened for legibility; keyboard focus, touch target sizes, mobile stacking, and content-driven section heights extend the desktop source appropriately.

Search indexing is disabled in layout metadata until these launch dependencies are resolved. Remove that restriction once the approved business copy, complete policies/resources, working delivery service, and production domain are ready. The frontend implementation does not establish legal compliance, certification validity, or operational guarantees.

## Verification

```powershell
npm.cmd run lint
npm.cmd run typecheck
npm.cmd run build
npm.cmd test
```

With the site running locally and delivery **unconfigured**, use `npm.cmd run check:site` to check all routes, rendered assets, internal destinations and anchors, one H1 per page, 404s, API validation, cross-origin rejection, and honest unavailable-delivery behaviour. Do not run that local submission check against a live configured enquiry processor.

Original exported design evidence lives in ignored `.design/`; `scripts/inspect-design.py` extracts reference geometry and original photographs with PyMuPDF. These local tooling dependencies are not required to run the website.

The rendered-page review and remaining verification limits are recorded in [artifacts/QA.md](artifacts/QA.md). Browser file selection could not be automated because Edge's extension file-access permission is disabled; no browser security settings were changed. The supported attachment types, counts and size limits are covered by automated tests.
