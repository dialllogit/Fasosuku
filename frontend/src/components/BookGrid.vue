<template>
  <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
    <RouterLink v-for="book in books" :key="book._id" :to="`/book/${book._id}`" class="group">
      <div class="card overflow-hidden hover:shadow-lg transition-shadow">
        <div class="w-full h-48 bg-gray-200 rounded-lg overflow-hidden mb-3">
          <img :src="book.cover" :alt="book.title" class="w-full h-full object-cover group-hover:scale-105 transition-transform">
        </div>
        <h3 class="font-bold line-clamp-2">{{ book.title }}</h3>
        <p class="text-gray-600 text-sm mb-2">{{ book.author.firstName }} {{ book.author.lastName }}</p>
        <div class="flex items-center justify-between">
          <span class="text-blue-600 font-bold">{{ formatPrice(book.chapters[0]?.price || 0) }} XOF</span>
          <span class="badge badge-success">{{ book.stats.purchases }} ventes</span>
        </div>
      </div>
    </RouterLink>
  </div>
</template>

<script setup>
import { defineProps } from 'vue'

defineProps({
  books: {
    type: Array,
    required: true
  }
})

const formatPrice = (price) => {
  return new Intl.NumberFormat('fr-FR').format(price)
}
</script>
