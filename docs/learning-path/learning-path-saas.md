---
id: learning-path-saas
title: Learning Path SaaS
tags:
  - learning-path
  - saas
  - business
og:
  kicker: Roadmap
  title: SaaS
  description: Build, sell and run software as a service, from multi-tenancy to net revenue retention.
  lanes:
    - label: Product
      color: blue
      items: [Onboarding, Pricing, Billing, Integrations]
    - label: Platform
      color: red
      items: [Multi-tenancy, SSO + RBAC, Public API, Observability]
    - label: Business
      color: purple
      items: [MRR, Churn, CAC + LTV, NRR]
---

A [SaaS](../notes/saas) sells a service delivered every month, not software in a box.
The subscription only works if you keep delivering value, or customers churn.

Learn it in this order: the business model, the platform, the money, then growth.
Every engineering decision shows up in a metric: churn, margin or sales cycle.

## 0. Foundations

- [ ] learn why [SaaS beats the software house](../notes/software-house) model: recurring revenue and long term incentives
- [ ] learn the [key SaaS metrics](../notes/driving-saas-success-using-key-metrics)
  - [ ] read David Skok's [SaaS Metrics 2.0](https://www.forentrepreneurs.com/saas-metrics-2/)
- [ ] learn the models: product-led (self-service), sales-led (enterprise), and the hybrid
- [ ] learn B2B vs B2C: who uses, who buys and who signs the contract

## 1. Multi-tenancy

- [ ] learn the options: shared tables with a tenant id, schema per tenant, database per tenant
- [ ] put the tenant id in every query, every index and every cache key
  - [ ] enforce it in one place (a repository layer or row level security), not in every handler
- [ ] test that tenant A can never see tenant B, in an automated test
- [ ] handle noisy neighbors: rate limits and quotas per tenant
- [ ] plan for the big customer who asks for a dedicated environment or data in a specific region

## 2. Identity and access

- [ ] email + password with MFA, magic links and social login
- [ ] organizations, members, invites and roles (RBAC)
- [ ] enterprise SSO with SAML and OIDC, and user provisioning with SCIM
- [ ] audit logs: who did what, when, from where
- [ ] read [Enterprise Ready](https://www.enterpriseready.io/) to see what big customers will ask for

## 3. Billing and pricing

- [ ] pick a value metric: seats, usage, or a tier of features
- [ ] design 3 plans, and a free trial or a free tier
- [ ] handle the lifecycle: trial, upgrade, downgrade, proration, cancel, dunning (failed payments)
- [ ] use a billing platform like [Stripe Billing](https://docs.stripe.com/billing) instead of building one
- [ ] in Brazil, accept card, boleto and Pix, and use Pix Automático for recurring payments. See the [fintech roadmap](./learning-path-fintech-brazil)
- [ ] issue invoices (nota fiscal de serviço), and learn the taxes on software services
- [ ] usage-based billing: meter every event, aggregate, and let the customer see their usage

## 4. Product

- [ ] onboarding: time to first value in minutes, measured
- [ ] activation: define the action that predicts retention, and push every new user to it
- [ ] in-app messages, emails and a changelog to show you keep delivering value
- [ ] integrations with the tools your customers already use
- [ ] a public API with keys, docs, rate limits and webhooks
- [ ] feature flags and plan gating: the same code, different features per plan
- [ ] data export: customers trust you more when they can leave

## 5. Run it

- [ ] observability per tenant: logs, metrics and traces tagged with the tenant id
- [ ] a status page and an incident process
- [ ] SLAs, backups and restore tests, disaster recovery
- [ ] zero downtime deploys and migrations, customers work in every time zone
- [ ] security and compliance: LGPD, SOC 2 or ISO 27001 when enterprise customers ask
- [ ] keep gross margin high: know the infra cost per customer

## 6. Sell, retain, expand

- [ ] customer support: help center, chat, and a response time you measure
- [ ] customer success: health score, check-ins, and renewal before it is due
- [ ] measure churn by cohort, talk to every customer who cancels
- [ ] expand revenue: upsell, more seats, more usage. Aim for net revenue retention above 100%
- [ ] measure CAC, LTV and payback, and the burn multiple
- [ ] build [growth loops](../notes/growth-loops): invites, shared content, integrations

## 7. Capstone

- [ ] a multi-tenant SaaS with organizations and roles, a free trial, Pix and card billing, a public API with webhooks, and a dashboard with MRR and churn
- [ ] follow the [startup roadmap](./learning-path-startup) to get your first paying customers
- [ ] write what you learned, and share it

## How the pieces connect

```
 sign up ──► onboarding ──► activation ──► trial ──► paid plan ──► expansion
                                              │           │            │
                                          dunning ◄── billing ──► MRR, NRR
                                                          │
 tenant isolation, SSO, audit logs, API ──────────────────┴──► enterprise deals
                                                          │
                                          churn ◄── support + success
```
