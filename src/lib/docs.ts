import {execSync} from 'node:child_process';
import {posix} from 'node:path';
import {readFileSync, existsSync} from 'node:fs';

import {getCollection, type CollectionEntry} from 'astro:content';

export type DocEntry = CollectionEntry<'docs'>;

export type Doc = {
  id: string;
  route: string;
  url: string;
  title: string;
  tags: string[];
  section: Section;
  excerpt: string;
  text: string;
  file: string;
  updated: string | null;
  position: number;
  links: string[];
  entry: DocEntry;
};

export type Section = {key: string; label: string; url: string};

const BASE = import.meta.env.BASE_URL.replace(/\/$/, '');

export const withBase = (path: string) => `${BASE}${path.startsWith('/') ? path : `/${path}`}`;

const slugify = (value: string) =>
  value
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');

export const tagUrl = (tag: string) => withBase(`/tags/${slugify(tag)}`);
export const tagSlug = slugify;

function readSection(dir: string): Section {
  if (!dir) {
    return {key: 'essays', label: 'Essays', url: withBase('/food-for-thought')};
  }

  const top = dir.split('/')[0];
  const file = `docs/${top}/_category_.json`;
  const label = existsSync(file) ? JSON.parse(readFileSync(file, 'utf8')).label : top;

  return {key: top, label, url: withBase(`/category/${slugify(label)}`)};
}

/** Plain text from Markdown/MDX, good enough for excerpts and search. */
export function toText(body = ''): string {
  return body
    .replace(/^import .*$/gm, '')
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/!\[[^\]]*\]\([^)]*\)/g, ' ')
    .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1')
    .replace(/https?:\/\/\S+/g, ' ')
    .replace(/(^|\s)#[\w-]+/g, ' ')
    .replace(/^\s*[-*+]\s+\[[ x]\]\s*/gim, '')
    .replace(/[*_`>#|\\]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function excerptOf(text: string, length = 180): string {
  if (text.length <= length) {
    return text;
  }

  const cut = text.slice(0, length);

  return `${cut.slice(0, cut.lastIndexOf(' '))}…`;
}

let gitDates: Map<string, string> | null = null;

/** One `git log` pass for every file, instead of one process per page. */
function lastUpdated(file: string): string | null {
  if (!gitDates) {
    gitDates = new Map();

    try {
      const log = execSync('git log --format=%x00%cs --name-only -- docs', {
        encoding: 'utf8',
        maxBuffer: 64 * 1024 * 1024,
      });

      for (const chunk of log.split('\0')) {
        const [date, ...files] = chunk.trim().split('\n');

        for (const name of files) {
          if (name && !gitDates.has(name)) {
            gitDates.set(name, date);
          }
        }
      }
    } catch {
      // Not a git checkout: pages simply show no date.
    }
  }

  return gitDates.get(file) ?? null;
}

const LINK = /\]\((\.{1,2}\/[^)#\s]+|\/(?!\/)[^)#\s]+)(?:#[^)]*)?\)/g;

function outgoing(id: string, body = ''): string[] {
  const dir = posix.dirname(id);
  const found = new Set<string>();

  for (const [, raw] of body.matchAll(LINK)) {
    const path = raw.replace(/\.mdx?$/, '').replace(/\/$/, '');
    const target = path.startsWith('/') ? path.slice(1) : posix.normalize(posix.join(dir, path));

    found.add(target);
  }

  return [...found];
}

let cache: Doc[] | null = null;

export async function getDocs(): Promise<Doc[]> {
  if (cache) {
    return cache;
  }

  const entries = await getCollection('docs');

  const docs = entries.map((entry): Doc => {
    const data = entry.data as Record<string, unknown>;
    const route = typeof data.slug === 'string' ? data.slug.replace(/^\//, '') : entry.id;
    const heading = entry.body?.match(/^#\s+(.+)$/m)?.[1];
    const text = toText(entry.body);
    const file = entry.filePath ?? `docs/${entry.id}.md`;

    return {
      id: entry.id,
      route,
      url: withBase(`/${route}`),
      title: String(data.title ?? heading ?? posix.basename(entry.id)).replace(/\\/g, ''),
      tags: Array.isArray(data.tags) ? data.tags.map(String) : [],
      section: readSection(posix.dirname(entry.id) === '.' ? '' : posix.dirname(entry.id)),
      excerpt: excerptOf(text),
      text,
      file,
      updated: lastUpdated(file),
      position: Number(data.sidebar_position ?? 999),
      links: outgoing(entry.id, entry.body),
      entry,
    };
  });

  // Links may point at an id or at a custom slug: normalise them to ids we know.
  const byRoute = new Map(docs.flatMap((doc) => [[doc.id, doc.id], [doc.route, doc.id]]));

  for (const doc of docs) {
    doc.links = [...new Set(doc.links.map((link) => byRoute.get(link)).filter((id): id is string => !!id && id !== doc.id))];
  }

  cache = docs.sort((a, b) => a.title.localeCompare(b.title));

  return cache;
}

export function backlinks(docs: Doc[], doc: Doc): Doc[] {
  return docs.filter((other) => other.links.includes(doc.id));
}

/** Notes sharing the most tags with this one, ignoring tags almost everything has. */
export function related(docs: Doc[], doc: Doc, limit = 5): Doc[] {
  const linked = new Set([...doc.links, ...backlinks(docs, doc).map((d) => d.id)]);

  return docs
    .filter((other) => other.id !== doc.id && !linked.has(other.id))
    .map((other) => ({other, score: other.tags.filter((tag) => doc.tags.includes(tag)).length}))
    .filter(({score}) => score > 0)
    .sort((a, b) => b.score - a.score || a.other.title.localeCompare(b.other.title))
    .slice(0, limit)
    .map(({other}) => other);
}

export function tagCounts(docs: Doc[]): [string, number][] {
  const counts = new Map<string, number>();

  for (const doc of docs) {
    for (const tag of doc.tags) {
      counts.set(tag, (counts.get(tag) ?? 0) + 1);
    }
  }

  return [...counts].sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]));
}

export function formatDate(date: string | null): string {
  if (!date) {
    return '';
  }

  return new Date(`${date}T12:00:00Z`).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}
