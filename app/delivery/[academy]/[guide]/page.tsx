import { notFound } from 'next/navigation';
import SiteHeader from '../../../../components/site-header';
import { academies, academyMap } from '../../../../lib/academy-data';
import { deliveryGuides, deliveryMap } from '../../../../lib/delivery-data';

export const dynamicParams = false;
export function generateStaticParams(){return academies.flatMap((academy)=>deliveryGuides.map((guide)=>({academy:academy.slug,guide:guide.slug})));}

export default function DeliveryGuidePage({params}:{params:{academy:string;guide:string}}){const academy=academyMap[params.academy];const guide=deliveryMap[params.guide];if(!academy||!guide)notFound();return <><SiteHeader/><main><section className="pageHero compactHero"><p className="eyebrow">{academy.name} · architecture and delivery</p><h1>{guide.title}</h1><p className="lead">{guide.summary}</p></section><section className="section"><div className="governanceSections">{guide.sections.map((section,index)=><article className="governanceSection" key={section.title}><span className="eyebrow">{String(index+1).padStart(2,'0')}</span><div><h2>{section.title}</h2><ul className="checkList">{section.items.map((item)=><li key={item}>{item}</li>)}</ul></div></article>)}</div><div className="decisionBox"><strong>Required output</strong><p>Create a reviewed {guide.title.toLowerCase()} for {academy.name} with assumptions, owners, evidence, unresolved risks and explicit acceptance criteria.</p></div><div className="actions"><a className="secondary" href={`/delivery/${academy.slug}/`}>← Back to delivery pack</a></div></section></main></>;}