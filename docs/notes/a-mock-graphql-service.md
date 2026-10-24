---
id: a-mock-graphql-service
title: A mock GraphQL service
tags:
  - graphql
  - opensource
---

#idea #opensource #graphql

The idea is a simple Koa server that receives the schema.graphql in a body

applies the mocks to it, and return a given query

app.use(getSchemaFromBody())

app.use(graphql())

here is the demo

- https://github.com/sibelius/graphql-mock

it takes a schema and a mock resolvers definitions, and generate a GraphQL operation result based on this

## Links

[Open Source](./open-source)
