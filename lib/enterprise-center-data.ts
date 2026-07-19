export type EnterpriseGuide = {
  slug: string;
  title: string;
  summary: string;
  objective: string;
  sections: { heading: string; items: string[] }[];
};

const guide = (slug:string,title:string,summary:string,objective:string,sections:EnterpriseGuide['sections']):EnterpriseGuide => ({slug,title,summary,objective,sections});

export const interviewGuides: EnterpriseGuide[] = [
  guide('architect-questions','Architect Interview Questions','Senior architecture questions focused on trade-offs, constraints and defensible decisions.','Demonstrate structured thinking rather than product memorisation.',[
    {heading:'Question areas',items:['Requirements and non-functional constraints','Security, resilience and operability','Cost, governance and organisational fit','Migration and adoption sequencing']},
    {heading:'Strong-answer pattern',items:['Clarify assumptions','State decision criteria','Compare viable options','Explain risks and validation evidence']},
    {heading:'Practice prompts',items:['Design for multi-region availability','Reduce privileged-access exposure','Modernise a legacy delivery model','Control platform cost without blocking teams']},
  ]),
  guide('senior-engineer-questions','Senior Engineer Questions','Hands-on questions covering implementation, automation, debugging and safe operations.','Connect engineering detail to production outcomes.',[
    {heading:'Core areas',items:['Build and deployment mechanics','Identity and secret handling','Observability and troubleshooting','Recovery and rollback']},
    {heading:'Evidence expected',items:['Commands and diagnostic sequence','Failure modes','Automation controls','Operational ownership']},
    {heading:'Practice prompts',items:['A deployment succeeds but traffic fails','A stateful workload cannot recover','A pipeline becomes slow and unreliable','A platform upgrade introduces regressions']},
  ]),
  guide('scenario-questions','Scenario Interview Bank','Realistic business and production scenarios with ambiguity and competing priorities.','Practise making clear decisions under incomplete information.',[
    {heading:'Scenario structure',items:['Business context','Technical constraints','Risk signals','Decision deadline']},
    {heading:'Response structure',items:['Stabilise first','Collect evidence','Propose options','Recommend and sequence']},
    {heading:'Assessment criteria',items:['Risk awareness','Communication quality','Technical depth','Pragmatic delivery']},
  ]),
  guide('whiteboard-exercises','Whiteboard Exercises','Architecture drawing exercises for interviews and design reviews.','Explain system boundaries, flows and failure behaviour visually.',[
    {heading:'Required views',items:['Context diagram','Logical architecture','Identity and trust flows','Operations and recovery path']},
    {heading:'Quality checks',items:['Label boundaries','Show dependencies','Mark failure domains','State assumptions']},
    {heading:'Exercises',items:['Enterprise landing zone','Secure software supply chain','Highly available application platform','Self-service developer platform']},
  ]),
  guide('troubleshooting-interview','Production Troubleshooting','Time-boxed diagnosis questions that test prioritisation and evidence gathering.','Show a repeatable first-five-minutes troubleshooting method.',[
    {heading:'Diagnostic order',items:['Confirm impact and scope','Check recent change','Inspect health signals','Trace the failing path']},
    {heading:'Common traps',items:['Restarting before evidence','Changing several variables','Ignoring dependency health','Confusing symptom with cause']},
    {heading:'Closure',items:['Validate recovery','Capture evidence','Prevent recurrence','Communicate status']},
  ]),
  guide('leadership-round','Leadership Interview Round','Questions on influence, governance, conflict and technical strategy.','Demonstrate senior ownership across technology and people.',[
    {heading:'Leadership themes',items:['Decision accountability','Stakeholder alignment','Risk escalation','Coaching and standards']},
    {heading:'Answer method',items:['Situation and constraint','Action and rationale','Measured result','Learning and improvement']},
    {heading:'Executive focus',items:['Business value','Risk exposure','Delivery confidence','Clear next decision']},
  ]),
];

export const runbookGuides: EnterpriseGuide[] = [
  guide('service-outage','Service Outage Recovery','A structured response for partial or complete service unavailability.','Restore service safely while preserving diagnostic evidence.',[
    {heading:'Immediate actions',items:['Declare severity and owner','Confirm customer impact','Freeze risky changes','Open communications channel']},
    {heading:'Technical recovery',items:['Check dependencies','Use known-good rollback','Fail over where validated','Monitor recovery indicators']},
    {heading:'Exit criteria',items:['Service objectives restored','Backlog processed','Evidence retained','Follow-up actions assigned']},
  ]),
  guide('deployment-failure','Deployment Failure','Recover from failed or partially completed application and infrastructure releases.','Prevent an incomplete release from becoming a wider incident.',[
    {heading:'Triage',items:['Identify failed stage','Compare desired and actual state','Check artifact integrity','Assess blast radius']},
    {heading:'Recovery options',items:['Retry safe idempotent steps','Rollback exact artifact','Complete controlled forward fix','Restore configuration baseline']},
    {heading:'Controls',items:['Protected environments','Immutable artifacts','Change evidence','Automated smoke tests']},
  ]),
  guide('identity-incident','Identity and Access Incident','Respond to access failure, privilege misuse or credential exposure.','Contain identity risk without creating uncontrolled business outage.',[
    {heading:'Containment',items:['Disable affected identity','Revoke active sessions','Rotate exposed credentials','Preserve audit logs']},
    {heading:'Investigation',items:['Review sign-in events','Trace privilege changes','Identify affected resources','Confirm persistence mechanisms']},
    {heading:'Recovery',items:['Restore least privilege','Validate conditional controls','Monitor recurrence','Document lessons']},
  ]),
  guide('data-recovery','Data Recovery','Restore data while protecting consistency, auditability and recovery objectives.','Select the safest recovery point and prove integrity.',[
    {heading:'Decision inputs',items:['RPO and RTO','Data criticality','Replication state','Legal retention']},
    {heading:'Recovery steps',items:['Isolate corrupted writes','Select validated restore point','Restore to controlled target','Reconcile and validate']},
    {heading:'Evidence',items:['Restore logs','Integrity checks','Business approval','Updated recovery record']},
  ]),
  guide('capacity-degradation','Capacity and Performance Degradation','Handle saturation, throttling and latency before full outage.','Recover performance while identifying the limiting resource.',[
    {heading:'Signals',items:['Latency percentiles','Queue depth','CPU and memory pressure','Dependency throttling']},
    {heading:'Response',items:['Reduce load safely','Scale validated bottleneck','Protect critical traffic','Capture before-and-after metrics']},
    {heading:'Prevention',items:['Capacity forecast','Load testing','Autoscale boundaries','SLO-based alerts']},
  ]),
  guide('disaster-recovery','Disaster Recovery Activation','Coordinate regional or platform-level recovery using approved recovery plans.','Achieve controlled service restoration with explicit command and evidence.',[
    {heading:'Activation',items:['Confirm disaster criteria','Assign recovery commander','Invoke communications plan','Approve target recovery state']},
    {heading:'Execution',items:['Restore shared foundations','Recover dependencies in order','Validate identity and network paths','Release business services progressively']},
    {heading:'Stand-down',items:['Confirm stability window','Reconcile data','Record exceptions','Plan failback separately']},
  ]),
];

export const patternGuides: EnterpriseGuide[] = [
  guide('landing-zone','Enterprise Landing Zone','A governed foundation for identity, networking, subscriptions, policy and operations.','Create repeatable application onboarding with enforceable guardrails.',[
    {heading:'Core capabilities',items:['Management hierarchy','Connectivity platform','Identity controls','Policy and monitoring']},
    {heading:'Use when',items:['Multiple teams onboard','Regulated workloads exist','Shared services are required','Scale demands automation']},
    {heading:'Watch for',items:['Over-centralisation','Unowned exceptions','Manual subscription creation','Policy without remediation']},
  ]),
  guide('zero-trust','Zero Trust Architecture','Verify explicitly, minimise privilege and assume breach across every access path.','Reduce implicit trust and limit compromise impact.',[
    {heading:'Control planes',items:['Identity assurance','Device and workload posture','Network segmentation','Continuous telemetry']},
    {heading:'Design decisions',items:['Strong authentication','Short-lived credentials','Policy enforcement points','Risk-based access']},
    {heading:'Anti-patterns',items:['Trusted internal network','Permanent admin access','Shared service accounts','Unmonitored exceptions']},
  ]),
  guide('gitops','GitOps Delivery','Use version-controlled desired state and reconciliation for auditable deployment.','Make production changes reviewable, repeatable and recoverable.',[
    {heading:'Elements',items:['Declarative configuration','Protected repository','Reconciliation controller','Drift visibility']},
    {heading:'Benefits',items:['Clear audit trail','Repeatable rollback','Environment consistency','Reduced direct access']},
    {heading:'Risks',items:['Secret leakage','Controller over-privilege','Unreviewed automation','Repository compromise']},
  ]),
  guide('blue-green','Blue-Green Deployment','Run old and new versions in parallel before controlled traffic switching.','Reduce release downtime and enable fast reversal.',[
    {heading:'Requirements',items:['Parallel capacity','Traffic switch control','Backward-compatible data','Automated verification']},
    {heading:'Decision gates',items:['Health checks pass','Data compatibility proven','Observability confirms behaviour','Rollback remains available']},
    {heading:'Limitations',items:['Higher temporary cost','State migration complexity','Long-running connection handling','Operational duplication']},
  ]),
  guide('canary','Canary Release','Expose a new version to a controlled traffic segment and expand using evidence.','Limit blast radius while validating production behaviour.',[
    {heading:'Progression',items:['Internal users','Small percentage','Selected cohorts','Full rollout']},
    {heading:'Signals',items:['Error rate','Latency','Business transactions','Support feedback']},
    {heading:'Controls',items:['Automated abort','Cohort isolation','Feature flags','Version-aware dashboards']},
  ]),
  guide('event-driven','Event-Driven Architecture','Decouple producers and consumers through durable events and asynchronous processing.','Improve scalability and autonomy while handling distributed-system complexity.',[
    {heading:'Design concerns',items:['Event ownership','Ordering and duplication','Schema evolution','Dead-letter handling']},
    {heading:'Operational needs',items:['Correlation IDs','Lag monitoring','Replay controls','Idempotent consumers']},
    {heading:'Use carefully',items:['Simple synchronous workflows','Strict immediate consistency','Low operational maturity','Unclear event contracts']},
  ]),
];

export const architectureGuides: EnterpriseGuide[] = [
  guide('azure-landing-zone','Azure Landing Zone Diagram','Visualise enterprise-scale Azure hierarchy, connectivity and governance.','Explain platform boundaries and application onboarding flow.',[
    {heading:'Diagram layers',items:['Tenant and management groups','Platform subscriptions','Application landing zones','Policy and operations']},
    {heading:'Flows to show',items:['Identity','North-south traffic','East-west traffic','Logging and security events']},
    {heading:'Review questions',items:['Who owns each layer?','Where are exceptions recorded?','How is connectivity approved?','How is drift detected?']},
  ]),
  guide('aks-platform','AKS Platform Architecture','Describe ingress, cluster services, workload identity, networking and operations.','Create an operable AKS reference design.',[
    {heading:'Components',items:['Ingress and DNS','Node pools','Workload identity','Policy and monitoring']},
    {heading:'Failure domains',items:['Availability zones','Node pool separation','Dependency resilience','Upgrade boundaries']},
    {heading:'Evidence',items:['Capacity model','Upgrade plan','Network flow','Recovery test']},
  ]),
  guide('secure-cicd','Secure CI/CD Architecture','Map source, runners, artifacts, approvals, identity federation and deployment targets.','Reduce software supply-chain risk.',[
    {heading:'Trust boundaries',items:['Developer workstation','Source control','Build runner','Artifact store','Production target']},
    {heading:'Controls',items:['Signed commits and artifacts','OIDC federation','Protected environments','Dependency scanning']},
    {heading:'Audit evidence',items:['Review record','Build provenance','Approval history','Deployment digest']},
  ]),
  guide('platform-engineering','Platform Engineering Architecture','Model the internal developer platform, golden paths and control plane.','Balance developer self-service with enterprise governance.',[
    {heading:'Platform products',items:['Service templates','Environment provisioning','Delivery pipelines','Observability defaults']},
    {heading:'Interfaces',items:['Developer portal','APIs and automation','Documentation','Support and feedback']},
    {heading:'Success measures',items:['Lead time','Adoption','Reliability','Developer satisfaction']},
  ]),
  guide('hybrid-connectivity','Hybrid Connectivity Diagram','Show on-premises, cloud, DNS, routing, inspection and resilience paths.','Make traffic behaviour and ownership explicit.',[
    {heading:'Views',items:['Physical connectivity','Logical routing','DNS resolution','Security inspection']},
    {heading:'Resilience',items:['Dual circuits','Diverse devices','Route convergence','Operational failover']},
    {heading:'Validation',items:['Trace representative flows','Confirm asymmetric routing risk','Test name resolution','Exercise failover']},
  ]),
  guide('multi-region','Multi-Region Application Architecture','Design regional isolation, traffic management, data strategy and recovery.','Meet availability goals without hiding consistency trade-offs.',[
    {heading:'Decisions',items:['Active-active or active-passive','Global routing','Data replication','Regional dependency isolation']},
    {heading:'Failure handling',items:['Health detection','Traffic withdrawal','Data protection','Controlled re-entry']},
    {heading:'Proof',items:['Chaos test','Recovery exercise','Latency measurement','RPO and RTO evidence']},
  ]),
];

export const enterpriseCenters = {
  interview: { title:'Enterprise Interview Center', eyebrow:'Interview preparation', description:'Senior technical, architecture, troubleshooting and leadership interview practice.', guides:interviewGuides },
  runbooks: { title:'Production Runbook Center', eyebrow:'Operational readiness', description:'Structured incident, recovery and continuity guidance for production teams.', guides:runbookGuides },
  patterns: { title:'Design Pattern Library', eyebrow:'Architecture patterns', description:'Reusable enterprise patterns with selection criteria, controls and anti-patterns.', guides:patternGuides },
  architecture: { title:'Architecture Gallery', eyebrow:'Reference designs', description:'Diagram-led reference architectures with review questions and evidence expectations.', guides:architectureGuides },
} as const;
