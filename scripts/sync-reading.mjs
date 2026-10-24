// The /reading feed: what I read and recommend, one file per day in src/data/reading/YYYY-MM-DD.json.
//
//   SLACK_TOKEN=xoxp-… pnpm reading           pull my new links from #articles-dev
//   SLACK_TOKEN=xoxp-… pnpm reading --all     pull the whole channel history Slack still has
//   pnpm reading --add <url> ["why read it"] [--date YYYY-MM-DD]
//   pnpm reading --refresh                    fetch every title and preview image again
//
// The token needs the channels:history scope. Commit src/data/reading after running.
import {mkdirSync, readdirSync, readFileSync, writeFileSync} from 'node:fs';
import {join} from 'node:path';

import {decode, mapLimited, pageMeta} from './fetch.mjs';

const DIR = 'src/data/reading';
const SLACK_CHANNEL = 'C06C7GR2S2G'; // #articles-dev
const SLACK_USER = 'U06C1KY2VNH'; // me
const TIME_ZONE = 'America/Sao_Paulo';

/** Links that only make sense inside Woovi, or are private. */
const SKIP = /gitea\.kube\.quest|docs\.google\.com|app\.livestorm\.co|woovi\.dev|slack\.com/;

const args = process.argv.slice(2);
const flag = (name) => args.includes(name);
const option = (name) => (args.includes(name) ? args[args.indexOf(name) + 1] : undefined);

/** A bot check answered instead of the page, so its title says nothing about the link. */
const BLOCKED = /checking your browser|just a moment|attention required|access denied/i;

const TRACKING = /^(utm_\w+|s|t|si|rcm|twclid|ref_src|fbclid|gclid)$/;

/** One URL per thing: no tracking params, and an X post's /video/1 or /photo/1 is the same post. */
function canonical(link) {
  const url = new URL(link);

  for (const key of [...url.searchParams.keys()]) {
    if (TRACKING.test(key)) {
      url.searchParams.delete(key);
    }
  }

  return url.toString().replace(/^(https:\/\/(?:x|twitter)\.com\/[^/]+\/status\/\d+)\/(?:video|photo)\/\d+$/, '$1');
}

const day = (date) => new Intl.DateTimeFormat('en-CA', {timeZone: TIME_ZONE}).format(date);

const host = (url) => new URL(url).hostname.replace(/^www\./, '');

function kind(url) {
  const {hostname, pathname} = new URL(url);

  if (/(^|\.)(x|twitter)\.com$/.test(hostname)) return 'post';
  if (hostname === 'github.com') return 'repo';
  if (/youtube\.com|youtu\.be|vimeo\.com/.test(hostname)) return 'video';
  if (/\.pdf$/i.test(pathname) || /arxiv\.org|datatracker\.ietf\.org/.test(hostname)) return 'paper';
  // A bare domain is a product or a tool; anything with a path is something to read.
  if (pathname === '/' || pathname === '') return 'tool';

  return 'article';
}

// ── Store: one JSON file per day ───────────────────────────────────────

function readDays() {
  mkdirSync(DIR, {recursive: true});

  return new Map(
    readdirSync(DIR)
      .filter((name) => /^\d{4}-\d{2}-\d{2}\.json$/.test(name))
      .map((name) => [name.slice(0, 10), JSON.parse(readFileSync(join(DIR, name), 'utf8'))]),
  );
}

function writeDays(days) {
  for (const [date, items] of days) {
    writeFileSync(join(DIR, `${date}.json`), `${JSON.stringify(items, null, 2)}\n`);
  }
}

// ── Sources: Slack and the command line ────────────────────────────────

async function slack(method, params) {
  const response = await fetch(`https://slack.com/api/${method}?${new URLSearchParams(params)}`, {
    headers: {authorization: `Bearer ${process.env.SLACK_TOKEN}`},
  });
  const data = await response.json();

  if (!data.ok) {
    throw new Error(`Slack ${method}: ${data.error}`);
  }

  return data;
}

/** My links in the channel since `oldest` (a date), each on the day I shared it. */
async function readSlack(oldest) {
  const links = [];
  let cursor;

  do {
    const page = await slack('conversations.history', {
      channel: SLACK_CHANNEL,
      limit: '200',
      ...(oldest ? {oldest: String(new Date(`${oldest}T00:00:00-03:00`).getTime() / 1000)} : {}),
      ...(cursor ? {cursor} : {}),
    });

    for (const message of page.messages) {
      if (message.user !== SLACK_USER) {
        continue;
      }

      // Slack writes links as <url> or <url|label>; user and channel mentions start with @ or #.
      for (const [, url] of (message.text ?? '').matchAll(/<(https?:\/\/[^|>]+)(?:\|[^>]*)?>/g)) {
        links.push({url: decode(url), date: day(new Date(Number(message.ts) * 1000))});
      }
    }

    cursor = page.response_metadata?.next_cursor;
  } while (cursor);

  return links;
}

// ── Titles, descriptions and preview images ────────────────────────────

/** X pages need JavaScript, so read the post through its oEmbed instead. */
async function readPost(url) {
  try {
    const response = await fetch(`https://publish.twitter.com/oembed?omit_script=1&url=${encodeURIComponent(url)}`, {signal: AbortSignal.timeout(15000)});

    if (!response.ok) {
      return null;
    }

    const data = await response.json();
    const text = decode(data.html.match(/<p[^>]*>([\s\S]*?)<\/p>/)?.[1].replace(/<br\s*\/?>/g, ' ').replace(/<[^>]+>/g, '') ?? '').replace(/&mdash;/g, '—');
    const handle = data.author_url?.split('/').pop();

    // A post that is only a link reads better as who posted it.
    return {title: text && !/^https?:\/\/\S+$/.test(text) ? text : `Post by @${handle}`, description: null, site: handle ? `${data.author_name} (@${handle})` : data.author_name, image: null};
  } catch {
    return null;
  }
}

/** A readable title when the page has none: the last part of the path, or the domain. */
function fallbackTitle(url) {
  const {pathname} = new URL(url);
  const last = decodeURIComponent(pathname.split('/').filter(Boolean).pop() ?? '')
    .replace(/\.(html?|pdf)$/i, '')
    .replace(/[-_]+/g, ' ')
    // Medium ends every slug with a post id.
    .replace(/\s[0-9a-f]{10,12}$/, '')
    .trim();

  return last ? last[0].toUpperCase() + last.slice(1) : host(url);
}

/** GitHub titles a repo "GitHub - owner/repo: description"; split that into a title and a description. */
function tidy(meta) {
  const repo = meta?.title?.match(/^GitHub - ([^:]+?)(?::\s*(.+))?$/);

  if (repo) {
    return {...meta, title: repo[1], description: repo[2] ?? meta.description};
  }

  return meta?.title && BLOCKED.test(meta.title) ? null : meta;
}

async function describe({url, note = ''}) {
  const meta = tidy(kind(url) === 'post' ? await readPost(url) : await pageMeta(url));

  return {
    url,
    note,
    kind: kind(url),
    host: host(url),
    title: meta?.title || fallbackTitle(url),
    description: meta?.description ?? null,
    site: meta?.site ?? null,
    image: meta?.image ?? null,
  };
}

// ── Run ────────────────────────────────────────────────────────────────

const days = readDays();
const known = new Set([...days.values()].flat().map((item) => item.url));
const incoming = [];
const added = option('--add');

if (added) {
  // The note is the first plain argument after the URL.
  const note = args.slice(args.indexOf('--add') + 2).find((arg) => !arg.startsWith('--') && arg !== option('--date')) ?? '';
  incoming.push({url: added, date: option('--date') ?? day(new Date()), note});
}

if (process.env.SLACK_TOKEN) {
  // Start from the last day already stored, so a run only reads what is new.
  const last = flag('--all') ? undefined : [...days.keys()].sort().pop();
  const fromSlack = await readSlack(last);
  console.log(`slack: ${fromSlack.length} links since ${last ?? 'the start'}`);
  incoming.push(...fromSlack);
} else if (!added && !flag('--refresh')) {
  console.log('Set SLACK_TOKEN to pull from #articles-dev, or pass --add <url>.');
}

// Oldest first, so a link shared twice stays on the day I first shared it.
const fresh = [];

for (const link of incoming.sort((a, b) => a.date.localeCompare(b.date))) {
  const url = canonical(link.url);

  if (SKIP.test(url) || known.has(url)) {
    continue;
  }

  known.add(url);
  fresh.push({...link, url});
}

const described = await mapLimited(fresh, 6, async ({date, ...link}) => ({date, item: await describe(link)}));

for (const {date, item} of described) {
  days.set(date, [...(days.get(date) ?? []), item]);
}

if (flag('--refresh')) {
  for (const [date, items] of days) {
    days.set(date, await mapLimited(items, 6, async (item) => ({...(await describe(item)), note: item.note})));
  }
}

writeDays(days);
console.log(`reading: ${fresh.length} new, ${known.size} links over ${days.size} days`);
