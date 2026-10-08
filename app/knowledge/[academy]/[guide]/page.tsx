import { EnterpriseGuidePage, enterpriseGuideParams } from '../../../../components/enterprise-center';
import { knowledgeGuides } from '../../../../lib/intelligence-center-data';
export const dynamicParams=false;
export function generateStaticParams(){return enterpriseGuideParams(knowledgeGuides);}
export default async function KnowledgeGuidePage(props:{params: Promise<{academy:string;guide:string}>}) {
  const params = await props.params;
  return <EnterpriseGuidePage academySlug={params.academy} guideSlug={params.guide} category="Knowledge Base" guides={knowledgeGuides}/>;
}
