import { EnterpriseGuidePage, enterpriseGuideParams } from '../../../../components/enterprise-center';
import { commandGuides } from '../../../../lib/reference-center-data';
export const dynamicParams=false;
export function generateStaticParams(){return enterpriseGuideParams(commandGuides);}
export default async function CommandGuidePage(props:{params: Promise<{academy:string;guide:string}>}) {
  const params = await props.params;
  return <EnterpriseGuidePage academySlug={params.academy} guideSlug={params.guide} category="Command Reference" guides={commandGuides}/>;
}