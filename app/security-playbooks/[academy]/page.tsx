import { EnterpriseAcademy, enterpriseAcademyParams } from '../../../components/enterprise-center';
import { securityPlaybookGuides } from '../../../lib/advanced-center-data';
export const dynamicParams=false;
export function generateStaticParams(){return enterpriseAcademyParams();}
export default async function SecurityPlaybookAcademyPage(props:{params: Promise<{academy:string}>}) {
  const params = await props.params;
  return <EnterpriseAcademy basePath="security-playbooks" academySlug={params.academy} title="Security Playbooks" description="Use structured response and hardening playbooks to manage security risk." guides={securityPlaybookGuides}/>;
}