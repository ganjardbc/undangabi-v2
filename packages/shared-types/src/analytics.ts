export type AnalyticsEventType =
  | 'invitation_viewed'
  | 'rsvp_submitted'
  | 'guest_checked_in'
  | 'calendar_added'
  | 'gift_clicked';

export type Analytics = {
  id: string;
  invitationId: string;
  eventType: AnalyticsEventType;
  metadata: Record<string, unknown> | null;
  createdAt: string;
};
