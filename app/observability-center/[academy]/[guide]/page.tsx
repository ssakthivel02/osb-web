import { EnterpriseGuidePage, enterpriseGuideParams } from '../../../../components/enterprise-center';
import { observabilityGuides } from '../../../../lib/operations-center-data';
export const dynamicParams=false;
export function generateStaticParams(){return enterpriseGuideParams(observabilityGuides);}
export default function ObservabilityGuidePage({params}:{params:{academy:string;guide:string}}){return <EnterpriseGuidePage academySlug={params.academy} guideSlug={params.guide} category="Observability Center" guides={observabilityGuides}/>;}
