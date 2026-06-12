export type RsvpStatus = 'attending' | 'not_attending';

export type RSVP = {
  id: string;
  invitationId: string;
  guestId: string | null;
  name: string;
  status: RsvpStatus;
  guestCount: number;
  message: string | null;
  createdAt: string;
};
