import { EnterpriseAcademy, enterpriseAcademyParams } from '../../../components/enterprise-center';
import { scenarioGuides } from '../../../lib/reference-center-data';
export const dynamicParams=false;
export function generateStaticParams(){return enterpriseAcademyParams();}
export default function ScenarioAcademyPage({params}:{params:{academy:string}}){return <EnterpriseAcademy basePath="scenarios" academySlug={params.academy} title="Scenario Center" description="Work through realistic decisions, constraints and recovery paths." guides={scenarioGuides}/>;}