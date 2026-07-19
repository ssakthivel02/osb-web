import { EnterpriseGuidePage, enterpriseGuideParams } from '../../../../components/enterprise-center';
import { enterpriseCenters } from '../../../../lib/enterprise-center-data';
const guides=enterpriseCenters.interview.guides; export const dynamicParams=false; export function generateStaticParams(){return enterpriseGuideParams(guides);}
export default function Page({params}:{params:{academy:string;guide:string}}){return <EnterpriseGuidePage academySlug={params.academy} guideSlug={params.guide} category="Interview Center" guides={guides}/>;}
