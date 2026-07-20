import { EnterpriseAcademy, enterpriseAcademyParams } from '../../../components/enterprise-center';
import { infrastructureTemplateGuides } from '../../../lib/advanced-center-data';
export const dynamicParams=false;
export function generateStaticParams(){return enterpriseAcademyParams();}
export default function InfrastructureTemplateAcademyPage({params}:{params:{academy:string}}){return <EnterpriseAcademy basePath="infrastructure-templates" academySlug={params.academy} title="Infrastructure Templates" description="Use reusable, governed templates to accelerate safe platform delivery." guides={infrastructureTemplateGuides}/>;}