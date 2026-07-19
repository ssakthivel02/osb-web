import { notFound } from 'next/navigation';
import SiteHeader from '../../../components/site-header';
import { academyParams, flashcardItems, getAcademy, practiceLabels } from '../../../lib/practice-data';

export const dynamicParams = false;
export function generateStaticParams() { return academyParams(); }

export default function FlashcardsPage({ params }: { params: { academy: string } }) {
  const academy = getAcademy(params.academy); if (!academy) notFound();
  const meta = practiceLabels.flashcards;
  return <><SiteHeader/><main><section className="pageHero compactHero"><p className="eyebrow">{meta.eyebrow}</p><h1>{academy.name}: {meta.title}</h1><p className="lead">{meta.description}</p></section><section className="section"><div className="flashcardGrid">{flashcardItems(params.academy).map(card=><article className="flashcard" key={card.front}><p className="eyebrow">Prompt</p><h2>{card.front}</h2><div className="flashcardAnswer"><strong>Recall:</strong><p>{card.back}</p></div></article>)}</div></section></main></>;
}
