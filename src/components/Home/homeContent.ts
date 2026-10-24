import {
  DevToIcon,
  GitHubIcon,
  MediumIcon,
  PatreonIcon,
  SpeakerDeckIcon,
  SponsorIcon,
  SpotifyIcon,
  SubstackIcon,
  XIcon,
  YouTubeIcon,
} from './BrandIcons';

export type Drawer = {
  /** Prefix of the doc ids that belong in this drawer, or an explicit list. */
  match: string | string[];
  label: string;
  blurb: string;
  to: string;
  /** Notes worth opening first, as [title, route]. */
  picks: [string, string][];
};

/** The six drawers of the slip-box. Counts come from the docs plugin at build time. */
export const drawers: Drawer[] = [
  {
    match: 'notes/',
    label: 'Notes',
    blurb:
      'Atomic notes, one idea each, linked to each other. The slip-box proper.',
    to: '/category/notes',
    picks: [
      ['Build less', '/notes/build-less'],
      ['Being wrong', '/notes/being-wrong'],
      ['Complexity', '/notes/complexity'],
    ],
  },
  {
    match: 'mentorship/',
    label: 'Mentorship answers',
    blurb:
      'Questions developers actually ask me, answered once so I can answer them forever. Async mentorship, in public.',
    to: '/category/mentorship',
    picks: [
      ['Junior vs senior', '/mentorship/junior-vs-senior'],
      ['How to stand out', '/mentorship/how-to-stand-out'],
      ['Study after work', '/mentorship/study-after-work'],
    ],
  },
  {
    match: 'learning-path/',
    label: 'Learning paths',
    blurb:
      'Ordered routes through a stack, for when "just read the docs" is not an answer.',
    to: '/category/learning-path',
    picks: [
      ['React', '/learning-path/learning-path-react'],
      ['Backend', '/learning-path/learning-path-backend'],
      ['DevOps', '/learning-path/learning-path-devops'],
    ],
  },
  {
    match: [
      'always-share-code',
      'concepts-over-implementation',
      'do-not-answer-twice',
      'simply',
      'writing',
      'programming-fundamentals',
      'testing-concept-frontend',
      'fixing-stuff',
    ],
    label: 'On the craft',
    blurb:
      'Short essays on how I think software should be built, reviewed and explained.',
    to: '/always-share-code',
    picks: [
      ['Always share code', '/always-share-code'],
      ['Concepts over implementation', '/concepts-over-implementation'],
      ['Do not answer twice', '/do-not-answer-twice'],
    ],
  },
  {
    match: [
      'advice-for-developers',
      'looking-for-the-first-job',
      'mentorship-questions',
      'qa-college',
      'asynchronous-mentorship',
      'buying-time',
      'waiting-somebody',
    ],
    label: 'Career, unfiltered',
    blurb:
      'First jobs, interviews, college, and the parts of a career nobody puts on a slide.',
    to: '/advice-for-developers',
    picks: [
      ['Advice for developers', '/advice-for-developers'],
      ['Looking for the first job', '/looking-for-the-first-job'],
      ['Buying time', '/buying-time'],
    ],
  },
  {
    match: ['ideas', 'culture', 'books', 'mention', 'bio', 'structure/structure'],
    label: 'Ideas & culture',
    blurb:
      'Half-formed ideas, the books behind them, and notes on the kind of team I want to work in.',
    to: '/ideas',
    picks: [
      ['Ideas', '/ideas'],
      ['Culture', '/culture'],
      ['Books', '/books'],
    ],
  },
];

export type Channel = {
  name: string;
  handle: string;
  href: string;
  hue: string;
  icon: (props: {className?: string}) => JSX.Element;
  /** Where the same material is mirrored inside this site, if anywhere. */
  mirror?: string;
};

export const channels: Channel[] = [
  {
    name: 'Substack',
    handle: 'sibelius.substack.com',
    href: 'https://sibelius.substack.com/',
    hue: '#FF6719',
    icon: SubstackIcon,
    mirror: '/articles',
  },
  {
    name: 'dev.to',
    handle: '@sibelius · @woovi',
    href: 'https://dev.to/sibelius',
    hue: '#F7F7F7',
    icon: DevToIcon,
    mirror: '/articles',
  },
  {
    name: 'Medium',
    handle: 'sibelius.medium.com',
    href: 'https://sibelius.medium.com/',
    hue: '#C9C9C9',
    icon: MediumIcon,
    mirror: '/articles',
  },
  {
    name: 'YouTube',
    handle: 'talks & teardowns',
    href: '/youtube',
    hue: '#FF0033',
    icon: YouTubeIcon,
  },
  {
    name: 'Podcasts',
    handle: 'guest appearances',
    href: '/podcast',
    hue: '#1DB954',
    icon: SpotifyIcon,
  },
  {
    name: 'SpeakerDeck',
    handle: 'speakerdeck.com/sibelius',
    href: 'https://speakerdeck.com/sibelius',
    hue: '#009287',
    icon: SpeakerDeckIcon,
    mirror: '/talks',
  },
  {
    name: 'X',
    handle: '@sseraphini',
    href: 'https://twitter.com/sseraphini',
    hue: '#E7E9EA',
    icon: XIcon,
  },
  {
    name: 'GitHub',
    handle: '@sibelius',
    href: 'https://github.com/sibelius',
    hue: '#A8B3CF',
    icon: GitHubIcon,
  },
  {
    name: 'Patreon',
    handle: 'support the writing',
    href: 'https://www.patreon.com/sibelius',
    hue: '#FF424D',
    icon: PatreonIcon,
  },
  {
    name: 'GitHub Sponsors',
    handle: 'sponsors/sibelius',
    href: 'https://github.com/sponsors/sibelius',
    hue: '#DB61A2',
    icon: SponsorIcon,
  },
];

export type Offer = {
  title: string;
  price: string;
  cadence: string;
  for_: string;
  bullets: string[];
  to: string;
};

export const offers: Offer[] = [
  {
    title: 'Mentorship for developers',
    price: 'US$ 120',
    cadence: 'per month',
    for_: 'Developers',
    bullets: [
      'One sync call a month, async chat every day',
      'Get the first job, or the next level',
      'Move from IC to leading a team',
    ],
    to: '/paid-mentorship-developers',
  },
  {
    title: 'Consulting for startups',
    price: 'US$ 120',
    cadence: 'per month',
    for_: 'Founders',
    bullets: [
      'Structure the team: daily, review, CI/CD',
      'Cut scope down to a real MVP',
      'Read cohorts, chase product-market fit',
    ],
    to: '/paid-consulting-startups',
  },
  {
    title: 'Private community',
    price: 'US$ 10',
    cadence: 'per month',
    for_: 'Builders',
    bullets: [
      'A Discord of people building things',
      'Product, startup and engineering talk',
      'Bring your work, get it read',
    ],
    to: '/private-community',
  },
];
