# Thonburi Master CI implementation

Applied and reviewed 4 October 2026 across the existing eight-page Next.js site.

## Authoritative reference

The user supplied a CSS export of **THONBURI MASTER — CI concept board**, corresponding to [Figma node 98:9683](https://www.figma.com/design/IPUKY5wOWwPHlWlabI0PH6/Thonburi-Master?node-id=98-9683). The attachment is `336bf7d6-4b30-4adc-943a-c448db7e3d81/Pasted text.txt`. Its explicit values supersede the old bronze and warm-paper foundations and take precedence where the earlier variable snapshots differ. The export is a 1,800 px concept board; its fixed widths and absolute positions are reference geometry rather than responsive website CSS.

The Figma design-context MCP tool was unavailable in this session. The implementation uses the owner's supplied code, supported by the earlier browser-visible primitive, semantic, spacing and control variables saved in [design-system/](design-system/). It does not claim an automated pixel comparison with every Figma component.

## Source-to-code mapping

| Reference                 | Source lines            | Applied website role                                                                                                                           |
| ------------------------- | ----------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------- |
| Primary palette           | 2607–3344               | Deep `#01050B`, navy `#002351`, blue `#2F78B0`, gold `#FFBC00`, white and muted grey; preserved paired Display-P3 values in `brand-tokens.css` |
| Master display            | 3460–3485               | Athiti 600, 72 px display role; existing Thai hero composition retained with readable line height                                              |
| Major titles              | 3606–3632               | Athiti 600, 46 px, -1.2 px tracking; responsive sizing retained                                                                                |
| Editorial body            | 3745–3769               | Athiti 400, 17 px with approximately 25 px line height; existing smaller card and data roles retained                                          |
| Technical labels          | 207–225                 | System font, compact 10 px annotation role; SF Pro where provided by the operating system, Segoe UI on Windows, Athiti fallback for Thai       |
| Brand actions             | 437–485                 | Gold/deep/white variants, Athiti 700 at 12/15 px, 1.2 px tracking, 16 px arrow gap and 2 px corners; default target height 42 px               |
| Compact lockup            | 119–180                 | Athiti 700 wordmark, small THAILAND signature and garment-manufacturing descriptor                                                             |
| Manufacturing portrait    | 585–743                 | Monochrome factory reference imagery, navy wash on the home hero, gold vertical datum on the factory portrait                                  |
| Website metric            | 7071 onward             | Navy facility-summary and business-fact surfaces with light copy                                                                               |
| Spacing/control variables | Saved browser snapshots | 4/8/16/24/40/64/96 px spacing roles; square inputs; existing content width and page sections retained                                          |

Semantic supporting colours use the inspected CI variables. The wide-gamut palette is guarded by `@supports`; sRGB browsers retain the supplied export's fallback values. Brand names and colour-space values are kept distinct: Figma's displayed gold hex and the CSS export's sRGB fallback are not treated as interchangeable numbers.

The existing Figma arrow SVG is reused through a CSS mask so its colour follows the action's text. Decorative arrows previously embedded in action labels were removed to avoid duplication. Buttons with local functions such as clearing filters keep their own existing treatment. Card metadata uses blue on light surfaces and gold on dark surfaces. Gold selections use deep text. Capability-card footers have a two-line minimum height to align within each row.

## Content and imagery

The owner update remains authoritative for company facts. Thonburi Master is the primary business identity and TM Apparel is part of it. About retains eight individually named fabric cards and fifteen technique cards; Home retains fifteen technique cards; the OEM Journey retains six stages. The supplied address, telephone, fax and opening hours remain in the central content model. Placeholder figures and case claims from the concept board were not imported.

The CSS attachment contains `background: url(.jpg)` placeholders rather than downloadable image URLs. Existing factory reference photos and the previously added, labelled AI fabric illustrations remain in use. The new CI changes their presentation; it does not establish them as verified company photography. All eight fabric illustrations loaded in the production preview.

## Verification

| Check                             | Result                                                                                                                                  |
| --------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| Production build                  | Passed with Next.js 16.3.8                                                                                                              |
| ESLint and TypeScript             | Passed                                                                                                                                  |
| Existing enquiry validation tests | 7 passed                                                                                                                                |
| Running production-site check     | 8 routes, 42 internal destinations, 45 unique rendered assets; 404, validation, origin checks and explicit unconfigured delivery passed |
| Responsive DOM measurements       | 40 combinations: all 8 pages at 1280, 1000, 768, 390 and 320 px; no page-level horizontal overflow or detected text-width clipping      |
| Mobile navigation                 | Opened correctly at 320 px; links fit; Escape closed the menu and restored its collapsed state                                          |
| Form selections                   | Communication and readiness choices update; selected gold surfaces use deep text                                                        |
| Measured form contrast            | Gold submit button, selected readiness card and selected communication chip: 12.16:1; white input text on the dark surface: 16.70:1     |
| Content structure                 | 8 fabric cards, 15 technique cards and 6 journey stages confirmed in the rendered DOM                                                   |
| Whitespace/diff check             | Passed                                                                                                                                  |

The layout review corrected overflow in two icon-only portfolio buttons caused by inherited letter spacing. The visual review also aligned capability footers and changed metadata on dark cards to gold. Contrast figures describe the listed opaque UI states, not a full accessibility certification or image-overlay contrast audit.

Raw responsive evidence: [responsive-results.json](design-system/responsive-results.json). The desktop production captures below use the normal browser viewport; the temporary responsive viewport overrides were reset. Mobile measurements and menu interaction were checked, but native screenshot capture at emulated widths was not reliable enough to claim a full mobile screenshot review.

- [Home and brand actions](design-system/home-desktop.jpg)
- [Eight fabric categories](design-system/fabrics-desktop.jpg)
- [Contact details](design-system/contact-desktop.jpg)
- [Selected project controls](design-system/project-desktop.jpg)

Enquiry delivery remains unconfigured and returns an explicit unsent response. The verification submitted no external enquiry. Publication and real company-photo verification remain outside this local styling update.
