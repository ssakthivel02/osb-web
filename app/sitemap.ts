import type { MetadataRoute } from 'next';
import { academies } from '../lib/academy-data';

const baseUrl = 'https://learn.omsaravanabhava.org';
const coreRoutes = [
  '', '/academies/', '/tracks/', '/tracks/devops/', '/tracks/azure-cloud/', '/tracks/platform-engineering/', '/tracks/cloud-security/',
  '/dashboard/', '/search/', '/login/', '/register/', '/profile/', '/settings/', '/devops/', '/devops/roadmap/', '/devops/labs/',
  '/devops/interview/', '/devops/glossary/', '/devops/commands/', '/devops/scenarios/', '/devops/checklist/', '/devops/git/',
  '/devops/github-actions/', '/devops/docker/', '/devops/terraform/', '/devops/kubernetes/', '/devops/azure-devops/',
  '/devops/monitoring/', '/devops/troubleshooting/',
];
const practiceRoutes = ['assessment','flashcards','labs','interview','scenarios'] as const;
const academyRoutes = academies.flatMap((academy) => [
  `/${academy.slug}/`,
  ...academy.topics.map((topic) => `/${academy.slug}/${topic.slug}/`),
  ...practiceRoutes.map((practice) => `/${academy.slug}/${practice}/`),
]);

export default function sitemap(): MetadataRoute.Sitemap {
  return [...coreRoutes, ...academyRoutes].map((route) => ({
    url: `${baseUrl}${route}`,
    changeFrequency: route === '' ? ('weekly' as const) : ('monthly' as const),
    priority: route === '' ? 1 : route === '/academies/' ? 0.9 : 0.8,
  }));
}
