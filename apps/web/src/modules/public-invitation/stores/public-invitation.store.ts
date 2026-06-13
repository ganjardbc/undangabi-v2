import { defineStore } from 'pinia';
import { publicInvitationService } from '../services/public-invitation.service';

export const usePublicInvitationStore = defineStore('public-invitation', {
  state: () => ({
    invitation: null as any | null,
    loading: false,
    error: null as string | null,
  }),
  actions: {
    async fetchInvitation(slug: string) {
      this.loading = true;
      this.error = null;
      try {
        const data = await publicInvitationService.getInvitationBySlug(slug);
        this.invitation = data;
        return data;
      } catch (err: any) {
        this.error = err.message || 'Failed to fetch invitation';
        throw err;
      } finally {
        this.loading = false;
      }
    },
  },
});
