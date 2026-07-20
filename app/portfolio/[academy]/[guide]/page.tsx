import { EnterpriseGuidePage, enterpriseGuideParams } from '../../../../components/enterprise-center';
import { portfolioGuides } from '../../../../lib/practice-center-data';
export const dynamicParams=false;
export function generateStaticParams(){return enterpriseGuideParams(portfolioGuides);}
export default function PortfolioGuidePage({params}:{params:{academy:string;guide:string}}){return <EnterpriseGuidePage academySlug={params.academy} guideSlug={params.guide} category="Portfolio Center" guides={portfolioGuides}/>;}