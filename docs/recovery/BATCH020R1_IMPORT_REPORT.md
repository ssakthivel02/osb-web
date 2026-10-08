# BATCH-020R1 — Verified AD Seed Import Report

## Gate

`BATCH020R1_VERIFIED_SEED_INTEGRATED`

This batch deliberately imports only evidence that physically exists. It does **not** reinstate the unverified historical 4,550-record claim.

## Physical seed evidence

- Seed archive: `OSB_TRAINING_ACADEMY_REAL_CORPUS_COWORK.zip`
- Exact bytes: `78,261`
- SHA-256: `a1d53ee3f4650e3304ea32d38d830d79743d01e17cb6ce628c662d195f58b0ce`
- ZIP entries: 59 total entries, of which 39 are physical files and 20 are directory entries.
- Canonical track taxonomy: 19 tracks.
- Physically populated tracks: 1 (`OSB-TRACK-AD`).
- Learning paths: 1 partial AD specialist path.
- Primary source records: 13 Microsoft Learn entries.
- Source corpus relationships: 142 (`50 PREREQUISITE_OF`, `92 CROSS_LINK`).

## Learner records now physically committed to this branch

Total: **44**

| Type | Count |
| --- | ---: |
| LESSON | 5 |
| EASY_LEARN | 5 |
| DEEP_DIVE | 5 |
| LAB | 5 |
| TROUBLESHOOTING | 5 |
| ASSESSMENT | 10 |
| INTERVIEW | 5 |
| CAPSTONE | 1 |
| VISUAL_SPEC | 3 |

## Runtime integration

A fail-closed server-side corpus loader now lives at `lib/training-academy/index.ts`. It reads the physical JSON/JSONL corpus, sorts record IDs deterministically and rejects duplicate or missing IDs instead of silently continuing.

The `/academies` page now exposes verified physical-corpus counts separately from the older website experience catalogue. This prevents the scaffold/navigation inventory from being presented as proof of curriculum completion.

## Automated validation

`npm run validate:corpus` validates:

- exact 44-record seed count and per-type breakdown;
- 19-track taxonomy;
- exactly one populated track for this recovery seed;
- one physical learning path;
- 13 source records;
- duplicate record IDs;
- record-to-track/topic/source references;
- prerequisites and related-record references;
- learning-path milestone/capstone/assessment/interview references.

The pull-request workflow now runs the pre-existing Python baseline/safety checks, installs Node dependencies, runs `validate:corpus`, runs TypeScript typechecking and performs a production Next.js build.

### GitHub Actions evidence

Workflow run `34416356195`, on branch head `8c09aa1ade6bf3170d2bc3d033272ed77b08832e`, completed the following successfully:

- web baseline validation;
- web safety cases;
- dependency install;
- `npm run validate:corpus`;
- `npm run typecheck`;
- `npm run build`.

The corpus validator reported: 44 records, 19-track taxonomy, 1 populated track (`OSB-TRACK-AD`), 1 learning path, 13 sources, 0 duplicate IDs and 0 broken references. Safety-tagged records were 4 SAFE_GUIDED_CHANGE, 1 SANDBOX_ONLY, 2 READ_ONLY and 3 HIGH_IMPACT.

The production build compiled successfully and generated 2,886 static pages.

## Remaining evidence gaps / next gate

- Eighteen canonical tracks still have no physically integrated learner corpus under this evidence-first recovery baseline.
- The original seed's 142 relationships remain source evidence; this batch validates record-level relationships from prerequisites/related IDs but has not yet copied the seed's standalone `relationships.jsonl` into the web data tree.
- The dependency install reports that Next.js `14.2.31` is affected by a published security vulnerability and should be upgraded to a patched supported release before any production gate.
- The existing product scaffold contains many generated navigation/experience routes; their existence is not counted as verified curriculum content.

No merge to `main`, preview promotion, production deployment or mobile work is authorized by this report.
