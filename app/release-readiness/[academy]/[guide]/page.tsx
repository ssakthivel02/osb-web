import { EnterpriseGuidePage, enterpriseGuideParams } from '../../../../components/enterprise-center';
import { releaseReadinessGuides } from '../../../../lib/platform-center-data';
export const dynamicParams=false;
export function generateStaticParams(){return enterpriseGuideParams(releaseReadinessGuides);}
export default async function ReleaseReadinessGuidePage(props:{params: Promise<{academy:string;guide:string}>}) {
  const params = await props.params;
  return <EnterpriseGuidePage academySlug={params.academy} guideSlug={params.guide} category="Release Readiness" guides={releaseReadinessGuides}/>;
}