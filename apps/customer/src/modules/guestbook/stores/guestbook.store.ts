import { defineStore } from 'pinia';
import { guestbookService } from '../services/guestbook.service';
import type { GuestbookEntry } from '../types/guestbook.type';
import { useAuthStore } from '../../auth/stores/auth.store';

export const useGuestbookStore = defineStore('guestbook', {
  state: () => ({
    entries: [] as GuestbookEntry[],
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
    async fetchEntries(
      invitationId: string,
      query: { page?: number; limit?: number } = {},
    ) {
      const authStore = useAuthStore();
      if (!authStore.token) return;

      this.loading = true;
      this.error = null;
      try {
        const response = await guestbookService.getGuestbookEntries(authStore.token, invitationId, query);
        this.entries = response.data;
        this.meta = response.meta;
      } catch (err: any) {
        this.error = err.message || 'Failed to fetch guestbook entries';
        throw err;
      } finally {
        this.loading = false;
      }
    },

    async deleteEntry(invitationId: string, entryId: string) {
      const authStore = useAuthStore();
      if (!authStore.token) return;

      this.error = null;
      try {
        await guestbookService.deleteGuestbookEntry(authStore.token, invitationId, entryId);
        this.entries = this.entries.filter(e => e.id !== entryId);
        this.meta.total--;
      } catch (err: any) {
        this.error = err.message || 'Failed to delete guestbook entry';
        throw err;
      }
    },

    async approveEntry(invitationId: string, entryId: string) {
      const authStore = useAuthStore();
      if (!authStore.token) return;

      this.error = null;
      try {
        await guestbookService.approveGuestbookEntry(authStore.token, invitationId, entryId);
        const entry = this.entries.find(e => e.id === entryId);
        if (entry) {
          entry.isApproved = true;
        }
      } catch (err: any) {
        this.error = err.message || 'Failed to approve guestbook entry';
        throw err;
      }
    },
  },
});
