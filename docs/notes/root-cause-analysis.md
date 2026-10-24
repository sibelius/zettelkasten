---
id: root-cause-analysis
title: Root Cause Analysis
tags:
  - debugging
  - typescript
---

Most developers don't know how to find the root cause of a bug.

The root cause is the "real" cause of a problem.

Let's see any example with typescript, let's see this code:

```ts
const user = await User.findOne();
```

For some reason typescript is inferring user having type any instead of IUser.

If you don't go find the root cause of this, you gonna fix this like this:

```ts
const user: IUser = await User.findOne();
```

now, user has the right type, but if you another developer uses findOne it will be the type any again.

You solved your problem, but you didn't solved the real cause of the problem

The right way to solve this is to ask "why findOne is inferring the wrong type?".

Then you go over mongoose typedefs, and realize that someone made a regression and cause this trouble

So you send a fix to mongoose types, apply a patch-package in your repo, and this is fixed to everybody in your team.

If you don't do this, you gonna propagate the error in the whole codebase
