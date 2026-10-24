# Sibelius Seraphini

My personal site: what I do, what I write, what I build, and the notes behind it all.

Live at https://sibelius.github.io/zettelkasten

## How it works

- Built with [Astro](https://astro.build). Every page is static HTML.
- Notes live in `docs/` as Markdown or MDX. The file path is the URL, so `docs/notes/atom.md` is `/notes/atom`.
- Front matter supports `title`, `tags`, `slug` and `sidebar_position`.
- Link notes with relative links, like `[Mental models](./mental-models)`. Those links become the graph, and every note lists the notes that link to it.
- Writing from Substack, dev.to and Medium, and repos from GitHub, come from `src/data/*.json`.

## Run it

```bash
pnpm install
pnpm dev
```

## Refresh writing and repos

```bash
GITHUB_TOKEN=$(gh auth token) pnpm sync
```

Then commit `src/data/writing.json` and `src/data/repos.json`.

## Reading feed

`/reading` lists what I am reading and recommend, with an RSS feed at `/reading.xml`.
Add a link to `src/data/reading-links.json` (`url`, `date`, and an optional `note` with why it is worth reading), then:

```bash
pnpm sync:reading
```

That fetches each new link's title, description and preview image into `src/data/reading.json`. Commit both files.

## Deploy

Pushing to `main` builds the site and publishes `dist/` to GitHub Pages.
