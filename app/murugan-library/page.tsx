import type { Metadata } from 'next';
import SiteHeader from '../../components/site-header';
import { muruganTexts, pendingMuruganWorks, withheldModernSongs } from '../../lib/murugan-library';
import Catalogue from './catalogue';
import styles from './murugan.module.css';

export const metadata: Metadata = {
  title: 'முருகன் தமிழ் நூல்கள் மற்றும் திருப்புகழ் | OSB',
  description: 'மூல ஆதாரத்துடன் உள்ள தமிழ்ப் பாடல்கள், முழு நூல் மற்றும் சான்று சரிபார்ப்பு நிலை தெளிவாகக் காட்டப்படும் நூலகம்.',
  robots: { index: false, follow: false },
};

export default function MuruganLibrary() {
  return (
    <>
      <SiteHeader />
      <main className={styles.shell} lang="ta" id="main-content">
        <section className={styles.hero} aria-labelledby="murugan-title">
          <div className={styles.kicker}>OSB · தமிழ் பாரம்பரிய வாசிப்பு</div>
          <h1 className={styles.title} id="murugan-title">முருகன் தமிழ் நூலகம்</h1>
          <p className={styles.intro}>திருப்புகழ் பாடல்கள் மற்றும் முருக பக்தி இலக்கியங்களை இத்தளத்திலேயே வாசிக்கலாம். மூலச் சான்றுள்ள உரை மட்டுமே முழுப் பாடலாகக் காட்டப்படுகிறது.</p>
          <div className={styles.stats}>
            <span><strong>{muruganTexts.filter(t=>t.publicationStatus==='source-linked-text').length}</strong> தமிழ்ப் பாடல்கள்</span>
            <span><strong>1</strong> கவசத் தொடக்கப் பகுதி</span>
            <span><strong>{pendingMuruganWorks.length}</strong> நூல்கள் ஆய்வில்</span>
          </div>
        </section>
        <section className={styles.notice} role="note">
          <strong>வெளியீட்டு நிலை:</strong> பழைய OmSaravanaBhava ஆதாரப் பதிவுகளிலிருந்து சேகரிக்கப்பட்ட உரைகள். இத்தளத்தின் பொது வெளியீட்டிற்கு முன் தனி மனித உரை/உரிமை ஒப்புதல் அவசியம். இசை ஒலிப்பதிவுகள், நவீன பாடல் வரிகள் சேர்க்கப்படவில்லை.
        </section>
        <Catalogue texts={muruganTexts} pending={pendingMuruganWorks} modern={withheldModernSongs}/>
      </main>
    </>
  );
}
