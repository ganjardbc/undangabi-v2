import type { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/invitations/:id/guestbook',
    name: 'invitations.guestbook.management',
    component: () => import('../pages/management.vue'),
    meta: {
      title: 'Guestbook Management',
      layout: 'dashboard',
    },
  },
];

export default routes;
