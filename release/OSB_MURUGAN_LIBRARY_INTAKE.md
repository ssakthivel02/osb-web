# OSB Tamil Murugan Library — Source-aware intake

**Status: content pending human approval; production HOLD.**

This is a new self-contained /murugan-library/ route in the existing OSB Academy app. It does NOT replace or rewrite existing navigation links, DNS, published site assets or the separate OmSaravanaBhava site. The new pages are noindex pending approval.

- **12 complete Tiruppugazh Tamil texts**: original OmSaravanaBhava source-linked reader files 0006 through 0017. Imported as real Unicode verse text without AI reconstruction. The source's internal record says song 0006 was manually checked before original publication; the governed inventory recognizes all twelve as existing source-linked records. Cross-site publication still requires rights/editorial review.
- **Kanda Sashti Kavasam**: only the source-linked reviewed opening extract from the previous user-provided compilation. Not a complete critical edition.
- **16 classical/related books**: titles only; verse body withheld pending verified edition/rights assessment.
- **6 modern Murugan songs**: metadata/title only; no lyrics or audio without rights-holder permission.
- No external href values in the new pages, no scraped lyrics, invented verse text, modern recordings or changed links in existing site navigation.

Private governed source archive: existing OmSaravanaBhava Drive files. Public pages display source filenames but not private Drive URLs/IDs. Retain exact source IDs and review decisions in the owner's private release-control register.

### Publication acceptance criteria
1. Owner confirms this belongs in OSB Learning as well as the dedicated OmSaravanaBhava literature site; avoid unintended canonical/SEO duplication.
2. Tamil editor checks each imported song word-for-word against approved source edition and validates numbering.
3. Rights reviewer confirms underlying classical text, particular transcription/edition and cross-site publication. Modern songs/recordings remain withheld.
4. All 13 reader pages display actual text, with accurate partial/full labels. Existing site links remain unchanged.
5. node scripts/test-murugan-library.mjs passes, followed by the full exact-head GitHub CI, static export and Chromium/Firefox/WebKit matrix.
6. Exact qualified export is validated on isolated SSO UAT; human UAT, content/rights, security/governance and owner GO are still mandatory.

The present slice is not a claim that all Murugan books and songs have been published.
