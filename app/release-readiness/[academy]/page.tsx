import { EnterpriseAcademy, enterpriseAcademyParams } from '../../../components/enterprise-center';
import { releaseReadinessGuides } from '../../../lib/platform-center-data';
export const dynamicParams=false;
export function generateStaticParams(){return enterpriseAcademyParams();}
export default async function ReleaseReadinessAcademyPage(props:{params: Promise<{academy:string}>}) {
  const params = await props.params;
  return <EnterpriseAcademy basePath="release-readiness" academySlug={params.academy} title="Release Readiness" description="Use structured gates to validate design, deployment, operations, change and closure evidence." guides={releaseReadinessGuides}/>;
}