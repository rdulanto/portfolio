---
title: "Data governance for generative AI: what changes from classic governance"
summary: "Classic data governance looks after tables and reports. Generative AI reads documents, answers in natural language and is confidently wrong. Five concrete changes."
date: 2026-11-23
lang: en
slug: data-governance-for-generative-ai
ref: gobierno-ia-generativa
tags: [Data governance, Generative AI, LLM]
category: investigacion
---

The data governance we know was built so that reports add up: an owner for every data element, quality rules on columns, a glossary and table-level access controls. All of that is still needed. But a generative AI assistant does not query a table: it reads contracts, manuals and emails, and answers with sentences that sound right even when they are not.

That change in input and output forces governance to extend on five fronts.

## 1. The asset is no longer the table, it is the document

In a RAG project (document search plus a language model), quality depends on the current version of the manual, not on a column. The governance questions change:

- Which is the official version of this document, and who approves it?
- When does it expire, and who removes it from the index?
- Which documents must never be indexed?

In my [assistant on Peru’s data protection law](/en/projects/data-protection-assistant/) the biggest quality gain did not come from the model but from splitting articles correctly and keeping the official text up to date.

## 2. Quality is measured in answers, not rows

A classic rule says "the date field cannot be empty". With generative AI the question is whether the answer is correct, backed by a source and free of invention. That is measured with a set of test questions and expected answers, run before every change of model, index or instructions.

That evaluation set is one more data asset: it needs an owner, a version and periodic review.

## 3. Access is enforced at answer time

If the assistant indexes HR and Risk documents, a user could receive in an answer a passage they could never open directly. Access control must be applied at retrieval, filtering by the permissions of whoever is asking, not only in the source repository.

## 4. Personal data travels in the prompts

What users type in the chat is data too. It may include names, ID numbers or customer details that end up at an external provider. Governance must define what may be typed, what is masked before reaching the model and how long conversations are kept. In Peru, data protection Law 29733 applies as it does to any other processing.

## 5. Lineage includes the model

In classic analytics, lineage runs from source to report. With generative AI you also record which model, which version of the instructions and which documents produced each answer. Without that record you cannot explain a wrong answer, which is exactly what [Peru’s AI regulation](/en/blog/peru-ai-law-31814-what-companies-must-do/) asks for high-risk systems: an up-to-date record of how the system works and what data feeds it.

## What does not change

The roles stay the same: data owners, stewards and users. What changes is the asset inventory (now including documents, indexes, evaluation sets and instructions) and how quality is measured. A company that already has data governance does not start from zero. One that does not will discover, in its first generative AI pilot, that this is where it needed to start.

## To get started

If you are launching an assistant over internal documents, settle three things before choosing the model: which documents go in and who approves them, which test questions will measure quality, and who can see what. With that in place, the pilot has a base to grow on.
