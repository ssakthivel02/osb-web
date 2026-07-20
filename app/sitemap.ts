import type { MetadataRoute } from 'next';
import { academies } from '../lib/academy-data';
import { careerResources } from '../lib/career-data';
import { resourceTypes } from '../lib/resource-data';
import { operationsGuides } from '../lib/operations-data';
import { governanceGuides } from '../lib/governance-data';
import { deliveryGuides } from '../lib/delivery-data';
import { leadershipGuides } from '../lib/leadership-data';
import { workshopGuides } from '../lib/workshop-data';
import { interviewGuides, runbookGuides, patternGuides, architectureGuides } from '../lib/enterprise-center-data';
import { certificationGuides, learningPlanGuides, assessmentGuides, downloadGuides } from '../lib/learning-center-data';
import { projectGuides, portfolioGuides, troubleshootingGuides, checklistGuides } from '../lib/practice-center-data';

const baseUrl = 'https://learn.omsaravanabhava.org';
const coreRoutes = [
  '', '/academies/', '/career/', '/resources/', '/operations/', '/governance/', '/delivery/', '/leadership/', '/workshops/', '/interview/', '/runbooks/', '/patterns/', '/architecture/', '/certifications/', '/learning-plans/', '/assessments/', '/downloads/', '/projects/', '/portfolio/', '/troubleshooting/', '/checklists/', '/tracks/', '/tracks/devops/', '/tracks/azure-cloud/', '/tracks/platform-engineering/', '/tracks/cloud-security/',
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
const careerRoutes = academies.flatMap((academy) => [`/career/${academy.slug}/`, ...careerResources.map((resource) => `/career/${academy.slug}/${resource.slug}/`)]);
const resourceRoutes = academies.flatMap((academy) => [`/resources/${academy.slug}/`, ...resourceTypes.map((resource) => `/resources/${academy.slug}/${resource.slug}/`)]);
const operationsRoutes = academies.flatMap((academy) => [`/operations/${academy.slug}/`, ...operationsGuides.map((guide) => `/operations/${academy.slug}/${guide.slug}/`)]);
const governanceRoutes = academies.flatMap((academy) => [`/governance/${academy.slug}/`, ...governanceGuides.map((guide) => `/governance/${academy.slug}/${guide.slug}/`)]);
const deliveryRoutes = academies.flatMap((academy) => [`/delivery/${academy.slug}/`, ...deliveryGuides.map((guide) => `/delivery/${academy.slug}/${guide.slug}/`)]);
const leadershipRoutes = academies.flatMap((academy) => [`/leadership/${academy.slug}/`, ...leadershipGuides.map((guide) => `/leadership/${academy.slug}/${guide.slug}/`)]);
const workshopRoutes = academies.flatMap((academy) => [`/workshops/${academy.slug}/`, ...workshopGuides.map((guide) => `/workshops/${academy.slug}/${guide.slug}/`)]);
const interviewRoutes = academies.flatMap((academy) => [`/interview/${academy.slug}/`, ...interviewGuides.map((guide) => `/interview/${academy.slug}/${guide.slug}/`)]);
const runbookRoutes = academies.flatMap((academy) => [`/runbooks/${academy.slug}/`, ...runbookGuides.map((guide) => `/runbooks/${academy.slug}/${guide.slug}/`)]);
const patternRoutes = academies.flatMap((academy) => [`/patterns/${academy.slug}/`, ...patternGuides.map((guide) => `/patterns/${academy.slug}/${guide.slug}/`)]);
const architectureRoutes = academies.flatMap((academy) => [`/architecture/${academy.slug}/`, ...architectureGuides.map((guide) => `/architecture/${academy.slug}/${guide.slug}/`)]);
const certificationRoutes = academies.flatMap((academy) => [`/certifications/${academy.slug}/`, ...certificationGuides.map((guide) => `/certifications/${academy.slug}/${guide.slug}/`)]);
const learningPlanRoutes = academies.flatMap((academy) => [`/learning-plans/${academy.slug}/`, ...learningPlanGuides.map((guide) => `/learning-plans/${academy.slug}/${guide.slug}/`)]);
const assessmentRoutes = academies.flatMap((academy) => [`/assessments/${academy.slug}/`, ...assessmentGuides.map((guide) => `/assessments/${academy.slug}/${guide.slug}/`)]);
const downloadRoutes = academies.flatMap((academy) => [`/downloads/${academy.slug}/`, ...downloadGuides.map((guide) => `/downloads/${academy.slug}/${guide.slug}/`)]);
const projectRoutes = academies.flatMap((academy) => [`/projects/${academy.slug}/`, ...projectGuides.map((guide) => `/projects/${academy.slug}/${guide.slug}/`)]);
const portfolioRoutes = academies.flatMap((academy) => [`/portfolio/${academy.slug}/`, ...portfolioGuides.map((guide) => `/portfolio/${academy.slug}/${guide.slug}/`)]);
const troubleshootingRoutes = academies.flatMap((academy) => [`/troubleshooting/${academy.slug}/`, ...troubleshootingGuides.map((guide) => `/troubleshooting/${academy.slug}/${guide.slug}/`)]);
const checklistRoutes = academies.flatMap((academy) => [`/checklists/${academy.slug}/`, ...checklistGuides.map((guide) => `/checklists/${academy.slug}/${guide.slug}/`)]);

export default function sitemap(): MetadataRoute.Sitemap {
  return [...coreRoutes, ...academyRoutes, ...careerRoutes, ...resourceRoutes, ...operationsRoutes, ...governanceRoutes, ...deliveryRoutes, ...leadershipRoutes, ...workshopRoutes, ...interviewRoutes, ...runbookRoutes, ...patternRoutes, ...architectureRoutes, ...certificationRoutes, ...learningPlanRoutes, ...assessmentRoutes, ...downloadRoutes, ...projectRoutes, ...portfolioRoutes, ...troubleshootingRoutes, ...checklistRoutes].map((route) => ({
    url: `${baseUrl}${route}`,
    changeFrequency: route === '' ? ('weekly' as const) : ('monthly' as const),
    priority: route === '' ? 1 : ['/academies/','/career/','/resources/','/operations/','/governance/','/delivery/','/leadership/','/workshops/','/interview/','/runbooks/','/patterns/','/architecture/','/certifications/','/learning-plans/','/assessments/','/downloads/','/projects/','/portfolio/','/troubleshooting/','/checklists/'].includes(route) ? 0.9 : 0.8,
  }));
}