import { EnterpriseAcademy, enterpriseAcademyParams } from '../../../components/enterprise-center';
import { aiAssistantGuides } from '../../../lib/intelligence-center-data';
export const dynamicParams=false;
export function generateStaticParams(){return enterpriseAcademyParams();}
export default async function AiAssistantAcademyPage(props:{params: Promise<{academy:string}>}) {
  const params = await props.params;
  return <EnterpriseAcademy basePath="ai-assistant" academySlug={params.academy} title="AI Assistant Center" description="Use structured AI prompts safely for learning, design, delivery and operations." guides={aiAssistantGuides}/>;
}
