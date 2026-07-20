import { EnterpriseAcademy, enterpriseAcademyParams } from '../../../components/enterprise-center';
import { releaseReadinessGuides } from '../../../lib/platform-center-data';
export const dynamicParams=false;
export function generateStaticParams(){return enterpriseAcademyParams();}
export default function ReleaseReadinessAcademyPage({params}:{params:{academy:string}}){return <EnterpriseAcademy basePath="release-readiness" academySlug={params.academy} title="Release Readiness" description="Use structured gates to validate design, deployment, operations, change and closure evidence." guides={releaseReadinessGuides}/>;}