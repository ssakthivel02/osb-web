import { EnterpriseGuidePage, enterpriseGuideParams } from '../../../../components/enterprise-center';
import { interviewHubGuides } from '../../../../lib/interview-hub-data';

export const dynamicParams=false;
export function generateStaticParams(){return enterpriseGuideParams(interviewHubGuides);}
export default async function InterviewHubGuidePage(props:{params: Promise<{academy:string;guide:string}>}) {
  const params = await props.params;
  return <EnterpriseGuidePage academySlug={params.academy} guideSlug={params.guide} category="Enterprise Interview Preparation" guides={interviewHubGuides}/>;
}
