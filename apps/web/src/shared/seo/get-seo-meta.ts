import type { RouteLocationNormalizedLoaded } from 'vue-router';

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

export function getSeoMeta(route: RouteLocationNormalizedLoaded): string {
  const title = String(route.meta.title ?? 'UndangAbi');
  const description = String(
    route.meta.description ?? 'Open a personalized digital invitation powered by UndangAbi.',
  );

  return [
    `<title>${escapeHtml(title)} | UndangAbi</title>`,
    `<meta name="description" content="${escapeHtml(description)}">`,
    `<meta property="og:title" content="${escapeHtml(title)}">`,
    `<meta property="og:description" content="${escapeHtml(description)}">`,
    '<meta property="og:type" content="website">',
  ].join('\n');
}
