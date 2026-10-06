# Restored mock forms — 6 October 2026

Both Contact and Start Your Project are restored for mock-up testing, as requested by the user. The fresh production-build preview runs at http://127.0.0.1:3003.

## Behaviour

- Both complete forms render in Thai and English, with their existing fields, selectors, project stages, attachments and submit controls.
- `ENQUIRY_MODE=mock` is the default when unset. A visible bilingual mock label and mock consent explain the non-sending behaviour.
- The API validates form fields, product references and attachments, then returns HTTP 200 with `mock: true`, `delivered: false` and an explicit unsent message. It returns before any receiver fetch in mock mode. Client-supplied mode fields cannot enable delivery.
- The client retains entered values and attachments after successful mock validation. Only confirmed live delivery resets the form.
- Native fallback remains a multipart POST with a hidden form kind. Without JavaScript, the JSON response opens as a new page; it also respects server mock mode.
- Real intake requires explicit `ENQUIRY_MODE=live` plus configured HTTPS receiver and privacy policy. The telephone fallback remains available for unavailable live intake.

## Verification

- Production build and standalone TypeScript check: pass.
- ESLint: zero errors and warnings.
- Unit tests: 23/23 pass, including default mock mode and disabled delivery even with receiver/policy configuration.
- [HTTP/render evidence](results.json): 16 scenarios pass. Coverage includes all four locale/form pages, visit and product prefills, valid submissions, repeat submission, attachment acceptance/rejection, invalid phone, missing consent, unknown product, honeypot, cross-origin rejection and attempted client mode override.
- Site check: 16 routes, 268 internal links and 259 rendered assets pass, together with 404/API checks.
- Git diff whitespace check: pass.

This is server-rendered HTML, source and HTTP verification. Google Chrome remained unavailable through the connected browser controls, so no new browser interaction, file-picker, visual, responsive or motion sign-off is claimed. The earlier comprehensive production audit remains subject to its browser verification boundaries; restoring mock forms does not establish public production approval.

The later mock request supersedes the unconfigured-form visibility result in the [earlier fix report](../production-fixes-2026-10-06/QA.md). Its live-delivery requirements remain applicable to real enquiries.
