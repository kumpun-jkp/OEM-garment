# Thonburi implementation review

Reviewed 2 October 2026 against the supplied Thonburi Master Figma file. The repository initially contained only `.gitattributes`; this is the requested fresh implementation.

## Verified

- Production build, ESLint, TypeScript, and all seven enquiry validation tests pass.
- `npm audit --omit=dev` reports zero production dependency vulnerabilities at the review date.
- The running production site serves all eight routes. The HTTP check passes for 42 internal destinations, anchors, 44 rendered assets, one H1 per page, 404 handling, invalid submissions, cross-origin rejection, and explicit unavailable delivery.
- All eight routes pass layout checks at 1,440, 1,280, 1,241, 1,240, 1,170, 1,024, 1,000, 768, 390, and 320 px: 80 route/width combinations. No page-level horizontal overflow was found. About's certification table intentionally scrolls inside its labelled, keyboard-focusable region.
- Browser interaction checks cover English/Thai navigation labels, mobile route selection, Escape dismissal with focus return, catalogue filters and clearing, article search and clearing, FAQ expansion, reference/Streetwear enquiry prefill, and the calculator's 5% example and empty-input handling.
- Both enquiry interfaces validate fields. A valid local contact submission reports that delivery is unconfigured and explicitly says the message has not been sent. No external submission was made.
- Production page loading produced no browser warnings or errors in the observed session. The visible lower-page photographs inspected after scrolling loaded successfully.

Raw layout measurements: [responsive-results.json](responsive-results.json), [desktop-section-metrics.json](desktop-section-metrics.json). Image observations: [visible-image-checks.json](visible-image-checks.json).

## Visual evidence

Desktop captures use the browser's normal wide viewport with centred content. Each route has top, middle, and footer captures in `desktop/`. A mobile Home capture is saved at 390 × 844 px. Emulated viewport capture intermittently timed out for other pages; their responsive geometry checks passed, but complete mobile screenshot coverage is not claimed.

| Page               | Desktop view                                                                                                                              |
| ------------------ | ----------------------------------------------------------------------------------------------------------------------------------------- |
| Home               | [Top](desktop/home.jpg) · [Middle](desktop/home-middle.jpg) · [Footer](desktop/home-footer.jpg)                                           |
| About Us           | [Top](desktop/about.jpg) · [Middle](desktop/about-middle.jpg) · [Footer](desktop/about-footer.jpg)                                        |
| Our Work           | [Top](desktop/our-work.jpg) · [Middle](desktop/our-work-middle.jpg) · [Footer](desktop/our-work-footer.jpg)                               |
| OEM Products       | [Top](desktop/oem-products.jpg) · [Middle](desktop/oem-products-middle.jpg) · [Footer](desktop/oem-products-footer.jpg)                   |
| OEM Journey        | [Top](desktop/oem-journey.jpg) · [Middle](desktop/oem-journey-middle.jpg) · [Footer](desktop/oem-journey-footer.jpg)                      |
| Technical Insights | [Top](desktop/technical-insights.jpg) · [Middle](desktop/technical-insights-middle.jpg) · [Footer](desktop/technical-insights-footer.jpg) |
| Start Your Project | [Top](desktop/start-your-project.jpg) · [Middle](desktop/start-your-project-middle.jpg) · [Footer](desktop/start-your-project-footer.jpg) |
| Contact Us         | [Top](desktop/contact.jpg) · [Middle](desktop/contact-middle.jpg) · [Footer](desktop/contact-footer.jpg)                                  |

[Mobile Home](mobile/home.jpg).

## Fidelity and deliberate departures

The source inspection used browser Dev Mode properties, fresh exports of all eight frames, original embedded photographs, and original SVG logos/icons. The session did not expose Figma's design-context MCP tool. The implementation uses real HTML components, locally served Athiti fonts, shared tokens, and responsive CSS.

The 1,280 px reference, 1,184 px content container, 48 px gutters, 80 px header, hero proportions, colour palette, square controls, catalogue grid, and repeated card typography informed the implementation. Source card overflow, overlapping compliance text, incorrect stage numbering, and a stray Home footer label were corrected. Active navigation reflects the actual route. Mobile layouts are inferred from desktop relationships.

Measured overall heights are close but do not establish pixel-perfect parity. Content reflow, readable supporting text, real form controls, and honest consent/upload states change some section heights:

| Page                                         | Source height, px | Rendered at 1,280 px, px |
| -------------------------------------------- | ----------------: | -----------------------: |
| Home, excluding the stray 80 px footer label |             5,494 |                    5,593 |
| About Us                                     |             7,191 |                    7,302 |
| Our Work                                     |             4,625 |                    4,639 |
| OEM Products                                 |             4,724 |                    4,702 |
| OEM Journey                                  |             4,351 |                    4,442 |
| Technical Insights                           |             4,584 |                    4,635 |
| Start Your Project                           |             2,914 |                    3,034 |
| Contact Us                                   |             2,664 |                    2,810 |

## Remaining launch dependencies

The frontend is implemented and reviewable; publication readiness remains conditional on the following source and integration gaps:

- Approve a consistent company identity, contact channels, operational figures, legal copy, client references, certification status, and ESG statements. The supplied design contains conflicting values and expired validity dates; these are not independently verified.
- Supply complete policies, technical bulletins, downloadable files, FAQ commercial terms, and real catalogue records. Current requests route to the enquiry desk instead of fabricating missing documents or claiming downloads exist.
- Configure an approved HTTPS enquiry processor and the canonical `SITE_URL`. Verify durable receipt, recipient workflows, hosting upload limits, scanning, retention, and rate limits before opening the service to visitors. The external delivery success path has not been tested against a real recipient.
- Manually verify browser file selection and drag/drop. Automated selection was blocked by Edge's disabled extension file-access permission. No security setting was changed. File types, size limits, counts, multipart parsing, and field validation pass automated tests.

Search indexing is disabled pending these decisions. See [README.md](../README.md) for setup and the full source-content register.
