export type DeliveryGuide = {
  slug: string;
  title: string;
  summary: string;
  sections: { title: string; items: string[] }[];
};

export const deliveryGuides: DeliveryGuide[] = [
  {
    slug: 'reference-architecture',
    title: 'Reference Architecture',
    summary: 'A reusable architecture pattern with explicit boundaries, trust zones, dependencies and operational assumptions.',
    sections: [
      { title: 'Context', items: ['State the business capability and users', 'Define trust boundaries and data classifications', 'Record scale, latency, resilience and recovery needs'] },
      { title: 'Architecture', items: ['Show components and responsibility boundaries', 'Document identity, network and data flows', 'Identify managed services, shared platforms and external dependencies'] },
      { title: 'Operations', items: ['Define monitoring and alert ownership', 'Describe deployment and rollback paths', 'Record backup, recovery and support expectations'] },
    ],
  },
  {
    slug: 'implementation-blueprint',
    title: 'Implementation Blueprint',
    summary: 'A delivery sequence that converts an approved design into controlled, testable and supportable implementation.',
    sections: [
      { title: 'Foundation', items: ['Confirm prerequisites and access', 'Create repositories, environments and naming conventions', 'Establish identity, secrets and policy controls'] },
      { title: 'Build', items: ['Deliver the smallest testable slice first', 'Automate repeatable configuration', 'Capture logs, plans, manifests and evidence'] },
      { title: 'Release', items: ['Validate non-functional requirements', 'Run rollback and recovery checks', 'Complete operational handover and acceptance'] },
    ],
  },
  {
    slug: 'acceptance-criteria',
    title: 'Acceptance Criteria',
    summary: 'Measurable conditions that prevent vague completion claims and expose missing quality evidence.',
    sections: [
      { title: 'Functional', items: ['Expected behaviour is testable', 'Failure paths and validation rules are covered', 'Dependencies and integration contracts are verified'] },
      { title: 'Non-functional', items: ['Performance and scale thresholds are defined', 'Security and compliance controls are evidenced', 'Availability, backup and recovery targets are tested'] },
      { title: 'Operational', items: ['Monitoring and alerting are active', 'Runbooks and ownership are confirmed', 'Deployment, rollback and support processes are rehearsed'] },
    ],
  },
  {
    slug: 'anti-patterns',
    title: 'Anti-patterns',
    summary: 'Common implementation shortcuts that create hidden cost, fragility, security exposure or operational dependence.',
    sections: [
      { title: 'Design', items: ['Choosing tools before requirements', 'Creating shared failure domains without justification', 'Ignoring ownership and lifecycle boundaries'] },
      { title: 'Delivery', items: ['Manual production changes without reproducible automation', 'Rebuilding artefacts between environments', 'Treating successful deployment as successful service'] },
      { title: 'Operations', items: ['Alerting on symptoms without actionable context', 'Keeping undocumented privileged access', 'Relying on backups that have never been restored'] },
    ],
  },
  {
    slug: 'decision-tree',
    title: 'Troubleshooting Decision Tree',
    summary: 'A disciplined diagnostic flow that narrows scope before making changes and preserves evidence.',
    sections: [
      { title: 'Triage', items: ['Confirm impact, start time and recent change', 'Separate user, application, platform and dependency symptoms', 'Check known-good paths and control-plane health'] },
      { title: 'Diagnose', items: ['Follow request flow across identity, DNS, network, compute and data', 'Compare expected and actual configuration', 'Use logs, metrics, traces and events to test hypotheses'] },
      { title: 'Recover', items: ['Choose rollback, mitigation or forward fix explicitly', 'Validate service and customer outcomes', 'Preserve timeline, evidence and follow-up actions'] },
    ],
  },
  {
    slug: 'senior-case-study',
    title: 'Senior Case Study',
    summary: 'A structured exercise for explaining trade-offs, sequencing delivery and defending a production design.',
    sections: [
      { title: 'Scenario', items: ['Business-critical service must modernise without extended outage', 'Security requires reduced standing privilege and private access', 'Operations require measurable recovery and support ownership'] },
      { title: 'Response', items: ['Clarify assumptions and constraints before proposing technology', 'Present options with cost, risk and operational trade-offs', 'Choose a phased path with validation and rollback gates'] },
      { title: 'Evidence', items: ['Architecture diagram and decision records', 'Implementation plan and acceptance criteria', 'Operational readiness and measurable success criteria'] },
    ],
  },
];

export const deliveryMap = Object.fromEntries(deliveryGuides.map((guide) => [guide.slug, guide]));
