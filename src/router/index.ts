import { createRouter, createWebHistory } from 'vue-router'

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', redirect: '/my-routines' },
    {
      path: '/my-routines',
      name: 'My Routines',
      component: () => import('@/pages/MyRoutinesPage.vue'),
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
  ],
})
