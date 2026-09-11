import { EnterpriseAcademy, enterpriseAcademyParams } from '../../../components/enterprise-center';
import { architectureExplorerGuides } from '../../../lib/architecture-explorer-data';

export const dynamicParams=false;
export function generateStaticParams(){return enterpriseAcademyParams();}
export default async function ArchitectureExplorerAcademyPage(props:{params: Promise<{academy:string}>}) {
  const params = await props.params;
  return <EnterpriseAcademy basePath="architecture-explorer" academySlug={params.academy} title="Architecture Explorer" description="Review business requirements, design decisions, security, cost, operations, resilience and validation evidence for enterprise architecture patterns." guides={architectureExplorerGuides}/>;
}
