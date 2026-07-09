import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import api from '@/services/api'

export const useBookStore = defineStore('book', () => {
  const books = ref([])
  const currentBook = ref(null)
  const loading = ref(false)
  const error = ref(null)
  const pagination = ref({ page: 1, limit: 10, total: 0 })

  const totalPages = computed(() => Math.ceil(pagination.value.total / pagination.value.limit))

  const searchBooks = async (query, category, page = 1) => {
    loading.value = true
    error.value = null
    try {
      const response = await api.get('/books/search', {
        params: { q: query, category, page, limit: pagination.value.limit }
      })
      books.value = response.data.books
      pagination.value = response.data.pagination
    } catch (err) {
      error.value = err.message
      console.error('Search failed:', err)
    } finally {
      loading.value = false
    }
  }

  const getBook = async (id) => {
    loading.value = true
    error.value = null
    try {
      const response = await api.get(`/books/${id}`)
      currentBook.value = response.data.book
    } catch (err) {
      error.value = err.message
    } finally {
      loading.value = false
    }
  }

  const createBook = async (bookData) => {
    loading.value = true
    error.value = null
    try {
      const response = await api.post('/books', bookData)
      books.value.push(response.data.book)
      return response.data.book
    } catch (err) {
      error.value = err.response?.data?.message || 'Failed to create book'
      throw error.value
    } finally {
      loading.value = false
    }
  }

  return {
    books,
    currentBook,
    loading,
    error,
    pagination,
    totalPages,
    searchBooks,
    getBook,
    createBook
  }
})
