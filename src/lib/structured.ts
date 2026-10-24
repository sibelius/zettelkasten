import type {Doc} from './docs';

/** Markdown inline syntax to plain text, for content shown outside its note. */
const inline = (value: string) =>
  value
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .replace(/[*_`]/g, '')
    .replace(/\s+/g, ' ')
    .trim();

export type Question = {question: string; answer: string};

/** "- how to scale backend? horizontal scaling, ..." lines, as in the hiring question notes. */
export function parseQuestions(doc: Doc): Question[] {
  return [...(doc.entry.body ?? '').matchAll(/^[-*]\s+(?!\[[ x]\])(.{6,}?\?)\s+(\S.*)$/gm)].map(([, question, answer]) => ({
    question: inline(question),
    answer: inline(answer),
  }));
}

export type Step = {text: string; done: boolean; children: string[]};

/** Top-level task items become steps; indented items under them become their details. */
export function parseSteps(doc: Doc): Step[] {
  const steps: Step[] = [];

  for (const line of (doc.entry.body ?? '').split('\n')) {
    const top = line.match(/^[-*]\s+\[([ x])\]\s+(.+)$/);
    const nested = line.match(/^\s{2,}[-*]\s+(?:\[[ x]\]\s+)?(.+)$/);

    if (top) {
      steps.push({text: inline(top[2]), done: top[1] === 'x', children: []});
    } else if (nested && steps.length > 0) {
      steps[steps.length - 1].children.push(inline(nested[1]));
    }
  }

  return steps;
}
