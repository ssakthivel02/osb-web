import { EnterpriseGuidePage, enterpriseGuideParams } from '../../../../components/enterprise-center';
import { skillMatrixGuides } from '../../../../lib/platform-center-data';
export const dynamicParams=false;
export function generateStaticParams(){return enterpriseGuideParams(skillMatrixGuides);}
export default function SkillMatrixGuidePage({params}:{params:{academy:string;guide:string}}){return <EnterpriseGuidePage academySlug={params.academy} guideSlug={params.guide} category="Skill Matrix" guides={skillMatrixGuides}/>;}