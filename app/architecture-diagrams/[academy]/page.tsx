import { EnterpriseAcademy, enterpriseAcademyParams } from '../../../components/enterprise-center';
import { diagramGuides } from '../../../lib/advanced-center-data';
export const dynamicParams=false;
export function generateStaticParams(){return enterpriseAcademyParams();}
export default async function ArchitectureDiagramAcademyPage(props:{params: Promise<{academy:string}>}) {
  const params = await props.params;
  return <EnterpriseAcademy basePath="architecture-diagrams" academySlug={params.academy} title="Architecture Diagrams" description="Model architecture, connectivity, data flow and resilience clearly." guides={diagramGuides}/>;
}