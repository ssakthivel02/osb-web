import { EnterpriseGuidePage, enterpriseGuideParams } from '../../../../components/enterprise-center';
import { dashboardGuides } from '../../../../lib/intelligence-center-data';
export const dynamicParams=false;
export function generateStaticParams(){return enterpriseGuideParams(dashboardGuides);}
export default async function OperationsDashboardGuidePage(props:{params: Promise<{academy:string;guide:string}>}) {
  const params = await props.params;
  return <EnterpriseGuidePage academySlug={params.academy} guideSlug={params.guide} category="Operations Dashboard" guides={dashboardGuides}/>;
}
