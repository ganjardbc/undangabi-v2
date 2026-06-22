export type AttendanceStatus = 'attending' | 'not_attending';

export interface RsvpGuest {
  id: string;
  name: string;
  phone?: string;
  email?: string;
}

export interface Rsvp {
  id: string;
  guestId: string;
  invitationId: string;
  attendanceStatus: AttendanceStatus;
  guestCount: number;
  message?: string;
  submittedAt: string;
  createdAt: string;
  updatedAt: string;
  guest?: RsvpGuest;
}

export interface RsvpSummary {
  total: number;
  attending: number;
  not_attending: number;
  not_responded: number;
}

export interface RsvpListResponse {
  data: Rsvp[];
  meta: {
    page: number;
    limit: number;
    total: number;
    total_pages: number;
  };
}
