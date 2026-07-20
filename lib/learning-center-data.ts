export type LearningGuide={slug:string;title:string;summary:string;objective:string;sections:{heading:string;items:string[]}[]};

const guide=(slug:string,title:string,summary:string,objective:string,sections:LearningGuide['sections']):LearningGuide=>({slug,title,summary,objective,sections});

export const certificationGuides:LearningGuide[]=[
 guide('exam-blueprint','Exam Blueprint','Translate certification objectives into a practical preparation map.','Create an evidence-based study plan that connects exam domains to hands-on capability.',[
  {heading:'Blueprint analysis',items:['Map every exam domain to academy topics','Rank objectives by weighting, confidence and operational importance','Identify prerequisite knowledge and hidden dependencies']},
  {heading:'Preparation controls',items:['Define weekly outcomes and revision checkpoints','Link each objective to a lab, scenario or design exercise','Track weak areas with measurable closure criteria']}
 ]),
 guide('study-plan','Eight-Week Study Plan','Use a sustainable weekly cadence for learning, practice and review.','Complete structured preparation without relying on last-minute memorisation.',[
  {heading:'Weekly rhythm',items:['Combine concept study, guided practice and retrieval exercises','Reserve time for troubleshooting and architecture explanation','Review progress using completed evidence rather than hours spent']},
  {heading:'Readiness gates',items:['Run a midpoint diagnostic assessment','Repeat failed objectives through a different learning method','Schedule the final review only after consistent practice scores']}
 ]),
 guide('domain-review','Domain Review Pack','Review each technical domain using concise facts, decisions and failure modes.','Build recall while preserving the reasoning expected from senior practitioners.',[
  {heading:'Knowledge review',items:['Summarise core services, constructs and responsibilities','Compare alternatives using constraints and trade-offs','Record common misconceptions and unsafe assumptions']},
  {heading:'Application review',items:['Explain one production scenario per domain','Describe validation evidence and rollback options','State how security, cost and operability affect the decision']}
 ]),
 guide('practice-exams','Practice Exam Strategy','Use mock exams diagnostically rather than as a score-chasing exercise.','Convert every incorrect answer into a verified knowledge improvement.',[
  {heading:'Attempt strategy',items:['Complete timed and untimed attempts for different purposes','Flag uncertain correct answers for review','Avoid memorising answer positions or wording']},
  {heading:'Error analysis',items:['Classify gaps as knowledge, interpretation or time-management issues','Verify corrections against authoritative product guidance','Retest the concept through a scenario or lab']}
 ]),
 guide('exam-readiness','Final Readiness Review','Assess technical confidence, exam execution and residual risk before booking.','Make a defensible go or defer decision using consistent readiness criteria.',[
  {heading:'Technical readiness',items:['Demonstrate stable scores across fresh question sets','Explain high-weight domains without prompts','Complete core labs and troubleshooting scenarios independently']},
  {heading:'Execution readiness',items:['Practise time allocation and question triage','Prepare identification, environment and contingency requirements','Define a calm review sequence for the final exam minutes']}
 ])
];

export const learningPlanGuides:LearningGuide[]=[
 guide('foundation-path','Foundation Path','Build essential vocabulary, operating concepts and safe defaults.','Establish the baseline required before advanced design and automation work.',[
  {heading:'Foundation outcomes',items:['Explain the platform model and shared responsibilities','Use core services or tools safely in a sandbox','Recognise common failure states and escalation boundaries']},
  {heading:'Evidence',items:['Complete a small end-to-end implementation','Document the architecture and operating assumptions','Explain the result to a non-specialist stakeholder']}
 ]),
 guide('engineer-path','Engineer Path','Develop repeatable implementation, automation and troubleshooting skills.','Operate independently across normal delivery and support scenarios.',[
  {heading:'Engineering capability',items:['Build reusable and reviewable configurations','Integrate identity, networking, security and observability','Diagnose failures using a consistent evidence-first method']},
  {heading:'Delivery evidence',items:['Produce a tested implementation blueprint','Demonstrate rollback and recovery','Record operational handover information']}
 ]),
 guide('architect-path','Architect Path','Move from service knowledge to requirement-led solution design.','Create resilient, governable and supportable architectures with explicit trade-offs.',[
  {heading:'Architecture capability',items:['Capture functional and non-functional requirements','Compare options against risk, cost and organisational constraints','Design failure handling, security and operational ownership']},
  {heading:'Architecture evidence',items:['Produce context, container and deployment views','Record decisions and rejected alternatives','Defend the design through a structured review']}
 ]),
 guide('leadership-path','Technical Leadership Path','Connect technical direction with stakeholder outcomes and delivery systems.','Lead teams through ambiguity while preserving engineering quality.',[
  {heading:'Leadership capability',items:['Set principles, guardrails and measurable outcomes','Create clear ownership and decision forums','Communicate risk and progress for technical and executive audiences']},
  {heading:'Leadership evidence',items:['Publish a transformation roadmap','Run a design or operational review','Resolve a cross-team dependency using transparent governance']}
 ]),
 guide('ninety-day-plan','90-Day Development Plan','Turn learning goals into a focused quarter of practical growth.','Deliver visible improvement through monthly themes and weekly evidence.',[
  {heading:'Plan structure',items:['Define one primary capability outcome for each month','Select weekly tasks that produce reusable evidence','Protect time for reflection, feedback and remediation']},
  {heading:'Progress review',items:['Review outcomes every two weeks','Adjust scope without abandoning the core objective','Close the quarter with a portfolio and next-step plan']}
 ])
];

export const assessmentGuides:LearningGuide[]=[
 guide('diagnostic','Diagnostic Assessment','Establish current capability before selecting a learning path.','Identify knowledge, application and communication gaps objectively.',[
  {heading:'Assessment dimensions',items:['Test concepts, implementation and troubleshooting separately','Include design decisions and trade-off explanations','Measure confidence against demonstrated performance']},
  {heading:'Output',items:['Create a ranked gap register','Assign remediation activities and due dates','Select the correct foundation, engineer or architect path']}
 ]),
 guide('scenario-assessment','Scenario Assessment','Evaluate decisions under realistic constraints rather than isolated facts.','Demonstrate how technical knowledge changes delivery outcomes.',[
  {heading:'Scenario method',items:['Clarify requirements, constraints and missing information','Propose options with benefits, risks and dependencies','Select an approach and define validation evidence']},
  {heading:'Scoring',items:['Score reasoning, safety and completeness','Reward explicit assumptions and rollback planning','Record follow-up questions for deeper review']}
 ]),
 guide('hands-on-check','Hands-On Capability Check','Verify that knowledge can be applied safely in a controlled environment.','Produce working evidence with repeatable steps and operational notes.',[
  {heading:'Execution',items:['Prepare prerequisites and success criteria','Implement the task using source-controlled assets','Validate expected and failure behaviour']},
  {heading:'Review',items:['Inspect security, maintainability and recovery','Capture logs, screenshots or test results','Document improvements before marking complete']}
 ]),
 guide('architecture-review','Architecture Assessment','Assess requirement interpretation, design quality and communication.','Demonstrate senior-level architecture thinking through a reviewable design pack.',[
  {heading:'Design assessment',items:['Model system context, dependencies and trust boundaries','Address availability, security, cost and supportability','Document decisions, assumptions and residual risks']},
  {heading:'Review assessment',items:['Present the design within a fixed timebox','Answer challenge questions with evidence','Update the design based on valid feedback']}
 ]),
 guide('capstone','Capstone Assessment','Combine design, implementation, operations and communication in one final exercise.','Prove end-to-end capability suitable for a portfolio or interview discussion.',[
  {heading:'Capstone delivery',items:['Select a realistic business problem','Create architecture, implementation and test artefacts','Demonstrate incident response and recovery considerations']},
  {heading:'Capstone closure',items:['Present outcomes and trade-offs','Publish lessons learned and future improvements','Map evidence to role or certification expectations']}
 ])
];

export const downloadGuides:LearningGuide[]=[
 guide('checklists','Operational Checklists','Use concise checklists for planning, implementation and production review.','Reduce preventable omissions while retaining professional judgement.',[
  {heading:'Checklist design',items:['Separate mandatory controls from contextual guidance','Make each item observable and testable','Include owner, evidence and exception fields']},
  {heading:'Recommended packs',items:['Pre-deployment readiness checklist','Production acceptance checklist','Incident handover and closure checklist']}
 ]),
 guide('templates','Architecture Templates','Start designs with consistent, reviewable document structures.','Improve architecture quality and reduce time spent recreating standard sections.',[
  {heading:'Template set',items:['High-level and low-level design outlines','Architecture decision record template','Risk, assumption, issue and dependency register']},
  {heading:'Usage guidance',items:['Remove irrelevant sections rather than filling them mechanically','Link claims to diagrams, controls or test evidence','Version documents with the implementation they describe']}
 ]),
 guide('code-samples','Code and Configuration Samples','Use small, secure examples as learning accelerators rather than production shortcuts.','Adapt examples safely while understanding every configuration decision.',[
  {heading:'Sample quality',items:['Use least privilege and safe defaults','Expose assumptions and required variables','Include validation and cleanup steps']},
  {heading:'Adoption controls',items:['Review licensing and provenance','Run tests in an isolated environment','Promote only through normal code review and pipelines']}
 ]),
 guide('cheat-sheets','Technical Cheat Sheets','Provide compact command, concept and troubleshooting references.','Support fast recall without replacing authoritative documentation or reasoning.',[
  {heading:'Reference design',items:['Group commands by operational intent','Include warnings for destructive or privileged actions','Show expected outputs and common failure indicators']},
  {heading:'Maintenance',items:['Assign an owner and review date','Remove deprecated options promptly','Test commands against supported versions']}
 ]),
 guide('review-packs','Review and Handover Packs','Bundle the evidence needed for design approval, release and operations handover.','Create a complete traceable package for accountable production ownership.',[
  {heading:'Review pack',items:['Requirements, architecture and decision records','Security, test and operational readiness evidence','Risks, exceptions and approval outcomes']},
  {heading:'Handover pack',items:['Support model and responsibility matrix','Monitoring, backup and recovery procedures','Known issues, maintenance tasks and escalation routes']}
 ])
];
