export type InvitationStatus = 'draft' | 'published' | 'archived';

export type Invitation = {
  id: string;
  userId: string;
  title: string;
  slug: string;
  status: InvitationStatus;
  createdAt: string;
  updatedAt: string;
};
