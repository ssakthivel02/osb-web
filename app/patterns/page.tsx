import { EnterpriseHub } from '../../components/enterprise-center';
import { enterpriseCenters } from '../../lib/enterprise-center-data';
const center=enterpriseCenters.patterns;
export default function PatternHub(){return <EnterpriseHub basePath="patterns" eyebrow={center.eyebrow} title={center.title} description={center.description}/>;}
