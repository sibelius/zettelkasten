import questionsData from '../data/questions.json';
import writing from '../data/writing.json';
import {getDocs, toText, withBase, type Doc} from './docs';
import {reading} from './reading';

/** One searchable piece of what I wrote, as Ask Sibelius and the MCP server read it. */
export type Passage = {
  id: string;
  kind: 'note' | 'answer' | 'writing' | 'reading';
  title: string;
  heading: string | null;
  tags: string[];
  url: string;
  section: string;
  date: string | null;
  text: string;
};

/** Short enough to quote, long enough to keep an idea together. */
const MAX = 1400;

function pieces(text: string): string[] {
  const words = text.split(' ');
  const out: string[] = [];
  let current = '';

  for (const word of words) {
    if (current.length + word.length > MAX && current) {
      out.push(current.trim());
      current = '';
    }

    current += `${word} `;
  }

  return current.trim() ? [...out, current.trim()] : out;
}

/** A note split at its ## and ### headings, so a long note answers with the part that matters. */
function notePassages(doc: Doc): Passage[] {
  const body = (doc.entry.body ?? '').replace(/^#\s+.+$/m, '');
  const parts = body.split(/^(?=#{2,3}\s)/m);

  return parts.flatMap((part, partIndex) => {
    const found = part.match(/^#{2,3}\s+(.+)$/m)?.[1]?.replace(/[*_`]/g, '').trim() ?? null;
    const heading = found && found.toLowerCase() !== doc.title.toLowerCase() ? found : null;
    const text = toText(part);

    return pieces(text).map((piece, pieceIndex) => ({
      id: `${doc.route}#${partIndex}.${pieceIndex}`,
      kind: 'note' as const,
      title: doc.title,
      heading,
      tags: doc.tags,
      url: doc.url,
      section: doc.section.label,
      date: doc.updated,
      text: piece,
    }));
  });
}

type Question = {title: string; url: string; date: string; question: string; answer: {html: string} | null};

export async function getPassages(): Promise<Passage[]> {
  const docs = await getDocs();
  const answered = (questionsData as Question[]).filter((question) => question.answer);

  return [
    ...docs.flatMap(notePassages),
    ...answered.map((question) => ({
      id: question.url,
      kind: 'answer' as const,
      title: question.title,
      heading: null,
      tags: [],
      url: question.url,
      section: 'Ask me',
      date: question.date,
      text: `${question.question} ${toText(question.answer!.html)}`.slice(0, MAX * 2),
    })),
    ...writing.map((post) => ({
      id: post.url,
      kind: 'writing' as const,
      title: post.title,
      heading: null,
      tags: [],
      url: post.url,
      section: post.source,
      date: post.date,
      text: post.title,
    })),
    ...reading.map((item) => ({
      id: item.url,
      kind: 'reading' as const,
      title: item.title,
      heading: null,
      tags: [item.kind],
      url: item.url,
      section: 'Reading',
      date: item.date,
      text: [item.note, item.description, item.site ?? item.host].filter(Boolean).join(' '),
    })),
  ].filter((passage) => passage.text);
}

export const askIndexUrl = withBase('/ask-index.json');
