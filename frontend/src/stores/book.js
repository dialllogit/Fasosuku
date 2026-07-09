import { defineStore } from 'pinia';
import { ref } from 'vue';
import api from '../services/api';

export const useBookStore = defineStore('book', () => {
  const books = ref([]);
  const selectedBook = ref(null);
  const loading = ref(false);
  const error = ref(null);

  const searchBooks = async (query, category = null, page = 1, limit = 10) => {
    loading.value = true;
    try {
      const params = { q: query, page, limit };
      if (category) params.category = category;
      const response = await api.get('/books/search', { params });
      books.value = response.data.books;
      return response.data;
    } catch (err) {
      error.value = err.message;
      throw err;
    } finally {
      loading.value = false;
    }
  };

  const getBook = async (bookId) => {
    loading.value = true;
    try {
      const response = await api.get(`/books/${bookId}`);
      selectedBook.value = response.data.book;
      return response.data.book;
    } catch (err) {
      error.value = err.message;
      throw err;
    } finally {
      loading.value = false;
    }
  };

  const createBook = async (bookData) => {
    loading.value = true;
    try {
      const response = await api.post('/books', bookData);
      return response.data.book;
    } catch (err) {
      error.value = err.message;
      throw err;
    } finally {
      loading.value = false;
    }
  };

  return {
    books,
    selectedBook,
    loading,
    error,
    searchBooks,
    getBook,
    createBook
  };
});
