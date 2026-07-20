import { EnterpriseGuidePage, enterpriseGuideParams } from '../../../../components/enterprise-center';
import { platformOperationsGuides } from '../../../../lib/operations-center-data';
export const dynamicParams=false;
export function generateStaticParams(){return enterpriseGuideParams(platformOperationsGuides);}
export default function PlatformOperationsGuidePage({params}:{params:{academy:string;guide:string}}){return <EnterpriseGuidePage academySlug={params.academy} guideSlug={params.guide} category="Platform Operations Center" guides={platformOperationsGuides}/>;}
