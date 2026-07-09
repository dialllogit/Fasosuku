<template>
  <div class="container mx-auto py-12 px-4">
    <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
      <!-- Hero Section -->
      <div class="md:col-span-2">
        <h1 class="text-4xl font-bold text-gray-900 mb-4">
          Bienvenue sur 📚 FasoSuku
        </h1>
        <p class="text-xl text-gray-600 mb-6">
          La Bibliothèque Numérique des Chercheurs du Mali. Accédez à des milliers de ressources académiques au meilleur prix.
        </p>
        <router-link to="/catalog" class="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700">
          Explorer le Catalogue
        </router-link>
      </div>

      <!-- Stats -->
      <div class="bg-white rounded-lg shadow p-6">
        <div class="mb-4">
          <p class="text-3xl font-bold text-blue-600">500+</p>
          <p class="text-gray-600">Livres disponibles</p>
        </div>
        <div class="mb-4">
          <p class="text-3xl font-bold text-green-600">200+</p>
          <p class="text-gray-600">Enseignants actifs</p>
        </div>
        <div>
          <p class="text-3xl font-bold text-purple-600">10K+</p>
          <p class="text-gray-600">Utilisateurs</p>
        </div>
      </div>
    </div>

    <!-- Features -->
    <div class="mt-16 grid grid-cols-1 md:grid-cols-4 gap-8">
      <div class="text-center">
        <div class="text-4xl mb-2">💰</div>
        <h3 class="font-semibold mb-2">Micro-Paiement</h3>
        <p class="text-gray-600 text-sm">Achetez par chapitre à partir de 500 FCFA</p>
      </div>
      <div class="text-center">
        <div class="text-4xl mb-2">📱</div>
        <h3 class="font-semibold mb-2">Mobile Money</h3>
        <p class="text-gray-600 text-sm">Orange, Moov, Wave - Paiement simple</p>
      </div>
      <div class="text-center">
        <div class="text-4xl mb-2">🔒</div>
        <h3 class="font-semibold mb-2">Sécurisé</h3>
        <p class="text-gray-600 text-sm">Protection anti-copie et filigrane</p>
      </div>
      <div class="text-center">
        <div class="text-4xl mb-2">📴</div>
        <h3 class="font-semibold mb-2">Hors-Ligne</h3>
        <p class="text-gray-600 text-sm">Lisez sans connexion internet</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useAuthStore } from '../stores/auth';

const authStore = useAuthStore();
</script>
