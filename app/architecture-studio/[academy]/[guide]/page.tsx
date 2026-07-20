import { EnterpriseGuidePage, enterpriseGuideParams } from '../../../../components/enterprise-center';
import { architectureStudioGuides } from '../../../../lib/experience-center-data';
export const dynamicParams=false;
export function generateStaticParams(){return enterpriseGuideParams(architectureStudioGuides);}
export default function Page({params}:{params:{academy:string;guide:string}}){return <EnterpriseGuidePage academySlug={params.academy} guideSlug={params.guide} category="Interactive Architecture Studio" guides={architectureStudioGuides}/>;}