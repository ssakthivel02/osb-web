import { EnterpriseGuidePage, enterpriseGuideParams } from '../../../../components/enterprise-center';
import { aiCoachGuides } from '../../../../lib/ai-coach-data';

export const dynamicParams=false;
export function generateStaticParams(){return enterpriseGuideParams(aiCoachGuides);}
export default function AiCoachGuidePage({params}:{params:{academy:string;guide:string}}){
  return <EnterpriseGuidePage academySlug={params.academy} guideSlug={params.guide} category="AI Coach Platform" guides={aiCoachGuides}/>;
}
