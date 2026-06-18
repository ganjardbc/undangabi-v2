import type { GuestCategoryListResponse } from '../types/guest-category.type';

const BASE_URL = (import.meta.env.VITE_API_BASE_URL as string) || 'http://localhost:3030/api/v1';

export const guestCategoryService = {
  async getCategories(token: string, invitationId: string): Promise<GuestCategoryListResponse> {
    const response = await fetch(`${BASE_URL}/invitations/${invitationId}/guest-categories`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    const result = await response.json();
    if (!response.ok || !result.success) {
      throw new Error(result.message || 'Failed to fetch categories');
    }
    return result;
  },

  async createCategory(token: string, invitationId: string, payload: { name: string; color?: string }): Promise<any> {
    const response = await fetch(`${BASE_URL}/invitations/${invitationId}/guest-categories`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    const result = await response.json();
    if (!response.ok || !result.success) {
      throw new Error(result.message || 'Failed to create category');
    }
    return result.data;
  },

  async deleteCategory(token: string, invitationId: string, categoryId: string): Promise<void> {
    const response = await fetch(`${BASE_URL}/invitations/${invitationId}/guest-categories/${categoryId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    const result = await response.json();
    if (!response.ok || !result.success) {
      throw new Error(result.message || 'Failed to delete category');
    }
  },
};
