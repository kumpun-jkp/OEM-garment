# Smooth as silk implementation and verification

5 October 2026. Local preview: http://127.0.0.1:3001/th

## Implemented behaviour

- The existing Athiti typography, CI colours, content order and garment imagery remain the foundation. Near-brand tonal gradients soften the hero, story sections, showcase and card surfaces.
- The homepage hero and selected story sections use bounded viewport-aware minimum heights only above 1000px width and 650px height. Dense sections can grow; mobile content is not forced into a screen height.
- A six-chapter navigator follows the hero, stays beneath the sticky site header and tracks the current section. Mobile users can scroll its links horizontally. Anchors account for both sticky bars.
- Shared headings, photos, cards, metrics and process steps use short, staggered entrance reveals. A shared IntersectionObserver and MutationObserver manage existing and newly rendered content. Focus or pointer interaction settles a reveal immediately. Server HTML and unsupported-animation environments keep content visible.
- Buttons, navigation underlines, garment cards, photographs and disclosures have restrained feedback. Desktop hover movement is limited to devices with a fine pointer. Reduced-motion preferences disable CSS movement, smooth scrolling and JavaScript reveals; changing the preference cancels active reveals.
- The About fabric and technique rows support horizontal exploration with native touch/trackpad scrolling, desktop dragging, keyboard arrows and labelled controls. Proximity snapping is confined to these rows.

## Verification results

| Check | Result |
| --- | --- |
| Production build | Passed |
| ESLint | Passed |
| TypeScript | Passed |
| Existing tests | 13 passed |
| Site check | 16 routes, 94 internal links, 88 rendered assets; validation, 404, origin and unconfigured-delivery checks passed |
| Product check | 30 rendered taxonomy destinations across both locales passed |
| Locale check | 16 pages, document language, English script policy, locale links, preference redirect and invalid routes passed |
| Responsive DOM checks | 48 checks: all 16 Thai/English routes at 320, 768 and 1440px; no page overflow, one H1 and no broken loaded images |
| Keyboard interactions | Mobile Escape closes the menu and restores focus; FAQ Enter expansion and shelf arrow navigation passed |
| Chapter arrival | Desktop and mobile targets land below the sticky header/navigator; current chapter and mobile rail position update |
| Desktop shelf drag | Changed fabric scroll position, enabled Previous, released pointer state and restored snapping |
| Reduced-motion page | Connected browser reports reduce; CSS transitions are 0s and document scrolling is auto |
| Normal reveal controller | Isolated browser fixture exercises the actual production controller; staggered entrance, final opacity 1, focus cancellation, preference cancellation, dynamic content and scroll reveal passed |
| Whitespace | git diff --check passed |

The first product check encountered a transient 500 while development routes were compiling under concurrent checks. Its focused rerun passed. An intermediate hot-reload error during stylesheet creation resolved after the final stylesheet import was installed; the final build passed.

## Evidence and boundaries

- `responsive-results.json`: current rendered route measurements.
- `motion-results.json`: normal-motion and cancellation evidence from the isolated fixture.
- `reveal-verification.html`: a standalone snapshot of the fixture and production controller used for verification. Its simulated motion preference applies only to that document; it does not alter browser or OS settings. The temporary public fixture was removed after testing.
- `home-en-desktop.jpg`, `home-th-mobile.jpg`, `garments-desktop.jpg`, `fabrics-desktop.jpg`: rendered visual evidence.

Full-site screenshots use the connected browser's reduced-motion preference. Normal JavaScript reveals were tested in the isolated fixture; the complete site's CSS hover/disclosure motion was not visually retested with the OS preference changed. Physical touch-device behaviour, Safari/Firefox rendering and production Web Vitals were not measured. No new animation dependency was added.
