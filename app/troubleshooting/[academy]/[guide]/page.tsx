import { EnterpriseGuidePage, enterpriseGuideParams } from '../../../../components/enterprise-center';
import { troubleshootingGuides } from '../../../../lib/practice-center-data';
export const dynamicParams=false;
export function generateStaticParams(){return enterpriseGuideParams(troubleshootingGuides);}
export default async function TroubleshootingGuidePage(props:{params: Promise<{academy:string;guide:string}>}) {
  const params = await props.params;
  return <EnterpriseGuidePage academySlug={params.academy} guideSlug={params.guide} category="Troubleshooting Center" guides={troubleshootingGuides}/>;
}