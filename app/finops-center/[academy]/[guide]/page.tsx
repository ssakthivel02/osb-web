import { EnterpriseGuidePage, enterpriseGuideParams } from '../../../../components/enterprise-center';
import { finopsGuides } from '../../../../lib/advanced-center-data';
export const dynamicParams=false;
export function generateStaticParams(){return enterpriseGuideParams(finopsGuides);}
export default function FinOpsGuidePage({params}:{params:{academy:string;guide:string}}){return <EnterpriseGuidePage academySlug={params.academy} guideSlug={params.guide} category="FinOps Center" guides={finopsGuides}/>;}