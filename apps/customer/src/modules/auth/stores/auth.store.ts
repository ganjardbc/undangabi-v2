import { defineStore } from 'pinia';
import { authService } from '../services/auth.service';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: localStorage.getItem('token') || '',
    user: null as any,
    loading: false,
    error: null as string | null,
  }),
  getters: {
    isAuthenticated: (state): boolean => !!state.token,
  },
  actions: {
    async register(payload: any): Promise<any> {
      this.loading = true;
      this.error = null;
      try {
        await authService.register(payload);
        return await this.login({
          email: payload.email,
          password: payload.password,
        });
      } catch (err: any) {
        this.error = err.message || 'Registration failed';
        throw err;
      } finally {
        this.loading = false;
      }
    },

    async login(payload: any): Promise<any> {
      this.loading = true;
      this.error = null;
      try {
        const data = await authService.login(payload);
        this.token = data.accessToken;
        this.user = data.user;
        localStorage.setItem('token', this.token);
        return data;
      } catch (err: any) {
        this.error = err.message || 'Login failed';
        throw err;
      } finally {
        this.loading = false;
      }
    },
    async fetchProfile(): Promise<void> {
      if (!this.token) return;
      this.loading = true;
      try {
        this.user = await authService.getProfile(this.token);
      } catch (err: any) {
        this.logout();
        throw err;
      } finally {
        this.loading = false;
      }
    },
    logout(): void {
      this.token = '';
      this.user = null;
      localStorage.removeItem('token');
    },
  },
});
