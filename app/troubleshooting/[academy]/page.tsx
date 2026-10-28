import { EnterpriseAcademy, enterpriseAcademyParams } from '../../../components/enterprise-center';
import { troubleshootingGuides } from '../../../lib/practice-center-data';
export const dynamicParams=false;
export function generateStaticParams(){return enterpriseAcademyParams();}
export default async function TroubleshootingAcademyPage(props:{params: Promise<{academy:string}>}) {
  const params = await props.params;
  return <EnterpriseAcademy basePath="troubleshooting" academySlug={params.academy} title="Troubleshooting Center" description="Apply repeatable diagnostic sequences to common production failure modes." guides={troubleshootingGuides}/>;
}