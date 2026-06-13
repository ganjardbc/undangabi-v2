import { defineStore } from 'pinia';
import { invitationService } from '../services/invitation.service';
import type { Invitation } from '../types/invitation.type';
import { useAuthStore } from '../../auth/stores/auth.store';

export const useInvitationStore = defineStore('invitation', {
  state: () => ({
    invitations: [] as Invitation[],
    currentInvitation: null as Invitation | null,
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
    async fetchInvitations(query: { page?: number; limit?: number; status?: string; search?: string } = {}) {
      const authStore = useAuthStore();
      if (!authStore.token) return;

      this.loading = true;
      this.error = null;
      try {
        const response = await invitationService.getInvitations(authStore.token, query);
        this.invitations = response.data;
        this.meta = response.meta;
      } catch (err: any) {
        this.error = err.message || 'Failed to fetch invitations';
        throw err;
      } finally {
        this.loading = false;
      }
    },

    async fetchInvitation(id: string) {
      const authStore = useAuthStore();
      if (!authStore.token) return;

      this.loading = true;
      this.error = null;
      try {
        const data = await invitationService.getInvitation(authStore.token, id);
        this.currentInvitation = data;
        return data;
      } catch (err: any) {
        this.error = err.message || 'Failed to fetch invitation';
        throw err;
      } finally {
        this.loading = false;
      }
    },

    async createInvitation(payload: { title: string; slug?: string; event_type?: string; theme_id?: string }) {
      const authStore = useAuthStore();
      if (!authStore.token) throw new Error('Not authenticated');

      this.loading = true;
      this.error = null;
      try {
        return await invitationService.createInvitation(authStore.token, payload);
      } catch (err: any) {
        this.error = err.message || 'Failed to create invitation';
        throw err;
      } finally {
        this.loading = false;
      }
    },

    async updateInvitation(id: string, payload: any) {
      const authStore = useAuthStore();
      if (!authStore.token) throw new Error('Not authenticated');

      this.loading = true;
      this.error = null;
      try {
        const data = await invitationService.updateInvitation(authStore.token, id, payload);
        if (this.currentInvitation && this.currentInvitation.id === id) {
          this.currentInvitation = { ...this.currentInvitation, ...data };
        }
        return data;
      } catch (err: any) {
        this.error = err.message || 'Failed to update invitation';
        throw err;
      } finally {
        this.loading = false;
      }
    },
  },
});
