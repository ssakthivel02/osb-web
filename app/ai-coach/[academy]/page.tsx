import { EnterpriseAcademy, enterpriseAcademyParams } from '../../../components/enterprise-center';
import { aiCoachGuides } from '../../../lib/ai-coach-data';

export const dynamicParams=false;
export function generateStaticParams(){return enterpriseAcademyParams();}
export default function AiCoachAcademyPage({params}:{params:{academy:string}}){
  return <EnterpriseAcademy basePath="ai-coach" academySlug={params.academy} title="AI Coach Platform" description="Select a responsible AI coaching workflow and apply it to verified learning, career, architecture or operational evidence." guides={aiCoachGuides}/>;
}
