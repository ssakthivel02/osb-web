import { EnterpriseGuidePage, enterpriseGuideParams } from '../../../../components/enterprise-center';
import { troubleshootingGuides } from '../../../../lib/practice-center-data';
export const dynamicParams=false;
export function generateStaticParams(){return enterpriseGuideParams(troubleshootingGuides);}
export default function TroubleshootingGuidePage({params}:{params:{academy:string;guide:string}}){return <EnterpriseGuidePage academySlug={params.academy} guideSlug={params.guide} category="Troubleshooting Center" guides={troubleshootingGuides}/>;}