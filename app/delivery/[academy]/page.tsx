import { notFound } from 'next/navigation';
import SiteHeader from '../../../components/site-header';
import { academies, academyMap } from '../../../lib/academy-data';
import { deliveryGuides } from '../../../lib/delivery-data';

export const dynamicParams = false;
export function generateStaticParams(){return academies.map((academy)=>({academy:academy.slug}));}

export default function DeliveryAcademyPage({params}:{params:{academy:string}}){const academy=academyMap[params.academy];if(!academy)notFound();return <><SiteHeader/><main><section className="pageHero"><p className="eyebrow">{academy.name} · delivery pack</p><h1>From design intent to production evidence.</h1><p className="lead">Apply reusable architecture and delivery controls to {academy.name} work.</p></section><section className="section"><div className="grid">{deliveryGuides.map((guide)=><article className="card" key={guide.slug}><h2>{guide.title}</h2><p>{guide.summary}</p><a className="textLink" href={`/delivery/${academy.slug}/${guide.slug}/`}>Open guide →</a></article>)}</div></section></main></>;}