# Product discovery and navigation — 5 October 2026

The homepage showcase, OUR WORK directory and Garment Style References filters share `src/content/products.ts`. This update preserves the existing CI foundations in `src/app/brand-tokens.css`: navy, blue, gold and white, Athiti editorial typography and system-font technical labels.

## Supplied hierarchy

- Adults → Trousers → Cargo & outdoor trousers, Long trousers, Shorts.
- Adults → Shirts → Hawaiian shirts, Jackets, Sports & team shirts.
- Adults → Elephant shirts & trousers, Sleepwear, Dresses, Skirts.
- Children → no supplied subcategories.

URLs use `audience`, `category` and `subcategory`. A parent selection includes its descendants. A product-type selection shows only references assigned to that type. Invalid combinations recover to the nearest valid selected parent. Filters are rendered from the URL on the server, so direct entry, refresh and browser Back restore the selection without client-state synchronisation.

## Content boundary

The directory contains ten labelled illustrative style overviews derived from the supplied hierarchy and three existing shirt photo references. These images are references, not verified factory projects or product inventory. The three photos are tagged at Shirts level, so they are excluded from narrower product-type selections. Children remains navigable and shows an explicit unpublished-reference state with a project-enquiry action. Fabric and finish metadata remain unspecified; the old placeholder filters and repeated gallery tiles were replaced.

## Verification

- Production build, lint, TypeScript checking and all 11 unit tests passed.
- `check:products` verified all 15 rendered taxonomy destinations, selected filters, card membership and Children’s empty state.
- `check:site` verified 8 routes, 57 internal links and 43 rendered assets, plus existing 404, enquiry validation, origin and unconfigured-delivery checks.
- Browser: homepage Shirts selection opened `/oem-products?audience=adults&category=shirts`, showing six matching references. Refining to Hawaiian shirts showed one type-specific overview. Browser Back restored Shirts and six references.
- Browser: the mega dropdown preserved both adult branches and the four direct adult categories, with Children separate. A Hawaiian shirts menu selection applied all three hierarchy levels and closed the dropdown.
- Mobile at 390 × 844: OUR WORK → Adults → Trousers → Shorts opened the selected type and closed navigation. The Children state showed no unrelated adult references.
- Responsive measurements at widths 360, 768 and 1280 px found no horizontal page overflow on the homepage showcase and filtered Shirts page. Desktop and mobile screenshots were visually inspected in the browser.
- Keyboard: ArrowDown opened the desktop directory and focused its first link. Escape closed it and restored focus to OUR WORK. Clicking outside the header dismissed it.
- Reduced-motion styling remains governed by the existing site-wide rule. Temporary browser viewport overrides were reset after QA.

Preview: `http://127.0.0.1:3001/`. The previous port-3000 preview was serving an older build, so verification used a separate production preview on port 3001.

Run `npm.cmd run check:products` against a running local preview. For another port, set `$env:SITE_URL = 'http://127.0.0.1:3001'` first. This check makes only read requests.
