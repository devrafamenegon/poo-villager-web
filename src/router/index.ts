// Composables
import { createRouter, createWebHistory } from 'vue-router'
import VillagersView from '../views/VillagersView.vue'

const routes = [
  {
    path: '/',
    component: () => import('@/layouts/default/Default.vue'),
    children: [
      {
        path: '',
        name: 'VillagersView',
        component: VillagersView
      },
    ],
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
