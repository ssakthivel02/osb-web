import { EnterpriseGuidePage, enterpriseGuideParams } from '../../../../components/enterprise-center';
import { learningPlanGuides } from '../../../../lib/learning-center-data';
export const dynamicParams=false;
export function generateStaticParams(){return enterpriseGuideParams(learningPlanGuides);}
export default async function LearningPlanGuidePage(props:{params: Promise<{academy:string;guide:string}>}) {
  const params = await props.params;
  return <EnterpriseGuidePage academySlug={params.academy} guideSlug={params.guide} category="Learning Plans" guides={learningPlanGuides}/>;
}
