import SiteHeader from '../../components/site-header';

const topics = [
  ['01','DevOps Foundations','Culture, flow, feedback, automation and measurable outcomes.'],
  ['02','Git and GitHub','Branching, pull requests, reviews, releases and repository governance.'],
  ['03','CI/CD','Build, test, scan, package, deploy and rollback with GitHub Actions and Azure DevOps.'],
  ['04','Containers','Docker images, registries, networking, volumes and secure runtime practices.'],
  ['05','Kubernetes','AKS architecture, workloads, services, ingress, configuration, secrets and scaling.'],
  ['06','Infrastructure as Code','Terraform state, modules, environments, policy and controlled change.'],
  ['07','Observability','Metrics, logs, traces, SLOs, alerting and incident response.'],
  ['08','DevSecOps','Security gates, dependency scanning, secrets, policy and supply-chain controls.'],
];

export default function DevOpsHub(){return <><SiteHeader/><main><section className="pageHero"><p className="eyebrow">DevOps learning hub</p><h1>Learn the delivery system, not isolated tools.</h1><p className="lead">Follow a practical path from source control to production operations, using the OSB platform as the training workload.</p><div className="actions"><a className="primary" href="/devops/roadmap/">Start tomorrow's roadmap</a><a className="secondary" href="/devops/labs/">Open hands-on labs</a></div></section><section className="section"><div className="grid">{topics.map(([n,t,d])=><article className="card" key={n}><span className="eyebrow">{n}</span><h2>{t}</h2><p>{d}</p></article>)}</div></section></main></>}
