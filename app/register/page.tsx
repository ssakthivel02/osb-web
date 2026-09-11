import { SiteHeader } from '../../components/site-header';

export default function RegisterPage() {
  return (
    <main>
      <SiteHeader />
      <section className="authShell">
        <div className="authPanel">
          <p className="eyebrow">Registration preview</p>
          <h1>Account registration is not open yet.</h1>
          <p>This static preview does not create learner accounts or collect personal information. Registration will remain unavailable until the identity service and its security controls are independently release-approved.</p>
          <div className="actions">
            <a className="primary" href="/training-academy/">Explore the public academy</a>
            <a className="secondary" href="/login/">Read the access status</a>
          </div>
        </div>
      </section>
    </main>
  );
}
