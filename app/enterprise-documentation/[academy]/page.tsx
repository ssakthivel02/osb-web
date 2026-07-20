import { EnterpriseAcademy, enterpriseAcademyParams } from '../../../components/enterprise-center';
import { documentationGuides } from '../../../lib/experience-center-data';
export const dynamicParams=false;
export function generateStaticParams(){return enterpriseAcademyParams();}
export default function Page({params}:{params:{academy:string}}){return <EnterpriseAcademy basePath="enterprise-documentation" academySlug={params.academy} title="Enterprise Documentation" description="Build complete design, operations, recovery, continuity and handover documentation for production services." guides={documentationGuides}/>;}