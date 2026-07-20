import { EnterpriseAcademy, enterpriseAcademyParams } from '../../../components/enterprise-center';
import { portfolioGuides } from '../../../lib/practice-center-data';
export const dynamicParams=false;
export function generateStaticParams(){return enterpriseAcademyParams();}
export default function PortfolioAcademyPage({params}:{params:{academy:string}}){return <EnterpriseAcademy basePath="portfolio" academySlug={params.academy} title="Portfolio Center" description="Create clear, evidence-based technical portfolio material for professional review and interviews." guides={portfolioGuides}/>;}