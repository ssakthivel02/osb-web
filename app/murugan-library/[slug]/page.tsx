import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import SiteHeader from '../../../components/site-header';
import { findMuruganText, muruganTexts } from '../../../lib/murugan-library';
import styles from '../murugan.module.css';
import ReaderTools from '../reader-tools';

export function generateStaticParams() {
  return muruganTexts.map(({ slug }) => ({ slug }));
}
export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const entry = findMuruganText(slug);
  return { title: entry ? entry.titleTa + ' | OSB தமிழ் நூலகம்' : 'முருகன் நூலகம்', robots: { index: false, follow: false } };
}

export default async function TamilReader({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const entry = findMuruganText(slug);
  if (!entry) notFound();
  return (
    <>
      <SiteHeader/>
      <main className={styles.readerShell} lang="ta" id="main-content">
        <Link className={styles.back} href="/murugan-library/">← முருகன் நூலகம்</Link>
        <article className={styles.reader}>
          <p className={styles.kicker}>{entry.collection}</p>
          <h1 className={styles.readerTitle}>{entry.titleTa}</h1>
          <p className={styles.author}>{entry.authorTa} · {entry.titleEn}</p>
          {entry.publicationStatus==='reviewed-opening-only' && <p className={styles.notice}>இது தொடக்கப் பகுதி மட்டுமே; முழுப் பதிப்பு அல்ல.</p>}
          <ReaderTools title={entry.titleTa} text={entry.text}/>
          <section className={styles.sourceBox} aria-label="உரை ஆதாரம் மற்றும் மதிப்பாய்வு நிலை">
            <h2>மூலமும் பதிப்பு குறிப்பும்</h2>
            <p>{entry.provenance}</p>
            <p>{entry.editorialNote}</p>
            <p><strong>மூலப் பதிவின் கோப்பு:</strong> {entry.sourceFile}</p>
            <p><strong>OSB பொதுவெளியீட்டு ஒப்புதல்:</strong> நிலுவையில். பிற இணையதளப் பாடல் வரிகளோ, ஒலிப்பதிவோ இங்கு பயன்படுத்தப்படவில்லை.</p>
          </section>
        </article>
      </main>
    </>
  );
}
