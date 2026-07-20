import type { EnterpriseGuide } from './enterprise-center-data';

const guide=(slug:string,title:string,summary:string,objective:string,sections:EnterpriseGuide['sections']):EnterpriseGuide=>({slug,title,summary,objective,sections});

export const knowledgeGuides:EnterpriseGuide[]=[
  guide('best-practices','Best Practices Library','Production-focused practices for secure, supportable and cost-aware delivery.','Turn proven engineering principles into repeatable team standards.',[
    {heading:'Design discipline',items:['Define requirements and constraints before selecting services','Document trade-offs, assumptions and failure modes','Prefer simple supportable patterns over unnecessary complexity']},
    {heading:'Operational quality',items:['Automate validation and deployment','Measure reliability, security and cost','Review practices after incidents and major releases']}
  ]),
  guide('design-decisions','Design Decision Records','Capture context, options, decisions and consequences clearly.','Create traceable architecture decisions that future teams can understand.',[
    {heading:'Decision structure',items:['State the problem and decision deadline','Compare realistic options using agreed criteria','Record the selected option and rationale']},
    {heading:'Lifecycle',items:['Link evidence and owners','Review decisions when assumptions change','Retire superseded records without deleting history']}
  ]),
  guide('common-mistakes','Common Mistakes','Recognise recurring technical and delivery errors before they reach production.','Use anti-pattern awareness to reduce avoidable risk.',[
    {heading:'Architecture mistakes',items:['Designing without non-functional requirements','Using one tool for every problem','Ignoring identity, networking and recovery dependencies']},
    {heading:'Delivery mistakes',items:['Rebuilding artifacts between environments','Applying production changes manually','Closing work without operational handover']}
  ]),
  guide('faq','Frequently Asked Questions','Clear answers to recurring platform, delivery and operational questions.','Provide consistent answers that reduce support friction.',[
    {heading:'Platform questions',items:['How environments should be separated','How secrets and identities should be managed','How service ownership should be defined']},
    {heading:'Delivery questions',items:['What evidence is required before release','How rollback should be planned','How exceptions should be approved']}
  ]),
  guide('lessons-learned','Lessons Learned','Convert project outcomes and incidents into durable organisational knowledge.','Prevent repeated mistakes and preserve successful approaches.',[
    {heading:'Capture',items:['Describe what happened using evidence','Separate contributing factors from symptoms','Record what worked as well as what failed']},
    {heading:'Action',items:['Assign measurable improvement actions','Update standards, runbooks and training','Review whether actions changed outcomes']}
  ])
];

export const aiAssistantGuides:EnterpriseGuide[]=[
  guide('learning-assistant','AI Learning Assistant','Use AI to explain concepts, create practice tasks and review understanding.','Apply AI as a structured learning accelerator rather than an answer shortcut.',[
    {heading:'Prompting',items:['Provide role, objective and current skill level','Request explanations with examples and trade-offs','Ask for questions before final recommendations']},
    {heading:'Validation',items:['Verify commands and service behaviour','Challenge unsupported assumptions','Record authoritative sources for important decisions']}
  ]),
  guide('architecture-prompts','Architecture Prompt Templates','Reusable prompts for requirements, options, trade-offs and reviews.','Improve the quality and consistency of AI-assisted architecture work.',[
    {heading:'Design prompts',items:['Generate requirement clarification questions','Create option comparison matrices','Produce failure-mode and dependency reviews']},
    {heading:'Review prompts',items:['Challenge security and resilience assumptions','Identify missing operational responsibilities','Convert feedback into decision records']}
  ]),
  guide('infrastructure-prompts','Infrastructure Prompt Library','Prompts for cloud, networking, identity, automation and operations.','Create safer, context-rich infrastructure guidance.',[
    {heading:'Build prompts',items:['Generate implementation checklists','Create validation and rollback steps','Request least-privilege examples']},
    {heading:'Operations prompts',items:['Structure incident triage','Summarise evidence without losing detail','Generate post-change verification plans']}
  ]),
  guide('devops-prompts','DevOps Prompt Collection','Prompts for pipelines, testing, release governance and platform engineering.','Use AI to improve delivery design while retaining human approval.',[
    {heading:'Pipeline design',items:['Define stages, artifacts and controls','Generate failure and recovery scenarios','Review permissions and secret exposure']},
    {heading:'Quality review',items:['Check for unsafe defaults','Identify missing observability','Assess maintainability and reuse']}
  ]),
  guide('troubleshooting-prompts','Troubleshooting Prompt Collection','Prompts that enforce evidence-first diagnosis and controlled recovery.','Avoid random remediation by guiding systematic troubleshooting.',[
    {heading:'Diagnosis',items:['Summarise symptoms, scope and timeline','List hypotheses ordered by evidence','Request low-risk validation steps']},
    {heading:'Recovery',items:['Define containment before remediation','Create verification and rollback criteria','Capture lessons for the runbook']}
  ])
];

export const caseStudyGuides:EnterpriseGuide[]=[
  guide('azure-migration','Azure Migration Case Study','Assess, design and execute a controlled enterprise cloud migration.','Practise migration sequencing, dependency management and operational transition.',[
    {heading:'Discovery',items:['Inventory applications and dependencies','Classify data, risk and compliance needs','Select migration strategies by workload']},
    {heading:'Execution',items:['Build landing-zone prerequisites','Migrate in controlled waves','Validate service ownership and support readiness']}
  ]),
  guide('hybrid-cloud','Hybrid Cloud Case Study','Design identity, network and operations across cloud and on-premises environments.','Balance connectivity, resilience, security and supportability.',[
    {heading:'Architecture',items:['Define trust and identity boundaries','Design routing, DNS and private access','Plan failure modes for connectivity loss']},
    {heading:'Operations',items:['Create shared monitoring','Define cross-team escalation','Test recovery and degraded-mode procedures']}
  ]),
  guide('aks-modernisation','AKS Modernisation Case Study','Modernise a legacy application onto a governed Kubernetes platform.','Evaluate application readiness and platform operating requirements.',[
    {heading:'Application',items:['Identify state, dependencies and scaling needs','Define container and deployment strategy','Plan data migration and rollback']},
    {heading:'Platform',items:['Design cluster, identity and networking','Implement policy and observability','Create upgrade and incident procedures']}
  ]),
  guide('devops-transformation','DevOps Transformation Case Study','Move from fragmented delivery to governed product-aligned engineering.','Connect people, process and technology changes to measurable outcomes.',[
    {heading:'Current state',items:['Map queues, handoffs and failure demand','Measure lead time and deployment risk','Identify ownership gaps']},
    {heading:'Target state',items:['Create reusable delivery capabilities','Automate evidence and controls','Track adoption and service outcomes']}
  ]),
  guide('finops-adoption','FinOps Adoption Case Study','Establish cost visibility, accountability and optimisation practices.','Integrate financial accountability into engineering decisions.',[
    {heading:'Foundation',items:['Define allocation and tagging standards','Create cost ownership and reporting','Set budgets and anomaly detection']},
    {heading:'Optimisation',items:['Prioritise high-value actions','Balance cost with reliability and performance','Measure realised savings and avoided cost']}
  ])
];

export const dashboardGuides:EnterpriseGuide[]=[
  guide('skills-progress','Skills Progress Dashboard','Track capability against academy outcomes and practical evidence.','Make development progress visible and actionable.',[
    {heading:'Measurement',items:['Map skills to observable behaviours','Record labs, projects and reviews','Distinguish exposure from independent capability']},
    {heading:'Action',items:['Identify priority gaps','Recommend the next learning activity','Review progress at regular intervals']}
  ]),
  guide('certification-tracker','Certification Tracker','Plan exams, monitor readiness and retain certification evidence.','Connect certification effort to practical capability.',[
    {heading:'Planning',items:['Record target exam and date','Map domains to learning resources','Schedule practice and review milestones']},
    {heading:'Readiness',items:['Track mock results by domain','Record weak areas and remediation','Confirm logistics and final review']}
  ]),
  guide('learning-statistics','Learning Statistics','Use activity and outcome data to improve learning decisions.','Measure progress without rewarding superficial activity.',[
    {heading:'Useful metrics',items:['Completion by capability outcome','Assessment improvement over time','Practical evidence produced']},
    {heading:'Interpretation',items:['Avoid treating page views as mastery','Compare effort with demonstrated outcomes','Use trends to adapt learning plans']}
  ]),
  guide('recommendations','Recommended Learning','Prioritise the next best activity using goals, gaps and recent evidence.','Provide focused recommendations instead of overwhelming learners.',[
    {heading:'Inputs',items:['Role and target capability','Assessment gaps and project evidence','Available time and deadlines']},
    {heading:'Recommendations',items:['Select one primary next action','Explain why it matters','Define completion evidence']}
  ]),
  guide('achievement-timeline','Achievement Timeline','Present projects, assessments, certifications and milestones chronologically.','Create a credible record of professional development.',[
    {heading:'Evidence',items:['Capture date, outcome and artefact','Link reviewer or validation evidence','State the capability demonstrated']},
    {heading:'Review',items:['Remove duplicate activity','Highlight progression in complexity','Use achievements in portfolio and career reviews']}
  ])
];
