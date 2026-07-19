export type WorkshopGuide = {
  slug: string;
  title: string;
  summary: string;
  sections: { title: string; items: string[] }[];
};

const guide = (slug: string, title: string, summary: string, sections: WorkshopGuide['sections']): WorkshopGuide => ({ slug, title, summary, sections });

export const workshopGuides: WorkshopGuide[] = [
  guide('facilitated-workshop','Facilitated Workshop','Run a focused workshop that moves from an unclear problem to reviewed actions and owners.',[
    {title:'Preparation',items:['Define the decision that must be reached','Invite decision-makers, operators and affected teams','Share constraints and pre-reading before the session']},
    {title:'Workshop flow',items:['Confirm outcomes and non-goals','Map the current state and critical pain points','Compare options using agreed criteria','Capture decisions, actions, owners and due dates']},
    {title:'Quality gate',items:['Every action has one accountable owner','Assumptions and unresolved risks are visible','The next review trigger is agreed']},
  ]),
  guide('design-exercise','Guided Design Exercise','Practise converting requirements into a supportable technical design with explicit trade-offs.',[
    {title:'Inputs',items:['Business outcome and service criticality','Security, compliance and data requirements','Recovery, scale, cost and support constraints']},
    {title:'Design method',items:['Draw context and trust boundaries','Select components and integration patterns','Model failure modes and recovery paths','Record rejected options and trade-offs']},
    {title:'Evidence',items:['Architecture diagram','Decision log','Risk and dependency list','Operational acceptance criteria']},
  ]),
  guide('peer-review','Peer Review Checklist','Review a technical proposal systematically instead of relying on preference or seniority.',[
    {title:'Review dimensions',items:['Requirement traceability','Security and identity','Reliability and recoverability','Operability and observability','Cost and maintainability']},
    {title:'Review behaviour',items:['Challenge assumptions, not people','Separate blocking defects from improvements','Request evidence for high-risk claims','Record dissent and final disposition']},
    {title:'Exit criteria',items:['Blocking findings resolved or accepted','Owners assigned for residual actions','Approval scope and expiry are explicit']},
  ]),
  guide('whiteboard-challenge','Whiteboard Challenge','Prepare for architecture interviews by designing under time pressure and incomplete information.',[
    {title:'First ten minutes',items:['Clarify users, scale, availability and data sensitivity','State assumptions aloud','Define the system boundary and external dependencies']},
    {title:'Design discussion',items:['Start with a simple end-to-end flow','Add resilience, security and observability','Explain trade-offs before adding complexity','Test the design with failure scenarios']},
    {title:'Strong finish',items:['Summarise the chosen approach','Identify the largest remaining risks','Explain what you would validate next']},
  ]),
  guide('decision-simulation','Decision Simulation','Practise making a defensible decision when cost, security, speed and operational control conflict.',[
    {title:'Scenario setup',items:['Define two or three viable options','Assign measurable decision criteria','Identify irreversible and reversible choices']},
    {title:'Evaluation',items:['Score options against evidence','Run sensitivity analysis on uncertain assumptions','Consider migration and exit cost','Identify who carries each operational risk']},
    {title:'Decision record',items:['Chosen option and rationale','Conditions that would invalidate the decision','Review date and accountable owner']},
  ]),
  guide('final-review-pack','Final Review Pack','Assemble a concise evidence pack for technical approval, interview presentation or portfolio review.',[
    {title:'Core artefacts',items:['Executive summary','Architecture and delivery views','Decision and risk registers','Security and operational evidence']},
    {title:'Assurance',items:['Requirements mapped to acceptance criteria','Test results and unresolved defects','Recovery and rollback evidence','Cost and ownership model']},
    {title:'Presentation',items:['Lead with outcomes and risk','Use diagrams instead of dense prose','Keep appendices for deep evidence','Close with decisions required']},
  ]),
];

export const workshopMap = Object.fromEntries(workshopGuides.map((item) => [item.slug, item]));
