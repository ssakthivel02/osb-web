import { EnterpriseGuidePage, enterpriseGuideParams } from '../../../../components/enterprise-center';
import { aiAssistantGuides } from '../../../../lib/intelligence-center-data';
export const dynamicParams=false;
export function generateStaticParams(){return enterpriseGuideParams(aiAssistantGuides);}
export default async function AiAssistantGuidePage(props:{params: Promise<{academy:string;guide:string}>}) {
  const params = await props.params;
  return <EnterpriseGuidePage academySlug={params.academy} guideSlug={params.guide} category="AI Assistant Center" guides={aiAssistantGuides}/>;
}
