import {withBase} from '../lib/docs';
import repos from './repos.json';

export type Repo = (typeof repos)[number];

export const person = {
  name: 'Sibelius Seraphini',
  role: 'Cofounder and CTO',
  company: {name: 'Woovi', url: 'https://woovi.com'},
  city: 'São Paulo, Brazil',
  x: {handle: '@sseraphini', url: 'https://twitter.com/sseraphini'},
  github: {handle: '@sibelius', url: 'https://github.com/sibelius'},
  intro:
    'I build payment infrastructure on Pix at Woovi, teach GraphQL and Relay, and mentor developers and founders. Whatever I learn along the way, I write down so you can skip the hard parts.',
};

export type Skill = {area: string; claim: string; proof: {label: string; url: string}[]};

export const skills: Skill[] = [
  {
    area: 'Payments on Pix',
    claim:
      "As cofounder and CTO of Woovi, I build the platform Brazilian businesses use to charge, pay and reconcile with Pix, Brazil's instant payment system.",
    proof: [
      {label: 'Woovi', url: 'https://woovi.com'},
      {label: 'Pix, visualized', url: 'https://github.com/sibelius/pix-visualized'},
      {label: 'What is expected from a CTO of a startup?', url: 'https://sibelius.substack.com/p/what-is-expected-from-a-cto-of-a'},
    ],
  },
  {
    area: 'GraphQL and Relay',
    claim:
      'I have been teaching Relay since Relay Modern came out, through workshops, deep dives and server-side rendering in production.',
    proof: [
      {label: 'relay-workshop', url: 'https://github.com/sibelius/relay-workshop'},
      {label: 'learn-relay', url: 'https://github.com/sibelius/learn-relay'},
      {label: 'Relay Modern: What is a Fragment?', url: 'https://sibelius.medium.com/relay-modern-what-is-a-fragment-c70f164c2469'},
    ],
  },
  {
    area: 'Infrastructure you own',
    claim:
      'Terraform, Proxmox, Talos, Kubernetes and CI that we run ourselves, so the bill and the outages stay ours to fix.',
    proof: [
      {label: 'Proxmox, visualized', url: 'https://proxmox-visualized.vercel.app'},
      {label: 'How to self-host any open source service?', url: 'https://dev.to/woovi/how-to-self-host-any-open-source-service-1p8d'},
      {label: 'Tekton CI/CD, visualized', url: 'https://tekton-visualized.vercel.app'},
    ],
  },
  {
    area: 'Growing developers',
    claim:
      'I help juniors become seniors and seniors become leads, through mentorship and by answering every question once, in public.',
    proof: [
      {label: 'How to become a senior engineer faster?', url: 'https://sibelius.substack.com/p/how-to-become-a-senior-engineer-faster'},
      {label: 'Mentorship answers', url: withBase('/category/mentorship')},
      {label: 'Learning paths', url: withBase('/category/learning-path')},
    ],
  },
];

/** Repos that are interactive study companions. Titles and blurbs I wrote by hand win over the repo's. */
const visualizedCopy: Record<string, {title: string; description?: string}> = {
  'pix-visualized': {title: 'Pix, visualized', description: "A low-level, interactive tour of Brazil's instant payment system."},
  'tekton-visualized': {title: 'Tekton CI/CD, visualized', description: 'Tasks, Pipelines, Triggers and Chains as simulations you can run.'},
  'proxmox-visualized': {title: 'Proxmox, visualized', description: 'KVM and LXC, clusters, HA, networking, SDN, ZFS and Ceph.'},
  'talos-visualized': {title: 'Talos Linux, visualized', description: 'Talos, Kubernetes CNIs and StorageClasses, and the Proxmox CCM and CSI.'},
  'gtor-visualized': {title: 'A General Theory of Reactivity, visualized', description: "Kris Kowal's essay on promises, streams and observables, made interactive."},
  'graphql-relay-visualize': {title: 'GraphQL and Relay, visualized'},
  'homem-que-calculava': {title: 'O Homem que Calculava', description: "Malba Tahan's problems as interactive visualizations."},
  'obmep-visualized': {title: 'OBMEP, visualized'},
};

export const visualized = repos
  .filter((repo) => repo.name in visualizedCopy)
  .sort((a, b) => b.created.localeCompare(a.created))
  .map((repo) => ({
    title: visualizedCopy[repo.name].title,
    description: visualizedCopy[repo.name].description ?? repo.description,
    url: repo.homepage || repo.url,
    host: (repo.homepage || repo.url).replace(/^https?:\/\//, '').replace(/\/$/, ''),
    image: repo.image,
  }))
  // A study companion without a one-line description is not ready to be shown yet.
  .filter((item) => item.description);

export const starred = repos.filter((repo) => !(repo.name in visualizedCopy) && repo.name !== 'zettelkasten').slice(0, 6);

const vibeNames = [
  'learn-relay',
  'brasil-gov',
  'build-vs-buy-vs-llm',
  'd3-learn',
  'physics-lab',
  'comic-builder',
  'hacker-game',
  'jogos-tabuleiro',
  'ajudante-de-licao',
  'escola-dual-3d',
  'squishy',
  'violino',
];

export const vibes = vibeNames
  .map((name) => repos.find((repo) => repo.name === name))
  .filter((repo): repo is Repo => !!repo)
  .map((repo) => ({name: repo.name, url: repo.homepage || repo.url}));

export const offers = [
  {
    price: 'US$ 120',
    title: 'Mentorship for developers',
    description: 'One call a month and async chat every day, to land the first job, reach the next level or start leading a team.',
    url: withBase('/paid-mentorship-developers'),
  },
  {
    price: 'US$ 120',
    title: 'Consulting for startups',
    description: 'Set up how the team works, cut the scope down to a real MVP and read your cohorts.',
    url: withBase('/paid-consulting-startups'),
  },
  {
    price: 'US$ 10',
    title: 'Private community',
    description: 'A Discord of people building products, startups and software, where you bring your work and get it read.',
    url: withBase('/private-community'),
  },
];

export const featuredNotes = ['notes/being-wrong', 'notes/books-as-answers', 'notes/career-risk', 'notes/change', 'notes/constraint-are-good', 'notes/black-swan'];
