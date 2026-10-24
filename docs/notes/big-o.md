---
id: big-o
title: Big O
tags:
  - algorithms
  - performance
---

Big O is how we measure how fast an algorithm is, and how fast it grows as the input N grows

O(n) means the algorithm increases at the same rate as their input

o(log n) means it increases based on their log (usually the depth of the tree), used on tree algorithms to [Search](./search) data

To improve performance we always try to find better algorithm with better times over number of inputs

Sometimes the way to solve this is to reduce the `input`, it is to process less or "cache" some results.

Like bazel or dynamic programming does
