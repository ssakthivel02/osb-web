import { EnterpriseAcademy, enterpriseAcademyParams } from '../../../components/enterprise-center';
import { enterpriseCenters } from '../../../lib/enterprise-center-data';
export const dynamicParams=false; export const generateStaticParams=enterpriseAcademyParams;
export default function Page({params}:{params:{academy:string}}){const c=enterpriseCenters.patterns;return <EnterpriseAcademy basePath="patterns" academySlug={params.academy} title="Design Patterns" description={c.description} guides={c.guides}/>;}
