import { defineStore } from 'pinia';
import { guestCategoryService } from '../services/guest-category.service';
import type { GuestCategory } from '../types/guest-category.type';
import { useAuthStore } from '../../auth/stores/auth.store';

export const useGuestCategoryStore = defineStore('guestCategory', {
  state: () => ({
    categories: [] as GuestCategory[],
    loading: false,
    error: null as string | null,
  }),
  actions: {
    async fetchCategories(invitationId: string) {
      const authStore = useAuthStore();
      if (!authStore.token) return;

      this.loading = true;
      this.error = null;
      try {
        const response = await guestCategoryService.getCategories(authStore.token, invitationId);
        this.categories = response.data;
      } catch (err: any) {
        this.error = err.message || 'Failed to fetch categories';
        throw err;
      } finally {
        this.loading = false;
      }
    },

    async createCategory(invitationId: string, payload: { name: string; color?: string }) {
      const authStore = useAuthStore();
      if (!authStore.token) return;

      this.loading = true;
      this.error = null;
      try {
        await guestCategoryService.createCategory(authStore.token, invitationId, payload);
        await this.fetchCategories(invitationId);
      } catch (err: any) {
        this.error = err.message || 'Failed to create category';
        throw err;
      } finally {
        this.loading = false;
      }
    },

    async deleteCategory(invitationId: string, categoryId: string) {
      const authStore = useAuthStore();
      if (!authStore.token) return;

      this.loading = true;
      this.error = null;
      try {
        await guestCategoryService.deleteCategory(authStore.token, invitationId, categoryId);
        await this.fetchCategories(invitationId);
      } catch (err: any) {
        this.error = err.message || 'Failed to delete category';
        throw err;
      } finally {
        this.loading = false;
      }
    },
  },
});
