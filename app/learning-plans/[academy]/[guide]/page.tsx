import { EnterpriseGuidePage, enterpriseGuideParams } from '../../../../components/enterprise-center';
import { learningPlanGuides } from '../../../../lib/learning-center-data';
export const dynamicParams=false;
export function generateStaticParams(){return enterpriseGuideParams(learningPlanGuides);}
export default function LearningPlanGuidePage({params}:{params:{academy:string;guide:string}}){return <EnterpriseGuidePage academySlug={params.academy} guideSlug={params.guide} category="Learning Plans" guides={learningPlanGuides}/>;}
