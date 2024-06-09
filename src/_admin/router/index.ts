import type { RouteRecordRaw } from "vue-router";
import { AdminHome, AdminLogin } from "../views";
import { createRouter, createWebHistory } from 'vue-router';

export const ADMIN_ROUTES: RouteRecordRaw[] = [
    {
        path:'/',
        name: 'Home',
        component: AdminHome,
        meta: { showInNavBar: true }
    },
    {
        path: '/login',
        name: 'Login',
        component: AdminLogin, 
        meta: { showInNavBar: true } 
    }
]

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: ADMIN_ROUTES
})

export default router
