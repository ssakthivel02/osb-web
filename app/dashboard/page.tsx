import { SiteHeader } from '../../components/site-header';

const activities = ['Complete DevOps foundations assessment', 'Continue Git branching strategies', 'Review Docker networking lab'];

export default function DashboardPage() {
  return (
    <main>
      <SiteHeader />
      <section className="pageHero compactHero">
        <p className="eyebrow">Learner workspace</p>
        <h1>Welcome back, Sakthivel.</h1>
        <p className="lead">Your learning dashboard is ready for tomorrow&apos;s DevOps preparation.</p>
      </section>
      <section className="section dashboardGrid">
        <article className="metricCard"><span>Current path</span><strong>DevOps Engineering</strong><p>8 modules · Foundation to Advanced</p></article>
        <article className="metricCard"><span>Progress</span><strong>12%</strong><p>Complete the foundation module next.</p></article>
        <article className="metricCard"><span>Study target</span><strong>90 min</strong><p>Focused learning session for tomorrow.</p></article>
      </section>
      <section className="section">
        <p className="eyebrow">Next actions</p>
        <h2>Today&apos;s focused plan</h2>
        <div className="moduleList">{activities.map((item, index) => <article className="module" key={item}><span>0{index + 1}</span><h3>{item}</h3><a className="textLink" href="/tracks/devops/">Open →</a></article>)}</div>
      </section>
    </main>
  );
}
