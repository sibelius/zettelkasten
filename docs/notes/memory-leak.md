---
id: memory-leak
title: Memory Leak
tags:
  - nodejs
  - testing
---

```
node --expose-gc ./node_modules/jest/bin/jest.js --runInBand --logHeapUsage packages/main/src/modules/auth/admin/mutations/__tests__
```

```
node --inspect-brk --expose-gc ./node_modules/.bin/jest --runInBand --logHeapUsage packages/main/src/modules/auth/admin/mutations/__tests__
```

- https://chanind.github.io/javascript/2019/10/12/jest-tests-memory-leak.html

Memory leak when you allocated some memory and didn't dispose it.
