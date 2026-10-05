# Copy refinement verification

Verified locally on 5 October 2026.

- Reviewed 867 bilingual dictionary entries; changed 104 and retained 763. Full comparison: [COPY_REVIEW.md](COPY_REVIEW.md), [COPY_REVIEW.json](COPY_REVIEW.json), and [retained copy](copy-review/RETAINED_COPY.md).
- Changes cover all eight pages and shared navigation, footer, forms and metadata. Display-copy refinements preserve original lookup keys and submitted form values.
- The Insights library now displays its single available guide once. Its count is 1 in both languages. No new article content was introduced.
- Spaces between the split About and OEM Journey headings prevent words joining when mobile CSS hides the line break.
- Production build, lint, typecheck, 13 tests, locale checks across 16 routes, site checks and 30 product-destination checks passed. The site check verified 98 unique navigation links and 79 rendered assets; the smaller link count reflects removal of duplicated article instances.
- Browser checks covered eight pages in both languages at 390 px and 1280 px: 32 observations, no document-level horizontal overflow and no Thai script in English body text. Both Insights pages rendered one article. [Browser records](copy-review/BROWSER_QA.json).
- The final Thai homepage was visually inspected at the default desktop viewport. [Preview](copy-review/th-home.png). The language toggle was also used successfully in the browser.

Business figures, fees, timing estimates, names, factory documents and historical audit results were preserved from the existing source. This work verifies copy implementation and rendering; it does not independently validate new business evidence. The enquiry service remains unconfigured as documented by the existing application; no browser enquiry was sent.

The production preview runs locally at `http://127.0.0.1:3000/th`.
