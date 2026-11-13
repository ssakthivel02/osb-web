'use client';

import { useEffect, useState } from 'react';
import styles from './murugan.module.css';

type Props = { title: string; text: string };

export default function ReaderTools({ title, text }: Props) {
  const [fontStep, setFontStep] = useState(1);
  const [paperMode, setPaperMode] = useState(false);
  const [speechStatus, setSpeechStatus] = useState('குரல் வாசிப்பிற்கு சாதனத்தில் தமிழ் குரல் தேவை.');
  const textSize = (1.10 + fontStep * 0.16).toFixed(2) + 'rem';

  useEffect(() => {
    return () => {
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  function speak() {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      setSpeechStatus('இந்த உலாவியில் குரல் வாசிப்பு ஆதரிக்கப்படவில்லை.');
      return;
    }
    const synthesizer = window.speechSynthesis;
    const tamilVoice = synthesizer.getVoices().find((voice) => voice.lang.toLowerCase().startsWith('ta'));
    if (!tamilVoice) {
      setSpeechStatus('இந்தச் சாதனத்தில் தமிழ் குரல் இல்லை. தமிழ் குரலை நிறுவியபின் முயற்சிக்கவும்.');
      return;
    }
    synthesizer.cancel();
    const utterance = new SpeechSynthesisUtterance(title + '. ' + text);
    utterance.lang = 'ta-IN';
    utterance.voice = tamilVoice;
    utterance.rate = 0.88;
    utterance.onstart = () => setSpeechStatus('தமிழில் வாசிக்கப்படுகிறது.');
    utterance.onend = () => setSpeechStatus('வாசிப்பு முடிந்தது.');
    utterance.onerror = () => setSpeechStatus('குரல் வாசிப்பில் பிழை. மீண்டும் முயற்சிக்கவும்.');
    synthesizer.speak(utterance);
  }

  function togglePause() {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
    const synthesizer = window.speechSynthesis;
    if (synthesizer.paused) {
      synthesizer.resume();
      setSpeechStatus('தமிழில் வாசிக்கப்படுகிறது.');
    } else if (synthesizer.speaking) {
      synthesizer.pause();
      setSpeechStatus('வாசிப்பு தற்காலிகமாக நிறுத்தப்பட்டது.');
    }
  }

  function stop() {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setSpeechStatus('வாசிப்பு நிறுத்தப்பட்டது.');
    }
  }

  return (
    <section className={styles.readerTools} aria-label="தமிழ் பாடல் வாசிப்பு வசதிகள்">
      <div className={styles.toolRow}>
        <button type="button" onClick={() => setFontStep(v => Math.max(0, v - 1))} disabled={fontStep === 0} aria-label="எழுத்து அளவைக் குறைக்க">அ−</button>
        <button type="button" onClick={() => setFontStep(v => Math.min(4, v + 1))} disabled={fontStep === 4} aria-label="எழுத்து அளவை அதிகரிக்க">அ+</button>
        <button type="button" aria-pressed={paperMode} onClick={() => setPaperMode(v => !v)}> {paperMode ? 'இருண்ட தோற்றம்' : 'வெளிர் வாசிப்பு'} </button>
        <button type="button" onClick={() => window.print()}>அச்சிடு</button>
      </div>
      <div className={styles.toolRow}>
        <button type="button" onClick={speak}>▶ தமிழ் குரலில் வாசி</button>
        <button type="button" onClick={togglePause}>இடைநிறுத்து / தொடர்</button>
        <button type="button" onClick={stop}>நிறுத்து</button>
      </div>
      <p className={styles.speechStatus} role="status" aria-live="polite">{speechStatus}</p>
      <div className={paperMode ? styles.versesPaper : styles.verses}>
        {text.split(/\n{2,}/).map((verse, i) => (
          <p key={i} lang="ta" style={{ fontSize: textSize }}>{verse}</p>
        ))}
      </div>
    </section>
  );
}
