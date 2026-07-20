import { EnterpriseAcademy, enterpriseAcademyParams } from '../../../components/enterprise-center';
import { certificationGuides } from '../../../lib/learning-center-data';
export const dynamicParams=false;
export function generateStaticParams(){return enterpriseAcademyParams();}
export default function CertificationAcademyPage({params}:{params:{academy:string}}){return <EnterpriseAcademy basePath="certifications" academySlug={params.academy} title="Certification preparation" description="Convert the exam blueprint into practical evidence, revision controls and a defensible readiness decision." guides={certificationGuides}/>;}
