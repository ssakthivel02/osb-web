import { EnterpriseGuidePage, enterpriseGuideParams } from '../../../../components/enterprise-center';
import { knowledgeGraphGuides } from '../../../../lib/knowledge-graph-data';

export const dynamicParams=false;
export function generateStaticParams(){return enterpriseGuideParams(knowledgeGraphGuides);}
export default function KnowledgeGraphGuidePage({params}:{params:{academy:string;guide:string}}){
  return <EnterpriseGuidePage academySlug={params.academy} guideSlug={params.guide} category="Enterprise Knowledge Graph" guides={knowledgeGraphGuides}/>;
}
