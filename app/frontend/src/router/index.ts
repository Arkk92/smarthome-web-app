import Restaurant from '@/apps/restaurant/infra/Restaurant.vue'
import DashboardView from '@/apps/smart-home/views/DashboardView.vue'
import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'dashboard',
    meta: { componentPath: '@/apps/smart-home/views/DashboardView.vue' },
    component: DashboardView
  },
  {
    path: '/restaurant',
    name: 'restaurant',
    meta: { componentPath: '@/apps/restaurant/views/Restaurant.vue' },
    component: Restaurant
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (About.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import('@/apps/common/views/AboutView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: routes
})

export default router
