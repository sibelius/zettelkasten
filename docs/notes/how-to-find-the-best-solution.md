---
id: how-to-find-the-best-solution
title: 'How to find the best solution?'
tags:
  - problem-solving
  - software
---

Your first solution for a problem won’t be the best one.

The first thing you need to do when trying to solve a problem is to research for existing solutions for the given problem. Most of the time someone else already solved your problem or a similar one. After having a list of possible solutions you should evaluate them using some criteria.

A problem always has more than one solution. Finding the best solution is an optimization problem where you use some criteria to evaluate the score of your solution.

You can have some requirements that you should meet eliminating a few possible solutions. After finding the minimal set of possible solutions you need to try all of them in small proof of concepts to understanding their tradeoffs in practice. The simplest solution should be preferred.

If you want to use this solution in a production system with a team, you have some more steps to follow. You need to ensure you can deliver this solution incrementally without breaking anything. You also need to write a RFC and demo your solution to your team, to make sure everybody is onboard. Other people can find problems in your proposed solution and edge cases that you have not thought about it, making you need to reevaluate your approach.

Summary

Finding the best solution for a given problem takes sometime as you need to evaluate many options before deciding. Picking the first one or the “best practice” or most used solution could not be the best solution for your problem and requirements.

Team members can invalidate your proposed solution and help you reach a better solution. Adding a solution for a production running system can be more challenge and require tweaks

---

Feedbacks

Quasar

- Your first solution for a problem \[probably\] won’t be the best one, it happens, rarely but happens
- You can also use a provisional solution depending on your context/time/urgency as long as there is the possibility of an incremental update
- Talk about different solutions in the same testing system and bold the importance of a good test set - actual good tests can cover actions regardless of your internal methods, if your solution is clear it will have a pattern that can be resolved by any change

1. Can you explain your solution clearly?
2. Can your solution be tested?
3. Will small changes in your solution break the tests?
4. Can you upgrade your solution?

Pedro

Carolis

I think the sentences citing "criteria" are a little repetitive, mainly because they are very close in the text structure
