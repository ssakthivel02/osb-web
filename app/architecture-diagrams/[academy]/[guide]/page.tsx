import { EnterpriseGuidePage, enterpriseGuideParams } from '../../../../components/enterprise-center';
import { diagramGuides } from '../../../../lib/advanced-center-data';
export const dynamicParams=false;
export function generateStaticParams(){return enterpriseGuideParams(diagramGuides);}
export default async function ArchitectureDiagramGuidePage(props:{params: Promise<{academy:string;guide:string}>}) {
  const params = await props.params;
  return <EnterpriseGuidePage academySlug={params.academy} guideSlug={params.guide} category="Architecture Diagrams" guides={diagramGuides}/>;
}