import SiteHeader from '../../../components/site-header';

const scenarios = [
  ['Pipeline failed after merge', 'Identify the failed stage, preserve logs and artifacts, compare the last successful run, isolate whether the failure is code, configuration, dependency or environment related, then choose rollback or forward fix.'],
  ['Deployment is healthy but users report errors', 'Check synthetic monitoring, application logs, traces, dependency health, recent feature flags and regional differences. A green deployment is not proof of a healthy user journey.'],
  ['Terraform plan wants to replace production resources', 'Stop. Review provider changes, immutable attributes, state drift, moved blocks and lifecycle rules. Do not apply until replacement impact and recovery are understood.'],
  ['AKS pods are restarting', 'Inspect pod events, exit codes, resource limits, probes, application logs, node pressure and dependency failures. Separate application crashes from orchestration responses.'],
  ['Secret exposed in Git history', 'Revoke and rotate the secret first, then remove it from history, invalidate caches, audit use, add secret scanning and document the incident. Deleting the visible line is insufficient.'],
  ['Release increases latency', 'Compare before-and-after service metrics, traces and database calls. Define rollback thresholds, confirm whether autoscaling masks the issue, and avoid treating extra capacity as the root-cause fix.'],
];

export default function ScenariosPage() {
  return <><SiteHeader/><main><section className="pageHero compactHero"><p className="eyebrow">Scenario practice</p><h1>Interview answers must show control under pressure.</h1><p className="lead">Use the structure: establish impact, gather evidence, contain risk, diagnose, recover, validate and prevent recurrence.</p></section><section className="section"><div className="moduleList">{scenarios.map(([title, answer], index) => <article className="module" key={title}><span>{String(index + 1).padStart(2, '0')}</span><h3>{title}</h3><p>{answer}</p></article>)}</div></section></main></>;
}
