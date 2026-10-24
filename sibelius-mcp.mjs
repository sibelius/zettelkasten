#!/usr/bin/env node
// Retrieval over what I wrote, shared by Ask Sibelius on /ask and the MCP server. No dependencies, so it
// runs in the browser and in Node, and it never makes anything up: it only returns passages with links.

const SITE = 'https://sibelius.github.io/zettelkasten';
const ASK_URL = 'https://github.com/sibelius/zettelkasten/discussions/new?category=q-a';

/** Words that say nothing about the topic, in English and Portuguese. */
const STOPWORDS = new Set(
  (
    'a an and are as at be but by can could do does did for from had has have how i if in into is it its me my of on or our should so ' +
    'that the their them then there these they this to was we were what when where which who why will with would you your about any ' +
    'some more most much many very just also than too only own same such no not nor all each few other both again further once here ' +
    'vs versus ask sibelius think thoughts opinion tell know want need get use using better best good way ways ' +
    'o os as um uma uns umas de do da dos das no na nos nas em por para pra pro com sem que se e ou mas como qual quais quando onde ' +
    'porque por que quem eu voce vc voces ele ela eles elas meu minha seu sua nosso nossa isso isto esse essa este esta aquele ' +
    'aquela ser estar ter fazer tem sao foi vai sobre mais menos muito muita ja nao sim tambem acha sua opiniao devo deveria'
  ).split(' '),
);

/** Lowercase, no accents, so "programação" finds "programacao". */
const normalize = (text) =>
  text
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase();

/** A light stem: plurals and a few suffixes, enough for "interviews" to find "interview". */
function stem(word) {
  if (word.length > 5 && word.endsWith('ing')) return word.slice(0, -3);
  if (word.length > 4 && word.endsWith('ies')) return `${word.slice(0, -3)}y`;
  if (word.length > 4 && word.endsWith('es') && !word.endsWith('ses')) return word.slice(0, -2);
  if (word.length > 3 && word.endsWith('s') && !word.endsWith('ss')) return word.slice(0, -1);

  return word;
}

const terms = (text) => (normalize(text).match(/[\p{L}\p{N}]+/gu) ?? []).filter((word) => word.length > 1 && !STOPWORDS.has(word)).map(stem);

/** Where a word appears counts: a title match says more than a passing mention. */
const FIELDS = [
  ['title', 3],
  ['heading', 2],
  ['tags', 2],
  ['text', 1],
];

/** Weighted term counts per passage, and how many passages hold each term, for BM25. */
function buildIndex(passages) {
  const docs = passages.map((passage) => {
    const counts = new Map();
    let length = 0;

    for (const [field, weight] of FIELDS) {
      const value = Array.isArray(passage[field]) ? passage[field].join(' ') : passage[field] ?? '';

      for (const term of terms(value)) {
        counts.set(term, (counts.get(term) ?? 0) + weight);
        length += weight;
      }
    }

    return {passage, counts, length};
  });

  const frequency = new Map();

  for (const doc of docs) {
    for (const term of doc.counts.keys()) {
      frequency.set(term, (frequency.get(term) ?? 0) + 1);
    }
  }

  const average = docs.reduce((sum, doc) => sum + doc.length, 0) / Math.max(1, docs.length);

  return {docs, frequency, average};
}

/** The part of a passage around the first word that matched, cut at word boundaries. */
function snippet(text, wanted, length = 320) {
  const words = text.split(/\s+/);
  const first = Math.max(
    0,
    words.findIndex((word) => wanted.has(stem(normalize(word).replace(/[^\p{L}\p{N}]/gu, '')))),
  );
  const start = Math.max(0, first - 12);
  let out = '';

  for (let i = start; i < words.length && out.length < length; i++) {
    out += `${words[i]} `;
  }

  return `${start > 0 ? '…' : ''}${out.trim()}${out.length >= length ? '…' : ''}`;
}

/**
 * Passages that answer `question`, best first, at most `perSource` from the same page.
 * `status` is `ready` when they cover most of the question, `insufficient_evidence` when I have not written about it,
 * and `needs_clarification` when the question has no words to search for. `reading` holds links I shared on the topic.
 */
function search(index, question, {limit = 6, perSource = 2, kinds} = {}) {
  const wanted = [...new Set(terms(question))];

  if (!wanted.length) {
    return {status: 'needs_clarification', terms: [], results: [], reading: []};
  }

  const k1 = 1.2;
  const b = 0.75;
  const total = index.docs.length;
  const scored = [];

  for (const doc of index.docs) {
    if (kinds && !kinds.includes(doc.passage.kind)) {
      continue;
    }

    let score = 0;
    let matched = 0;

    for (const term of wanted) {
      const count = doc.counts.get(term);

      if (!count) {
        continue;
      }

      const n = index.frequency.get(term);
      const idf = Math.log(1 + (total - n + 0.5) / (n + 0.5));
      score += idf * ((count * (k1 + 1)) / (count + k1 * (1 - b + (b * doc.length) / index.average)));
      matched += 1;
    }

    if (matched) {
      // A passage that covers more of the question beats one that repeats a single word.
      scored.push({doc, score: score * (matched / wanted.length), coverage: matched / wanted.length});
    }
  }

  scored.sort((x, y) => y.score - x.score);

  const perUrl = new Map();
  const pick = (from, max) => {
    const out = [];

    for (const {doc, score, coverage} of from) {
      const seen = perUrl.get(doc.passage.url) ?? 0;

      if (seen >= perSource || out.length >= max) {
        continue;
      }

      perUrl.set(doc.passage.url, seen + 1);
      out.push({...doc.passage, text: undefined, snippet: snippet(doc.passage.text ?? '', new Set(wanted)), score: Number(score.toFixed(3)), coverage});
    }

    return out;
  };

  // What I read is not what I think: links I shared only back up an answer, they never are one.
  const own = pick(
    scored.filter(({doc}) => doc.passage.kind !== 'reading'),
    limit,
  );
  const reading = pick(
    scored.filter(({doc}) => doc.passage.kind === 'reading'),
    2,
  );

  // One word of a three-word question is not an answer, it is a coincidence.
  const best = own[0];
  const status = best && best.coverage >= (wanted.length > 2 ? 0.6 : 0.5) && best.score >= 2 ? 'ready' : 'insufficient_evidence';

  return {status, terms: wanted, results: status === 'ready' ? own : own.slice(0, 3), reading};
}

/** Absolute link to a page on the site, for answers read outside it. */
const absolute = (url) => (/^https?:/.test(url) ? url : `${SITE}${url.replace(/^\/zettelkasten/, '')}`);

/** A new GitHub Discussion with the question and what the notes had, ready to submit. */
function discussionUrl(question, results = []) {
  const title = question.trim().replace(/\s+/g, ' ').slice(0, 120);
  const found = results.length
    ? `What Ask Sibelius found in the notes:\n\n${results.map((result) => `- [${result.title}](${absolute(result.url)})`).join('\n')}`
    : 'Ask Sibelius found nothing about this in the notes yet.';
  const body = `${question.trim()}\n\n---\n\n${found}\n\n_Sent from Ask Sibelius on ${SITE}/ask_`;

  return `${ASK_URL}&title=${encodeURIComponent(title)}&body=${encodeURIComponent(body)}`;
}

// Ask Sibelius as an MCP server: search my notes, answers, posts and reading from Claude, Cursor or any MCP client.
// Stdio, no dependencies, read-only. It reads the index the site publishes, so it always has the latest notes.
//
//   claude mcp add sibelius -- node /path/to/zettelkasten/mcp/server.mjs
//   SIBELIUS_INDEX=dist/ask-index.json node mcp/server.mjs     read a local build instead
import {readFile} from 'node:fs/promises';
import {createInterface} from 'node:readline';


const VERSION = '1.0.0';
const SOURCE = process.env.SIBELIUS_INDEX ?? `${SITE}/ask-index.json`;

/** How Sibelius writes, from the analysis of 36k of his posts. Clients use it to phrase answers from the passages. */
const VOICE = `Answer as Sibelius would, using only the passages returned.
- Reply in the language of the question. In Portuguese, write "Dev" with a capital D, "pra", "a gente", "na Woovi".
- Short lines. A line break is the punctuation; do not end lines with a period.
- If there are three things, make it a list.
- Take a position. Say what to do, not what one could consider.
- Link every claim to the note it came from.
- If status is insufficient_evidence, say Sibelius has not written about it yet and give discussion_url so he can answer in public. Never fill the gap with your own opinion presented as his.`;

let cached;

async function load() {
  if (!cached) {
    const raw = /^https?:/.test(SOURCE) ? await (await fetch(SOURCE)).text() : await readFile(SOURCE, 'utf8');
    const {passages, generated} = JSON.parse(raw);
    cached = {passages, generated, index: buildIndex(passages)};
  }

  return cached;
}

const clean = (result) => ({
  title: result.title,
  heading: result.heading,
  kind: result.kind,
  date: result.date,
  url: absolute(result.url),
  snippet: result.snippet,
});

const TOOLS = [
  {
    name: 'ask_sibelius',
    description:
      "Answer a question from what Sibelius Seraphini wrote (notes, public answers, posts). Returns cited passages, a status, how to phrase the answer in his voice, and a GitHub Discussion link to send the question to him. If status is insufficient_evidence he has not written about it: share discussion_url instead of answering.",
    inputSchema: {type: 'object', properties: {question: {type: 'string', description: 'The question, in any language'}}, required: ['question']},
    async run({question}) {
      const {index} = await load();
      const found = search(index, question);

      return {
        status: found.status,
        passages: found.results.map(clean),
        related_reading: found.reading.map(clean),
        discussion_url: discussionUrl(question, found.status === 'ready' ? found.results : []),
        how_to_answer: VOICE,
      };
    },
  },
  {
    name: 'search_notes',
    description: 'Search Sibelius notes, answers, posts and reading links by keywords. Returns ranked passages with links.',
    inputSchema: {
      type: 'object',
      properties: {
        query: {type: 'string'},
        kind: {type: 'string', enum: ['note', 'answer', 'writing', 'reading'], description: 'Only this kind of source'},
        limit: {type: 'number', minimum: 1, maximum: 20},
      },
      required: ['query'],
    },
    async run({query, kind, limit = 8}) {
      const {index} = await load();
      const found = search(index, query, {limit, kinds: kind ? [kind] : undefined});

      return {status: found.status, results: [...found.results, ...(kind ? [] : found.reading)].map(clean)};
    },
  },
  {
    name: 'get_note',
    description: 'Full text of one note, by its URL or slug (for example "notes/being-wrong").',
    inputSchema: {type: 'object', properties: {note: {type: 'string'}}, required: ['note']},
    async run({note}) {
      const {passages} = await load();
      const slug = note.replace(/^https?:\/\/[^/]+/, '').replace(/^\/?(zettelkasten\/)?/, '').replace(/\/$/, '');
      const parts = passages.filter((passage) => passage.kind === 'note' && passage.url.replace(/^\/zettelkasten\//, '') === slug);

      if (!parts.length) {
        throw new Error(`No note at ${note}. Use search_notes or list_notes to find one.`);
      }

      return {
        title: parts[0].title,
        url: absolute(parts[0].url),
        tags: parts[0].tags,
        updated: parts[0].date,
        text: parts.map((part) => (part.heading ? `## ${part.heading}\n${part.text}` : part.text)).join('\n\n'),
      };
    },
  },
  {
    name: 'list_notes',
    description: 'List notes, optionally only those with a tag or in a section (Notes, Mentorship, Learning Path, Essays).',
    inputSchema: {type: 'object', properties: {tag: {type: 'string'}, section: {type: 'string'}}},
    async run({tag, section}) {
      const {passages} = await load();
      const notes = new Map();

      for (const passage of passages) {
        if (passage.kind !== 'note' || notes.has(passage.url)) continue;
        if (tag && !passage.tags.some((t) => t.toLowerCase() === tag.toLowerCase())) continue;
        if (section && passage.section.toLowerCase() !== section.toLowerCase()) continue;

        notes.set(passage.url, {title: passage.title, url: absolute(passage.url), section: passage.section, tags: passage.tags});
      }

      return {count: notes.size, notes: [...notes.values()]};
    },
  },
  {
    name: 'recent_reading',
    description: 'What Sibelius has been reading and recommending: links he shared, newest first, or on one day.',
    inputSchema: {type: 'object', properties: {date: {type: 'string', description: 'YYYY-MM-DD'}, limit: {type: 'number', minimum: 1, maximum: 100}}},
    async run({date, limit = 20}) {
      const {passages} = await load();
      const items = passages
        .filter((passage) => passage.kind === 'reading' && (!date || passage.date === date))
        .sort((a, b) => b.date.localeCompare(a.date))
        .slice(0, limit)
        .map((passage) => ({title: passage.title, url: passage.url, date: passage.date, kind: passage.tags[0], day: `${SITE}/reading/${passage.date}`}));

      return {count: items.length, items};
    },
  },
];

const PROMPTS = [
  {
    name: 'answer_as_sibelius',
    description: 'Answer a question the way Sibelius would, only from what he wrote, with links.',
    arguments: [{name: 'question', required: true}],
  },
];

async function handle({method, params = {}}) {
  switch (method) {
    case 'initialize':
      return {
        protocolVersion: params.protocolVersion ?? '2025-06-18',
        capabilities: {tools: {}, prompts: {}},
        serverInfo: {name: 'sibelius', title: 'Ask Sibelius', version: VERSION},
        instructions: `Sibelius Seraphini's notes on software, startups, careers and payments. Use ask_sibelius for questions; it says when he has not written about something. ${VOICE}`,
      };
    case 'ping':
      return {};
    case 'tools/list':
      return {tools: TOOLS.map(({run, ...tool}) => tool)};
    case 'tools/call': {
      const tool = TOOLS.find((candidate) => candidate.name === params.name);

      if (!tool) {
        throw Object.assign(new Error(`Unknown tool ${params.name}`), {code: -32602});
      }

      try {
        const result = await tool.run(params.arguments ?? {});

        return {content: [{type: 'text', text: JSON.stringify(result, null, 2)}], structuredContent: result};
      } catch (error) {
        return {content: [{type: 'text', text: error.message}], isError: true};
      }
    }
    case 'prompts/list':
      return {prompts: PROMPTS};
    case 'prompts/get':
      return {
        messages: [
          {
            role: 'user',
            content: {type: 'text', text: `Call ask_sibelius with this question, then answer it.\n\n${VOICE}\n\nQuestion: ${params.arguments?.question ?? ''}`},
          },
        ],
      };
    default:
      throw Object.assign(new Error(`Method not found: ${method}`), {code: -32601});
  }
}

const send = (message) => process.stdout.write(`${JSON.stringify({jsonrpc: '2.0', ...message})}\n`);

createInterface({input: process.stdin}).on('line', async (line) => {
  if (!line.trim()) return;

  let message;

  try {
    message = JSON.parse(line);
  } catch {
    send({id: null, error: {code: -32700, message: 'Parse error'}});
    return;
  }

  // Notifications (no id) need no reply.
  if (message.id === undefined) return;

  try {
    send({id: message.id, result: await handle(message)});
  } catch (error) {
    send({id: message.id, error: {code: error.code ?? -32603, message: error.message}});
  }
});
