# Final production-readiness audit — Thonburi Master

6 October follow-up: targeted source fixes and current verification are documented in [the fixes report](../production-fixes-2026-10-06/QA.md). The findings below describe the original 5 October candidate; release configuration and Chrome sign-off remain open.

Audit initiated 5 October 2026, Asia/Bangkok. **Release decision: NO-GO. Browser coverage is incomplete.**

The production build compiles and the HTTP, catalogue, locale and unit checks pass. Public release is blocked by an unavailable enquiry delivery service, missing directly accessible privacy information, and an unsafe form fallback when JavaScript is unavailable. Chrome visual, responsive and motion testing has not yet been completed. Passing server checks does not approve those areas.

## Evidence and environment

- Repository: `C:\Users\jakka\Documents\GitHub\OEM-garment`.
- Baseline commit: `9f9c1c049b7a5e3eb30cabd4dddd0571f9e6e88f`, plus the existing uncommitted TM Apparel catalogue changes. The audit assesses the working tree, not that commit alone.
- Next.js 16.3.8, React 19.3.0. The installed Next.js production and testing guides were consulted.
- Target: the actual `next build` output served by `next start --hostname 127.0.0.1 --port 3002`. The earlier preview remains on port 3001.
- Both Thai and English interfaces: eight routes per locale, sixteen route/locale combinations.
- Google Chrome is installed and was opened. Browser-control discovery exposes only Edge; creating a Chrome test tab returned `Browser is not available: chrome`. No Edge testing was substituted.
- Application source and existing working-tree edits were preserved. The audit adds evidence files only. Build caches and normal verification artefacts may be refreshed by project commands.
- Environment inspection recorded configuration booleans only: enquiry webhook, webhook token and canonical origin are all unset. No secret values were printed. Local synthetic API submissions had no external processor to contact.
- Current HTTP/source evidence: [server-results.json](./server-results.json). Reproduction script: [server-audit.mjs](./server-audit.mjs).
- Earlier screenshot and browser reports are historical references; they are not a new Chrome sign-off for this working tree.

## Severity-ranked findings

Severity definitions: **P1** blocks the affected public-release capability; **P2** materially degrades a user task and should be addressed before launch; **P3** is a minor defect or improvement. An untested area is recorded as an open gate, not as a pass or a demonstrated defect.

| ID | Severity | Finding | Evidence status | Release action |
| --- | --- | --- | --- | --- |
| QA-01 | P1 | Both enquiry forms cannot deliver valid submissions | Confirmed in the production API | Configure and verify durable delivery |
| QA-02 | P1 | Privacy information cannot be read directly before submitting personal details | Confirmed route and source mapping | Publish accessible approved privacy information |
| QA-03 | P1 | Forms have an unsafe default GET fallback if JavaScript is absent | Production HTML confirmed; browser consequence inferred from HTML rules | Prevent query-string submission and retest without JS |
| QA-04 | P1, conditional | Public marketing pages still advertise `noindex, nofollow`; canonical origin is unset | Confirmed in every production page | Resolve launch/indexing intent and production origin |
| QA-05 | P2 | Insights advertises nine excerpts but renders one | Confirmed in production HTML and source | Derive the displayed count from available content |
| QA-06 | P2 | Every current product's “Start with this idea” CTA discards its product identity | Confirmed source mapping | Carry a stable product ID and meaningful reference into the enquiry |
| QA-07 | P2 | Phone validation accepts punctuation without any digits | Confirmed validation execution | Require an appropriate digit count after normalisation |
| QA-08 | P2, source finding | Active counter animations are not cancelled when reduced motion is enabled | Confirmed controller implementation; Chrome reproduction pending | Track and cancel animation frames, settle final values |
| QA-09 | P3 | Missing favicon | Production `/favicon.ico` returns 404 | Add the approved brand icon |
| QA-10 | P3 | Three unused-variable lint warnings remain in the motion controller | Confirmed ESLint result | Remove unused code |
| GATE-01 | Open release gate | Chrome visual, responsive, keyboard and full-site motion coverage | Chrome connection unavailable | Complete the browser matrix below |
| GATE-02 | Open release gate | Real production hosting, enquiry receipt and upload path | No public deployment target/processor is configured | Test the intended production environment |

### QA-01 — enquiry delivery is unavailable

Affected pages: `/th/contact`, `/en/contact`, `/th/start-your-project`, `/en/start-your-project`; all guide, policy and visit requests routed through them.

Reproduction: submit a valid, same-origin multipart contact enquiry, then a valid project enquiry to the production build. Both return HTTP 503 with an explicit unsent outcome. `ENQUIRY_WEBHOOK_URL` is unset. See `apiCases` in the server evidence and `src/app/api/enquiries/route.ts`.

The honest error message is correct failure behaviour, but it does not make the public lead-generation journey operational. Configure an approved HTTPS processor, verify durable receipt and the browser success state, and exercise timeout, rejection, retry and duplicate-submission behaviour. Confirm hosting request-size limits against the advertised 50 MB per file / five files / 100 MB combined. The local audit did not configure a processor or send a business enquiry.

### QA-02 — privacy information depends on the non-operational form

The consent copy links to `/contact?inquiry=policy&subject=Privacy%20Policy`. Footer policy items also open policy-request enquiries. They do not provide readable policy documents. With QA-01, visitors cannot obtain the requested document through the website either.

Evidence: `src/components/enquiry-form.tsx:294`, `src/components/shared-sections.tsx` legal group, and the recorded internal destinations. This is a confirmed information-access defect; the audit makes no legal-compliance determination.

Publish approved privacy information at a directly readable destination, link it from both consent controls, and clarify the purpose, processor, attachment handling and retention applicable to the deployed service. Retest both locales and keyboard access.

### QA-03 — unsafe native form fallback

All four form pages render one of the following production tags:

```html
<form class="enquiry-form contact-form">
<form class="enquiry-form project-form">
```

Neither tag declares `method`, `action` or an encoding. There is no `noscript` fallback. The client submit handler normally intercepts submission and sends multipart POST, but cannot do so if JavaScript is disabled or fails to initialise.

The HTML standard defines the missing-method default as GET, with form values encoded in the destination URL. Therefore the likely fallback places the visitor's named contact/message fields in the page URL and fails to deliver an enquiry. Production markup is confirmed; a disabled-JavaScript Chrome reproduction is still required. [HTML form submission rules](https://html.spec.whatwg.org/multipage/form-control-infrastructure.html#attr-fs-method).

Provide a safe native POST flow with the required multipart/kind fields, or prevent form submission until the client is ready and provide an accessible no-JavaScript contact alternative. Verify blocked/failed JavaScript, delayed hydration and restored browser history. Personal enquiry content must not become query-string data.

### QA-04 — launch metadata remains in preview mode

Every audited page contains `noindex, nofollow`, inherited from `src/app/[locale]/layout.tsx:37`. `SITE_URL` is unset. No canonical URL, language-alternate metadata or Open Graph tags were found; `/robots.txt` and `/sitemap.xml` return 404.

The noindex setting is an intentional pre-launch safeguard documented in README. It is a release blocker **if the public marketing launch is intended to be searchable**, not a defect for an intentionally unindexed preview. Keep the safeguard until other launch dependencies are met, then configure the real canonical origin and approved indexing behaviour. Add canonical/hreflang and sitemap support for the bilingual public site. Validate the form Origin check through the actual HTTPS reverse proxy as well; local HTTP success cannot prove that configuration.

### QA-05 — inconsistent Insights count

`src/components/insight-library.tsx:75` hardcodes “All planning excerpts (9)”. The rendered Insights library contains exactly one `.article-card` in each locale and its status reports one result. The Thai translation retains `(9)` too. The current implementation avoids duplicated articles, but the filter label was not updated.

Reproduction: open either Insights route and compare the All count to the result status/card count. Derive the total from the available article collection. Also retest the four topic filters, search, empty state and Clear filters in Chrome; those client interactions remain unverified in this pass.

### QA-06 — product reference is lost on enquiry entry

`src/components/project-catalogue.tsx:175` builds the card CTA from `stage=reference` and a generic category only. All 89 currently supplied products lack the sports/team subtype, so their CTA points to the same `category=Other` destination. No product ID, title or selected image is carried forward. The project page reads only stage/category and does not populate a product reference in its message.

A visitor selecting a specific design must reconstruct that reference manually. Carry a stable identifier and an appropriately escaped display reference through the URL/form and delivered payload; preserve it during locale switching. This finding does not assert that a SKU exists: the current product IDs are implementation identifiers and manufacturer SKUs remain unspecified.

### QA-07 — punctuation-only phone values are accepted

`src/lib/enquiries.ts:109` validates only an allowed-character set and total length. Executing the production validator with `------`, `......` or `++++++` accepts all three as valid phone values. This allows a nominally required contact method to contain no usable number.

Require a reasonable digit count after stripping permitted formatting; retain support for international prefixes and document the policy. Retest spaces, formatted international numbers, excessive length and punctuation-only values on both client and server. Do not describe this as validation of phone ownership.

### QA-08 — reduced-motion changes do not stop counters

`animateCounter` in `src/lib/motion.ts:115` schedules recursive animation frames for 1,400 ms and returns no cancellation function. `stop()` cancels Web Animations and listeners but has no counter frame handle. Its reduced-motion preference listener consequently cannot immediately terminate an already-running counter.

This is a source-confirmed lifecycle gap; the visual effect and whether a preference-change frame races with other cleanup must be reproduced in Chrome. Track active frame handles and final metric strings, cancel on preference change/unmount, and immediately restore final values. Also inspect the section opacity reveal plus nested item reveal: both operate on some of the same visible content, so interaction and rapid-scroll tests must demonstrate that controls never remain invisible behind a parent section.

### QA-09 / QA-10 — minor release polish

- `/favicon.ico` returns 404. Add an approved browser-tab/site icon and verify its metadata.
- ESLint completes with zero errors and three warnings in `src/lib/motion.ts`: unused `total` (44), `SILK_SETTLE` (75), and `surface` (179). These warnings do not prevent compilation but should be removed during the motion fixes.

## Completed verification

| Check | Current result | Evidence / limits |
| --- | --- | --- |
| Production build | PASS | `npm.cmd run build`; all static/dynamic routes generated |
| TypeScript | PASS | `npm.cmd run typecheck` |
| ESLint | PASS with 3 warnings | Zero errors; warnings listed above |
| Automated tests | PASS, 15/15 | Enquiry validation/parsing, locales, taxonomy, product source reconciliation |
| Runtime site check | PASS for its assertions | 16 routes, 92 internal links, 259 rendered assets, 404, API validation, Origin rejection and explicit unavailable delivery |
| Additional internal-destination check | PASS | 99 distinct rendered internal links/query/anchor destinations; no HTTP errors or missing anchors |
| Taxonomy/product runtime check | PASS | 30 rendered taxonomy destinations in both locales, exact IDs/card counts, selected filters, galleries/empty-state markup; 185 product WebP URLs served |
| Source product reconciliation | PASS | 185 source images mapped exactly once, 89 products; source/output hashes and classification exceptions covered by tests |
| Locale runtime check | PASS | 16 page/locale combinations, language/script policy, internal links, preference redirects, invalid routes |
| Additional API negatives | PASS, 12/12 expected outcomes | Valid forms unavailable; cross-origin, JSON, empty/invalid fields, missing consent, honeypot, unsupported/six attachments, malformed multipart, overlong message |
| Invalid/contradictory catalogue query routes | PASS for rendering | HTTP 200 with recovery covered by product tests; client history interaction pending |
| Malicious-looking subject string | PASS for SSR escaping | Script-like query text is HTML-escaped; this is not a full penetration test |
| HTML structure | PASS for audited checks | One H1, no duplicate IDs, no missing `alt` attributes in the sixteen server responses; image-alt quality needs visual/context review |
| Dependency security advisory audit | PASS | `npm.cmd audit --omit=dev --json --cache .npm-cache`: 0 reported vulnerabilities; initial restricted-network attempt failed, approved registry query succeeded |
| Whitespace/diff check | PASS | `git diff --check`; Git reports normal LF/CRLF conversion notices |
| External destinations | PARTIAL | One Google Maps search URL, encoded from the supplied address; web fetch could not access Maps, actual landing result/pin pending |
| Telephone link | Structural PASS | `tel:+6628935951`, consistent with the displayed main number; no phone call placed |

The site/product checks verify rendered responses and assets. They do **not** establish that every button, carousel, hover or browser transition works.

## Outstanding Chrome test matrix

None of the rows below has a new Chrome pass in this audit. Use the production target on port 3002, and record screenshots and measurements after normal-motion reveals settle. Inspect intermediate animation states separately.

| Viewport | Coverage required |
| --- | --- |
| Large desktop, 1920 × 1080 | All 16 routes; section composition, full navigation, large image crops and whitespace |
| Standard desktop, 1440 × 900 | All 16 routes; alignment, gradients/shadows/radii, CTA hierarchy, galleries, hover/focus |
| Laptop, 1280 × 800 and 1366 × 768 | Navigation breakpoint, short-height sticky layout, menu bounds, dense grids |
| Tablet, 768 × 1024 and 1024 × 768 | All 16 routes at the representative portrait width; landscape navigation/forms/shelves |
| Mobile, 390 × 844 | All 16 routes; single-column layouts, touch targets, menu disclosures, sticky chapters |
| Narrow mobile, 320 × 780 | All 16 routes; typography/wrapping, forms, thumbnail rail and filter rows |
| Additional reflow | 200% zoom, keyboard-only operation, long form values/file names, slow and failed image loading |

### Functional interaction cases

1. Header/home logo, every primary navigation item, mega menu, every directory branch, mobile disclosures, project CTA and locale buttons. Verify Escape, outside click, focus exit/restore and browser Back/Forward.
2. All sixteen direct routes and client transitions; remembered locale, deep filter URL, query/hash preservation, refresh, unknown route and 404 recovery.
3. Catalogue parent/subtype selection, Children and sports/team empty states, invalid/contradictory query recovery, Clear filters, current filter indication and source card membership.
4. Every multi-image product's thumbnail/image correspondence; previous/next wrap, Home/End/arrows, Ctrl+Home, rapid repeated navigation, single-image controls, image loading/failure, selected thumbnail visibility and page scroll preservation. There are 66 multi-image and 23 single-image source products.
5. All product and shared CTAs, guide/policy/visit prefills, and the external Maps result. Verify semantic destination, not just HTTP success.
6. Insights topics/search/clear and disclosure; calculator shrinkage, growth, unchanged lengths, blank, zero, negative and extreme values.
7. Both forms: empty submission, individual correction, translated native/server errors, error-summary focus, pre-incorporation option, readiness radio, select controls, consent, loading/disabled feedback, retry and honest unavailable outcome.
8. File browse/drop, all supported types, uppercase extensions, invalid files, mixed selections, duplicates, remove/re-add, cancelled picker, zero-size file, five/six files, per-file/combined limit. Test hosting limits on the real deployment. Native picker/touch behaviour cannot be inferred from validator tests.
9. JavaScript disabled/failed, offline submission, slow response, double click, network interruption and browser history restoration. Prevent query-string leakage under QA-03.

### Visual and responsive cases

Review every section and footer on every route for alignment, spacing, baseline consistency, font loading/weights, hierarchy, unexpected wrapping, clipping, overlaps, accidental page overflow and image aspect/crop/quality. Compare the existing CI tokens and approved layout without treating a subjective preference as a defect. Inspect full-width dark/light transitions and transformed decorative overlaps at the page edges.

Native horizontal overflow is intentional for fabric/technique shelves, chapter navigation, gallery thumbnail strips and wide data tables. Verify containment within those controls, visible discovery affordances, keyboard access and absence of document-level horizontal scrolling. Measure hit areas, contrast and focus visibility; static `alt` presence is not a complete accessibility pass.

### “Smooth as Silk” motion cases

- Confirm Chrome's actual `prefers-reduced-motion`, fine-pointer/hover capabilities and browser version before testing.
- Normal motion: scroll reveals, staggered items/counters, hero parallax, sticky header/chapter bars, progress indicator, card/image responses, navigation underlines, button press feedback, disclosure entrances, product image changes and shelf movement.
- Scroll slowly, rapidly skip multiple chapters, reverse direction, repeatedly click anchors, use Back to a restored position and navigate/filter during a reveal. Content must settle visibly with no flash, jitter, broken transforms, hidden interactive controls or lock on vertical scrolling.
- Verify section and item animation layers do not multiply the perceived movement or delay access. Measure layout shifts during initial font/image load and animation transitions.
- Reduced motion: movement/scroll disabled from first load, accessible static content, no hidden sections, final counter values, preference change during active reveals/counters and safe route cleanup. CSS-only disabling does not cancel JavaScript frame loops.
- Shelves: native horizontal scroll, mouse drag/release/cancel, arrow-button edges and keyboard arrows; vertical page scrolling remains usable. Touch swipes/pinch need actual touch-device or clearly labelled emulated evidence.

## Deployment and performance boundaries

The local server does not prove production HTTPS, DNS, reverse-proxy Origin handling, CDN cache behaviour, operational rate limiting, attachment scanning/retention, durable delivery or public audit/asset publication approvals. README records missing owner evidence/publication dependencies; resolve those with the owner before representing them as independently verified.

Local response timings are diagnostic only and are not Core Web Vitals. Unique script resources across the sixteen routes total 809,642 uncompressed bytes. Catalogue HTML is approximately 0.93 MB (English) / 1.05 MB (Thai), with all 89 cards and thumbnail markup. This is a performance review target, not a measured performance failure: measure compressed transfer, request count, main-thread work, LCP, CLS and representative interaction latency in Chrome under a documented mobile network/CPU profile. Consider staged loading/pagination only if that evidence warrants it.

No Lighthouse score, Chrome console/network pass, accessibility conformance claim or full-site normal-motion pass is asserted here. No deployment or processor configuration was performed.

## Required release exit criteria

1. Resolve QA-01 to QA-03 and demonstrate safe enquiry delivery, accessible privacy information and safe failed-JavaScript behaviour.
2. Resolve the conditional launch metadata/origin gate and verify actual hosting/upload/receiver configuration.
3. Correct the stale count, lost product reference and unusable phone values; settle and cancel reduced-motion counters.
4. Complete the Chrome matrix, fix material defects, and retest affected routes/states. Record any accepted minor deviations with an owner and rationale.
5. Re-run the production build and appropriate automated checks against the final candidate; retain the final browser evidence and verify that the deployed candidate matches it.

**Current decision remains NO-GO. Automated backend success cannot replace the missing browser sign-off or the non-operational enquiry journey.**
