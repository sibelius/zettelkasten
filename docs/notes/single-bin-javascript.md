---
id: single-bin-javascript
title: Single Bin JavaScript
tags:
  - javascript
  - nodejs
---

- https://github.com/staltz/noderify

node\_modules is too big and usually it has many things that you don’t need to use

- It has Readme.md
- It has examples
- It has tests and other unrelated code

It would be could to generate a single bin that uses tree shaking to make docker small and run better in lambda envs

It will also make node run faster as it has to process less files

We can remove the need for node\_modules

[Node Modules](./node-modules)
