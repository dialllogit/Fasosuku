<template>
  <div class="space-y-6">
    <h1 class="text-3xl font-bold">Mon Tableau de Bord</h1>
    
    <div class="grid grid-cols-3 gap-4">
      <div class="card text-center">
        <div class="text-3xl mb-2">📚</div>
        <p class="text-gray-600">Livres achetés</p>
        <p class="text-2xl font-bold">{{ orders.length }}</p>
      </div>
      <div class="card text-center">
        <div class="text-3xl mb-2">💰</div>
        <p class="text-gray-600">Dépensé</p>
        <p class="text-2xl font-bold">{{ formatPrice(totalSpent) }} XOF</p>
      </div>
      <div class="card text-center">
        <div class="text-3xl mb-2">⭐</div>
        <p class="text-gray-600">Avis donnés</p>
        <p class="text-2xl font-bold">{{ reviews.length }}</p>
      </div>
    </div>

    <div class="card">
      <h2 class="text-2xl font-bold mb-4">Ma Bibliothèque</h2>
      <div v-if="orders.length" class="space-y-2">
        <div v-for="order in orders" :key="order._id" class="flex items-center justify-between p-4 border rounded-lg">
          <div>
            <p class="font-bold">{{ order.items[0].book.title }}</p>
            <p class="text-sm text-gray-600">Chapitre {{ order.items[0].chapter }}</p>
          </div>
          <RouterLink :to="`/reader/${order.items[0].book._id}/${order.items[0].chapter}`" class="btn btn-primary">
            Lire
          </RouterLink>
        </div>
      </div>
      <p v-else class="text-gray-600">Aucun livre dans votre bibliothèque</p>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useOrderStore } from '@/store/order'

const orderStore = useOrderStore()
const orders = ref([])
const reviews = ref([])

const totalSpent = computed(() => {
  return orders.value.reduce((sum, order) => sum + order.totalAmount, 0)
})

const formatPrice = (price) => {
  return new Intl.NumberFormat('fr-FR').format(price)
}

onMounted(async () => {
  await orderStore.getOrders()
  orders.value = orderStore.orders
})
</script>
