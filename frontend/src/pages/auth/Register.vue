<template>
  <div class="max-w-md mx-auto space-y-6">
    <div class="text-center">
      <h1 class="text-3xl font-bold mb-2">Créer un compte</h1>
      <p class="text-gray-600">Rejoignez la communauté FasoSuku</p>
    </div>

    <form @submit.prevent="handleRegister" class="card space-y-4">
      <div class="grid grid-cols-2 gap-4">
        <div>
          <label class="block font-bold mb-2">Prénom</label>
          <input v-model="form.firstName" type="text" required class="input" placeholder="Prénom">
        </div>
        <div>
          <label class="block font-bold mb-2">Nom</label>
          <input v-model="form.lastName" type="text" required class="input" placeholder="Nom">
        </div>
      </div>

      <div>
        <label class="block font-bold mb-2">Email</label>
        <input v-model="form.email" type="email" required class="input" placeholder="email@example.com">
      </div>

      <div>
        <label class="block font-bold mb-2">Numéro de téléphone</label>
        <input v-model="form.phone" type="tel" required class="input" placeholder="+223 76 XX XX XX">
      </div>

      <div>
        <label class="block font-bold mb-2">Mot de passe</label>
        <input v-model="form.password" type="password" required class="input" placeholder="••••••••">
      </div>

      <div>
        <label class="block font-bold mb-2">Je suis...</label>
        <select v-model="form.role" required class="input">
          <option value="student">Étudiant</option>
          <option value="teacher">Enseignant</option>
        </select>
      </div>

      <div v-if="error" class="bg-red-100 text-red-700 p-4 rounded">
        {{ error }}
      </div>

      <button type="submit" class="btn btn-primary w-full" :disabled="loading">
        <span v-if="loading" class="loading"></span>
        <span v-else>S'inscrire</span>
      </button>
    </form>

    <div class="text-center">
      <p class="text-gray-600">Vous avez déjà un compte? 
        <RouterLink to="/auth/login" class="text-blue-600 font-bold">Se connecter</RouterLink>
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/store/auth'

const router = useRouter()
const authStore = useAuthStore()

const form = ref({
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  password: '',
  role: 'student'
})

const loading = ref(false)
const error = ref('')

const handleRegister = async () => {
  loading.value = true
  error.value = ''
  
  try {
    await authStore.register(form.value)
    router.push('/')
  } catch (err) {
    error.value = err
  } finally {
    loading.value = false
  }
}
</script>
