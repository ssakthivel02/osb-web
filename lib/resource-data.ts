import { academies } from './academy-data';

export type ResourceType = {
  slug: string;
  title: string;
  summary: string;
  sections: string[];
};

export const resourceTypes: ResourceType[] = [
  {
    slug: 'cheat-sheet',
    title: 'Cheat Sheet',
    summary: 'A compact reference for daily work, revision and interview recall.',
    sections: ['Core terminology','Critical commands and controls','Design rules','Common mistakes','Five-minute review'],
  },
  {
    slug: 'troubleshooting-runbook',
    title: 'Troubleshooting Runbook',
    summary: 'An evidence-led sequence for triage, diagnosis, recovery and prevention.',
    sections: ['Define impact and scope','Collect facts before changes','Test the lowest-risk hypothesis','Recover with rollback ready','Capture root cause and prevention'],
  },
  {
    slug: 'architecture-review',
    title: 'Architecture Review Guide',
    summary: 'A structured design-review checklist covering resilience, security, operations and cost.',
    sections: ['Requirements and constraints','Identity and security boundaries','Resilience and recovery','Operability and observability','Cost, scale and lifecycle'],
  },
  {
    slug: 'migration-playbook',
    title: 'Migration Playbook',
    summary: 'A controlled approach for moving workloads, pipelines or operating models safely.',
    sections: ['Discover current state','Classify dependencies and risk','Design target and rollback','Pilot and validate','Migrate in waves and stabilise'],
  },
  {
    slug: 'delivery-template',
    title: 'Delivery Template',
    summary: 'A reusable structure for planning, implementing, validating and handing over work.',
    sections: ['Objective and acceptance criteria','Design assumptions and decisions','Implementation plan','Testing and evidence','Operational handover'],
  },
  {
    slug: 'weekly-study-plan',
    title: 'Weekly Study Plan',
    summary: 'A seven-day cycle balancing theory, labs, scenarios, recall and evidence.',
    sections: ['Day 1: concepts and vocabulary','Day 2: guided implementation','Day 3: troubleshooting','Day 4: architecture decisions','Day 5: interview drills','Day 6: capstone evidence','Day 7: review and gap closure'],
  },
];

export const resourceAcademies = academies.map((academy) => ({
  slug: academy.slug,
  name: academy.name,
  description: academy.description,
}));

export const resourceAcademyMap = Object.fromEntries(resourceAcademies.map((academy) => [academy.slug, academy]));
export const resourceTypeMap = Object.fromEntries(resourceTypes.map((resource) => [resource.slug, resource]));
