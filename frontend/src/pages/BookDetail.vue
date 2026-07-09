<template>
  <div class="max-w-4xl mx-auto">
    <div v-if="bookStore.loading" class="text-center py-12">
      <div class="loading mx-auto"></div>
    </div>
    
    <div v-else-if="bookStore.currentBook" class="space-y-6">
      <div class="grid grid-cols-3 gap-8">
        <div>
          <img :src="bookStore.currentBook.cover" :alt="bookStore.currentBook.title" class="w-full rounded-lg shadow-lg">
        </div>
        
        <div class="col-span-2 space-y-4">
          <h1 class="text-3xl font-bold">{{ bookStore.currentBook.title }}</h1>
          <p class="text-gray-600">par {{ bookStore.currentBook.author.firstName }} {{ bookStore.currentBook.author.lastName }}</p>
          
          <p class="text-gray-700">{{ bookStore.currentBook.description }}</p>
          
          <div class="flex gap-4">
            <span class="badge badge-success">{{ bookStore.currentBook.stats.purchases }} ventes</span>
            <span class="badge">⭐ {{ bookStore.currentBook.stats.rating }}/5</span>
            <span class="badge">{{ bookStore.currentBook.stats.reviews }} avis</span>
          </div>
        </div>
      </div>

      <div class="card">
        <h2 class="text-2xl font-bold mb-4">Chapitres disponibles</h2>
        <div class="space-y-2">
          <div 
            v-for="chapter in bookStore.currentBook.chapters" 
            :key="chapter.number"
            class="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50"
          >
            <div>
              <h3 class="font-bold">{{ chapter.number }}. {{ chapter.title }}</h3>
              <p class="text-sm text-gray-600">{{ chapter.pageCount }} pages</p>
            </div>
            <div class="flex items-center gap-4">
              <button v-if="chapter.preview" @click="readChapter(chapter.number)" class="btn btn-secondary text-sm">
                Lire l'aperçu
              </button>
              <button @click="buyChapter(chapter)" class="btn btn-primary text-sm">
                {{ formatPrice(chapter.price) }} XOF
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useBookStore } from '@/store/book'
import { useOrderStore } from '@/store/order'

const route = useRoute()
const router = useRouter()
const bookStore = useBookStore()
const orderStore = useOrderStore()

const formatPrice = (price) => {
  return new Intl.NumberFormat('fr-FR').format(price)
}

const readChapter = (chapterNumber) => {
  router.push({
    name: 'reader',
    params: {
      bookId: route.params.id,
      chapterId: chapterNumber
    }
  })
}

const buyChapter = (chapter) => {
  orderStore.addToCart({
    bookId: route.params.id,
    chapter: chapter.number,
    price: chapter.price,
    title: `${bookStore.currentBook.title} - ${chapter.title}`
  })
  
  router.push({ name: 'dashboard' })
}

onMounted(() => {
  bookStore.getBook(route.params.id)
})
</script>
