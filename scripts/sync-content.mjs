// Pulls what I publish elsewhere into src/data, so the site builds offline.
// Run with `pnpm sync` and commit the result.
import {readdirSync, readFileSync, statSync, writeFileSync} from 'node:fs';
import {join} from 'node:path';

import {decode, mapLimited, pageMeta} from './fetch.mjs';

const FEEDS = [
  {source: 'Substack', url: 'https://sibelius.substack.com/feed'},
  {source: 'dev.to', url: 'https://dev.to/feed/sibelius'},
  {source: 'Medium', url: 'https://medium.com/feed/@sibelius'},
];

const GITHUB_USER = 'sibelius';
const SPEAKERDECK_USER = 'sibelius';

/** Episodes and videos that are not linked from any note yet. Add URLs here to show them on /media. */
const EXTRA_MEDIA = [];

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
    // Substack puts the cover in an enclosure; Medium only has it inside the post body.
    feedImage: decode(item.match(/<enclosure[^>]+url="([^"]+)"[^>]*type="image/)?.[1] ?? item.match(/<img[^>]+src="([^"]+)"/)?.[1] ?? '') || null,
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

const ogImage = async (url) => (await pageMeta(url))?.image ?? null;

const posts = (await Promise.all(FEEDS.map(readFeed))).flat().sort((a, b) => b.date.localeCompare(a.date));
const writing = await mapLimited(posts, 6, async ({feedImage, ...post}) => ({...post, image: feedImage ?? (await ogImage(post.url))}));
console.log(`writing images: ${writing.filter((post) => post.image).length}/${writing.length}`);
writeFileSync('src/data/writing.json', `${JSON.stringify(writing, null, 2)}\n`);
console.log(`writing: ${writing.length} posts`);

const repos = await mapLimited((await readRepos()).sort((a, b) => b.stars - a.stars), 6, async (repo) => ({
  ...repo,
  // A live site's own preview when it has one; GitHub draws a card for every repo otherwise.
  image: (repo.homepage && (await ogImage(repo.homepage))) || `https://opengraph.githubassets.com/1/${GITHUB_USER}/${repo.name}`,
}));
console.log(`repo site images: ${repos.filter((repo) => !repo.image.includes('opengraph.githubassets')).length}`);
writeFileSync('src/data/repos.json', `${JSON.stringify(repos, null, 2)}\n`);
console.log(`repos: ${repos.length}`);

// ── Media: slides, videos and podcast episodes ─────────────────────────

const json = async (url) => {
  const response = await fetch(url, {headers: {'user-agent': 'sibelius-site-sync'}});

  return response.ok ? response.json() : null;
};

async function readDecks() {
  const feed = await (await fetch(`https://speakerdeck.com/${SPEAKERDECK_USER}.atom`)).text();
  const page = await (await fetch(`https://speakerdeck.com/${SPEAKERDECK_USER}`)).text();
  // The profile page pairs each deck's slug with the id its player and thumbnails use.
  const ids = new Map([...page.matchAll(/data-id="([a-f0-9]+)"[\s\S]*?href="\/[^/]+\/([a-z0-9-]+)"/g)].map(([, id, slug]) => [slug, id]));

  return [...feed.matchAll(/<entry>([\s\S]*?)<\/entry>/g)].map(([, entry]) => {
    const url = entry.match(/<link[^>]+href="([^"]+)"/)[1];
    const slug = url.split('/').pop();
    const id = ids.get(slug) ?? null;

    return {
      title: decode(entry.match(/<title>([\s\S]*?)<\/title>/)[1]),
      url,
      date: (entry.match(/<published>([^<]+)/)?.[1] ?? entry.match(/<updated>([^<]+)/)[1]).slice(0, 10),
      player: id ? `https://speakerdeck.com/player/${id}` : null,
      thumbnail: id ? `https://files.speakerdeck.com/presentations/${id}/slide_0.jpg` : null,
    };
  });
}

function docFiles(dir) {
  return readdirSync(dir).flatMap((name) => {
    const path = join(dir, name);

    return statSync(path).isDirectory() ? docFiles(path) : /\.mdx?$/.test(name) ? [path] : [];
  });
}

const VIDEO = /(?:youtube\.com\/(?:watch\?v=|embed\/|live\/)?|youtu\.be\/)([A-Za-z0-9_-]{11})(?![A-Za-z0-9_-])/g;

/** Pages that list my own talks and interviews; any other note that links a video is recommending it. */
const APPEARANCES = ['docs/youtube.mdx', 'docs/talks.md'];

/** Every YouTube video and podcast episode the notes link to, plus EXTRA_MEDIA. */
function mediaLinks() {
  const files = docFiles('docs').map((file) => ({file, text: readFileSync(file, 'utf8')}));
  const text = [...files.map((f) => f.text), ...EXTRA_MEDIA].join('\n');
  const videoSources = new Map();

  for (const {file, text: body} of [...files, {file: 'extra', text: EXTRA_MEDIA.join('\n')}]) {
    for (const [, id] of body.matchAll(VIDEO)) {
      videoSources.set(id, [...new Set([...(videoSources.get(id) ?? []), file])]);
    }
  }

  const videos = [...videoSources].map(([id, sources]) => ({id, sources}));
  const episodes = [...new Set([...text.matchAll(/open\.spotify\.com\/(?:embed\/)?(episode|show)\/([A-Za-z0-9]+)/g)].map((m) => `${m[1]}/${m[2]}`))];
  const anchor = [...new Set([...text.matchAll(/https:\/\/anchor\.fm\/[^\s'")]+\/episodes\/[^\s'")/]+/g)].map((m) => m[0].replace('/embed/', '/')))];

  return {videos, episodes, anchor};
}

async function readVideos(entries) {
  const videos = await Promise.all(
    entries.map(async ({id, sources}) => {
      const data = await json(`https://www.youtube.com/oembed?format=json&url=${encodeURIComponent(`https://www.youtube.com/watch?v=${id}`)}`);
      const mine = sources.some((file) => APPEARANCES.includes(file) || file === 'extra') || /sibelius/i.test(data?.title ?? '');
      const note = sources.find((file) => !APPEARANCES.includes(file) && file !== 'extra');

      return (
        data && {
          id,
          title: data.title,
          channel: data.author_name,
          url: `https://www.youtube.com/watch?v=${id}`,
          thumbnail: `https://i.ytimg.com/vi/${id}/hqdefault.jpg`,
          kind: mine ? 'appearance' : 'recommended',
          // The note that recommends it, as a route: docs/notes/relay.md is notes/relay.
          note: mine || !note ? null : note.replace(/^docs\//, '').replace(/\.mdx?$/, ''),
        }
      );
    }),
  );

  // Videos that were removed or made private return nothing; drop them.
  return videos.filter(Boolean);
}

async function readEpisodes(spotify, anchor) {
  const fromSpotify = await Promise.all(
    spotify.map(async (path) => {
      const url = `https://open.spotify.com/${path}`;
      const data = await json(`https://open.spotify.com/oembed?url=${encodeURIComponent(url)}`);

      return data && {title: data.title, show: null, url, player: `https://open.spotify.com/embed/${path}`, thumbnail: data.thumbnail_url, source: 'Spotify'};
    }),
  );

  const fromAnchor = anchor.map((url) => {
    const slug = url.split('/episodes/')[1].replace(/-e[a-z0-9]+$/, '');

    return {title: slug.replace(/-/g, ' '), show: null, url, player: url.replace('/episodes/', '/embed/episodes/'), thumbnail: null, source: 'Anchor'};
  });

  return [...fromSpotify.filter(Boolean), ...fromAnchor];
}

const links = mediaLinks();
const media = {
  decks: await readDecks(),
  videos: await readVideos(links.videos),
  episodes: await readEpisodes(links.episodes, links.anchor),
};
writeFileSync('src/data/media.json', `${JSON.stringify(media, null, 2)}\n`);
console.log(`media: ${media.decks.length} decks, ${media.videos.length} videos, ${media.episodes.length} episodes`);

// ── Tools: open source we run, shown only with a post or note as evidence ──

/**
 * `hosted` tools are services you run on your own machines; the rest are libraries and frameworks.
 * `match` runs against article titles, dev.to tags, note titles/tags and repo names.
 */
const TOOLS = [
  {name: 'Proxmox VE', url: 'https://www.proxmox.com/en/proxmox-virtual-environment', category: 'Infrastructure', hosted: true, match: /\bproxmox\b|\blxc\b/i},
  {name: 'Talos Linux', url: 'https://www.talos.dev', category: 'Infrastructure', hosted: true, match: /\btalos\b/i},
  {name: 'Kubernetes', url: 'https://kubernetes.io', category: 'Infrastructure', hosted: true, match: /\bkubernetes\b|\bk8s\b/i},
  {name: 'Ceph', url: 'https://ceph.io', category: 'Infrastructure', hosted: true, match: /\bceph\b/i},
  {name: 'ZFS', url: 'https://openzfs.org', category: 'Infrastructure', hosted: true, match: /\bzfs\b/i},
  {name: 'Docker', url: 'https://www.docker.com', category: 'Infrastructure', hosted: false, match: /\bdocker\b/i},
  {name: 'Terraform', url: 'https://www.terraform.io', category: 'Infrastructure', hosted: false, match: /\bterraform\b/i},
  {name: 'Helm', url: 'https://helm.sh', category: 'Delivery', hosted: false, match: /\bhelm(file)?\b/i},
  {name: 'Argo CD', url: 'https://argo-cd.readthedocs.io', category: 'Delivery', hosted: true, match: /\bargo ?cd\b/i},
  {name: 'Tekton', url: 'https://tekton.dev', category: 'Delivery', hosted: true, match: /\btekton\b/i},
  {name: 'Grafana', url: 'https://grafana.com/oss/grafana', category: 'Observability', hosted: true, match: /\bgrafana\b/i},
  {name: 'Prometheus', url: 'https://prometheus.io', category: 'Observability', hosted: true, match: /\bprometh?eus\b/i},
  {name: 'OpenTelemetry', url: 'https://opentelemetry.io', category: 'Observability', hosted: false, match: /\bopentelemetry\b|\botel\b/i},
  {name: 'Elasticsearch', url: 'https://www.elastic.co/elasticsearch', category: 'Data', hosted: true, match: /\belastic ?search\b/i},
  {name: 'MongoDB', url: 'https://www.mongodb.com', category: 'Data', hosted: true, match: /\bmongo(db)?\b/i},
  {name: 'Redis', url: 'https://redis.io', category: 'Data', hosted: true, match: /\bredis\b/i},
  {name: 'PostgreSQL', url: 'https://www.postgresql.org', category: 'Data', hosted: true, match: /\bpostgres(ql)?\b/i},
  {name: 'Kafka', url: 'https://kafka.apache.org', category: 'Data', hosted: true, match: /\bkafka\b/i},
  {name: 'RabbitMQ', url: 'https://www.rabbitmq.com', category: 'Data', hosted: true, match: /\brabbitmq\b/i},
  {name: 'BullMQ', url: 'https://bullmq.io', category: 'Data', hosted: false, match: /\bbull(mq)?\b/i},
  {name: 'Node.js', url: 'https://nodejs.org', category: 'Backend', hosted: false, match: /\bnode(\.?js)?\b/i},
  {name: 'TypeScript', url: 'https://www.typescriptlang.org', category: 'Backend', hosted: false, match: /\btypescript\b/i},
  {name: 'Koa', url: 'https://koajs.com', category: 'Backend', hosted: false, match: /\bkoa\b/i},
  {name: 'GraphQL', url: 'https://graphql.org', category: 'Backend', hosted: false, match: /\bgraphql\b/i},
  {name: 'Relay', url: 'https://relay.dev', category: 'Frontend', hosted: false, match: /\brelay\b/i},
  {name: 'React', url: 'https://react.dev', category: 'Frontend', hosted: false, match: /\breact\b(?! native)/i},
  {name: 'React Native', url: 'https://reactnative.dev', category: 'Frontend', hosted: false, match: /\breact native\b|\breactnative\b/i},
  {name: 'Next.js', url: 'https://nextjs.org', category: 'Frontend', hosted: false, match: /\bnext\.?js\b/i},
  {name: 'Webpack', url: 'https://webpack.js.org', category: 'Frontend', hosted: false, match: /\bwebpack\b/i},
  {name: 'Jest', url: 'https://jestjs.io', category: 'Testing', hosted: false, match: /\bjest\b/i},
  {name: 'Playwright', url: 'https://playwright.dev', category: 'Testing', hosted: false, match: /\bplaywright\b/i},
  {name: 'Git', url: 'https://git-scm.com', category: 'Tools', hosted: false, match: /\bgit\b(?!hub)/i},
];

async function readDevto(username) {
  const articles = [];

  for (let page = 1; page < 10; page++) {
    const batch = await json(`https://dev.to/api/articles?username=${username}&per_page=1000&page=${page}`);

    if (!batch?.length) {
      break;
    }

    articles.push(...batch);
  }

  return articles.map((article) => ({title: article.title, url: article.url, text: `${article.title} ${article.tag_list.join(' ')}`}));
}

function readNotes() {
  return docFiles('docs').map((file) => {
    const source = readFileSync(file, 'utf8');
    const front = source.match(/^---\n([\s\S]*?)\n---/)?.[1] ?? '';
    const title = front.match(/^title:\s*(.+)$/m)?.[1]?.replace(/^['"]|['"]$/g, '') ?? file;
    const tags = [...front.matchAll(/^\s+-\s+(\S+)/gm)].map((m) => m[1]);
    const route = file.replace(/^docs\//, '').replace(/\.mdx?$/, '');

    // Only the title and tags count: a passing mention deep in a note is not evidence of use.
    return {title, route, text: `${title} ${tags.join(' ')}`};
  });
}

const [wooviArticles, myArticles] = await Promise.all([readDevto('woovi'), readDevto('sibelius')]);
const notes = readNotes();
const myPosts = [...writing.map((post) => ({title: post.title, url: post.url, text: post.title})), ...myArticles];
const myRepos = repos.filter((repo) => !repo.fork).map((repo) => ({title: repo.name, url: repo.url, text: `${repo.name.replace(/-/g, ' ')} ${repo.description}`}));

const unique = (items) => [...new Map(items.map((item) => [item.url ?? item.route, item])).values()];

const tools = TOOLS.map(({match, ...tool}) => {
  const hit = (item) => match.test(item.text);

  return {
    ...tool,
    woovi: unique(wooviArticles.filter(hit)).slice(0, 4).map(({title, url}) => ({title, url})),
    me: unique([...myPosts.filter(hit), ...myRepos.filter(hit)]).slice(0, 4).map(({title, url}) => ({title, url})),
    notes: notes.filter(hit).slice(0, 4).map(({title, route}) => ({title, route})),
  };
}).filter((tool) => tool.woovi.length + tool.me.length + tool.notes.length > 0);

writeFileSync('src/data/tools.json', `${JSON.stringify(tools, null, 2)}\n`);
console.log(`tools: ${tools.length} with evidence, ${TOOLS.length - tools.length} without`);
