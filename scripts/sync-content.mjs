// Pulls what I publish elsewhere into src/data, so the site builds offline.
// Run with `pnpm sync` and commit the result.
import {writeFileSync} from 'node:fs';

const FEEDS = [
  {source: 'Substack', url: 'https://sibelius.substack.com/feed'},
  {source: 'dev.to', url: 'https://dev.to/feed/sibelius'},
  {source: 'Medium', url: 'https://medium.com/feed/@sibelius'},
];

const GITHUB_USER = 'sibelius';

const decode = (value = '') =>
  value
    .replace(/^<!\[CDATA\[|\]\]>$/g, '')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;|&#x27;/g, "'")
    .trim();

const field = (item, name) => decode(item.match(new RegExp(`<${name}>([\\s\\S]*?)</${name}>`))?.[1]);

async function readFeed({source, url}) {
  const response = await fetch(url, {headers: {'user-agent': 'sibelius-site-sync'}});

  if (!response.ok) {
    throw new Error(`${source}: ${response.status}`);
  }

  const xml = await response.text();

  return [...xml.matchAll(/<item>([\s\S]*?)<\/item>/g)].map(([, item]) => ({
    source,
    title: field(item, 'title'),
    url: field(item, 'link').split('?')[0],
    date: new Date(field(item, 'pubDate')).toISOString().slice(0, 10),
  }));
}

async function readRepos() {
  const repos = [];

  for (let page = 1; page < 10; page++) {
    const response = await fetch(
      `https://api.github.com/users/${GITHUB_USER}/repos?per_page=100&page=${page}&type=owner`,
      {headers: {accept: 'application/vnd.github+json', ...(process.env.GITHUB_TOKEN ? {authorization: `Bearer ${process.env.GITHUB_TOKEN}`} : {})}},
    );

    if (!response.ok) {
      throw new Error(`GitHub: ${response.status}`);
    }

    const batch = await response.json();
    repos.push(...batch);

    if (batch.length < 100) {
      break;
    }
  }

  return repos
    .filter((repo) => !repo.fork && !repo.archived && !repo.private)
    .map((repo) => ({
      name: repo.name,
      description: repo.description ?? '',
      url: repo.html_url,
      homepage: repo.homepage || null,
      stars: repo.stargazers_count,
      created: repo.created_at.slice(0, 10),
      pushed: repo.pushed_at.slice(0, 10),
    }));
}

const writing = (await Promise.all(FEEDS.map(readFeed))).flat().sort((a, b) => b.date.localeCompare(a.date));
writeFileSync('src/data/writing.json', `${JSON.stringify(writing, null, 2)}\n`);
console.log(`writing: ${writing.length} posts`);

const repos = (await readRepos()).sort((a, b) => b.stars - a.stars);
writeFileSync('src/data/repos.json', `${JSON.stringify(repos, null, 2)}\n`);
console.log(`repos: ${repos.length}`);
