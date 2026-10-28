# OSB Training Academy — BATCH-020R Evidence Reset

Date: 2026-09-09
Branch: `agent/batch017-website-productization`

## Purpose

This checkpoint replaces narrative-only release assumptions with a physical-evidence baseline.

## Verified physical evidence available to ChatGPT

- Artifact: `OSB_TRAINING_ACADEMY_REAL_CORPUS_COWORK.zip`
- Exact bytes: `78,261`
- SHA-256: `a1d53ee3f4650e3304ea32d38d830d79743d01e17cb6ce628c662d195f58b0ce`
- ZIP entries: `59`
- Physical learner records: `44`
- Track with real learner content: Active Directory only
- Canonical track taxonomy present: `19`
- Populated learning paths: `1` partial AD path
- Source records: `13`, all primary in the pilot
- Relationships: `142`
- Duplicate IDs: `0`
- Broken references: `0`
- Unsafe active records: `0`
- Schema errors: `0`

Learner-type breakdown:

- LESSON: 5
- EASY_LEARN: 5
- DEEP_DIVE: 5
- LAB: 5
- TROUBLESHOOTING: 5
- ASSESSMENT: 10
- INTERVIEW: 5
- CAPSTONE: 1
- VISUAL_SPEC: 3

## Claims explicitly NOT accepted as physical evidence

The previously reported `4,550 learners / 19 populated tracks / 48 paths` BATCH-017/BATCH-018/BATCH-019B1 website corpus is not physically available in ChatGPT, Gemini, or Claude Cowork. The reported `1,245 ADD / 28 UPDATE / 12 DELETE / 0 REVIEW` integration manifest is therefore not currently reproducible and must not be used for repository mutation.

`OSB_TRAINING_ACADEMY_GITHUB_INTEGRATION_BATCH019B1.zip` is classified as **SOURCE_NOT_FOUND**. No files may be deleted based on the old narrative manifest.

## Live repository state at reset

- `main`: `f093af5a8f29cb5015b05ea6e25301a4cb727fcd`
- integration branch before this checkpoint: `10fe9302cdc62d91e4bb829a6e1fb869d9e1f7be`
- Draft PR: #2
- `package.json` on the branch is still version `0.1.0`
- repository is still the pre-RC scaffold/product baseline; the missing 4,550-record RC is not present.

## Recovery decision

Proceed with an evidence-first GitHub-native recovery instead of continuing to search for a non-existent package.

Recovery order:

1. Preserve current `main` and Draft PR #2; never merge during recovery.
2. Import the physically verified BATCH-001 AD pilot as the first canonical corpus seed.
3. Build a deterministic corpus loader and validation scripts around physical JSON/JSONL data.
4. Expose verified-record counts in the website UI; never display narrative counts as canonical.
5. Reconstruct the remaining tracks in bounded, source-backed batches with physical artifacts committed to GitHub.
6. Every batch must pass schema, duplicate-ID, broken-reference, safety, version, route, build, and source-provenance gates before the next batch.
7. Only after all 19 tracks exist physically and tests pass may the release candidate version be promoted from `0.1.0`.
8. Preview/UAT comes after the physical corpus and website source are in GitHub. Production requires explicit owner approval.

## Gate

`BATCH020R_RECOVERY_BASELINE_ESTABLISHED`

Next task: `OSB-TRAINING-ACADEMY-BATCH-020R1-IMPORT-VERIFIED-AD-SEED-AND-CORPUS-LOADER`.
