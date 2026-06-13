export type InvitationStatus = 'draft' | 'published' | 'archived';

export interface Invitation {
  id: string;
  userId: string;
  title: string;
  slug: string;
  status: InvitationStatus;
  eventType: string;
  coverImageUrl?: string;
  musicUrl?: string;
  youtubeUrl?: string;
  story?: string;
  seoTitle?: string;
  seoDescription?: string;
  ogImageUrl?: string;
  publishedAt?: string;
  createdAt: string;
  updatedAt: string;
  themeId?: string;
}

export interface InvitationListResponse {
  data: Invitation[];
  meta: {
    page: number;
    limit: number;
    total: number;
    total_pages: number;
  };
}
