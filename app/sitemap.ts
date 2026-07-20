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
import { labGuides, scenarioGuides, commandGuides, glossaryGuides } from '../lib/reference-center-data';
import { knowledgeGuides, aiAssistantGuides, caseStudyGuides, dashboardGuides } from '../lib/intelligence-center-data';
import { securityPlaybookGuides, finopsGuides, diagramGuides, infrastructureTemplateGuides } from '../lib/advanced-center-data';
import { architectureStudioGuides, templateLibraryGuides, interviewSimulatorGuides, documentationGuides } from '../lib/experience-center-data';
import { learningPathGuides, skillMatrixGuides, releaseReadinessGuides, serviceCatalogueGuides } from '../lib/platform-center-data';
import { observabilityGuides, disasterRecoveryGuides, complianceGuides, platformOperationsGuides } from '../lib/operations-center-data';

const baseUrl = 'https://learn.omsaravanabhava.org';
const coreRoutes = [
  '', '/academies/', '/career/', '/resources/', '/operations/', '/governance/', '/delivery/', '/leadership/', '/workshops/', '/interview/', '/runbooks/', '/patterns/', '/architecture/', '/certifications/', '/learning-plans/', '/assessments/', '/downloads/', '/projects/', '/portfolio/', '/troubleshooting/', '/checklists/', '/labs/', '/scenarios/', '/commands/', '/glossary/', '/knowledge/', '/ai-assistant/', '/case-studies/', '/operations-dashboard/', '/security-playbooks/', '/finops-center/', '/architecture-diagrams/', '/infrastructure-templates/', '/architecture-studio/', '/template-library/', '/interview-simulator/', '/enterprise-documentation/', '/learning-paths/', '/skill-matrix/', '/release-readiness/', '/service-catalogue/', '/observability-center/', '/disaster-recovery/', '/compliance-center/', '/platform-operations/', '/tracks/', '/tracks/devops/', '/tracks/azure-cloud/', '/tracks/platform-engineering/', '/tracks/cloud-security/',
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
const labRoutes = academies.flatMap((academy) => [`/labs/${academy.slug}/`, ...labGuides.map((guide) => `/labs/${academy.slug}/${guide.slug}/`)]);
const scenarioRoutes = academies.flatMap((academy) => [`/scenarios/${academy.slug}/`, ...scenarioGuides.map((guide) => `/scenarios/${academy.slug}/${guide.slug}/`)]);
const commandRoutes = academies.flatMap((academy) => [`/commands/${academy.slug}/`, ...commandGuides.map((guide) => `/commands/${academy.slug}/${guide.slug}/`)]);
const glossaryRoutes = academies.flatMap((academy) => [`/glossary/${academy.slug}/`, ...glossaryGuides.map((guide) => `/glossary/${academy.slug}/${guide.slug}/`)]);
const knowledgeRoutes = academies.flatMap((academy) => [`/knowledge/${academy.slug}/`, ...knowledgeGuides.map((guide) => `/knowledge/${academy.slug}/${guide.slug}/`)]);
const aiAssistantRoutes = academies.flatMap((academy) => [`/ai-assistant/${academy.slug}/`, ...aiAssistantGuides.map((guide) => `/ai-assistant/${academy.slug}/${guide.slug}/`)]);
const caseStudyRoutes = academies.flatMap((academy) => [`/case-studies/${academy.slug}/`, ...caseStudyGuides.map((guide) => `/case-studies/${academy.slug}/${guide.slug}/`)]);
const dashboardRoutes = academies.flatMap((academy) => [`/operations-dashboard/${academy.slug}/`, ...dashboardGuides.map((guide) => `/operations-dashboard/${academy.slug}/${guide.slug}/`)]);
const securityPlaybookRoutes = academies.flatMap((academy) => [`/security-playbooks/${academy.slug}/`, ...securityPlaybookGuides.map((guide) => `/security-playbooks/${academy.slug}/${guide.slug}/`)]);
const finopsRoutes = academies.flatMap((academy) => [`/finops-center/${academy.slug}/`, ...finopsGuides.map((guide) => `/finops-center/${academy.slug}/${guide.slug}/`)]);
const diagramRoutes = academies.flatMap((academy) => [`/architecture-diagrams/${academy.slug}/`, ...diagramGuides.map((guide) => `/architecture-diagrams/${academy.slug}/${guide.slug}/`)]);
const infrastructureTemplateRoutes = academies.flatMap((academy) => [`/infrastructure-templates/${academy.slug}/`, ...infrastructureTemplateGuides.map((guide) => `/infrastructure-templates/${academy.slug}/${guide.slug}/`)]);
const architectureStudioRoutes = academies.flatMap((academy) => [`/architecture-studio/${academy.slug}/`, ...architectureStudioGuides.map((guide) => `/architecture-studio/${academy.slug}/${guide.slug}/`)]);
const templateLibraryRoutes = academies.flatMap((academy) => [`/template-library/${academy.slug}/`, ...templateLibraryGuides.map((guide) => `/template-library/${academy.slug}/${guide.slug}/`)]);
const interviewSimulatorRoutes = academies.flatMap((academy) => [`/interview-simulator/${academy.slug}/`, ...interviewSimulatorGuides.map((guide) => `/interview-simulator/${academy.slug}/${guide.slug}/`)]);
const documentationRoutes = academies.flatMap((academy) => [`/enterprise-documentation/${academy.slug}/`, ...documentationGuides.map((guide) => `/enterprise-documentation/${academy.slug}/${guide.slug}/`)]);
const learningPathRoutes = academies.flatMap((academy) => [`/learning-paths/${academy.slug}/`, ...learningPathGuides.map((guide) => `/learning-paths/${academy.slug}/${guide.slug}/`)]);
const skillMatrixRoutes = academies.flatMap((academy) => [`/skill-matrix/${academy.slug}/`, ...skillMatrixGuides.map((guide) => `/skill-matrix/${academy.slug}/${guide.slug}/`)]);
const releaseReadinessRoutes = academies.flatMap((academy) => [`/release-readiness/${academy.slug}/`, ...releaseReadinessGuides.map((guide) => `/release-readiness/${academy.slug}/${guide.slug}/`)]);
const serviceCatalogueRoutes = academies.flatMap((academy) => [`/service-catalogue/${academy.slug}/`, ...serviceCatalogueGuides.map((guide) => `/service-catalogue/${academy.slug}/${guide.slug}/`)]);
const observabilityRoutes = academies.flatMap((academy) => [`/observability-center/${academy.slug}/`, ...observabilityGuides.map((guide) => `/observability-center/${academy.slug}/${guide.slug}/`)]);
const disasterRecoveryRoutes = academies.flatMap((academy) => [`/disaster-recovery/${academy.slug}/`, ...disasterRecoveryGuides.map((guide) => `/disaster-recovery/${academy.slug}/${guide.slug}/`)]);
const complianceRoutes = academies.flatMap((academy) => [`/compliance-center/${academy.slug}/`, ...complianceGuides.map((guide) => `/compliance-center/${academy.slug}/${guide.slug}/`)]);
const platformOperationsRoutes = academies.flatMap((academy) => [`/platform-operations/${academy.slug}/`, ...platformOperationsGuides.map((guide) => `/platform-operations/${academy.slug}/${guide.slug}/`)]);

export default function sitemap(): MetadataRoute.Sitemap {
  return [...coreRoutes, ...academyRoutes, ...careerRoutes, ...resourceRoutes, ...operationsRoutes, ...governanceRoutes, ...deliveryRoutes, ...leadershipRoutes, ...workshopRoutes, ...interviewRoutes, ...runbookRoutes, ...patternRoutes, ...architectureRoutes, ...certificationRoutes, ...learningPlanRoutes, ...assessmentRoutes, ...downloadRoutes, ...projectRoutes, ...portfolioRoutes, ...troubleshootingRoutes, ...checklistRoutes, ...labRoutes, ...scenarioRoutes, ...commandRoutes, ...glossaryRoutes, ...knowledgeRoutes, ...aiAssistantRoutes, ...caseStudyRoutes, ...dashboardRoutes, ...securityPlaybookRoutes, ...finopsRoutes, ...diagramRoutes, ...infrastructureTemplateRoutes, ...architectureStudioRoutes, ...templateLibraryRoutes, ...interviewSimulatorRoutes, ...documentationRoutes, ...learningPathRoutes, ...skillMatrixRoutes, ...releaseReadinessRoutes, ...serviceCatalogueRoutes, ...observabilityRoutes, ...disasterRecoveryRoutes, ...complianceRoutes, ...platformOperationsRoutes].map((route) => ({
    url: `${baseUrl}${route}`,
    changeFrequency: route === '' ? ('weekly' as const) : ('monthly' as const),
    priority: route === '' ? 1 : ['/academies/','/career/','/resources/','/operations/','/governance/','/delivery/','/leadership/','/workshops/','/interview/','/runbooks/','/patterns/','/architecture/','/certifications/','/learning-plans/','/assessments/','/downloads/','/projects/','/portfolio/','/troubleshooting/','/checklists/','/labs/','/scenarios/','/commands/','/glossary/','/knowledge/','/ai-assistant/','/case-studies/','/operations-dashboard/','/security-playbooks/','/finops-center/','/architecture-diagrams/','/infrastructure-templates/','/architecture-studio/','/template-library/','/interview-simulator/','/enterprise-documentation/','/learning-paths/','/skill-matrix/','/release-readiness/','/service-catalogue/','/observability-center/','/disaster-recovery/','/compliance-center/','/platform-operations/'].includes(route) ? 0.9 : 0.8,
  }));
}
