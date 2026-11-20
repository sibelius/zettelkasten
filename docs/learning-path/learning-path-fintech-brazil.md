---
id: learning-path-fintech-brazil
title: Learning Path Fintech Brazil
tags:
  - learning-path
  - fintech
  - payments
  - pix
og:
  kicker: Roadmap
  title: Fintech in Brazil
  description: How money moves in Brazil, from Pix and the SPB to cards, boletos and Núclea.
  lanes:
    - label: Pix + SPB
      color: blue
      items: [SPI + DICT, STR, MED, Pix Automático]
    - label: Cards
      color: red
      items: [Acquiring, Issuing, SLC, Receivables registry]
    - label: Rails
      color: purple
      items: [Boleto + CNAB, Núclea, Ledger, Reconciliation]
---

Fintech is a ledger, a set of payment rails and a lot of regulation.
Brazil has one of the best payment systems in the world, and one of the most regulated.

Learn it in this order: the regulator, the money, the rails, then the products you build on top of them.
Read the regulation yourself, do not trust a summary (not even this one).

## 0. Foundations

- [ ] learn double-entry accounting: every movement is a debit and a credit that sum to zero
- [ ] build a [ledger](../notes/ledger): immutable entries, balances derived from entries, never updated in place
  - [ ] read [Accounting for developers](https://www.moderntreasury.com/journal/accounting-for-developers-part-i)
- [ ] use integers in cents for money, never floats
- [ ] make every payment operation idempotent, with an idempotency key
- [ ] learn the difference between authorization, clearing and settlement
- [ ] learn [instant payments](../notes/instant-payment) and [financial risk](../notes/finantial-risk)

## 1. The regulator and the license

- [ ] learn who is who: CMN sets the rules, the [Banco Central do Brasil](https://www.bcb.gov.br/) (BCB) writes and enforces them, CVM covers securities
- [ ] learn the payments law, [Lei 12.865/2013](https://www.planalto.gov.br/ccivil_03/_ato2011-2014/2013/lei/l12865.htm): payment arrangements (arranjos) and payment institutions (IPs)
- [ ] learn the types of payment institution: emissor de moeda eletrônica, emissor de pós-pago, credenciador, iniciador de transação de pagamento (ITP)
  - [ ] learn the credit licenses: SCD and SEP
  - [ ] learn the difference between being authorized and operating under a partner (BaaS, banking as a service)
- [ ] learn anti-money laundering (PLD/FT): KYC, KYB, monitoring and reporting to COAF
- [ ] learn LGPD for financial data, and bank secrecy (sigilo bancário)

## 2. SPB, the Brazilian payment system

- [ ] read the BCB overview of the [SPB, Sistema de Pagamentos Brasileiro](https://www.bcb.gov.br/estabilidadefinanceira/spb)
- [ ] learn the reserve account (conta reserva) and the settlement account, where banks hold central bank money
- [ ] learn the STR (Sistema de Transferência de Reservas), the real-time gross settlement system run by the BCB
- [ ] learn the RSFN, the private network every institution uses to talk to the BCB, with ICP-Brasil certificates
- [ ] learn TED, and why it lost to Pix
- [ ] learn the clearing houses (câmaras): B3 for securities and FX, Núclea for retail payments

## 3. Pix

- [ ] read the [Pix page of the BCB](https://www.bcb.gov.br/estabilidadefinanceira/pix) and the Pix regulation (Resolução BCB nº 1)
- [ ] learn the pieces: SPI settles, DICT stores keys, the PI account (conta PI) holds the money
- [ ] learn direct vs indirect participation, and what a PSP needs to join
- [ ] learn the BR Code: static and dynamic QR codes, built on the EMV QR spec
- [ ] read the [API Pix](https://github.com/bacen/pix-api) spec: cob, cobv, webhooks, devolução
- [ ] learn MED (Mecanismo Especial de Devolução) for fraud refunds, and the changes in MED 2.0
- [ ] learn the new products: Pix Automático (recurring), Pix por aproximação (NFC), Pix Saque and Pix Troco
- [ ] learn the security rules: night limits, transaction limits, fraud markers in DICT
- [ ] integrate a real Pix API, for example [Woovi](https://developers.woovi.com/)
  - [ ] read [the instant payment stack](../notes/the-instant-payment-stack) and [closed loop payment systems](../notes/closed-loop-payment-systems)

## 4. Boleto

- [ ] learn the boleto lifecycle: register, pay, settle, write off (baixa)
- [ ] learn the barcode and the linha digitável, and how to validate them
- [ ] learn the NPC (Nova Plataforma de Cobrança) run by Núclea: every boleto is registered before it can be paid
- [ ] learn DDA, the boletos that show up in the payer's bank app
- [ ] learn the [Febraban](https://portal.febraban.org.br/) CNAB 240 and CNAB 400 files: remessa and retorno
- [ ] learn the hybrid boleto with a Pix QR code (bolepix), so it can be paid instantly

## 5. Cards: acquiring (adquirência)

- [ ] learn the four-party model: cardholder, issuer, card brand (bandeira), acquirer, and merchant
- [ ] learn the roles: credenciadora (acquirer), subcredenciadora (sub-acquirer or payment facilitator), and gateway
- [ ] learn the money split: MDR for the merchant, interchange for the issuer, brand fee for the bandeira
  - [ ] learn the BCB caps on debit and prepaid interchange
- [ ] learn the card flow: authorization, capture, clearing, settlement, and the settlement schedule (D+1, D+30, installments)
- [ ] learn parcelado lojista vs parcelado emissor, the Brazilian installment
- [ ] learn antecipação de recebíveis: paying the merchant now for money that arrives later
- [ ] learn chargebacks, disputes and how to fight them with evidence
- [ ] learn card present: EMV chip, PIN, contactless, TEF, POS and SoftPOS
- [ ] learn card not present: tokenization, 3DS 2, network tokens, antifraud
- [ ] learn [PCI DSS](https://www.pcisecuritystandards.org/), and how to stay out of scope by never touching the card number

## 6. Cards: issuing (emissão de cartão)

- [ ] learn the issuer side: BIN, BIN sponsor, and the card brand membership
- [ ] learn the processadora: who authorizes in real time on behalf of the issuer, for example [Dock](https://dock.tech/) or [Pismo](https://www.pismo.io/)
- [ ] learn ISO 8583, the message format of card authorizations
- [ ] learn debit, prepaid and credit: where the money comes from at authorization time
  - [ ] learn credit: limit, invoice (fatura), revolving credit (rotativo), minimum payment
- [ ] learn the card lifecycle: emboss, ship, activate, block, reissue, virtual cards
- [ ] learn wallets and tokens: Apple Pay, Google Pay, Samsung Pay

## 7. Núclea, SLC and receivables

- [ ] learn [Núclea](https://www.nuclea.com.br/), formerly CIP, the infrastructure behind boletos, card settlement and receivables
- [ ] learn the SLC, the centralized settlement of card transactions between acquirers and issuers
- [ ] learn the receivables registry: every future card payment is registered as an asset
  - [ ] learn the registradoras: Núclea, [CERC](https://www.cerc.inf.br/), B3 and TAG
  - [ ] learn how receivables are used as collateral (gravame), and why this made credit to merchants cheaper
- [ ] learn the self-regulation of the card market by [ABECS](https://www.abecs.org.br/)

## 8. Open Finance and what is next

- [ ] learn [Open Finance Brasil](https://openfinancebrasil.org.br/): data sharing, consent and payment initiation (ITP)
- [ ] learn Pix via Open Finance, and Pix sem redirecionamento (JSR)
- [ ] follow Drex, the BCB digital currency project
- [ ] follow the BCB [Agenda BC#](https://www.bcb.gov.br/acessoinformacao/bcmais) to see what comes next

## 9. Operating a fintech

Most of the work is not the happy path.

- [ ] reconcile every day: your ledger, the bank statement, the settlement files, and explain every cent of difference
- [ ] handle refunds, reversals, duplicated payments and webhooks that arrive twice or never
- [ ] run fraud and risk: limits, velocity checks, device data, blocklists
- [ ] answer the regulator: reports, audits and incident communication
- [ ] keep the [legacy overhead](../notes/fintech-legacy-overhead) small: KYC, statements, withdrawals, sanity checks
- [ ] design for 24/7: Pix does not stop at night, on weekends or on Christmas

## 10. Capstone

- [ ] a mini payment institution: a double-entry ledger, Pix charges with webhooks, a boleto with a Pix QR code, and a daily reconciliation job
- [ ] write what you learned, and share it

## How the pieces connect

```
                     ┌──────── BCB: rules, STR, SPI, DICT ────────┐
                     ▼                                             ▼
 payer bank ── Pix ──► SPI ──► receiver PSP ──► your ledger ◄── reconciliation
                                                    ▲
 boleto ── NPC (Núclea) ──► payer bank ── settlement┤
                                                    │
 card ── acquirer ──► brand ──► issuer              │
            │                                       │
            └── SLC (Núclea) ── receivables registry┘
```
