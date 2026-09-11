import { EnterpriseGuidePage, enterpriseGuideParams } from '../../../../components/enterprise-center';
import { scenarioGuides } from '../../../../lib/reference-center-data';
export const dynamicParams=false;
export function generateStaticParams(){return enterpriseGuideParams(scenarioGuides);}
export default async function ScenarioGuidePage(props:{params: Promise<{academy:string;guide:string}>}) {
  const params = await props.params;
  return <EnterpriseGuidePage academySlug={params.academy} guideSlug={params.guide} category="Scenario Center" guides={scenarioGuides}/>;
}