# OSB Training Academy — Pre-UAT Release Readiness Evidence

Status: **AUTOMATED PRE-UAT ONLY — PRODUCTION HOLD**

## Verified baseline before this control

- Repository: `ssakthivel02/osb-web`
- Evidence branch: `agent/batch017-website-productization`
- Last fully validated head before this control: `cf2daf753685b189df28797251c301c1862eb3c6`
- GitHub Actions run #137: PASS
- 334 physical learner records
- 219 registered sources
- 19/19 canonical tracks populated
- 19/19 structured learning paths
- 19/19 capstones
- 1,464 validated relationships

## What the automated pre-UAT gate checks

1. All 19 canonical tracks have structured learning-path coverage.
2. All 19 canonical tracks have a physical capstone record.
3. Search and Training Academy routes are backed by the verified repository corpus.
4. Record and track dynamic pages enumerate static params and retain `notFound` boundaries.
5. Root document declares language and key learner/search surfaces include basic semantic prerequisites such as main landmarks, primary headings, an explicit search label and an aria-live result region.
6. The UAT protocol continues to require keyboard, responsive, Chromium, Firefox and WebKit/Safari-equivalent validation.
7. If any manual release gate or server-side-protection evidence is incomplete, production status must remain `HOLD`.

## What this does NOT prove

This check does **not** certify WCAG conformance, keyboard usability in a real browser, focus visibility, zoom/reflow, responsive layouts, cross-browser behavior, external-link freshness, funding eligibility, safeguarding/legal compliance, learner outcomes, employer acceptance, GitHub branch protection, owner release approval or production readiness.

Those remain manual/external evidence requirements under `release/OSB_UAT_PROTOCOL.md` and `release/OSB_RELEASE_GATE.json`.

## Release decision

`HOLD` until all manual gates, GitHub/server-side protection evidence and explicit owner release approval are completed for the exact final candidate SHA.
