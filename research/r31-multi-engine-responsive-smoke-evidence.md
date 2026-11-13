# R31 — Automated Multi-Engine Responsive Smoke Evidence

## Purpose

This evidence layer validates the exact built static export in three Playwright browser engines (Chromium, Firefox, WebKit) across mobile, tablet and desktop viewport sizes.

## Automated coverage

The matrix runs nine browser/viewport scenarios and verifies:

- hydrated search interaction and `aria-live` result updates;
- keyboard `Enter` activation from catalogue → track → learner record;
- visible primary headings after navigation;
- no document-level horizontal overflow at 390×844, 768×1024 and 1440×900;
- basic browser `pageerror` detection.

## Claim boundary

A passing matrix is automated compatibility evidence only. It does **not** constitute:

- manual UAT;
- WCAG conformance certification;
- full keyboard/focus-order or focus-visibility review;
- screen-reader testing;
- exhaustive responsive design approval;
- device-lab testing;
- funding/legal/claims approval;
- owner release approval.

Production therefore remains HOLD until the repository's separate manual/external release gates are completed and evidenced.
