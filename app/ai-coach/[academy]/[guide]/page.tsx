import { EnterpriseGuidePage, enterpriseGuideParams } from '../../../../components/enterprise-center';
import { aiCoachGuides } from '../../../../lib/ai-coach-data';

export const dynamicParams=false;
export function generateStaticParams(){return enterpriseGuideParams(aiCoachGuides);}
export default async function AiCoachGuidePage(props:{params: Promise<{academy:string;guide:string}>}) {
  const params = await props.params;
  return <EnterpriseGuidePage academySlug={params.academy} guideSlug={params.guide} category="AI Coach Platform" guides={aiCoachGuides}/>;
}
