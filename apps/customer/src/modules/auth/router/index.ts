import type { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/login',
    name: 'login',
    component: () => import('../pages/login.vue'),
    meta: {
      title: 'Login',
      layout: 'auth',
    },
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('../pages/register.vue'),
    meta: {
      title: 'Register',
      layout: 'auth',
    },
  },
];

export default routes;
