import { EnterpriseGuidePage, enterpriseGuideParams } from '../../../../components/enterprise-center';
import { infrastructureTemplateGuides } from '../../../../lib/advanced-center-data';
export const dynamicParams=false;
export function generateStaticParams(){return enterpriseGuideParams(infrastructureTemplateGuides);}
export default function InfrastructureTemplateGuidePage({params}:{params:{academy:string;guide:string}}){return <EnterpriseGuidePage academySlug={params.academy} guideSlug={params.guide} category="Infrastructure Templates" guides={infrastructureTemplateGuides}/>;}