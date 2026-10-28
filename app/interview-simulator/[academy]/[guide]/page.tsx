import { EnterpriseGuidePage, enterpriseGuideParams } from '../../../../components/enterprise-center';
import { interviewSimulatorGuides } from '../../../../lib/experience-center-data';
export const dynamicParams=false;
export function generateStaticParams(){return enterpriseGuideParams(interviewSimulatorGuides);}
export default async function Page(props:{params: Promise<{academy:string;guide:string}>}) {
  const params = await props.params;
  return <EnterpriseGuidePage academySlug={params.academy} guideSlug={params.guide} category="Interactive Interview Simulator" guides={interviewSimulatorGuides}/>;
}