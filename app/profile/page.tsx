import SiteHeader from '../../components/site-header';

export const metadata = { robots: { index: false, follow: false } };

export default function Profile() {
  return (
    <>
      <SiteHeader />
      <main>
        <section className="pageHero compactHero">
          <p className="eyebrow">Profile preview</p>
          <h1>Learner profiles are not enabled yet.</h1>
          <p className="lead">This static release candidate does not identify learners, record completions or store capability evidence.</p>
        </section>
        <section className="section">
          <div className="authPanel">
            <h2>No personal record exists on this page.</h2>
            <p>Profiles will remain unavailable until identity, privacy, evidence-storage and account-recovery controls pass their release gates.</p>
            <div className="actions">
              <a className="primary" href="/training-academy/">Explore the public academy</a>
              <a className="secondary" href="/tracks/">Browse learning tracks</a>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
