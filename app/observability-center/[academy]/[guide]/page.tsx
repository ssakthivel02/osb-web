import { EnterpriseGuidePage, enterpriseGuideParams } from '../../../../components/enterprise-center';
import { observabilityGuides } from '../../../../lib/operations-center-data';
export const dynamicParams=false;
export function generateStaticParams(){return enterpriseGuideParams(observabilityGuides);}
export default async function ObservabilityGuidePage(props:{params: Promise<{academy:string;guide:string}>}) {
  const params = await props.params;
  return <EnterpriseGuidePage academySlug={params.academy} guideSlug={params.guide} category="Observability Center" guides={observabilityGuides}/>;
}
