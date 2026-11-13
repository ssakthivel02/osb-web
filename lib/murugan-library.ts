import catalogue from './murugan-library.json';

export type MuruganText = (typeof catalogue.texts)[number];
export type PendingWork = (typeof catalogue.queuedWorks)[number];
export type ModernSong = (typeof catalogue.modernSongs)[number];

// A release hold must also prevent unauthorised static pages and RSC payloads.
// Keep all source text in the editorial catalogue, not in deployable reader data.
const publicationApproved = Boolean(catalogue.productionContentApproval) &&
  catalogue.texts.length > 0 &&
  catalogue.texts.every((entry) => Boolean(entry.humanPublicationApproval));
export const muruganTexts: MuruganText[] = publicationApproved ? catalogue.texts : [];
export const pendingMuruganWorks: PendingWork[] = catalogue.queuedWorks;
export const withheldModernSongs: ModernSong[] = catalogue.modernSongs;

export function findMuruganText(slug: string): MuruganText | undefined {
  return muruganTexts.find((entry) => entry.slug === slug);
}
