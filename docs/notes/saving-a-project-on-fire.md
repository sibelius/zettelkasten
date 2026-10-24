---
id: saving-a-project-on-fire
title: Saving a project on fire
tags:
  - engineering
  - testing
  - management
---

Have you ever been in a project that was on 🔥?

A project is on 🔥when it passed the deadline. When the developer team are put on a "war room" to make sure there is no distractions to finish the project.

The project is on 🔥when there are a lot of basics bugs, like when you click a button it just blow off your application.

The project is on 🔥when new code of a bug fix causes more harm them good, you fix 1 thing to discover you break 2.

It just feel you won't leave this project anymore \\o/.

---

**How to save a project like this?**

To fix a project like this we need 3 things: automation; types and tests;

The first thing to setup is automation: CI/CD.

CI/CD will make sure we always run some tests in an automated way.

it should make sure our dependencies are working well (running yarn install, for instance)

it should make sure our lint is all set.

it should make sure we don't have wrong types.

it should make sure our tests pass.

You also need to setup lint-staged to run pre checks before commiting new code.

Lint-staged will run some checks based on commited files, so you make sure each least these files follow the new code pattern.

Everything should be incremental

You should add more types and tests based on the bugs report.

For each bug you need to improve types and add regression tests to make sure you won't get the same bug again.

To make sure you are moving forward without going backwards.
