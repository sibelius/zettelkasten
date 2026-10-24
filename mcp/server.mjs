// Ask Sibelius as an MCP server: search my notes, answers, posts and reading from Claude, Cursor or any MCP client.
// Stdio, no dependencies, read-only. It reads the index the site publishes, so it always has the latest notes.
//
//   claude mcp add sibelius -- node /path/to/zettelkasten/mcp/server.mjs
//   SIBELIUS_INDEX=dist/ask-index.json node mcp/server.mjs     read a local build instead
import {readFile} from 'node:fs/promises';
import {createInterface} from 'node:readline';

import {absolute, buildIndex, discussionUrl, requestUrl, search, SITE} from './retrieve.mjs';

const VERSION = '1.0.0';
const SOURCE = process.env.SIBELIUS_INDEX ?? `${SITE}/ask-index.json`;

/** How Sibelius writes, from the analysis of 36k of his posts. Clients use it to phrase answers from the passages. */
const VOICE = `Answer as Sibelius would, using only the passages returned.
- Reply in the language of the question. In Portuguese, write "Dev" with a capital D, "pra", "a gente", "na Woovi".
- Short lines. A line break is the punctuation; do not end lines with a period.
- If there are three things, make it a list.
- Take a position. Say what to do, not what one could consider.
- Link every claim to the note it came from.
- If status is insufficient_evidence, say Sibelius has not written about it yet. Give discussion_url to ask him the question, and request_url to ask him to write about it. Never fill the gap with your own opinion presented as his.`;

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
      "Answer a question from what Sibelius Seraphini wrote (notes, public answers, posts). Returns cited passages, a status, how to phrase the answer in his voice, and a GitHub Discussion link to send the question to him. If status is insufficient_evidence he has not written about it: share discussion_url, and request_url to ask him to write about it, instead of answering.",
    inputSchema: {type: 'object', properties: {question: {type: 'string', description: 'The question, in any language'}}, required: ['question']},
    async run({question}) {
      const {index} = await load();
      const found = search(index, question);

      return {
        status: found.status,
        passages: found.results.map(clean),
        related_reading: found.reading.map(clean),
        discussion_url: discussionUrl(question, found.status === 'ready' ? found.results : []),
        ...(found.status === 'ready' ? {} : {request_url: requestUrl(question, 'an AI assistant using the Sibelius MCP')}),
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
