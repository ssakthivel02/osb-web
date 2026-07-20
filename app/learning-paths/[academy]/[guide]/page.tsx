import { EnterpriseGuidePage, enterpriseGuideParams } from '../../../../components/enterprise-center';
import { learningPathGuides } from '../../../../lib/platform-center-data';
export const dynamicParams=false;
export function generateStaticParams(){return enterpriseGuideParams(learningPathGuides);}
export default function LearningPathGuidePage({params}:{params:{academy:string;guide:string}}){return <EnterpriseGuidePage academySlug={params.academy} guideSlug={params.guide} category="Learning Paths" guides={learningPathGuides}/>;}