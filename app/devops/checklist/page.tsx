import SiteHeader from '../../../components/site-header';

const sections = [
  ['Source control', ['Explain branching and pull-request flow', 'Resolve a merge conflict safely', 'Use meaningful commits and tags']],
  ['CI/CD', ['Explain triggers, jobs, runners and artifacts', 'Separate build from deployment', 'Describe rollback and approval gates']],
  ['Containers', ['Build and run an image', 'Explain layers and registries', 'Diagnose a failing container']],
  ['Infrastructure as code', ['Run fmt, validate and plan', 'Explain state and remote backends', 'Review destructive changes before apply']],
  ['Kubernetes', ['Explain pod, deployment, service and ingress', 'Read events and logs', 'Describe probes, scaling and rollout recovery']],
  ['Operations', ['Connect logs, metrics and traces', 'Define actionable alerts', 'Explain incident response and post-incident learning']],
  ['Security', ['Protect secrets and identities', 'Scan dependencies and images', 'Apply least privilege and evidence-based controls']],
];

export default function ChecklistPage() {
  return <><SiteHeader/><main><section className="pageHero compactHero"><p className="eyebrow">Readiness checklist</p><h1>Prove capability before claiming confidence.</h1><p className="lead">Mark an item complete only when you can explain it, perform it and troubleshoot it without relying on a copied sequence.</p></section><section className="section"><div className="grid">{sections.map(([title, items]) => <article className="card" key={title as string}><h2>{title}</h2><ul className="checkList">{(items as string[]).map(item => <li key={item}>□ {item}</li>)}</ul></article>)}</div></section></main></>;
}
