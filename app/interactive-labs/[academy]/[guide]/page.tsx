import { EnterpriseGuidePage, enterpriseGuideParams } from '../../../../components/enterprise-center';
import { interactiveLabGuides } from '../../../../lib/interactive-lab-data';

export const dynamicParams=false;
export function generateStaticParams(){return enterpriseGuideParams(interactiveLabGuides);}
export default function InteractiveLabGuidePage({params}:{params:{academy:string;guide:string}}){
  return <EnterpriseGuidePage academySlug={params.academy} guideSlug={params.guide} category="Interactive Lab Platform" guides={interactiveLabGuides}/>;
}