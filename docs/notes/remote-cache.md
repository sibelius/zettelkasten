---
id: remote-cache
title: Remote Cache
tags:
  - tooling
  - ci
---

- https://github.com/DylanVann/beezel

We want to build less

The basic idea of incremental build is to check the timestamp of each file, and check which files has changed from the last build, and only rebuild them.

A remote cache would help us achieve this in our local and remote machines

It would also make our CI faster.

what is the missing POC of what needs to be build or tested?

- http://neugierig.org/software/blog/2020/05/ninja.html

The article above explain how a bazel like system works.
