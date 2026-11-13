import { EnterpriseGuidePage, enterpriseGuideParams } from '../../../../components/enterprise-center';
import { checklistGuides } from '../../../../lib/practice-center-data';
export const dynamicParams=false;
export function generateStaticParams(){return enterpriseGuideParams(checklistGuides);}
export default async function ChecklistGuidePage(props:{params: Promise<{academy:string;guide:string}>}) {
  const params = await props.params;
  return <EnterpriseGuidePage academySlug={params.academy} guideSlug={params.guide} category="Checklist Center" guides={checklistGuides}/>;
}