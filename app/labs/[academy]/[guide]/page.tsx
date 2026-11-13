import { EnterpriseGuidePage, enterpriseGuideParams } from '../../../../components/enterprise-center';
import { labGuides } from '../../../../lib/reference-center-data';
export const dynamicParams=false;
export function generateStaticParams(){return enterpriseGuideParams(labGuides);}
export default async function LabGuidePage(props:{params: Promise<{academy:string;guide:string}>}) {
  const params = await props.params;
  return <EnterpriseGuidePage academySlug={params.academy} guideSlug={params.guide} category="Labs Center" guides={labGuides}/>;
}