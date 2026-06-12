import type { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/admin/dashboard',
  },
  {
    path: '/admin/dashboard',
    name: 'admin-dashboard',
    component: () => import('../pages/index.vue'),
    meta: {
      title: 'Admin Dashboard',
      layout: 'admin',
      permission: ['view_global_analytics'],
    },
  },
];

export default routes;
