---
id: backend-hiring-questions
title: backend hiring questions
tags:
  - advice
  - mentorship
  - questions
  - async
---

## backend questions

"Good backend hiring question?"

- how to scale backend? horizontal scaling, vertical scaling, caching, event driven, async job processing, queues
- how to optimize database queries? use indexes, use the explain command, simplify queries, use materialized views, cache
- what is idempotent ? a request that can be called multiple times without changing the result, a good example is a payment, if the payment is made twice, the result is the same
- how to make a function, request idempotent ? use an idempotency key, use an unique database index
- how to make a system fault-tolerant? use retries using async job processing, handle error properly, use error code.
- what to do when a webhook that you are waiting for does not arrive? create a pooling fallback
- how to document backend archicture? use diagrams, state machine, sequence diagram
- when to use a state machine? when you have a complex flow, like a payment, a subscription, a user registration
- how to ensure the data system is consistent? create auditing tools to validate this, use state machines
- how to test backend ? prefer integration tests like test input and output of API, GraphQL, jobs, database state avoid mocking databases.
- how to implement event driven ? use a message broker like kafka, rabbitmq, sqs, sns, redis, bull
- how to decouple backend ? create packages/repository per domain instead of feature, avoid circular dependencies, use event-driven
- how to automate ci/cd? use github actions, gitlab ci, circle ci, jenkins, travis, docker, docker-compose, kubernetes
- why observability is important? to understand the system, to understand the user, to understand the business, to understand the performance
- how to implement observability ? apm, prometeus, sentry, grafana, tracing, metrics and logs
- how to deploy backend? pure ec2, vps, eks, k8s, aws, gcp, azure, heroku, netlify, vercel, digital ocean
- how to do data modelling ? prefer simpler models over complex models, fewer models and fields are better, prefer to avoid too many relationship and joins
- when to use docker and docker compose ? to automate deployment and simplify dx for development
- how to do database migrations? for sql you need structural and data migrations, for nosql you need to create a new collection and migrate the data
- when to use cache ? to cache expensive operations, to cache oauth token with expirations
- how to deal with eventual consistency? avoid read followed by write, read from primary, improve write and read concern
- how to deal with distributed systems? use idempotent, use retries, use async job processing, use queues, use event-driven, use state machines
- how to deal with external APIs? decouple the external API using port adapters, have a fallback for an API
- how to deal with concurrency to update a shared resource like a ledger balance? conditional put, locks, database transactions
- when to use REST API or GraphQL ? prefer GraphQL for internal products, and REST API for public APIs.
- how to deal with security? use oauth, use jwt, use https, use cors, use csrf, use rate limit, use waf, use security
- vercel vs serverless vs k8s vs ec2 ? vercel for MVP, ec2 for simple workflows, prefer k8s for complex workflows and to be able to move from cloud providers/on-premise/bare-metal, prefer serverless for event-driven workflows
