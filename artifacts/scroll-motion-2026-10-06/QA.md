# Stronger scroll motion and button removal — 6 October 2026

The owner requested removal of the motion button and more visible effects, particularly during scrolling. This update supersedes the earlier wave-button implementation. The previous explicit instruction to keep smooth motion active regardless of Windows Animation effects remains the motion policy.

Preview: http://127.0.0.1:3003/th. Both enquiry forms remain in mock mode.

## Changes

- Removed the desktop button, mobile setting row, translations, preference module, storage subscriptions and pre-paint setting script. The previous stored choice is no longer read. There is no visitor toggle or automatic OS reduced-motion override in this version.
- Added opposing hero depth: the background moves down while the foreground moves up. Background travel is capped at 72 px on desktop and 36 px on mobile, further limited by the image's scaled overscan. Foreground travel is capped at 36 px and 18 px respectively.
- Added continuous vertical depth inside clipped editorial photos, with 36 px desktop and 18 px mobile caps. Existing hover zoom uses a separate transform property. Fabric and technique shelves are excluded from vertical depth to retain their reference framing and avoid animating horizontally off-screen images. Product-gallery boards retain `object-fit: contain`.
- Added scroll-driven gold accents to section dividers and a shadow beneath the sticky header. The existing progress indicator is more visible.
- Increased content entrances to 780 ms, with 36 px desktop or 20 px mobile travel and at most 220 ms stagger. Cards also arrive with a small scale adjustment. Initially visible content remains visible, and whole sections are never hidden.
- Retained native document scrolling, anchors, keyboard input and horizontal shelves. Decorative layers use exponential easing with a 95 ms time constant, stop updating when settled and immediately catch up on large page jumps. One passive listener feeds the frame loop; geometry reads are batched before writes and cached until resize/content changes. Background-tab and route cleanup cancel pending work and restore owned styles.
- Restored the header's 1240 px navigation breakpoint after removing the extra control.

## Automated checks

- Final production build and standalone TypeScript check: pass.
- Full ESLint: zero warnings/errors. Final changed JavaScript/TypeScript files also passed focused lint after the shelf adjustment.
- Final unit suite: 26/26 pass. Five obsolete preference-control tests were removed and three tests were added for image overscan bounds, refresh-rate-independent easing, convergence and large-jump recovery. Counter cancellation/formatting tests remain.
- Site verification: 16 routes, 268 internal links and 259 rendered assets, together with 404, API validation, origin and mock/unconfigured-delivery checks, passed.
- Mock forms: all 16 HTTP/render scenarios passed. These checks preceded the final shelf-only adjustment; the final build and browser checks include that adjustment.

## Rendered Windows motion checks

Microsoft Edge was used within the owner's explicit permission for Windows motion testing. Chrome was absent from the connected browser inventory. Windows reduced motion reported false, consistent with the owner having enabled Animation effects.

- Home checks at 1920×1080, 1440×900, 1280×800, 768×1024, 390×844 and 320×740 showed zero document overflow, no motion control and header actions inside the viewport. Desktop navigation was available at 1280 px. The narrow mobile menu also contained no motion setting.
- At the native 2040×938 viewport, a PageDown sample produced approximately 51.94 px background movement and 27.29 px opposing foreground movement. At 320 px width, the sampled movements were approximately 24.90 px and 15.06 px respectively.
- The settled mobile Process anchor was approximately 148.11 px from the top, below the 132 px sticky navigation stack. Its section accent reached full width. Rapid End/Home/End input left no hidden sections or document overflow in the sampled state.
- A loaded editorial photo moved from approximately -1.58 px to +3.67 px inside its fixed 286.86 px clipped frame after four ArrowDown inputs. Its independent scale remained 1.16 while its hover transform changed independently. No exposed image edge was visible in the capture; the unit tests verify overscan bounds across representative heights and extreme progress values.
- The final fabric shelf advanced approximately 314.4 px by button and 628 px after ArrowRight. It had zero vertical-depth targets and retained scale 1. The earlier eight-target record is retained as intermediate evidence before the shelf adjustment.
- A two-image gallery switched by button and the focusable stage's ArrowLeft handler. Three rapid Next inputs settled on image 2 of 2 with a loaded image, opacity 1, a square 393.06 px stage and zero document overflow. An initial keyboard attempt addressed the non-focusable region wrapper; the final test used the actual stage.
- Selecting Trousers rendered 44 cards, with no fully hidden cards or document overflow. No Home progress element remained on the catalogue or Contact routes. Returning Home produced exactly one progress element.
- An empty Contact submission focused the name input immediately. The form remained fully visible and retained its explicit mock notice. No enquiry was sent.
- Subsequent Home English/Thai transitions preserved the Home route. An intermediate intended Home capture instead showed About; the route was re-observed and retargeted. That route change was not reproduced, and its cause was not established. The final screenshot and final observation confirm Thai Home at scroll position 0.
- No warning/error console entries were captured in the tested tab. The temporary viewport override was reset before completion.

## Evidence and scope

[Raw browser observations](browser-results.json) include intermediate observations and final checks. Captures: [desktop Home](home-desktop.jpg), [narrow mobile Home](home-mobile.jpg) and [editorial photo depth](editorial-depth.jpg).

This is targeted implementation and Windows motion verification. It does not provide Chrome sign-off, quantitative FPS/paint profiling, physical touch-device evidence, a controlled final run with the OS continuously reporting reduced motion, or universal proof of no jitter. It does not supersede the original comprehensive production-readiness audit's remaining verification boundaries.
