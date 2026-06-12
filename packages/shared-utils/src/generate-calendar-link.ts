export type CalendarLinkInput = {
  title: string;
  startDate: Date | string;
  endDate: Date | string;
  description?: string;
  location?: string;
};

function toGoogleCalendarDate(value: Date | string): string {
  const date = typeof value === 'string' ? new Date(value) : value;

  return date.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}Z$/, 'Z');
}

export function generateCalendarLink(input: CalendarLinkInput): string {
  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text: input.title,
    dates: `${toGoogleCalendarDate(input.startDate)}/${toGoogleCalendarDate(input.endDate)}`,
  });

  if (input.description) {
    params.set('details', input.description);
  }

  if (input.location) {
    params.set('location', input.location);
  }

  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}
