# Production planning knowledge hub — 6 October 2026

## Outcome and scope

The repeated mock cards have been replaced with nine distinct Thai/English guideline concepts and eighteen dedicated article pages. Cards open their article page as the primary action; they no longer expand an accordion. The production brief and sample approval guides are complete articles. The remaining seven pages are explicitly labelled previews, with short original content, preparation checklists and useful onward links.

The existing Athiti typography, navy/blue/gold identity, subtle gradient and translucent card surfaces, shared navigation and silk motion remain in use. Article pages add a readable content column, contextual advice, table of contents, related guides and a contact CTA. This implementation is available in the local production preview at `http://127.0.0.1:3003`; it has not been deployed.

## Topic and route map

All routes below have both `/th` and `/en` prefixes.

| No. | Topic | Slug | Content status |
| --- | --- | --- | --- |
| 01 | Preparing a garment production brief | `preparing-garment-production-brief` | Complete: six sections, practical brief example, checklist |
| 02 | Choosing fabrics and materials | `how-to-choose-fabric` | Preview |
| 03 | Preparing for sample development | `preparing-sample-development` | Preview |
| 04 | Approving a garment sample | `sample-approval-process` | Complete: six sections, review/revision/approval workflow, checklist |
| 05 | Choosing printing and embroidery | `choosing-printing-and-embroidery` | Preview |
| 06 | Preparing size specifications | `preparing-size-specifications` | Preview |
| 07 | Planning MOQ and order quantities | `planning-moq-and-order-quantity` | Preview |
| 08 | Agreeing quality checkpoints | `quality-checkpoints-before-production` | Preview |
| 09 | Preparing bulk production and delivery | `preparing-bulk-production-and-delivery` | Preview |

Every card has its own bilingual title, category label, excerpt, takeaway, CTA and destination. The five filter groups are planning, materials, sampling, decoration and production; their guide counts are 3, 1, 2, 1 and 2 respectively.

The two full English bodies contain 666 and 685 narrative words respectively, excluding headings, lists, related content and common page chrome. The seven previews contain 92–116 narrative words each. Thai versions cover the same practical points; these English word counts are structural evidence, not a proxy for content quality.

## Content and architecture

- `src/content/guides.ts` contains small bilingual listing descriptors, topics and related-guide references. `src/content/guide-articles.ts` contains the article bodies, imported by the server article route. A search of the built client chunks for an exact long-form opening sentence found no match; this is a focused serialization check, not a complete bundle analysis.
- Every page has one H1, semantic article content, logical H2 sections, an introduction, checklist, advice, contextual links, service/product references, three related guides and a factory contact action. The complete articles also use H3 subsections.
- The homepage links to the planning hub. Breadcrumbs and related links return to the hub or continue to the next relevant guide. Article links include `#guide-start` so navigation from a deeply scrolled page lands at the title. Canonical URLs omit this fragment.
- The contact CTA preserves the article title in a `subject` query parameter, which prefills the Contact form message. Both forms retain the previously requested mock behavior. No live enquiry was submitted during this review.
- Practical recommendations are based on the site's owner-provided workflow and common preparation tasks. The articles do not invent universal MOQs, prices, production guarantees, numerical tolerances, certifications, publication dates or author credentials. Terms that depend on the actual style/materials remain for project-specific confirmation.
- A key-idea panel and a brief-to-delivery workflow line provide supporting visuals; no unverified factory photograph or new image claim was added.

## SEO implementation and release configuration

Unique titles and descriptions are rendered on all eighteen routes. With a valid public HTTPS `SITE_URL`, each guide receives its own canonical URL, reciprocal Thai/English alternates and Open Graph URL. Structured data contains matching breadcrumbs on all guide pages and Article markup on the two complete guides. JSON serialization escapes `<` to prevent article text from closing the script element. Related links are normal rendered anchors.

The existing sitemap now includes all eighteen guide URLs, alongside the sixteen main locale pages, when the release indexing gate is enabled. Preview defaults remain unchanged: indexing disabled, robots disallow crawling and an empty sitemap. Set a real public HTTPS `SITE_URL` and `SITE_INDEXING_ENABLED=true` at **both build and runtime**, then rebuild, only when the release dependencies are resolved.

Positive canonical/language/structured-data configuration was verified by unit tests with an example public origin. The current localhost production preview intentionally does not emit public-origin metadata or structured data. Live Google indexing, Search Console, Rich Results Test and rankings were not verified; metadata and markup do not guarantee discovery or search performance. Implementation references: [Google localized versions](https://developers.google.com/search/docs/specialty/international/localized-versions), [Article structured data](https://developers.google.com/search/docs/appearance/structured-data/article), [Breadcrumb structured data](https://developers.google.com/search/docs/appearance/structured-data/breadcrumb).

## Automated verification

| Check | Result |
| --- | --- |
| `npm.cmd run build` | Pass; eighteen guide routes prerendered; 39 generated pages including framework/metadata pages |
| `npm.cmd run lint` | Pass; no errors or warnings |
| TypeScript | Pass in the production build; separate typecheck also passed during implementation |
| `npm.cmd test` | 30/30 pass, including four new guide integrity/search/SEO tests |
| `check:site` against port 3003 in mock mode | Pass: 34 locale pages, 310 internal links and 259 assets; anchors, 404s and existing form/API checks |
| `check:locales` against the final build | Pass: all 34 locale pages, language/script policy, links, preference redirects and invalid routes |
| `verify.mjs` against the final build | Pass: all eighteen article pages, unique metadata pairs, one H1, breadcrumbs, checklists, related links, contact handoffs, nine-card hubs and unknown-slug 404s |
| `git diff --check` | Pass; routine Windows line-ending notices only |

The final code-only change after the full test run made table-of-contents links block elements so wrapped item numbers align with the first line. The production build and rendered route/locale checks were repeated for that change. It did not change content or filter behavior.

See [route-results.json](route-results.json) and [verify.mjs](verify.mjs) for the focused HTTP evidence.

## Rendered interaction and responsive verification

Rendered checks used the **Codex In-app Browser**. Google Chrome is installed but was not exposed as a connected browser; Microsoft Edge was not used for this hub review because its separate authorization covers the Windows motion check. This is not Chrome production sign-off.

| Viewport | Hub columns | Article reading layout | Horizontal overflow |
| --- | --- | --- | --- |
| 1920 × 1080 | 3 | Sticky contents + 760 px reading column | None |
| 1440 × 900 | 3 | Sticky contents + 760 px reading column | None |
| 1280 × 800 | 3 | Sticky contents + 760 px reading column | None |
| 768 × 1024 | 2 | Sticky contents + approximately 453 px reading column | None |
| 390 × 844 | 1 | In-flow contents + approximately 335 px reading column | None |
| 320 × 740 | 1 | In-flow contents + approximately 265 px reading column | None |

The hub, a complete article and a preview article were measured at each size. Screenshots were inspected for desktop article hierarchy, hub card layout, mobile title wrapping and narrow-screen content. Card CTAs have a minimum 64 px footer height, and the full card is an accessible link.

Verified interactions:

- Each of the five filters produces the expected guide count. English multiword search finds sample approval; a missing search returns the empty state; Clear filters restores all nine cards. Unit tests also cover Thai matching, whitespace and combined topic/query filtering.
- Keyboard Tab advances between article links and exposes the navy focus outline. Cards retain the existing eased lift/shadow and a 420 ms directional-arrow response; navigation arrows indicate onward navigation rather than disclosure state.
- Card and related-guide navigation opens the matching locale route at the article title after native smooth scrolling settles. A related-card transition was verified from deep in an article to a preview with final scroll position zero and the hero beginning below the header.
- The contents/checklist anchor lands below the sticky header. Switching Thai to English preserves the same guide and selected checklist; final measured checklist top was approximately 96 px with a 72 px mobile header.
- Insights remains the active parent navigation item while reading a guide.
- The article contact action opens Contact with `inquiry=general` and the exact article title prefilled in the message.

Native smooth-scroll transitions were observed through their intermediate and settled states; there is no added document scroll interception. In-app checking supports the route/anchor and responsive conclusions above, but does not establish physical touch behavior, Windows reduced-motion behavior, Chrome compositor performance or the glass blur appearance. The existing progressive unblurred surface remains readable where backdrop filtering is unavailable. The owner-requested always-on motion policy remains as documented in the earlier [scroll-motion QA](../scroll-motion-2026-10-06/QA.md).

## Evidence and remaining boundaries

- [Thai desktop hub](hub-desktop-th.png)
- [Thai complete brief, desktop](brief-desktop-th.png)
- [English complete approval guide, desktop](approval-desktop-en.png)
- [Thai complete brief, mobile](brief-mobile-th.png)
- [English checklist, mobile](brief-checklist-mobile-en.png)
- [Thai hub, narrow mobile](hub-narrow-th.png)
- [English preview, narrow mobile](preview-narrow-en.png)
- [Responsive measurements and interaction results](browser-results.json)
- [Language-switch anchor result](language-anchor-result.json)

The requested knowledge-hub implementation is complete for this iteration. Final public release still needs the earlier deployment dependencies and the requested Chrome browser review. This report makes no claim of deployment, actual search-engine indexing, live form delivery or complete production release approval.
