import { EnterpriseAcademy, enterpriseAcademyParams } from '../../../components/enterprise-center';
import { dashboardGuides } from '../../../lib/intelligence-center-data';
export const dynamicParams=false;
export function generateStaticParams(){return enterpriseAcademyParams();}
export default function OperationsDashboardAcademyPage({params}:{params:{academy:string}}){return <EnterpriseAcademy basePath="operations-dashboard" academySlug={params.academy} title="Operations Dashboard" description="Track progress, readiness, recommendations and achievements for this academy." guides={dashboardGuides}/>;}
