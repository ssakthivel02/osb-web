import { EnterpriseAcademy, enterpriseAcademyParams } from '../../../components/enterprise-center';
import { observabilityGuides } from '../../../lib/operations-center-data';
export const dynamicParams=false;
export function generateStaticParams(){return enterpriseAcademyParams();}
export default async function ObservabilityAcademyPage(props:{params: Promise<{academy:string}>}) {
  const params = await props.params;
  return <EnterpriseAcademy basePath="observability-center" academySlug={params.academy} title="Observability Center" description="Apply production telemetry, alerting and service-level practices to this academy." guides={observabilityGuides}/>;
}
