import { EnterpriseAcademy, enterpriseAcademyParams } from '../../../components/enterprise-center';
import { labGuides } from '../../../lib/reference-center-data';
export const dynamicParams=false;
export function generateStaticParams(){return enterpriseAcademyParams();}
export default function LabsAcademyPage({params}:{params:{academy:string}}){return <EnterpriseAcademy basePath="labs" academySlug={params.academy} title="Labs Center" description="Complete guided practical exercises and capture evidence for each outcome." guides={labGuides}/>;}