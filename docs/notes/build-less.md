---
id: build-less
title: Build Less
tags:
  - ci
  - monorepo
  - devops
---

monorepo testing and build playground

- https://github.com/sibelius/monorepo-101

- https://github.com/entria/entria-deploy

Tooling around Git and compare\_url to decide what to build

It does not matter if you have the fastest algorithm if your N is too big.

Sometimes you need to reduce N to make sure you sure things does not grow with N.

As your project grows, your "N" will grow together.

Your dependencies sizes will grow

Your codebase will grow

Your tests will grow (if you care about long term)

Your build process will slow down as you are building more code.

Your type checking will get slower.

One way to solve this is to use a directly acyclic graph (DAG) to avoid testing, type checking, rebuilding what has not changed since last time.

In this article we won't use a DAG, we are going to use a much simpler strategy that can be modify to add a DAG to make it more robust.

The first thing that we want to do is to only run tests that are affected by the current files.

How do we know which files were changed?

We are going to use some `git` commands to make this possible.

**CircleCI concepts**

CircleCI is a continuous integration system that let you automate common software tasks, for instance: linting, tests, type checking, build, deploy.

A new pipeline is trigged when you do some work (push a new commit, for instance).

A pipeline can contains many workflows.

Each workflow have jobs that represents the cycle of your software process (for instance, install → test → deploy).

A job contains N steps of commands to perform something, like run lint, run tests.

Compare URL

CircleCI had a concept of CIRCLECI\_COMPARE\_URL before v2.1, that you can recreate in v2.1 using pipeline variables, like this:

environment:

CIRCLE\_COMPARE\_URL: &lt;&lt; pipeline.project.git\_url >>/compare/&lt;&lt; pipeline.git.base\_revision >>...&lt;&lt;pipeline.git.revision>>

Here is a few examples of COMPARE\_URL:
[https://github.com/owner/repo/compare/...a2e2709c4](https://github.com/owner/repo/compare/...a2e2709c4)

The url above says that this pipeline contains code from the base branch (master or main) to the [`a2e2709c4`](https://github.com/owner/repo/compare/...a2e2709c4) commit.

[https://github.com/owner/repo/compare/37ac69404a5b...69bc6e3fe337](https://github.com/owner/repo/compare/37ac69404a5b...69bc6e3fe337)

The above contains code from commit `37ac69404a5b` to `69bc6e3fe337`.

Test by yourself here [https://github.com/sibelius/monorepo-101/compare/master...8f8760](https://github.com/sibelius/monorepo-101/compare/master...8f8760)

**Problems with CIRLCLE\_COMPARE\_URL using pipeline variables**

The first problem we hit when using CIRCLE\_COMPARE\_URL using pipeline variables was that they are only bringing the range from the current commit to the last commit.

We would like to always test files related to the whole changes in the pull requests.

To fix this, we discard the "base revision" (the first commit in the compare url), and use the base branch instead.

this

[https://github.com/owner/repo/compare/37ac69404a5b...69bc6e3fe337](https://github.com/owner/repo/compare/37ac69404a5b...69bc6e3fe337)

turns into

[https://github.com/owner/repo/compare/master...69bc6e3fe337](https://github.com/owner/repo/compare/37ac69404a5b...69bc6e3fe337)

Before getting the files using git diff (spoiler), we need to checkout the latest master.

This is needed because CircleCI only do a shallow checkout to make it faster, you don't need all git history or branches in every pipeline.

```bash
if [[ $(git rev-parse --abbrev-ref HEAD) != "master" ]]; then
  git branch -f master origin/master;
fi
```

**Testing only affected test files**

After all this setup we need to get a list of all affected files to make sure we are testing the right amount of tests.

FILES\_CHANGED=$(yarn --silent entria-deploy changes $\{CIRCLE\_COMPARE\_URL\} --baseRef $\{BASE\_REF\})

We are using entria-deploy cli to helps us get a list of all files that changed using compare url and a base ref/branch.

What we are really just doing is a git diff —name-only, like this

git diff [master...8f8760](https://github.com/sibelius/monorepo-101/compare/master...8f8760) —name-only

that return a list of all files that changes, like this:

packages/packageB/src/index.ts

After this, we are going to use jest —findRelatedTests to find which testfiles to test

TESTFILES=$(yarn --silent jest --findRelatedTests --listTests $FILES\_CHANGED)

The result is for this example is this:

`packages/packageB/src/__tests__/packageB.spec.ts`

Before testing these files we need to check if there is any testfile to test, this could happen if you are only modifying [README.md](http://readme.md) or other files

```bash
if [ ! -z "$TESTFILES" ];
  then
    JEST_JUNIT_OUTPUT="./packages/cores/test-results/jest/results.xml" yarn jest --passWithNoTests --coverage --forceExit --ci --maxWorkers=7 $TESTFILES
fi
```

Splitting tests to make them blazing fast

We can use `circleci tests split` to split test files to run them in parallel

```bash
TESTFILES_SPLITTED=$(echo $TESTFILES | circleci tests split | xargs -n 1 echo)
```

**Build and Deploy only affected packages**

After bringing down the testing time in pull requests to a mean of 3x, can we only build and deploy affected packages? sure we can.

Our monorepo contains many GraphQL servers, and some REST (just one I swear), we also have many frontends and many apps (some white labels).

We used to build and deploy all of them to staging on master after every commit.

To solve this, we used the CIRCLE\_COMPARE\_URL (that provides the right range in master), to check if we changed any file that would affected the package to be deployed.

```bash
SHOULD_BUILD=$(yarn --silent entria-deploy hasChanged $CIRCLE_COMPARE_URL packages/shared packages/api
echo $SHOULD_BUILD
if [ "$SHOULD_BUILD" == false ]; then
    circleci-agent step halt
fi
```

entria-deploy hasChanged is just

```bash
git diff master...8f8760 --name-only packages/shared packages/api
```

circleci-agent step halt

make the job stop, so we have one of this before each step of build/deploy to make sure we are not building and deploying something that haven't changed.

you also want to use less parallel testing if you need to test much less tests

5000 → 6 dockers
