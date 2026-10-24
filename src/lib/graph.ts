import {tagCounts, tagUrl, type Doc} from './docs';

export type GraphNode = {
  id: string;
  kind: 'note' | 'tag';
  title: string;
  url: string;
  section?: string;
  tags?: string[];
  excerpt?: string;
  /** Notes behind a tag, or the number of links of a note. */
  weight: number;
};

export type GraphLink = {source: string; target: string; kind: 'tag' | 'link'};

export type GraphData = {nodes: GraphNode[]; links: GraphLink[]};

/** Tags shared by at least this many notes become hubs in the graph. */
const MIN_TAG = 4;

export function buildGraph(docs: Doc[]): GraphData {
  const hubs = new Map(tagCounts(docs).filter(([, count]) => count >= MIN_TAG));
  const nodes: GraphNode[] = [];
  const links: GraphLink[] = [];

  for (const [tag, count] of hubs) {
    nodes.push({id: `tag:${tag}`, kind: 'tag', title: tag, url: tagUrl(tag), weight: count});
  }

  const linkedTo = new Set(docs.flatMap((doc) => doc.links));

  for (const doc of docs) {
    const tagLinks = doc.tags.filter((tag) => hubs.has(tag));

    if (tagLinks.length === 0 && doc.links.length === 0 && !linkedTo.has(doc.id)) {
      continue;
    }

    nodes.push({
      id: doc.id,
      kind: 'note',
      title: doc.title,
      url: doc.url,
      section: doc.section.label,
      tags: doc.tags,
      excerpt: doc.excerpt,
      weight: doc.links.length,
    });

    for (const tag of tagLinks) {
      links.push({source: doc.id, target: `tag:${tag}`, kind: 'tag'});
    }
  }

  const ids = new Set(nodes.map((node) => node.id));

  for (const doc of docs) {
    for (const target of doc.links) {
      if (ids.has(doc.id) && ids.has(target)) {
        links.push({source: doc.id, target, kind: 'link'});
      }
    }
  }

  return {nodes, links};
}
