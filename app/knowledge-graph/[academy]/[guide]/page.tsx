import { EnterpriseGuidePage, enterpriseGuideParams } from '../../../../components/enterprise-center';
import { knowledgeGraphGuides } from '../../../../lib/knowledge-graph-data';

export const dynamicParams=false;
export function generateStaticParams(){return enterpriseGuideParams(knowledgeGraphGuides);}
export default async function KnowledgeGraphGuidePage(props:{params: Promise<{academy:string;guide:string}>}) {
  const params = await props.params;
  return <EnterpriseGuidePage academySlug={params.academy} guideSlug={params.guide} category="Enterprise Knowledge Graph" guides={knowledgeGraphGuides}/>;
}
