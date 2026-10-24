// Retrieval over what I wrote, shared by Ask Sibelius on /ask and the MCP server. No dependencies, so it
// runs in the browser and in Node, and it never makes anything up: it only returns passages with links.

export const SITE = 'https://sibelius.github.io/zettelkasten';
export const ASK_URL = 'https://github.com/sibelius/zettelkasten/discussions/new?category=q-a';
export const REQUEST_URL = 'https://github.com/sibelius/zettelkasten/discussions/new?category=ideas';

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
export const normalize = (text) =>
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

export const terms = (text) => (normalize(text).match(/[\p{L}\p{N}]+/gu) ?? []).filter((word) => word.length > 1 && !STOPWORDS.has(word)).map(stem);

/** Where a word appears counts: a title match says more than a passing mention. */
const FIELDS = [
  ['title', 3],
  ['heading', 2],
  ['tags', 2],
  ['text', 1],
];

/** Weighted term counts per passage, and how many passages hold each term, for BM25. */
export function buildIndex(passages) {
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
export function search(index, question, {limit = 6, perSource = 2, kinds} = {}) {
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
export const absolute = (url) => (/^https?:/.test(url) ? url : `${SITE}${url.replace(/^\/zettelkasten/, '')}`);

/** A new GitHub Discussion with the question and what the notes had, ready to submit. */
export function discussionUrl(question, results = []) {
  const title = question.trim().replace(/\s+/g, ' ').slice(0, 120);
  const found = results.length
    ? `What Ask Sibelius found in the notes:\n\n${results.map((result) => `- [${result.title}](${absolute(result.url)})`).join('\n')}`
    : 'Ask Sibelius found nothing about this in the notes yet.';
  const body = `${question.trim()}\n\n---\n\n${found}\n\n_Sent from Ask Sibelius on ${SITE}/ask_`;

  return `${ASK_URL}&title=${encodeURIComponent(title)}&body=${encodeURIComponent(body)}`;
}

/** A new GitHub Discussion in Ideas asking me to write about a topic, so people can upvote what they want next. */
export function requestUrl(topic, from = '') {
  const clean = topic.trim().replace(/\s+/g, ' ').slice(0, 100);
  const body = `I would like to read Sibelius's take on: **${clean}**\n\nWhat I want to learn or decide:\n\n${from ? `\n---\n\n_Requested from ${from}_` : ''}`;

  return `${REQUEST_URL}&title=${encodeURIComponent(`Write about: ${clean}`)}&body=${encodeURIComponent(body)}`;
}
