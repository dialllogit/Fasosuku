import axios from 'axios'
import { useAuthStore } from '@/store/auth'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000',
  timeout: import.meta.env.VITE_API_TIMEOUT || 30000
})

// Request interceptor
api.interceptors.request.use(
  (config) => {
    const authStore = useAuthStore()
    if (authStore.token) {
      config.headers.Authorization = `Bearer ${authStore.token}`
    }
    return config
  },
  (error) => Promise.reject(error)
)

// Response interceptor
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config
    const authStore = useAuthStore()

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true

      try {
        const response = await api.post('/auth/refresh-token', {
          refreshToken: authStore.refreshToken
        })
        
        authStore.token = response.data.token
        localStorage.setItem('token', response.data.token)
        
        originalRequest.headers.Authorization = `Bearer ${response.data.token}`
        return api(originalRequest)
      } catch (err) {
        authStore.logout()
        window.location.href = '/auth/login'
        return Promise.reject(err)
      }
    }

    return Promise.reject(error)
  }
)

export default api
