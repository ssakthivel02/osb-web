import { notFound } from 'next/navigation';
import SiteHeader from '../../../components/site-header';
import { academies, academyMap } from '../../../lib/academy-data';
import { operationsGuides } from '../../../lib/operations-data';

export const dynamicParams=false;
export function generateStaticParams(){return academies.map((academy)=>({academy:academy.slug}));}

export default function AcademyOperations({params}:{params:{academy:string}}){const academy=academyMap[params.academy];if(!academy)notFound();return <><SiteHeader/><main><section className="pageHero"><p className="eyebrow">{academy.name} · Operations</p><h1>Operate {academy.name.replace(' Academy','')} with evidence and control.</h1><p className="lead">Use these operational guides to turn technical implementation into a supportable production service.</p></section><section className="section"><div className="grid">{operationsGuides.map((guide)=><article className="card operationsCard" key={guide.slug}><h2>{guide.title}</h2><p>{guide.summary}</p><a className="textLink" href={`/operations/${academy.slug}/${guide.slug}/`}>Open guide →</a></article>)}</div></section></main></>}