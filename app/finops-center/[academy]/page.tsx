import { EnterpriseAcademy, enterpriseAcademyParams } from '../../../components/enterprise-center';
import { finopsGuides } from '../../../lib/advanced-center-data';
export const dynamicParams=false;
export function generateStaticParams(){return enterpriseAcademyParams();}
export default function FinOpsAcademyPage({params}:{params:{academy:string}}){return <EnterpriseAcademy basePath="finops-center" academySlug={params.academy} title="FinOps Center" description="Apply cloud financial management practices to engineering and platform decisions." guides={finopsGuides}/>;}