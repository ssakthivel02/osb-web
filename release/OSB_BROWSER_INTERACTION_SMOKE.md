# OSB Training Academy — Chromium Interaction Smoke Evidence

Status: **AUTOMATED BROWSER SMOKE ONLY — PRODUCTION HOLD**

## Purpose

This control adds a pinned Chromium interaction smoke against the exact built static export. It is deliberately narrower than full UAT and does not change any manual release gate.

## Execution model

- Build the production static export with `next build`.
- Serve `out/` locally over HTTP.
- Install `playwright@1.55.0` transiently in CI using `--no-save --no-package-lock`.
- Install Chromium for that pinned Playwright version.
- Execute `scripts/validate-browser-smoke.mjs` against the served export.

## Automated interaction checks

1. Search page hydrates and accepts a real query.
2. Enter submits the search form and updates the aria-live result count.
3. A no-match query renders the verified zero-result state.
4. Catalogue-to-track navigation works through a real browser click.
5. Track-to-record navigation works through keyboard Enter activation on a focused link.
6. Navigated track/record pages expose a visible primary heading.
7. Basic browser `pageerror` events are captured during an additional search interaction.

## Explicit claim boundary

A passing Chromium smoke does **not** certify:

- WCAG conformance;
- complete keyboard usability or focus order/visibility;
- zoom/reflow or responsive behaviour;
- Firefox or WebKit/Safari-equivalent parity;
- screen-reader behaviour;
- funding/provider claims;
- safeguarding/legal compliance;
- owner release approval;
- GitHub/server-side protection;
- production readiness.

Those remain governed by `release/OSB_UAT_PROTOCOL.md`, `release/OSB_UAT_EVIDENCE.json`, and `release/OSB_RELEASE_GATE.json`.

## Release decision

`HOLD` until the manual/external gates are completed against the exact final candidate SHA.
