import { EnterpriseAcademy, enterpriseAcademyParams } from '../../../components/enterprise-center';
import { interviewHubGuides } from '../../../lib/interview-hub-data';

export const dynamicParams=false;
export function generateStaticParams(){return enterpriseAcademyParams();}
export default function InterviewHubAcademyPage({params}:{params:{academy:string}}){
  return <EnterpriseAcademy basePath="interview-hub" academySlug={params.academy} title="Interview Preparation Hub" description="Practise role-based fundamentals, production scenarios, architecture challenges and evidence-led interview answers." guides={interviewHubGuides}/>;
}
