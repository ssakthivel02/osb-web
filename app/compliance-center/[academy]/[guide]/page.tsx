import { EnterpriseGuidePage, enterpriseGuideParams } from '../../../../components/enterprise-center';
import { complianceGuides } from '../../../../lib/operations-center-data';
export const dynamicParams=false;
export function generateStaticParams(){return enterpriseGuideParams(complianceGuides);}
export default async function ComplianceGuidePage(props:{params: Promise<{academy:string;guide:string}>}) {
  const params = await props.params;
  return <EnterpriseGuidePage academySlug={params.academy} guideSlug={params.guide} category="Compliance Center" guides={complianceGuides}/>;
}
