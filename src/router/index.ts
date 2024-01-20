import { createRouter, createWebHistory } from 'vue-router';
import { PUBLIC_ROUTES } from '@/_public/router';
import { ADMIN_ROUTES } from '@/_admin/router';

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: PUBLIC_ROUTES.concat(ADMIN_ROUTES)
})

export default router
