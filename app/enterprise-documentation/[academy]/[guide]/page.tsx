import { EnterpriseGuidePage, enterpriseGuideParams } from '../../../../components/enterprise-center';
import { documentationGuides } from '../../../../lib/experience-center-data';
export const dynamicParams=false;
export function generateStaticParams(){return enterpriseGuideParams(documentationGuides);}
export default function Page({params}:{params:{academy:string;guide:string}}){return <EnterpriseGuidePage academySlug={params.academy} guideSlug={params.guide} category="Enterprise Documentation" guides={documentationGuides}/>;}