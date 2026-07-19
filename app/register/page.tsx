import { SiteHeader } from '../../components/site-header';

export default function RegisterPage() {
  return (
    <main>
      <SiteHeader />
      <section className="authShell">
        <div className="authPanel">
          <p className="eyebrow">Join OSB Learning</p>
          <h1>Create your learner profile.</h1>
          <form className="authForm">
            <label>Full name<input type="text" name="name" placeholder="Your name" autoComplete="name" /></label>
            <label>Email<input type="email" name="email" placeholder="name@example.com" autoComplete="email" /></label>
            <label>Password<input type="password" name="password" placeholder="Create a strong password" autoComplete="new-password" /></label>
            <button type="button" className="primary buttonReset">Create account</button>
          </form>
          <p>Already registered? <a className="textLink" href="/login/">Sign in</a></p>
        </div>
      </section>
    </main>
  );
}
