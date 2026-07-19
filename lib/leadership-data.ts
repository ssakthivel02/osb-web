export type LeadershipGuide = {
  slug: string;
  title: string;
  summary: string;
  sections: { title: string; items: string[] }[];
};

export const leadershipGuides: LeadershipGuide[] = [
  {
    slug: 'technical-strategy',
    title: 'Technical Strategy',
    summary: 'Translate business outcomes into a sequenced technical direction with explicit constraints, measures and investment choices.',
    sections: [
      { title: 'Context', items: ['Business outcomes and non-negotiable constraints', 'Current-state capability and technical debt', 'External dependencies and regulatory obligations'] },
      { title: 'Strategic choices', items: ['Target capabilities and deliberate exclusions', 'Build, buy, reuse and retire decisions', 'Platform standards and architectural guardrails'] },
      { title: 'Measures', items: ['Outcome metrics rather than activity counts', 'Risk reduction and reliability indicators', 'Adoption, cost and delivery-flow measures'] },
    ],
  },
  {
    slug: 'operating-model',
    title: 'Operating Model',
    summary: 'Define how teams, platforms, controls and support functions work together from demand through live operation.',
    sections: [
      { title: 'Team model', items: ['Clear product, platform and service ownership', 'Decision rights close to accountable teams', 'Boundaries between enablement and delivery'] },
      { title: 'Ways of working', items: ['Standard intake and prioritisation', 'Automated delivery with risk-based controls', 'Operational feedback into product planning'] },
      { title: 'Sustainability', items: ['Support rotation and service ownership', 'Capacity for maintenance and improvement', 'Skills, succession and knowledge transfer'] },
    ],
  },
  {
    slug: 'stakeholder-communication',
    title: 'Stakeholder Communication',
    summary: 'Communicate technical choices in a form that helps executives, delivery teams, security and operations make decisions.',
    sections: [
      { title: 'Message design', items: ['Lead with decision and business impact', 'Separate facts, assumptions, risks and recommendations', 'Use the minimum technical detail needed for the audience'] },
      { title: 'Decision support', items: ['Present credible options and trade-offs', 'State consequences of delay or no decision', 'Record owner, due date and follow-up action'] },
      { title: 'Trust', items: ['Report uncertainty honestly', 'Surface bad news early', 'Close the loop after decisions and incidents'] },
    ],
  },
  {
    slug: 'design-review-pack',
    title: 'Design Review Pack',
    summary: 'Prepare a concise evidence pack that lets reviewers challenge architecture, security, operations, cost and delivery readiness.',
    sections: [
      { title: 'Core artefacts', items: ['Requirements, scope and assumptions', 'Context, container and deployment diagrams', 'Key decisions, risks and open questions'] },
      { title: 'Quality views', items: ['Security and identity model', 'Availability, recovery and observability', 'Cost model and capacity assumptions'] },
      { title: 'Review outcome', items: ['Approved, approved with actions or rejected', 'Named action owners and deadlines', 'Re-review triggers and evidence links'] },
    ],
  },
  {
    slug: 'responsibility-matrix',
    title: 'Responsibility Matrix',
    summary: 'Clarify accountability across architecture, engineering, security, operations, product and suppliers.',
    sections: [
      { title: 'Accountability', items: ['One accountable owner per outcome', 'Responsible roles able to execute the work', 'Consulted roles engaged before irreversible decisions'] },
      { title: 'Lifecycle', items: ['Ownership from design through decommissioning', 'Clear incident and change responsibilities', 'Supplier obligations and escalation paths'] },
      { title: 'Validation', items: ['Remove duplicated accountability', 'Test the model with a realistic incident', 'Review when teams or services change'] },
    ],
  },
  {
    slug: 'transformation-roadmap',
    title: 'Transformation Roadmap',
    summary: 'Sequence capability improvement into measurable increments without pretending every dependency is known upfront.',
    sections: [
      { title: 'Roadmap structure', items: ['Outcomes, capabilities and enabling work', 'Dependencies and critical decisions', 'Near-term commitments with longer-term options'] },
      { title: 'Delivery control', items: ['Quarterly outcome checkpoints', 'Explicit stop, continue and change criteria', 'Risk and capacity reviewed at every increment'] },
      { title: 'Adoption', items: ['Pilot with representative teams', 'Measure usage and friction', 'Fund migration, enablement and retirement work'] },
    ],
  },
];

export const leadershipMap = Object.fromEntries(leadershipGuides.map((guide) => [guide.slug, guide]));
