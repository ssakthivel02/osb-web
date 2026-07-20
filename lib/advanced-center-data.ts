export type AdvancedGuide = {
  slug: string;
  title: string;
  summary: string;
  objective: string;
  sections: { heading: string; items: string[] }[];
};

const guide = (slug:string,title:string,summary:string,objective:string,sections:{heading:string;items:string[]}[]):AdvancedGuide => ({slug,title,summary,objective,sections});

export const securityPlaybookGuides: AdvancedGuide[] = [
  guide('identity-compromise','Identity Compromise Playbook','Contain and recover from suspected credential or privileged-access compromise.','Protect identities, preserve evidence and restore trusted access safely.',[
    {heading:'Detect and contain',items:['Confirm indicators and affected identities','Revoke active sessions and risky tokens','Restrict privileged access paths','Preserve authentication and audit evidence']},
    {heading:'Recover and improve',items:['Reset credentials through a trusted channel','Review role assignments and consent grants','Validate conditional access and MFA coverage','Record root cause, lessons and control actions']}
  ]),
  guide('vulnerability-response','Critical Vulnerability Response','Coordinate rapid risk assessment, mitigation and verification for critical vulnerabilities.','Reduce exposure quickly without introducing unmanaged production risk.',[
    {heading:'Assess',items:['Confirm affected versions and reachable assets','Determine exploitability and business impact','Identify compensating controls and dependencies','Assign decision ownership and communication cadence']},
    {heading:'Remediate',items:['Test vendor guidance in a representative environment','Deploy mitigation using controlled change','Verify service health and security telemetry','Track residual risk through formal acceptance']}
  ]),
  guide('secrets-exposure','Secrets Exposure Playbook','Respond to leaked keys, tokens, passwords or certificates.','Invalidate exposed secrets and prove that dependent systems are secure.',[
    {heading:'Immediate action',items:['Identify secret type, scope and privilege','Revoke or rotate the exposed material','Search repositories, logs and build artifacts','Block further distribution and preserve evidence']},
    {heading:'Prevention',items:['Move secrets to managed stores','Enable automated secret scanning','Shorten credential lifetime and scope','Add rotation tests and ownership records']}
  ]),
  guide('security-incident','Security Incident Coordination','Establish a disciplined technical response for a material security event.','Coordinate containment, investigation, recovery and stakeholder decisions.',[
    {heading:'Command',items:['Declare severity and incident leadership','Create a timestamped decision log','Separate containment from investigation workstreams','Define internal and external communications']},
    {heading:'Closure',items:['Validate recovery and monitoring coverage','Document evidence and control failures','Assign corrective actions with owners','Run a post-incident review and exercise']}
  ]),
  guide('hardening-review','Production Hardening Review','Evaluate a platform before production approval.','Confirm minimum security controls are implemented, evidenced and supportable.',[
    {heading:'Control review',items:['Validate identity and least privilege','Review network exposure and encryption','Confirm logging, alerting and retention','Assess patching, backup and recovery controls']},
    {heading:'Approval evidence',items:['Record exceptions and compensating controls','Capture configuration and test evidence','Obtain accountable risk acceptance','Schedule recurring control validation']}
  ])
];

export const finopsGuides: AdvancedGuide[] = [
  guide('cost-baseline','Cost Baseline and Allocation','Create a trustworthy baseline for cloud spend and ownership.','Make costs visible, attributable and suitable for engineering decisions.',[
    {heading:'Build the baseline',items:['Define billing scope and reporting period','Normalize subscriptions, accounts and projects','Map cost to products, teams and environments','Separate shared, fixed and variable spend']},
    {heading:'Govern allocation',items:['Set tagging and metadata standards','Define showback or chargeback rules','Track unallocated spend as a control metric','Reconcile reports with finance records']}
  ]),
  guide('budget-forecast','Budgeting and Forecasting','Translate workload demand and delivery plans into cost forecasts.','Predict spend early enough to support accountable planning.',[
    {heading:'Forecast',items:['Model committed and consumption-based costs','Include growth, seasonality and delivery milestones','Document pricing and usage assumptions','Create best, expected and worst-case views']},
    {heading:'Control',items:['Set thresholds and escalation paths','Compare actuals against forecast weekly','Explain variance using operational drivers','Reforecast after material architecture changes']}
  ]),
  guide('rightsizing','Rightsizing and Waste Reduction','Identify underused resources and remove avoidable spend safely.','Reduce waste without compromising resilience, performance or supportability.',[
    {heading:'Analyse',items:['Use representative utilization windows','Identify idle, oversized and duplicate services','Check resilience and licensing constraints','Prioritize by savings, effort and risk']},
    {heading:'Execute',items:['Test changes with rollback plans','Schedule downscaling and deletion controls','Validate performance after optimization','Record recurring savings and avoided cost']}
  ]),
  guide('unit-economics','Cloud Unit Economics','Relate platform cost to a measurable business or service unit.','Enable teams to optimize cost per outcome rather than total spend alone.',[
    {heading:'Define units',items:['Choose stable demand or value measures','Assign direct and shared cost components','Validate data quality and calculation ownership','Set an initial unit-cost baseline']},
    {heading:'Improve',items:['Track unit cost alongside reliability','Explain changes through demand and architecture','Compare products using consistent boundaries','Use trends to prioritize engineering work']}
  ]),
  guide('finops-operating-model','FinOps Operating Model','Establish responsibilities, cadence and decision rights for cloud economics.','Embed cost accountability into engineering and product delivery.',[
    {heading:'Organisation',items:['Define executive, finance and engineering roles','Create regular cost review forums','Assign product-level cost ownership','Connect optimization work to delivery backlogs']},
    {heading:'Maturity',items:['Measure allocation and forecast accuracy','Track optimization realization','Automate policy and anomaly detection','Review commitments and commercial strategy']}
  ])
];

export const diagramGuides: AdvancedGuide[] = [
  guide('context-diagram','System Context Diagram','Show users, external systems and the platform boundary.','Communicate scope and dependencies clearly to technical and non-technical stakeholders.',[
    {heading:'Model',items:['Define the system of interest','Identify human and system actors','Show trusted external dependencies','Label data or interaction direction']},
    {heading:'Validate',items:['Remove implementation-level noise','Confirm ownership and trust boundaries','Review with security and operations','Version the diagram with the design decision']}
  ]),
  guide('network-diagram','Network and Connectivity Diagram','Document traffic paths, zones, controls and dependencies.','Make connectivity, exposure and failure domains reviewable.',[
    {heading:'Map',items:['Show ingress, egress and east-west paths','Identify address spaces and routing boundaries','Mark firewalls, gateways and private endpoints','Label protocols, ports and name-resolution dependencies']},
    {heading:'Assure',items:['Highlight trust and security zones','Document high availability and failover','Verify paths against deployed configuration','Link monitoring and troubleshooting references']}
  ]),
  guide('deployment-diagram','Deployment Diagram','Represent runtime components and their hosting relationships.','Provide an implementation view suitable for build, release and support teams.',[
    {heading:'Structure',items:['Show environments and deployment units','Map services to compute and data platforms','Identify configuration and secret dependencies','Represent scaling and resilience patterns']},
    {heading:'Operate',items:['Add health, logging and alerting points','Show release and rollback boundaries','Mark stateful components and backup scope','Keep the diagram aligned with automation']}
  ]),
  guide('data-flow-diagram','Data Flow and Trust Diagram','Trace sensitive data through processing and storage boundaries.','Support privacy, security and integration reviews with a precise flow model.',[
    {heading:'Trace',items:['Identify data classes and sources','Show processing, storage and transfer steps','Mark encryption and identity controls','Identify retention and deletion boundaries']},
    {heading:'Review',items:['Test for undocumented flows','Assess cross-boundary exposure','Link controls to threats and requirements','Record approved exceptions and residual risk']}
  ]),
  guide('resilience-diagram','Resilience and Failure-Domain Diagram','Show redundancy, dependencies and recovery paths.','Make availability assumptions and recovery design explicit.',[
    {heading:'Design',items:['Identify zones, regions and fault domains','Show active, passive and quorum relationships','Map backup and replication paths','Document recovery dependencies and sequencing']},
    {heading:'Test',items:['Associate components with RTO and RPO','Mark single points of failure','Link failover procedures and owners','Update after resilience exercises']}
  ])
];

export const infrastructureTemplateGuides: AdvancedGuide[] = [
  guide('landing-zone-template','Landing Zone Template','Define a governed baseline for accounts, subscriptions, identity, network and policy.','Accelerate safe platform onboarding through repeatable architecture.',[
    {heading:'Foundation',items:['Define hierarchy and environment separation','Establish identity and privileged access','Create connectivity and DNS standards','Apply policy, logging and security baselines']},
    {heading:'Adoption',items:['Provide workload onboarding inputs','Publish exceptions and approval paths','Automate validation and deployment','Version and test the template continuously']}
  ]),
  guide('service-module-template','Reusable Service Module','Create a reusable infrastructure module with secure defaults.','Enable teams to consume approved patterns consistently.',[
    {heading:'Interface',items:['Define inputs, outputs and constraints','Choose safe defaults and required controls','Document dependencies and version policy','Provide examples for common scenarios']},
    {heading:'Quality',items:['Add formatting and static validation','Test plan and deployment behavior','Scan for security and policy violations','Publish release notes and upgrade guidance']}
  ]),
  guide('pipeline-template','Infrastructure Delivery Pipeline','Standardize validation, approval, deployment and recovery stages.','Provide a controlled path from change to production.',[
    {heading:'Pipeline',items:['Validate syntax, policy and security','Generate immutable plans or artifacts','Require environment-appropriate approvals','Deploy with identity federation and least privilege']},
    {heading:'Operations',items:['Capture evidence and change metadata','Support rollback or forward-fix procedures','Protect state and deployment credentials','Measure lead time, failure and recovery']}
  ]),
  guide('monitoring-template','Monitoring Baseline Template','Define health, telemetry, alerts and ownership for a service.','Ensure new infrastructure is observable from initial deployment.',[
    {heading:'Telemetry',items:['Define service and dependency health','Collect logs, metrics and traces','Set retention and access controls','Map signals to service objectives']},
    {heading:'Response',items:['Create actionable alert thresholds','Assign routing and escalation ownership','Link alerts to runbooks','Test alerts before production approval']}
  ]),
  guide('handover-template','Production Handover Template','Capture the evidence required to transfer a service into operations.','Make support ownership, risks and procedures explicit before go-live.',[
    {heading:'Readiness',items:['Document architecture and dependencies','Confirm monitoring, backup and recovery','List known risks, exceptions and limitations','Provide support contacts and escalation paths']},
    {heading:'Acceptance',items:['Complete operational walkthroughs','Validate runbooks and access','Record outstanding actions and dates','Obtain accountable service acceptance']}
  ])
];