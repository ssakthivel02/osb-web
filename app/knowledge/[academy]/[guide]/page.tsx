import { EnterpriseGuidePage, enterpriseGuideParams } from '../../../../components/enterprise-center';
import { knowledgeGuides } from '../../../../lib/intelligence-center-data';
export const dynamicParams=false;
export function generateStaticParams(){return enterpriseGuideParams(knowledgeGuides);}
export default function KnowledgeGuidePage({params}:{params:{academy:string;guide:string}}){return <EnterpriseGuidePage academySlug={params.academy} guideSlug={params.guide} category="Knowledge Base" guides={knowledgeGuides}/>;}
