import { EnterpriseGuidePage, enterpriseGuideParams } from '../../../../components/enterprise-center';
import { commandGuides } from '../../../../lib/reference-center-data';
export const dynamicParams=false;
export function generateStaticParams(){return enterpriseGuideParams(commandGuides);}
export default function CommandGuidePage({params}:{params:{academy:string;guide:string}}){return <EnterpriseGuidePage academySlug={params.academy} guideSlug={params.guide} category="Command Reference" guides={commandGuides}/>;}