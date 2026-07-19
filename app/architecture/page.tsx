import { EnterpriseHub } from '../../components/enterprise-center';
import { enterpriseCenters } from '../../lib/enterprise-center-data';
const center=enterpriseCenters.architecture;
export default function ArchitectureHub(){return <EnterpriseHub basePath="architecture" eyebrow={center.eyebrow} title={center.title} description={center.description}/>;}
