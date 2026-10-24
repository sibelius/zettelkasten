const EXTERNAL = /^([a-z][a-z0-9+.-]*:|\/\/|#)/i;

function rewrite(url, base) {
  if (!url || EXTERNAL.test(url)) {
    return url;
  }

  const [path, hash] = url.split('#');
  const clean = path.replace(/\.mdx?$/, '').replace(/\/index$/, '');
  const withBase = clean.startsWith('/') && !clean.startsWith(base + '/') ? base + clean : clean;

  return hash === undefined ? withBase : `${withBase}#${hash}`;
}

function walk(node, fn) {
  fn(node);
  for (const child of node.children ?? []) {
    walk(child, fn);
  }
}

/** Docusaurus-style links: strip .md/.mdx and put absolute links under the site base. */
export function remarkDocLinks({base}) {
  return (tree) => {
    walk(tree, (node) => {
      if (node.type === 'link' || node.type === 'image' || node.type === 'definition') {
        node.url = rewrite(node.url, base);
      }
    });
  };
}

/** The page layout renders the title, so drop a leading `# Title` from the body. */
export function remarkDropTitle() {
  return (tree) => {
    const index = tree.children.findIndex(
      (node) => node.type !== 'mdxjsEsm' && node.type !== 'yaml' && node.type !== 'thematicBreak',
    );

    if (index >= 0 && tree.children[index].type === 'heading' && tree.children[index].depth === 1) {
      tree.children.splice(index, 1);
    }
  };
}
