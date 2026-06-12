import type { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/dashboard',
  },
  {
    path: '/dashboard',
    name: 'customer-dashboard',
    component: () => import('../pages/index.vue'),
    meta: {
      title: 'Dashboard',
      layout: 'dashboard',
      permission: ['authenticated_user'],
    },
  },
];

export default routes;
