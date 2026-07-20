import { EnterpriseGuidePage, enterpriseGuideParams } from '../../../../components/enterprise-center';
import { architectureExplorerGuides } from '../../../../lib/architecture-explorer-data';

export const dynamicParams=false;
export function generateStaticParams(){return enterpriseGuideParams(architectureExplorerGuides);}
export default function ArchitectureExplorerGuidePage({params}:{params:{academy:string;guide:string}}){
  return <EnterpriseGuidePage academySlug={params.academy} guideSlug={params.guide} category="Architecture Explorer" guides={architectureExplorerGuides}/>;
}
