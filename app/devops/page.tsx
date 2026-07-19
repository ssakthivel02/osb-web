import SiteHeader from '../../components/site-header';

const topics = [
  ['01','Git and GitHub','Branching, pull requests, reviews, releases and repository governance.','/devops/git/'],
  ['02','GitHub Actions','Triggers, permissions, build controls, artifacts, environments and rollback.','/devops/github-actions/'],
  ['03','Docker','Images, containers, registries, networking, volumes and secure runtime practices.','/devops/docker/'],
  ['04','Terraform','State, modules, plans, environments, policy and controlled infrastructure change.','/devops/terraform/'],
  ['05','Kubernetes and AKS','Workloads, services, ingress, identity, configuration, scaling and operations.','/devops/kubernetes/'],
  ['06','Azure DevOps','Boards, Repos, Pipelines, Artifacts, environments and delivery governance.','/devops/azure-devops/'],
  ['07','Monitoring','Metrics, logs, traces, SLOs, alerts and incident response.','/devops/monitoring/'],
  ['08','Troubleshooting','Evidence-led diagnosis, recovery, rollback and post-incident learning.','/devops/troubleshooting/'],
];

export default function DevOpsHub(){return <><SiteHeader/><main><section className="pageHero"><p className="eyebrow">DevOps learning hub</p><h1>Learn the delivery system, not isolated tools.</h1><p className="lead">Follow a practical path from source control to production operations, using the OSB platform as the training workload.</p><div className="actions"><a className="primary" href="/devops/roadmap/">Start tomorrow's roadmap</a><a className="secondary" href="/devops/labs/">Open hands-on labs</a></div></section><section className="section"><div className="grid">{topics.map(([n,t,d,url])=><article className="card" key={n}><span className="eyebrow">{n}</span><h2>{t}</h2><p>{d}</p><a className="textLink" href={url}>Open module →</a></article>)}</div></section><section className="section"><h2>Reference and practice</h2><div className="actions"><a className="secondary" href="/devops/commands/">Commands</a><a className="secondary" href="/devops/scenarios/">Scenarios</a><a className="secondary" href="/devops/checklist/">Checklist</a><a className="secondary" href="/devops/interview/">Interview preparation</a></div></section></main></>}