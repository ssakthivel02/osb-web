import { EnterpriseAcademy, enterpriseAcademyParams } from '../../../components/enterprise-center';
import { serviceCatalogueGuides } from '../../../lib/platform-center-data';
export const dynamicParams=false;
export function generateStaticParams(){return enterpriseAcademyParams();}
export default function ServiceCatalogueAcademyPage({params}:{params:{academy:string}}){return <EnterpriseAcademy basePath="service-catalogue" academySlug={params.academy} title="Service Catalogue" description="Define consumable, supportable and measurable technical services with accountable ownership." guides={serviceCatalogueGuides}/>;}