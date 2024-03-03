"use strict";(self.webpackChunkdev_docs=self.webpackChunkdev_docs||[]).push([[2337],{8469:(e,t,s)=>{s.r(t),s.d(t,{assets:()=>l,contentTitle:()=>o,default:()=>u,frontMatter:()=>a,metadata:()=>r,toc:()=>c});var n=s(5893),i=s(1151);const a={id:"backend-hiring-questions",title:"backend hiring questions",tags:["advice","mentorship","questions","async"]},o=void 0,r={id:"mentorship/backend-hiring-questions",title:"backend hiring questions",description:"backend questions",source:"@site/docs/mentorship/backend-hiring-questions.md",sourceDirName:"mentorship",slug:"/mentorship/backend-hiring-questions",permalink:"/zettelkasten/mentorship/backend-hiring-questions",draft:!1,unlisted:!1,editUrl:"https://github.com/sibelius/zettelkasten/edit/main/docs/mentorship/backend-hiring-questions.md",tags:[{label:"advice",permalink:"/zettelkasten/tags/advice"},{label:"mentorship",permalink:"/zettelkasten/tags/mentorship"},{label:"questions",permalink:"/zettelkasten/tags/questions"},{label:"async",permalink:"/zettelkasten/tags/async"}],version:"current",lastUpdatedBy:"Sibelius Seraphini",lastUpdatedAt:1709462783,formattedLastUpdatedAt:"Mar 3, 2024",frontMatter:{id:"backend-hiring-questions",title:"backend hiring questions",tags:["advice","mentorship","questions","async"]},sidebar:"docs",previous:{title:"Async Mentorship",permalink:"/zettelkasten/mentorship/async-mentorship"},next:{title:"i really want to grow in my career but have no experience, what should I do?",permalink:"/zettelkasten/mentorship/career-growth-without-experience"}},l={},c=[{value:"backend questions",id:"backend-questions",level:2}];function d(e){const t={h2:"h2",li:"li",p:"p",ul:"ul",...(0,i.a)(),...e.components};return(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)(t.h2,{id:"backend-questions",children:"backend questions"}),"\n",(0,n.jsx)(t.p,{children:'"Good backend hiring question?"'}),"\n",(0,n.jsxs)(t.ul,{children:["\n",(0,n.jsx)(t.li,{children:"how to scale backend? horizontal scaling, vertical scaling, caching, event driven, async job processing, queues"}),"\n",(0,n.jsx)(t.li,{children:"how to optimize database queries? use indexes, use the explain command, simplify queries, use materialized views, cache"}),"\n",(0,n.jsx)(t.li,{children:"what is idempotent ? a request that can be called multiple times without changing the result, a good example is a payment, if the payment is made twice, the result is the same"}),"\n",(0,n.jsx)(t.li,{children:"how to make a function, request idempotent ? use an idempotency key, use an unique database index"}),"\n",(0,n.jsx)(t.li,{children:"how to make a system fault-tolerant? use retries using async job processing, handle error properly, use error code."}),"\n",(0,n.jsx)(t.li,{children:"what to do when a webhook that you are waiting for does not arrive? create a pooling fallback"}),"\n",(0,n.jsx)(t.li,{children:"how to document backend archicture? use diagrams, state machine, sequence diagram"}),"\n",(0,n.jsx)(t.li,{children:"when to use a state machine? when you have a complex flow, like a payment, a subscription, a user registration"}),"\n",(0,n.jsx)(t.li,{children:"how to ensure the data system is consistent? create auditing tools to validate this, use state machines"}),"\n",(0,n.jsx)(t.li,{children:"how to test backend ? prefer integration tests like test input and output of API, GraphQL, jobs, database state avoid mocking databases."}),"\n",(0,n.jsx)(t.li,{children:"how to implement event driven ? use a message broker like kafka, rabbitmq, sqs, sns, redis, bull"}),"\n",(0,n.jsx)(t.li,{children:"how to decouple backend ? create packages/repository per domain instead of feature, avoid circular dependencies, use event-driven"}),"\n",(0,n.jsx)(t.li,{children:"how to automate ci/cd? use github actions, gitlab ci, circle ci, jenkins, travis, docker, docker-compose, kubernetes"}),"\n",(0,n.jsx)(t.li,{children:"why observability is important? to understand the system, to understand the user, to understand the business, to understand the performance"}),"\n",(0,n.jsx)(t.li,{children:"how to implement observability ? apm, prometeus, sentry, grafana, tracing, metrics and logs"}),"\n",(0,n.jsx)(t.li,{children:"how to deploy backend? pure ec2, vps, eks, k8s, aws, gcp, azure, heroku, netlify, vercel, digital ocean"}),"\n",(0,n.jsx)(t.li,{children:"how to do data modelling ? prefer simpler models over complex models, fewer models and fields are better, prefer to avoid too many relationship and joins"}),"\n",(0,n.jsx)(t.li,{children:"when to use docker and docker compose ? to automate deployment and simplify dx for development"}),"\n",(0,n.jsx)(t.li,{children:"how to do database migrations? for sql you need structural and data migrations, for nosql you need to create a new collection and migrate the data"}),"\n",(0,n.jsx)(t.li,{children:"when to use cache ? to cache expensive operations, to cache oauth token with expirations"}),"\n",(0,n.jsx)(t.li,{children:"how to deal with eventual consistency? avoid read followed by write, read from primary, improve write and read concern"}),"\n",(0,n.jsx)(t.li,{children:"how to deal with distributed systems? use idempotent, use retries, use async job processing, use queues, use event-driven, use state machines"}),"\n",(0,n.jsx)(t.li,{children:"how to deal with external APIs? decouple the external API using port adapters, have a fallback for an API"}),"\n",(0,n.jsx)(t.li,{children:"how to deal with concurrency to update a shared resource like a ledger balance? conditional put, locks, database transactions"}),"\n",(0,n.jsx)(t.li,{children:"when to use REST API or GraphQL ? prefer GraphQL for internal products, and REST API for public APIs."}),"\n",(0,n.jsx)(t.li,{children:"how to deal with security? use oauth, use jwt, use https, use cors, use csrf, use rate limit, use waf, use security"}),"\n",(0,n.jsx)(t.li,{children:"vercel vs serverless vs k8s vs ec2 ? vercel for MVP, ec2 for simple workflows, prefer k8s for complex workflows and to be able to move from cloud providers/on-premise/bare-metal, prefer serverless for event-driven workflows"}),"\n"]})]})}function u(e={}){const{wrapper:t}={...(0,i.a)(),...e.components};return t?(0,n.jsx)(t,{...e,children:(0,n.jsx)(d,{...e})}):d(e)}},1151:(e,t,s)=>{s.d(t,{a:()=>o});var n=s(7294);const i={},a=n.createContext(i);function o(e){const t=n.useContext(a);return n.useMemo((function(){return"function"==typeof e?e(t):{...t,...e}}),[t,e])}}}]);