import { EnterpriseGuidePage, enterpriseGuideParams } from '../../../../components/enterprise-center';
import { assessmentGuides } from '../../../../lib/learning-center-data';
export const dynamicParams=false;
export function generateStaticParams(){return enterpriseGuideParams(assessmentGuides);}
export default async function AssessmentGuidePage(props:{params: Promise<{academy:string;guide:string}>}) {
  const params = await props.params;
  return <EnterpriseGuidePage academySlug={params.academy} guideSlug={params.guide} category="Assessment Center" guides={assessmentGuides}/>;
}
