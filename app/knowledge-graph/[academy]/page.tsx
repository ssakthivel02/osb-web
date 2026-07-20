import { EnterpriseAcademy, enterpriseAcademyParams } from '../../../components/enterprise-center';
import { knowledgeGraphGuides } from '../../../lib/knowledge-graph-data';

export const dynamicParams=false;
export function generateStaticParams(){return enterpriseAcademyParams();}
export default function KnowledgeGraphAcademyPage({params}:{params:{academy:string}}){
  return <EnterpriseAcademy basePath="knowledge-graph" academySlug={params.academy} title="Enterprise Knowledge Graph" description="Trace prerequisites, relationships, architecture dependencies, operational responsibilities and validation evidence across connected enterprise technologies." guides={knowledgeGraphGuides}/>;
}
