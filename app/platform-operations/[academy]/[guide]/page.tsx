import { EnterpriseGuidePage, enterpriseGuideParams } from '../../../../components/enterprise-center';
import { platformOperationsGuides } from '../../../../lib/operations-center-data';
export const dynamicParams=false;
export function generateStaticParams(){return enterpriseGuideParams(platformOperationsGuides);}
export default async function PlatformOperationsGuidePage(props:{params: Promise<{academy:string;guide:string}>}) {
  const params = await props.params;
  return <EnterpriseGuidePage academySlug={params.academy} guideSlug={params.guide} category="Platform Operations Center" guides={platformOperationsGuides}/>;
}
