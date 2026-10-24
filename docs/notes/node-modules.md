---
id: node-modules
title: Node Modules
tags:
  - nodejs
  - npm
---

#node #npm #packages

node\_modules is where node keeps all their dependencies

one good thing of node\_modules is that you can easily modify an external package code inside node\_modules and test your fix before sending a pull request

node\_modules also applies the colocation pattern, where the dependencies are close to the project

If you check C,C++,python,ruby, GO and other, the deps are not close to where there are used. So it is much harder to modify deps and contribute back

if you use monorepo with yarn workspaces you gonna have many node\_modules. One at the root and one at each package level. Yarn will hoist same package version range to the node\_modules in the root.

Hoist caused many problems as most tool have the wrong assumptions that node\_modules is besides the package, and also the package

if your node\_modules is big it is be slow to load packages, as node tranverse the node\_modules to find it

reduce node modules techniques

- https://tsh.io/blog/reduce-node-modules-for-better-performance/

- use `-production` flag
- node-prune / modclean

https://gist.github.com/greim/e8e1bd3b1ed08a7505ce

- move deps to devDepencies
- improve .npmignore

only pick select fields on package.json

- https://github.com/n1ru4l/use-async-effect/blob/7da6f9915832d63abcf6c93775e8dcbdd70f0cb6/scripts/prepare-deploy-package-json.js

```javascript
const pickFields = [
  'name',
  'version',
  'license',
  'author',
  'homepage',
  'repository',
  'bugs',
  'keywords',
  'module',
  'main',
  'typings',
  'dependencies',
  'peerDependencies',
  'files',
];
```

## Links

Colocation
