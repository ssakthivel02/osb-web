import type { MetadataRoute } from 'next';

const baseUrl = 'https://learn.omsaravanabhava.org';
const routes = [
  '',
  '/tracks/',
  '/tracks/devops/',
  '/tracks/azure-cloud/',
  '/tracks/platform-engineering/',
  '/tracks/cloud-security/',
  '/dashboard/',
  '/search/',
  '/login/',
  '/register/',
  '/profile/',
  '/settings/',
  '/devops/',
  '/devops/roadmap/',
  '/devops/labs/',
  '/devops/interview/',
  '/devops/glossary/',
  '/devops/commands/',
  '/devops/scenarios/',
  '/devops/checklist/',
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    changeFrequency: route === '' ? ('weekly' as const) : ('monthly' as const),
    priority: route === '' ? 1 : 0.8,
  }));
}
