import { EnterpriseGuidePage, enterpriseGuideParams } from '../../../../components/enterprise-center';
import { caseStudyGuides } from '../../../../lib/intelligence-center-data';
export const dynamicParams=false;
export function generateStaticParams(){return enterpriseGuideParams(caseStudyGuides);}
export default function CaseStudyGuidePage({params}:{params:{academy:string;guide:string}}){return <EnterpriseGuidePage academySlug={params.academy} guideSlug={params.guide} category="Enterprise Case Studies" guides={caseStudyGuides}/>;}
