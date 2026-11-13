import { EnterpriseGuidePage, enterpriseGuideParams } from '../../../../components/enterprise-center';
import { enterpriseCenters } from '../../../../lib/enterprise-center-data';
const guides=enterpriseCenters.architecture.guides; export const dynamicParams=false; export function generateStaticParams(){return enterpriseGuideParams(guides);}
export default async function Page(props:{params: Promise<{academy:string;guide:string}>}) {
  const params = await props.params;
  return <EnterpriseGuidePage academySlug={params.academy} guideSlug={params.guide} category="Architecture Gallery" guides={guides}/>;
}
