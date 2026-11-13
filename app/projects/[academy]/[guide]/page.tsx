import { EnterpriseGuidePage, enterpriseGuideParams } from '../../../../components/enterprise-center';
import { projectGuides } from '../../../../lib/practice-center-data';
export const dynamicParams=false;
export function generateStaticParams(){return enterpriseGuideParams(projectGuides);}
export default async function ProjectGuidePage(props:{params: Promise<{academy:string;guide:string}>}) {
  const params = await props.params;
  return <EnterpriseGuidePage academySlug={params.academy} guideSlug={params.guide} category="Project Center" guides={projectGuides}/>;
}