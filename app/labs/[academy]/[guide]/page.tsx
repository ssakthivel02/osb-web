import { EnterpriseGuidePage, enterpriseGuideParams } from '../../../../components/enterprise-center';
import { labGuides } from '../../../../lib/reference-center-data';
export const dynamicParams=false;
export function generateStaticParams(){return enterpriseGuideParams(labGuides);}
export default function LabGuidePage({params}:{params:{academy:string;guide:string}}){return <EnterpriseGuidePage academySlug={params.academy} guideSlug={params.guide} category="Labs Center" guides={labGuides}/>;}