# Bilingual article mockup restoration and silk interactions

Owner explicitly requested restoration of nine repeated placeholder cards for mocking, with Thai and English support.

Source history confirms the initial commit rendered nine copies of one placeholder. Revision round 2 reduced that to one card; these were not cards hidden by motion. Restored nine copies of the current sample-planning excerpt, retaining the existing translations. Counts derive from the same placeholder count. Removed a second translation pass that mapped the English nine-result label to stale one-result copy.

Article cards retain the shared staggered scroll entrance. Added a 5px hover lift over 480ms with the existing silk easing, a fading soft shadow, a rotating disclosure arrow, and a 420ms content expansion/collapse on browsers supporting intrinsic-size transitions. Native details retain their semantics and work with Enter. The summary has a minimum 44px touch target. No motion settings button was added.

## Verification

- Production build and component ESLint: PASS.
- In-app browser: nine cards in Thai and English, translated headings, bodies, footer copy and result counts.
- Thai empty topic filter yields zero results; Clear filters restores nine.
- Language button changes to the English route and restores nine translated cards.
- Desktop hover resolves to a -5px transform and full shadow opacity; native disclosure opens, closes to 0px and reopens with Enter.
- Mobile 390×844: single column, nine cards, no horizontal overflow. Thai disclosure settles at its content height (78.175px), arrow rotated 180 degrees; summary height 44px.
- Screenshots show the restored grid and expanded disclosure.

This is a mockup with intentional duplicate content, not nine distinct published articles. Chrome is unconnected; checks used the in-app browser. No deployment or Chrome production sign-off is claimed. Preview remains running on port 3003.
