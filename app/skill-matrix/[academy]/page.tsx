import { EnterpriseAcademy, enterpriseAcademyParams } from '../../../components/enterprise-center';
import { skillMatrixGuides } from '../../../lib/platform-center-data';
export const dynamicParams=false;
export function generateStaticParams(){return enterpriseAcademyParams();}
export default async function SkillMatrixAcademyPage(props:{params: Promise<{academy:string}>}) {
  const params = await props.params;
  return <EnterpriseAcademy basePath="skill-matrix" academySlug={params.academy} title="Skill Matrix" description="Assess capability using observable evidence, role expectations and practical delivery outcomes." guides={skillMatrixGuides}/>;
}