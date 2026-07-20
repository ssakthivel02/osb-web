import { EnterpriseAcademy, enterpriseAcademyParams } from '../../../components/enterprise-center';
import { knowledgeGuides } from '../../../lib/intelligence-center-data';
export const dynamicParams=false;
export function generateStaticParams(){return enterpriseAcademyParams();}
export default function KnowledgeAcademyPage({params}:{params:{academy:string}}){return <EnterpriseAcademy basePath="knowledge" academySlug={params.academy} title="Knowledge Base" description="Apply standards, decisions, FAQs and lessons learned to this academy." guides={knowledgeGuides}/>;}
