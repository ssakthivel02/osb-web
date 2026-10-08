import { SiteHeader } from '../../components/site-header';

export const metadata = { robots: { index: false, follow: false } };

export default function LoginPage() {
  return (
    <main>
      <SiteHeader />
      <section className="authShell">
        <div className="authPanel">
          <p className="eyebrow">Learner access preview</p>
          <h1>Sign-in is not enabled yet.</h1>
          <p>This static preview does not authenticate learners or collect credentials. Do not enter or send a password for OSB Training Academy at this stage.</p>
          <div className="actions">
            <a className="primary" href="/training-academy/">Explore the public academy</a>
            <a className="secondary" href="/tracks/">Browse learning tracks</a>
          </div>
        </div>
      </section>
    </main>
  );
}
