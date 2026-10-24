// Helpers the sync scripts share: decoding feed text, reading a page's share preview, and fetching politely.

export const decode = (value = '') =>
  value
    .replace(/^<!\[CDATA\[|\]\]>$/g, '')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;|&#x27;/g, "'")
    .trim();

/** What a page shows when it is shared: its og: tags, falling back to twitter: tags and <title>. */
export async function pageMeta(url) {
  try {
    const response = await fetch(url, {headers: {'user-agent': 'Mozilla/5.0 (compatible; sibelius-site-sync)'}, redirect: 'follow', signal: AbortSignal.timeout(15000)});

    if (!response.ok || !/html/.test(response.headers.get('content-type') ?? '')) {
      return null;
    }

    const html = await response.text();
    // Match the closing quote to the opening one, so an apostrophe inside "…" does not end the value.
    const tag = (name) =>
      html.match(new RegExp(`<meta[^>]+(?:property|name)=["']${name}["'][^>]+content=(["'])(.*?)\\1`, 'i'))?.[2] ??
      html.match(new RegExp(`<meta[^>]+content=(["'])(.*?)\\1[^>]+(?:property|name)=["']${name}["']`, 'i'))?.[2];
    const image = tag('og:image') ?? tag('twitter:image');

    return {
      title: decode(tag('og:title') ?? tag('twitter:title') ?? html.match(/<title[^>]*>([^<]+)<\/title>/i)?.[1] ?? '') || null,
      description: decode(tag('og:description') ?? tag('twitter:description') ?? tag('description') ?? '') || null,
      site: decode(tag('og:site_name') ?? '') || null,
      image: image ? decode(new URL(image, url).toString()) : null,
    };
  } catch {
    return null;
  }
}

/** Run a few at a time, so no site sees a burst of requests. */
export async function mapLimited(items, limit, fn) {
  const results = [];

  for (let i = 0; i < items.length; i += limit) {
    results.push(...(await Promise.all(items.slice(i, i + limit).map(fn))));
  }

  return results;
}
