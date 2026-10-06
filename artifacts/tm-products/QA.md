# TM Apparel catalogue verification

Verified 5 October 2026 against the supplied `TM apparel` directory and the local preview at `http://127.0.0.1:3001`.

## Source reconciliation

- 185 source PNGs, 89 visually identified products: 66 multi-image products and 23 single-image products.
- Every source file maps exactly once to a product and category. No missing images, duplicate source assignments, duplicate product IDs or duplicate product names.
- All original SHA-256 hashes match the inventory. All published WebP hashes and dimensions match the manifest; no original files were modified or cropped.
- Existing category hierarchy preserved, with no new categories. Classification exceptions and visual grouping evidence are recorded in [PRODUCT_MAP.md](./PRODUCT_MAP.md).
- Web assets total 17.10 MiB; source PNGs total 149.69 MiB. Responsive image delivery and lazy loading use Next.js Image.

## Implementation and checks

- The existing catalogue, filter URLs, grid and project cards are reused. Product data now contains bilingual names/descriptions and ordered image arrays in `src/content/tm-products.json`.
- Production build and TypeScript checks passed. All 15 automated tests passed, including actual-directory coverage, source/output hashes, category membership, primary-image ordering and classification exceptions.
- ESLint passed with no errors or new warnings. Three existing unused-variable warnings remain in `src/lib/motion.ts`, outside this product change.
- `check:products`: all 30 taxonomy destinations across Thai and English passed, with exact product IDs/card counts, selected filters, galleries and empty states. All 185 image URLs return non-empty WebP responses.
- `check:locales`: all 16 page/locale combinations passed, including English script policy, locale links, preference redirect and invalid locale handling.
- `check:site`: all 16 routes, 92 internal links and 271 rendered assets passed, together with 404, validation, origin and explicit unconfigured-delivery checks. This ran only against the local preview.
- `git diff --check` passed.

## Rendered review

- Desktop 1440 × 1100: three columns; tablet 768 × 1024: two columns; mobile 390 × 844 and 320 × 780: one column. No horizontal page overflow at any reviewed width.
- Full source boards remain visible inside consistent square stages. Gallery browse rows measure 78 px for both single- and multi-image cards; cards align within each grid row.
- Thumbnails and previous/next controls select the correct image. Next wraps from image 6 to 1; previous wraps from 1 to 6. ArrowLeft, ArrowRight, Home and End behave correctly within the gallery. Ctrl+Home retains the page shortcut.
- At 320 px, all six denim-short images remain reachable and the selected thumbnail is kept visible within its own horizontal strip. Arrow and thumbnail targets measure 44 × 44 px.
- Thai names, descriptions, image alternatives and gallery labels render correctly. Language switching preserves audience/category/subcategory query parameters.
- The sampled single-image card has no unnecessary arrow/thumbnail buttons. Gallery changes retain one card per product.
- No browser errors or warnings were captured during the reviewed gallery interactions.

Evidence: [desktop](./catalogue-desktop.jpg), [tablet](./catalogue-tablet.jpg), [mobile](./catalogue-mobile.jpg), [narrow mobile](./catalogue-narrow.jpg), and [browser measurements](./browser-qa.json).

## Verification boundaries

Product identities are inferred from visible garments, matching prints, adjacent detail views and supplied labels; no manufacturer SKU register was provided. Distinct cuts/prints remain separate, except the geometric shorts whose source board explicitly groups two colourways. Descriptions do not establish composition, sizing, stock or commercial terms. Children and sports/team shirts have no explicitly identified source products and retain their existing empty states.

Horizontal touch swiping is implemented with vertical scrolling and pinch zoom preserved, and multi-touch gestures excluded from image switching. The connected desktop browser does not expose native touchscreen input; actual finger-swipe behaviour was not physically verified. Buttons, thumbnails and keyboard browsing were verified in the rendered page at mobile widths.
