import SiteHeader from '../../components/site-header';
import { academies } from '../../lib/academy-data';

export default function WorkshopsHub() {
  return <><SiteHeader/><main><section className="pageHero"><p className="eyebrow">Applied learning</p><h1>Workshops that turn knowledge into decisions.</h1><p className="lead">Use facilitated exercises, whiteboard challenges and review packs to practise real architecture and delivery work across every academy.</p></section><section className="section"><div className="grid">{academies.map((academy)=><article className="card" key={academy.slug}><p className="eyebrow">{academy.eyebrow}</p><h2>{academy.name}</h2><p>{academy.description}</p><a className="textLink" href={`/workshops/${academy.slug}/`}>Open workshop pack →</a></article>)}</div></section></main></>;
}
