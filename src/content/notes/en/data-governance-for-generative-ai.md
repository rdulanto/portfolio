---
title: "Data governance for generative AI: what changes from classic governance"
summary: "For years I looked after tables, pipelines and reports. When I built my first assistant over documents, I realized data governance had to stretch. These are the five changes I see."
date: 2026-11-23
lang: en
slug: data-governance-for-generative-ai
ref: gobierno-ia-generativa
tags: [Data governance, Generative AI, LLM]
category: investigacion
---

For years my job was to make data arrive on time and add up. At the microfinance bank we moved more than 30 GB and over 100 tables every day, and data governance revolved around that: an owner per data element, quality rules on columns, a glossary and table-level permissions.

All of that still matters. But when I built my [assistant on Peru’s data protection law](/en/projects/data-protection-assistant/), I realized a generative AI assistant does not query tables. It reads documents, contracts and manuals, and answers with sentences that sound right even when they are wrong. That forces data governance to stretch on several fronts. Here are the five I see most clearly.

## The asset is now the document

In an assistant that searches documents (what is known as RAG), quality depends on having the current version of the manual loaded, not on a clean column. The questions change: which version is official and who approves it? When does it expire and who takes it out of the index? Which documents should never go in?

In my assistant, the biggest improvement did not come from the model. It came from splitting the law’s articles properly, removing page headers that leaked in from the PDF and reporting what could not be recovered instead of hiding it. Classic data quality work, applied to text.

## Quality is measured in answers

A classic rule says "the date cannot be empty". Here the question is different: is the answer correct, is it backed by a source and does it avoid making things up?

The only way I found to know is to keep a set of test questions with their expected answers and run it before every change. I wrote 45 questions and held back 15 that I never used to tune the system. That set is one more data asset: it needs an owner, a version and reviews.

## Access is controlled at answer time

If the assistant indexes HR and Risk documents, someone could get a paragraph in an answer from a document they could never open. Permissions have to apply at search time, based on who is asking, not only in the source folder.

## What users type is data too

In a chat, people type names, ID numbers or customer details without thinking, and that can end up at an external provider. You need to define what can be typed, what gets masked before it reaches the model and how long conversations are kept. Peru’s data protection law applies just as it does to any other processing of personal data.

## Lineage includes the model

In analytics, lineage goes from source to report. With generative AI you also have to keep which model, which instructions and which documents produced each answer. Without that there is no way to explain a mistake. And that is exactly what the [Law 31814 regulation](/en/blog/peru-ai-law-31814-what-companies-must-do/) asks for high-risk systems: an up-to-date record of how the system works and what data it uses.

## What does not change

The roles are the same: owners, stewards and users. What grows is the inventory, which now includes documents, indexes, test questions and instructions. A company that already has data governance does not start from zero. One that does not will find out in its first pilot.

My advice, before choosing the model: decide which documents go in and who approves them, which questions you will use to measure quality and who can see what. With that settled, the pilot has something to stand on.
