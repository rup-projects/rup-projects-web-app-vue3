import type {RouteParams, RouteRecordRaw} from 'vue-router'
import {createRouter, createWebHashHistory} from 'vue-router'
import ProjectManagement from "./pages/ProjectManagement.vue";
import Home from "./pages/Home.vue";
import InitProject from "./pages/InitProject.vue";

export type AppRouteNames =
    | 'project-management'
    | 'init-project'
    | 'home'
    | 'usecase'
    | 'member'

export const routes: RouteRecordRaw[] = [
    {
        name : 'home',
        path: '/',
        component: Home,
    },
    {
        name : 'init-project',
        path: '/init-project',
        component: InitProject,
    },
    {
        name: 'project-management',
        path: '/project-management',
        component: ProjectManagement,
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

export function routerPush(name: AppRouteNames, params?: RouteParams): ReturnType<typeof router.push> {
    return params === undefined
        ? router.push({name})
        : router.push({name, params})
}
