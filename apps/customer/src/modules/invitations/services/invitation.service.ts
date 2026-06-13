import type { InvitationListResponse } from '../types/invitation.type';

const BASE_URL = (import.meta.env.VITE_API_BASE_URL as string) || 'http://localhost:3030/api/v1';

export const invitationService = {
  async getInvitations(token: string, query: { page?: number; limit?: number; status?: string; search?: string } = {}): Promise<InvitationListResponse> {
    const params = new URLSearchParams();
    if (query.page) params.append('page', query.page.toString());
    if (query.limit) params.append('limit', query.limit.toString());
    if (query.status) params.append('status', query.status);
    if (query.search) params.append('search', query.search);

    const response = await fetch(`${BASE_URL}/invitations?${params.toString()}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    const result = await response.json();
    if (!response.ok || !result.success) {
      throw new Error(result.message || 'Failed to fetch invitations');
    }
    return result;
  },

  async createInvitation(token: string, payload: { title: string; slug?: string; event_type?: string; theme_id?: string }): Promise<any> {
    const response = await fetch(`${BASE_URL}/invitations`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    const result = await response.json();
    if (!response.ok || !result.success) {
      throw new Error(result.message || 'Failed to create invitation');
    }
    return result.data;
  },

  async getInvitation(token: string, id: string): Promise<any> {
    const response = await fetch(`${BASE_URL}/invitations/${id}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    const result = await response.json();
    if (!response.ok || !result.success) {
      throw new Error(result.message || 'Failed to fetch invitation');
    }
    return result.data;
  },

  async updateInvitation(token: string, id: string, payload: any): Promise<any> {
    const response = await fetch(`${BASE_URL}/invitations/${id}`, {
      method: 'PATCH',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    const result = await response.json();
    if (!response.ok || !result.success) {
      throw new Error(result.message || 'Failed to update invitation');
    }
    return result.data;
  },
};
