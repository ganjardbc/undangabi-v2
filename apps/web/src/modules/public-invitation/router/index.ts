import type { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/preview-undangan',
  },
  {
    path: '/:slug',
    name: 'public-invitation-detail',
    component: () => import('../pages/detail.vue'),
    meta: {
      title: 'Digital Invitation',
      layout: 'public',
      description: 'Open a personalized digital invitation powered by UndangAbi.',
    },
  },
];

export default routes;
