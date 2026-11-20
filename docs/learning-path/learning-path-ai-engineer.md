---
id: learning-path-ai-engineer
title: Learning Path AI Engineer
tags:
  - learning-path
  - ai
og:
  kicker: Roadmap
  title: AI Engineer
  description: Build products on top of LLMs, measure them with evals and ship them to production.
  lanes:
    - label: Build
      color: blue
      items: [Prompting, Tool use, RAG, Agents + MCP]
    - label: Measure
      color: red
      items: [Evals, LLM as judge, Tracing, Cost + latency]
    - label: Ship
      color: purple
      items: [Guardrails, Caching, Fallbacks, Coding agents]
---

An AI engineer builds products on top of models, they do not train them.
The hard part is not calling the API, it is knowing if the answer is good.

Learn it in this order: understand the model, build with it, measure it, then ship it.
Write an eval before you write the second prompt.

## 0. Foundations

- [ ] be a good software engineer first: APIs, databases, queues, tests. Follow the [backend roadmap](./learning-path-backend)
- [ ] learn how a transformer works at a high level with [The Illustrated Transformer](https://jalammar.github.io/illustrated-transformer/)
  - [ ] build a tiny GPT from scratch with Karpathy's [Neural Networks: Zero to Hero](https://karpathy.ai/zero-to-hero.html)
- [ ] learn what a token is, and see how text is split with [Tiktokenizer](https://tiktokenizer.vercel.app/)
- [ ] learn the knobs: context window, temperature, top-p, max tokens, stop sequences
- [ ] learn what models are bad at: math, counting, recent facts, long exact recall, and confident hallucination
- [ ] read [AI Engineering](https://www.oreilly.com/library/view/ai-engineering/9781098166298/) by Chip Huyen

## 1. Talk to the model

- [ ] call a model API directly with fetch, no framework: [Claude API docs](https://docs.claude.com/)
- [ ] stream the response token by token to the UI
- [ ] learn prompting: clear instructions, examples, roles, and giving the model room to think
  - [ ] read the [prompt engineering guide](https://docs.claude.com/en/docs/build-with-claude/prompt-engineering/overview)
- [ ] get structured output: JSON that matches a schema, validated with [Zod](https://zod.dev/)
- [ ] send images and PDFs, not only text
- [ ] run a model on your own machine with [Ollama](https://ollama.com/) or [llama.cpp](https://github.com/ggml-org/llama.cpp)
- [ ] play with prompts in the terminal with Simon Willison's [llm](https://llm.datasette.io/)

## 2. Tool use

The model decides, your code acts.

- [ ] define a tool with a JSON schema, let the model call it, return the result
- [ ] write tool descriptions as if for a new teammate: what it does, when to use it, what it returns
- [ ] handle errors as tool results, so the model can recover
- [ ] never let a tool do something irreversible without a human confirming

## 3. RAG: give the model your data

- [ ] learn embeddings and similarity search
- [ ] store vectors in the database you already have with [pgvector](https://github.com/pgvector/pgvector) or MongoDB Atlas Vector Search
- [ ] chunk documents well: by section, with overlap, keeping titles as context
- [ ] combine keyword search (BM25) and vector search, then rerank
  - [ ] read [Contextual Retrieval](https://www.anthropic.com/news/contextual-retrieval)
- [ ] always return the sources, so users can check the answer
- [ ] try long context first: sometimes the whole document fits and you do not need RAG

## 4. Evals: know if it works

Without evals you are shipping vibes.

- [ ] build a golden dataset: real inputs and the expected outputs, starting with 20 examples
- [ ] write code-based checks first: valid JSON, right tool called, contains the answer
- [ ] use LLM as judge for what code cannot check, and validate the judge against human labels
- [ ] read your traces, every week. Read [Hamel Husain on evals](https://hamel.dev/blog/posts/evals/)
- [ ] run evals in CI on every prompt change with [promptfoo](https://www.promptfoo.dev/)
- [ ] trace every call: input, output, tokens, latency, cost, with [Langfuse](https://langfuse.com/)

## 5. Agents

An agent is a model using tools in a loop until the task is done.

- [ ] read [Building effective agents](https://www.anthropic.com/engineering/building-effective-agents)
- [ ] start with workflows: prompt chaining, routing, parallelization. Use an agent only when the path is not known upfront
- [ ] write the agent loop yourself once, then use the [Claude Agent SDK](https://docs.claude.com/en/api/agent-sdk/overview) or the [AI SDK](https://ai-sdk.dev/)
- [ ] manage context: summarize, drop old tool results, keep notes in files
- [ ] expose your product to any agent with an [MCP](https://modelcontextprotocol.io/) server
  - [ ] see a real one: the [MCP server of this site](/mcp)
- [ ] give agents a sandbox, a budget and a stop condition

## 6. Production

- [ ] cut cost and latency with prompt caching and batch APIs
- [ ] pick the smallest model that passes your evals, route hard tasks to a bigger one
- [ ] add timeouts, retries and a fallback model
- [ ] guard against prompt injection: treat every tool result and user document as untrusted data
- [ ] keep secrets and personal data out of prompts and logs (LGPD)
- [ ] version prompts like code, and ship them behind a feature flag
- [ ] collect user feedback (thumbs up, edits, retries) and feed it back into the eval set

## 7. Coding agents in your daily work

- [ ] use a coding agent like [Claude Code](https://docs.claude.com/en/docs/claude-code/overview) for real tasks, not only autocomplete
- [ ] write a good CLAUDE.md or AGENTS.md: how to run, test and deploy the project
- [ ] give the agent a way to verify its work: tests, type check, a browser
- [ ] review every diff as if a junior wrote it, you own what you merge
- [ ] [always share code](../always-share-code) and prompts with the team

## 8. Capstone

- [ ] an assistant over your company docs: RAG with sources, an eval set of 50 questions, tracing, and a cost per answer
- [ ] an MCP server for your product, used from Claude Code or Claude Desktop
- [ ] write what you learned, and share it

## How the pieces connect

```
 user ──► prompt + context ──► model ──► tool call ──► your code ──┐
              ▲                  │                                 │
   RAG: docs ─┘                  └──► answer ◄── tool result ◄─────┘
                                        │
                     traces ──► evals ──┴──► change prompt, model or tools
```
