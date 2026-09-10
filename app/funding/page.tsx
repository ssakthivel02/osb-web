import SiteHeader from '../../components/site-header';
import { fundingEvidencePolicy, fundingRoutes } from '../../lib/funding-data';

export const metadata = {
  title: 'Funding & Partnership Routes | OSB Training Academy',
  description: 'Evidence-backed UK funding, commissioning and employer-partnership routes relevant to OSB Training Academy.',
};

const statusLabel = {
  open: 'OPEN NOW',
  upcoming: 'UPCOMING',
  'ongoing-route': 'ONGOING ROUTE',
} as const;

export default function FundingPage() {
  return (
    <>
      <SiteHeader />
      <main>
        <section className="pageHero">
          <p className="eyebrow">Funding intelligence · evidence first</p>
          <h1>Funding and partnership routes for vocational learning.</h1>
          <p className="lead">
            This register separates real official funding evidence from assumptions. A listed route is a candidate pathway, not proof that OSB is eligible, approved or funded.
          </p>
        </section>

        <section className="section" aria-labelledby="funding-control-heading">
          <article className="card">
            <p className="eyebrow">Research control</p>
            <h2 id="funding-control-heading">Last evidence review: {fundingEvidencePolicy.reviewedOn}</h2>
            <p>{fundingEvidencePolicy.rule}</p>
            <p><strong>Funding claims remain HOLD</strong> until the official scheme terms, applicant identity, provider status, partnership structure and current deadline are independently verified for the actual application.</p>
          </article>
        </section>

        <section className="section" aria-labelledby="funding-routes-heading">
          <p className="eyebrow">Current candidate routes</p>
          <h2 id="funding-routes-heading">Prioritised opportunities</h2>
          <div className="grid">
            {fundingRoutes.map((route) => (
              <article className="card" key={route.id}>
                <p className="eyebrow">{statusLabel[route.status]} · {route.fit.toUpperCase()} FIT</p>
                <h3>{route.name}</h3>
                <p><strong>Provider:</strong> {route.provider}</p>
                <p><strong>Route:</strong> {route.routeType.replaceAll('-', ' ')}</p>
                <p><strong>Geography:</strong> {route.geography}</p>
                <p><strong>Funding:</strong> {route.amount}</p>
                <p><strong>Key date:</strong> {route.keyDate}</p>
                <p><strong>Eligibility boundary:</strong> {route.eligibilitySummary}</p>
                <p><strong>OSB use case:</strong> {route.osbUseCase}</p>
                <p><strong>Next evidence action:</strong> {route.nextAction}</p>
                <p><strong>Evidence note:</strong> {route.evidenceNote}</p>
                <a className="textLink" href={route.sourceUrl} target="_blank" rel="noreferrer">Open official source →</a>
              </article>
            ))}
          </div>
        </section>

        <section className="section" aria-labelledby="funding-plan-heading">
          <p className="eyebrow">OSB funding workstream</p>
          <h2 id="funding-plan-heading">Build evidence before applications</h2>
          <div className="grid">
            <article className="card">
              <h3>1. Problem evidence</h3>
              <p>Document the workforce skills gap, target learner, employer need and why existing training does not solve it adequately.</p>
            </article>
            <article className="card">
              <h3>2. Product evidence</h3>
              <p>Use only physically verified curriculum, assessments, labs and learner journeys. Do not count planned tracks as delivered capability.</p>
            </article>
            <article className="card">
              <h3>3. Outcome evidence</h3>
              <p>Define measurable learning, completion, confidence, progression and employer-value outcomes before any funded pilot starts.</p>
            </article>
            <article className="card">
              <h3>4. Partnership evidence</h3>
              <p>Record actual employer, provider, knowledge-base or local-authority relationships with named contacts and references. Interest is not partnership approval.</p>
            </article>
            <article className="card">
              <h3>5. Delivery evidence</h3>
              <p>Prepare a costed delivery plan, milestones, risks, accessibility, support, data protection, safeguarding where applicable and exit criteria.</p>
            </article>
            <article className="card">
              <h3>6. Application gate</h3>
              <p>Re-check official guidance immediately before submission and record the source date, eligibility decision, authorised applicant and final evidence pack.</p>
            </article>
          </div>
        </section>
      </main>
    </>
  );
}
