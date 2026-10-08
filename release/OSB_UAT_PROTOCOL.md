# OSB Training Academy — Release/UAT Protocol

Status: mandatory before production release or any claim that the website is production-ready.

## Evidence boundary

Repository CI can prove that source-level validation, safety tests, corpus integrity, TypeScript checks and the production build succeed. It cannot by itself prove browser usability, accessibility, responsive behavior, learner comprehension, employer acceptance, funding eligibility, safeguarding/legal compliance or production readiness.

## Required preview/UAT gates

1. Build and serve the exact candidate commit intended for release.
2. Record exact repository, branch, commit SHA, date, tester and environment.
3. Validate critical journeys: Home -> Training Academy -> record -> source -> relationship -> back navigation; Academies; Career; Resources; Funding; and all primary header/footer navigation.
4. Validate keyboard-only navigation, visible focus, heading hierarchy, landmarks, form labels where applicable, descriptive links, zoom/reflow and no keyboard traps.
5. Validate representative responsive widths covering mobile, tablet and desktop; verify no clipped navigation, horizontal overflow, obscured actions or unreadable cards.
6. Validate at least Chromium, Firefox and WebKit/Safari-equivalent browser families on the same candidate commit.
7. Validate broken-link behavior for internal routes and the official external funding/source links used in the candidate.
8. Confirm corpus figures displayed in the UI equal the machine-validated physical repository counts. Planned tracks must remain clearly separated from populated tracks.
9. Confirm funding wording stays claim-safe: candidate route does not mean eligibility, provider approval, partnership, award or guaranteed funding.
10. Record every defect with severity, reproduction steps, evidence and disposition. P0/P1 defects block release; unresolved P2 defects require explicit owner risk acceptance.
11. Re-run automated CI after any remediation and repeat impacted UAT journeys.
12. Obtain explicit owner release approval only after the final exact candidate passes all mandatory gates.

## Required evidence record

For each UAT run record: exact SHA, preview URL/environment, browser/device matrix, journey results, accessibility results, responsive results, external-link review date, defects, screenshots/log references where available, reviewer/tester identity, and final decision.

## Decision states

- `HOLD`: any mandatory evidence absent, CI failing, server-side GitHub protection unverified, P0/P1 defect open, or owner approval absent.
- `CONDITIONAL_GO`: technical UAT passes but a separately governed production dependency remains pending.
- `PROD_GO`: only after all applicable technical, operational, governance and owner-approval gates are evidenced for the exact release candidate.

No document in this repository may self-certify legal compliance, safeguarding certification, funding eligibility, employer partnership, learner outcomes or production readiness without the corresponding external evidence.
