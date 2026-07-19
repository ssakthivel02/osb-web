import { notFound } from 'next/navigation';
import SiteHeader from './site-header';
import { academies, academyMap } from '../lib/academy-data';
import type { EnterpriseGuide } from '../lib/enterprise-center-data';

export function EnterpriseHub({basePath,eyebrow,title,description}:{basePath:string;eyebrow:string;title:string;description:string}){
  return <><SiteHeader/><main><section className="pageHero"><p className="eyebrow">{eyebrow}</p><h1>{title}</h1><p className="lead">{description}</p></section><section className="section"><div className="grid">{academies.map((academy)=><article className="card" key={academy.slug}><p className="eyebrow">{academy.eyebrow}</p><h2>{academy.name}</h2><p>{academy.description}</p><a className="textLink" href={`/${basePath}/${academy.slug}/`}>Open {title.toLowerCase()} →</a></article>)}</div></section></main></>;
}

export function EnterpriseAcademy({basePath,academySlug,title,description,guides}:{basePath:string;academySlug:string;title:string;description:string;guides:EnterpriseGuide[]}){
  const academy=academyMap[academySlug]; if(!academy)notFound();
  return <><SiteHeader/><main><section className="pageHero"><p className="eyebrow">{academy.name} · {title}</p><h1>{title} for {academy.name}.</h1><p className="lead">{description}</p></section><section className="section"><div className="grid">{guides.map((item)=><article className="card" key={item.slug}><h2>{item.title}</h2><p>{item.summary}</p><a className="textLink" href={`/${basePath}/${academy.slug}/${item.slug}/`}>Open guide →</a></article>)}</div></section></main></>;
}

export function EnterpriseGuidePage({academySlug,guideSlug,category,guides}:{academySlug:string;guideSlug:string;category:string;guides:EnterpriseGuide[]}){
  const academy=academyMap[academySlug]; const guide=guides.find((item)=>item.slug===guideSlug); if(!academy||!guide)notFound();
  return <><SiteHeader/><main><section className="pageHero"><p className="eyebrow">{academy.name} · {category}</p><h1>{guide.title}</h1><p className="lead">{guide.summary}</p><p><strong>Objective:</strong> {guide.objective}</p></section>{guide.sections.map((section)=><section className="section" key={section.heading}><div className="sectionHeading"><p className="eyebrow">Practical guidance</p><h2>{section.heading}</h2></div><div className="grid">{section.items.map((item,index)=><article className="card" key={item}><p className="eyebrow">{String(index+1).padStart(2,'0')}</p><h3>{item}</h3><p>Apply this point to a real {academy.name} design, delivery or operational scenario and record the evidence used to validate the outcome.</p></article>)}</div></section>)}</main></>;
}

export const enterpriseAcademyParams=()=>academies.map((academy)=>({academy:academy.slug}));
export const enterpriseGuideParams=(guides:EnterpriseGuide[])=>academies.flatMap((academy)=>guides.map((guide)=>({academy:academy.slug,guide:guide.slug})));
