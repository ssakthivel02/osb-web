import { EnterpriseGuidePage, enterpriseGuideParams } from '../../../../components/enterprise-center';
import { dashboardGuides } from '../../../../lib/intelligence-center-data';
export const dynamicParams=false;
export function generateStaticParams(){return enterpriseGuideParams(dashboardGuides);}
export default function OperationsDashboardGuidePage({params}:{params:{academy:string;guide:string}}){return <EnterpriseGuidePage academySlug={params.academy} guideSlug={params.guide} category="Operations Dashboard" guides={dashboardGuides}/>;}
