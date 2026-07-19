import SiteHeader from '../../../components/site-header';

const sections = [
  ['01','Repository lifecycle','Clone, inspect remotes, create a branch, commit focused changes, push and open a pull request.'],
  ['02','Branching strategy','Use short-lived branches, protected main, mandatory reviews and automated checks before merge.'],
  ['03','Commit quality','Write small, reversible commits with meaningful messages and avoid mixing unrelated changes.'],
  ['04','Pull-request flow','Explain intent, risk, testing evidence, rollback and deployment impact before approval.'],
  ['05','Release control','Tag immutable releases, generate notes and keep production deployment traceable to a commit.'],
  ['06','Recovery','Use revert for shared history, reset only for local history and resolve conflicts deliberately.'],
];

export default function GitPage(){return <><SiteHeader/><main><section className="pageHero compactHero"><p className="eyebrow">DevOps module 01</p><h1>Git and GitHub without guesswork.</h1><p className="lead">Understand the workflow that protects production: branch, review, validate, merge, release and recover.</p></section><section className="section"><div className="moduleList">{sections.map(([n,t,d])=><article className="module" key={n}><span>{n}</span><h3>{t}</h3><p>{d}</p></article>)}</div></section><section className="section"><h2>Practice outcome</h2><p>Complete one pull request with a clear description, successful checks, reviewer feedback and a documented rollback path.</p></section></main></>}