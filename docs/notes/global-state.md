---
id: global-state
title: Global State
tags:
  - react
  - frontend
  - relay
---

#react #global #state

Redux

single immutable atom for the whole UI

hard to code split

hard to optimize

Selector: useSelector

Recoiljs

multiple immutable atoms for the UI

it works with sync and async data

it has support to derived data

optimized to avoid re-rendering parts that don't consume an atom

getters vs setters

Selector: useRecoilValue

Context

React context can only has one single value, so you need to use subscribe pattern to avoid re-rendering all components that consume them

Selector: useContext

Relay

Single store

Selector: GraphQL fragments

Mobx

Observables

Semi Global

Formik:

form field state should be able to be validated together

one form field change should not re-render all other fields, so it has good perf

\## Links
