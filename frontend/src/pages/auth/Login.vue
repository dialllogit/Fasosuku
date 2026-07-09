<template>
  <div class="max-w-md mx-auto space-y-6">
    <div class="text-center">
      <h1 class="text-3xl font-bold mb-2">Connexion</h1>
      <p class="text-gray-600">Connectez-vous à votre compte FasoSuku</p>
    </div>

    <form @submit.prevent="handleLogin" class="card space-y-4">
      <div>
        <label class="block font-bold mb-2">Email</label>
        <input v-model="form.email" type="email" required class="input" placeholder="email@example.com">
      </div>

      <div>
        <label class="block font-bold mb-2">Mot de passe</label>
        <input v-model="form.password" type="password" required class="input" placeholder="••••••••">
      </div>

      <div v-if="error" class="bg-red-100 text-red-700 p-4 rounded">
        {{ error }}
      </div>

      <button type="submit" class="btn btn-primary w-full" :disabled="loading">
        <span v-if="loading" class="loading"></span>
        <span v-else>Se connecter</span>
      </button>
    </form>

    <div class="text-center">
      <p class="text-gray-600">Pas encore de compte? 
        <RouterLink to="/auth/register" class="text-blue-600 font-bold">S'inscrire</RouterLink>
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useAuthStore } from '@/store/auth'

const router = useRouter()
const route = useRoute()
const authStore = useAuthStore()

const form = ref({
  email: '',
  password: ''
})

const loading = ref(false)
const error = ref('')

const handleLogin = async () => {
  loading.value = true
  error.value = ''
  
  try {
    await authStore.login(form.value.email, form.value.password)
    const redirect = route.query.redirect || '/'
    router.push(redirect)
  } catch (err) {
    error.value = err
  } finally {
    loading.value = false
  }
}
</script>
