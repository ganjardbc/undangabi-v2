export type GuestStatus = 'invited' | 'confirmed' | 'declined' | 'checked_in';

export type Guest = {
  id: string;
  invitationId: string;
  name: string;
  phoneNumber: string | null;
  email: string | null;
  status: GuestStatus;
  createdAt: string;
  updatedAt: string;
};
