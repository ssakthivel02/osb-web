import { EnterpriseAcademy, enterpriseAcademyParams } from '../../../components/enterprise-center';
import { enterpriseCenters } from '../../../lib/enterprise-center-data';
export const dynamicParams=false; export const generateStaticParams=enterpriseAcademyParams;
export default function Page({params}:{params:{academy:string}}){const c=enterpriseCenters.runbooks;return <EnterpriseAcademy basePath="runbooks" academySlug={params.academy} title="Production Runbooks" description={c.description} guides={c.guides}/>;}
