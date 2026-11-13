import { EnterpriseAcademy, enterpriseAcademyParams } from '../../../components/enterprise-center';
import { glossaryGuides } from '../../../lib/reference-center-data';
export const dynamicParams=false;
export function generateStaticParams(){return enterpriseAcademyParams();}
export default async function GlossaryAcademyPage(props:{params: Promise<{academy:string}>}) {
  const params = await props.params;
  return <EnterpriseAcademy basePath="glossary" academySlug={params.academy} title="Glossary Center" description="Build precise technical vocabulary and connect each term to practical work." guides={glossaryGuides}/>;
}