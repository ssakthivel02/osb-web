import { EnterpriseGuidePage, enterpriseGuideParams } from '../../../../components/enterprise-center';
import { aiAssistantGuides } from '../../../../lib/intelligence-center-data';
export const dynamicParams=false;
export function generateStaticParams(){return enterpriseGuideParams(aiAssistantGuides);}
export default function AiAssistantGuidePage({params}:{params:{academy:string;guide:string}}){return <EnterpriseGuidePage academySlug={params.academy} guideSlug={params.guide} category="AI Assistant Center" guides={aiAssistantGuides}/>;}
