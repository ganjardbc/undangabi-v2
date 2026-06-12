import {
  createMemoryHistory,
  createRouter,
  createWebHistory,
  type RouteRecordRaw,
} from 'vue-router';

const moduleRoutes = import.meta.glob<{ default: RouteRecordRaw[] }>(
  '../modules/**/router/index.ts',
  { eager: true },
);

const routes: RouteRecordRaw[] = Object.values(moduleRoutes).flatMap((module) => module.default);

export function createWebRouter() {
  return createRouter({
    history: import.meta.env.SSR ? createMemoryHistory() : createWebHistory(),
    routes,
  });
}
