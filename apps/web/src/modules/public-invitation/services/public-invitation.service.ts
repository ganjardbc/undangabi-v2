const BASE_URL = (import.meta.env.VITE_API_BASE_URL as string) || 'http://localhost:3030/api/v1';

export const publicInvitationService = {
  async getInvitationBySlug(slug: string): Promise<any> {
    const response = await fetch(`${BASE_URL}/public/invitations/${slug}`);
    const result = await response.json();
    
    if (!response.ok || !result.success) {
      throw new Error(result.message || 'Failed to fetch invitation');
    }
    return result.data;
  },
};
