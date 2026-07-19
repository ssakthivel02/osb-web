import { SiteHeader } from '../../components/site-header';
import { learningTracks } from '../../lib/learning-data';

export default function SearchPage() {
  return (
    <main>
      <SiteHeader />
      <section className="pageHero compactHero">
        <p className="eyebrow">Knowledge discovery</p>
        <h1>Find the right skill, module or learning path.</h1>
        <div className="searchBox"><input aria-label="Search learning catalogue" placeholder="Search DevOps, Terraform, Kubernetes, Azure..." /><button type="button">Search</button></div>
      </section>
      <section className="section">
        <p className="eyebrow">Popular paths</p>
        <div className="grid">{learningTracks.map((track) => <article className="card" key={track.slug}><h2>{track.title}</h2><p>{track.description}</p><a className="textLink" href={`/tracks/${track.slug}/`}>Open path →</a></article>)}</div>
      </section>
    </main>
  );
}
