export interface GuestbookEntry {
  id: string;
  senderName: string;
  message: string;
  isApproved?: boolean;
  createdAt: string;
}

export interface GuestbookListResponse {
  data: GuestbookEntry[];
  meta: {
    page: number;
    limit: number;
    total: number;
    total_pages: number;
  };
}
