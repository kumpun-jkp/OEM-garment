# Subtle article gradients and glass surfaces

Scoped to the Insights article section. Retained the existing grid, typography, nine bilingual placeholders and silk interactions.

- Background: layered pale blue and faint gold radial accents over the existing white/info palette.
- Cards: white gradient at 96–86% opacity, fine navy border, soft shadow and white inner highlight.
- Footer: translucent pale blue gradient with a fine dividing line.
- Body copy explicitly uses the brand copy colour; small labels use navy for stronger contrast.
- Desktop CSS requests a static 6px backdrop blur. Mobile omits blur while retaining translucency; no blur animation or extra JavaScript.

Production build passed. In-app rendered checks at 1440×1000 and 390×844 confirm readable text, nine cards and no horizontal overflow. English language switching retains nine translated cards. The Quality cards still resolve to their dark surface with no light gradient.

The in-app browser reports `backdrop-filter: none` for both cards and the existing header. The translucent fallback was visually verified. Desktop blur rendering and Chrome sign-off remain unverified because Chrome is unconnected. Evidence: desktop-th.png, mobile-th.png and browser-results.json.
