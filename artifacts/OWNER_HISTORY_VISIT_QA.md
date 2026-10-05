# Owner history and visit update QA

Date: 5 October 2026 (Asia/Bangkok)
Target: local production server, http://127.0.0.1:3000
Scope: company milestones, factory visit copy, shared footer, visit enquiry route.

## Browser verification

- Edge desktop and 390 × 844 mobile viewport inspected with screenshots and DOM/accessibility snapshots.
- All five milestones are present with correct Buddhist/Gregorian year pairs: 2541/1998, 2542/1999, 2545/2002, 2555/2012, 2557/2014.
- Timeline text wraps within the mobile container; no page-level horizontal overflow observed.
- Contact visit panel contains Monday–Friday, 10:00–12:00 and 13:00–15:00, three-day advance notice and callback confirmation in both languages.
- Shared footer displays the same visit requirements, separately from operating hours.
- Contact query `?inquiry=visit` selects Factory visit.
- Contact inspected at 1440 × 900 and 390 × 844; no page-level horizontal overflow or overlapping visit copy observed.
- No warning/error console entries captured on the inspected pages.
- Contact form controls have associated labels. Visible contact images finished loading without broken images.

## Finding

Medium, content clarity: the Arrange a factory visit link is inside the Saturday operating-hours card on the contact page. This can imply Saturday visits despite the Monday–Friday visit protocol directly below it. Suggested remedy: move the link into the visit protocol panel. No source fix applied during this review-only QA.

## Limits

This is targeted QA, not a full accessibility audit or visual review of every route. Contrast ratios and exhaustive keyboard navigation were not measured. Owner-provided business claims were checked against the supplied update, not independently authenticated. Email delivery remains unconfigured as covered by the existing site check.
