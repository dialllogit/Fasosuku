<template>
  <div v-if="authStore.isAuthenticated" class="max-w-2xl mx-auto space-y-6">
    <div class="canvas-container" style="position: relative; width: 100%; background: #f0f0f0; border: 1px solid #ccc;">
      <canvas id="pdf-canvas" style="display: block; margin: 0 auto; max-width: 100%;"></canvas>
      <div v-if="showWatermark" style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); opacity: 0.1; font-size: 24px; color: #000; pointer-events: none; white-space: nowrap; user-select: none;">
        {{ authStore.user?.firstName }} {{ authStore.user?.lastName }} - {{ authStore.user?.phone }} - {{ authStore.user?.email }}
      </div>
    </div>

    <div class="card flex items-center justify-between">
      <div class="flex items-center gap-4">
        <button @click="prevPage" :disabled="currentPage === 1" class="btn btn-secondary">← Précédent</button>
        <span class="font-bold">Page {{ currentPage }} / {{ totalPages }}</span>
        <button @click="nextPage" :disabled="currentPage === totalPages" class="btn btn-secondary">Suivant →</button>
      </div>
      <button @click="downloadChapter" class="btn btn-primary">Télécharger (Offline)</button>
    </div>

    <div class="card bg-yellow-50 border-l-4 border-yellow-400">
      <p class="text-sm text-yellow-700">
        ⚠️ Ce contenu est protégé. Vous verrez un filigrane lors de toute capture d'écran.
      </p>
    </div>
  </div>
  <div v-else class="text-center py-12">
    <p>Veuillez vous connecter pour lire ce contenu</p>
    <RouterLink to="/auth/login" class="btn btn-primary mt-4">Connexion</RouterLink>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useAuthStore } from '@/store/auth'
import { PdfReader } from '@/services/pdfReader'
import { StorageService } from '@/services/storage'

const route = useRoute()
const authStore = useAuthStore()
const reader = ref(null)
const currentPage = ref(1)
const totalPages = ref(0)
const showWatermark = ref(true)

const prevPage = () => {
  if (reader.value && currentPage.value > 1) {
    reader.value.prevPage()
    currentPage.value = reader.value.currentPage
  }
}

const nextPage = () => {
  if (reader.value && currentPage.value < totalPages.value) {
    reader.value.nextPage()
    currentPage.value = reader.value.currentPage
  }
}

const downloadChapter = async () => {
  if (reader.value) {
    await StorageService.saveToIndexedDB('chapters', `${route.params.bookId}-${route.params.chapterId}`, {
      bookId: route.params.bookId,
      chapterId: route.params.chapterId,
      timestamp: Date.now()
    })
    alert('Chapitre téléchargé pour la lecture hors-ligne')
  }
}

onMounted(async () => {
  // Mock PDF for demonstration
  const mockPdfUrl = 'https://via.placeholder.com/600x800?text=Sample+Chapter'
  
  reader.value = new PdfReader('pdf-canvas', {
    scale: 1.5,
    watermark: {
      name: authStore.user?.firstName + ' ' + authStore.user?.lastName,
      phone: authStore.user?.phone,
      email: authStore.user?.email
    }
  })
  
  // Note: In production, load actual PDF from API
  // await reader.value.loadPdf(mockPdfUrl)
  // totalPages.value = reader.value.totalPages
})
</script>

<style scoped>
canvas {
  user-select: none;
  pointer-events: none;
}
</style>
