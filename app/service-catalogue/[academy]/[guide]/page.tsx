import { EnterpriseGuidePage, enterpriseGuideParams } from '../../../../components/enterprise-center';
import { serviceCatalogueGuides } from '../../../../lib/platform-center-data';
export const dynamicParams=false;
export function generateStaticParams(){return enterpriseGuideParams(serviceCatalogueGuides);}
export default function ServiceCatalogueGuidePage({params}:{params:{academy:string;guide:string}}){return <EnterpriseGuidePage academySlug={params.academy} guideSlug={params.guide} category="Service Catalogue" guides={serviceCatalogueGuides}/>;}