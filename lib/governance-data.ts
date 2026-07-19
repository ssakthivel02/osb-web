export type GovernanceGuide = {
  slug: string;
  title: string;
  summary: string;
  sections: { title: string; items: string[] }[];
};

export const governanceGuides: GovernanceGuide[] = [
  {
    slug: 'architecture-decisions',
    title: 'Architecture Decision Records',
    summary: 'Record context, options, trade-offs, decisions and consequences so technical choices remain explainable and reviewable.',
    sections: [
      { title: 'Decision context', items: ['State the problem and business driver', 'Capture constraints and assumptions', 'Identify affected systems and owners'] },
      { title: 'Options and trade-offs', items: ['Document viable alternatives', 'Compare security, cost, resilience and operability', 'Explain why rejected options were not selected'] },
      { title: 'Decision evidence', items: ['Name approvers and review date', 'Link diagrams, tests and estimates', 'Define consequences and revisit triggers'] },
    ],
  },
  {
    slug: 'risk-register',
    title: 'Technical Risk Register',
    summary: 'Turn vague concern into owned, measurable and time-bound risk treatment.',
    sections: [
      { title: 'Risk statement', items: ['Describe cause, event and impact', 'Score likelihood and consequence', 'Record current controls and residual exposure'] },
      { title: 'Treatment plan', items: ['Choose avoid, reduce, transfer or accept', 'Assign owner and target date', 'Define measurable completion evidence'] },
      { title: 'Review discipline', items: ['Track movement in risk score', 'Escalate overdue critical actions', 'Close only when evidence exists'] },
    ],
  },
  {
    slug: 'control-evidence',
    title: 'Control Evidence Pack',
    summary: 'Prove that required technical and process controls exist, operate and are reviewed.',
    sections: [
      { title: 'Control definition', items: ['Map control to policy or standard', 'Define control owner and frequency', 'State expected technical behaviour'] },
      { title: 'Evidence collection', items: ['Capture configuration exports and screenshots', 'Retain pipeline, test and approval records', 'Record exceptions and compensating controls'] },
      { title: 'Assurance', items: ['Validate evidence freshness', 'Sample actual operating effectiveness', 'Store evidence with clear retention rules'] },
    ],
  },
  {
    slug: 'change-governance',
    title: 'Change Governance',
    summary: 'Control production change through scope, impact, testing, approval, communication and rollback readiness.',
    sections: [
      { title: 'Change definition', items: ['State scope, business reason and implementation window', 'Identify dependencies and impacted services', 'Classify risk and required approvals'] },
      { title: 'Execution controls', items: ['Document implementation and validation steps', 'Define stop conditions and rollback plan', 'Assign technical, business and communication roles'] },
      { title: 'Closure', items: ['Record actual result and deviations', 'Confirm monitoring after implementation', 'Capture lessons and follow-up actions'] },
    ],
  },
  {
    slug: 'release-assurance',
    title: 'Release Assurance',
    summary: 'Require objective evidence that a release is secure, supportable and ready for production.',
    sections: [
      { title: 'Quality gates', items: ['Confirm build, test and security results', 'Validate dependency and licence posture', 'Approve immutable release artefacts'] },
      { title: 'Operational readiness', items: ['Confirm runbooks, dashboards and alerts', 'Validate support ownership and escalation', 'Test rollback and recovery procedures'] },
      { title: 'Release decision', items: ['Review unresolved defects and risks', 'Record go or no-go authority', 'Measure post-release stability'] },
    ],
  },
  {
    slug: 'compliance-mapping',
    title: 'Compliance Mapping',
    summary: 'Translate policy and regulatory requirements into specific technical controls and evidence.',
    sections: [
      { title: 'Requirement mapping', items: ['Identify applicable obligations', 'Map each requirement to technical controls', 'Assign accountable owners'] },
      { title: 'Implementation', items: ['Automate controls where practical', 'Document exceptions and expiry dates', 'Separate preventive, detective and corrective controls'] },
      { title: 'Audit readiness', items: ['Maintain traceability from requirement to evidence', 'Review control effectiveness periodically', 'Track remediation to verified closure'] },
    ],
  },
];

export const governanceMap = Object.fromEntries(governanceGuides.map((guide) => [guide.slug, guide]));
