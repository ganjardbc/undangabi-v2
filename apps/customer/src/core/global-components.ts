import PrimeVue from 'primevue/config';
import Aura from '@primevue/themes/aura';
import type { App } from 'vue';

export const setupPrimeVue = (app: App) => {
  app.use(PrimeVue, {
    theme: {
      preset: Aura,
      options: {
        prefix: 'p',
        darkModeSelector: '.p-dark',
        cssLayer: false,
      },
    },
  });
};
