# Quality card contrast fix — 6 October 2026

The shared motion stylesheet used `.capability-card.capability-card`, giving its light gradient the same specificity as `.journey-quality .capability-card`. Because the motion stylesheet loads later, it replaced the intended dark surface while retaining white headings, pale body copy and gold labels.

Changed the shared selector to `.capability-card`. The section-specific dark surface now takes precedence through the normal CSS cascade. Existing content, card geometry and motion remain intact.

## Verification

- Production build: PASS, including TypeScript validation.
- In-app browser, Thai Quality section: 1440×900, 390×844 and 320×740. Four cards have the intended dark surface and no background image; no horizontal overflow at tested widths.
- Desktop and mobile screenshots confirm visible headings, body copy and labels. Narrow mobile uses the existing single-column layout.
- English Quality section: all four cards resolve to the same dark surface and white headings.
- About page control: all 23 capability cards retain their intended light gradient.

Computed Display-P3 text colours against the solid card surface give these contrast ratios:

| Text | Ratio |
| --- | ---: |
| White headings | 20.41:1 |
| Grey body copy | 12.82:1 |
| Gold labels and footer | 12.16:1 |

Ratios use linearised channels and the Display-P3 luminance matrix from [CSS Color 4](https://www.w3.org/TR/css-color-4/). They exceed the 4.5:1 normal-text threshold in [WCAG 2.2 contrast guidance](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html). This is a focused contrast check, not a whole-site accessibility certification.

Evidence: `browser-results.json`, `quality-desktop.png`, `quality-mobile.png`, and `quality-mobile-cards.png`.

Chrome is still unconnected. Rendered checks used the Codex in-app browser; Chrome production sign-off remains pending. Edge was not used for this contrast check. Local production preview is running on port 3003.
