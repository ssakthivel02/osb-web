'use client';

import { useState } from 'react';
import Link from 'next/link';
import type { MuruganText, PendingWork, ModernSong } from '../../lib/murugan-library';
import styles from './murugan.module.css';

export default function Catalogue({ texts, pending, modern }: {
  texts: MuruganText[]; pending: PendingWork[]; modern: ModernSong[];
}) {
  const [query, setQuery] = useState('');
  const normalize = (value: string) => value.normalize('NFC').toLocaleLowerCase('ta');
  const terms = normalize(query).trim().split(/\s+/).filter(Boolean);
  const matches = (text: string) => terms.every((term) => normalize(text).includes(term));
  const matchesVerse = (work: MuruganText) => terms.length > 0 && matches(work.text);
  const visible = texts.filter((work) => matches(work.titleTa) || matches(work.titleEn) || matches(work.collection) || matchesVerse(work));
  const pendingVisible = pending.filter((work) => matches(work.titleTa) || matches(work.titleEn));
  const modernVisible = modern.filter((work) => matches(work.titleTa));
  return (
    <section className={styles.catalogue} aria-labelledby="works-title">
      <h2 id="works-title" className={styles.sectionTitle}>பாடல்கள் மற்றும் நூல்கள்</h2>
      <div className={styles.searchBox}>
        <label htmlFor="murugan-query">தமிழ் பாடல்வரிகள் / தலைப்பைத் தேடுக</label>
        <input id="murugan-query" type="search" value={query} onChange={(e)=>setQuery(e.target.value)} placeholder="எ.கா. முத்தைத்தரு / சரவண / Kandar" autoComplete="off"/>
        <p role="status" aria-live="polite">{visible.length} உரைகள் · {pendingVisible.length} ஆய்விலுள்ள நூல்கள் · {modernVisible.length} அனுமதி தேவைப்படும் பாடல்கள்</p>
      </div>
      {visible.length>0 && (
        <>
          <h3 className={styles.groupTitle}>தளத்திலேயே படிக்கக்கூடிய மூல உரைகள்</h3>
          <div className={styles.grid}>
            {visible.map((work)=>(
              <article key={work.slug} className={styles.card}>
                <div className={styles.tag}>{work.collection} · {work.publicationStatus==='source-linked-text'?'முழுப் பாடல்':'தொடக்கப் பகுதி மட்டும்'}</div>
                <h4>{work.titleTa}</h4>
                <p>{work.titleEn}</p>
                <p className={styles.cardFoot}>மூலம்: {work.authorTa}</p>
                <Link className={styles.readLink} href={'/murugan-library/'+work.slug+'/'} aria-label={work.titleTa+' தமிழில் வாசிக்க'}>தமிழில் வாசிக்க <span aria-hidden="true">→</span></Link>
              </article>
            ))}
          </div>
        </>
      )}
      {pendingVisible.length>0 && (
        <>
          <h3 className={styles.groupTitle}>நூல்கள் — மூலச் சரிபார்ப்பு தேவை</h3>
          <p className={styles.small}>இந்தத் தலைப்புகளுக்கான முழு தமிழ் உரை இன்னும் அங்கீகரிக்கப்படவில்லை. காலியான பக்கங்களோ, உருவாக்கப்பட்ட பாடல்களோ வெளியிடப்படவில்லை.</p>
          <div className={styles.grid}>
            {pendingVisible.map((work)=>(
              <article key={work.titleEn} className={styles.card}>
                <div className={styles.pendingTag}>மூலம் / உரிமை ஆய்வில்</div>
                <h4>{work.titleTa}</h4>
                <p>{work.titleEn}</p>
              </article>
            ))}
          </div>
        </>
      )}
      {modernVisible.length>0 && (
        <>
          <h3 className={styles.groupTitle}>நவீன முருகன் பாடல்கள் — அனுமதி நிலுவையில்</h3>
          <p className={styles.small}>பாடல் பெயர் மட்டும். உரிமையாளர் அனுமதி இல்லாமல் பாடல் வரிகளோ ஒலிப்பதிவுகளோ தரப்படாது.</p>
          <ul className={styles.pendingList}>{modernVisible.map(w=><li key={w.titleTa}>{w.titleTa}</li>)}</ul>
        </>
      )}
      {!visible.length && !pendingVisible.length && !modernVisible.length && <p role="status">இந்தத் தேடலுக்கு பொருந்தும் பதிவு இல்லை.</p>}
    </section>
  );
}
