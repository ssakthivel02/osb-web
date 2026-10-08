import { EnterpriseGuidePage, enterpriseGuideParams } from '../../../../components/enterprise-center';
import { disasterRecoveryGuides } from '../../../../lib/operations-center-data';
export const dynamicParams=false;
export function generateStaticParams(){return enterpriseGuideParams(disasterRecoveryGuides);}
export default async function DisasterRecoveryGuidePage(props:{params: Promise<{academy:string;guide:string}>}) {
  const params = await props.params;
  return <EnterpriseGuidePage academySlug={params.academy} guideSlug={params.guide} category="Disaster Recovery Center" guides={disasterRecoveryGuides}/>;
}
