import { createRouter, createWebHistory } from 'vue-router'

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', redirect: '/routines' },
    {
      path: '/routines',
      name: 'Routines',
      component: () => import('@/pages/RoutinesPage.vue'),
    },
    {
      path: '/new-routine',
      name: 'New Routine',
      component: () => import('@/pages/NewRoutinePage.vue'),
    },
    {
      path: '/edit-routine/:id',
      name: 'Edit Routine',
      component: () => import('@/pages/EditRoutinePage.vue'),
    },
    {
      path: '/routine/:id',
      name: 'Routine',
      component: () => import('@/pages/RoutinePage.vue'),
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'NotFound',
      component: () => import('@/pages/NotFoundPage.vue'),
    },
  ],
})
