import { EnterpriseAcademy, enterpriseAcademyParams } from '../../../components/enterprise-center';
import { knowledgeGuides } from '../../../lib/intelligence-center-data';
export const dynamicParams=false;
export function generateStaticParams(){return enterpriseAcademyParams();}
export default async function KnowledgeAcademyPage(props:{params: Promise<{academy:string}>}) {
  const params = await props.params;
  return <EnterpriseAcademy basePath="knowledge" academySlug={params.academy} title="Knowledge Base" description="Apply standards, decisions, FAQs and lessons learned to this academy." guides={knowledgeGuides}/>;
}
