export type LearningTrack = {
  slug: string;
  title: string;
  description: string;
  level: string;
  duration: string;
  modules: string[];
};

export const learningTracks: LearningTrack[] = [
  {
    slug: 'devops',
    title: 'DevOps Engineering',
    description: 'Build CI/CD, infrastructure automation, containers, Kubernetes, observability and secure delivery practices.',
    level: 'Foundation to Advanced',
    duration: '12 weeks',
    modules: ['DevOps foundations', 'Git and branching', 'CI/CD pipelines', 'Docker', 'Kubernetes', 'Terraform', 'Observability', 'DevSecOps'],
  },
  {
    slug: 'azure-cloud',
    title: 'Azure Cloud Architecture',
    description: 'Design production Azure platforms using landing zones, identity, networking, governance and resilience.',
    level: 'Intermediate',
    duration: '10 weeks',
    modules: ['Landing zones', 'Azure networking', 'Entra ID', 'Azure Policy', 'Platform engineering', 'FinOps'],
  },
  {
    slug: 'platform-engineering',
    title: 'Platform Engineering',
    description: 'Create secure internal developer platforms, golden paths and self-service cloud capabilities.',
    level: 'Advanced',
    duration: '8 weeks',
    modules: ['Platform product thinking', 'Golden paths', 'Backstage concepts', 'GitOps', 'SRE controls'],
  },
  {
    slug: 'cloud-security',
    title: 'Cloud Security',
    description: 'Apply zero trust, workload protection, policy enforcement and security operations across cloud platforms.',
    level: 'Intermediate',
    duration: '8 weeks',
    modules: ['Zero trust', 'Identity security', 'Secrets', 'Cloud posture', 'Threat detection', 'Incident response'],
  },
];
