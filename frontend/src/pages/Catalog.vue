<template>
  <div class="space-y-6">
    <h1 class="text-3xl font-bold">Catalogue Complet</h1>
    
    <div class="flex gap-4 mb-6">
      <input 
        v-model="searchQuery" 
        type="text" 
        placeholder="Rechercher..." 
        @input="handleSearch"
        class="input flex-1"
      >
      <select v-model="selectedCategory" @change="handleSearch" class="input w-48">
        <option value="">Toutes les catégories</option>
        <option value="Mathematics">Mathématiques</option>
        <option value="Physics">Physique</option>
        <option value="Chemistry">Chimie</option>
        <option value="Biology">Biologie</option>
      </select>
    </div>

    <div v-if="bookStore.loading" class="text-center py-8">
      <div class="loading mx-auto"></div>
    </div>
    
    <div v-else-if="bookStore.books.length">
      <BookGrid :books="bookStore.books" />
      
      <div v-if="bookStore.totalPages > 1" class="flex gap-2 justify-center mt-8">
        <button 
          v-for="page in bookStore.totalPages" 
          :key="page"
          @click="goToPage(page)"
          :class="page === bookStore.pagination.page ? 'btn btn-primary' : 'btn btn-secondary'"
        >
          {{ page }}
        </button>
      </div>
    </div>
    
    <div v-else class="text-center py-8 text-gray-600">
      <p>Aucun livre trouvé</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import BookGrid from '@/components/BookGrid.vue'
import { useBookStore } from '@/store/book'

const route = useRoute()
const bookStore = useBookStore()
const searchQuery = ref(route.query.q || '')
const selectedCategory = ref(route.query.category || '')

const handleSearch = async () => {
  await bookStore.searchBooks(searchQuery.value, selectedCategory.value, 1)
}

const goToPage = async (page) => {
  await bookStore.searchBooks(searchQuery.value, selectedCategory.value, page)
}

onMounted(() => {
  handleSearch()
})
</script>
