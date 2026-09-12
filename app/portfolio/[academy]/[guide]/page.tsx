import { EnterpriseGuidePage, enterpriseGuideParams } from '../../../../components/enterprise-center';
import { portfolioGuides } from '../../../../lib/practice-center-data';
export const dynamicParams=false;
export function generateStaticParams(){return enterpriseGuideParams(portfolioGuides);}
export default async function PortfolioGuidePage(props:{params: Promise<{academy:string;guide:string}>}) {
  const params = await props.params;
  return <EnterpriseGuidePage academySlug={params.academy} guideSlug={params.guide} category="Portfolio Center" guides={portfolioGuides}/>;
}