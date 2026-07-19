import { academies } from './academy-data';

export const careerResources = [
  { slug: 'certification-roadmap', title: 'Certification roadmap', description: 'Sequence learning, practical evidence and exam preparation without treating certification as the end goal.' },
  { slug: 'capstone-project', title: 'Capstone project', description: 'Deliver a portfolio-grade implementation with design, automation, testing, operations and rollback evidence.' },
  { slug: 'role-paths', title: 'Role-based paths', description: 'Map academy capability to engineer, senior engineer, architect, platform and leadership expectations.' },
  { slug: 'revision-plan', title: '30-day revision plan', description: 'Use spaced repetition, labs, scenarios and mock explanations to build durable recall.' },
  { slug: 'portfolio-evidence', title: 'Portfolio evidence', description: 'Capture design decisions, diagrams, code, test results, operational proof and lessons learned.' },
  { slug: 'mock-exam', title: 'Mock exam strategy', description: 'Practise under time pressure, classify weak domains and convert mistakes into targeted revision.' },
] as const;

export type CareerResourceSlug = (typeof careerResources)[number]['slug'];

const academyFocus: Record<string, { certification: string; project: string; roles: string[] }> = {
  azure: {
    certification: 'Begin with platform fundamentals, then progress through administration, architecture and security based on your target role.',
    project: 'Design and deploy a governed Azure landing zone with hub-and-spoke networking, policy, identity, monitoring and a sample workload.',
    roles: ['Azure Administrator', 'Cloud Engineer', 'Cloud Architect', 'Security Architect'],
  },
  terraform: {
    certification: 'Master Terraform workflow and state before pursuing vendor-aligned infrastructure-as-code validation.',
    project: 'Build a modular Azure platform using remote state, OIDC, policy checks, pull-request plans and protected production apply.',
    roles: ['Infrastructure Engineer', 'DevOps Engineer', 'Platform Engineer', 'IaC Lead'],
  },
  kubernetes: {
    certification: 'Build operational Kubernetes fluency before attempting administrator, developer or security-focused certification.',
    project: 'Deploy a production-style AKS workload with ingress, identity, secrets, autoscaling, monitoring, disruption controls and rollback.',
    roles: ['Kubernetes Engineer', 'AKS Engineer', 'SRE', 'Platform Engineer'],
  },
  'github-actions': {
    certification: 'Focus on workflow architecture, security, reusable automation and deployment governance rather than YAML memorisation.',
    project: 'Create a reusable GitHub Actions delivery platform with CI, artifacts, OIDC, environments, approvals and deployment evidence.',
    roles: ['DevOps Engineer', 'CI/CD Engineer', 'Developer Productivity Engineer', 'Platform Engineer'],
  },
  'azure-devops': {
    certification: 'Connect Boards, Repos, Pipelines, Artifacts and environments as one governed delivery system.',
    project: 'Implement a multi-stage Azure DevOps pipeline with templates, immutable artifacts, approvals, environment checks and rollback.',
    roles: ['Azure DevOps Engineer', 'Release Engineer', 'Delivery Lead', 'Platform Engineer'],
  },
  docker: {
    certification: 'Prioritise image construction, runtime isolation, networking, storage, registry flow and security fundamentals.',
    project: 'Containerise a multi-service application with multi-stage builds, Compose, health checks, secrets and vulnerability scanning.',
    roles: ['DevOps Engineer', 'Container Engineer', 'Application Platform Engineer', 'Cloud Engineer'],
  },
  'platform-engineering': {
    certification: 'Use certifications selectively; platform capability is best proved through adoption, reliability and developer outcomes.',
    project: 'Design an internal developer platform with golden paths, templates, self-service environments, policy and observability.',
    roles: ['Platform Engineer', 'Developer Experience Engineer', 'Platform Architect', 'Platform Product Manager'],
  },
  finops: {
    certification: 'Build cloud-cost literacy, allocation, forecasting, optimisation and governance before formal FinOps validation.',
    project: 'Create a FinOps operating model with tagging, budgets, anomaly detection, optimisation backlog and executive reporting.',
    roles: ['FinOps Practitioner', 'Cloud Economist', 'Cloud Governance Lead', 'FinOps Lead'],
  },
};

export function getCareerContent(academySlug: string, resourceSlug: CareerResourceSlug) {
  const academy = academies.find((item) => item.slug === academySlug);
  const focus = academyFocus[academySlug];
  if (!academy || !focus) return null;

  const shared = {
    academy,
    focus,
    resource: careerResources.find((item) => item.slug === resourceSlug)!,
  };

  const content: Record<CareerResourceSlug, { heading: string; intro: string; sections: { title: string; items: string[] }[] }> = {
    'certification-roadmap': {
      heading: `${academy.name} certification roadmap`,
      intro: focus.certification,
      sections: [
        { title: 'Foundation', items: ['Complete every core academy module', 'Explain concepts without notes', 'Finish at least three hands-on exercises'] },
        { title: 'Applied readiness', items: ['Complete the academy labs', 'Answer architecture scenarios', 'Document failures and recovery steps'] },
        { title: 'Exam readiness', items: ['Use timed mock exams', 'Review incorrect answers by domain', 'Book the exam only after stable scores and practical confidence'] },
      ],
    },
    'capstone-project': {
      heading: `${academy.name} capstone project`,
      intro: focus.project,
      sections: [
        { title: 'Design evidence', items: ['Requirements and constraints', 'Architecture diagram', 'Security and failure-mode analysis', 'Decision log with rejected alternatives'] },
        { title: 'Implementation evidence', items: ['Version-controlled source', 'Automated validation', 'Repeatable deployment', 'Environment configuration and secrets model'] },
        { title: 'Operational evidence', items: ['Monitoring and alerts', 'Runbook and rollback', 'Test results', 'Post-implementation review'] },
      ],
    },
    'role-paths': {
      heading: `${academy.name} role-based paths`,
      intro: 'Different roles require different depth. Do not study every topic equally; study to the decisions and failures your target role owns.',
      sections: focus.roles.map((role, index) => ({
        title: role,
        items: index < 2
          ? ['Operate core services safely', 'Troubleshoot common failures', 'Automate repeatable work', 'Escalate with useful evidence']
          : ['Design standards and guardrails', 'Evaluate trade-offs', 'Control organisational risk', 'Mentor teams and govern exceptions'],
      })),
    },
    'revision-plan': {
      heading: `${academy.name} 30-day revision plan`,
      intro: 'Use a repeating cycle of recall, practice, explanation and review. Passive rereading is not a revision strategy.',
      sections: [
        { title: 'Days 1–7 · Foundations', items: ['Two modules per day', 'Create flashcards', 'Complete short labs', 'Write one-page summaries'] },
        { title: 'Days 8–15 · Application', items: ['Complete scenario drills', 'Build the capstone baseline', 'Practise commands and configuration', 'Record weak areas'] },
        { title: 'Days 16–23 · Pressure testing', items: ['Timed assessments', 'Failure simulations', 'Interview explanations', 'Architecture trade-off reviews'] },
        { title: 'Days 24–30 · Consolidation', items: ['Close evidence gaps', 'Repeat weak domains', 'Deliver the capstone walkthrough', 'Complete final mock exam'] },
      ],
    },
    'portfolio-evidence': {
      heading: `${academy.name} portfolio evidence`,
      intro: 'A portfolio should prove judgement and operational capability, not merely display screenshots of successful deployments.',
      sections: [
        { title: 'Repository', items: ['Clear README', 'Architecture and ADRs', 'Source and automation', 'Security controls', 'Testing instructions'] },
        { title: 'Evidence pack', items: ['Before-and-after diagrams', 'Pipeline results', 'Monitoring output', 'Failure and rollback demonstration', 'Cost or performance observations'] },
        { title: 'Interview narrative', items: ['Business problem', 'Constraints', 'Decision and alternatives', 'Implementation', 'Failure handling', 'Measured outcome'] },
      ],
    },
    'mock-exam': {
      heading: `${academy.name} mock exam strategy`,
      intro: 'Mock exams are diagnostic tools. Repeating questions until memorised creates false confidence.',
      sections: [
        { title: 'Attempt', items: ['Use a strict time limit', 'Do not consult notes', 'Flag uncertain questions', 'Record confidence for each answer'] },
        { title: 'Analyse', items: ['Group errors by domain', 'Separate knowledge gaps from misreading', 'Rebuild weak concepts practically', 'Write why each wrong option is wrong'] },
        { title: 'Retest', items: ['Wait before repeating', 'Use new questions where possible', 'Target stable scores above your threshold', 'Stop chasing percentages without practical evidence'] },
      ],
    },
  };

  return { ...shared, content: content[resourceSlug] };
}
