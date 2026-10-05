# Unified icon implementation and verification

Verified 5 October 2026 against the local production build at `http://127.0.0.1:3001`.

## Result

The twelve contextual PNG pictograms now use one solid, monochrome silhouette treatment. Garments depict their category; Children uses a T-shirt and shorts. Conventional actions use filled Material UI Sharp glyphs through explicit module imports. The shared component normalises small inline sizes to 16 or 20 px and retains the existing larger section and category sizes.

The original black PNG ink is a source asset, not a fixed display colour. `PngIcon` uses Next.js `getImageProps` to obtain a sized image URL, then uses the PNG alpha channel as a CSS mask. `currentColor` supplies the visible foreground. Source PNGs are copied unchanged into `public/icons/unified`; earlier assets remain in `public/icons/context` as history.

| Surface or control                                             | Icon foreground     |
| -------------------------------------------------------------- | ------------------- |
| White, pale blue, and pale gold surfaces                       | CI navy             |
| Dark production sections, project form, footer, image captions | White               |
| Light panel nested in a dark section                           | CI navy             |
| Buttons, uploads, attachment removal                           | Control text colour |

Removed the permanent white icon tiles and the light blue bitmap backdrop. The light Contact form explicitly resets the icon theme to navy; the dark Project form uses white. Icons retain `aria-hidden="true"`; visible labels and accessible control names supply meaning.

## Automated verification

- Production build, TypeScript, and ESLint passed.
- All 11 existing tests passed.
- Site check passed: 8 routes, 57 internal links, 66 rendered assets, 404 handling, validation, origin checks and explicit unconfigured delivery.
- Product navigation check passed: 15 destinations, selected filters, reference membership and Children empty state.
- Twelve PNGs have transparent alpha, opaque interior pixels and 1,254 × 1,254 dimensions. Read-only metadata and alpha counts are recorded in `UNIFIED_ICON_ASSET_CHECK.json`. No source raster was recoloured or transformed.

## Rendered verification

Edge browser checks covered every route below at 360, 768 and 1,440 px (24 combinations). No document-level horizontal overflow was observed. Every shared icon had `data-icon-style="solid"` and decorative accessibility treatment. The Contact route was checked again at all three sizes after correcting its light-surface theme.

| Route                 | Shared icons in rendered DOM |
| --------------------- | ---------------------------: |
| `/`                   |                           66 |
| `/about`              |                           37 |
| `/our-work`           |                           41 |
| `/oem-products`       |                           37 |
| `/oem-journey`        |                           46 |
| `/technical-insights` |                           57 |
| `/start-your-project` |                           30 |
| `/contact`            |                           34 |

Visual inspection confirmed navy garment silhouettes in the showcase, the Children shirt-and-shorts symbol, and white production and project-form icons on dark surfaces. The same source files can be compared on both surfaces in `UNIFIED_ICON_LIBRARY.html`.

Computed foreground/background checks for visible icons on flat surfaces found no pair below 3:1; the lowest measured pair was 9.33:1 (CI navy on Display-P3 signal gold). Representative pairs were 15.66:1 for navy on white, 14.73:1 for navy on the pale blue showcase surface, and 20.41:1 for white on CI deep. Calculations use the relevant sRGB or Display-P3 relative luminance coefficients and the solid interior foreground, excluding antialiased boundaries.

The 3:1 comparison criterion comes from [W3C's non-text contrast guidance](https://www.w3.org/WAI/WCAG22/Understanding/non-text-contrast.html). The homepage photograph and gradient pseudo-element cannot be measured by the nearest flat-background calculation and were inspected visually instead. These checks do not establish complete WCAG conformance or cover every hover, focus, disabled, image, or high-contrast-mode state.

## Source traceability

Exact generation prompts and original source paths are in `UNIFIED_ICON_PROMPTS.json`. CI colours remain in `src/app/brand-tokens.css`; foreground and surface rules are in `src/app/globals.css`. Product taxonomy, filtering and layout remain shared with the existing showcase, mega menu and catalogue implementation.
