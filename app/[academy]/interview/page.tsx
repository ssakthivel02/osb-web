import { notFound } from 'next/navigation';
import SiteHeader from '../../../components/site-header';
import { academyParams, getAcademy, interviewItems, practiceLabels } from '../../../lib/practice-data';

export const dynamicParams = false;
export function generateStaticParams() { return academyParams(); }

export default function InterviewPage({ params }: { params: { academy: string } }) {
  const academy = getAcademy(params.academy); if (!academy) notFound();
  const meta = practiceLabels.interview;
  return <><SiteHeader/><main><section className="pageHero compactHero"><p className="eyebrow">{meta.eyebrow}</p><h1>{academy.name}: {meta.title}</h1><p className="lead">{meta.description}</p></section><section className="section"><div className="practiceList">{interviewItems(params.academy).map(item=><article className="practiceItem" key={item.topic}><p className="eyebrow">{item.topic}</p><h2>{item.question}</h2><p><strong>Answer framework:</strong> {item.framework}</p></article>)}</div></section></main></>;
}
