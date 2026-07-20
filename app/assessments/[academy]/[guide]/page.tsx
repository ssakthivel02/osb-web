import { EnterpriseGuidePage, enterpriseGuideParams } from '../../../../components/enterprise-center';
import { assessmentGuides } from '../../../../lib/learning-center-data';
export const dynamicParams=false;
export function generateStaticParams(){return enterpriseGuideParams(assessmentGuides);}
export default function AssessmentGuidePage({params}:{params:{academy:string;guide:string}}){return <EnterpriseGuidePage academySlug={params.academy} guideSlug={params.guide} category="Assessment Center" guides={assessmentGuides}/>;}
