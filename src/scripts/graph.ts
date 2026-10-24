import type {GraphData, GraphNode} from '../lib/graph';
import {highlight, search, type SearchDoc} from './search';

const SVG = 'http://www.w3.org/2000/svg';

type SimNode = GraphNode & {
  index: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  fx: number | null;
  fy: number | null;
  r: number;
  degree: number;
  neighbors: Set<SimNode>;
  circle: SVGCircleElement;
  label: SVGTextElement;
};

type SimLink = {
  source: SimNode;
  target: SimNode;
  kind: 'tag' | 'link';
  distance: number;
  strength: number;
  bias: number;
  line: SVGLineElement;
};

type Camera = {x: number; y: number; k: number};

const reducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/** Small deterministic PRNG, so the graph settles into the same shape on every visit. */
function random(seed: number) {
  return () => {
    seed = (seed * 1664525 + 1013904223) % 4294967296;

    return seed / 4294967296;
  };
}

const el = <K extends keyof SVGElementTagNameMap>(name: K, attrs: Record<string, string | number> = {}) => {
  const node = document.createElementNS(SVG, name);

  for (const [key, value] of Object.entries(attrs)) {
    node.setAttribute(key, String(value));
  }

  return node;
};

const escape = (value: string) =>
  value.replace(/[&<>"']/g, (char) => ({'&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'})[char]!);

export function initGraph(root: HTMLElement) {
  const data: GraphData = JSON.parse(root.querySelector('[data-graph-data]')!.textContent!);
  const stage = root.querySelector<HTMLElement>('.graph-stage')!;
  const svg = root.querySelector<SVGSVGElement>('.graph-svg')!;
  const panel = root.querySelector<HTMLElement>('.graph-panel')!;
  const caption = root.querySelector<HTMLElement>('.graph-caption')!;
  const input = root.querySelector<HTMLInputElement>('.graph-search input')!;
  const results = root.querySelector<HTMLUListElement>('.graph-results')!;

  const rand = random(42);
  let width = stage.clientWidth;
  let height = stage.clientHeight;

  // ── Build the model ──────────────────────────────────────────────────
  const viewport = el('g', {class: 'graph-viewport'});
  const linkLayer = el('g', {class: 'graph-links'});
  const nodeLayer = el('g', {class: 'graph-nodes'});
  const labelLayer = el('g', {class: 'graph-labels', 'aria-hidden': 'true'});
  viewport.append(linkLayer, nodeLayer, labelLayer);
  svg.append(viewport);

  const tags = data.nodes.filter((node) => node.kind === 'tag').sort((a, b) => b.weight - a.weight);
  const ring = Math.min(width, height) * 0.42;
  const tagHome = new Map(
    tags.map((tag, i) => {
      const angle = (i / tags.length) * Math.PI * 2 + i * 0.7;
      const radius = ring * (0.35 + 0.65 * ((i % 3) / 2));

      return [tag.id, {x: Math.cos(angle) * radius, y: Math.sin(angle) * radius}];
    }),
  );

  const nodes: SimNode[] = data.nodes.map((node, index) => {
    const home = node.kind === 'tag' ? tagHome.get(node.id)! : tagHome.get(`tag:${node.tags?.find((tag) => tagHome.has(`tag:${tag}`))}`);
    const spread = node.kind === 'tag' ? 10 : 70;
    const isTag = node.kind === 'tag';

    const circle = el('circle', {class: `graph-node graph-node-${node.kind}`});
    const label = el('text', {class: `graph-label graph-label-${node.kind}`});
    label.textContent = node.title;
    nodeLayer.append(circle);
    labelLayer.append(label);

    const title = el('title');
    title.textContent = node.title;
    circle.append(title);

    return {
      ...node,
      index,
      x: (home?.x ?? 0) + (rand() - 0.5) * spread,
      y: (home?.y ?? 0) + (rand() - 0.5) * spread,
      vx: 0,
      vy: 0,
      fx: null,
      fy: null,
      r: isTag ? 7 + Math.sqrt(node.weight) * 2.1 : 3.6 + Math.min(node.weight, 6) * 0.55,
      degree: 0,
      neighbors: new Set(),
      circle,
      label,
    };
  });

  const byId = new Map(nodes.map((node) => [node.id, node]));

  const links: SimLink[] = data.links
    .map((link) => ({source: byId.get(link.source)!, target: byId.get(link.target)!, kind: link.kind}))
    .filter((link) => link.source && link.target)
    .map((link) => {
      link.source.degree++;
      link.target.degree++;
      link.source.neighbors.add(link.target);
      link.target.neighbors.add(link.source);

      const line = el('line', {class: `graph-link graph-link-${link.kind}`});
      linkLayer.append(line);

      return {...link, distance: link.kind === 'tag' ? 64 : 46, strength: 0, bias: 0, line};
    });

  for (const link of links) {
    link.strength = 1 / Math.min(link.source.degree, link.target.degree);
    link.bias = link.source.degree / (link.source.degree + link.target.degree);
  }

  // ── Physics: many-body repulsion, springs, gentle centering ──────────
  let alpha = 1;
  let alphaTarget = 0;
  const alphaMin = 0.002;
  const alphaDecay = 1 - Math.pow(alphaMin, 1 / 320);
  const velocityDecay = 0.42;

  function tick() {
    alpha += (alphaTarget - alpha) * alphaDecay;

    for (const link of links) {
      const {source, target} = link;
      let dx = target.x + target.vx - source.x - source.vx || 1e-6;
      let dy = target.y + target.vy - source.y - source.vy || 1e-6;
      let length = Math.sqrt(dx * dx + dy * dy);
      length = ((length - link.distance) / length) * alpha * link.strength;
      dx *= length;
      dy *= length;
      target.vx -= dx * link.bias;
      target.vy -= dy * link.bias;
      source.vx += dx * (1 - link.bias);
      source.vy += dy * (1 - link.bias);
    }

    for (let i = 0; i < nodes.length; i++) {
      const a = nodes[i];

      for (let j = i + 1; j < nodes.length; j++) {
        const b = nodes[j];
        const dx = b.x - a.x || 1e-6;
        const dy = b.y - a.y || 1e-6;
        const d2 = dx * dx + dy * dy;

        if (d2 > 160000) {
          continue;
        }

        const charge = (a.kind === 'tag' || b.kind === 'tag' ? -90 : -34) * alpha;
        const force = charge / Math.max(d2, 30);
        a.vx += dx * force;
        a.vy += dy * force;
        b.vx -= dx * force;
        b.vy -= dy * force;

        // Collision: never let two dots overlap.
        const min = a.r + b.r + 3;

        if (d2 < min * min) {
          const d = Math.sqrt(d2);
          const push = ((min - d) / d) * 0.5;
          a.vx -= dx * push;
          a.vy -= dy * push;
          b.vx += dx * push;
          b.vy += dy * push;
        }
      }
    }

    for (const node of nodes) {
      node.vx -= node.x * 0.012 * alpha;
      node.vy -= node.y * 0.012 * alpha;

      if (node.fx !== null) {
        node.x = node.fx;
        node.y = node.fy!;
        node.vx = 0;
        node.vy = 0;
      } else {
        node.x += node.vx *= 1 - velocityDecay;
        node.y += node.vy *= 1 - velocityDecay;
      }
    }
  }

  // ── Camera ───────────────────────────────────────────────────────────
  const camera: Camera = {x: width / 2, y: height / 2, k: 1};
  let cameraTarget: Camera | null = null;
  let userMovedCamera = false;

  function fitCamera(padding = 48): Camera {
    let minX = Infinity;
    let minY = Infinity;
    let maxX = -Infinity;
    let maxY = -Infinity;

    for (const node of nodes) {
      minX = Math.min(minX, node.x - node.r);
      minY = Math.min(minY, node.y - node.r);
      maxX = Math.max(maxX, node.x + node.r);
      maxY = Math.max(maxY, node.y + node.r);
    }

    const k = Math.min((width - padding * 2) / (maxX - minX), (height - padding * 2) / (maxY - minY), 2.4);

    return {k, x: width / 2 - ((minX + maxX) / 2) * k, y: height / 2 - ((minY + maxY) / 2) * k};
  }

  function moveCamera(next: Camera, animate = !reducedMotion()) {
    if (animate) {
      cameraTarget = next;
      wake();
    } else {
      Object.assign(camera, next);
      cameraTarget = null;
      draw();
    }
  }

  function focusCamera(node: SimNode) {
    const k = Math.max(camera.k, 1.7);
    const panelOffset = panel.hidden || width < 720 ? 0 : -Math.min(170, width * 0.15);

    userMovedCamera = true;
    moveCamera({k, x: width / 2 + panelOffset - node.x * k, y: height / 2 - node.y * k});
  }

  // ── Drawing ──────────────────────────────────────────────────────────
  let labelsZoomed = false;

  function draw() {
    viewport.setAttribute('transform', `translate(${camera.x},${camera.y}) scale(${camera.k})`);

    for (const link of links) {
      link.line.setAttribute('x1', link.source.x.toFixed(1));
      link.line.setAttribute('y1', link.source.y.toFixed(1));
      link.line.setAttribute('x2', link.target.x.toFixed(1));
      link.line.setAttribute('y2', link.target.y.toFixed(1));
    }

    for (const node of nodes) {
      node.circle.setAttribute('cx', node.x.toFixed(1));
      node.circle.setAttribute('cy', node.y.toFixed(1));
      node.circle.setAttribute('r', String(node.r));
      node.label.setAttribute('x', node.x.toFixed(1));
      node.label.setAttribute('y', (node.y + node.r + (node.kind === 'tag' ? 15 : 11)).toFixed(1));
    }

    // Labels scale with the camera; keep them a readable size on screen.
    const zoomed = camera.k >= 2;

    if (zoomed !== labelsZoomed) {
      labelsZoomed = zoomed;
      svg.classList.toggle('is-zoomed', zoomed);
    }

    svg.style.setProperty('--k', String(camera.k));
  }

  // ── Animation loop: runs only while something is moving ──────────────
  let frame = 0;
  let running = false;

  function loop() {
    let moving = false;

    if (alpha >= alphaMin || alphaTarget > 0) {
      tick();
      moving = true;

      if (!userMovedCamera) {
        const fit = fitCamera();
        camera.k += (fit.k - camera.k) * 0.12;
        camera.x += (fit.x - camera.x) * 0.12;
        camera.y += (fit.y - camera.y) * 0.12;
      }
    }

    if (cameraTarget) {
      camera.k += (cameraTarget.k - camera.k) * 0.16;
      camera.x += (cameraTarget.x - camera.x) * 0.16;
      camera.y += (cameraTarget.y - camera.y) * 0.16;
      moving = true;

      if (Math.abs(cameraTarget.k - camera.k) < 0.002 && Math.abs(cameraTarget.x - camera.x) < 0.3 && Math.abs(cameraTarget.y - camera.y) < 0.3) {
        Object.assign(camera, cameraTarget);
        cameraTarget = null;
      }
    }

    draw();

    if (moving) {
      frame = requestAnimationFrame(loop);
    } else {
      running = false;
    }
  }

  function wake() {
    if (!running) {
      running = true;
      frame = requestAnimationFrame(loop);
    }
  }

  function settleInstantly() {
    while (alpha >= alphaMin) {
      tick();
    }

    Object.assign(camera, fitCamera());
    draw();
  }

  // ── Highlighting and selection ───────────────────────────────────────
  let selected: SimNode | null = null;
  let hovered: SimNode | null = null;
  let matches: Set<SimNode> | null = null;

  function paint() {
    const focus = hovered ?? selected;
    const lit = focus ? new Set([focus, ...focus.neighbors]) : matches;

    svg.classList.toggle('has-focus', !!lit);

    for (const node of nodes) {
      node.circle.classList.toggle('is-lit', !!lit?.has(node));
      node.circle.classList.toggle('is-selected', node === selected);
      node.label.classList.toggle('is-lit', !!lit?.has(node));
    }

    for (const link of links) {
      link.line.classList.toggle('is-lit', !!focus && (link.source === focus || link.target === focus));
    }
  }

  const noteCount = nodes.filter((node) => node.kind === 'note').length;
  const linkCount = links.filter((link) => link.kind === 'link').length;
  const defaultCaption = `${noteCount} notes, ${tags.length} tags and ${linkCount} links between notes. Drag to move, scroll or pinch to zoom, click a dot to preview it.`;
  caption.textContent = defaultCaption;

  function openPanel(node: SimNode) {
    const neighbors = [...node.neighbors].sort((a, b) => (a.kind === b.kind ? a.title.localeCompare(b.title) : a.kind === 'tag' ? -1 : 1));
    const neighborTags = neighbors.filter((n) => n.kind === 'tag');
    const neighborNotes = neighbors.filter((n) => n.kind === 'note');

    const list = (items: SimNode[]) =>
      items.map((item) => `<li><button type="button" class="graph-jump" data-node="${item.index}">${escape(item.title)}</button></li>`).join('');

    panel.innerHTML =
      node.kind === 'tag'
        ? `<p class="graph-panel-kind">Tag</p>
           <h3 class="graph-panel-title">${escape(node.title)}</h3>
           <p class="graph-panel-text">${node.weight} notes carry this tag.</p>
           <a class="button button-primary graph-panel-open" href="${node.url}">See all ${node.weight} notes</a>
           <h4 class="graph-panel-sub">Notes</h4>
           <ul class="graph-panel-list" role="list">${list(neighborNotes)}</ul>`
        : `<p class="graph-panel-kind">${escape(node.section ?? 'Note')}</p>
           <h3 class="graph-panel-title"><a class="plain" href="${node.url}">${escape(node.title)}</a></h3>
           ${node.excerpt ? `<p class="graph-panel-text">${escape(node.excerpt)}</p>` : ''}
           <a class="button button-primary graph-panel-open" href="${node.url}">Open note</a>
           ${neighborTags.length ? `<h4 class="graph-panel-sub">Tags</h4><ul class="graph-panel-chips" role="list">${list(neighborTags)}</ul>` : ''}
           ${neighborNotes.length ? `<h4 class="graph-panel-sub">Linked notes</h4><ul class="graph-panel-list" role="list">${list(neighborNotes)}</ul>` : ''}`;

    panel.insertAdjacentHTML('afterbegin', '<button type="button" class="graph-panel-close" aria-label="Close preview">Close</button>');
    panel.hidden = false;
    panel.classList.remove('is-entering');
    void panel.offsetWidth;
    panel.classList.add('is-entering');
  }

  /** Tag buttons outside the graph mirror what is selected inside it. */
  function syncTagButtons() {
    const current = selected?.kind === 'tag' ? selected.title : '';

    document.querySelectorAll('[data-graph-tag]').forEach((button) => {
      button.setAttribute('aria-pressed', String((button as HTMLElement).dataset.graphTag === current));
    });
  }

  function select(node: SimNode | null, {focus = true} = {}) {
    selected = node;
    paint();
    syncTagButtons();

    if (!node) {
      panel.hidden = true;
      caption.textContent = defaultCaption;

      return;
    }

    openPanel(node);
    caption.textContent = node.kind === 'tag' ? `Showing notes tagged ${node.title}.` : `Showing ${node.title} and its ${node.neighbors.size} connections.`;

    if (focus) {
      focusCamera(node);
    }
  }

  panel.addEventListener('click', (event) => {
    const target = event.target as HTMLElement;

    if (target.closest('.graph-panel-close')) {
      select(null);
    }

    const jump = target.closest<HTMLElement>('[data-node]');

    if (jump) {
      select(nodes[Number(jump.dataset.node)]);
    }
  });

  // ── Pointer: drag nodes, pan, wheel and pinch zoom ───────────────────
  const pointers = new Map<number, {x: number; y: number}>();
  let drag: {node: SimNode | null; startX: number; startY: number; moved: boolean; cam: Camera} | null = null;
  let pinch: {distance: number; k: number; cx: number; cy: number; cam: Camera} | null = null;

  const local = (event: PointerEvent | WheelEvent) => {
    const rect = svg.getBoundingClientRect();

    return {x: event.clientX - rect.left, y: event.clientY - rect.top};
  };

  const toWorld = (point: {x: number; y: number}) => ({x: (point.x - camera.x) / camera.k, y: (point.y - camera.y) / camera.k});

  const nodeAt = (target: EventTarget | null) => nodes.find((node) => node.circle === target) ?? null;

  function zoomAround(point: {x: number; y: number}, k: number, from: Camera = camera) {
    const clamped = Math.min(6, Math.max(0.3, k));
    const world = {x: (point.x - from.x) / from.k, y: (point.y - from.y) / from.k};

    userMovedCamera = true;
    cameraTarget = null;
    Object.assign(camera, {k: clamped, x: point.x - world.x * clamped, y: point.y - world.y * clamped});
    draw();
  }

  svg.addEventListener('pointerdown', (event) => {
    svg.setPointerCapture(event.pointerId);
    pointers.set(event.pointerId, local(event));

    if (pointers.size === 2) {
      const [a, b] = [...pointers.values()];

      drag = null;
      pinch = {distance: Math.hypot(a.x - b.x, a.y - b.y), k: camera.k, cx: (a.x + b.x) / 2, cy: (a.y + b.y) / 2, cam: {...camera}};

      return;
    }

    const point = local(event);
    drag = {node: nodeAt(event.target), startX: point.x, startY: point.y, moved: false, cam: {...camera}};
    svg.classList.add('is-dragging');
  });

  svg.addEventListener('pointermove', (event) => {
    const point = local(event);

    if (pointers.has(event.pointerId)) {
      pointers.set(event.pointerId, point);
    }

    if (pinch && pointers.size === 2) {
      const [a, b] = [...pointers.values()];

      zoomAround({x: pinch.cx, y: pinch.cy}, pinch.k * (Math.hypot(a.x - b.x, a.y - b.y) / pinch.distance), pinch.cam);

      return;
    }

    if (!drag) {
      const node = nodeAt(event.target);

      if (node !== hovered) {
        hovered = node;
        paint();
      }

      return;
    }

    const dx = point.x - drag.startX;
    const dy = point.y - drag.startY;

    if (!drag.moved && Math.hypot(dx, dy) < 4) {
      return;
    }

    drag.moved = true;

    if (drag.node) {
      const world = toWorld(point);
      drag.node.fx = world.x;
      drag.node.fy = world.y;
      alphaTarget = 0.25;
      userMovedCamera = true;
      wake();
    } else {
      userMovedCamera = true;
      cameraTarget = null;
      camera.x = drag.cam.x + dx;
      camera.y = drag.cam.y + dy;
      draw();
    }
  });

  const release = (event: PointerEvent) => {
    pointers.delete(event.pointerId);

    if (pointers.size < 2) {
      pinch = null;
    }

    if (!drag) {
      return;
    }

    if (drag.node) {
      drag.node.fx = null;
      drag.node.fy = null;
      alphaTarget = 0;
      wake();
    }

    if (!drag.moved && event.type === 'pointerup') {
      const node = drag.node;

      if (node) {
        select(node === selected ? null : node);
      } else if (selected) {
        select(null);
      }
    }

    drag = null;
    svg.classList.remove('is-dragging');
  };

  svg.addEventListener('pointerup', release);
  svg.addEventListener('pointercancel', release);

  svg.addEventListener('pointerleave', () => {
    if (hovered && !drag) {
      hovered = null;
      paint();
    }
  });

  svg.addEventListener('dblclick', (event) => {
    const node = nodeAt(event.target);

    if (node) {
      window.location.href = node.url;
    }
  });

  svg.addEventListener(
    'wheel',
    (event) => {
      event.preventDefault();
      zoomAround(local(event), camera.k * Math.exp(-event.deltaY * (event.ctrlKey ? 0.01 : 0.0022)));
    },
    {passive: false},
  );

  root.querySelector('[data-zoom="in"]')?.addEventListener('click', () => {
    userMovedCamera = true;
    moveCamera(zoomed(1.5));
  });

  root.querySelector('[data-zoom="out"]')?.addEventListener('click', () => {
    userMovedCamera = true;
    moveCamera(zoomed(1 / 1.5));
  });

  root.querySelector('[data-zoom="fit"]')?.addEventListener('click', () => {
    moveCamera(fitCamera());
  });

  function zoomed(factor: number): Camera {
    const k = Math.min(6, Math.max(0.3, camera.k * factor));
    const center = toWorld({x: width / 2, y: height / 2});

    return {k, x: width / 2 - center.x * k, y: height / 2 - center.y * k};
  }

  // ── Search inside the graph ──────────────────────────────────────────
  const docs: (SearchDoc & {node: SimNode})[] = nodes.map((node) => ({
    title: node.title,
    url: node.url,
    section: node.kind === 'tag' ? 'Tag' : node.section ?? '',
    tags: node.tags ?? [],
    excerpt: node.excerpt ?? '',
    text: node.excerpt ?? '',
    node,
  }));
  let hits: typeof docs = [];
  let active = 0;

  function renderResults() {
    const query = input.value.trim();

    hits = search(docs, query, 8).map((hit) => hit.doc as (typeof docs)[number]);
    matches = query ? new Set(search(docs, query, nodes.length).map((hit) => (hit.doc as (typeof docs)[number]).node)) : null;
    active = 0;
    results.hidden = hits.length === 0;
    results.innerHTML = hits
      .map(
        (hit, i) => `<li role="option" id="graph-hit-${i}" aria-selected="${i === 0}" data-node="${hit.node.index}">
          <span class="graph-hit-title">${highlight(hit.title, query)}</span>
          <span class="graph-hit-meta">${escape(hit.section)}</span></li>`,
      )
      .join('');
    input.setAttribute('aria-expanded', String(!results.hidden));

    if (!selected) {
      caption.textContent = query ? (matches!.size ? `${matches!.size} dots match “${query}”.` : `Nothing in the graph matches “${query}”.`) : defaultCaption;
    }

    paint();
  }

  function setActive(next: number) {
    active = (next + hits.length) % Math.max(hits.length, 1);
    results.querySelectorAll('li').forEach((item, i) => item.setAttribute('aria-selected', String(i === active)));
    input.setAttribute('aria-activedescendant', `graph-hit-${active}`);
  }

  function choose(node: SimNode) {
    results.hidden = true;
    input.setAttribute('aria-expanded', 'false');
    matches = null;
    select(node);
  }

  input.addEventListener('input', renderResults);
  input.addEventListener('focus', () => input.value && renderResults());

  input.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
      event.preventDefault();
      setActive(active + (event.key === 'ArrowDown' ? 1 : -1));
    } else if (event.key === 'Enter') {
      event.preventDefault();

      if (hits[active]) {
        choose(hits[active].node);
      }
    } else if (event.key === 'Escape') {
      input.value = '';
      renderResults();
    }
  });

  results.addEventListener('pointerdown', (event) => {
    const item = (event.target as HTMLElement).closest<HTMLElement>('[data-node]');

    if (item) {
      event.preventDefault();
      choose(nodes[Number(item.dataset.node)]);
    }
  });

  input.addEventListener('blur', () => {
    results.hidden = true;
  });

  root.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && selected && event.target !== input) {
      select(null);
    }
  });

  // Tag buttons anywhere on the page can drive the graph.
  document.addEventListener('click', (event) => {
    const button = (event.target as HTMLElement).closest<HTMLElement>('[data-graph-tag]');

    if (!button) {
      return;
    }

    const node = byId.get(`tag:${button.dataset.graphTag}`);

    if (node) {
      select(node === selected ? null : node);
    } else {
      select(null);
      moveCamera(fitCamera());
    }
  });

  // ── Size and start ───────────────────────────────────────────────────
  const resize = () => {
    width = stage.clientWidth;
    height = stage.clientHeight;
    svg.setAttribute('viewBox', `0 0 ${width} ${height}`);

    if (!userMovedCamera) {
      Object.assign(camera, fitCamera());
    }

    draw();
  };

  new ResizeObserver(resize).observe(stage);
  resize();

  if (reducedMotion()) {
    settleInstantly();
    root.classList.add('is-ready');

    const focusParam = new URLSearchParams(window.location.search).get('focus');
    const focusNode = focusParam ? (byId.get(`tag:${focusParam}`) ?? nodes.find((node) => node.id === focusParam)) : null;

    if (focusNode) {
      select(focusNode);
    }

    return;
  }

  // The one orchestrated moment: the notes find their places when the graph scrolls into view.
  const observer = new IntersectionObserver(
    (entries) => {
      if (entries.some((entry) => entry.isIntersecting)) {
        observer.disconnect();
        root.classList.add('is-ready');
        wake();
      }
    },
    {threshold: 0.25},
  );

  draw();
  observer.observe(stage);

  // /graph?focus=relay opens the graph on that tag or note once it has settled.
  const focusParam = new URLSearchParams(window.location.search).get('focus');
  const focusNode = focusParam ? (byId.get(`tag:${focusParam}`) ?? nodes.find((node) => node.id === focusParam)) : null;

  if (focusNode) {
    setTimeout(() => select(focusNode), 1400);
  }

  window.addEventListener('pagehide', () => cancelAnimationFrame(frame));
}
