import SiteHeader from '../../../components/site-header';

const pipeline = [
  ['Trigger','Understand push, pull_request, workflow_dispatch and scheduled events.'],
  ['Permissions','Grant the minimum contents, packages, pages and identity-token permissions required.'],
  ['Build','Install reproducibly, compile, test and fail fast before packaging.'],
  ['Security','Scan dependencies, secrets, code and container images before deployment.'],
  ['Artifact','Upload an immutable build once and promote the same artifact between environments.'],
  ['Deploy','Use protected environments, approvals, concurrency controls and clear rollback procedures.'],
];

export default function ActionsPage(){return <><SiteHeader/><main><section className="pageHero compactHero"><p className="eyebrow">DevOps module 02</p><h1>Design pipelines that fail safely.</h1><p className="lead">A pipeline is a controlled delivery system—not a list of shell commands.</p></section><section className="section"><div className="grid">{pipeline.map(([t,d],i)=><article className="card" key={t}><span className="eyebrow">{String(i+1).padStart(2,'0')}</span><h2>{t}</h2><p>{d}</p></article>)}</div></section><section className="section"><h2>Review questions</h2><div className="moduleList"><article className="module"><span>01</span><h3>Why did the workflow run?</h3><p>Identify the exact event, branch filters and path filters.</p></article><article className="module"><span>02</span><h3>What can it modify?</h3><p>Read permissions and environment protection before trusting a workflow.</p></article><article className="module"><span>03</span><h3>How do we roll back?</h3><p>Promote versioned artifacts and retain the previous known-good release.</p></article></div></section></main></>}