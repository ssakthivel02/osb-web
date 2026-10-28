# OSB — Controlled recovery and emergency rollback decision record
Status: **DESIGN + SYNTHETIC LINEAGE TEST ONLY / HUMAN EMERGENCY RECOVERY DRILL NOT RUN / PRODUCTION HOLD**

## Verified deployment boundary
Production uses GitHub Pages through `.github/workflows/deploy-pages.yml` after the successful `Validate Web Baseline` workflow on `main`. Production authorization is checked again immediately before building and deploying. The repository's `scripts/lib/verify-production-promotion.mjs` only permits modifications to four listed release JSON files between the **exact UAT candidate SHA** and **deployment SHA**. A normal `git revert` that changes application files is not an authorized rollback under this mechanism.

## What the synthetic test proves — and does not
`node scripts/test-emergency-rollback-lineage.mjs` constructs disposable local Git commits to show:
1. Forward approval-only promotion from a tested application candidate passes the lineage validator.
2. Reverting the application to previously released bytes **fails** promotion against the earlier UAT candidate and prior approval commit. Git history and bytes alone do not constitute new authorization.
3. Restoring the old content **as a new candidate**, then committing approval-metadata-only changes **after separate testing and review**, passes the same structural lineage validator.

All evidence/approval states in this test are **synthetic placeholders**. This test does **not** assert that security, real UAT, content rights, actual GitHub Pages rollback, deployment artefact retention, or the emergency time-to-restore objective have been validated. A green CI test alone is not incident preparedness.

## Controlled restoration procedure (non-emergency / when time permits)
- Identify the last known-good production GitHub Pages run, source commit, domain and validated page content. Preserve immutable evidence and obtain authorized incident ownership.
- Restore that earlier application's files on a **new prospective commit** based on the current release history (do not force-push `main`; keep approval flags `HOLD`). Have an independent code review verify the intended restoration and check that all previous existing links survive.
- Run exact-head CI and acquire a **new hosted UAT candidate SHA** for that restored tree, using the same isolated UAT host and full provenance. Complete the real accessibility, learner-journey, mobile/browser, funding/legal and Tamil-content checks, including any changed-content risks.
- Obtain independent owner acceptance. Create an **approval-only** successor commit changing the listed release JSON files. Only after all GitHub governance and permissions gates are evidenced may the normal guarded Pages pipeline promote the requalified site.
- Verify the deployed Pages domain and version; document results and incident closure.

**This is not a rapid failover mechanism.** The old assertion that simply reverting a merge automatically republishes the prior website is not valid under the current guard.

## Missing pre-production operational work
A proper emergency mechanism (for example, approved restoration of an immutable known-good Pages artifact through a separately designed, restricted and audited workflow) needs **human architecture/security review, environment protection, permissions design, reliable artifact availability, a live isolated drill and recovery-time evidence**. Do not add a privileged bypass or manually disable forward-release safeguards without that review. Until then, record emergency rollback as **NOT REHEARSED** and maintain `HOLD / NO-GO`.

This file is documentation + synthetic evidence, not production authorization. All on-site Tamil text, previous navigation hrefs, hostnames and production flags remain unchanged.
