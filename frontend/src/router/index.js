import { createRouter, createWebHistory } from 'vue-router';
import { useAuthStore } from '../stores/auth';

const routes = [
  {
    path: '/',
    component: () => import('../pages/Home.vue')
  },
  {
    path: '/catalog',
    component: () => import('../pages/Catalog.vue')
  },
  {
    path: '/auth',
    component: () => import('../pages/Auth.vue')
  },
  {
    path: '/book/:id',
    component: () => import('../pages/BookDetail.vue')
  },
  {
    path: '/reader/:id',
    component: () => import('../pages/Reader.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/profile',
    component: () => import('../pages/Profile.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/library',
    component: () => import('../pages/Library.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/teacher/dashboard',
    component: () => import('../pages/TeacherDashboard.vue'),
    meta: { requiresAuth: true, requiresTeacher: true }
  },
  {
    path: '/:pathMatch(.*)*',
    component: () => import('../pages/NotFound.vue')
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();

  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    next('/auth');
  } else if (to.meta.requiresTeacher && authStore.user?.role !== 'teacher') {
    next('/');
  } else {
    next();
  }
});

export default router;
