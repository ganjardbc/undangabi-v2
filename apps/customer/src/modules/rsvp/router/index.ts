import type { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/invitations/:id/rsvp',
    name: 'invitations.rsvp.dashboard',
    component: () => import('../pages/dashboard.vue'),
    meta: {
      title: 'RSVP Dashboard',
      layout: 'dashboard',
    },
  },
];

export default routes;
