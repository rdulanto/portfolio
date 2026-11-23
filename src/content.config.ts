import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
  schema: z.object({
    title: z.string(),
    question: z.string(),
    summary: z.string(),
    tags: z.array(z.string()),
    date: z.coerce.date(),
    lang: z.enum(['es', 'en']),
    slug: z.string(),
    ref: z.string(), // mismo valor en la versión ES y EN de un proyecto
    image: z.string().optional(),
    thumb: z.string().optional(),
    repo: z.string().url().optional(),
    demo: z.string().url().optional(),
    kpi: z.string().optional(), // cifra principal que se destaca en la tarjeta
    kpiText: z.string().optional(),
  }),
});

const notes = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/notes' }),
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    date: z.coerce.date(),
    lang: z.enum(['es', 'en']),
    slug: z.string(),
    ref: z.string(), // mismo valor en la versión ES y EN de una nota
    tags: z.array(z.string()),
    draft: z.boolean().default(false), // los borradores no se publican
  }),
});

export const collections = { projects, notes };
