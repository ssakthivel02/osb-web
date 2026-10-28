import SiteHeader from '../../components/site-header';
import { academies } from '../../lib/academy-data';
import { getTrainingAcademyCounts } from '../../lib/training-academy';

export default function AcademiesPage() {
  const verified = getTrainingAcademyCounts();

  return (
    <>
      <SiteHeader />
      <main>
        <section className="pageHero">
          <p className="eyebrow">OSB Training Academy</p>
          <h1>Evidence-backed learning, expanded track by track.</h1>
          <p className="lead">The catalogue below remains the website experience scaffold. The verification panel reports only learner content that physically exists in the repository and passes the corpus loader.</p>
        </section>

        <section className="section" aria-labelledby="verified-corpus-heading">
          <article className="card">
            <p className="eyebrow">Verified physical corpus</p>
            <h2 id="verified-corpus-heading">{verified.learnerRecords} learner records currently integrated</h2>
            <p>{verified.trackTaxonomy} canonical tracks are defined; {verified.populatedTracks} currently has physically verified learner content and {verified.learningPaths} verified learning path is present.</p>
            <p>{verified.sources} primary-source records support this seed. Planned tracks are deliberately not counted as populated until their content is committed and validated.</p>
            <dl>
              {Object.entries(verified.typeBreakdown).sort(([a], [b]) => a.localeCompare(b)).map(([type, count]) => (
                <div key={type}>
                  <dt>{type.replaceAll('_', ' ')}</dt>
                  <dd>{count}</dd>
                </div>
              ))}
            </dl>
          </article>
        </section>

        <section className="section" aria-labelledby="experience-catalogue-heading">
          <h2 id="experience-catalogue-heading">Experience catalogue</h2>
          <p>The cards in this section are navigation/product scaffolding. Their presence does not mean the corresponding curriculum track is evidence-complete.</p>
          <div className="grid">
            {academies.map((academy, index) => (
              <article className="card" key={academy.slug}>
                <span className="eyebrow">Experience {String(index + 1).padStart(2, '0')}</span>
                <h2>{academy.name}</h2>
                <p>{academy.description}</p>
                <p>{academy.topics.length} experience modules</p>
                <a className="textLink" href={`/${academy.slug}/`}>Explore scaffold →</a>
              </article>
            ))}
          </div>
        </section>
      </main>
    </>
  );
}
