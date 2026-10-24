// Turns the links I share (src/data/reading-links.json) into the /reading feed (src/data/reading.json).
// Run with `pnpm sync:reading` and commit the result. Links already in the feed are not fetched again;
// pass --refresh to fetch every link.
import {existsSync, readFileSync, writeFileSync} from 'node:fs';

import {decode, mapLimited, pageMeta} from './fetch.mjs';

const LINKS = 'src/data/reading-links.json';
const FEED = 'src/data/reading.json';

const refresh = process.argv.includes('--refresh');
const links = JSON.parse(readFileSync(LINKS, 'utf8'));
const cached = new Map(!refresh && existsSync(FEED) ? JSON.parse(readFileSync(FEED, 'utf8')).map((item) => [item.url, item]) : []);

/** A bot check answered instead of the page, so its title says nothing about the link. */
const BLOCKED = /checking your browser|just a moment|attention required|access denied/i;

/** One URL per thing: an X post's /video/1 or /photo/1 is the same post. */
const canonical = (url) => url.replace(/^(https:\/\/(?:x|twitter)\.com\/[^/]+\/status\/\d+)\/(?:video|photo)\/\d+$/, '$1');

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
function tidy(url, meta) {
  const repo = meta?.title?.match(/^GitHub - ([^:]+?)(?::\s*(.+))?$/);

  if (repo) {
    return {...meta, title: repo[1], description: repo[2] ?? meta.description};
  }

  return meta?.title && BLOCKED.test(meta.title) ? null : meta;
}

const feed = await mapLimited(links, 6, async ({url: link, date, note = ''}) => {
  const url = canonical(link);
  const old = cached.get(url);

  if (old) {
    return {...old, date, note};
  }

  const meta = tidy(url, kind(url) === 'post' ? await readPost(url) : await pageMeta(url));

  return {
    url,
    date,
    note,
    kind: kind(url),
    host: host(url),
    title: meta?.title || fallbackTitle(url),
    description: meta?.description ?? null,
    site: meta?.site ?? null,
    image: meta?.image ?? null,
  };
});

feed.sort((a, b) => b.date.localeCompare(a.date));
writeFileSync(FEED, `${JSON.stringify(feed, null, 2)}\n`);
console.log(`reading: ${feed.length} links, ${feed.filter((item) => !cached.has(item.url)).length} fetched, ${feed.filter((item) => item.image).length} with images`);
