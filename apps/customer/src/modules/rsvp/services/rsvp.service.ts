import type { RsvpListResponse, RsvpSummary } from '../types/rsvp.type';

const BASE_URL = (import.meta.env.VITE_API_BASE_URL as string) || 'http://localhost:3030/api/v1';

export const rsvpService = {
  async getRsvps(
    token: string,
    invitationId: string,
    query: { page?: number; limit?: number; attendance_status?: string } = {},
  ): Promise<RsvpListResponse> {
    const params = new URLSearchParams();
    if (query.page) params.append('page', query.page.toString());
    if (query.limit) params.append('limit', query.limit.toString());
    if (query.attendance_status) params.append('attendance_status', query.attendance_status);

    const response = await fetch(`${BASE_URL}/invitations/${invitationId}/rsvps?${params.toString()}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const result = await response.json();
    if (!response.ok || !result.success) {
      throw new Error(result.message || 'Failed to fetch RSVPs');
    }
    return result;
  },

  async getRsvpSummary(token: string, invitationId: string): Promise<RsvpSummary> {
    const response = await fetch(`${BASE_URL}/invitations/${invitationId}/rsvps/summary`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const result = await response.json();
    if (!response.ok || !result.success) {
      throw new Error(result.message || 'Failed to fetch RSVP summary');
    }
    return result.data;
  },
};
