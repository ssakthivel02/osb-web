import { EnterpriseAcademy, enterpriseAcademyParams } from '../../../components/enterprise-center';
import { templateLibraryGuides } from '../../../lib/experience-center-data';
export const dynamicParams=false;
export function generateStaticParams(){return enterpriseAcademyParams();}
export default async function Page(props:{params: Promise<{academy:string}>}) {
  const params = await props.params;
  return <EnterpriseAcademy basePath="template-library" academySlug={params.academy} title="Enterprise Template Library" description="Adopt reusable implementation templates with secure defaults, tests, ownership and release evidence." guides={templateLibraryGuides}/>;
}