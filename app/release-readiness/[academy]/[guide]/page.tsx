import { EnterpriseGuidePage, enterpriseGuideParams } from '../../../../components/enterprise-center';
import { releaseReadinessGuides } from '../../../../lib/platform-center-data';
export const dynamicParams=false;
export function generateStaticParams(){return enterpriseGuideParams(releaseReadinessGuides);}
export default function ReleaseReadinessGuidePage({params}:{params:{academy:string;guide:string}}){return <EnterpriseGuidePage academySlug={params.academy} guideSlug={params.guide} category="Release Readiness" guides={releaseReadinessGuides}/>;}