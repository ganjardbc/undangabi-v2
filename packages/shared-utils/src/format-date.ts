export function formatDate(value: Date | string, locale = 'id-ID'): string {
  const date = typeof value === 'string' ? new Date(value) : value;

  return new Intl.DateTimeFormat(locale, {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  }).format(date);
}
