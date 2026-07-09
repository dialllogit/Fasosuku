import { defineStore } from 'pinia'
import { ref } from 'vue'
import api from '@/services/api'

export const useOrderStore = defineStore('order', () => {
  const orders = ref([])
  const currentOrder = ref(null)
  const loading = ref(false)
  const error = ref(null)
  const cart = ref([])

  const addToCart = (item) => {
    const existing = cart.value.find(x => x.bookId === item.bookId && x.chapter === item.chapter)
    if (existing) {
      existing.quantity += item.quantity || 1
    } else {
      cart.value.push({ ...item, quantity: item.quantity || 1 })
    }
  }

  const removeFromCart = (bookId, chapter) => {
    cart.value = cart.value.filter(x => !(x.bookId === bookId && x.chapter === chapter))
  }

  const clearCart = () => {
    cart.value = []
  }

  const getTotalPrice = () => {
    return cart.value.reduce((sum, item) => sum + item.price * item.quantity, 0)
  }

  const createOrder = async (items, paymentMethod) => {
    loading.value = true
    error.value = null
    try {
      const response = await api.post('/orders', {
        items,
        paymentMethod
      })
      currentOrder.value = response.data.order
      return response.data.order
    } catch (err) {
      error.value = err.response?.data?.message || 'Failed to create order'
      throw error.value
    } finally {
      loading.value = false
    }
  }

  const getOrders = async () => {
    loading.value = true
    error.value = null
    try {
      const response = await api.get('/orders')
      orders.value = response.data.orders
    } catch (err) {
      error.value = err.message
    } finally {
      loading.value = false
    }
  }

  return {
    orders,
    currentOrder,
    loading,
    error,
    cart,
    addToCart,
    removeFromCart,
    clearCart,
    getTotalPrice,
    createOrder,
    getOrders
  }
})
