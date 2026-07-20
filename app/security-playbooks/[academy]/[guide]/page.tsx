import { EnterpriseGuidePage, enterpriseGuideParams } from '../../../../components/enterprise-center';
import { securityPlaybookGuides } from '../../../../lib/advanced-center-data';
export const dynamicParams=false;
export function generateStaticParams(){return enterpriseGuideParams(securityPlaybookGuides);}
export default function SecurityPlaybookGuidePage({params}:{params:{academy:string;guide:string}}){return <EnterpriseGuidePage academySlug={params.academy} guideSlug={params.guide} category="Security Playbooks" guides={securityPlaybookGuides}/>;}