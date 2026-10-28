import { EnterpriseAcademy, enterpriseAcademyParams } from '../../../components/enterprise-center';
import { interviewSimulatorGuides } from '../../../lib/experience-center-data';
export const dynamicParams=false;
export function generateStaticParams(){return enterpriseAcademyParams();}
export default async function Page(props:{params: Promise<{academy:string}>}) {
  const params = await props.params;
  return <EnterpriseAcademy basePath="interview-simulator" academySlug={params.academy} title="Interactive Interview Simulator" description="Practise realistic technical and leadership interviews with repeatable preparation, delivery and review steps." guides={interviewSimulatorGuides}/>;
}