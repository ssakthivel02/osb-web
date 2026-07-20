import { EnterpriseGuidePage, enterpriseGuideParams } from '../../../../components/enterprise-center';
import { scenarioGuides } from '../../../../lib/reference-center-data';
export const dynamicParams=false;
export function generateStaticParams(){return enterpriseGuideParams(scenarioGuides);}
export default function ScenarioGuidePage({params}:{params:{academy:string;guide:string}}){return <EnterpriseGuidePage academySlug={params.academy} guideSlug={params.guide} category="Scenario Center" guides={scenarioGuides}/>;}