# Material UI Sharp icons - 5 October 2026

The later [contextual PNG update](PNG_ICON_QA.md) replaces this report's original garment-category Sharp mapping. MUI Sharp remains in use for conventional actions and interface controls.

Installed `@mui/icons-material` 9.4.0, `@mui/material` 9.4.0 and the Emotion runtime dependencies. Material UI Sharp replaces the earlier proposed Lucide family. No Lucide dependency was installed.

The shared `src/components/app-icon.tsx` uses explicit Sharp imports. Icons cover navigation, arrows, disclosures, enquiry actions, upload, search, planning tools, contact information and product category symbols. Existing CI colours and Athiti typography remain in use. Garment illustrations remain reference content in the full directory; the showcase uses symbolic category entry points.

All icon SVGs are decorative (`aria-hidden="true"`, `focusable="false"`). Text labels remain visible, and icon-only controls retain parent accessible names. Existing product taxonomy and URL filters are unchanged by the icon update. Category symbols are broad visual cues; category text supplies the precise meaning.

## Verification

- Production build, lint, TypeScript checking and all 11 tests passed.
- `check:site` verified 8 routes, 57 internal links and 42 rendered assets, plus 404, enquiry validation, origin checks and explicit unconfigured delivery.
- `check:products` verified all 15 taxonomy destinations, selected filters, reference membership and the Children empty state.
- Browser: the Sleepwear showcase entry opened `/oem-products?audience=adults&category=sleepwear`.
- Desktop mega menu, mobile progressive directory and upload panel were visually inspected. The contact panel arrow was positioned at the heading edge to avoid obscuring its details.
- DOM measurements on Home, filtered Garment Style References, Insights, Start Your Project and Contact found no horizontal page overflow at widths 360, 768 and 1280 px. All rendered Sharp SVGs carried their decorative accessibility attribute.
- `npm audit --omit=dev` reported zero production dependency vulnerabilities. The install reported five development dependency advisories; these were not changed in this icon update.
- `git diff --check` passed. Temporary browser viewport overrides were reset after QA.

Production preview: `http://127.0.0.1:3001/`.
