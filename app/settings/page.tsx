import SiteHeader from '../../components/site-header';

export default function Settings() {
  return (
    <>
      <SiteHeader />
      <main>
        <section className="pageHero compactHero">
          <p className="eyebrow">Settings preview</p>
          <h1>Personal settings are not enabled yet.</h1>
          <p className="lead">This static release candidate does not identify learners, persist preferences or send reminders.</p>
        </section>
        <section className="section">
          <div className="authPanel">
            <h2>No personal data is collected here.</h2>
            <p>Settings will remain unavailable until identity, privacy, storage and account-recovery controls pass their release gates.</p>
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
