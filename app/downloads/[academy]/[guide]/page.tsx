import { EnterpriseGuidePage, enterpriseGuideParams } from '../../../../components/enterprise-center';
import { downloadGuides } from '../../../../lib/learning-center-data';
export const dynamicParams=false;
export function generateStaticParams(){return enterpriseGuideParams(downloadGuides);}
export default async function DownloadGuidePage(props:{params: Promise<{academy:string;guide:string}>}) {
  const params = await props.params;
  return <EnterpriseGuidePage academySlug={params.academy} guideSlug={params.guide} category="Download Center" guides={downloadGuides}/>;
}
