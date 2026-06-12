<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '../stores/auth.store';

const router = useRouter();
const authStore = useAuthStore();

const email = ref('');
const password = ref('');
const localError = ref<string | null>(null);

const handleLogin = async () => {
  localError.value = null;
  
  if (!email.value || !password.value) {
    localError.value = 'Email and password are required';
    return;
  }

  try {
    await authStore.login({
      email: email.value,
      password: password.value,
    });
    router.push('/dashboard');
  } catch (err: any) {
    localError.value = err.message || 'Login failed';
  }
};
</script>

<template>
  <div class="auth-page">
    <div class="auth-card">
      <div class="auth-header">
        <div class="logo">UndangAbi</div>
        <h1>Welcome Back</h1>
        <p class="subtitle">Log in to manage your digital invitations</p>
      </div>

      <form @submit.prevent="handleLogin" class="auth-form" novalidate>
        <div v-if="localError || authStore.error" class="error-alert">
          {{ localError || authStore.error }}
        </div>

        <div class="form-group">
          <label for="email">Email Address</label>
          <input
            id="email"
            v-model="email"
            type="email"
            required
            autocomplete="email"
            placeholder="name@example.com"
            :disabled="authStore.loading"
          />
        </div>

        <div class="form-group">
          <label for="password">Password</label>
          <input
            id="password"
            v-model="password"
            type="password"
            required
            autocomplete="current-password"
            placeholder="••••••••"
            :disabled="authStore.loading"
          />
        </div>

        <button type="submit" class="btn-primary" :disabled="authStore.loading">
          <span v-if="authStore.loading" class="spinner"></span>
          <span>{{ authStore.loading ? 'Logging in...' : 'Log In' }}</span>
        </button>
      </form>

      <div class="auth-footer">
        <p>Don't have an account? <RouterLink to="/register">Create one</RouterLink></p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.auth-page {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background-color: #f8f9fc;
  padding: 24px;
}

.auth-card {
  width: 100%;
  max-width: 440px;
  background-color: #ffffff;
  border: 1px solid #e5e7eb;
  border-radius: 14px; /* Large border radius */
  padding: 40px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03);
}

.auth-header {
  text-align: center;
  margin-bottom: 32px;
}

.logo {
  display: inline-block;
  color: #3051b8;
  font-size: 24px;
  font-weight: 800;
  letter-spacing: -0.5px;
  margin-bottom: 16px;
}

.auth-header h1 {
  color: #111827;
  font-size: 24px;
  font-weight: 700;
  margin: 0 0 8px 0;
}

.subtitle {
  color: #6b7280;
  font-size: 14px;
  margin: 0;
}

.auth-form {
  display: grid;
  gap: 20px;
}

.error-alert {
  background-color: #fef2f2;
  border: 1px solid #fca5a5;
  border-radius: 8px;
  color: #b91c1c;
  font-size: 14px;
  padding: 12px 16px;
  text-align: left;
}

.form-group {
  display: grid;
  gap: 8px;
}

.form-group label {
  color: #374151;
  font-size: 14px;
  font-weight: 600;
}

.form-group input {
  width: 100%;
  padding: 12px 16px;
  font-size: 15px;
  background-color: #ffffff;
  border: 1px solid #d1d5db;
  border-radius: 10px; /* MD border radius */
  color: #111827;
  outline: none;
  transition: border-color 0.2s, box-shadow 0.2s;
}

.form-group input:focus {
  border-color: #3051b8;
  box-shadow: 0 0 0 3px rgba(48, 81, 184, 0.1);
}

.form-group input:disabled {
  background-color: #f3f4f6;
  cursor: not-allowed;
}

.btn-primary {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  width: 100%;
  padding: 12px 24px;
  font-size: 15px;
  font-weight: 600;
  color: #ffffff;
  background-color: #3051b8;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  transition: background-color 0.2s, opacity 0.2s;
}

.btn-primary:hover:not(:disabled) {
  background-color: #254099;
}

.btn-primary:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.spinner {
  width: 18px;
  height: 18px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  border-top-color: #ffffff;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.auth-footer {
  margin-top: 32px;
  text-align: center;
  font-size: 14px;
  color: #6b7280;
}

.auth-footer a {
  color: #3051b8;
  font-weight: 600;
  text-decoration: none;
}

.auth-footer a:hover {
  text-decoration: underline;
}

@media (max-width: 480px) {
  .auth-card {
    padding: 32px 24px;
  }
}
</style>
