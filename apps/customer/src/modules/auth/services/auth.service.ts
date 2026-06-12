const BASE_URL = (import.meta.env.VITE_API_BASE_URL as string) || 'http://localhost:3030/api/v1';

export const authService = {
  async login(payload: any): Promise<any> {
    const response = await fetch(`${BASE_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    const result = await response.json();
    if (!response.ok || !result.success) {
      throw new Error(result.message || 'Login failed');
    }
    return result.data;
  },

  async register(payload: any): Promise<any> {
    const response = await fetch(`${BASE_URL}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    const result = await response.json();
    if (!response.ok || !result.success) {
      throw new Error(result.message || 'Registration failed');
    }
    return result.data;
  },

  async getProfile(token: string): Promise<any> {
    const response = await fetch(`${BASE_URL}/auth/me`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    const result = await response.json();
    if (!response.ok || !result.success) {
      throw new Error(result.message || 'Failed to fetch profile');
    }
    return result.data;
  },
};
