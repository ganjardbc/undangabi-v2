import type { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/invitations/:id/guests',
    name: 'guests.list',
    component: () => import('../pages/list.vue'),
    meta: {
      title: 'Guests',
      layout: 'dashboard',
    },
  },
  {
    path: '/invitations/:id/guests/:guestId',
    name: 'guests.detail',
    component: () => import('../pages/detail.vue'),
    meta: {
      title: 'Guest Detail',
      layout: 'dashboard',
    },
  },
  {
    path: '/invitations/:id/guest-categories',
    name: 'guests.categories',
    component: () => import('../pages/categories.vue'),
    meta: {
      title: 'Guest Categories',
      layout: 'dashboard',
    },
  },
  {
    path: '/invitations/:id/guests/import',
    name: 'guests.import',
    component: () => import('../pages/import.vue'),
    meta: {
      title: 'Import Guests',
      layout: 'dashboard',
    },
  },
];

export default routes;
