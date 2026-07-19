import { EnterpriseHub } from '../../components/enterprise-center';
import { enterpriseCenters } from '../../lib/enterprise-center-data';
const center=enterpriseCenters.runbooks;
export default function RunbookHub(){return <EnterpriseHub basePath="runbooks" eyebrow={center.eyebrow} title={center.title} description={center.description}/>;}
