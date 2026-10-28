import { EnterpriseGuidePage, enterpriseGuideParams } from '../../../../components/enterprise-center';
import { architectureExplorerGuides } from '../../../../lib/architecture-explorer-data';

export const dynamicParams=false;
export function generateStaticParams(){return enterpriseGuideParams(architectureExplorerGuides);}
export default async function ArchitectureExplorerGuidePage(props:{params: Promise<{academy:string;guide:string}>}) {
  const params = await props.params;
  return <EnterpriseGuidePage academySlug={params.academy} guideSlug={params.guide} category="Architecture Explorer" guides={architectureExplorerGuides}/>;
}
