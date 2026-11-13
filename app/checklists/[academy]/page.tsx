import { EnterpriseAcademy, enterpriseAcademyParams } from '../../../components/enterprise-center';
import { checklistGuides } from '../../../lib/practice-center-data';
export const dynamicParams=false;
export function generateStaticParams(){return enterpriseAcademyParams();}
export default async function ChecklistAcademyPage(props:{params: Promise<{academy:string}>}) {
  const params = await props.params;
  return <EnterpriseAcademy basePath="checklists" academySlug={params.academy} title="Checklist Center" description="Apply practical review gates across design, deployment, operations and handover." guides={checklistGuides}/>;
}