import { EnterpriseAcademy, enterpriseAcademyParams } from '../../../components/enterprise-center';
import { assessmentGuides } from '../../../lib/learning-center-data';
export const dynamicParams=false;
export function generateStaticParams(){return enterpriseAcademyParams();}
export default function AssessmentAcademyPage({params}:{params:{academy:string}}){return <EnterpriseAcademy basePath="assessments" academySlug={params.academy} title="Capability assessments" description="Use diagnostic, scenario, hands-on, architecture and capstone assessments to verify real capability." guides={assessmentGuides}/>;}
