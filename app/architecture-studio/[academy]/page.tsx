import { EnterpriseAcademy, enterpriseAcademyParams } from '../../../components/enterprise-center';
import { architectureStudioGuides } from '../../../lib/experience-center-data';
export const dynamicParams=false;
export function generateStaticParams(){return enterpriseAcademyParams();}
export default function ArchitectureStudioAcademyPage({params}:{params:{academy:string}}){return <EnterpriseAcademy basePath="architecture-studio" academySlug={params.academy} title="Interactive Architecture Studio" description="Build reviewable architecture models and validate boundaries, flows, controls and failure behaviour." guides={architectureStudioGuides}/>;}