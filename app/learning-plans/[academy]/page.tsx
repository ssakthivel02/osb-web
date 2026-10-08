import { EnterpriseAcademy, enterpriseAcademyParams } from '../../../components/enterprise-center';
import { learningPlanGuides } from '../../../lib/learning-center-data';
export const dynamicParams=false;
export function generateStaticParams(){return enterpriseAcademyParams();}
export default async function LearningPlanAcademyPage(props:{params: Promise<{academy:string}>}) {
  const params = await props.params;
  return <EnterpriseAcademy basePath="learning-plans" academySlug={params.academy} title="Learning plans" description="Select the right capability path and produce practical evidence at foundation, engineering, architecture and leadership levels." guides={learningPlanGuides}/>;
}
