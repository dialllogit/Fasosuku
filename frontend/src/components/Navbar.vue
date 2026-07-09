<template>
  <nav class="bg-blue-600 text-white shadow-md">
    <div class="container flex items-center justify-between py-4">
      <RouterLink to="/" class="text-2xl font-bold">FasoSuku</RouterLink>
      
      <div class="flex items-center gap-6">
        <RouterLink to="/catalog" class="hover:text-blue-100">Catalog</RouterLink>
        
        <template v-if="authStore.isAuthenticated">
          <div class="relative group">
            <button class="flex items-center gap-2 hover:text-blue-100">
              <img :src="authStore.user?.avatar" :alt="authStore.user?.firstName" class="w-8 h-8 rounded-full">
              <span>{{ authStore.user?.firstName }}</span>
            </button>
            <div class="absolute right-0 mt-0 w-48 bg-white text-gray-900 rounded-lg shadow-lg hidden group-hover:block">
              <RouterLink to="/dashboard" class="block px-4 py-2 hover:bg-gray-100">Dashboard</RouterLink>
              <RouterLink v-if="authStore.user?.role === 'teacher'" to="/dashboard/teacher" class="block px-4 py-2 hover:bg-gray-100">My Books</RouterLink>
              <RouterLink v-if="authStore.user?.role === 'admin'" to="/admin" class="block px-4 py-2 hover:bg-gray-100">Admin Panel</RouterLink>
              <button @click="logout" class="w-full text-left px-4 py-2 hover:bg-gray-100">Logout</button>
            </div>
          </div>
        </template>
        
        <template v-else>
          <RouterLink to="/auth/login" class="hover:text-blue-100">Login</RouterLink>
          <RouterLink to="/auth/register" class="bg-white text-blue-600 px-4 py-2 rounded hover:bg-blue-50">Register</RouterLink>
        </template>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { useAuthStore } from '@/store/auth'
import { useRouter } from 'vue-router'

const authStore = useAuthStore()
const router = useRouter()

const logout = () => {
  authStore.logout()
  router.push('/')
}
</script>
