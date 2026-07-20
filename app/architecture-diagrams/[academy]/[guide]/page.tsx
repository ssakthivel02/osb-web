import { EnterpriseGuidePage, enterpriseGuideParams } from '../../../../components/enterprise-center';
import { diagramGuides } from '../../../../lib/advanced-center-data';
export const dynamicParams=false;
export function generateStaticParams(){return enterpriseGuideParams(diagramGuides);}
export default function ArchitectureDiagramGuidePage({params}:{params:{academy:string;guide:string}}){return <EnterpriseGuidePage academySlug={params.academy} guideSlug={params.guide} category="Architecture Diagrams" guides={diagramGuides}/>;}