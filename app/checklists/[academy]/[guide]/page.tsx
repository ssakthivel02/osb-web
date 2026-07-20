import { EnterpriseGuidePage, enterpriseGuideParams } from '../../../../components/enterprise-center';
import { checklistGuides } from '../../../../lib/practice-center-data';
export const dynamicParams=false;
export function generateStaticParams(){return enterpriseGuideParams(checklistGuides);}
export default function ChecklistGuidePage({params}:{params:{academy:string;guide:string}}){return <EnterpriseGuidePage academySlug={params.academy} guideSlug={params.guide} category="Checklist Center" guides={checklistGuides}/>;}