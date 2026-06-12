import { renderToString } from '@vue/server-renderer';

import { createWebApp } from './main';
import { getSeoMeta } from './shared/seo/get-seo-meta';

export async function render(url: string): Promise<{ appHtml: string; headTags: string }> {
  const { app, router } = createWebApp();

  await router.push(url);
  await router.isReady();

  return {
    appHtml: await renderToString(app),
    headTags: getSeoMeta(router.currentRoute.value),
  };
}
