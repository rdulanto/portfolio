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
    image: z.string().optional(),
    thumb: z.string().optional(),
    repo: z.string().url().optional(),
    demo: z.string().url().optional(),
  }),
});

export const collections = { projects };
