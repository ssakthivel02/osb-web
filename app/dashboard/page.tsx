import { SiteHeader } from '../../components/site-header';

const activities = [
  { title: 'Explore the verified training corpus', href: '/training-academy/' },
  { title: 'Choose a structured learning path', href: '/training-academy/' },
  { title: 'Review a track capstone', href: '/training-academy/tracks/OSB-TRACK-DEVOPS/' },
];

export default function DashboardPage() {
  return (
    <main>
      <SiteHeader />
      <section className="pageHero compactHero">
        <p className="eyebrow">Learner workspace</p>
        <h1>Dashboard preview.</h1>
        <p className="lead">Personal dashboards and progress tracking are not active in this static release candidate. The links below open public learning content only.</p>
      </section>
      <section className="section dashboardGrid">
        <article className="metricCard"><span>Identity</span><strong>Not enabled</strong><p>No learner account is connected.</p></article>
        <article className="metricCard"><span>Progress</span><strong>Not tracked</strong><p>No personal progress data is stored.</p></article>
        <article className="metricCard"><span>Study target</span><strong>Not configured</strong><p>Personal settings require the future identity service.</p></article>
      </section>
      <section className="section">
        <p className="eyebrow">Next actions</p>
        <h2>Public learning options</h2>
        <div className="moduleList">{activities.map((item, index) => <article className="module" key={item.title}><span>0{index + 1}</span><h3>{item.title}</h3><a className="textLink" href={item.href}>Open →</a></article>)}</div>
      </section>
    </main>
  );
}
