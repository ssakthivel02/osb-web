import { EnterpriseAcademy, enterpriseAcademyParams } from '../../../components/enterprise-center';
import { assessmentCenterGuides } from '../../../lib/assessment-center-data';

export const dynamicParams=false;
export function generateStaticParams(){return enterpriseAcademyParams();}
export default function AssessmentCenterAcademyPage({params}:{params:{academy:string}}){
  return <EnterpriseAcademy basePath="assessment-center" academySlug={params.academy} title="Enterprise Assessment Center" description="Select a structured assessment to validate technical knowledge, practical judgement, troubleshooting discipline and production readiness." guides={assessmentCenterGuides}/>;
}
