---
id: frontend-hiring-questions
title: frontend hiring questions
tags:
  - advice
  - mentorship
  - questions
  - async
---

## frontend questions

"Good backend hiring question?"

- how to scale frontend? a good answer is to use a design system
- how to scale css? use design system
- What do you test on the frontend? integration test, test the behavior, using testing library, test that when filling out a form and clicking the submit button, the api is called with the correct data
- how do you create a new page? does it start with a component and then break it down (top down), or does it start with base components and then compose them? a good answer would be to use top-down, because segmenting (componentizing) is very difficult if you don't know how it will be structured, another good answer is to use only the components that already exist in the design system
- if a component doesn't exist in the design system for a page you need to do what do you do? A good answer would be to discuss with the designer whether to use an existing component or add the new component to the design system.
- what is the tradeoff of adding a new component to a design system? the more components, the more complexity and work to maintain, the fewer simpler components
- how to organize a design system? A good answer is to have documentation, using docusuarus and/or storybook
- how do you deal with data fetching? The best answer would be relay, but it only works if you have graphql, another answer would be something more level and declarative like react-query, data fetching by hand is always an error
- create a new component or a new prop? prefer a prop if the "new behavior" converges with the existing component, otherwise create a new component
- how to start a new design system? decide the initial basic components, typography, scaping, buttons
- what is important is a design system? consistency, maintainability, scalability, typography, basic components, storybook, documentation
- when to use SSR? when you need perf and SEO, SSR is to render the frontend in the server and hydrate
- what is hydration? it is the process of conciliating the server rendered html with the client rendered html
- how to improve SEO? use SSR, use meta tags, use structured data, use sitemap, use robots.txt, make site fast
- how to improve frontend performance? lazy loading, RSC, SSR, tree shaking, remove big packages
- when to virtualize a list? when we are handling big number of items
- when to memo a component? when you need to render a lot of number of this components
- how to manage state? prefer local state using useState, only when needed use useContext, move data fetching to something else like relay, react-query
- how to build complex forms with validations ? prefer use packages like formik and yup
- how to deploy frontend ? you can deploy on s3 and expose then using nginx, cloudfront or cloudflare pages, any CDN works.
