import type { RouteParams, RouteRecordRaw } from 'vue-router'
import { createRouter, createWebHashHistory } from 'vue-router'
import Home from './pages/Home.vue';

export type AppRouteNames =
  | 'global-feed'
  | 'usecase'
  | 'member'

export const routes: RouteRecordRaw[] = [
  {
    name: 'global-feed',
    path: '/',
    component: Home,
  },
  {
    name: 'usecase',
    path: '/usecase/:slug',
    component: () => import('./pages/UseCase.vue'),
  },
  {
    name: 'member',
    path: '/member/:slug',
    component: () => import('./pages/Member.vue'),
  },
]
export const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

export function routerPush (name: AppRouteNames, params?: RouteParams): ReturnType<typeof router.push> {
  return params === undefined
    ? router.push({ name })
    : router.push({ name, params })
}
