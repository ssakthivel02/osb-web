import { EnterpriseAcademy, enterpriseAcademyParams } from '../../../components/enterprise-center';
import { caseStudyGuides } from '../../../lib/intelligence-center-data';
export const dynamicParams=false;
export function generateStaticParams(){return enterpriseAcademyParams();}
export default function CaseStudyAcademyPage({params}:{params:{academy:string}}){return <EnterpriseAcademy basePath="case-studies" academySlug={params.academy} title="Enterprise Case Studies" description="Apply academy knowledge to realistic transformation, migration and operating-model cases." guides={caseStudyGuides}/>;}
