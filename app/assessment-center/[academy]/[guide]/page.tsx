import { EnterpriseGuidePage, enterpriseGuideParams } from '../../../../components/enterprise-center';
import { assessmentCenterGuides } from '../../../../lib/assessment-center-data';

export const dynamicParams=false;
export function generateStaticParams(){return enterpriseGuideParams(assessmentCenterGuides);}
export default async function AssessmentCenterGuidePage(props:{params: Promise<{academy:string;guide:string}>}) {
  const params = await props.params;
  return <EnterpriseGuidePage academySlug={params.academy} guideSlug={params.guide} category="Enterprise Assessment Center" guides={assessmentCenterGuides}/>;
}
