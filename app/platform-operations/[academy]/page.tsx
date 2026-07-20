import { EnterpriseAcademy, enterpriseAcademyParams } from '../../../components/enterprise-center';
import { platformOperationsGuides } from '../../../lib/operations-center-data';
export const dynamicParams=false;
export function generateStaticParams(){return enterpriseAcademyParams();}
export default function PlatformOperationsAcademyPage({params}:{params:{academy:string}}){return <EnterpriseAcademy basePath="platform-operations" academySlug={params.academy} title="Platform Operations Center" description="Apply platform operating, capacity, patching and configuration practices to this academy." guides={platformOperationsGuides}/>;}
