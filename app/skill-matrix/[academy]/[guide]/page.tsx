import { EnterpriseGuidePage, enterpriseGuideParams } from '../../../../components/enterprise-center';
import { skillMatrixGuides } from '../../../../lib/platform-center-data';
export const dynamicParams=false;
export function generateStaticParams(){return enterpriseGuideParams(skillMatrixGuides);}
export default async function SkillMatrixGuidePage(props:{params: Promise<{academy:string;guide:string}>}) {
  const params = await props.params;
  return <EnterpriseGuidePage academySlug={params.academy} guideSlug={params.guide} category="Skill Matrix" guides={skillMatrixGuides}/>;
}