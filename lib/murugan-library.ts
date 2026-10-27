import catalogue from './murugan-library.json';

export type MuruganText = (typeof catalogue.texts)[number];
export type PendingWork = (typeof catalogue.queuedWorks)[number];
export type ModernSong = (typeof catalogue.modernSongs)[number];

export const muruganTexts: MuruganText[] = catalogue.texts;
export const pendingMuruganWorks: PendingWork[] = catalogue.queuedWorks;
export const withheldModernSongs: ModernSong[] = catalogue.modernSongs;

export function findMuruganText(slug: string): MuruganText | undefined {
  return muruganTexts.find((entry) => entry.slug === slug);
}
