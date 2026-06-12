import { createPinia } from 'pinia';
import { createSSRApp } from 'vue';

import App from '../App.vue';
import { createWebRouter } from './global-routes';

export function createWebApp() {
  const app = createSSRApp(App);
  const router = createWebRouter();

  app.use(createPinia());
  app.use(router);

  return { app, router };
}
