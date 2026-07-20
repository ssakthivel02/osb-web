import { EnterpriseAcademy, enterpriseAcademyParams } from '../../../components/enterprise-center';
import { commandGuides } from '../../../lib/reference-center-data';
export const dynamicParams=false;
export function generateStaticParams(){return enterpriseAcademyParams();}
export default function CommandAcademyPage({params}:{params:{academy:string}}){return <EnterpriseAcademy basePath="commands" academySlug={params.academy} title="Command Reference" description="Use commands safely with context checks, validation and evidence." guides={commandGuides}/>;}