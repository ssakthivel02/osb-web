import { EnterpriseGuidePage, enterpriseGuideParams } from '../../../../components/enterprise-center';
import { projectGuides } from '../../../../lib/practice-center-data';
export const dynamicParams=false;
export function generateStaticParams(){return enterpriseGuideParams(projectGuides);}
export default function ProjectGuidePage({params}:{params:{academy:string;guide:string}}){return <EnterpriseGuidePage academySlug={params.academy} guideSlug={params.guide} category="Project Center" guides={projectGuides}/>;}