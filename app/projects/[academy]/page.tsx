import { EnterpriseAcademy, enterpriseAcademyParams } from '../../../components/enterprise-center';
import { projectGuides } from '../../../lib/practice-center-data';
export const dynamicParams=false;
export function generateStaticParams(){return enterpriseAcademyParams();}
export default async function ProjectAcademyPage(props:{params: Promise<{academy:string}>}) {
  const params = await props.params;
  return <EnterpriseAcademy basePath="projects" academySlug={params.academy} title="Project Center" description="Complete structured projects that demonstrate practical delivery and defensible technical decisions." guides={projectGuides}/>;
}