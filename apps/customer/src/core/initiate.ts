import { createPinia } from 'pinia';
import { createApp } from 'vue';

import App from '../App.vue';
import { router } from './global-routes';
import { useAuthStore } from '../modules/auth/stores/auth.store';

const app = createApp(App);

app.use(createPinia());
app.use(router);

// Global Navigation Guard
router.beforeEach(async (to, from, next) => {
  const authStore = useAuthStore();

  // Update dynamic document title
  if (to.meta.title) {
    document.title = `${to.meta.title} - UndangAbi`;
  } else {
    document.title = 'UndangAbi';
  }

  const publicPages = ['/login', '/register', '/forgot-password'];
  const authRequired = !publicPages.includes(to.path);

  // Redirect to login if path is protected and user is not authenticated
  if (authRequired && !authStore.isAuthenticated) {
    return next('/login');
  }

  // Auto-fetch profile if authenticated but user profile state is empty
  if (authStore.isAuthenticated && !authStore.user) {
    try {
      await authStore.fetchProfile();
    } catch {
      return next('/login');
    }
  }

  // Redirect to dashboard if trying to access auth pages while logged in
  if (authStore.isAuthenticated && publicPages.includes(to.path)) {
    return next('/dashboard');
  }

  next();
});

app.mount('#app');
