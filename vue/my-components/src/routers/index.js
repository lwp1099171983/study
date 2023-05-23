import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/form-demo',
    name: '/form-demo',
    component: () => import('@/demo/form-demo.vue')
  },
  {
    path: '/alert-demo',
    name: '/alert-demo',
    component: () => import('@/demo/alert-demo.vue')
  },
  {
    path: '/checkbox-demo',
    name: '/checkbox-demo',
    component: () => import('@/demo/checkbox-demo.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
