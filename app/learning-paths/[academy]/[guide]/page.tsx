import { EnterpriseGuidePage, enterpriseGuideParams } from '../../../../components/enterprise-center';
import { learningPathGuides } from '../../../../lib/platform-center-data';
export const dynamicParams=false;
export function generateStaticParams(){return enterpriseGuideParams(learningPathGuides);}
export default async function LearningPathGuidePage(props:{params: Promise<{academy:string;guide:string}>}) {
  const params = await props.params;
  return <EnterpriseGuidePage academySlug={params.academy} guideSlug={params.guide} category="Learning Paths" guides={learningPathGuides}/>;
}