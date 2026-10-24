---
id: page-based-pagination-with-connections
title: Page based pagination with Connections
tags:
  - relay
  - graphql
---

There are no public examples of doing paged based pagination with Connection in [Relay](./relay) .

Page based is a very common pattern in business apps, so it should be easy in Relay.

Artsy made some prior work

- https://artsy.github.io/blog/2020/01/21/graphql-relay-windowed-pagination/

but it feels not good to me

- https://andrewingram.net/posts/demystifying-graphql-connections/

We can augment connection arguments to also include limit and offset to enable page based pagination.

We also need to modify Connection Handler (https://github.com/facebook/relay/blob/master/packages/relay-runtime/handlers/RelayDefaultHandlerProvider.js#L25), to make sure the edges are properly added to the right connection

- https://github.com/sibelius/relay-workshop/blob/master/solutions/07-useRefetchableFragment/src/comment/PostComments.tsx#L65
