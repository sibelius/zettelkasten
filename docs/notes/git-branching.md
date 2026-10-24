---
id: git-branching
title: Git branching
tags:
  - git
  - development
---

People usually stick with the first solution or approach they find to solve their problem. Best practice is think as the silver bullet for a problem without even thinking about it. When you pick a best practice without thinking you are outsourcing all the decisions and choices to the own who created the best practice. It could be the wrong tradeoffs for your problem.

Why do we use git for software development? We need a way to distribute/decentralize the development of the software without one developer causing issues to another one. After the code was made in isolation, we need to integrate it in the main repository. This is usually made using pull requests.

Pull requests enable you request reviews/feedbacks of your code before adding in the main branch. It also let you discover if your approach break any existing behavior or tests

the size of pull requests matters a lot. Small pull requests are easy and faster to review and have less risky of introductions bugs or regressions.

What is wrong about git flow? What is wrong about develop branch?

[https://www.atlassian.com/continuous-delivery/continuous-integration/trunk-based-development](https://www.atlassian.com/continuous-delivery/continuous-integration/trunk-based-development)
