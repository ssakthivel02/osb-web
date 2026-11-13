export type FundingRoute = {
  id: string;
  name: string;
  provider: string;
  routeType: 'grant' | 'local-commissioning' | 'employer-funded' | 'innovation-partnership';
  geography: string;
  status: 'open' | 'upcoming' | 'ongoing-route' | 'closed';
  opensAt?: string;
  closesAt?: string;
  fit: 'strong' | 'conditional' | 'partnership';
  amount: string;
  keyDate: string;
  eligibilitySummary: string;
  osbUseCase: string;
  nextAction: string;
  sourceUrl: string;
  sourceLabel: string;
  reviewedOn: string;
  evidenceNote: string;
};

export const fundingRoutes: FundingRoute[] = [
  {
    id: 'ufi-voctech-activate-2027',
    name: 'VocTech Activate 2027 — announced January round',
    provider: 'Ufi VocTech Trust',
    routeType: 'grant',
    geography: 'UK adult vocational learning',
    status: 'upcoming',
    opensAt: '2027-01-05T00:00:00Z',
    closesAt: '2027-01-25T17:00:00Z',
    fit: 'conditional',
    amount: '£30,000–£60,000 for projects lasting 3–12 months',
    keyDate: 'Stage 1 opens 5 January 2027 and closes 25 January 2027 at 5pm GMT; invitation-only Stage 2 deadline is 6 April 2027 at 5pm GMT.',
    eligibilitySummary: 'A UK organisation must have direct access to intended vocational learners, relevant employer or sector relationships, and technical delivery capacity. A genuinely new or significantly improved learning-technology approach must address evidenced workforce and employment needs. Routine content expansion and projects solely above Level 3 are excluded. OSB eligibility is not established.',
    osbUseCase: 'Potential pilot of an innovative, measurable workplace-learning approach with identified adult learners and employers, not a grant for routinely adding training modules.',
    nextAction: 'Run the official Ufi eligibility checker, confirm a qualifying applicant, target qualification levels, direct learner access and committed employer relationships, then assemble evidence of novelty, learner outcomes and sustainability before applying.',
    sourceUrl: 'https://ufi.co.uk/grant-funding/voctech-activate/',
    sourceLabel: 'Ufi VocTech Activate 2027 official call',
    reviewedOn: '2026-11-12',
    evidenceNote: 'Official Ufi call reviewed 12 November 2026: 2027 Stage 1 application window is 5–25 January 2027. Status is UPCOMING as of this review, not open. Grant and conditions are programme facts, not OSB eligibility, partnership, application or award evidence.',
  },
  {
    id: 'solent-skills-bootcamps-2026-27',
    name: 'Skills Bootcamps — Portsmouth City Council (Solent) 2026–27 allocation',
    provider: 'Department for Work and Pensions / Portsmouth City Council (Solent)',
    routeType: 'local-commissioning',
    geography: 'Portsmouth / Solent, England',
    status: 'ongoing-route',
    fit: 'partnership',
    amount: '£1.5 million maximum local allocation for 2026–27, including a £400,000 ringfenced construction element',
    keyDate: '2026–27 funding year; local commissioning/procurement timing must be confirmed with the authority',
    eligibilitySummary: 'The published figure is a local authority allocation, not a direct grant entitlement to OSB. Delivery normally depends on local procurement, commissioning and employer-co-designed provision.',
    osbUseCase: 'Potential route for employer-linked digital infrastructure, cloud, DevOps or cyber upskilling if the authority commissions a suitable lot and OSB can meet provider requirements.',
    nextAction: 'Track Portsmouth/Solent commissioning notices, map OSB courses to priority skills needs, prepare employer evidence and determine whether to bid directly or through an eligible training-provider partner.',
    sourceUrl: 'https://www.gov.uk/government/publications/skills-bootcamps-funding-allocations/skills-bootcamps-funding-allocations-2026-to-2027',
    sourceLabel: 'GOV.UK Skills Bootcamps funding allocations 2026–27',
    reviewedOn: '2026-11-12',
    evidenceNote: 'Official GOV.UK allocation table re-checked 12 November 2026. Portsmouth City Council (Solent) remains listed at £1.5 million maximum allocation including £400,000 ringfenced construction. Allocation evidence only; it does not prove an open procurement, provider eligibility or award.',
  },
  {
    id: 'apprenticeship-levy-transfer-england-2026',
    name: 'Apprenticeship levy transfer',
    provider: 'Department for Work and Pensions',
    routeType: 'employer-funded',
    geography: 'England',
    status: 'ongoing-route',
    fit: 'conditional',
    amount: 'Levy-paying employers can currently transfer up to 50% of the previous tax year levy amount, subject to the funding rules',
    keyDate: 'Ongoing route under the August 2026–July 2027 apprenticeship funding rules',
    eligibilitySummary: 'Transferred funds pay for eligible apprenticeship training and assessment. OSB would need an appropriate apprenticeship delivery model and all applicable provider, standard, account and funding-rule requirements.',
    osbUseCase: 'Longer-term employer-funded route if selected OSB learning tracks are mapped into recognised apprenticeship delivery rather than sold as ordinary short courses.',
    nextAction: 'Do not market OSB as levy-funded yet. First identify a suitable apprenticeship standard and delivery partnership, then verify provider eligibility, funding-band and employer-transfer requirements.',
    sourceUrl: 'https://www.gov.uk/guidance/transferring-your-apprenticeship-levy-to-another-business',
    sourceLabel: 'GOV.UK apprenticeship levy transfer guidance',
    reviewedOn: '2026-11-12',
    evidenceNote: 'Official GOV.UK levy-transfer guidance re-checked 12 November 2026. Current guidance still states a 50% transfer allowance from the previous financial year’s apprenticeship levy funds. Funding mechanism only; no OSB provider eligibility is claimed.',
  },
  {
    id: 'ktp-2026-27-round-4',
    name: 'Knowledge Transfer Partnership (KTP) 2026–27 Round 4',
    provider: 'Innovate UK',
    routeType: 'innovation-partnership',
    geography: 'United Kingdom',
    status: 'open',
    opensAt: '2026-10-19T00:00:00+01:00',
    closesAt: '2027-01-27T11:00:00Z',
    fit: 'partnership',
    amount: 'Competition budget up to £12.5 million; eligible project costs are partially grant funded',
    keyDate: 'Opened 19 October 2026; closes 27 January 2027 at 11:00am UK time.',
    eligibilitySummary: 'The lead applicant must be an eligible UK registered higher/further education institution, RTO or Catapult partnering with a UK registered business. An Innovate UK Knowledge Transfer Adviser is required and the business contributes to project costs. A business cannot apply alone; OSB eligibility and partners are unverified.',
    osbUseCase: 'Potential innovation partnership around adaptive vocational learning, assessment or training analytics only if the project delivers a strategic, novel business capability with a qualifying knowledge-base and UK business partner.',
    nextAction: 'Confirm an eligible UK knowledge-base lead, UK registered business partner and Knowledge Transfer Adviser; establish business contribution, strategic innovation and application readiness before the 27 January deadline. Do not claim OSB is eligible or partnered.',
    sourceUrl: 'https://apply-for-innovation-funding.service.gov.uk/competition/2605/overview/4b82d27a-2794-457c-8dc7-7ec4f6911c84',
    sourceLabel: 'Innovate UK Innovation Funding Service — KTP Round 4',
    reviewedOn: '2026-11-12',
    evidenceNote: 'Innovate UK official Round 4 brief reviewed 12 November 2026: open 19 October 2026, closes 27 January 2027 at 11am UK time, £12.5m competition budget. No OSB business-partner status, eligible lead, KTA engagement or award is evidenced.',
  },
];

export const fundingEvidencePolicy = {
  reviewedOn: '2026-11-12',
  maxReviewAgeDays: 30,
  rule: 'Every funding route is advisory research only until the official source is re-checked immediately before outreach or application.',
  prohibitedClaims: [
    'OSB is eligible',
    'OSB is approved as a provider',
    'funding is guaranteed',
    'an allocation is a direct grant to OSB',
    'a partnership exists unless evidenced separately',
  ],
};
