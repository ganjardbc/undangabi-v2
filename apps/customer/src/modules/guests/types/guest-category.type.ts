export interface GuestCategory {
  id: string;
  invitationId: string;
  name: string;
  color?: string;
  createdAt: string;
  updatedAt: string;
}

export interface GuestCategoryListResponse {
  data: GuestCategory[];
}
