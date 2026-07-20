import { EnterpriseGuidePage, enterpriseGuideParams } from '../../../../components/enterprise-center';
import { glossaryGuides } from '../../../../lib/reference-center-data';
export const dynamicParams=false;
export function generateStaticParams(){return enterpriseGuideParams(glossaryGuides);}
export default function GlossaryGuidePage({params}:{params:{academy:string;guide:string}}){return <EnterpriseGuidePage academySlug={params.academy} guideSlug={params.guide} category="Glossary Center" guides={glossaryGuides}/>;}