# OSB Training Academy — 19-Track Closure Audit

Date: 2026-09-11
Status: **TECHNICAL CORPUS GREEN / PRODUCT RELEASE HOLD**

## Verified baseline

The exact curriculum head `c90eccbed909a0f8a47723af659248f3bafcba0e` passed GitHub Actions run #131 before this closure-hardening batch began.

- 317 physical learner records
- 219 registered sources
- 109 topics
- 19 canonical tracks
- 19 physically populated tracks
- 2 structured evidence-backed learning paths
- 2 capstones
- 1,294 deterministic relationships
  - 592 prerequisite relationships
  - 702 cross-links
- 0 duplicate record IDs
- 0 duplicate relationship IDs
- 0 broken references

## What 19/19 means — and what it does not mean

Every canonical track now has physical learner content. This proves taxonomy population, not full learner-journey closure.

Only Active Directory and Windows/Wintel currently have structured canonical learning paths and capstones. The other tracks must not be described as end-to-end pathway complete until equivalent evidence-backed paths and integrated capstones exist or an explicit product decision defines a different completion model.

## Closure defects found

1. **Search was non-functional.** `/search` rendered an input/button but did not execute any search and was backed by a separate four-item marketing array.
2. **Track discovery was split from the verified corpus.** `/tracks` used the same four-item marketing array rather than the 19 canonical Training Academy tracks.
3. **Verified track records lacked a dedicated track browse route.** Individual records were available, but a learner could not browse one canonical track from the evidence-backed corpus.
4. **Release narrative drifted.** PR #2 still described an old R3C state despite the corpus reaching 317 records and 19/19 populated tracks.
5. **Learner-journey closure is incomplete.** Only 2/19 tracks have canonical learning-path coverage and only 2/19 tracks have capstones.
6. **Manual production gates remain open.** Preview/UAT, accessibility, responsive/cross-browser review, critical learner journeys, claims review and owner approval are not complete; GitHub/server-side protection evidence is also not verified.

## R22 closure-hardening scope

This batch:

- makes `/search` query the verified Training Academy corpus;
- makes `/tracks` enumerate the canonical 19-track corpus;
- adds `/training-academy/tracks/[trackId]/` pages for track-level evidence browsing;
- corrects stale copy in the Training Academy catalogue;
- adds a machine-readable closure audit to CI;
- preserves production status as **HOLD** whenever known closure/manual blockers remain;
- updates PR #2 metadata to the real validated corpus state.

## Explicitly deferred

This batch does **not** fabricate 17 new learning paths or capstones. Those require deliberate sequencing, milestone design, integrated assessment/capstone criteria and evidence review per track.

It also does not mark accessibility, cross-browser, preview/UAT, server-side protection, owner approval or production deployment as complete without direct evidence.

## Release rule

A green build is necessary but not sufficient. Production remains **HOLD** until both automated and manual release evidence are complete and the owner explicitly approves release.
