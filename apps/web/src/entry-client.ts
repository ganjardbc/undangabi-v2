import { createWebApp } from './main';

const { app, router } = createWebApp();

void router.isReady().then(() => {
  app.mount('#app');
});
