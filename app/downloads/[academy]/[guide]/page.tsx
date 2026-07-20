import { EnterpriseGuidePage, enterpriseGuideParams } from '../../../../components/enterprise-center';
import { downloadGuides } from '../../../../lib/learning-center-data';
export const dynamicParams=false;
export function generateStaticParams(){return enterpriseGuideParams(downloadGuides);}
export default function DownloadGuidePage({params}:{params:{academy:string;guide:string}}){return <EnterpriseGuidePage academySlug={params.academy} guideSlug={params.guide} category="Download Center" guides={downloadGuides}/>;}
