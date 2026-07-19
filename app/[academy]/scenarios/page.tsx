import { notFound } from 'next/navigation';
import SiteHeader from '../../../components/site-header';
import { academyParams, getAcademy, practiceLabels, scenarioItems } from '../../../lib/practice-data';

export const dynamicParams = false;
export function generateStaticParams() { return academyParams(); }

export default function ScenariosPage({ params }: { params: { academy: string } }) {
  const academy = getAcademy(params.academy); if (!academy) notFound();
  const meta = practiceLabels.scenarios;
  return <><SiteHeader/><main><section className="pageHero compactHero"><p className="eyebrow">{meta.eyebrow}</p><h1>{academy.name}: {meta.title}</h1><p className="lead">{meta.description}</p></section><section className="section"><div className="scenarioGrid">{scenarioItems(params.academy).map(item=><article className="scenarioCard" key={item.number}><span className="eyebrow">Scenario {String(item.number).padStart(2,'0')}</span><h2>{item.title}</h2><p>{item.situation}</p><div className="decisionBox"><strong>Your response must cover</strong><p>{item.response}</p></div></article>)}</div></section></main></>;
}
