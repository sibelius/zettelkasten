import {person} from '../data/site';
import {withBase} from './docs';

export type ArticleMeta = {tags: string[]; updated: string | null};

const siteUrl = (path: string) => `https://sibelius.github.io${withBase(path)}`;

const personSchema = {
  '@type': 'Person',
  name: person.name,
  jobTitle: person.role,
  url: siteUrl('/'),
  sameAs: [person.x.url, person.github.url, 'https://sibelius.substack.com/', 'https://sibelius.medium.com/', 'https://dev.to/sibelius'],
  worksFor: {'@type': 'Organization', name: person.company.name, url: person.company.url},
};

export function websiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {'@type': 'WebSite', name: person.name, url: siteUrl('/'), description: person.intro, author: personSchema, inLanguage: 'en'},
      {...personSchema, '@context': undefined},
    ],
  };
}

export function articleSchema(title: string, description: string, canonical: string, article: ArticleMeta) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description,
    url: canonical,
    author: personSchema,
    publisher: personSchema,
    inLanguage: 'en',
    ...(article.updated && {dateModified: article.updated}),
    ...(article.tags.length > 0 && {keywords: article.tags.join(', ')}),
  };
}

export function breadcrumbSchema(items: {name: string; url: string}[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  };
}
