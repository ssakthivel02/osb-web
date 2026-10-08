import { EnterpriseGuidePage, enterpriseGuideParams } from '../../../../components/enterprise-center';
import { glossaryGuides } from '../../../../lib/reference-center-data';
export const dynamicParams=false;
export function generateStaticParams(){return enterpriseGuideParams(glossaryGuides);}
export default async function GlossaryGuidePage(props:{params: Promise<{academy:string;guide:string}>}) {
  const params = await props.params;
  return <EnterpriseGuidePage academySlug={params.academy} guideSlug={params.guide} category="Glossary Center" guides={glossaryGuides}/>;
}