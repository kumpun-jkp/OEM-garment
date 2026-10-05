# Locale integration verification

Verified on 5 October 2026 in the local OEM-garment checkout.

## Implemented behaviour

- The navigation TH–EN control changes the shared locale through `/th` and `/en` routes. The route is the source of truth for the toggle, server copy, client components and document language.
- Switching retains the current page, query parameters and fragment. The selected locale is remembered in a one-year `site-locale` cookie. Unprefixed destinations use that preference, defaulting to Thai. Prefetches do not overwrite the preference.
- Thai copy uses natural Thai while retaining established terms such as OEM, QC, DTF and NDA. English copy uses English, with romanised names such as Bang Bon, Bobae and Si Thawi Ville.
- Shared navigation, page content, filters, search, calculator outputs, forms, validation messages, metadata, image descriptions and the locale-specific 404 are translated.
- Form option labels are translated while submitted identifiers remain stable. Visitor-entered content and uploaded filenames are preserved as supplied.

## Automated checks on the production build

| Check                    | Result                                                                                                       |
| ------------------------ | ------------------------------------------------------------------------------------------------------------ |
| `npm run build`          | Passed; both locales generated and dynamic routes compiled                                                   |
| `npm run lint`           | Passed                                                                                                       |
| `npm run typecheck`      | Passed                                                                                                       |
| `npm test`               | 13 tests passed                                                                                              |
| `npm run check:site`     | 16 routes, 114 internal navigation links, 79 rendered assets, anchors, 404 and enquiry API checks passed     |
| `npm run check:products` | 30 taxonomy destinations across both locales passed                                                          |
| `npm run check:locales`  | 16 pages passed document-language, English script, locale-link, preference redirect and invalid-route checks |
| `git diff --check`       | Passed; Git reported only line-ending conversion notices                                                     |

The English dictionary test checks for Thai, Han, Hiragana, Katakana, Cyrillic and Arabic scripts. The route scan checks rendered HTML, including attributes, for Thai script after excluding script and style payloads. Navigation checks inspect anchors; Next.js production image preconnect hints are not navigation destinations.

## Browser checks

- All eight pages in both locales were inspected at 390 px and 1280 px: 32 checks, with no document-level horizontal overflow and no Thai script in English body text. Records: [LOCALE_BROWSER_QA.json](LOCALE_BROWSER_QA.json).
- Product-page switching retained `audience=adults`, `category=shirts`, `subcategory=hawaiian-shirts` and `#main-content`; selected filter labels changed language.
- Mobile navigation links retained the locale; switching closed the menu.
- A remembered Thai preference redirected `/contact?inquiry=visit` to `/th/contact?inquiry=visit` and preserved the visit selection.
- Empty required-field validation displayed “This field is required.” in English and “กรุณากรอกข้อมูลในช่องนี้” in Thai.
- Thai labels “อื่น ๆ” and “ประเทศไทย” retained submitted values `Other` and `Thailand`.
- The English home page was reloaded against the final production server and visually verified. Preview: [locale-en-desktop.png](locale-en-desktop.png).

No browser enquiry was submitted. Existing development image-sizing hints were observed during browser checks; they do not indicate a locale failure. Automated script checks verify coverage and script policy; naturalness of Thai copy also depends on editorial review when new content is added.

Machine-readable route results: [LOCALE_QA.json](LOCALE_QA.json). The local production preview runs at `http://127.0.0.1:3000`.
