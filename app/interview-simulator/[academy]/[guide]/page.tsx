import { EnterpriseGuidePage, enterpriseGuideParams } from '../../../../components/enterprise-center';
import { interviewSimulatorGuides } from '../../../../lib/experience-center-data';
export const dynamicParams=false;
export function generateStaticParams(){return enterpriseGuideParams(interviewSimulatorGuides);}
export default function Page({params}:{params:{academy:string;guide:string}}){return <EnterpriseGuidePage academySlug={params.academy} guideSlug={params.guide} category="Interactive Interview Simulator" guides={interviewSimulatorGuides}/>;}