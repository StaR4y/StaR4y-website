import { createRouter, createWebHistory } from 'vue-router'
import NotFound from "@/views/NotFound.vue";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: () => import('../views/MainView.vue'),
        },
        {
            path: '/about',
            name: 'about',
            redirect: '/blog',
        },
        {
            path: '/blog',
            name: 'blog',
            component: () => import('../views/AboutView.vue'),
        },
        {
            path: '/blog/:slug',
            name: 'blog-post',
            component: () => import('../views/BlogPostView.vue'),
        },
        {
            path: '/projects',
            name: 'projects',
            component: () => import('../views/ProjectsView.vue'),
        },
        {
            path: '/:pathMatch(.*)*',
            name: 'NotFound',
            component: NotFound
        }
    ],
})

export default router
