<template>
  <div id="app" class="min-h-screen bg-gray-50">
    <nav class="bg-white shadow-sm">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center h-16">
          <div class="flex items-center">
            <h1 class="text-2xl font-bold text-blue-600">📚 FasoSuku</h1>
          </div>
          <div class="flex items-center space-x-4">
            <router-link to="/" class="text-gray-600 hover:text-gray-900">Accueil</router-link>
            <router-link to="/catalog" class="text-gray-600 hover:text-gray-900">Catalogue</router-link>
            <router-link v-if="!isAuth" to="/auth" class="bg-blue-600 text-white px-4 py-2 rounded">Se connecter</router-link>
            <router-link v-else to="/profile" class="text-gray-600 hover:text-gray-900">{{ userName }}</router-link>
          </div>
        </div>
      </div>
    </nav>

    <main class="max-w-7xl mx-auto py-8 px-4">
      <router-view />
    </main>

    <footer class="bg-gray-800 text-white mt-16 py-8">
      <div class="max-w-7xl mx-auto px-4 text-center">
        <p>&copy; 2024 FasoSuku. Tous droits réservés. 🇲🇱</p>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useAuthStore } from './stores/auth';

const authStore = useAuthStore();
const isAuth = computed(() => authStore.isAuthenticated);
const userName = computed(() => authStore.user?.firstName || 'Utilisateur');
</script>

<style scoped>
/* Global styles */
</style>
