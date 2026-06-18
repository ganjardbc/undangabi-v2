import type { GuestListResponse } from '../types/guest.type';

const BASE_URL = (import.meta.env.VITE_API_BASE_URL as string) || 'http://localhost:3030/api/v1';

export const guestService = {
  async getGuests(
    token: string,
    invitationId: string,
    query: { page?: number; limit?: number; search?: string; status?: string; category_id?: string } = {},
  ): Promise<GuestListResponse> {
    const params = new URLSearchParams();
    if (query.page) params.append('page', query.page.toString());
    if (query.limit) params.append('limit', query.limit.toString());
    if (query.search) params.append('search', query.search);
    if (query.status) params.append('status', query.status);
    if (query.category_id) params.append('category_id', query.category_id);

    const response = await fetch(`${BASE_URL}/invitations/${invitationId}/guests?${params.toString()}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    const result = await response.json();
    if (!response.ok || !result.success) {
      throw new Error(result.message || 'Failed to fetch guests');
    }
    return result;
  },

  async getGuest(token: string, invitationId: string, guestId: string): Promise<any> {
    const response = await fetch(`${BASE_URL}/invitations/${invitationId}/guests/${guestId}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    const result = await response.json();
    if (!response.ok || !result.success) {
      throw new Error(result.message || 'Failed to fetch guest');
    }
    return result.data;
  },

  async getGuestLink(token: string, invitationId: string, guestId: string): Promise<{ url: string }> {
    const response = await fetch(`${BASE_URL}/invitations/${invitationId}/guests/${guestId}/link`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    const result = await response.json();
    if (!response.ok || !result.success) {
      throw new Error(result.message || 'Failed to fetch guest link');
    }
    return result.data;
  },

  async getGuestQr(token: string, invitationId: string, guestId: string): Promise<{ qr_code_token: string; qr_code_url: string }> {
    const response = await fetch(`${BASE_URL}/invitations/${invitationId}/guests/${guestId}/qr`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    const result = await response.json();
    if (!response.ok || !result.success) {
      throw new Error(result.message || 'Failed to fetch guest QR');
    }
    return result.data;
  },

  async importCsv(token: string, invitationId: string, file: File): Promise<any> {
    const formData = new FormData();
    formData.append('file', file);

    const response = await fetch(`${BASE_URL}/invitations/${invitationId}/guests/import`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      body: formData,
    });

    const result = await response.json();
    if (!response.ok || !result.success) {
      throw new Error(result.message || 'Failed to import guests');
    }
    return result.data;
  },
};
