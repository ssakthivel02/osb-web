import { EnterpriseGuidePage, enterpriseGuideParams } from '../../../../components/enterprise-center';
import { complianceGuides } from '../../../../lib/operations-center-data';
export const dynamicParams=false;
export function generateStaticParams(){return enterpriseGuideParams(complianceGuides);}
export default function ComplianceGuidePage({params}:{params:{academy:string;guide:string}}){return <EnterpriseGuidePage academySlug={params.academy} guideSlug={params.guide} category="Compliance Center" guides={complianceGuides}/>;}
