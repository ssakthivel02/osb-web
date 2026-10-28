import { notFound } from 'next/navigation';
import SiteHeader from '../../../components/site-header';
import { academyParams, assessmentItems, getAcademy, practiceLabels } from '../../../lib/practice-data';

export const dynamicParams = false;
export function generateStaticParams() { return academyParams(); }

export default async function AssessmentPage(props: { params: Promise<{ academy: string }> }) {
  const params = await props.params;
  const academy = getAcademy(params.academy);if (!academy) notFound();
  const meta = practiceLabels.assessment;
  return <><SiteHeader/><main><section className="pageHero compactHero"><p className="eyebrow">{meta.eyebrow}</p><h1>{academy.name}: {meta.title}</h1><p className="lead">{meta.description}</p></section><section className="section"><div className="practiceList">{assessmentItems(params.academy).map(item=><details className="practiceItem" key={item.number}><summary><span>{String(item.number).padStart(2,'0')}</span>{item.question}</summary><p>{item.guidance}</p></details>)}</div></section></main></>;
}
