import { academies, academyMap } from './academy-data';

export const practiceTypes = ['assessment','flashcards','labs','interview','scenarios'] as const;
export type PracticeType = typeof practiceTypes[number];

export const practiceLabels: Record<PracticeType, { title: string; eyebrow: string; description: string }> = {
  assessment: { title: 'Knowledge assessment', eyebrow: 'Validate understanding', description: 'Test whether you can explain concepts, select controls and reason through production trade-offs.' },
  flashcards: { title: 'Rapid-recall flashcards', eyebrow: 'Strengthen recall', description: 'Review concise prompts before labs, interviews and design discussions.' },
  labs: { title: 'Hands-on lab briefs', eyebrow: 'Build evidence', description: 'Turn concepts into practical implementation, validation and rollback evidence.' },
  interview: { title: 'Senior interview drills', eyebrow: 'Explain decisions', description: 'Practise structured answers covering requirements, risks, controls, evidence and recovery.' },
  scenarios: { title: 'Architecture scenarios', eyebrow: 'Stress-test judgement', description: 'Work through ambiguous production situations where several answers may appear reasonable.' },
};

export function getAcademy(slug: string) { return academyMap[slug]; }
export function academyParams() { return academies.map(({ slug }) => ({ academy: slug })); }

export function assessmentItems(slug: string) {
  const academy = getAcademy(slug);
  return academy?.topics.slice(0, 10).map((topic, index) => ({
    number: index + 1,
    question: `Which design or operational decision best demonstrates production understanding of ${topic.title}?`,
    guidance: `A strong answer should use these outcomes: ${topic.outcomes.join('; ')}. It should also explain risk, evidence and rollback.`,
  })) ?? [];
}

export function flashcardItems(slug: string) {
  const academy = getAcademy(slug);
  return academy?.topics.map((topic) => ({ front: topic.title, back: topic.summary })) ?? [];
}

export function labItems(slug: string) {
  const academy = getAcademy(slug);
  return academy?.topics.map((topic, index) => ({
    number: index + 1,
    title: topic.title,
    objective: topic.practice,
    evidence: `Capture configuration, validation output, one failure test, rollback steps and a short explanation of the design trade-off.`,
  })) ?? [];
}

export function interviewItems(slug: string) {
  const academy = getAcademy(slug);
  return academy?.topics.map((topic) => ({ topic: topic.title, question: topic.interview, framework: 'Clarify requirements → state assumptions → compare options → control risk → validate → explain rollback.' })) ?? [];
}

export function scenarioItems(slug: string) {
  const academy = getAcademy(slug);
  return academy?.topics.slice(0, 8).map((topic, index) => ({
    number: index + 1,
    title: `${topic.title}: production change under pressure`,
    situation: `A business-critical service requires a change involving ${topic.title}. Documentation is incomplete, the maintenance window is limited and stakeholders expect no disruption.`,
    response: `Define the minimum safe evidence, identify blast radius, select validation gates, state abort criteria and prepare a tested recovery path.`,
  })) ?? [];
}
