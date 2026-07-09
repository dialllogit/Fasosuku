<template>
  <div class="space-y-4">
    <h2 class="text-2xl font-bold">Rechercher un livre</h2>
    
    <form @submit.prevent="search" class="flex gap-4">
      <input 
        v-model="query" 
        type="text" 
        placeholder="Titre, auteur, matière..." 
        class="input flex-1"
      >
      <select v-model="selectedCategory" class="input w-48">
        <option value="">Toutes les catégories</option>
        <option value="Mathematics">Mathématiques</option>
        <option value="Physics">Physique</option>
        <option value="Chemistry">Chimie</option>
        <option value="Biology">Biologie</option>
        <option value="History">Histoire</option>
        <option value="Geography">Géographie</option>
        <option value="Literature">Littérature</option>
      </select>
      <button type="submit" class="btn btn-primary">Rechercher</button>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const query = ref('')
const selectedCategory = ref('')

const search = () => {
  router.push({
    name: 'catalog',
    query: {
      q: query.value,
      category: selectedCategory.value
    }
  })
}
</script>
