import { defineStore } from 'pinia';
import { rsvpService } from '../services/rsvp.service';
import type { Rsvp, RsvpSummary } from '../types/rsvp.type';
import { useAuthStore } from '../../auth/stores/auth.store';

export const useRsvpStore = defineStore('rsvp', {
  state: () => ({
    rsvps: [] as Rsvp[],
    summary: null as RsvpSummary | null,
    meta: {
      page: 1,
      limit: 10,
      total: 0,
      total_pages: 0,
    },
    loading: false,
    summaryLoading: false,
    error: null as string | null,
  }),
  actions: {
    async fetchRsvps(
      invitationId: string,
      query: { page?: number; limit?: number; attendance_status?: string } = {},
    ) {
      const authStore = useAuthStore();
      if (!authStore.token) return;

      this.loading = true;
      this.error = null;
      try {
        const response = await rsvpService.getRsvps(authStore.token, invitationId, query);
        this.rsvps = response.data;
        this.meta = response.meta;
      } catch (err: any) {
        this.error = err.message || 'Failed to fetch RSVPs';
        throw err;
      } finally {
        this.loading = false;
      }
    },

    async fetchSummary(invitationId: string) {
      const authStore = useAuthStore();
      if (!authStore.token) return;

      this.summaryLoading = true;
      this.error = null;
      try {
        this.summary = await rsvpService.getRsvpSummary(authStore.token, invitationId);
      } catch (err: any) {
        this.error = err.message || 'Failed to fetch RSVP summary';
        throw err;
      } finally {
        this.summaryLoading = false;
      }
    },
  },
});
