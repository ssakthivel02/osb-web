import { EnterpriseAcademy, enterpriseAcademyParams } from '../../../components/enterprise-center';
import { learningPathGuides } from '../../../lib/platform-center-data';
export const dynamicParams=false;
export function generateStaticParams(){return enterpriseAcademyParams();}
export default function LearningPathAcademyPage({params}:{params:{academy:string}}){return <EnterpriseAcademy basePath="learning-paths" academySlug={params.academy} title="Learning Paths" description="Follow a structured, evidence-based progression aligned to role expectations and practical delivery." guides={learningPathGuides}/>;}