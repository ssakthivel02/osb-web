import { EnterpriseAcademy, enterpriseAcademyParams } from '../../../components/enterprise-center';
import { downloadGuides } from '../../../lib/learning-center-data';
export const dynamicParams=false;
export function generateStaticParams(){return enterpriseAcademyParams();}
export default async function DownloadAcademyPage(props:{params: Promise<{academy:string}>}) {
  const params = await props.params;
  return <EnterpriseAcademy basePath="downloads" academySlug={params.academy} title="Download resources" description="Use reusable checklists, templates, examples, references and handover packs with appropriate review controls." guides={downloadGuides}/>;
}
