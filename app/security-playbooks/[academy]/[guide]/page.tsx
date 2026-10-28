import { EnterpriseGuidePage, enterpriseGuideParams } from '../../../../components/enterprise-center';
import { securityPlaybookGuides } from '../../../../lib/advanced-center-data';
export const dynamicParams=false;
export function generateStaticParams(){return enterpriseGuideParams(securityPlaybookGuides);}
export default async function SecurityPlaybookGuidePage(props:{params: Promise<{academy:string;guide:string}>}) {
  const params = await props.params;
  return <EnterpriseGuidePage academySlug={params.academy} guideSlug={params.guide} category="Security Playbooks" guides={securityPlaybookGuides}/>;
}