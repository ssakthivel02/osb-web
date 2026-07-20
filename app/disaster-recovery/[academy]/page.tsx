import { EnterpriseAcademy, enterpriseAcademyParams } from '../../../components/enterprise-center';
import { disasterRecoveryGuides } from '../../../lib/operations-center-data';
export const dynamicParams=false;
export function generateStaticParams(){return enterpriseAcademyParams();}
export default function DisasterRecoveryAcademyPage({params}:{params:{academy:string}}){return <EnterpriseAcademy basePath="disaster-recovery" academySlug={params.academy} title="Disaster Recovery Center" description="Apply recovery strategy, backup assurance and failover governance to this academy." guides={disasterRecoveryGuides}/>;}
