import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/store/auth'

const routes = [
  {
    path: '/',
    component: () => import('@/pages/Home.vue'),
    name: 'home'
  },
  {
    path: '/auth/login',
    component: () => import('@/pages/auth/Login.vue'),
    name: 'login',
    meta: { requiresGuest: true }
  },
  {
    path: '/auth/register',
    component: () => import('@/pages/auth/Register.vue'),
    name: 'register',
    meta: { requiresGuest: true }
  },
  {
    path: '/catalog',
    component: () => import('@/pages/Catalog.vue'),
    name: 'catalog'
  },
  {
    path: '/book/:id',
    component: () => import('@/pages/BookDetail.vue'),
    name: 'book-detail'
  },
  {
    path: '/reader/:bookId/:chapterId',
    component: () => import('@/pages/Reader.vue'),
    name: 'reader',
    meta: { requiresAuth: true }
  },
  {
    path: '/dashboard',
    component: () => import('@/pages/Dashboard.vue'),
    name: 'dashboard',
    meta: { requiresAuth: true }
  },
  {
    path: '/dashboard/teacher',
    component: () => import('@/pages/dashboard/TeacherDashboard.vue'),
    name: 'teacher-dashboard',
    meta: { requiresAuth: true, requiresRole: 'teacher' }
  },
  {
    path: '/admin',
    component: () => import('@/pages/admin/AdminPanel.vue'),
    name: 'admin',
    meta: { requiresAuth: true, requiresRole: 'admin' }
  },
  {
    path: '/:pathMatch(.*)*',
    component: () => import('@/pages/NotFound.vue'),
    name: 'not-found'
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()
  const isAuthenticated = authStore.isAuthenticated
  const userRole = authStore.user?.role

  if (to.meta.requiresAuth && !isAuthenticated) {
    next({ name: 'login', query: { redirect: to.fullPath } })
  } else if (to.meta.requiresGuest && isAuthenticated) {
    next({ name: 'home' })
  } else if (to.meta.requiresRole && userRole !== to.meta.requiresRole) {
    next({ name: 'home' })
  } else {
    next()
  }
})

export default router
