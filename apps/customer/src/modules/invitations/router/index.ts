import type { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/invitations',
    name: 'invitations.list',
    component: () => import('../pages/list.vue'),
    meta: {
      title: 'Invitations',
      layout: 'dashboard',
    },
  },
  {
    path: '/invitations/create',
    name: 'invitations.create',
    component: () => import('../pages/create.vue'),
    meta: {
      title: 'Create Invitation',
      layout: 'dashboard',
    },
  },
  {
    path: '/invitations/:id/builder',
    name: 'invitations.builder',
    component: () => import('../pages/builder.vue'),
    meta: {
      title: 'Invitation Builder',
      layout: 'dashboard',
    },
  },
];

export default routes;
