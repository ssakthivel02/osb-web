import { EnterpriseGuidePage, enterpriseGuideParams } from '../../../../components/enterprise-center';
import { certificationGuides } from '../../../../lib/learning-center-data';
export const dynamicParams=false;
export function generateStaticParams(){return enterpriseGuideParams(certificationGuides);}
export default function CertificationGuidePage({params}:{params:{academy:string;guide:string}}){return <EnterpriseGuidePage academySlug={params.academy} guideSlug={params.guide} category="Certification Center" guides={certificationGuides}/>;}
