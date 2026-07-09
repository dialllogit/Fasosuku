<template>
  <div class="max-w-2xl mx-auto space-y-6">
    <h1 class="text-3xl font-bold">Créer une nouvelle publication</h1>
    
    <form @submit.prevent="submitForm" class="space-y-4">
      <div>
        <label class="block font-bold mb-2">Titre</label>
        <input v-model="form.title" type="text" required class="input" placeholder="Titre du livre">
      </div>
      
      <div>
        <label class="block font-bold mb-2">Description</label>
        <textarea v-model="form.description" required class="input h-32" placeholder="Description détaillée"></textarea>
      </div>
      
      <div>
        <label class="block font-bold mb-2">Catégorie</label>
        <select v-model="form.category" required class="input">
          <option value="">Sélectionner une catégorie</option>
          <option value="Mathematics">Mathématiques</option>
          <option value="Physics">Physique</option>
          <option value="Chemistry">Chimie</option>
          <option value="Biology">Biologie</option>
          <option value="History">Histoire</option>
        </select>
      </div>
      
      <div>
        <label class="block font-bold mb-2">Couverture (URL)</label>
        <input v-model="form.cover" type="url" class="input" placeholder="https://...">
      </div>
      
      <div class="card bg-blue-50">
        <h3 class="font-bold mb-2">Chapitres</h3>
        <div v-for="(chapter, index) in form.chapters" :key="index" class="space-y-2 mb-4 p-4 border rounded">
          <input v-model="chapter.title" type="text" placeholder="Titre du chapitre" class="input">
          <input v-model.number="chapter.price" type="number" placeholder="Prix (XOF)" class="input">
          <button @click="removeChapter(index)" type="button" class="btn btn-danger">Supprimer</button>
        </div>
        <button @click="addChapter" type="button" class="btn btn-secondary">+ Ajouter un chapitre</button>
      </div>
      
      <button type="submit" class="btn btn-primary w-full">
        Créer le livre
      </button>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useBookStore } from '@/store/book'

const router = useRouter()
const bookStore = useBookStore()

const form = ref({
  title: '',
  description: '',
  category: '',
  cover: '',
  chapters: [
    { title: 'Introduction', price: 0 },
    { title: 'Chapitre 1', price: 500 }
  ]
})

const addChapter = () => {
  form.value.chapters.push({
    title: `Chapitre ${form.value.chapters.length}`,
    price: 500
  })
}

const removeChapter = (index) => {
  form.value.chapters.splice(index, 1)
}

const submitForm = async () => {
  try {
    await bookStore.createBook({
      ...form.value,
      chapters: form.value.chapters.map((ch, idx) => ({
        ...ch,
        number: idx + 1
      }))
    })
    router.push({ name: 'teacher-dashboard' })
  } catch (error) {
    alert('Erreur lors de la création du livre')
  }
}
</script>
