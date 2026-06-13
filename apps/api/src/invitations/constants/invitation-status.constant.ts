export const INVITATION_STATUS = {
  DRAFT: 'draft',
  PUBLISHED: 'published',
  ARCHIVED: 'archived',
} as const;

export type InvitationStatusType = typeof INVITATION_STATUS[keyof typeof INVITATION_STATUS];
