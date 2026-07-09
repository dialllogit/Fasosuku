import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import api from '../services/api';

export const useAuthStore = defineStore('auth', () => {
  const user = ref(null);
  const token = ref(localStorage.getItem('token'));
  const refreshToken = ref(localStorage.getItem('refreshToken'));

  const isAuthenticated = computed(() => !!token.value);

  const register = async (credentials) => {
    try {
      const response = await api.post('/auth/register', credentials);
      token.value = response.data.token;
      refreshToken.value = response.data.refreshToken;
      user.value = response.data.user;
      localStorage.setItem('token', token.value);
      localStorage.setItem('refreshToken', refreshToken.value);
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  const login = async (email, password) => {
    try {
      const response = await api.post('/auth/login', { email, password });
      token.value = response.data.token;
      refreshToken.value = response.data.refreshToken;
      user.value = response.data.user;
      localStorage.setItem('token', token.value);
      localStorage.setItem('refreshToken', refreshToken.value);
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  const logout = () => {
    user.value = null;
    token.value = null;
    refreshToken.value = null;
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
  };

  const getProfile = async () => {
    try {
      const response = await api.get('/users/profile');
      user.value = response.data.user;
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  return {
    user,
    token,
    refreshToken,
    isAuthenticated,
    register,
    login,
    logout,
    getProfile
  };
});
