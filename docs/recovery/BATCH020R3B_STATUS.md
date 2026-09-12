# BATCH-020R3B — AD Recovery and Delegation Hardening

Status: CI_PENDING

This batch extends the evidence-backed Active Directory corpus without altering the independently verified 44-record seed.

## Physical delta

- Added learner records: 8
- Corpus total expected by CI: 62
- Added primary Microsoft Learn sources: 4
- Source register total expected by CI: 23
- Added topics: 2
- Knowledge-graph relationships expected by CI: 199
  - PREREQUISITE_OF: 71
  - CROSS_LINK: 128

## Coverage added

- Domain Controller System State backup and trusted recovery-point selection
- Authoritative vs nonauthoritative AD DS restore semantics
- Safe lab backup creation and verification
- Deleted-object recovery decision path
- OU design and least-privilege delegated administration
- Senior recovery/delegation assessment and interview scenarios

## Safety controls

- Production restore commands are not presented as routine operations.
- Backup lab is classified SAFE_GUIDED_CHANGE and performs no restore.
- Recovery troubleshooting is READ_ONLY and explicitly requires approved incident/change control before authoritative restore.
- The independently hashed seed provenance remains enforced in CI.

## Release controls

- Branch: `agent/batch017-website-productization`
- Draft PR: #2
- No merge to `main`.
- No production deployment.
- Gate may move to PASS only after corpus validation, typecheck and production build succeed on the final batch commit.
