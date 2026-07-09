<template>
  <div class="container mx-auto py-8">
    <div class="flex justify-between items-center mb-8">
      <h1 class="text-3xl font-bold">Catalogue des Livres</h1>
      <div class="flex gap-4">
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Chercher un livre..."
          class="px-4 py-2 border rounded-lg w-64"
          @input="handleSearch"
        />
        <select
          v-model="selectedCategory"
          class="px-4 py-2 border rounded-lg"
          @change="handleSearch"
        >
          <option value="">Toutes les catégories</option>
          <option value="Mathematics">Mathématiques</option>
          <option value="Physics">Physique</option>
          <option value="Chemistry">Chimie</option>
          <option value="Biology">Biologie</option>
          <option value="History">Histoire</option>
        </select>
      </div>
    </div>

    <!-- Loading -->
    <div v-if="loading" class="flex justify-center py-8">
      <div class="spinner"></div>
    </div>

    <!-- Books Grid -->
    <div v-else class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
      <div
        v-for="book in books"
        :key="book._id"
        class="bg-white rounded-lg shadow hover:shadow-lg transition cursor-pointer"
        @click="goToBook(book._id)"
      >
        <div class="bg-gradient-to-b from-blue-400 to-blue-600 h-48 rounded-t-lg flex items-center justify-center text-white text-4xl">
          📖
        </div>
        <div class="p-4">
          <h3 class="font-bold text-lg truncate">{{ book.title }}</h3>
          <p class="text-sm text-gray-600 mb-2">{{ book.author.firstName }} {{ book.author.lastName }}</p>
          <div class="flex justify-between items-center">
            <span class="text-blue-600 font-bold">{{ book.chapters.length }} chapitres</span>
            <span class="text-green-600 font-bold">à partir de {{ book.chapters[0]?.price }} XOF</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Pagination -->
    <div v-if="!loading" class="flex justify-center gap-4 mt-8">
      <button
        v-if="currentPage > 1"
        @click="previousPage"
        class="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
      >
        Précédent
      </button>
      <span>Page {{ currentPage }} / {{ totalPages }}</span>
      <button
        v-if="currentPage < totalPages"
        @click="nextPage"
        class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Suivant
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useBookStore } from '../stores/book';

const router = useRouter();
const bookStore = useBookStore();
const searchQuery = ref('');
const selectedCategory = ref('');
const currentPage = ref(1);
const books = ref([]);
const totalPages = ref(1);
const loading = ref(false);

const handleSearch = async () => {
  currentPage.value = 1;
  await loadBooks();
};

const loadBooks = async () => {
  loading.value = true;
  try {
    const result = await bookStore.searchBooks(
      searchQuery.value,
      selectedCategory.value,
      currentPage.value
    );
    books.value = result.books;
    totalPages.value = result.pagination.pages;
  } catch (error) {
    console.error('Erreur lors du chargement des livres:', error);
  } finally {
    loading.value = false;
  }
};

const goToBook = (bookId) => {
  router.push(`/book/${bookId}`);
};

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++;
    loadBooks();
  }
};

const previousPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--;
    loadBooks();
  }
};

onMounted(() => {
  loadBooks();
});
</script>
