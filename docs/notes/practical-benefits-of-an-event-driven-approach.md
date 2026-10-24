---
id: practical-benefits-of-an-event-driven-approach
title: Practical Benefits of an Event Driven Approach
tags:
  - event-driven
  - architecture
  - writing
---

feedback

Reviewer 1

we can't easily just reprocess `newPayment` without reprocessing the whole `transactionSync`

example of this

if `newPayment` had a bug it won't affect `transactionSync`

you can save events to reprocess then

example of monitoring, apm

---

Reviewer 2

Very good article with interesting content.
Woovi's approach is very like the approach that we are using at another company for payments notifications.

1\. “Three successive sentences begin with the same word”:

> To code newPayment you need to understand how transactionSync works, more cognitive load
> To test newPayment, you need to test transactionSync together, as a consequence you have a more complex test with more complex fixtures and test scenarios.
> To refactor newPayment, you could break transactionSync, these codes are highly coupled.

2\. “This sentence does not start with an uppercase letter”:
To the following phrases:

> we can't easily just reprocess newPayment without reprocessing the whole transactionSync

> we can easily reprocess newPayment without reprocessing the whole transactionSync

---

Reviewer 3

um pequeno typo no texto:

To code newPayment you DON’T need to understand how transactionSync works, fewer cognitive load

---

Reviewer 4

"This article aims to give a real world example and it this clear." -> "This article aims to give a real and clear example."

"The bank sends a new transaction webhook for Woovi backend" -> replace "webhook to Woovi's backend"

---

coproduto

To code newPayment you do need to understand how transactionSync works, fewer cognitive load

acho que era "you do NOT need to understand"

E nesse caso é "less", não "fewer"

Fewer só se usa com coisas contáveis

Tipo, você pode falar "fewer potatoes" mas não "fewer water" (porque batatas são contáveis, mas água não é)

eu consideraria "cognitive load" incontável

Fewer também só se usa em comparações

Você pode considerar que tem uma comparação implícita aí, mas ainda tem o problema da contabilidade

De resto eu curti a ideia do post

Mas eu acho que não ficou muito claro como que isso funcionaria sem usar microsserviços

Eu imagino que você esteja usando um job queue ou algo do tipo?

Talvez fosse bom explicitar como é que esses eventos vão ser processados sem usar serviços

pq do jeito que está parece que você só está jogando um evento pro vácuo e de alguma forma o processamento acontece

Outra coisa também é que não ficou muito claro por que é que as coisas seriam desacopladas

Afinal, você pode escrever a função newPayment de forma desacoplada sem usar eventos também, só tem um ponto de acoplamento necessário entre os dois que é o payload que essa função vai receber

E esse continua, n

né \*

os dois lados têm que concordar com o formato do evento

Então talvez fosse bom explicitar de que tipo de acoplamento você tá falando
