import { EnterpriseAcademy, enterpriseAcademyParams } from '../../../components/enterprise-center';
import { interactiveLabGuides } from '../../../lib/interactive-lab-data';

export const dynamicParams=false;
export function generateStaticParams(){return enterpriseAcademyParams();}
export default async function InteractiveLabsAcademyPage(props:{params: Promise<{academy:string}>}) {
  const params = await props.params;
  return <EnterpriseAcademy basePath="interactive-labs" academySlug={params.academy} title="Interactive Labs" description="Complete guided implementation exercises with clear preparation, execution, validation, troubleshooting and cleanup controls." guides={interactiveLabGuides}/>;
}