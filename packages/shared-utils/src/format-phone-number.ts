export function formatPhoneNumber(value: string): string {
  const normalized = value.replace(/[^\d+]/g, '');

  if (normalized.startsWith('+')) {
    return normalized;
  }

  if (normalized.startsWith('0')) {
    return `+62${normalized.slice(1)}`;
  }

  if (normalized.startsWith('62')) {
    return `+${normalized}`;
  }

  return normalized;
}
