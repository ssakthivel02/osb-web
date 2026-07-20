import { EnterpriseAcademy, enterpriseAcademyParams } from '../../../components/enterprise-center';
import { checklistGuides } from '../../../lib/practice-center-data';
export const dynamicParams=false;
export function generateStaticParams(){return enterpriseAcademyParams();}
export default function ChecklistAcademyPage({params}:{params:{academy:string}}){return <EnterpriseAcademy basePath="checklists" academySlug={params.academy} title="Checklist Center" description="Apply practical review gates across design, deployment, operations and handover." guides={checklistGuides}/>;}