import { EnterpriseAcademy, enterpriseAcademyParams } from '../../../components/enterprise-center';
import { dashboardGuides } from '../../../lib/intelligence-center-data';
export const dynamicParams=false;
export function generateStaticParams(){return enterpriseAcademyParams();}
export default async function OperationsDashboardAcademyPage(props:{params: Promise<{academy:string}>}) {
  const params = await props.params;
  return <EnterpriseAcademy basePath="operations-dashboard" academySlug={params.academy} title="Operations Dashboard" description="Track progress, readiness, recommendations and achievements for this academy." guides={dashboardGuides}/>;
}
