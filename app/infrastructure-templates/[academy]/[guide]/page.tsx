import { EnterpriseGuidePage, enterpriseGuideParams } from '../../../../components/enterprise-center';
import { infrastructureTemplateGuides } from '../../../../lib/advanced-center-data';
export const dynamicParams=false;
export function generateStaticParams(){return enterpriseGuideParams(infrastructureTemplateGuides);}
export default async function InfrastructureTemplateGuidePage(props:{params: Promise<{academy:string;guide:string}>}) {
  const params = await props.params;
  return <EnterpriseGuidePage academySlug={params.academy} guideSlug={params.guide} category="Infrastructure Templates" guides={infrastructureTemplateGuides}/>;
}