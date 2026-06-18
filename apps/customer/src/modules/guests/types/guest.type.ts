export type GuestStatus = 'not_sent' | 'sent' | 'opened' | 'rsvp_submitted' | 'checked_in';

export interface Guest {
  id: string;
  invitationId: string;
  categoryId?: string;
  name: string;
  phone?: string;
  email?: string;
  invitationToken: string;
  qrCodeToken: string;
  status: GuestStatus;
  maxGuestCount: number;
  openedAt?: string;
  sentAt?: string;
  createdAt: string;
  updatedAt: string;
  category?: {
    id: string;
    name: string;
    color?: string;
  } | null;
}

export interface GuestListResponse {
  data: Guest[];
  meta: {
    page: number;
    limit: number;
    total: number;
    total_pages: number;
  };
}
