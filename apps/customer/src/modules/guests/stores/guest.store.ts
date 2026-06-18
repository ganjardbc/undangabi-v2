import { defineStore } from 'pinia';
import { guestService } from '../services/guest.service';
import type { Guest } from '../types/guest.type';
import { useAuthStore } from '../../auth/stores/auth.store';

export const useGuestStore = defineStore('guest', {
  state: () => ({
    guests: [] as Guest[],
    currentGuest: null as Guest | null,
    meta: {
      page: 1,
      limit: 10,
      total: 0,
      total_pages: 0,
    },
    loading: false,
    error: null as string | null,
  }),
  actions: {
    async fetchGuests(
      invitationId: string,
      query: { page?: number; limit?: number; search?: string; status?: string; category_id?: string } = {},
    ) {
      const authStore = useAuthStore();
      if (!authStore.token) return;

      this.loading = true;
      this.error = null;
      try {
        const response = await guestService.getGuests(authStore.token, invitationId, query);
        this.guests = response.data;
        this.meta = response.meta;
      } catch (err: any) {
        this.error = err.message || 'Failed to fetch guests';
        throw err;
      } finally {
        this.loading = false;
      }
    },

    async fetchGuest(invitationId: string, guestId: string) {
      const authStore = useAuthStore();
      if (!authStore.token) return;

      this.loading = true;
      this.error = null;
      try {
        const data = await guestService.getGuest(authStore.token, invitationId, guestId);
        this.currentGuest = data;
        return data;
      } catch (err: any) {
        this.error = err.message || 'Failed to fetch guest';
        throw err;
      } finally {
        this.loading = false;
      }
    },

    async fetchGuestLink(invitationId: string, guestId: string): Promise<string | undefined> {
      const authStore = useAuthStore();
      if (!authStore.token) return;

      this.loading = true;
      this.error = null;
      try {
        const data = await guestService.getGuestLink(authStore.token, invitationId, guestId);
        return data.url;
      } catch (err: any) {
        this.error = err.message || 'Failed to fetch guest link';
        throw err;
      } finally {
        this.loading = false;
      }
    },

    async importCsv(invitationId: string, file: File) {
      const authStore = useAuthStore();
      if (!authStore.token) throw new Error('Not authenticated');

      this.loading = true;
      this.error = null;
      try {
        const result = await guestService.importCsv(authStore.token, invitationId, file);
        await this.fetchGuests(invitationId);
        return result;
      } catch (err: any) {
        this.error = err.message || 'Failed to import CSV';
        throw err;
      } finally {
        this.loading = false;
      }
    },

    async fetchGuestQr(invitationId: string, guestId: string): Promise<{ qr_code_token: string; qr_code_url: string } | undefined> {
      const authStore = useAuthStore();
      if (!authStore.token) return;

      this.loading = true;
      this.error = null;
      try {
        const data = await guestService.getGuestQr(authStore.token, invitationId, guestId);
        return data;
      } catch (err: any) {
        this.error = err.message || 'Failed to fetch guest QR';
        throw err;
      } finally {
        this.loading = false;
      }
    },
  },
});
