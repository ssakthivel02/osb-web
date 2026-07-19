import type { MetadataRoute } from 'next';
import { academies } from '../lib/academy-data';
import { careerResources } from '../lib/career-data';
import { resourceTypes } from '../lib/resource-data';
import { operationsGuides } from '../lib/operations-data';

const baseUrl = 'https://learn.omsaravanabhava.org';
const coreRoutes = [
  '', '/academies/', '/career/', '/resources/', '/operations/', '/tracks/', '/tracks/devops/', '/tracks/azure-cloud/', '/tracks/platform-engineering/', '/tracks/cloud-security/',
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
const careerRoutes = academies.flatMap((academy) => [
  `/career/${academy.slug}/`,
  ...careerResources.map((resource) => `/career/${academy.slug}/${resource.slug}/`),
]);
const resourceRoutes = academies.flatMap((academy) => [
  `/resources/${academy.slug}/`,
  ...resourceTypes.map((resource) => `/resources/${academy.slug}/${resource.slug}/`),
]);
const operationsRoutes = academies.flatMap((academy) => [
  `/operations/${academy.slug}/`,
  ...operationsGuides.map((guide) => `/operations/${academy.slug}/${guide.slug}/`),
]);

export default function sitemap(): MetadataRoute.Sitemap {
  return [...coreRoutes, ...academyRoutes, ...careerRoutes, ...resourceRoutes, ...operationsRoutes].map((route) => ({
    url: `${baseUrl}${route}`,
    changeFrequency: route === '' ? ('weekly' as const) : ('monthly' as const),
    priority: route === '' ? 1 : ['/academies/','/career/','/resources/','/operations/'].includes(route) ? 0.9 : 0.8,
  }));
}