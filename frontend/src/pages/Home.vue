<template>
  <div class="space-y-8">
    <div class="text-center space-y-4">
      <h1 class="text-4xl font-bold">Bienvenue sur FasoSuku</h1>
      <p class="text-xl text-gray-600">La Bibliothèque Numérique des Chercheurs du Mali</p>
      <SearchBar />
    </div>

    <div class="grid grid-cols-3 gap-6">
      <div class="card text-center">
        <div class="text-4xl mb-4">📚</div>
        <h3 class="font-bold text-lg mb-2">10,000+ Livres</h3>
        <p class="text-gray-600">Contenu académique de qualité</p>
      </div>
      <div class="card text-center">
        <div class="text-4xl mb-4">💰</div>
        <h3 class="font-bold text-lg mb-2">Micro-paiement</h3>
        <p class="text-gray-600">Achetez par chapitre, pas des livres entiers</p>
      </div>
      <div class="card text-center">
        <div class="text-4xl mb-4">🔒</div>
        <h3 class="font-bold text-lg mb-2">Sécurisé</h3>
        <p class="text-gray-600">Votre contenu est protégé</p>
      </div>
    </div>

    <div class="space-y-4">
      <h2 class="text-2xl font-bold">Livres Populaires</h2>
      <BookCarousel v-if="featuredBooks.length" :books="featuredBooks" />
      <div v-else class="text-center py-8 text-gray-600">
        <p>Chargement des livres...</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import SearchBar from '@/components/SearchBar.vue'
import BookCarousel from '@/components/BookCarousel.vue'
import { useBookStore } from '@/store/book'

const bookStore = useBookStore()
const featuredBooks = ref([])

onMounted(async () => {
  try {
    await bookStore.searchBooks('', '')
    featuredBooks.value = bookStore.books.slice(0, 5)
  } catch (error) {
    console.error('Error loading featured books:', error)
  }
})
</script>
