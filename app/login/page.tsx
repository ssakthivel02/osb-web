import { SiteHeader } from '../../components/site-header';

export default function LoginPage() {
  return (
    <main>
      <SiteHeader />
      <section className="authShell">
        <div className="authPanel">
          <p className="eyebrow">Secure learner access</p>
          <h1>Continue your learning journey.</h1>
          <p>Authentication UI is ready. Backend identity integration will be connected through the OSB auth service.</p>
          <form className="authForm">
            <label>Email<input type="email" name="email" placeholder="name@example.com" autoComplete="email" /></label>
            <label>Password<input type="password" name="password" placeholder="Enter your password" autoComplete="current-password" /></label>
            <button type="button" className="primary buttonReset">Sign in</button>
          </form>
          <p>New learner? <a className="textLink" href="/register/">Create an account</a></p>
        </div>
      </section>
    </main>
  );
}
