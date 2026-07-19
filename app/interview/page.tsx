import { EnterpriseHub } from '../../components/enterprise-center';
import { enterpriseCenters } from '../../lib/enterprise-center-data';
const center=enterpriseCenters.interview;
export default function InterviewHub(){return <EnterpriseHub basePath="interview" eyebrow={center.eyebrow} title={center.title} description={center.description}/>;}
