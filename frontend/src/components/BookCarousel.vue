<template>
  <div class="flex gap-4 overflow-x-auto pb-4">
    <div v-for="book in books" :key="book._id" class="flex-shrink-0">
      <RouterLink :to="`/book/${book._id}`" class="block group">
        <div class="w-48 h-64 bg-gray-200 rounded-lg overflow-hidden mb-3">
          <img :src="book.cover" :alt="book.title" class="w-full h-full object-cover group-hover:scale-105 transition-transform">
        </div>
        <h3 class="font-bold text-sm line-clamp-2">{{ book.title }}</h3>
        <p class="text-gray-600 text-sm">{{ book.author.firstName }} {{ book.author.lastName }}</p>
        <p class="text-blue-600 font-bold">Depuis {{ formatPrice(book.chapters[0]?.price || 0) }} XOF</p>
      </RouterLink>
    </div>
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
