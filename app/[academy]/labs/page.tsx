import { notFound } from 'next/navigation';
import SiteHeader from '../../../components/site-header';
import { academyParams, getAcademy, labItems, practiceLabels } from '../../../lib/practice-data';

export const dynamicParams = false;
export function generateStaticParams() { return academyParams(); }

export default function LabsPage({ params }: { params: { academy: string } }) {
  const academy = getAcademy(params.academy); if (!academy) notFound();
  const meta = practiceLabels.labs;
  return <><SiteHeader/><main><section className="pageHero compactHero"><p className="eyebrow">{meta.eyebrow}</p><h1>{academy.name}: {meta.title}</h1><p className="lead">{meta.description}</p></section><section className="section"><div className="moduleList">{labItems(params.academy).map(lab=><article className="module labModule" key={lab.number}><span>{String(lab.number).padStart(2,'0')}</span><div><h3>{lab.title}</h3><p>{lab.objective}</p><small>{lab.evidence}</small></div></article>)}</div></section></main></>;
}
