import { EnterpriseGuidePage, enterpriseGuideParams } from '../../../../components/enterprise-center';
import { finopsGuides } from '../../../../lib/advanced-center-data';
export const dynamicParams=false;
export function generateStaticParams(){return enterpriseGuideParams(finopsGuides);}
export default async function FinOpsGuidePage(props:{params: Promise<{academy:string;guide:string}>}) {
  const params = await props.params;
  return <EnterpriseGuidePage academySlug={params.academy} guideSlug={params.guide} category="FinOps Center" guides={finopsGuides}/>;
}