import { EnterpriseAcademy, enterpriseAcademyParams } from '../../../components/enterprise-center';
import { complianceGuides } from '../../../lib/operations-center-data';
export const dynamicParams=false;
export function generateStaticParams(){return enterpriseAcademyParams();}
export default function ComplianceAcademyPage({params}:{params:{academy:string}}){return <EnterpriseAcademy basePath="compliance-center" academySlug={params.academy} title="Compliance Center" description="Apply control, evidence and audit-readiness practices to this academy." guides={complianceGuides}/>;}
