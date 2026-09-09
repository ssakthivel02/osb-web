# BATCH019B1 Integration Control

Status: `AWAITING_VERIFIED_INTEGRATION_PACKAGE`

Target branch: `agent/batch017-website-productization`

Expected verified package:
- `OSB_TRAINING_ACADEMY_GITHUB_INTEGRATION_BATCH019B1.zip`
- version: `0.9.0-rc.1`
- learner records: `4550`
- canonical tracks: `19`
- learning paths: `48`
- manifest: `1245 ADD / 28 UPDATE / 12 DELETE / 0 REVIEW`
- duplicate learner IDs: `0`
- broken references: `0`

Release controls:
- Do not merge to `main` until the physical integration package is applied and validated.
- Do not deploy production from this branch until clean install, lint/typecheck/tests/build, route/corpus validation, preview deployment, 19-track UAT, 48-path UAT, security/accessibility checks, and owner approval are complete.
- Real authentication and cloud sync remain out of scope for the current local-first RC unless separately implemented and validated.

Next action: apply the verified BATCH019B1 package to this branch, validate from source, push the resulting commit(s), then continue PR/CI/preview/UAT.
