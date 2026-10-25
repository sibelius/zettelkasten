import media from '../data/media.json';
import repos from '../data/repos.json';
import writing from '../data/writing.json';
import {getDocs, tagCounts, type Doc} from './docs';
import {reading} from './reading';

export type Row = {label: string; value: number; href?: string};

const count = <T>(items: T[], key: (item: T) => string) => {
  const counts = new Map<string, number>();

  for (const item of items) {
    counts.set(key(item), (counts.get(key(item)) ?? 0) + 1);
  }

  return counts;
};

const top = (counts: Map<string, number>, limit: number): Row[] =>
  [...counts]
    .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
    .slice(0, limit)
    .map(([label, value]) => ({label, value}));

const range = (from: number, to: number) => Array.from({length: to - from + 1}, (_, i) => String(from + i));

const words = (doc: Doc) => doc.text.split(' ').filter(Boolean).length;

/** Monday of the week a date falls in, so reading groups into calendar weeks. */
function weekOf(date: string) {
  const day = new Date(`${date}T12:00:00Z`);
  day.setUTCDate(day.getUTCDate() - ((day.getUTCDay() + 6) % 7));

  return day.toISOString().slice(0, 10);
}

export async function getStats() {
  const docs = await getDocs();
  const backlinks = count(
    docs.flatMap((doc) => doc.links),
    (id) => id,
  );
  const byId = new Map(docs.map((doc) => [doc.id, doc]));
  const ownRepos = repos.filter((repo) => repo.name !== 'zettelkasten');

  // ── Totals ─────────────────────────────────────────────────────────
  const totals = {
    notes: docs.length,
    words: docs.reduce((sum, doc) => sum + words(doc), 0),
    links: docs.reduce((sum, doc) => sum + doc.links.length, 0),
    posts: writing.length,
    talks: media.decks.length + media.videos.filter((video) => video.kind === 'appearance').length + media.episodes.length,
    repos: repos.length,
    stars: repos.reduce((sum, repo) => sum + repo.stars, 0),
    reading: reading.length,
  };

  // ── Over time: everything with a real date ─────────────────────────
  const years = [...writing.map((post) => post.date), ...media.decks.map((deck) => deck.date), ...repos.map((repo) => repo.created)].map((date) => Number(date.slice(0, 4)));
  const yearAxis = range(Math.min(...years), Math.max(...years));
  const postsByYear = count(writing, (post) => post.date.slice(0, 4));
  const decksByYear = count(media.decks, (deck) => deck.date.slice(0, 4));
  const reposByYear = count(repos, (repo) => repo.created.slice(0, 4));

  const published = {
    categories: yearAxis,
    series: ['Open source repos', 'Posts', 'Talk slides'],
    values: yearAxis.map((year) => [reposByYear.get(year) ?? 0, postsByYear.get(year) ?? 0, decksByYear.get(year) ?? 0]),
  };

  const channels = ['Substack', 'dev.to', 'Medium'];
  const writingYears = range(Math.min(...writing.map((post) => Number(post.date.slice(0, 4)))), Math.max(...writing.map((post) => Number(post.date.slice(0, 4)))));
  const writingByChannel = {
    categories: writingYears,
    series: channels,
    values: writingYears.map((year) => channels.map((channel) => writing.filter((post) => post.source === channel && post.date.startsWith(year)).length)),
  };

  const starYears = range(Math.min(...ownRepos.map((repo) => Number(repo.created.slice(0, 4)))), Math.max(...ownRepos.map((repo) => Number(repo.created.slice(0, 4)))));
  const stars = {
    categories: starYears,
    series: ['Stars'],
    values: starYears.map((year) => [ownRepos.filter((repo) => repo.created.startsWith(year)).reduce((sum, repo) => sum + repo.stars, 0)]),
  };

  // ── Reading: what I shared each week ───────────────────────────────
  const kindOrder = ['article', 'post', 'repo', 'tool', 'video', 'paper'];
  const kindLabels: Record<string, string> = {article: 'Articles', post: 'Posts on X', repo: 'Repos', tool: 'Tools', video: 'Videos', paper: 'Papers'};
  const kinds = kindOrder.filter((kind) => reading.some((item) => item.kind === kind));
  const weeks = [...new Set(reading.map((item) => weekOf(item.date)))].sort();
  const allWeeks: string[] = [];

  for (const cursor = new Date(`${weeks[0]}T12:00:00Z`); cursor.toISOString().slice(0, 10) <= weeks.at(-1)!; cursor.setUTCDate(cursor.getUTCDate() + 7)) {
    allWeeks.push(cursor.toISOString().slice(0, 10));
  }

  const readingByWeek = {
    categories: allWeeks.map((week) => new Date(`${week}T12:00:00Z`).toLocaleDateString('en-US', {month: 'short', day: 'numeric', timeZone: 'UTC'})),
    series: kinds.map((kind) => kindLabels[kind]),
    values: allWeeks.map((week) => kinds.map((kind) => reading.filter((item) => item.kind === kind && weekOf(item.date) === week).length)),
  };

  const weekdays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const readingByWeekday = {
    categories: weekdays,
    series: ['Links'],
    values: weekdays.map((_, index) => [reading.filter((item) => (new Date(`${item.date}T12:00:00Z`).getUTCDay() + 6) % 7 === index).length]),
  };

  const sites = top(
    count(reading, (item) => (item.host === 'x.com' || item.host === 'twitter.com' ? 'x.com' : item.host)),
    10,
  );

  // ── Notes: what they are about and how they connect ────────────────
  const tags = tagCounts(docs)
    .slice(0, 15)
    .map(([label, value]) => ({label, value}));
  const sections = top(
    count(docs, (doc) => doc.section.label),
    10,
  );
  const linked: Row[] = [...backlinks]
    .filter(([id]) => byId.has(id))
    .sort((a, b) => b[1] - a[1])
    .slice(0, 12)
    .map(([id, value]) => ({label: byId.get(id)!.title, value, href: byId.get(id)!.url}));

  const buckets = [
    [0, 50],
    [50, 100],
    [100, 200],
    [200, 400],
    [400, 800],
    [800, 1600],
    [1600, Infinity],
  ] as const;
  const lengths = {
    categories: buckets.map(([from, to]) => (to === Infinity ? `${from}+` : `${from}–${to}`)),
    series: ['Notes'],
    values: buckets.map(([from, to]) => [docs.filter((doc) => words(doc) >= from && words(doc) < to).length]),
  };
  const orphans = docs.filter((doc) => doc.links.length === 0 && !backlinks.has(doc.id)).length;

  const starred: Row[] = [...ownRepos]
    .sort((a, b) => b.stars - a.stars)
    .slice(0, 10)
    .map((repo) => ({label: repo.name, value: repo.stars, href: repo.url}));

  return {totals, published, writingByChannel, stars, readingByWeek, readingByWeekday, sites, tags, sections, linked, lengths, orphans, starred};
}
