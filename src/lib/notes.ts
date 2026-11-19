import { getCollection } from 'astro:content';
import type { Lang } from '../i18n';

// Los borradores solo se ven en desarrollo o con PUBLIC_SHOW_DRAFTS=true (para revisar antes de publicar).
const showDrafts = import.meta.env.DEV || import.meta.env.PUBLIC_SHOW_DRAFTS === 'true';

export async function publishedNotes(lang?: Lang) {
  const all = await getCollection('notes', (n) => (showDrafts || !n.data.draft) && (!lang || n.data.lang === lang));
  return all.sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
}

export const notePath = (lang: Lang, slug: string) => (lang === 'es' ? `/notas/${slug}/` : `/en/notes/${slug}/`);
export const notesIndex = (lang: Lang) => (lang === 'es' ? '/notas/' : '/en/notes/');
