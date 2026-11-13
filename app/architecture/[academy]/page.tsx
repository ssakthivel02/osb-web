import { EnterpriseAcademy, enterpriseAcademyParams } from '../../../components/enterprise-center';
import { enterpriseCenters } from '../../../lib/enterprise-center-data';
export const dynamicParams=false; export const generateStaticParams=enterpriseAcademyParams;
export default async function Page(props:{params: Promise<{academy:string}>}) {
  const params = await props.params;
  const c=enterpriseCenters.architecture;return <EnterpriseAcademy basePath="architecture" academySlug={params.academy} title="Architecture Gallery" description={c.description} guides={c.guides}/>;
}
