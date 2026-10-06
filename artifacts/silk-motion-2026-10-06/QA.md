# Smooth as Silk motion update — 6 October 2026

Historical implementation record: the owner subsequently requested removal of the motion button and stronger scroll movement. The [later scroll-motion report](../scroll-motion-2026-10-06/QA.md) describes the current implementation; button and saved-preference descriptions below refer to the earlier version.

The user explicitly requested smooth motion even when Windows Animation effects are disabled, and approved Microsoft Edge for this specific Windows motion check after the earlier Chrome-only instruction prevented its use. Google Chrome remained unavailable through the connected browser controls.

Preview: http://127.0.0.1:3003/th. Both enquiry forms remain in mock mode.

## Resulting behaviour

- Smooth motion is the site's default, independent of the OS media preference. Visitors can explicitly reduce motion with the wave button in the desktop/tablet header or mobile menu. This follows the owner's requested default; it does not automatically follow Windows reduced motion.
- The explicit choice is restored before paint and after hydration/history restoration, and synchronized across tabs. Browser-storage failures preserve the in-page choice.
- Reduced mode cancels active reveals, image fades and counters; removes parallax/progress decoration and spatial hover movement; and uses immediate anchor/shelf scrolling. Colour, border, shadow and opacity feedback remain brief. State-bearing arrow rotation and gallery positioning remain functional.
- Hero entrance is a single modest arrival. Repeated breathing has been removed. Already-visible content is not faded out again after hydration or mode changes. Whole-section hiding and nested section/card movement have been removed.
- Reveal translation is independent of hover transforms. Entrances last 620 ms with at most 120 ms stagger, using 10 px travel on mobile and 16 px on desktop. Buttons respond in 180–260 ms, with 80 ms press feedback. Product images fade after decoding for 240 ms without initially hiding the new image.
- One passive scroll listener and one scheduled frame update hero parallax and the page progress line. Geometry is cached between resize/content changes. Parallax travel is bounded by the scaled image overscan and capped at 24 px. Background tabs stop decorative motion. New-element scans are batched; counter text updates do not rescan the page.
- The new control stays out of the mobile header and is accessible in its menu. The header navigation breakpoint is now 1360 px to accommodate it without horizontal overflow.

The distinction between OS preference detection and the site's explicit policy is described by [MDN's reduced-motion reference](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/At-rules/@media/prefers-reduced-motion). The visitor control is informed by [W3C guidance on controlling interaction-triggered animation](https://www.w3.org/WAI/WCAG22/Understanding/animation-from-interactions.html). These design references do not establish full WCAG compliance.

## Verification

- Fresh production build and standalone TypeScript check: pass.
- Full ESLint: zero errors and warnings; later changed TypeScript files also pass focused lint.
- Final unit suite: 28/28 pass, including setting defaults, pre-paint restoration, unavailable storage, subscription cleanup, cross-tab updates, hydration/history restoration and counter cancellation.
- Site check: 16 routes, 268 internal links and 259 rendered assets pass, together with 404 and API checks.
- Mock forms: all 16 HTTP/render scenarios pass after the motion update. In Edge, an empty Contact submission focuses the name field immediately. A valid test submission focuses its explicit unsent confirmation, retains the entered name and re-enables its submit button.
- Final smooth-mode home checks at 1920×1080, 1440×900, 1280×800, 768×1024, 390×844 and 320×740 show no document overflow or clipped header controls. Reduced-mode layout checks also show no overflow at those sizes. This is focused motion/control coverage, not a new all-route responsive audit.
- Explicit reduced mode changes the button's pressed state, restores `scroll-behavior: auto`, removes the progress element and resets parallax. The final saved reduced choice survives reload. Mobile Space toggles the setting; Escape closes the menu and returns focus to its trigger. Returning to smooth mode produces exactly one progress element.
- A settled chapter navigation lands the Process section at approximately 156 px, below the approximately 133 px sticky navigation stack. Rapid End/Home/End input leaves no invisible sections or document overflow in the recorded sample. The initial anchor observation was taken during the smooth scroll; the settled observation confirms arrival.
- About's fabrics advance from 0 to approximately 314 px by button and to 628 px by keyboard. Its techniques shelf also advances in reduced mode. The intermediate keyboard record queried the first shelf (techniques); the subsequent labelled shelf measurements confirm the fabrics movement.
- The sampled two-image product switches by button and arrow key, updates its selected thumbnail and position, and retains a loaded image with final opacity 1 after rapid changes. Its square stage remains approximately 393×393 px. No warning/error console entries were captured in the tested tab.
- Whitespace check: pass.

## Defects resolved during verification

The initial new-control layout overflowed by 29 px at 320 px and 15 px at 1280 px. Moving the mobile control into the menu and extending the header breakpoint resolved both. An intermediate preference reload unexpectedly returned to smooth; explicit post-hydration and history restoration was added, then the final toggle/reload check retained reduced mode.

## Evidence and boundaries

[Browser observations](browser-results.json) retain intermediate and final measurements rather than treating every observation as a final pass. Visual captures include [desktop home](home-desktop.jpg), [mobile home](home-mobile.jpg), [mobile menu](mobile-menu.jpg), [Process arrival](process-desktop.jpg), [product gallery](gallery-desktop.jpg) and [mock feedback](mock-feedback-desktop.jpg).

The browser initially reported OS reduced motion and zero-duration button transitions. Later it reported no OS reduced-motion preference. The owner subsequently confirmed enabling Windows Animation effects; no OS settings were changed by me. Both site modes and the independent default policy were verified, but a controlled final full-site run with the OS query continuously reporting `reduce` was not established. Chrome sign-off, physical touch-device checks, quantitative FPS/paint profiling and production Web Vitals remain outside these results. Static screenshots and recorded interaction samples do not prove universal absence of animation jitter.

## Follow-up after enabling Windows Animation effects

On 6 October, the owner confirmed enabling Windows Animation effects. The same approved Edge preview was reloaded and checked at its native 2040 by 938 CSS-pixel viewport. The OS media query consistently reported `prefers-reduced-motion: reduce` as false in all six recorded observations. This is consistent with the owner's setting change; it is not an inspection of the Windows settings panel.

- Smooth mode remained active after reload, with smooth anchor scrolling, one progress element and 180–260 ms button transition durations.
- PageDown produced approximately 18.25 px of hero parallax and updated the scroll progress indicator. The settled Process chapter landed at approximately 155.61 px, below the 132.80 px sticky navigation stack.
- Rapid End/Home/End input left no hidden sections or document overflow in the sampled state.
- Keyboard Space switched to explicit Reduced mode: the pressed state became false, scrolling became immediate and the progress element was removed. A second Space restored Smooth mode, its pressed state and exactly one progress element.
- The final home viewport had zero horizontal overflow. No warning/error console entries were captured in this tab.

No source changes or build reruns were needed for this OS configuration follow-up. [Recorded observations](windows-motion-enabled-results.json) and the [updated home capture](windows-motion-enabled-home.jpg) document the result. Chrome remained absent from the connected browser inventory, so this follow-up does not provide Chrome production sign-off.

This targeted motion implementation and verification does not supersede the unresolved Chrome boundaries in the original comprehensive production-readiness audit.
