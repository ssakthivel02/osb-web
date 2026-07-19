import { notFound } from 'next/navigation';
import SiteHeader from '../../../components/site-header';
import { academies, academyMap } from '../../../lib/academy-data';
import { workshopGuides } from '../../../lib/workshop-data';
export const dynamicParams=false;
export function generateStaticParams(){return academies.map((academy)=>({academy:academy.slug}));}
export default function WorkshopAcademyPage({params}:{params:{academy:string}}){const academy=academyMap[params.academy];if(!academy)notFound();return <><SiteHeader/><main><section className="pageHero"><p className="eyebrow">{academy.name} · workshops</p><h1>Practise decisions, reviews and design conversations.</h1><p className="lead">Use these exercises to convert {academy.name} knowledge into clear, defensible delivery outcomes.</p></section><section className="section"><div className="grid">{workshopGuides.map((item)=><article className="card" key={item.slug}><h2>{item.title}</h2><p>{item.summary}</p><a className="textLink" href={`/workshops/${academy.slug}/${item.slug}/`}>Open workshop →</a></article>)}</div></section></main></>}
