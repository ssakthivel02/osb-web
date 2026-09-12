export type FundingRoute = {
  id: string;
  name: string;
  provider: string;
  routeType: 'grant' | 'local-commissioning' | 'employer-funded' | 'innovation-partnership';
  geography: string;
  status: 'open' | 'upcoming' | 'ongoing-route';
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
    name: 'VocTech Activate 2027',
    provider: 'Ufi VocTech Trust',
    routeType: 'grant',
    geography: 'UK adult vocational learning',
    status: 'upcoming',
    fit: 'strong',
    amount: '£30,000–£60,000 for projects lasting 3–12 months',
    keyDate: 'Stage 1 opens 5 January 2027 and closes 2 February 2027 at 5pm GMT',
    eligibilitySummary: 'Technology-enabled projects must address an evidenced workforce-skills need and improve adult vocational learning. Ufi states that full 2027 scope and criteria will be published later in 2026 and may change year to year.',
    osbUseCase: 'Best current grant route for piloting and evaluating an evidence-backed digital vocational-learning capability within OSB Training Academy.',
    nextAction: 'Build the problem evidence, target learner profile, measurable outcomes, technical plan, delivery milestones and budget now; re-check the published 2027 guidance before submission.',
    sourceUrl: 'https://ufi.co.uk/grant-funding/voctech-activate/',
    sourceLabel: 'Ufi VocTech Activate official page',
    reviewedOn: '2026-09-11',
    evidenceNote: 'Official Ufi page re-checked 11 September 2026. Upcoming opportunity only; this entry is not an eligibility decision or funding award.',
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
    reviewedOn: '2026-09-11',
    evidenceNote: 'Official GOV.UK allocation table re-checked 11 September 2026. Allocation evidence only; it does not prove an open procurement, provider eligibility or award.',
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
    reviewedOn: '2026-09-11',
    evidenceNote: 'Official GOV.UK transfer guidance and August 2026–July 2027 funding rules re-checked 11 September 2026. Funding mechanism only; no OSB provider eligibility is claimed.',
  },
  {
    id: 'ktp-2026-27-round-3',
    name: 'Knowledge Transfer Partnership (KTP) 2026–27 Round 3',
    provider: 'Innovate UK',
    routeType: 'innovation-partnership',
    geography: 'United Kingdom',
    status: 'open',
    fit: 'partnership',
    amount: 'Round budget up to £12.5 million; eligible project costs are partially grant funded',
    keyDate: 'Opened 13 August 2026; closes 14 October 2026 at 11:00am UK time',
    eligibilitySummary: 'Each application must be led by an eligible UK knowledge base working with a UK registered business and a Knowledge Transfer Adviser. The business cannot apply alone.',
    osbUseCase: 'Possible innovation route for a genuine R&D project around adaptive vocational learning, assessment, AI-assisted labs or training analytics, provided a suitable knowledge-base partner and qualifying business case exist.',
    nextAction: 'Only pursue if a qualifying UK business entity, knowledge-base partner and specific strategic innovation project can be evidenced quickly enough for the current round; otherwise target a later KTP round.',
    sourceUrl: 'https://apply-for-innovation-funding.service.gov.uk/competition/2514/overview/81b3dcb8-7d03-42ed-8b97-5e6e51c4d1ed',
    sourceLabel: 'Innovate UK Innovation Funding Service — KTP Round 3',
    reviewedOn: '2026-09-11',
    evidenceNote: 'Official Innovation Funding Service competition page re-checked 11 September 2026. Open competition evidence only; no eligibility, partnership or award is claimed.',
  },
];

export const fundingEvidencePolicy = {
  reviewedOn: '2026-09-11',
  rule: 'Every funding route is advisory research only until the official source is re-checked immediately before outreach or application.',
  prohibitedClaims: [
    'OSB is eligible',
    'OSB is approved as a provider',
    'funding is guaranteed',
    'an allocation is a direct grant to OSB',
    'a partnership exists unless evidenced separately',
  ],
};
