<template>
  <div class="space-y-6">
    <h1 class="text-3xl font-bold">Panneau d'Administration</h1>
    
    <div class="grid grid-cols-4 gap-4">
      <div class="card text-center">
        <p class="text-gray-600">Utilisateurs</p>
        <p class="text-3xl font-bold">{{ stats.totalUsers }}</p>
      </div>
      <div class="card text-center">
        <p class="text-gray-600">Livres</p>
        <p class="text-3xl font-bold">{{ stats.totalBooks }}</p>
      </div>
      <div class="card text-center">
        <p class="text-gray-600">Commandes</p>
        <p class="text-3xl font-bold">{{ stats.totalOrders }}</p>
      </div>
      <div class="card text-center">
        <p class="text-gray-600">Revenus</p>
        <p class="text-3xl font-bold">{{ formatPrice(stats.totalRevenue) }} XOF</p>
      </div>
    </div>

    <div class="grid grid-cols-2 gap-6">
      <div class="card">
        <h2 class="text-2xl font-bold mb-4">Enseignants à Vérifier</h2>
        <div class="space-y-2">
          <div v-for="teacher in pendingTeachers" :key="teacher._id" class="flex items-center justify-between p-4 border rounded">
            <div>
              <p class="font-bold">{{ teacher.firstName }} {{ teacher.lastName }}</p>
              <p class="text-sm text-gray-600">{{ teacher.email }}</p>
            </div>
            <button @click="verifyTeacher(teacher._id)" class="btn btn-primary">
              Vérifier
            </button>
          </div>
        </div>
      </div>

      <div class="card">
        <h2 class="text-2xl font-bold mb-4">Utilisateurs Actifs</h2>
        <div class="space-y-2">
          <div v-for="user in recentUsers" :key="user._id" class="p-4 border rounded">
            <p class="font-bold">{{ user.firstName }} {{ user.lastName }}</p>
            <p class="text-sm text-gray-600">{{ user.role }} • {{ formatDate(user.stats.lastLogin) }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import api from '@/services/api'

const stats = ref({
  totalUsers: 0,
  totalBooks: 0,
  totalOrders: 0,
  totalRevenue: 0
})

const pendingTeachers = ref([])
const recentUsers = ref([])

const formatPrice = (price) => {
  return new Intl.NumberFormat('fr-FR').format(price)
}

const formatDate = (date) => {
  return new Date(date).toLocaleDateString('fr-FR')
}

const verifyTeacher = async (teacherId) => {
  try {
    await api.post(`/admin/users/${teacherId}/verify`)
    alert('Enseignant vérifié avec succès')
    // Reload data
    loadData()
  } catch (error) {
    alert('Erreur lors de la vérification')
  }
}

const loadData = async () => {
  try {
    const dashboardRes = await api.get('/admin/dashboard')
    stats.value = dashboardRes.data.dashboard
    
    const usersRes = await api.get('/admin/users?limit=5')
    pendingTeachers.value = usersRes.data.users.filter(u => !u.isVerified)
    recentUsers.value = usersRes.data.users
  } catch (error) {
    console.error('Error loading admin data:', error)
  }
}

onMounted(() => {
  loadData()
})
</script>
