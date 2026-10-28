import { EnterpriseGuidePage, enterpriseGuideParams } from '../../../../components/enterprise-center';
import { templateLibraryGuides } from '../../../../lib/experience-center-data';
export const dynamicParams=false;
export function generateStaticParams(){return enterpriseGuideParams(templateLibraryGuides);}
export default async function Page(props:{params: Promise<{academy:string;guide:string}>}) {
  const params = await props.params;
  return <EnterpriseGuidePage academySlug={params.academy} guideSlug={params.guide} category="Enterprise Template Library" guides={templateLibraryGuides}/>;
}