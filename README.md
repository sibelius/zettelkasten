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

`/reading` lists what I am reading and recommend, with a calendar, a page per day (`/reading/2026-10-24`) and an RSS feed at `/reading.xml`.
Links are stored one file per day in `src/data/reading/YYYY-MM-DD.json`.

```bash
# Pull my new links from Slack #articles-dev (token needs channels:history)
SLACK_TOKEN=xoxp-... pnpm reading

# Add one by hand, with an optional note on why it is worth reading
pnpm reading --add https://example.com/post "Why it is worth reading" --date 2026-10-24
```

Each new link gets its title, description and preview image. Commit `src/data/reading`.

## Ask Sibelius AI, MCP and llms.txt

Everything stays static. At build time the site publishes:

- `/ask-index.json`: every note (split at its headings), answered question, post and reading link, as passages.
- `/llms.txt` and `/llms-full.txt`: a map of the site and the full text of every note, for language models.
- `/sibelius-mcp.mjs`: the MCP server as one file, built from `mcp/server.mjs` and `mcp/retrieve.mjs`.

`/ask` searches the index in the browser with `mcp/retrieve.mjs` (BM25, no LLM, nothing made up) and answers with links, in the voice from [sseraphini-tweets/VOICE.md](https://github.com/sibelius/sseraphini-tweets/blob/main/VOICE.md). When the notes do not cover a question, it says so. Every question can be sent as a prefilled GitHub Discussion in Q&A, and answered discussions show up on `/ask` on the next deploy.

Run the MCP server from this clone:

```bash
claude mcp add --scope user sibelius -- node "$PWD/mcp/server.mjs"
SIBELIUS_INDEX=dist/ask-index.json pnpm mcp   # read a local build instead of the live site
```

Tools: `ask_sibelius`, `search_notes`, `get_note`, `list_notes`, `recent_reading`. Prompt: `answer_as_sibelius`. `/mcp` has setup steps for Claude Code, Claude Desktop, Codex, Cursor, VS Code, Gemini CLI, Windsurf and others.

When something is not covered (Ask Sibelius has no answer, search finds nothing, a page is missing, or the MCP has no evidence), people can ask me to write about it: a prefilled discussion in **Ideas** titled `Write about: …`, where others can upvote it.

## Deploy

Pushing to `main` builds the site and publishes `dist/` to GitHub Pages.
