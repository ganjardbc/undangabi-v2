import type { GuestbookListResponse } from '../types/guestbook.type';

const BASE_URL = (import.meta.env.VITE_API_BASE_URL as string) || 'http://localhost:3030/api/v1';

export const guestbookService = {
  async getGuestbookEntries(
    token: string,
    invitationId: string,
    query: { page?: number; limit?: number } = {},
  ): Promise<GuestbookListResponse> {
    const params = new URLSearchParams();
    if (query.page) params.append('page', query.page.toString());
    if (query.limit) params.append('limit', query.limit.toString());

    const response = await fetch(`${BASE_URL}/invitations/${invitationId}/guestbook?${params.toString()}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const result = await response.json();
    if (!response.ok || !result.success) {
      throw new Error(result.message || 'Failed to fetch guestbook entries');
    }
    return result;
  },

  async deleteGuestbookEntry(token: string, invitationId: string, entryId: string): Promise<void> {
    const response = await fetch(`${BASE_URL}/invitations/${invitationId}/guestbook/${entryId}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const result = await response.json();
    if (!response.ok || !result.success) {
      throw new Error(result.message || 'Failed to delete guestbook entry');
    }
  },

  async approveGuestbookEntry(token: string, invitationId: string, entryId: string): Promise<void> {
    const response = await fetch(`${BASE_URL}/invitations/${invitationId}/guestbook/${entryId}/approve`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const result = await response.json();
    if (!response.ok || !result.success) {
      throw new Error(result.message || 'Failed to approve guestbook entry');
    }
  },
};
