import type {RouteParams, RouteRecordRaw} from 'vue-router'
import {createRouter, createWebHashHistory} from 'vue-router'
import ProjectManagement from "./pages/ProjectManagement.vue";
import Home from "./pages/Home.vue";
import InitProject from "./pages/InitProject.vue";

export type AppRouteNames =
    | 'project-management'
    | 'phase'
    | 'iteration'
    | 'init-project'
    | 'home'
    | 'usecase'
    | 'edit-usecase'
    | 'create-usecase'
    | 'member'
    | 'edit-member'
    | 'create-member'

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
        name: 'phase',
        path: '/phase/:slug',
        component: () => import('./pages/PhaseManagement.vue'),
    },
    {
        name: 'iteration',
        path: '/iteration/:slug',
        component: () => import('./pages/IterationManagement.vue'),
    },
    {
        name: 'usecase',
        path: '/usecases',
        component: () => import('./pages/UseCase.vue'),
    },
    {
        name: 'edit-usecase',
        path: '/usecases/:slug/edit',
        component: () => import('./pages/EditUseCase.vue'),
    },
    {
        name: 'create-usecase',
        path: '/usercases/create',
        component: () => import('./pages/EditUseCase.vue'),
    },
    {
        name: 'member',
        path: '/members',
        component: () => import('./pages/Member.vue'),
    },
    {
        name: 'edit-member',
        path: '/members/:slug/edit',
        component: () => import('./pages/EditMember.vue'),
    },
    {
        name: 'create-member',
        path: '/members/create',
        component: () => import('./pages/EditMember.vue'),
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
