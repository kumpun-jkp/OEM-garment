# Production audit fixes — 6 October 2026

**Later user instruction:** both forms were restored for mock-up testing. The default mock mode validates submissions and returns `mock: true, delivered: false` without contacting a receiver. The unavailable-form behaviour below now applies only to explicitly selected live mode without its required configuration. See [mock form verification](../mock-forms-2026-10-06/QA.md) for the current preview behaviour.

**Later motion instruction:** smooth motion is now the explicit site default regardless of Windows Animation effects, with a visitor-controlled reduced mode. The updated implementation and approved Edge checks are recorded in [6 October motion QA](../silk-motion-2026-10-06/QA.md). The automatic OS preference behaviour described in the earlier motion finding below is superseded.

Target: the final production build at **http://127.0.0.1:3003**. The existing development preview on port 3001 was preserved.

**Code fixes are implemented and automated verification passes. Public deployment remains NO-GO pending the approved receiver, privacy policy, public domain and Chrome browser sign-off.**

## Changes and current status

| Original issue | Change | Verification | Remaining dependency |
| --- | --- | --- | --- |
| QA-01: unavailable enquiry delivery | Contact and project entry show the published phone contact when intake is unavailable; they do not render an unusable online form. Both HTTPS receiver and policy URL must be configured before online intake is enabled. The API uses the same availability condition. | Unconfigured production pages in both locales contain the phone fallback and no form; valid API requests retain an explicit 503 unsent outcome. | Real receiver, durable receipt, hosting upload limits and operational testing remain required. |
| QA-02: inaccessible privacy information | Consent and footer link directly to `PRIVACY_POLICY_URL` when supplied. Without it, online intake is disabled and the footer accurately labels a privacy-policy request. | Enabled-form render fixture has direct policy links in both locales. | Owner-approved readable policy remains required. No policy text, processor identity or retention terms were invented. |
| QA-03: native GET fallback | Enabled forms declare `method="post"`, `/api/enquiries`, multipart encoding and a hidden form kind; a noscript explanation describes the response-page fallback. | Production HTML with fixture configuration contains all attributes and the native kind. | Disabled-JavaScript Chrome interaction and the real delivery response remain untested. |
| QA-04: preview metadata | Explicit indexing flag and HTTPS public origin; page-specific canonical URLs, language alternates and Open Graph metadata; robots and sitemap routes. | Configuration tests pass. Preview robots disallows crawling; sitemap is empty; both endpoints return 200. | Actual domain must be set at build and runtime. Keep indexing disabled until release approval; public metadata needs final-domain verification. |
| QA-05: stale Insights count | The displayed total is one, matching the available guide. | Both locale server responses show `(1)`, with no visible stale `(9)` label. | Client filter/search interaction remains part of Chrome QA. |
| QA-06: lost product reference | Every CTA carries `productId`; project entry shows the matching reference; the API checks membership and adds the canonical product title to the outgoing payload. | All 89 destinations preserve unique IDs in unit tests. Render checks retain the sampled reference; unknown IDs return 422. | Receiver payload receipt has not been tested. These IDs do not establish manufacturer SKUs. |
| QA-07: punctuation-only phone values | Server and native client patterns require 6–15 digits while allowing common international formatting. | Regression tests reject punctuation and excessive digits; production API returns 422. The rendered client pattern compiles with the modern `v` flag and rejects the same bad values. | Browser error presentation and phone ownership are not established by syntax validation. |
| QA-08: reduced-motion cleanup | Counter cancellation restores the exact final metric. Parallax/progress callbacks are cancelled on cleanup; section classes and progress elements are removed. Focused sections are immediately visible. Counter text changes no longer trigger full reveal scans. | Counter cancellation and completion tests pass; production build/type checking passes. | Full-site normal/reduced motion, rapid scrolling and preference changes require Chrome. |
| QA-09: favicon | CI-coloured TM SVG plus a 32px ICO. | Both served assets return 200; ICO structure passes; rendered PNG was inspected. | Browser-tab presentation remains unverified. |
| QA-10: lint warnings | Unused motion variables removed; journey scope uses its supplied surface. | ESLint: zero errors and zero warnings. | None for this finding. |

The project form also resets its controlled readiness and pre-incorporation states after a successful submission, and unknown category-prefill values recover to the placeholder.

## Verification

- Final `npm.cmd run build`: pass, including Next.js TypeScript compilation.
- Standalone `npm.cmd run typecheck`: pass.
- `npm.cmd test`: **22 passed**, including the phone, product reference, counter cancellation and configuration regressions.
- `npm.cmd run lint`: pass with **zero warnings**.
- `check:site`: **16 routes, 268 internal links and 259 rendered assets**; validation, Origin rejection, 404 and explicit unavailable-delivery assertions pass.
- `check:products`: **30 rendered taxonomy destinations and 185 served product images** pass.
- `check:locales`: **16 locale/page combinations** pass. [Current evidence](./locale-results.json). The prior shared locale evidence file was restored after the check.
- [Targeted fix verification](./fix-verification.json): **17 production-response cases** pass.
- `git diff --check`: pass; normal Git LF/CRLF conversion notices only.

The form-enabled render fixture used port 3004 with HTTPS `.invalid` receiver/policy URLs. It was used only for GET/HTML inspection; no valid submission was sent to that fixture or an external processor. All synthetic API submissions used the unconfigured production server on port 3003. The fixture server was stopped after verification.

The [verification script](./verify-fixes.mjs) expects those two server configurations; its first checks require that production intake is unavailable before it reaches the local API cases. Do not point the submission checks at a live configured processor.

## Release configuration

The owner must provide these values; they remain unset:

```dotenv
ENQUIRY_WEBHOOK_URL=
ENQUIRY_WEBHOOK_TOKEN=
PRIVACY_POLICY_URL=
SITE_URL=
SITE_INDEXING_ENABLED=false
```

Set environment values during both build and server start, then rebuild. Some pages/metadata are statically rendered. The receiver must accept multipart data and confirm durable receipt; configure and verify the advertised attachment limits with the intended hosting/receiving services. A structurally valid HTTPS URL does not prove service availability or policy approval.

## Browser and release boundary

Connected-browser discovery still exposes only Edge. Chrome is installed, but its connection or explicit authorisation for the previously offered alternate controller is still pending. No Edge-based visual/motion results were substituted.

This follow-up does not claim a Chrome visual, responsive, accessibility, touch or motion pass. It does not establish legal compliance, public asset publication rights, production Core Web Vitals or confirmed enquiry receipt. The original audit's Chrome test matrix remains outstanding.

**Release verdict: NO-GO pending configuration and Chrome sign-off.**
